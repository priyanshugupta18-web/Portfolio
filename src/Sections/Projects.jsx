import { easeOut, motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";
import { featuredProjects } from "../data/projects";

const badgeColors = [
  "bg-purple-400/25",
  "bg-orange-400/25",
  "bg-green-400/25",
];

export default function Projects() {
  return (
    <section className="about-bg min-h-screen px-6 py-24 text-white lg:px-16">
      <motion.div
        initial={{ x: -120, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, ease: easeOut }}
        className="text-center text-5xl font-light text-gradient md:text-6xl lg:text-7xl"
      >
        All Projects
      </motion.div>

      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        style={{ originX: 0.5 }}
        transition={{ duration: 1, ease: easeOut, delay: 0.1 }}
        className="mx-auto mt-6 h-[1.5px] w-32 bg-sky-300"
      />

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut, delay: 0.2 }}
        className="mx-auto mt-8 max-w-2xl text-center text-base leading-8 text-slate-300 md:text-lg"
      >
        A collection of web apps, games, and learning projects built with React,
        JavaScript, Python, and modern frontend tools.
      </motion.p>

      <div className="mx-auto mt-16 flex max-w-6xl flex-col gap-10">
        {featuredProjects.map((project, index) => (
          <motion.article
            key={project.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: easeOut, delay: 0.08 * index }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md lg:grid lg:grid-cols-[340px_1fr]"
          >
            <img
              src={project.thumbnail}
              alt={`${project.name} preview`}
              className="h-56 w-full object-cover lg:h-full lg:min-h-[280px]"
            />

            <div className="flex flex-col p-6 md:p-8">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs uppercase tracking-widest text-sky-300">
                  {project.category}
                </span>
              </div>

              <h2 className="mt-4 text-2xl font-bold uppercase tracking-wide text-white md:text-3xl">
                {project.name}
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-200 md:text-lg md:leading-8">
                {project.overview}
              </p>

              <div className="mt-5">
                <h3 className="text-sm font-medium uppercase tracking-widest text-slate-400">
                  Key Highlights
                </h3>
                <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                  {project.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-start gap-2 text-sm leading-6 text-slate-300"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-400" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.techStack.map((tech, techIndex) => (
                  <span
                    key={tech}
                    className={`rounded-2xl px-3 py-1 text-xs font-light text-white ${badgeColors[techIndex % badgeColors.length]}`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <NavLink
                to={`/projects/${project.slug}`}
                className="mt-6 inline-flex w-fit items-center gap-2 rounded-2xl bg-sky-400 px-5 py-3 text-sm font-medium text-slate-950 transition hover:bg-sky-300"
              >
                View Project
                <FiArrowRight size={14} />
              </NavLink>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
