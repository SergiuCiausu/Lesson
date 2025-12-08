import { useState } from "react";
import CreateProjectBtn from "./CreateProjectBtn";
import CreateProjectPlaceholder from "./CreateProjectPlaceholder";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { Pencil } from "lucide-react";

const DashboardMain = ({ projects, setIsCreateProject, setProjects, setIsSearching, setTabs }) => {
  const currentTime = new Date();

  const navigate = useNavigate();

  const [moreOptionsId, setMoreOptionsId] = useState("");
  const [renameId, setRenameId] = useState("");

  const [deletePopupCoords, setDeletePopupCoords] = useState({
    top: -1,
    left: -1,
  });

  const [searchQuery, setSearchQuery] = useState("");

  const handleMoreOptions = (project) => {
    setMoreOptionsId((prev) => (prev === `dots-pr-${project.id}` ? "" : `dots-pr-${project.id}`));

    const optionsBtn = document.getElementById(`dots-pr-${project.id}`);

    const deletePopupRect = optionsBtn.getBoundingClientRect();

    setDeletePopupCoords({
      top: deletePopupRect.top + 16,
      left: deletePopupRect.left,
    });
  };

  const handleDeleteProject = async (project) => {
    try {
      const res = await fetch("http://localhost:3000/api/projects/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: project.id,
        }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete project");
    } catch (err) {
      console.log("Error deleting project: ", err);
    }

    try {
      const res = await fetch("http://localhost:3000/api/tabs/delete-tab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: project.id,
        }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete tab");
    } catch (err) {
      console.log("Error deleting tab: ", err);
    }
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    const searchProjects = await fetch("http://localhost:3000/api/projects/search-projects", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        searchQuery,
      }),
      credentials: "include",
    });

    if (searchProjects.status >= 400) throw new Error("Error searching projects");

    const searchProjectsData = await searchProjects.json();

    setProjects(searchProjectsData.projects.filter((project) => project.currStatus === "done"));
  };

  const handleAddTab = async (id, label) => {
    navigate(`/pr/${id}`);

    try {
      const tabs = await fetch("http://localhost:3000/api/tabs/add-tab", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          id,
          label,
        }),
        credentials: "include",
      });

      if (!tabs) throw new Error("Error adding new tab");

      const newTabsData = await tabs.json();

      setTabs(newTabsData.tabs);
    } catch (err) {
      console.log("Error adding tab: ", err);
    }
  };

  const handleRename = async (project, e) => {
    e.preventDefault();

    try {
      const rename = await fetch("http://localhost:3000/api/projects/rename-project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: project.id,
          name: e.target.elements.projectName.value,
        }),
        credentials: "include",
      });

      if (!rename.ok) throw new Error("Error renaming project");

      setRenameId("");
    } catch (err) {
      console.log("Error renaming project: ", err);
    }
  };

  return (
    <div className="dashboard-main-container">
      {projects ? (
        <div className="flex flex-col gap-4">
          <div className="flex gap-4 h-full">
            <CreateProjectBtn type="small" setIsCreateProject={setIsCreateProject} />
            <form className="w-full" onSubmit={handleSearchSubmit}>
              <input
                type="text"
                className="search-bar"
                placeholder="Search projects, concepts, lessons, etc."
                onChange={(e) => {
                  if (e.target.value === "" || searchQuery === "") {
                    setIsSearching(false);
                  } else {
                    setIsSearching(true);
                  }

                  setSearchQuery(e.target.value);
                }}
              />
            </form>
          </div>
          <div className="flex flex-wrap gap-5 pb-5!">
            {projects.map((project, index) => {
              const lastUpdate = new Date(project.updatedAt);

              const minutesAgo = Math.floor((currentTime - lastUpdate) / (1000 * 60));
              const hoursAgo = Math.floor((currentTime - lastUpdate) / (1000 * 60 * 60));
              const daysAgo = Math.floor((currentTime - lastUpdate) / (1000 * 60 * 60 * 24));
              const monthsAgo = Math.floor((currentTime - lastUpdate) / (1000 * 60 * 60 * 24 * 30));

              const timeAgo =
                minutesAgo > 60
                  ? hoursAgo > 24
                    ? daysAgo > 30
                      ? `${monthsAgo} month${monthsAgo !== 1 ? "s" : ""} ago`
                      : `${daysAgo} day${daysAgo !== 1 ? "s" : ""} ago`
                    : `${hoursAgo} hour${hoursAgo !== 1 ? "s" : ""} ago`
                  : `${minutesAgo} minute${minutesAgo !== 1 ? "s" : ""} ago`;

              let chaptersNum;

              try {
                chaptersNum = JSON.parse(project?.concepts)?.concepts.length;
              } catch (err) {
                chaptersNum = 0;
              }

              return (
                <div key={index} className="w-1/5 bg-white flex flex-col gap-4">
                  <button className="w-full" onClick={() => handleAddTab(project.id, project.projectOriginals.projectName)}>
                    <div className="w-full h-[153px] dark-gray-bg"></div>
                  </button>
                  <div className="flex flex-col gap-4 p-4! pt-0!">
                    <div className="flex justify-between items-center">
                      <button className="cursor-text!" onClick={() => setRenameId(project.id)}>
                        {renameId === project.id ? (
                          <form onSubmit={(e) => handleRename(project, e)} className="flex items-center">
                            <input
                              type="text"
                              name="projectName"
                              placeholder="Enter project name"
                              className="form-input w-fit! py-1! px-4! rounded-lg!"
                            />
                            <button type="submit" className="p-2!">
                              <img src="/general-icons/checkmark-pink.svg" alt="Check icon" className="w-4" />
                            </button>
                          </form>
                        ) : (
                          <p className="semibold select-none">{project.projectOriginals.projectName}</p>
                        )}
                      </button>
                      <p className="detail-p select-none">{chaptersNum} chapters</p>
                    </div>
                    <div className="flex items-end justify-between">
                      <p className="detail-p text-left select-none">Edited {timeAgo}</p>
                      <button id={`dots-pr-${project.id}`} onClick={() => handleMoreOptions(project)}>
                        <img src="/general-icons/dots.svg" alt="More options icon" className="w-4" />
                        {moreOptionsId === `dots-pr-${project.id}` ? (
                          <div className="bg-white px-4! py-2! absolute rounded-lg! flex flex-col gap-2 items-start">
                            <button className="flex gap-1 items-center" onClick={() => setRenameId(project.id)}>
                              <Pencil className="w-5" />
                              <p>Rename</p>
                            </button>
                            <button
                              className="text-red-500 flex gap-1 items-center"
                              style={{
                                top: deletePopupCoords.top,
                                left: deletePopupCoords.left,
                              }}
                              onClick={() => handleDeleteProject(project)}
                            >
                              <Trash2 className="w-5" />
                              <p>Delete project</p>
                            </button>
                          </div>
                        ) : (
                          ""
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <CreateProjectPlaceholder type="big" setIsCreateProject={setIsCreateProject} />
      )}
    </div>
  );
};

export default DashboardMain;
