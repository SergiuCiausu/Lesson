import React from "react";
import { Link } from "react-router-dom";

const LoginBtn = () => {
  return (
    <Link to="/login" className="login-btn">
      <img src="/login-icons/google.png" alt="Google icon" className="w-4" />
      <p className="text-white">Login</p>
    </Link>
  );
};

export default LoginBtn;
