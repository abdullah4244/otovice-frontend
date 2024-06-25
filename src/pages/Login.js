import React from "react";
import { Form, Input, Button, Typography, Image } from "antd";
import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import LeftSvg from "../assets/LeftSvg";
import RightSvg from "../assets/RightSvg";
import logo from "../assets/logo.png";
import { googleAuthenticator, login } from "../servives/auth";
import { toast } from "react-toastify";

const LoginForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const user = await login(values);
      if(user.data.isVerified) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            user: user.data,
          })
        );
      toast("Welcome To Octovoce");
      navigate("/categories");
      }
      else {
        toast("Please Verify your email before proceeding. Verification Email has been sent at your account")
      }
    } catch (error) {
      console.log("error", error);
      toast(error?.response?.data?.message);
    }
  };

  const onGoogleSuccess = async (response) => {
    try {
      localStorage.setItem("google_user", JSON.stringify(response));
      const user = await googleAuthenticator({
        tokenId: response.credential,
      });
      localStorage.setItem("user", JSON.stringify(user.data));
      navigate("/categories");
    } catch (error) {
      console.log("error", error);
    }
  };

  const onGoogleFailure = (response) => {
    console.log("Google Login Failure:", response);
  };

  return (
    <div className="w-full p-6 flex justify-between flex-row items-center">
      <div className="lg:w-1/2">
        <LeftSvg />
      </div>
      <div className=" self-start lg:w-1/2">
        <div className="w-full flex  justify-end ">
          <RightSvg />
        </div>
        <div className="w-full max-w-md flex flex-col gap-2">
          <Image
            src={logo}
            alt="logo"
            width={270}
            height={70}
            preview={false}
            className="object-cover"
          />
          <h2 className="text-start font-bold text-4xl text-primary">
            Login to your Account
          </h2>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className="flex flex-col mt-4 w-full "
          >
            <Form.Item
              label="Enter your Email Address"
              name="email"
              rules={[{ required: true, message: "Please input your email!" }]}
            >
              <Input className=" w-full border rounded-lg py-2 px-4 border-secondary" />
            </Form.Item>
            <Form.Item
              label="Enter your Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password className=" w-full border rounded-lg py-2 px-4 border-secondary" />
            </Form.Item>
            <Form.Item className=" flex justify-end w-full" name="remember">
            <Link to="/forgotpassword">Forgot Password?</Link>
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-primary"
              >
                Login
              </Button>
            </Form.Item>
            <Typography className="my-2 text-lg">
              Login with Social Media
            </Typography>
            <Typography className="my-2">
              Don'y Already have an account? <Link to="/signup">Signup</Link>
            </Typography>
            <Form.Item className="w-full mx-auto ">
              <GoogleLogin
                onSuccess={onGoogleSuccess}
                onError={onGoogleFailure}
                size="large"
                text="login_with"
                shape="rectangular"
                context="login"
                ux_mode="popup"
                select_account
                theme="outline"
              />
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
