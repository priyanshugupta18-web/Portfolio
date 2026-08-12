import { FaGithub, FaLinkedinIn, FaReact } from "react-icons/fa";
import { SiFramer, SiTailwindcss } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="footer"><div className="footer-inner shell">
      <span>© {new Date().getFullYear()} Priyanshu Gupta / Frontend Developer</span>
      <div className="footer-tech"><span>Built with</span><span><FaReact /> React</span><span><SiTailwindcss /> Tailwind</span><span><SiFramer /> Motion</span></div>
      <div className="footer-links"><a className="social-link" href="https://github.com/techyyp" target="_blank" rel="noreferrer" aria-label="GitHub"><FaGithub size={17} /></a><a className="social-link" href="https://www.linkedin.com/in/techyyp/" target="_blank" rel="noreferrer" aria-label="LinkedIn"><FaLinkedinIn size={17} /></a></div>
    </div></footer>
  );
}
