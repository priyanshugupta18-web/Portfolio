import { NavLink } from "react-router-dom";
import { FiArrowUp, FiGithub, FiLinkedin, FiPhone } from "react-icons/fi";
import logo from "../assets/logo.png";

const Footer = () => {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/10 bg-slate-950/70 px-5 py-10 text-slate-300 backdrop-blur-xl sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
          <NavLink to="/" className="flex w-fit items-center gap-3">
            <img className="h-12 w-16 object-cover" src={logo} alt="" />
            <span className="font-serif text-xl uppercase tracking-wider text-gradient">
              Priyanshu Gupta
            </span>
          </NavLink>

          <div>
            <a
              href="tel:+919341803923"
              className="inline-flex items-center gap-2 text-sm transition-colors hover:text-sky-300"
            >
              <FiPhone size={16} />
              +91 9341803923
            </a>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://www.linkedin.com/in/priyanshugupta18/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-sky-300/50 hover:text-sky-300"
            >
              <FiLinkedin size={18} />
            </a>
            <a
              href="https://github.com/priyanshugupta18-web"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 transition-colors hover:border-sky-300/50 hover:text-sky-300"
            >
              <FiGithub size={18} />
            </a>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label="Back to top"
              className="inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-white/10 transition-colors hover:border-sky-300/50 hover:text-sky-300"
            >
              <FiArrowUp size={18} />
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <span>
            &copy; {new Date().getFullYear()} Priyanshu Gupta. All rights
            reserved.
          </span>
          <span className="uppercase tracking-widest text-sky-300/70">
            Code. Debug. Deploy. Repeat.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer
