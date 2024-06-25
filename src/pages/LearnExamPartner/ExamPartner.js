import React, { useState, useRef, useEffect } from "react";
import VoiceRecognition from "../../component/Voice Recognition/VoiceRecognition";
import logo from "../../assets/octovoce-logo.svg";
import "./ExamPartner.css";
import Avatar from "../../assets/avatar.svg";
import { useParams } from "react-router";
import RightSvg from "../../assets/RightSvg";
import LLMPromt from "../../component/LlmPromt/LLMPromt";
import categoryDb from '../../servives/categories.json';
import { Fade } from "react-slideshow-image";
import "react-slideshow-image/dist/styles.css";


const heygen_API = {
  apiKey: process.env.REACT_APP_HEYGEN_API_KEY,
  serverUrl: "https://api.heygen.com",
};

const StreamingComponent = () => {
  const { category, topic, mode } = useParams();
  const {images, longDescription} = categoryDb.find((item)=>item.name===category).topics.find((item)=>item.name==topic)

  const [sessionInfo, setSessionInfo] = useState(null);
  const [peerConnection, setPeerConnection] = useState(null);
  const [statusMessages, setStatusMessages] = useState([]);
  const [prompt, setPromt] = useState("");
  const [isSessionStarted, setIsSessionStarted] = useState(false);
  const [isStarting,setIsStarting] = useState(false);
  const [isSubmitting,setIsSubmitting] = useState(false);
  const [isClosing,setIsClosing] = useState(false);
  const statusRef = useRef(null);
  const taskInputRef = useRef(null);
  const mediaElementRef = useRef(null);
  const canvasElementRef = useRef(null);

  const apiKey = heygen_API.apiKey;
  const SERVER_URL = heygen_API.serverUrl;

  const updateStatus = (message) => {
    setStatusMessages((prevMessages) => [...prevMessages, message]);
  };

  const onMessage = (event) => {
    const message = event.data;
    console.log("Received message:", message);
  };

  const initializeSession = async () => {
    const avatar = "Tyler-insuit-20220721";
    const voice = "8f23cd5d9ba74d74915ea8e6b91ef9e2";
  console.log("caleed here")
    try {
      const response = await fetch(`${heygen_API.serverUrl}/v1/streaming.new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": heygen_API.apiKey,
        },
        body: JSON.stringify({
          quality: "low",
          avatar_name: avatar,
          voice: { voice_id: voice },
          "background": {
            "type": "color",
            "value": "#FAFAFA"
          }
    
        }),
      });
  
      const data = await response.json();
     return {
      session: data.data,
      sdp: data.data.sdp,
      iceServers: data.data.ice_servers2,
    }; 
      console.log("Session created:");
    } catch (error) {
      console.error("Error creating session:", error);
    }
  };
  const createNewSession = async () => {
    updateStatus("Creating new session... please wait");

    const session = await initializeSession();
    const { sdp: serverSdp, ice_servers2: iceServers } = session;

    const newPeerConnection = new RTCPeerConnection({ iceServers });

    newPeerConnection.ontrack = (event) => {
      if (event.track.kind === "audio" || event.track.kind === "video") {
        mediaElementRef.current.srcObject = event.streams[0];
      }
    };

    newPeerConnection.ondatachannel = (event) => {
      const dataChannel = event.channel;
      dataChannel.onmessage = onMessage;
    };

    await newPeerConnection.setRemoteDescription(
      new RTCSessionDescription(serverSdp)
    );

    setPeerConnection(newPeerConnection);
    setSessionInfo(session);
    localStorage.setItem("session_id",session.session.session_id)
    updateStatus("Session creation completed");
    updateStatus("Now you can click the start button to start the stream");
  };

  const startAndDisplaySession = async () => {
    if (!sessionInfo) {
      updateStatus("Please create a connection first");
      return;
    }

    updateStatus("Starting session... please wait");

    const localDescription = await peerConnection.createAnswer();
    await peerConnection.setLocalDescription(localDescription);
    localStorage.setItem("session_id",sessionInfo.session.session_id)
    peerConnection.onicecandidate = ({ candidate }) => {
      if (candidate) {
        handleICE(sessionInfo.session.session_id, candidate.toJSON());
      }
    };

    peerConnection.oniceconnectionstatechange = () => {
      updateStatus(
        `ICE connection state changed to: ${peerConnection.iceConnectionState}`
      );
    };

    await startSession(sessionInfo.session.session_id, localDescription);

    peerConnection.getReceivers().forEach((receiver) => {
      receiver.jitterBufferTarget = 500;
    });

    updateStatus("Session started successfully");
    setIsSessionStarted(true);
  };

  const repeatHandler = async (text) => {
    if (!sessionInfo) {
      updateStatus("Please create a connection first");
      return;
    }

    updateStatus("Sending task... please wait");

    if (text.trim() === "") {
      alert("Please enter a task");
      return;
    }

    await repeat(sessionInfo.session.session_id, text);
    updateStatus("Task sent successfully");
  };

  const talkHandler = async () => {
    setIsSubmitting(true);
    if (!sessionInfo) {
      updateStatus("Please create a connection first");
      setIsSubmitting(false)
      return;
    }

    if (prompt.trim() === "") {
      alert("Please enter a prompt for the LLM");
      setIsSubmitting(false)
      return;
    }

    updateStatus("Talking to LLM... please wait");

    try {
      const text = await talkToOpenAI(prompt);
      if (text) {
        await repeat(sessionInfo.session.session_id, text);
        updateStatus("LLM response sent successfully");
      } else {
        updateStatus("Failed to get a response from AI");
      }
    } catch (error) {
      console.error("Error talking to AI:", error);
      updateStatus("Error talking to AI");
    }
    setIsSubmitting(false)
  };

  const closeConnectionHandler = async () => {

    updateStatus("Closing connection... please wait");
if(sessionInfo || localStorage.getItem("session_id")){
  console.log("Entered in if")
    try {
      await stopSession(sessionInfo ? sessionInfo.session.session_id : localStorage.getItem('session_id'));
      peerConnection.close();
      setPeerConnection(null);
      setSessionInfo(null);
    } catch (err) {
      console.error("Failed to close the connection:", err);
    }
    localStorage.removeItem("session_id")
    updateStatus("Connection closed successfully");
  }
  else {
    console.log("Entered in else")
    updateStatus("Please create a connection first");
  }
  };

  useEffect(() => {
    if (statusRef.current) {
      statusRef.current.scrollTop = statusRef.current.scrollHeight;
    }
  }, [statusMessages]);

  const newSession = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/llm/getSession`,
      {
        method: "POST",
      }
    );
    const data = await response.json();
    return data;
  };

  const startSession = async (session_id, sdp) => {
    const response = await fetch(`${SERVER_URL}/v1/streaming.start`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
      },
      body: JSON.stringify({ session_id, sdp }),
    });
    const data = await response.json();
    return data.data;
  };

  const handleICE = async (session_id, candidate) => {
    await fetch(`${SERVER_URL}/v1/streaming.ice`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
      },
      body: JSON.stringify({ session_id, candidate }),
    });
  };

  const talkToOpenAI = async (prompt) => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/llm/openai/complete`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          category,
          topic: topic.replace(/\s/g, "").toLocaleLowerCase(),
          mode: "learn",
          questionWithAnswers: [],
        }),
      }
    );
    const data = await response.json();
    return data.text;
  };

  const repeat = async (session_id, text) => {
    await fetch(`${SERVER_URL}/v1/streaming.task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
      },
      body: JSON.stringify({ session_id, text }),
    });
  };

  const stopSession = async (session_id) => {
    console.log("Entered in stopping")
    await fetch(`${SERVER_URL}/v1/streaming.stop`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Api-Key": apiKey,
      },
      body: JSON.stringify({ session_id }),
    });
  };

  useEffect(() => {
    const initiate = async () => {
      await closeConnectionHandler()
       await createNewSession()
    };
    initiate();
  }, []);
