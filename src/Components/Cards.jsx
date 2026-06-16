import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { featuredProjects } from "../data/projects";

const badgeColors = [
  "bg-purple-400/25",
  "bg-orange-400/25",
  "bg-green-400/25",
];

export default function Cards({ x, innerRef }) {
  return (
    <motion.div
      ref={innerRef}
      style={{ x }}
      className="flex w-full flex-col items-stretch gap-5 md:w-max md:flex-row md:gap-3 md:p-3"
    >
      {featuredProjects.map((project) => (
        <article
          key={project.slug}
          className="flex w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-sky-400/20 bg-white/[0.03] backdrop-blur-md transition-colors duration-300 hover:border-sky-300/40 md:w-auto md:min-w-[360px]"
        >
          <div className="p-3">
            <img
              src={project.thumbnail}
              className="h-44 w-full rounded-xl object-cover"
              alt={`${project.name} preview`}
            />
          </div>

          <div className="flex flex-1 flex-col px-4 pb-4">
            <span className="text-xs uppercase tracking-widest text-sky-300">
              {project.category}
            </span>

            <h3 className="mt-1 text-xl font-bold uppercase tracking-wide text-white">
              {project.name}
            </h3>

            <p className="mt-3 min-h-16 text-sm font-light leading-6 text-slate-200">
              {project.description}
            </p>

            <div className="mt-3 flex flex-wrap gap-2">
              {project.techStack.map((tech, index) => (
                <span
                  key={tech}
                  className={`rounded-2xl px-3 py-1 text-xs font-light text-white ${badgeColors[index % badgeColors.length]}`}
                >
                  {tech}
                </span>
              ))}
            </div>

            <NavLink
              to={`/projects/${project.slug}`}
              className="mt-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-sky-400 px-3 py-3 text-sm font-medium tracking-wide text-slate-950 shadow-[0_0_25px_rgba(56,189,248,0.25)] transition-all duration-300 hover:bg-sky-300 hover:shadow-[0_0_35px_rgba(56,189,248,0.4)]"
            >
              View Project
              <FiArrowRight size={14} />
            </NavLink>
          </div>
        </article>
      ))}
    </motion.div>
  );
}
