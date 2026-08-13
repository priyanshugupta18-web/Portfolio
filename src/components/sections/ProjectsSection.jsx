import { motion } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { featuredProjects } from '../../data/portfolio'
import { revealOnScroll } from '../../lib/animations'
import SectionHeading from './SectionHeading'

function FeaturedProjectCard({ project }) {
  return (
    <motion.article className="featured-project" {...revealOnScroll}>
      <a className="project-image" href={project.liveUrl} target="_blank" rel="noreferrer">
        <motion.img
          src={project.image}
          alt={project.imageAlt}
          whileHover={{ scale: 1.035 }}
          transition={{ duration: 0.6 }}
        />
        <span>
          <ExternalLink size={16} /> View live
        </span>
      </a>

      <div className="project-copy">
        <div className="project-top">
          <span>{project.eyebrow}</span>
          <span>{project.year}</span>
        </div>

        <div>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </div>

        <div>
          <ul>
            {project.technologies.map((technology) => (
              <li key={technology}>{technology}</li>
            ))}
          </ul>
          <div className="project-links">
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              Live project <ArrowUpRight size={15} />
            </a>
            <a href={project.sourceUrl} target="_blank" rel="noreferrer">
              <FaGithub /> Source code
            </a>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function ProjectsSection() {
  return (
    <section className="work-section" id="work">
      <div className="shell">
        <SectionHeading
          title="Projects"
          description="A curated showcase of the best projects I have built so far."
        />
        {featuredProjects.map((project) => (
          <FeaturedProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}

