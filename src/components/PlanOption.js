import React from "react";
import { Card } from "antd";
import "./PlanOption.css";
import { CheckCircleFilled } from "@ant-design/icons";

const PlanOption = ({
  id,
  heading,
  saving,
  price,
  subPrice,
  checked,
  onSelectPlan,
}) => {
  return (
    <Card className="plan-option-card" key={id} onClick={onSelectPlan}>
      <div className=" container mx-auto flex flex-col lg:flex-row w-full items-center gap-4 lg:gap-8">
        <div className="w-full md:w-auto">
          {checked ? (
            <CheckCircleFilled className="text-secondary text-3xl" />
          ) : (
            <div className="empty-checkbox" />
          )}
        </div>
        <div className="flex-grow w-full flex flex-col lg:flex-row justify-between">
          <div className="flex flex-row lg:flex-col gap-2 w-1/2 text-start">
            <span className="text-lg md:text-3xl font-semibold">{heading}</span>
            <span className="bg-tagBackground text-secondary font-medium  w-32 text-sm md:text-base px-2 py-1 rounded-lg">
              {saving}% Savings
            </span>
          </div>
          <div className="flex flex-row justify-around w-1/2 text-end">
            <div className="flex flex-row lg:flex-col gap-2 lg:gap-0 ">
              <div className="flex flex-col items-start lg:items-end">
                <span className="text-lg font-normal lg:text-2xl text-grey">
                  Total
                </span>
                <span className="text-xl lg:text-3xl font-semibold">
                  ${price}
                </span>
              </div>
            </div>
            <div className="flex flex-row lg:flex-col gap-2 lg:gap-0 ">
              <div className="flex flex-col items-start lg:items-end">
                <span className="text-lg font-normal lg:text-2xl text-grey">
                  Subtotal
                </span>
                <span className="text-xl lg:text-3xl font-semibold">
                  ${subPrice}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default PlanOption;
