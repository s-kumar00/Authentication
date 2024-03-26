import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import Login from "../components/Login";
import SignUp from "../components/SignUp";

const Auth = () => {
  const navigate = useNavigate();
  const [isLoginOpen, setLoginOpen] = useState(true);
  const handleToggle = () => {
    setLoginOpen(!isLoginOpen);
  };

  const handleCloseAuth = () => {
    navigate("/");
  };
  return (
    <div className="fixed z-50 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-20 opacity-75 dark:bg-gray-90"></div>
        </div>
        <div className="absolute bg-gray-50 rounded-lg p-8 max-w-md w-4/5 sm:w-full dark:bg-gray-10">
          <RxCross2
            onClick={handleCloseAuth}
            className="text-4xl font-bold absolute top-0 right-0 m-4 p-2 text-gray-100 hover:text-secondary cursor-pointer dark:text-gray-90 dark:hover:text-secondary"
          />
          {isLoginOpen ? (
            <Login handleToggle={handleToggle} />
          ) : (
            <SignUp handleToggle={handleToggle} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
