import React from "react";
import Step from "./StepBlock";

export default function StepNavigation(props) {
  return (
    <div className="stepWrapper justify-center w-full ml-52">
      {props.labelArray.map((item, index) => (
        <Step
          key={index}
          index={index}
          label={item}
          updateStep={props.updateStep}
          selected={props.currentStep === index + 1}
        ></Step>
      ))}
    </div>
  );
}
