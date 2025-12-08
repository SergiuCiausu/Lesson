import React from "react";

const RemoveItemQueueBtn = ({ index, removeFromQueue }) => {
  return (
    <button onClick={() => removeFromQueue(index)} type="button">
      <img src="/general-icons/close-pink.svg" alt="Close icon" className="max-w-5! p-1!" />
    </button>
  );
};

export default RemoveItemQueueBtn;
