import React from "react";

const ItemQueue = ({ entry, type }) => {
  return (
    <div className="flex items-start gap-2">
      <img src={`/general-icons/${type}-pink.svg`} alt={`${type} Icon`} className="w-5" />

      {entry.type === "text" || type === "text" ? (
        <div className="text-entry-queue">
          <p>{entry.label}</p>
        </div>
      ) : (
        <p>{entry.label.name || entry.label}</p>
      )}
    </div>
  );
};

export default ItemQueue;
