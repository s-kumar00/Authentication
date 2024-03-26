import React from "react";
import { NavLink } from "react-router-dom";
import { MdCategory, MdContacts, MdHomeFilled, MdShop2 } from "react-icons/md";

const Navbar = ({ containerStyles, toggleMenu }) => {
  return (
    <nav className={`${containerStyles}`}>
      <NavLink
        to={"/"}
        onClick={toggleMenu}
        className={({ isActive }) => (isActive ? "active_link" : "")}
      >
        <div className="flexCenter gap-x-1">
          <MdHomeFilled /> Home
        </div>
      </NavLink>
      <NavLink
        to={"/about"}
        onClick={toggleMenu}
        className={({ isActive }) => (isActive ? "active_link" : "")}
      >
        <div className="flexCenter gap-x-1">
          <MdCategory /> About
        </div>
      </NavLink>
      <NavLink
        to={"/contact"}
        onClick={toggleMenu}
        className={({ isActive }) => (isActive ? "active_link" : "")}
      >
        <div className="flexCenter gap-x-1">
          <MdShop2 /> Contact
        </div>
      </NavLink>
      <NavLink
        to={"/shop"}
        onClick={toggleMenu}
        className={({ isActive }) => (isActive ? "active_link" : "")}
      >
        <div className="flexCenter gap-x-1">
          <MdContacts /> Shop
        </div>
      </NavLink>
    </nav>
  );
};

export default Navbar;
