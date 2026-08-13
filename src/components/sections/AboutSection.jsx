import { motion } from 'framer-motion'
import { aboutFacts } from '../../data/portfolio'
import { revealOnScroll } from '../../lib/animations'
import SectionHeading from './SectionHeading'

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="shell">
        <SectionHeading title="About me" />
        <motion.div className="about-grid" {...revealOnScroll}>
          <div className="about-copy">
            <p>I am a Student and Computer Science undergraduate who learns best by building.</p>
            <span>
              I write code built to survive in production and constantly strive to improve its quality. Beyond writing code, I am passionate about application architecture, performance optimization,
              and understanding how software works beneath the surface.
            </span>
          </div>

          <div className="about-facts">
            {aboutFacts.map((fact) => (
              <div key={fact.label}>
                <span>{fact.label}</span>
                <p>{fact.value}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

