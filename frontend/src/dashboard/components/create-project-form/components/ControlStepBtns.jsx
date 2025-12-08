import React from "react";
import ControlStepBtn from "./ControlStepBtn";

const ControlStepBtns = ({ step, updateStepFunc, setDirection, setIsPrevious, isError, updateErrorFunc }) => {
  return (
    <div className={`flex ${step > 0 ? "justify-between" : "flex-row-reverse"}`}>
      {step > 0 && <ControlStepBtn updateStepFunc={updateStepFunc} direction={-1} setDirection={setDirection} setIsPrevious={setIsPrevious} />}
      <ControlStepBtn
        updateStepFunc={updateStepFunc}
        direction={1}
        setDirection={setDirection}
        setIsPrevious={setIsPrevious}
        isSubmit={step === 0}
        isError={isError}
        updateErrorFunc={updateErrorFunc}
      />
    </div>
  );
};

export default ControlStepBtns;
