import React from "react";

const ControlStepBtn = ({ updateStepFunc, direction, setDirection, setIsPrevious, isSubmit, isError, updateErrorFunc }) => {
  const handleControlStep = () => {
    if (isError) {
      updateErrorFunc();
    } else {
      updateStepFunc((prev) => prev + direction);
      setDirection(direction);
      setIsPrevious(direction > 0 ? false : true);
    }
  };

  return (
    <div className="flex flex-row-reverse">
      <button
        className={`${direction > 0 ? "sidebar-btn" : "previous-step-btn"} gap-2!`}
        type={isSubmit ? "submit" : "button"}
        onClick={handleControlStep}
      >
        {direction > 0 ? (
          <div className="flex gap-2">
            <p>Next</p>
            <img src="/general-icons/right-arrow-white.svg" alt="Right arrow" className="w-4" />
          </div>
        ) : (
          <div className="flex gap-2">
            <img src="/general-icons/right-arrow-pink.svg" alt="Right arrow" className="w-4 rotate-180" />
            <p>Previous</p>
          </div>
        )}
      </button>
    </div>
  );
};

export default ControlStepBtn;
