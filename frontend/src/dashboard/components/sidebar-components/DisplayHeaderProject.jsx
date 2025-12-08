import React from "react";

const DisplayHeaderProject = ({ project, projectsToggled, setProjectsToggled }) => {
  return (
    <button
      className="w-full flex items-center justify-between"
      onClick={() =>
        setProjectsToggled((prev) => (!projectsToggled.includes(project.id) ? [...prev, project.id] : prev.filter((item) => item !== project.id)))
      }
    >
      <div className="flex gap-2 items-center">
        <img src="/sidebar-icons/folder-pink.svg" alt="Folder icon" />
        <p className="max-w-[173px] select-none">{project.projectOriginals.projectName}</p>
      </div>
      <img src="/sidebar-icons/arrow-down.svg" alt="Toggle icon" className={projectsToggled.includes(project.id) ? "rotate-180" : ""} />
    </button>
  );
};

export default DisplayHeaderProject;
