import { easeOut, motion } from "framer-motion";
import { NavLink, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { getProjectBySlug } from "../data/projects";

export default function ProjectDetail() {
  const { slug } = useParams();
  const project = getProjectBySlug(slug);

  if (!project) {
    return (
      <section className="about-bg flex min-h-screen flex-col items-center justify-center px-6 text-white">
        <h1 className="text-4xl font-light text-gradient">Project Not Found</h1>
        <NavLink
          to="/projects"
          className="mt-8 inline-flex items-center gap-2 text-sky-300 hover:text-sky-200"
        >
          <FiArrowLeft size={16} />
          Back to Projects
        </NavLink>
      </section>
    );
  }

  return (
    <section className="about-bg min-h-screen px-6 py-24 text-white lg:px-16">
      <NavLink
        to="/projects"
        className="inline-flex items-center gap-2 text-sm tracking-wide text-sky-300 transition hover:text-sky-200"
      >
        <FiArrowLeft size={16} />
        Back to Projects
      </NavLink>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: easeOut }}
        className="mx-auto mt-10 max-w-4xl"
      >
        <span className="rounded-full border border-sky-300/30 bg-sky-400/10 px-3 py-1 text-xs uppercase tracking-widest text-sky-300">
          {project.category}
        </span>

        <h1 className="mt-4 text-4xl font-light text-gradient md:text-5xl lg:text-6xl">
          {project.name}
        </h1>

        <img
          src={project.thumbnail}
          alt={`${project.name} preview`}
          className="mt-10 w-full rounded-2xl border border-white/10 object-cover"
        />

        <p className="mt-8 text-base leading-8 text-slate-200 md:text-lg">
          {project.overview}
        </p>

        <div className="mt-10 rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-md">
          <p className="text-sm uppercase tracking-widest text-slate-400">
            More details coming soon
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            This page is ready for you to add screenshots, GitHub links, live
            demo URLs, and a full write-up for this project.
          </p>
        </div>
      </motion.div>
    </section>
  );
}
