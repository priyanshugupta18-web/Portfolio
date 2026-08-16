import { motion } from 'framer-motion'
import { aboutFacts } from '../../data/portfolio'
import { revealOnScroll, staggerContainer, staggerItem } from '../../lib/animations'
import SectionHeading from './SectionHeading'

export default function AboutSection() {
  return (
    <section className="about-section" id="about">
      <div className="shell">
        <SectionHeading title="About me" />
        <motion.div className="about-grid" {...revealOnScroll}>
          <motion.div
            className="about-copy"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p variants={staggerItem}>
              I am a Computer Science undergraduate who learns best by building.
            </motion.p>
            <motion.span variants={staggerItem}>
              I write code built to survive in production and constantly strive to improve its quality. I am also a public speaker and YouTuber.
            </motion.span>
          </motion.div>

          <motion.div
            className="about-facts"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
          >
            {aboutFacts.map((fact) => (
              <motion.div key={fact.label} variants={staggerItem} className="about-fact-row">
                <span>{fact.label}</span>
                <p>{fact.value}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
