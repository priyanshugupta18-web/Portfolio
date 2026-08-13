import { motion } from 'framer-motion'
import { technologies } from '../../data/portfolio'
import { revealOnScroll } from '../../lib/animations'
import SectionHeading from './SectionHeading'

export default function StackSection() {
  return (
    <section className="stack-section" id="stack">
      <div className="shell">
        <SectionHeading
          title="Tech stack"
          description="The tools I use across frontend development, state management, backend services, and content editing."
        />
        <motion.div className="tech-grid" {...revealOnScroll}>
          {technologies.map(({ icon: Icon, name, role }) => (
            <motion.div className="tech-card" key={name} whileHover={{ y: -5 }}>
              <Icon />
              <div>
                <h3>{name}</h3>
                <p>{role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
