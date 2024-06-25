import React from "react";
import { Form, Input, Button, Image } from "antd";
import {  useNavigate } from "react-router-dom";
import LeftSvg from "../assets/LeftSvg";
import RightSvg from "../assets/RightSvg";
import logo from "../assets/logo.png";
import { forgotpassword, login } from "../servives/auth";
import { toast } from "react-toastify";

const ForgotPasswordForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const user = await forgotpassword(values);
      toast("Recovery email has been sent.");
    } catch (error) {
      console.log("error", error);
      toast(error?.response?.data?.message);
    }
  };

  return (
    <div className="w-full flex justify-between flex-row items-center">
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
            ENTER YOUR RECOVERY EMAIL
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
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full bg-primary"
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;
