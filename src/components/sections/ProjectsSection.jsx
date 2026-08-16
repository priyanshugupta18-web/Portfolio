import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { featuredProjects } from '../../data/portfolio'
import { revealOnScroll, staggerContainer, staggerItem } from '../../lib/animations'
import SectionHeading from './SectionHeading'

function FeaturedProjectCard({ project }) {
  const cardRef = useRef(null)
  const rotateXMotion = useMotionValue(0)
  const rotateYMotion = useMotionValue(0)
  const rotateX = useSpring(rotateXMotion, { stiffness: 180, damping: 22 })
  const rotateY = useSpring(rotateYMotion, { stiffness: 180, damping: 22 })

  function handleMove(event) {
    if (!window.matchMedia('(hover: hover)').matches) return
    const node = cardRef.current
    if (!node) return
    const rect = node.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width - 0.5
    const y = (event.clientY - rect.top) / rect.height - 0.5
    rotateYMotion.set(x * 10)
    rotateXMotion.set(y * -10)
  }

  function resetTilt() {
    rotateXMotion.set(0)
    rotateYMotion.set(0)
  }

  return (
    <motion.article
      ref={cardRef}
      className="featured-project project-card-3d"
      {...revealOnScroll}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      <span className="project-card-glow" aria-hidden="true" />

      <a className="project-image" href={project.liveUrl} target="_blank" rel="noreferrer">
        <motion.img
          src={project.image}
          alt={project.imageAlt}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        />
        <span>
          <ExternalLink size={16} /> View live
        </span>
      </a>

      <motion.div
        className="project-copy"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
      >
        <motion.div className="project-top" variants={staggerItem}>
          <span>{project.eyebrow}</span>
          <span>{project.year}</span>
        </motion.div>

        <motion.div variants={staggerItem}>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
        </motion.div>

        <motion.div variants={staggerItem}>
          <ul>
            {project.technologies.map((technology) => (
              <motion.li
                key={technology}
                whileHover={{ scale: 1.06, borderColor: 'rgba(242,181,28,0.55)' }}
              >
                {technology}
              </motion.li>
            ))}
          </ul>
          <div className="project-links">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 3 }}
            >
              Live project <ArrowUpRight size={15} />
            </motion.a>
            <motion.a
              href={project.sourceUrl}
              target="_blank"
              rel="noreferrer"
              whileHover={{ x: 3 }}
            >
              <FaGithub /> Source code
            </motion.a>
          </div>
        </motion.div>
      </motion.div>
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
