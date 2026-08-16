import { motion } from 'framer-motion'
import { technologies } from '../../data/portfolio'
import { staggerContainer, staggerItem } from '../../lib/animations'
import SectionHeading from './SectionHeading'

export default function StackSection() {
  return (
    <section className="stack-section" id="stack">
      <div className="shell">
        <SectionHeading
          title="Tech stack"
          description="The software and tools I use across frontend development, state management, backend frameworks and services, databases, and app development."
        />
        <motion.div
          className="tech-grid"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {technologies.map(({ icon: Icon, name, role }, index) => (
            <motion.div
              className="tech-card"
              key={name}
              variants={staggerItem}
              whileHover={{ y: -8, scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 280, damping: 20 }}
            >
              <span className="tech-number">{String(index + 1).padStart(2, '0')}</span>
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
