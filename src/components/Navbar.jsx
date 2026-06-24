import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { LucideMoon, LucideSun } from "lucide-react";
import { LucideMenu, LucideX } from "lucide-react";
import useDarkMode from "../Hooks/useDarkMode";

const navLinks = [
  { label: "About", to: "/about" },
  { label: "Skills", to: "/skills" },
  { label: "Projects", to: "/projects" },
  { label: "Contact", to: "/contact" },
];

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <div className="relative mx-auto flex max-w-5xl list-none items-center justify-between px-6">
      <Link
        className="font-bold w-50 text-[17px] font-mono text-accent tracking-widest text-xl"
        to="/"
      >
        "/Me"
      </Link>
      <div className="text-sm lg:flex gap-10 text-[11px] font-mono uppercase hidden tracking-widest">
        {navLinks.map((item) => (
          <NavLink
            className="text-muted transition-colors hover:text-accent focus:outline-none focus-visible:text-accent"
            to={item.to}
            key={item.label}
          >
            {item.label}
          </NavLink>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <button
          aria-label="Toggle menu"
          aria-expanded={isOpen}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
          className="cursor-pointer lg:hidden"
          type="button"
        >
          <LucideMenu className={`${isOpen ? "hidden" : "block"} text-main`} />
          <LucideX className={`${isOpen ? "block" : "hidden"} text-main`} />
        </button>
        <button
          aria-label="Toggle theme"
          className="cursor-pointer"
          onClick={() => {
            setDarkMode(!darkMode);
          }}
          type="button"
        >
          <div>
            <LucideMoon
              className={`${darkMode ? "block" : "hidden"} text-accent`}
              size={18}
            />
          </div>
          <div>
            <LucideSun
              className={`${darkMode ? "hidden" : "block"} text-accent`}
              size={18}
            />
          </div>
        </button>
      </div>

      <div
        className={`absolute left-6 right-6 top-11 border border-line bg-box p-3 font-mono text-xs uppercase tracking-widest shadow-sm lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        {navLinks.map((item) => (
          <a
            className="block px-3 py-3 text-muted transition-colors hover:text-accent focus:outline-none focus-visible:text-accent"
            href={item.href}
            key={item.label}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
