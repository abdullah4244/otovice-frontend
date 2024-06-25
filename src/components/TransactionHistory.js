import React, { useState } from "react";
import { List } from "antd";
import { CheckCircleOutlined, CloseCircleOutlined } from "@ant-design/icons";

const transactionData = {
  Monthly: [
    {
      text: "Lorem Ipsum",
      icon: (
        <CheckCircleOutlined style={{ color: "green", fontSize: "24px" }} />
      ),
    },
    {
      text: "Lorem Ipsum",
      icon: (
        <CheckCircleOutlined style={{ color: "green", fontSize: "24px" }} />
      ),
    },
    {
      text: "Lorem Ipsum",
      icon: (
        <CheckCircleOutlined style={{ color: "green", fontSize: "24px" }} />
      ),
    },
    {
      text: "Lorem Ipsum",
      icon: (
        <CheckCircleOutlined style={{ color: "green", fontSize: "24px" }} />
      ),
    },
    {
      text: "Lorem Ipsum",
      icon: (
        <CheckCircleOutlined style={{ color: "green", fontSize: "24px" }} />
      ),
    },
    {
      text: "Lorem Ipsum",
      icon: <CloseCircleOutlined style={{ color: "red", fontSize: "24px" }} />,
    },
  ],
  Yearly: [
    {
      text: "Lorem Ipsum",
      icon: (
        <CheckCircleOutlined style={{ color: "green", fontSize: "24px" }} />
      ),
    },
    {
      text: "Lorem Ipsum",
      icon: (
        <CheckCircleOutlined style={{ color: "green", fontSize: "24px" }} />
      ),
    },
    {
      text: "Lorem Ipsum",
      icon: (
        <CheckCircleOutlined style={{ color: "green", fontSize: "24px" }} />
      ),
    },
  ],
};

const TransactionHistory = () => {
  const [activeTab, setActiveTab] = useState("Monthly");

  const renderList = (data) => (
    <List
      size="large"
      dataSource={data}
      renderItem={(item) => (
        <List.Item className="flex justify-between items-center p-2">
          <span className="text-lg font-medium">{item.text}</span>
          <div>{item.icon}</div>
        </List.Item>
      )}
    />
  );

  return (
    <div className="w-full h-full bg-white border-[1.25px]  border-secondary rounded-[10px] shadow p-4 md:p-8">
      <div className="flex w-full justify-center">
        <div className="flex border border-secondary rounded-full p-1 mb-4">
          <button
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              activeTab === "Monthly"
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`}
            onClick={() => setActiveTab("Monthly")}
          >
            Monthly
          </button>
          <button
            className={`px-4 py-2 rounded-full transition-colors duration-300 ${
              activeTab === "Yearly"
                ? "bg-primary text-white"
                : "hover:bg-primary hover:text-white"
            }`}
            onClick={() => setActiveTab("Yearly")}
          >
            Yearly
          </button>
        </div>
      </div>
      <div className="max-w-4xl mx-auto">
        {activeTab === "Monthly" && renderList(transactionData.Monthly)}
        {activeTab === "Yearly" && renderList(transactionData.Yearly)}
      </div>
    </div>
  );
};

export default TransactionHistory;
