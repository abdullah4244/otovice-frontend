import React, { useEffect } from "react";
import { Form, Input, Button, Typography, Image } from "antd";
import LeftSvg from "../assets/LeftSvg";
import RightSvg from "../assets/RightSvg";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { googleAuthenticator, signUp } from "../servives/auth";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      await signUp(values);
      toast("Registration successful! Please check your email to verify your account.");
    } catch (error) {
      toast(error?.response?.data?.msg?.[0]);
      console.log("error", error);
    }
  };

  const onGoogleSuccess = async (response) => {
    localStorage.setItem("google_user", JSON.stringify(response));
    const user = await googleAuthenticator({
      tokenId: response.credential,
    });
    localStorage.setItem("user", JSON.stringify(user.data));
    navigate("/categories");
  };

  const onGoogleFailure = (response) => {
    console.log("Google Login Failure:", response);
  };

  return (
    <div className="w-full p-6 flex justify-between flex-row items-center">
      <div className="lg:w-1/2">
        <LeftSvg />
      </div>
      <div className="lg:w-1/2">
        <div className="flex fixed top-0 right-0  w-auto justify-end ">
          <RightSvg />
        </div>
        <div className="w-full max-w-md mt-5">
          <div className="flex flex-col gap-2 justify-start items-start">
            <Image
              src={logo}
              alt="logo"
              width={270}
              height={70}
              preview={false}
              className="object-cover"
            />
            <h2 className="text-center font-on text-4xl font-semibold text-primary">
              Sign Up to your Account
            </h2>
          </div>

          <Form
            name="sign_up"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            layout="vertical"
            className="flex flex-col mt-4 w-full "
          >
            <Form.Item
              label="Enter your Full name"
              name="username"
              rules={[
                { required: true, message: "Please enter your full name" },
              ]}
            >
              <Input
                placeholder="Enter your full name"
                className="  w-full border rounded-lg py-2 px-4 border-secondary"
              />
            </Form.Item>

            <Form.Item
              label="Enter your Phone number"
              name="phoneNumber"
              rules={[
                { required: true, message: "Please enter your phone number" },
              ]}
            >
              <Input
                placeholder="Enter your Phone number"
                type="number"
                className="  w-full border rounded-lg py-2 px-4 border-secondary"
              />
            </Form.Item>
            <Form.Item
              label="Enter your Email"
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input
                placeholder="Enter your Email"
                className="  w-full border rounded-lg py-2 px-4 border-secondary"
              />
            </Form.Item>
            <Form.Item
              label="Enter your Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: "Password must be at least 6 characters" },
              ]}
            >
              <Input.Password
                placeholder="Enter your Password"
                className="flex w-full border rounded-lg py-2 px-4 border-secondary"
              />
            </Form.Item>

            <Link to="/login" className="ml-3 cursor-pointer">
              <Typography className="  text-primary my-2 flex justify-end">
                Already have an account
              </Typography>
            </Link>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-primary"
                style={{ width: "100%" }}
              >
                Sign Up
              </Button>
            </Form.Item>
            <Typography> Login with Social Media </Typography>
            <Form.Item>
              <GoogleLogin
                onSuccess={onGoogleSuccess}
                onError={onGoogleFailure}
                text="signup_with"
                size="large"
                ux_mode="popup"
                shape="rectangular"
                context="signup"
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

export default SignUpForm;
