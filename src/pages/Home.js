import { Image } from "antd";
import logo from "../assets/octovoce-logo.svg";
import SplashSvg from "../assets/bottom-placeholder.svg";

const Home = () => (
  <div className="flex flex-col relative h-screen-minus-74 overflow-hidden ">
    <div className=" flex flex-grow justify-center items-center  mt-[-200px] ">
      <Image src={logo} alt="logo" width={465} height={116} preview={false} />
    </div>
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden ">
      <img alt="splash" src={SplashSvg}  />
    </div>
  </div>
);

export default Home;
