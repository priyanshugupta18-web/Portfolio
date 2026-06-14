import logo from "../assets/logo.png";
import "../index.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FiX } from "react-icons/fi";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={`sticky top-0 left-0 z-50 w-full h-18 p-2
              bg-[rgba(15,27,47,0.72)]
                backdrop-blur-2xl
                border-b border-cyan-400/10
                shadow-[0_0_30px_rgba(56,189,248,0.08)]
                transition-all duration-500
                flex justify-between md:justify-around items-center`}
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
              to="/about"
              className={({ isActive }) => {
                return isActive ? "underline text-white" : "text-gradient";
              }}
            >
              <li>About</li>
            </NavLink>
            <NavLink
              to="/lab"
              className={({ isActive }) => {
                return isActive ? "underline text-white" : "text-gradient";
              }}
            >
              <li>Lab</li>
            </NavLink>
            <NavLink
              to="/stack"
              className={({ isActive }) => {
                return isActive ? "underline text-white" : "text-gradient";
              }}
            >
              <li>Skills</li>
            </NavLink>
            <NavLink
              to="/projects"
              className={({ isActive }) => {
                return isActive ? "underline text-white" : "text-gradient";
              }}
            >
              <li>Projects</li>
            </NavLink>
            <NavLink
              to="/contact"
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
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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
            return isActive 
            ? "underline text-white" 
            : "text-gradient";
          }}
        >
          Home
        </NavLink>
        <NavLink
          to="/about"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => {
            return isActive ? "underline text-white" : "text-gradient";
          }}
        >
          About
        </NavLink>
        <NavLink
          to="/lab"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => {
            return isActive ? "underline text-white" : "text-gradient";
          }}
        >
          Lab
        </NavLink>
        <NavLink
          to="/stack"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => {
            return isActive ? "underline text-white" : "text-gradient";
          }}
        >
          Skills
        </NavLink>
        <NavLink
          to="/projects"
          onClick={() => setIsOpen(false)}
          className={({ isActive }) => {
            return isActive ? "underline text-white" : "text-gradient";
          }}
        >
          Projects
        </NavLink>
        <NavLink
          to="/contact"
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
