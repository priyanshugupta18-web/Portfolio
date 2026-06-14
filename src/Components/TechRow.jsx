import { FaReact, FaGithub, FaGitAlt } from "react-icons/fa";
import {
  SiJavascript,
  SiFramer,
  SiTailwindcss,
  SiHtml5,
  SiCss,
} from "react-icons/si";

const techs = [
  { name: "HTML", icon: SiHtml5 },
  { name: "CSS", icon: SiCss },
  { name: "JavaScript", icon: SiJavascript },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "React.js", icon: FaReact },
  { name: "Framer Motion", icon: SiFramer },
  { name: "Git", icon: FaGitAlt },
  { name: "GitHub", icon: FaGithub },
];

export default function TechRow() {
  return (
    <>
      {techs.map((tech) => {
        const Icon = tech.icon;

        return (
          <div
            key={tech.name}
            className="mx-4 flex items-center gap-1 rounded-xl border border-white/10 px-6 py-6"
          >
            <Icon size={22} />
            <span>{tech.name}</span>
          </div>
        );
      })}
    </>
  );
}
