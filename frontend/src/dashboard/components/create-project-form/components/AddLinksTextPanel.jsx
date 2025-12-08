import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Queue from "./Queue";
import CloseBtn from "../../../../general-components/CloseBtn";

const AddLinksTextPanel = ({ type, handleAddLink, queue, setFormData, setIsAddTextLinksPanelOpen }) => {
  const [value, setValue] = useState("");

  return (
    <AnimatePresence>
      <motion.div key="modal-add-link-text" initial={{ opacity: 1 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
        <div className="create-project-container z-1002!">
          <div className="create-project-overlay-container flex flex-col items-center">
            <div className={`w-full flex flex-row-reverse justify-between`}>
              <CloseBtn updateStateFunc={setIsAddTextLinksPanelOpen} />
            </div>
            {/* prettier-ignore */}
            <h3 className="text-center">Add {type === "link" ? "Links" : (type === "text" ? "Text" : "")}</h3>
            {type === "link" ? (
              <div className="flex flex-col gap-1">
                <form className="flex gap-1 items-center" onSubmit={(e) => handleAddLink(e, type, value)}>
                  <input
                    type="text"
                    name={type}
                    value={value}
                    placeholder="Paste link here"
                    className="form-input"
                    onChange={(e) => setValue(e.target.value.trim())}
                  />
                  <button type="submit">
                    <img src="/general-icons/plus-small-pink.svg" alt="Add icon" />
                  </button>
                </form>
                <p className="text-red-500">{queue.error || ""}</p>
              </div>
            ) : (
              <div className="flex flex-col gap-1">
                <form className="flex gap-1 items-center" onSubmit={(e) => handleAddLink(e, type, value)}>
                  <textarea
                    type="text"
                    name={type}
                    value={value}
                    placeholder="Paste link here"
                    className="form-input queue-textarea"
                    onChange={(e) => setValue(e.target.value.trim())}
                    rows={1}
                  />
                  <button type="submit">
                    <img src="/general-icons/plus-small-pink.svg" alt="Add icon" />
                  </button>
                </form>
                <p className="text-red-500">{queue.error || ""}</p>
              </div>
            )}
            <Queue queue={queue} type={type} setFormData={setFormData} />
            <button
              className="submit-btn-popup w-[526px]! mt-4!"
              onClick={() => {
                setIsAddTextLinksPanelOpen(false);
              }}
            >
              <img src="/general-icons/checkmark-white.svg" alt="Checkmark icon" className="w-6" />
              Add {type.charAt(0).toUpperCase() + type.slice(1)} to Queue
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default AddLinksTextPanel;
