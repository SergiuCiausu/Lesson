import React from "react";
import DisplayHeaderProject from "./DisplayHeaderProject";
import DisplayConceptsSidebar from "./DisplayConceptsSidebar";

const DisplayProjectsSidebar = ({ projects, projectsToggled, setProjectsToggled }) => {
  return projects.map((project, index) => (
    <div key={index} className="flex flex-col gap-2">
      <DisplayHeaderProject project={project} projectsToggled={projectsToggled} setProjectsToggled={setProjectsToggled} />
      <DisplayConceptsSidebar project={project} projectsToggled={projectsToggled} />
    </div>
  ));
};

export default DisplayProjectsSidebar;
