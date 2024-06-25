import React from "react";
import { Form, Input, Button, Image } from "antd";
import {  useLocation, useNavigate, useParams } from "react-router-dom";
import LeftSvg from "../assets/LeftSvg";
import RightSvg from "../assets/RightSvg";
import logo from "../assets/logo.png";
import { forgotpassword, login, resetPassword } from "../servives/auth";
import { toast } from "react-toastify";

const ResetPasswordForm = () => {
  const navigate = useNavigate();
const params = useParams();
console.log(params,  "params")
  const onFinish = async (values) => {
    try {
      const user = await resetPassword({id : params.id , ...values});
      toast("Your Password has been Reset",{
        onClose : ()=>{
            navigate('/login');

        },
        autoClose : 2000,
        pauseOnHover : false
      });
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
            RESET YOUR PASSWORD
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
              label="Enter your New Password"
              name="password"
              rules={[{ required: true, message: "Please input your password!" }]}
            >
              <Input.Password className=" w-full border rounded-lg py-2 px-4 border-secondary" />
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

export default ResetPasswordForm;
