import { useEffect, useState } from "react";
import { useAuth } from "../../lib/auth/AuthContext";
import DashboardMain from "./components/DashboardMain";
import DashboardNavbar from "./components/DashboardNavbar";
import Sidebar from "./components/Sidebar";
import "./dashboard.css";
import CreateProject from "./components/create-project-form/CreateProject";
import { AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import ProjectBoard from "../pr/ProjectBoard";

const Dashboard = () => {
  const { user, loading, logout } = useAuth();
  const [projects, setProjects] = useState([]);
  const [sidebarProjects, setSidebarProjects] = useState([]);
  const [isCreateProject, setIsCreateProject] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [tabs, setTabs] = useState([]); // [{ id: number, label: string, isActive: bool }]

  const location = useLocation();

  if (loading) {
    return <div>Loading…</div>;
  }
  if (!user) {
    return null;
  }

  const getProjects = async () => {
    try {
      const projects = await fetch("http://localhost:3000/api/projects/get-all-projects", {
        method: "POST",
        credentials: "include",
      });

      if (!projects.ok) throw new Error("Error fetching projects");

      const projectsData = await projects.json();

      setProjects(projectsData.projects.filter((project) => project.currStatus === "done"));
      setSidebarProjects(projectsData.projects.filter((project) => project.currStatus === "done"));
    } catch (err) {
      console.log("Error getting projects: ", err);
    }
  };

  const getTabs = async () => {
    try {
      const tabs = await fetch("http://localhost:3000/api/tabs/get-tabs", {
        method: "POST",
        credentials: "include",
      });

      const tabsData = await tabs.json();

      setTabs(tabsData.tabs);
    } catch (err) {
      console.log("Error fetching tabs: ", err);
    }
  };

  useEffect(() => {
    const eventSource = new EventSource("http://localhost:3000/api/projects/stream", {
      withCredentials: true,
    });

    getProjects();
    getTabs();

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "project-updated" || !isSearching) {
        getProjects();
      }
      if (data.type === "tab-updated") {
        getTabs();
      }
    };
    return () => eventSource.close();
  }, []);

  return (
    <div className="dashboard-container w-screen h-screen">
      <AnimatePresence>{isCreateProject && <CreateProject setIsCreateProject={setIsCreateProject} />}</AnimatePresence>
      <DashboardNavbar tabs={tabs} setTabs={setTabs} />
      <div className="flex">
        <Sidebar projects={sidebarProjects} setIsCreateProject={setIsCreateProject} />
        {location.pathname === "/pr/dashboard" ? (
          <DashboardMain
            projects={projects}
            setIsCreateProject={setIsCreateProject}
            setProjects={setProjects}
            setIsSearching={setIsSearching}
            setTabs={setTabs}
          />
        ) : (
          <ProjectBoard />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
