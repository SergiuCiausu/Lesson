import React from "react";
import FormInput from "../../../../general-components/FormInput";

const Step1 = ({ handleChange, formData, handleBlur }) => {
  return (
    <div className="flex flex-col pb-16!">
      <FormInput
        label="What would you like to name your project?"
        name="projectName"
        value={formData.projectName.value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Project name"
        id="create-project-project-name"
        error={formData.projectName.error}
      />
      <FormInput
        label="What subject will it be about?"
        name="subject"
        value={formData.subject.value}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Subject, domain, industry, etc."
        id="create-project-subject"
        error={formData.subject.error}
      />
    </div>
  );
};

export default Step1;
