import React from "react";

const DisplayTabs = ({ tabs, hoveredTab, setHoveredTab }) => {
  const handleClickTab = async (tabId) => {
    try {
      const res = await fetch("http://localhost:3000/api/tabs/activate-tab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: tabId,
        }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error activating tab");

      const newTabs = await res.json();

      const sortedTabs = newTabs.tabs.sort((a, b) => a.createdAt.localeCompare(b.createdAt));

      setTabs(sortedTabs);
    } catch (err) {
      console.error("Error fetching activating tab: ", err);
    }

    navigate(`/pr/${tabId}`);
  };

  const handleDeleteTab = async (tabId) => {
    try {
      const res = await fetch("http://localhost:3000/api/tabs/delete-tab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: tabId,
        }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Failed to delete tab");

      const tabsRemaining = await res.json();

      if (tabsRemaining.tabs.length === 0) {
        navigate("/pr/dashboard");
      } else {
        navigate(`/pr/${tabsRemaining.tabs[tabsRemaining.length - 1].id}`);
      }
    } catch (err) {
      console.log("Error deleting tab: ", err);
    }
  };

  return tabs.map((tab) => (
    <button key={tab.id} onClick={() => handleClickTab(tab.id)} onMouseEnter={() => setHoveredTab(tab.id)} onMouseLeave={() => setHoveredTab("")}>
      <div className={`tab-container ${tab.isActive && "tab-container-active"}`}>
        <div className="flex items-center gap-2">
          <img src={`/general-icons/file-${tab.isActive ? "pink" : "dark-gray"}.svg`} alt="File icon" />
          <p className={`${tab.isActive ? "text-black" : "dark-gray-text"}`}>{tab.label}</p>
        </div>
        {tab.id === hoveredTab ? (
          <span
            onClick={(e) => {
              e.stopPropagation();
              handleDeleteTab(tab.id);
            }}
          >
            <img src="/general-icons/close-dark-gray.svg" alt="Close icon" />
          </span>
        ) : (
          ""
        )}
      </div>
    </button>
  ));
};

export default DisplayTabs;
