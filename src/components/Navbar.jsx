import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LucideMoon, LucideSun } from "lucide-react";
import { LucideMenu, LucideX } from "lucide-react";
import useDarkMode from "../Hooks/useDarkMode";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <div className="flex max-w-5xl mx-auto px-6 list-none items-center justify-between">
      <Link
        className="font-semi-bold w-50 font-mono text-sky-300 tracking-widest text-xl"
        to="/"
      >
        $_priyanshu
      </Link>
      <div className="text-sm lg:flex gap-10 text-[11px] font-mono uppercase hidden tracking-widest">
        <li className="text-gray-400 dark:hover:text-white hover:text-black transition-colors cursor-pointer">
          About
        </li>
        <li className="text-gray-400 dark:hover:text-white hover:text-black transition-colors cursor-pointer">
          Skills
        </li>
        <li className="text-gray-400 dark:hover:text-white hover:text-black transition-colors cursor-pointer">
          Projects
        </li>
        <li className="text-gray-400 dark:hover:text-white hover:text-black transition-colors cursor-pointer">
          Contact
        </li>
      </div>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
        }}
        className="lg:hidden cursor-pointer"
      >
        <LucideMenu
          color={`${darkMode ? "white" : "gray"}`}
          className={`${isOpen ? "hidden" : "block"}`}
        />
        <LucideX
          color={`${darkMode ? "white" : "gray"}`}
          className={`${isOpen ? "block" : "hidden"}`}
        />
      </button>
      <button
        className="cursor-pointer"
        onClick={() => {
          setDarkMode(!darkMode);
        }}
      >
        <div>
          <LucideMoon
            color="white"
            className={`${darkMode ? "block" : "hidden"}`}
            size={18}
          />
        </div>
        <div>
          <LucideSun
            color="orange"
            className={`${darkMode ? "hidden" : "block"}`}
            size={18}
          />
        </div>
      </button>
    </div>
  );
}

export default Navbar;