console.log(isSessionStarted , "isSessionStarted")
  return (
    <>
      <div className="iconic-icon">
        <RightSvg />
      </div>
      <div className="partner-page-wrapper">
        <div className="heading-wrapper">
          <img src={logo} alt="logo" />
          <span className="topic-name">{topic}</span>
          <span className="topic-description">{longDescription && longDescription}</span>
        </div>
        <div className="avatar-content-wrapping">
          <div className="prompt-box">
            <LLMPromt promt={prompt} setPromt={setPromt} />
            <div className="controls">
              {!isSessionStarted ? (
                <button className="submit-btn" onClick={async ()=>{
                  setIsStarting(true);
                  await startAndDisplaySession()
                  setIsStarting(false);
                }}>
                  {isStarting ? "Starting..." : "Start"}
                </button>
              ) : (
                <>
                  <button
                    className="submit-btn"
                    onClick={async () => {
                      setIsSessionStarted(false)
                      setIsClosing(true);
                     await closeConnectionHandler();
                     await createNewSession();
                     setIsClosing(false);
                    }}                  >
                    {isClosing ? "Closing...": "Close"}
                  </button>
                  <button className="submit-btn" onClick={talkHandler}>
                    {isSubmitting? "Submitting..." : "Submit"}
{}                  </button>
                </>
              )}

              {isSessionStarted && sessionInfo && peerConnection ? (
                <VoiceRecognition
                  setPromt={setPromt}
                  talkHandler={talkHandler}
                />
              ) : (
                <></>
              )}
            </div>
          </div>
          <div className="avatar-section">
            <div className="videoSectionWrap">
              <div className="videoWrap">
                <img
                  src={Avatar}
                  alt="avatar"
                  className={!isSessionStarted ? "d-block" : "d-none"}
                />
                <video
                  id="mediaElement"
                  autoPlay
                  ref={mediaElementRef}
                  className={!isSessionStarted ? "d-none" : "d-block"}
                ></video>
                <canvas
                  id="canvasElement"
                  ref={canvasElementRef}
                  className={!isSessionStarted ? "d-none" : "d-block"}
                ></canvas>
              </div>
            </div>
          </div>

          <div className="images-section slide-container">{
            images && images?.length ? 
            <Fade>
              {images.map((src)=>(
                <div key={src}  className="each-fade">
                   <img src={src} style={{width: "100%",height :"100%",objectFit : "contain"}}/>
                </div>
              ))}
          </Fade>
            : "Images Will be Placed Here"
          }</div>        </div>
      </div>
    </>
  );
};

export default StreamingComponent;
