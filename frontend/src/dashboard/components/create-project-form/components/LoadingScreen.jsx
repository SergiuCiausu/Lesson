import React, { useEffect, useState } from "react";
import SpinnerLoading from "./loading-screen-components/SpinnerLoading";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const LoadingScreen = () => {
  const { projectId: paramId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();
  const projectId = state?.projectId || paramId;

  const [status, setStatus] = useState("");

  const startCreatingProject = async () => {
    try {
      const project = await fetch("http://localhost:3000/api/projects/setup-project", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: projectId,
        }),
        credentials: "include",
      });

      const projectData = await project.json();

      if (project.status >= 400) {
        navigate("/pr/dashboard");
        return;
      }

      setStatus(projectData.project.currStatus);

      if (projectData.project.currStatus === "done") {
        navigate(`/pr/${projectId}`);
      }
    } catch (err) {
      console.log("Error finding project: ", err);
    }
  };

  useEffect(() => {
    if (!projectId) {
      navigate("/dashboard");
      return;
    }

    startCreatingProject();
  }, [status]);

  return (
    <div className="create-project-container">
      <div className="create-project-overlay-container">
        <div className="flex flex-col items-center justify-center gap-4">
          <h1>Generating concepts...</h1>
          <SpinnerLoading />
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
