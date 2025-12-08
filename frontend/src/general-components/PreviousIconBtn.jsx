import React from "react";

const PreviousIconBtn = ({ updateStateFunc }) => {
  return (
    <button onClick={() => updateStateFunc((prev) => prev - 1)}>
      <img src="/general-icons/left-arrow.svg" alt="Previous icon" />
    </button>
  );
};

export default PreviousIconBtn;
