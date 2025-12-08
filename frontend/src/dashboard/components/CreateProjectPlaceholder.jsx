import React from "react";
import "../dashboard.css";
import CreateProjectBtn from "./CreateProjectBtn";

const CreateProjectPlaceholder = ({ type, setIsCreateProject }) => {
  return (
    <div className={type === "small" ? "create-project-sidebar-container" : "w-full h-full flex flex-col items-center justify-center gap-2"}>
      <p className={type === "big" ? "empty-dashboard-main-p" : ""}>You have no projects created.</p>
      <CreateProjectBtn type={type} setIsCreateProject={setIsCreateProject} />
    </div>
  );
};

export default CreateProjectPlaceholder;
