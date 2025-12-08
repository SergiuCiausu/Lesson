import React from "react";
import ItemQueue from "./ItemQueue";
import RemoveItemQueueBtn from "./RemoveItemQueueBtn";

const DisplayQueueItems = ({ queue, type, isQueueNotEmpty, removeFromQueue, currentExtension }) => {
  const hasQueueContentTypes = [
    {
      type: "file",
      hasType: queue.value.some((item) => item.type === "file"),
    },
    {
      type: "link",
      hasType: queue.value.some((item) => item.type === "link"),
    },
    {
      type: "text",
      hasType: queue.value.some((item) => item.type === "text"),
    },
  ];

  const typeMatch = hasQueueContentTypes.find((item) => item.type === type);

  const getIndexToRemove = (index) => queue.value.filter((item) => !type || item.type === type).findIndex((item) => item.id === index);

  let placeholder = null;

  if (isQueueNotEmpty) {
    if (type && !typeMatch?.hasType) {
      placeholder = (
        <div className="w-full h-full flex items-center justify-center">
          <p className="queue-container-placeholder">Empty {type} queue</p>
        </div>
      );
    }
  } else {
    if (type && !typeMatch?.hasType) {
      placeholder = (
        <div className="w-full h-full flex items-center justify-center">
          <p className="queue-container-placeholder">Empty {type} queue</p>
        </div>
      );
    } else {
      placeholder = <p className="queue-container-placeholder">Empty queue</p>;
    }
  }

  return (
    <div className={`queue-container p-8! ${isQueueNotEmpty ? "" : "flex items-center justify-center"}`}>
      {placeholder
        ? placeholder
        : queue.value
            .filter((item) => !type || item.type === type)
            .filter((item) => !currentExtension || item.extension === currentExtension)
            .map((entry, index) => (
              <div key={index} className="flex justify-between items-start gap-8">
                <ItemQueue type={type || entry.type} entry={entry} />
                <RemoveItemQueueBtn index={getIndexToRemove(index)} removeFromQueue={removeFromQueue} />
              </div>
            ))}
    </div>
  );
};

export default DisplayQueueItems;
