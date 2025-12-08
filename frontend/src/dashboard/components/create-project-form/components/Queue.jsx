import { useState } from "react";
import DisplayQueueItems from "./queue-components/DisplayQueueItems";
import HeaderQueue from "./queue-components/HeaderQueue";

const Queue = ({ queue, step, type, setFormData, setCurrentExtension, extensions, currentExtension }) => {
  const isQueueNotEmpty = queue?.value?.length > 0 || false;

  const removeFromQueue = (index) => {
    setFormData((prev) => ({
      ...prev,
      queue: {
        ...prev.queue,
        value: prev.queue.value
          .filter((_, i) => i !== index)
          .map((item, i) => ({
            ...item,
            id: i,
          })),
      },
    }));
  };

  return (
    <div className={`flex flex-col items-center pb-2!`}>
      <HeaderQueue
        step={step}
        type={type}
        hasLength={queue.value.length || false}
        setCurrentExtension={setCurrentExtension}
        extensions={extensions}
        currentExtension={currentExtension}
      />
      <DisplayQueueItems
        queue={queue}
        type={type}
        isQueueNotEmpty={isQueueNotEmpty}
        removeFromQueue={removeFromQueue}
        currentExtension={currentExtension}
      />
    </div>
  );
};

export default Queue;
