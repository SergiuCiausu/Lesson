import React from "react";

const SubmitCreateProjectBtn = ({ agreedTnC, setError, error }) => {
  return (
    <button
      className={`submit-btn-popup ${error && "cursor-not-allowed!"}`}
      type={agreedTnC ? "submit" : "button"}
      onClick={() => {
        if (!agreedTnC) setError(true);
      }}
    >
      <img src="/general-icons/checkmark-white.svg" alt="Checkmark icon" className="w-6" />
      Create Project
    </button>
  );
};

export default SubmitCreateProjectBtn;
