import React from "react";
import ProjectDetails from "./step3-components/ProjectDetails";
import Queue from "./Queue";

const Step3 = ({
  formData,
  handleChange,
  handleBlur,
  isError,
  onClick,
  checked,
  tnCError,
  setFormData,
  setCurrentExtension,
  extensions,
  currentExtension,
}) => {
  return (
    <div className="flex gap-8 justify-between pt-8! pb-4!">
      <ProjectDetails
        formData={formData}
        handleChange={handleChange}
        handleBlur={handleBlur}
        isError={isError}
        onClick={onClick}
        checked={checked}
        tnCError={tnCError}
      />
      <Queue
        queue={formData.queue}
        step={3}
        setFormData={setFormData}
        setCurrentExtension={setCurrentExtension}
        extensions={extensions}
        currentExtension={currentExtension}
      />
    </div>
  );
};

export default Step3;
