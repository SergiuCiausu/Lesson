import React from "react";

const DisplayConceptsSidebar = ({ project, projectsToggled }) => {
  return (
    <div>
      {projectsToggled.includes(project.id)
        ? JSON.parse(project.concepts).concepts.map((concept, i) => (
            <div className="ml-5! flex gap-2 items-center py-1!">
              <img src="/general-icons/file-pink.svg" alt="File icon" />
              <p className="select-none">{concept.label}</p>
            </div>
          ))
        : ""}
    </div>
  );
};

export default DisplayConceptsSidebar;
