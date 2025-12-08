import React from "react";

const Checkmark = ({ onClick, checked }) => {
  return (
    <label className="checkbox-wrapper">
      <input type="checkbox" className="checkbox-input" checked={checked} onClick={onClick} />
      <span className="checkbox-custom"></span>
    </label>
  );
};

export default Checkmark;
