import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiExternalLink } from "react-icons/fi";
import { AiOutlineGoogle } from "react-icons/ai";
import { DiGithubBadge } from "react-icons/di";
import { FaLinkedin } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";
import { signInFailure, signInSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { OAuthRoute, loginRoute } from "../Api/authApi";
import { toastOptions } from "../utils/utility";
import { toast } from "react-toastify";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";

const Login = ({ handleToggle }) => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formData.email;
    const password = formData.password;
    try {
      const dataRes = await loginRoute({ email, password });
      if (dataRes.data.alert) {
        dispatch(signInSuccess(dataRes.data));
        navigate("/");
        toast.success("Login Success", toastOptions);
      } else {
        dispatch(signInFailure(dataRes.data));
        toast.error(dataRes.data.message, toastOptions);
      }
    } catch (error) {
      dispatch(signInFailure(error));
      toast.error(error.message, toastOptions);
    }
  };

  const handleGoogleClick = async () => {
    try {
      const provider = await new GoogleAuthProvider();
      const auth = await getAuth(app);
      const result = await signInWithPopup(auth, provider);
      const dataRes = await OAuthRoute({
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      });
      if (dataRes.data.alert) {
        dispatch(signInSuccess(dataRes.data));
        navigate("/");
        toast.success("Login Success", toastOptions);
      } else {
        dispatch(signInFailure(dataRes.data));
        toast.error(dataRes.data.message, toastOptions);
      }
    } catch (error) {
      dispatch(signInFailure(error));
      toast.error(error.message, toastOptions);
    }
  };

  return (
    <>
      <h1 className="text-2xl font-extrabold text-center text-gray-10 dark:text-gray-90">
        Welcome Back..!
      </h1>
      <p className="pb-2 text-center text-gray-20">Enter details to Login</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
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
        <div className="mb-4">
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

        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-blue-600 border-gray-900 rounded"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-300 dark:text-gray-50"
            >
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <Link
              to="/forget-password"
              className="font-medium text-indigo-400 dark:text-indigo-600"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className="py-2 px-4 w-full font-bold text-md bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
          >
            Log In
          </button>
        </div>
      </form>
      <div className="text-center py-2">
        <p className="text-gray-200 dark:text-gray-50">
          Not registered yet?{" "}
          <Link
            onClick={handleToggle}
            className="text-indigo-400 font-medium inline-flex space-x-1 items-center  dark:text-indigo-600"
          >
            <span>Register now </span>
            <FiExternalLink />
          </Link>
        </p>
      </div>
      <div className="my-2 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
        <p className="mx-4 mb-0 text-center font-semibold text-gray-10 dark:text-gray-90">
          OR
        </p>
      </div>
      <div className="flex flex-row justify-center items-center gap-8 text-2xl text-blue-600 cursor-pointer">
        <button onClick={handleGoogleClick}>
          <AiOutlineGoogle />
        </button>
        <button onClick={handleGoogleClick}>
          <DiGithubBadge />
        </button>
        <FaLinkedin />
        <FaFacebook />
      </div>
    </>
  );
};

export default Login;
