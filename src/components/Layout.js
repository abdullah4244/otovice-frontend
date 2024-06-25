import React from "react";
import RightSvg from "../assets/RightSvg";

const Layout = ({ children }) => (
  <div className="flex flex-col min-h-screen">
    <div className=" flex justify-end w-full flex-row self-start">
      <RightSvg />
    </div>
    {children}
  </div>
);

export default Layout;
