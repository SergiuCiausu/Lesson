import React from "react";
import { useNavigate } from "react-router-dom";

const TopLeftDashboard = ({ setTabs }) => {
  const navigate = useNavigate();

  const handleHomeClick = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/tabs/activate-tab", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: null,
        }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error navigating dashboard");

      const newTabs = await res.json();

      setTabs(newTabs.tabs);

      navigate("/pr/dashboard");
    } catch (err) {
      console.log("Error navigating home on dashboard: ", err);
    }
  };

  return (
    <div className="dashboard-navbar-top-left-container">
      <button onClick={handleHomeClick}>
        <img src="/general-icons/home.svg" alt="Home icon" />
      </button>
      <p>Lesson</p>
    </div>
  );
};

export default TopLeftDashboard;
