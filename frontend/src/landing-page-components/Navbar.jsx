import React from "react";
import LoginBtn from "../general-components/LoginBtn";

const Navbar = ({ onLinkClickFuncs }) => {
  const navLinks = ["Features", "How It Works", "Preview", "Pricing"];

  return (
    <div className="py-4! nav-container w-screen">
      <div className="app-container flex items-center justify-between">
        <button className="flex gap-3 items-center">
          <img src="/general-icons/logo.svg" alt="Logo" />
          <p className="text-white">Lesson</p>
        </button>
        <div className="flex items-center gap-16">
          {navLinks.map((link, index) => (
            <button onClick={onLinkClickFuncs[index]} className="text-white primary-font text-sm!">
              {link}
            </button>
          ))}
        </div>
        <LoginBtn />
      </div>
    </div>
  );
};

export default Navbar;
