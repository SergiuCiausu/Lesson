import React from "react";

const CloseBtn = ({ updateStateFunc }) => {
  const handleClose = () => {
    updateStateFunc(false);
  };

  return (
    <button onClick={handleClose}>
      <img src="/general-icons/close.svg" alt="Close icon" className="w-4" />
    </button>
  );
};

export default CloseBtn;
