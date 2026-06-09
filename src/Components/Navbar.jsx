import logo from "../assets/logo.png";
import "../index.css";
import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";

export default function Navbar() {
  const [isHome, setIsHome] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsHome(scrollY < window.innerHeight * 0.9);
    };

    addEventListener("scroll", handleScroll);

    return () => {
      removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <>
      <div
        className={`flex z-50 justify-between lg:justify-around items-center sticky transition-all duration-500 ${
          isHome ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"
        } top-0 left-0 p-2 w-full h-18 backdrop-blur-2xl`}
      >
        <div className="flex justify-center items-center">
          <img className="h-14 w-20 object-cover" src={logo} alt="Logo" />
          <div className="text-2xl hidden md:block uppercase font-medium font-serif tracking-wider text-gradient">
            Priyanshu Gupta
          </div>
        </div>
        <div>
          <ul className="hidden lg:flex justify-center items-center space-x-10 tracking-wider text-gradient font-light">
            <NavLink
              to="/"
              className={({ isActive }) => {
                return isActive ? "underline text-white" : "text-gradient";
              }}
            >
              <li>Home</li>
            </NavLink>
            <NavLink
              to="/About"
              className={({ isActive }) => {
                return isActive ? "underline text-white" : "text-gradient";
              }}
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to="/Lab"
              className={({ isActive }) => {
                return isActive ? "underline text-white" : "text-gradient";
              }}
            >
              <li>Lab</li>
            </NavLink>
            <NavLink
              to="/Stack"
              className={({ isActive }) => {
                return isActive ? "underline text-white" : "text-gradient";
              }}
            >
              <li>Skills</li>
            </NavLink>
            <NavLink
              to="/Projects"
              className={({ isActive }) => {
                return isActive ? "underline text-white" : "text-gradient";
              }}
            >
              <li>Projects</li>
            </NavLink>
            <NavLink
              to="/Contact"
              className={({ isActive }) => {
                return isActive ? "underline text-white" : "text-gradient";
              }}
            >
              <li>Contact</li>
            </NavLink>
          </ul>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden text-white pr-2 cursor-pointer"
          >
            {isOpen ?  <FiX size={24} />: <FiMenu size={24} />}
          </button>
        </div>
      </div>
      <div
        className={`fixed top-18 right-4 z-50 w-52 bg-slate-900/80 backdrop-blur-xl border border-white/10 p-4 rounded-xl flex-col gap-4 ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <NavLink
          to="/"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => {
            return isActive ? "underline text-white" : "text-gradient";
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/About"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => {
            return isActive ? "underline text-white" : "text-gradient";
          }}
        >
          About
        </NavLink>
        <NavLink
          to="/Lab"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => {
            return isActive ? "underline text-white" : "text-gradient";
          }}
        >
          Lab
        </NavLink>
        <NavLink
          to="/Stack"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => {
            return isActive ? "underline text-white" : "text-gradient";
          }}
        >
          Skills
        </NavLink>
        <NavLink
          to="/Projects"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => {
            return isActive ? "underline text-white" : "text-gradient";
          }}
        >
          Projects
        </NavLink>
        <NavLink
          to="/Contact"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => {
            return isActive ? "underline text-white" : "text-gradient";
          }}
        >
          Contact
        </NavLink>
      </div>
    </>
  );
}
