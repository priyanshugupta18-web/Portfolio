import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowUpRight, Code2 } from 'lucide-react'
import { FaGithub } from 'react-icons/fa'
import { featuredProjects } from '../../data/portfolio'
import { revealOnScroll, staggerContainer, staggerItem } from '../../lib/animations'
import SectionHeading from './SectionHeading'

function FeaturedProjectCard({ project, index }) {
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
    rotateYMotion.set(x * 8)
    rotateXMotion.set(y * -8)
  }

  function resetTilt() {
    rotateXMotion.set(0)
    rotateYMotion.set(0)
  }

  const projectNum = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      ref={cardRef}
      className="featured-project project-card-3d project-text-card"
      {...revealOnScroll}
      onMouseMove={handleMove}
      onMouseLeave={resetTilt}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
    >
      <span className="project-card-glow" aria-hidden="true" />
      <div className="project-card-watermark" aria-hidden="true">{projectNum}</div>

      <motion.div
        className="project-copy-full"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Top bar: Number + Category + Year */}
        <motion.div className="project-top-bar" variants={staggerItem}>
          <div className="project-num-badge">
            <span className="project-num-dot" />
            <span>PROJECT {projectNum}</span>
          </div>
          <div className="project-top-meta">
            <span className="project-eyebrow-tag">{project.eyebrow}</span>
            <span className="project-year-pill">{project.year}</span>
          </div>
        </motion.div>

        {/* Title & Description */}
        <motion.div className="project-main-content" variants={staggerItem}>
          <h3 className="project-title">
            <a href={project.liveUrl} target="_blank" rel="noreferrer">
              {project.title}
            </a>
          </h3>
          <p className="project-description">{project.description}</p>
        </motion.div>

        {/* Tech Stack Pills */}
        <motion.div className="project-tech-bar" variants={staggerItem}>
          <span className="tech-label"><Code2 size={14} /> Stack:</span>
          <ul className="project-tech-list">
            {project.technologies.map((technology) => (
              <motion.li
                key={technology}
                className="project-tech-pill"
                whileHover={{ scale: 1.05, y: -1 }}
              >
                {technology}
              </motion.li>
            ))}
          </ul>
        </motion.div>

        {/* Action Buttons Bar */}
        <motion.div className="project-actions-bar" variants={staggerItem}>
          <motion.a
            className="project-btn project-btn-primary"
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <span>Live Project</span>
            <ArrowUpRight size={16} />
          </motion.a>

          <motion.a
            className="project-btn project-btn-secondary"
            href={project.sourceUrl}
            target="_blank"
            rel="noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.97 }}
          >
            <FaGithub size={16} />
            <span>Source Code</span>
          </motion.a>
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
          title="Featured Projects"
          description="A curated showcase of high-impact software, platforms, and open-source tools I've engineered."
        />
        <div className="projects-grid">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
