import React from "react";

const FormInput = ({ label, name, value, placeholder, id, onChange, onBlur, error }) => {
  return (
    <div className="pt-8! pb-4! flex flex-col items-center gap-4">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <div className={`flex flex-col ${error ? "gap-2" : ""} items-center`}>
        <input id={id} name={name} value={value} placeholder={placeholder} onChange={onChange} onBlur={onBlur} type="text" className="form-input" />
        <p className="text-red-500">{error}</p>
      </div>
    </div>
  );
};

export default FormInput;
