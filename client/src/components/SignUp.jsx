import React, { useState } from "react";
import { FiExternalLink } from "react-icons/fi";
import { AiOutlineGoogle } from "react-icons/ai";
import { DiGithubBadge } from "react-icons/di";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { registerRoute } from "../Api/authApi";
import { toastOptions } from "../utils/utility";

const SignUp = ({ handleToggle }) => {
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = formData.name;
    const email = formData.email;
    const password = formData.password;
    try{
      if (handleValidation()) {
        const dataRes = await registerRoute({ name, email, password });
        if (dataRes.data.alert) {
          toast.success(dataRes.data.message, toastOptions);
          handleToggle();
        } else {
          toast.error(dataRes.data.message, toastOptions);
        }
      }
    }catch(error) {
      toast.error(error.message, toastOptions);
    }
  };

  const handleValidation = () => {
    const { name, email, password, confirmPassword } = formData;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match", toastOptions);
      return false;
    } else if (name.length < 3) {
      toast.error("Username must be at least 3 characters long", toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error("Password must be at least 6 characters long", toastOptions);
      return false;
    } else if (!email.includes("@")) {
      toast.error("Email must be valid", toastOptions);
      return false;
    } else if (password.includes(name)) {
      toast.error("Password must not contain username", toastOptions);
      return false;
    } else if (password.includes(email)) {
      toast.error("Password must not contain email", toastOptions);
      return false;
    }
    return true;
  };

  return (
    <>
      <h2 className="text-center text-2xl font-extrabold text-gray-10 mb-4 dark:text-gray-90">
        Sign up for an account
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4 text-gray-50">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Your Name"
            onChange={handleChange}
            className="font-normal rounded-md p-2 w-full border border-gray-300 focus:ring dark:text-gray-90"
            required
          />
        </div>
        <div className="mb-4 text-gray-50">
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email address"
            onChange={handleChange}
            className="font-normal rounded-md p-2 w-full border border-gray-300 focus:ring dark:text-gray-90"
            required
          />
        </div>
        <div className="mb-4 text-gray-50">
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            onChange={handleChange}
            className="font-normal rounded-md p-2 w-full border border-gray-300 focus:ring dark:text-gray-90"
            required
          />
        </div>
        <div className="mb-4 text-gray-50">
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            onChange={handleChange}
            className="font-normal rounded-md p-2 w-full border border-gray-300 focus:ring dark:text-gray-90"
            required
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="py-2 px-4 w-full font-bold text-md bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Sign Up
          </button>
        </div>
      </form>

      <div className="text-center py-2">
        <p className="text-gray-200 dark:text-gray-50">
          Already have an account ?{" "}
          <Link
            onClick={handleToggle}
            className="text-indigo-400 font-medium inline-flex space-x-1 items-center  dark:text-indigo-600"
          >
            <span>Login</span>
            <FiExternalLink />
          </Link>
        </p>
      </div>

      <div className="my-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
          OR
        </p>
      </div>
      <div className="flex flex-row justify-center items-center gap-8 text-2xl text-blue-600 cursor-pointer">
        <AiOutlineGoogle />
        <DiGithubBadge />
        <FaLinkedin />
        <FaFacebook />
      </div>
    </>
  );
};

export default SignUp;
