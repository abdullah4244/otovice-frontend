import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { useParams } from "react-router";
import { verifyUser } from "../servives/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const Verify = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useParams();
  const navigate = useNavigate();
  const tokenVerification = async () => {
    try {
      const user = await verifyUser(token);
      localStorage.setItem(
        "user",
        JSON.stringify({
          ...user.data,
        })
      );
      toast(
        "Your Email has been successfully verified.Welcome To Octovoce",
        {}
      );
      navigate("/categories");
    } catch (error) {
      console.log("error", error);
      toast(error?.response?.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    tokenVerification();
  }, []);
  return (
    <div
      style={{
        height: "80vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {isLoading ? <Spin /> : <></>}
    </div>
  );
};

export default Verify;
