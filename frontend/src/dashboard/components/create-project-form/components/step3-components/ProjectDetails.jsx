import React, { useState } from "react";
import Checkmark from "../../../../../general-components/Checkmark";

const ProjectDetails = ({ formData, handleChange, handleBlur, isError, onClick, checked, tnCError }) => {
  const [makeInput, setMakeInput] = useState(-1);

  const details = [
    {
      name: "projectName",
      title: "Project name",
      variable: formData.projectName.value,
    },
    {
      name: "subject",
      title: "Subject",
      variable: formData.subject.value,
    },
  ];

  const handleEdit = (id) => {
    const error = handleBlur();

    if (!error) {
      if (makeInput === id) {
        {
          setMakeInput(-1);
        }
      } else {
        setMakeInput(id);
      }
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="flex flex-col">
        <h3>Project Details</h3>
        <div className="flex flex-col gap-4">
          {details.map((detail, index) => (
            <div key={index} className="flex flex-col gap-1">
              <p className="title-p">{detail.title}</p>
              <div>
                {makeInput === index ? (
                  <form action="" className="w-full flex flex-col">
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        name={detail.name}
                        value={formData[Object.keys(formData)[index]].value}
                        placeholder={detail.title}
                        className="w-full small-form-input"
                        onChange={handleChange}
                      />
                      <button onClick={() => handleEdit(index)} type="button">
                        <img src={`/general-icons/${makeInput === index ? "checkmark-pink.svg" : "pencil-pink.svg"}`} alt="Edit icon" />
                      </button>
                    </div>

                    {isError && <p className="text-red-500 pl-2!">{formData[Object.keys(formData)[index]].error}</p>}
                  </form>
                ) : (
                  <div className="flex gap-2 items-center">
                    <p>{detail.variable}</p>
                    <button onClick={() => handleEdit(index)}>
                      <img src={`/general-icons/${makeInput === index ? "checkmark-pink.svg" : "pencil-pink.svg"}`} alt="Edit icon" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex gap-2 items-center">
          <Checkmark onClick={onClick} checked={checked} />
          <p className="pointer-events-none">I agree to Terms & Conditions</p>
        </div>
        <p className="text-red-500">{tnCError ? "You must agree to Terms & Conditions" : ""}</p>
      </div>
    </div>
  );
};

export default ProjectDetails;
