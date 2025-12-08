import React from "react";
import "../create-project.css";

const AddContent = ({ btnContent }) => {
  return (
    <button className={`add-lesson-btn add-lesson-btn-${btnContent.label.toLowerCase()}`} onClick={() => btnContent.onClick()}>
      <img src={`/general-icons/${btnContent.icon}`} alt="Add file" className="w-8" />
      {btnContent.label}
    </button>
  );
};

export default AddContent;
