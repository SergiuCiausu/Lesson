import { useNavigate } from "react-router-dom";
import "../dashboard.css";
import { useState } from "react";
import { House } from "lucide-react";
import TopLeftDashboard from "./dashboard-nav-components/TopLeftDashboard";
import DisplayTabs from "./dashboard-nav-components/DisplayTabs";

const DashboardNavbar = ({ tabs, setTabs }) => {
  const [hoveredTab, setHoveredTab] = useState("");

  const navigate = useNavigate();

  const handleLogOut = async () => {
    try {
      const res = await fetch("http://localhost:3000/logout", {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Error logging out");

      navigate("/");
    } catch (err) {
      console.log("Error logging out: ", err);
    }
  };

  return (
    <div className="dashboard-navbar">
      <TopLeftDashboard setTabs={setTabs} />
      <div className="w-full flex items-center pr-8!">
        <div className="flex-1">
          <DisplayTabs tabs={tabs} hoveredTab={hoveredTab} setHoveredTab={setHoveredTab} />
        </div>
        <button className="w-fit text-nowrap" onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </div>
  );
};

export default DashboardNavbar;
