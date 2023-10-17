import React, { useContext, useState } from "react";
import StepNavigation from "./StepNavigation";
import "../../assets/CSS/step.css";
import Step1 from "./Step/Step1";
import Step2 from "./Step/Step2";
import { ToastContainer } from "react-toastify";
import { UserShopContext } from "../../layouts/MainLayout";

export default function Regisnation() {
  const [shop] = useContext(UserShopContext);
  const labelArray = ["Đăng ký", "Chờ duyệt"];
  const [currentStep, updateCurrentStep] = useState(1);
  function updateStep(step) {
    updateCurrentStep(step);
  }
  return (
    <div className="justify-center container mt-5 p-5 shadow-lg w-full">
      <ToastContainer />
      <StepNavigation
        labelArray={labelArray}
        currentStep={currentStep}
        updateStep={updateStep}
      ></StepNavigation>
      {currentStep === 1 && shop.status !== 0 ? (
        <Step1
          currentStep={currentStep}
          labelArray={labelArray}
          updateStep={updateStep}
        />
      ) : (
        <Step2
          currentStep={currentStep}
          labelArray={labelArray}
          updateStep={updateStep}
        />
      )}
    </div>
  );
}
