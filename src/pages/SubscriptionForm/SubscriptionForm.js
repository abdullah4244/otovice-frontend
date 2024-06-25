import React, { useEffect, useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";
import logo from "../../assets/octovoce-logo.svg";
import PayCard from "../../assets/pay-card.svg";
import "./SubscriptionForm.css";
import { updateUser } from "../../servives/auth";
import { useNavigate, useParams } from "react-router";
import { toast } from "react-toastify";
import { updateUserPlan } from "../../servives/stripe";

const SubscriptionForm = () => {
  const { planId } = useParams();

  const stripe = useStripe();

  const elements = useElements();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userData = JSON.parse(user);
      setUser(userData?.user);
    }
  }, []);

  const options = {
    style: {
      base: {
        color: "#424770",
        letterSpacing: "0.025em",
        fontFamily: "Source Code Pro, monospace",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#9e2146",
      },
    },
  };

  const updatePlan = async () => {
    try {
      const resp = await updateUserPlan({
        userId: user?._id ?? user?.id,
        newPlanId: planId,
      });
      toast("Plan Updated Successfully");
      console.log("resp", resp.data);
    } catch {
      toast("Failed To Update Plan");
      setLoading(false);
    }
  };

  const createCustomer = async () => {
    try {
      const customer = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/stripe/create-customer`,
        { email: user?.email }
      );
      const { customerId } = customer.data;
      return customerId;
    } catch {
      toast("Failed To create Customer");
    }
  };

  const createSubscription = async (customerId) => {
    try {
      const subscription = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/stripe/create-subscription`,
        { customerId, planId }
      );
      return subscription;
    } catch {
      toast("Failed To Create Subscription");
    }
  };

  const createNewPlan = async () => {
    const customerId = await createCustomer();
    const subscription = await createSubscription(customerId);
    const { isSubscribed } = subscription.data;

    if (!isSubscribed) {
      const { clientSecret } = subscription.data;

      const paymentIntent = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            email: user?.email,
          },
        },
      });

      if (paymentIntent.error) {
        setError(paymentIntent.error.message);
        setLoading(false);
        toast("Payment Failed, kindly Try Again");
      } else {
        setError(null);
        try {
          const resp = await updateUser(
            {
              customerId: customerId,
              planId: planId,
              subscriptionId: subscription.data.subscriptionId,
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
          setLoading(false);
          toast("Subscription successful!");
          navigate("/categories");
        } catch (error) {
          console.log("error", error);
          setLoading(false);
          toast("Subscription Failed");
        }
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (user?.customerId && user?.planId) {
      await updatePlan();
    } else {
      await createNewPlan();
    }
    setLoading(false);
  };

  return (
    <div className="pay-page-wrapper">
      <div className="pay-heading-wrapper">
        <img src={logo} alt="logo" />
        <span className="topic-name">Payment Method</span>
        <span className="topic-description">
          You have only option to continue payments through Credit/Debit/Visa
          Card.
        </span>
      </div>
      <div className="card-icon-heading">
        <img src={PayCard} alt="PayCard" />
      </div>
      <form onSubmit={handleSubmit} className="payment-form">
        <CardElement options={options} />
        <button type="submit" disabled={!stripe || loading} className="pay-btn">
          {loading ? "Processing..." : "Subscribe"}
        </button>
        {error && <div>{error}</div>}
      </form>
    </div>
  );
};

export default SubscriptionForm;
