import React, { useState } from "react";
import { Button } from "antd";
import PlanOption from "./PlanOption";
import { useNavigate } from "react-router";
import usePlanStore from "../store/usePlanStore";

const plans = [
  {
    id: 1,
    saving: "5",
    price: "160.56",
    subPrice: "150.15",
    heading: "Lorem Ipsum",
  },
  {
    id: 2,
    saving: "15",
    price: "370.56",
    subPrice: "360.15",
    heading: "Lorem Ipsum",
  },
  {
    id: 3,
    saving: "30",
    price: "756.56",
    subPrice: "752.15",
    heading: "Lorem Ipsum",
  },
  {
    id: 4,
    saving: "50",
    price: "1556.56",
    subPrice: "1552.15",
    heading: "Bundling (50 users)",
  },
];

const PaymentPlans = () => {
  const [selectedId, setSelectedId] = useState(null);
  const navigate = useNavigate();
  const setSelectedPlan = usePlanStore((state) => state.setSelectedPlan);

  const handleSelectPlan = (id) => {
    const plan = plans.find((p) => p.id === id);
    setSelectedId(id);
    setSelectedPlan(plan);
  };

  const handleNavigate = () => {
    if (selectedId != null) {
      navigate("/orderSummary");
    } else {
      alert("Please select a plan before proceeding.");
    }
  };

  return (
    <div>
      {plans.map((plan) => (
        <PlanOption
          key={plan.id}
          id={plan.id}
          heading={plan.heading}
          saving={plan.saving}
          price={plan.price}
          subPrice={plan.subPrice}
          checked={selectedId === plan.id}
          onSelectPlan={() => handleSelectPlan(plan.id)}
        />
      ))}
      <div className="flex flex-col sm:flex-row justify-center sm:justify-end mt-4 md:mt-6">
        <Button
          type="primary"
          className="bg-primary text-lg p-6 rounded-xl"
          onClick={handleNavigate}
        >
          Save & Move Next
        </Button>
      </div>
    </div>
  );
};

export default PaymentPlans;
