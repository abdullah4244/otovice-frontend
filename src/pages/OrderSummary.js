import React, { useEffect, useState } from "react";
import { Button, Image } from "antd";
import RightSvg from "../assets/RightSvg";
import logo from "../assets/logo.png";
import { CheckCircleFilled } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router";
import { getPlanDetails } from "../servives/stripe";

const OrderSummary = () => {
  const [planDetails, setPlanDetails] = useState(null);

  const { planId, planKey } = useParams();

  useEffect(() => {
    const populatePlanDetails = async () => {
      const data = await getPlanDetails(planId);
      setPlanDetails(data.data);
    };
    populatePlanDetails();
  }, []);

  const navigate = useNavigate();

  const [termsChecked, setTermsChecked] = useState(false);
  const [conditionsChecked, setConditionsChecked] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const navigateToTerms = () => {
    navigate("/");
  };

  const handlePayNow = () => {
    if (!termsChecked || !conditionsChecked) {
      setErrorVisible(true);
    } else {
      setErrorVisible(false);
      navigate(`/subscription/${planId}`);
    }
  };

  return (
    <div className="relative">
      <div className="absolute hidden md:block top-0 right-0">
        <RightSvg />
      </div>
      <div className="container mx-auto w-full max-w-7xl p-8">
        <div className="flex flex-col items-start justify-center mb-4 gap-4  md:gap-6 lg:gap-6">
          <Image
            src={logo}
            alt="logo"
            width={270}
            height={70}
            preview={false}
            className="object-cover"
          />
          <h2 className="text-4xl text-primary sm:text-2xl md:text-3xl font-bold text-center">
            Order Summary
          </h2>
          <p className="text-lg md:text-base text-secondary text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </p>
        </div>
        {planKey ? (
          <div className="flex flex-col  border-[1.25px] border-secondary rounded-lg">
            <div className="flex p-6 min-h-[100px] h-[100px] justify-between border-b  border-secondary">
              <div className="flex items-center gap-2">
                <CheckCircleFilled className="text-secondary text-3xl" />
                <span className="text-lg text-text md:text-2xl font-semibold">
                  {planKey}
                </span>
              </div>
              <span className="text-lg md:text-[27px] font-semibold">
                ${planDetails?.unit_amount/100}
              </span>
            </div>
            <div className="flex p-6 justify-between min-h-[100px] h-[100px]  border-b border-secondary ">
              <span className="text-lg  text-text md:text-2xl font-semibold">
                VAT {0}%
              </span>
              <span className="text-lg md:text-[27px] font-semibold">${0}</span>
            </div>
            <div className="flex p-6 min-h-[100px] h-[100px] justify-between border-b  border-secondary">
              <span className="text-lg  text-text md:text-2xl font-semibold">
                Discount {0}%
              </span>
              <div className="flex flex-col self-end">
                <span className="text-grey text-2xl font-light text-end">
                  Total
                </span>
                <span className="text-lg md:text-[27px] font-semibold">
                  ${planDetails?.unit_amount/100}
                </span>
              </div>
            </div>
            <div className="flex p-6 min-h-[100px] h-[100px] items-start justify-end  font-bold">
              <div className="flex flex-col  self-end ">
                <span className="text-grey text-2xl font-light text-end">
                  Total
                </span>
                <span className="text-lg md:text-[27px] font-semibold">
                  ${planDetails?.unit_amount/100}
                </span>
              </div>
            </div>
          </div>
        ) : (
          <p>No plan selected</p>
        )}
        <div className="flex flex-col text-left">
          <div className="mt-6">
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={termsChecked}
              onChange={() => setTermsChecked(!termsChecked)}
              className="text-secondary"
            />
            <label htmlFor="terms" className="ml-2 text-base text-secondary ">
              I have read and agree to the
              <span
                className="text-primary ml-1 cursor-pointer"
                onClick={navigateToTerms}
              >
                Terms & conditions
              </span>
            </label>
          </div>
          <div className="mt-6">
            <input
              type="checkbox"
              id="conditions"
              name="conditions"
              checked={conditionsChecked}
              onChange={() => setConditionsChecked(!conditionsChecked)}
              className="text-secondary"
            />
            <label
              htmlFor="conditions"
              className="ml-2 text-base text-secondary"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
              interdum ultricies interdum. Phasellus lacinia risus vel orci
              vehicula, vel egestas enim malesuada. Ut ornare vestibulum ante
              quis bibendum. Ut eget nulla et ligula tincidunt varius.
              Vestibulum vel aliquet mi. Cras finibus arcu at lorem venenatis
              eleifend. Nullam mattis condimentum ligula aliquet vulputate.
            </label>
          </div>
          {errorVisible && (
            <div className="text-red-500 mt-2">
              Please accept all terms and conditions to proceed.
            </div>
          )}
        </div>
        <div className="mt-6 flex justify-end">
          <Button
            type="primary"
            className="bg-primary text-white font-bold py-2 px-12 rounded"
            onClick={handlePayNow}
          >
            Pay Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
