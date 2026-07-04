import { Moon, Sun } from "lucide-react";
import useDarkMode from "../Hooks/useDarkMode";

export default function Navbar() {
  const [darkMode, setDarkMode] = useDarkMode();
  return (
    <header className="nav-wrap">
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label="Priyanshu Gupta, home"><span className="wordmark">./Me</span><small>Frontend Developer</small></a>
        <div className="nav-links"><a href="#work">Projects</a><a href="#about">About</a><a href="#stack">Stack</a><a href="#contact">Contact</a><button className="theme-button" type="button" onClick={() => setDarkMode(!darkMode)} aria-label={`Switch to ${darkMode ? "light" : "dark"} theme`}>{darkMode ? <Sun size={15} /> : <Moon size={15} />}</button></div>
      </nav>
    </header>
  );
}
