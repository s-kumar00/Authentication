import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.svg";
import logo2 from "../assets/logo2.svg";
import Navbar from "./Navbar";
import { MdClose, MdMenu } from "react-icons/md";
import { FaOpencart } from "react-icons/fa";
import { RxPerson } from "react-icons/rx";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useSelector } from "react-redux";
import Profile from "./Profile";
import { useDispatch } from "react-redux";
import { themeChange } from "../redux/userSlice";

const Header = () => {
  const [menuOpened, setMenuOpened] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const { theme } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const toggleMenu = () => setMenuOpened(!menuOpened);

  const toggleDarkMode = () => {
    dispatch(themeChange(theme === "dark" ? "light" : "dark"));
  };
  
  return (
    <header className="fixed top-0 left-0 m-auto max_pad_container w-full bg-white ring-1 ring-slate-200 z-10 shadow-md rounded-b-md dark:bg-black dark:text-white">
      <div className="px-4 flexBetween py-3 max-xs:px-2">
        {/* logo */}
        <div className="flexCenter">
          <Link className="hidden md:block ">
            {theme === "dark" ? (
              <img src={logo2} alt="" height={66} width={88} />
            ) : (
              <img src={logo} alt="" height={66} width={88} />
            )}
          </Link>
          {!menuOpened ? (
            <MdMenu
              onClick={toggleMenu}
              className="md:hidden cursor-pointer hover:text-secondary mr-2 p-1 ring-1 ring-slate-900/30 h-8 w-8 rounded-full dark:ring-1 dark:ring-gray-600"
            />
          ) : (
            <MdClose
              onClick={toggleMenu}
              className="md:hidden cursor-pointe hover:text-secondary mr-2 p-1 ring-1 ring-secondary/70 h-8 w-8 rounded-full"
            />
          )}
        </div>

        {/* navbar */}
        <Navbar
          containerStyles={"hidden md:flex gap-x-5 xl:gap-x-10 medium-15"}
        />

        {/* Navbar mobile */}
        <Navbar
          toggleMenu={toggleMenu}
          containerStyles={`${
            menuOpened
              ? "fixed flex flex-col z-50 -left-[0%] top-20 gap-y-5 p-5 bg-white rounded-2xl shadow-md w-44 dark:bg-gray-700 transition-all duration-3000"
              : "fixed flex flex-col z-50 -left-[100%] top-20 gap-y-5 p-5 bg-white rounded-2xl shadow-md w-44 dark:bg-gray-700 transition-all duration-3000"
          }`}
        />

        {/* button */}

        <div className="flexBetween gap-x-3 sm:gap-x-4 bold-16">
          <div className="flexBetween sm:gap-x-6">
            <NavLink to="/cart" className={"flex"}>
              <FaOpencart className="p-1 h-8 w-8 ring-slate-900/30  ring-1 rounded-full dark:ring-1 dark:ring-gray-600" />
              <span className="relative flexCenter w-5 h-5 rounded-full bg-secondary text-white medium-14 -top-3 -ml-2">
                0
              </span>
            </NavLink>

            <button onClick={toggleDarkMode} className="mr-2">
              {theme === "dark" ? (
                <MdLightMode className="p-1 h-8 w-8 ring-slate-900/30  ring-1 rounded-full dark:ring-1 dark:ring-gray-600" />
              ) : (
                <MdDarkMode className="p-1 h-8 w-8 ring-slate-900/30  ring-1 rounded-full" />
              )}
            </button>

            {!currentUser ? (
              <Link
                to="/login"
                className={"btn_secondary_rounded flexCenter gap-x-2 medium-16"}
              >
                <RxPerson className={"text-1xl font-bold"} />
                Login
              </Link>
            ) : (
              <Profile />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
