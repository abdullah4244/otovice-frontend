import axios from "axios";

export const getPlanDetails = async (planID) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/stripe/get-plan-details`,
    {
      priceId: planID,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const updateUserPlan = async (payload) => {
  return await axios.post(
    `${process.env.REACT_APP_API_URL}/api/stripe/update-plan`,
    {
      ...payload,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
