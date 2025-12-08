import React from "react";

const Skip = ({ updateStepFunc }) => {
  const handleSkip = () => {
    updateStepFunc((prev) => prev + 1);
  };

  return (
    <div className="flex items-center justify-center pb-8!">
      <button className="create-project-skip-btn text-center" onClick={handleSkip}>
        Skip for now
      </button>
    </div>
  );
};

export default Skip;
