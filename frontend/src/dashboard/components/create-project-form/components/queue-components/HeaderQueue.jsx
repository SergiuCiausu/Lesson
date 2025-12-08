import React from "react";
import AddItemsQueue from "./AddItemsQueue";

const HeaderQueue = ({ step, type, hasLength, setCurrentExtension, extensions, currentExtension }) => {
  return step === 3 ? (
    <div className="w-full flex items-center justify-between mt-4!">
      {hasLength ? (
        <select
          name="filter-extension"
          id="filter-extension"
          value={currentExtension}
          defaultValue="All items"
          onChange={(e) => setCurrentExtension(e.target.value)}
          className="text-black"
        >
          <option value="">All items</option>
          {extensions.map((extension, index) => (
            <option key={index} value={extension} onClick={(e) => setCurrentExtension(e.target.value)}>
              {extension}
            </option>
          ))}
        </select>
      ) : (
        ""
      )}
      <h3 className="pt-4!">Queue</h3>
      <AddItemsQueue />
    </div>
  ) : (
    <h3>{type ? "Current " : ""}Queue</h3>
  );
};

export default HeaderQueue;
