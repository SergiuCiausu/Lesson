import "../dashboard.css";

const CreateProjectBtn = ({ type, setIsCreateProject }) => {
  const handleCreateProject = () => {
    setIsCreateProject(true);
  };

  return (
    <button className={type === "small" ? "sidebar-btn" : "empty-dashboard-main-btn"} onClick={handleCreateProject}>
      <img src="/sidebar-icons/plus-small-white.svg" alt="Add icon" className={type === "small" ? "w-6" : "w-10"} />
      Create project
    </button>
  );
};

export default CreateProjectBtn;
