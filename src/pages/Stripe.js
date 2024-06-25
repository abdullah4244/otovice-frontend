import React, { useEffect, useState } from "react";
import { Button, Image, Table } from "antd";
import logo from "../assets/octovoce-logo.svg";
import { useNavigate } from "react-router";
import RightIcon from "../assets/rightSvg.svg";
import { CheckCircleFilled } from "@ant-design/icons";
import planData from "../servives/planData.json";
import { toast } from "react-toastify";
import { updateUser } from "../servives/auth";

const Stripe = () => {
  const navigate = useNavigate();
  const [currentPlan, setCurrentPlan] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : {};
    setCurrentPlan(userData?.user?.planId);
    setUser(userData?.user);
  }, []);

  const activateFreePlan = async () => {
    try {
      const resp = await updateUser(
        {
          planId: planData.free.planId,
        },
        user?._id ?? user?.id
      );
      localStorage.setItem(
        "user",
        JSON.stringify({
          user: {
            ...resp.data,
          },
        })
      );
      toast("Subscription successful!");
      navigate("/categories");
    } catch (error) {
      console.log("error", error);
      toast("Subscription Failed");
    }
  };

  const createButton = (planKey) => (
    <Button
      type="ghost"
      className="font-bold subscribe-button"
      size="large"
      onClick={async () => {
        if (user) {
          if (
            planKey !== "institutional" &&
            currentPlan &&
            currentPlan !== planData[planKey]?.planId
          ) {
            navigate(`/orderSummary/${planKey}/${planData[planKey]?.planId}`);
            return;
          }
          if (planKey == "free") {
            await activateFreePlan();
          }
        } else {
          navigate("/login");
        }
      }}
    >
      {currentPlan == planData[planKey]?.planId
        ? "Subscribed"
        : planKey === "free"
        ? "Get Started"
        : planKey === "institutional"
        ? "Contact Us"
        : "Subscribe Now"}
    </Button>
  );

  const columns = [
    {
      title: "Plan",
      dataIndex: "feature",
      key: "feature",
    },
    {
      title: () => (
        <div>
          {planData.free.planId == currentPlan ? (
            <CheckCircleFilled
              style={{ color: "rgb(14 116 188)", marginRight: "10px" }}
            />
          ) : (
            <></>
          )}
          <span className="table-title">Free</span>
        </div>
      ),
      dataIndex: "free",
      key: "free",
    },
    {
      title: () => (
        <div>
          {planData.student.planId == currentPlan ? (
            <CheckCircleFilled
              style={{ color: "rgb(14 116 188)", marginRight: "10px" }}
            />
          ) : (
            <></>
          )}
          <span className="table-title">Student</span>
        </div>
      ),
      dataIndex: "student",
      key: "student",
    },
    {
      title: () => (
        <div>
          {planData.professional.planId == currentPlan ? (
            <CheckCircleFilled
              style={{ color: "rgb(14 116 188)", marginRight: "10px" }}
            />
          ) : (
            <></>
          )}
          <span className="table-title">Professional</span>
        </div>
      ),
      dataIndex: "professional",
      key: "professional",
    },
    {
      title: () => (
        <div>
          {planData.institutional?.planId == currentPlan ? (
            <CheckCircleFilled
              style={{ color: "rgb(14 116 188)", marginRight: "10px" }}
            />
          ) : (
            <></>
          )}
          <span className="table-title">Institutional</span>
        </div>
      ),
      dataIndex: "institutional",
      key: "institutional",
    },
  ];

  const features = [
    "price",
    "topics",
    "learnMode",
    "testMode",
    "support",
    "exclusiveContent",
    "adminDashboard",
    "customRequests",
    "certifications",
  ];

  const data = features.map((feature, index) => ({
    key: index,
    feature:
      feature.charAt(0).toUpperCase() +
      feature.slice(1).replace(/([A-Z])/g, " $1"),
    free: planData.free[feature],
    student: planData.student[feature],
    professional: planData.professional[feature],
    institutional: planData.institutional[feature],
  }));

  data.push({
    key: "cta",
    feature: "CTA",
    free: createButton("free"),
    student: createButton("student"),
    professional: createButton("professional"),
    institutional: createButton("institutional"),
  });

  return (
    <div className="relative  mt-5">
      <div className="fixed hidden md:block top-0 right-0">
        <img src={RightIcon} alt="logo" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-center mb-4 gap-4 md:gap-6 lg:gap-6">
          <Image
            src={logo}
            alt="logo"
            width={270}
            height={70}
            preview={false}
            className="object-cover"
          />
          <h2 className="text-4xl text-primary sm:text-2xl md:text-3xl font-bold text-center">
            Our affordable payment plans.
          </h2>
          <p className="text-lg md:text-base text-secondary text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
          bordered
        />
      </div>
    </div>
  );
};

export default Stripe;
