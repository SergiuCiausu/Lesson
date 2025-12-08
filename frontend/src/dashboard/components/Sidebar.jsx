import { useState } from "react";
import "../dashboard.css";
import CreateProjectPlaceholder from "./CreateProjectPlaceholder";
import DisplayProjectsSidebar from "./sidebar-components/DisplayProjectsSidebar";

const Sidebar = ({ projects, setIsCreateProject }) => {
  const [projectsToggled, setProjectsToggled] = useState([]);

  return (
    <div className="sidebar-container">
      {projects ? (
        <DisplayProjectsSidebar projects={projects} projectsToggled={projectsToggled} setProjectsToggled={setProjectsToggled} />
      ) : (
        <CreateProjectPlaceholder type="small" setIsCreateProject={setIsCreateProject} />
      )}
    </div>
  );
};

export default Sidebar;
