import React, { useState } from "react";
import AddContent from "./AddContent";
import Queue from "./Queue";
import Skip from "./step2-components/Skip";

const Step2 = ({ updateStepFunc, formData, setIsAddTextLinksPanelOpen, type, handleAddToQueue, setFormData }) => {
  const btns = [
    {
      icon: "add-file.svg",
      label: "Files",
      onClick: () => document.getElementById("fileUpload").click(),
    },
    {
      icon: "add-link.svg",
      label: "Links",
      onClick: () => setIsAddTextLinksPanelOpen("link"),
    },
    {
      icon: "add-text.svg",
      label: "Text",
      onClick: () => setIsAddTextLinksPanelOpen("text"),
    },
  ];

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach((file) => {
      handleAddToQueue(null, "file", file);
    });

    e.target.value = "";
  };

  return (
    <div>
      <h3 className="text-center pt-0!">What notes would you like to add?</h3>
      <input type="file" id="fileUpload" multiple onChange={handleFileUpload} style={{ display: "none" }} />
      <div className="flex items-center justify-center gap-6 pb-8!">
        {btns.map((btn, index) => (
          <div key={index}>
            <AddContent btnContent={btn} />
          </div>
        ))}
      </div>
      <Queue queue={formData.queue} setFormData={setFormData} step={2} type={type} />
      <Skip updateStepFunc={updateStepFunc} />
    </div>
  );
};

export default Step2;
