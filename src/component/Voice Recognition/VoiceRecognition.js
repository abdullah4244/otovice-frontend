import React, { useState, useEffect } from "react";
import microphone from "../../assets/microphone.svg";
import "./VoiceRecognition.css";

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.continuous = true;
recognition.interimResults = true;
recognition.lang = 'en-UK';

const VoiceRecognition = ({ setPromt, talkHandler }) => {
  const [isListening, setIsListening] = useState(false);

  const toggleListening = () => {
    setIsListening((prevState) => !prevState);
  };

  useEffect(() => {
    const handleListening = () => {
      if (isListening) {
        recognition.start();
        recognition.onend = () => {
          console.log("...continue listening...");
          recognition.start();
        };
      } else {
        recognition.stop();
        recognition.onend = () => {
          console.log("Stopped listening per click");
        };
      }

      recognition.onstart = () => {
        console.log("Listening!");
      };

      let finalTranscript = '';
      recognition.onresult = (event) => {
        console.log("Triggered");
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) finalTranscript += transcript + ' ';
          else interimTranscript += transcript;
        }
        console.log(finalTranscript, "final transcript");
        setPromt(finalTranscript);

        // Commands
        const transcriptArr = finalTranscript.split(' ');
        const stopCmd = transcriptArr.slice(-3, -1);
        console.log('stopCmd', stopCmd);

        if (stopCmd[0] === 'stop' && stopCmd[1] === 'listening') {
          recognition.stop();
          recognition.onend = () => {
            console.log('Stopped listening per command');
            const finalText = transcriptArr.slice(0, -3).join(' ');
            console.log(finalText, "final text");
            setPromt(finalText);
          };
        }
      };

      recognition.onerror = (event) => {
        console.log("Error occurred in recognition: " + event.error);
      };
    };

    handleListening();
  }, [isListening]);

  return (
    <div className="record-btn-wrapper">
      <button onClick={toggleListening} className="record-btn">
        <img src={microphone} alt="microphone" />
        {isListening ? "Stop....Recording" : "Record"}
      </button>
    </div>
  );
};

export default VoiceRecognition;
