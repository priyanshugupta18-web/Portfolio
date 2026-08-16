import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '../../data/portfolio'
import { revealOnScroll, staggerContainer, staggerItem } from '../../lib/animations'
import ContactForm from './ContactForm'
import SectionHeading from './SectionHeading'

export default function ContactSection() {
  return (
    <section className="contact-section" id="contact">
      <div className="shell">
        <SectionHeading
          title="Contact"
          description="Looking for a Developer or have an interesting project? Send me a message."
        />
        <motion.div className="contact-layout" {...revealOnScroll}>
          <motion.div
            className="contact-copy"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 variants={staggerItem}>
              Let&apos;s build something <em>meaningful</em>.
            </motion.h2>
            <motion.p variants={staggerItem}>
              I am interested in opportunities that challenge me to learn, contribute, and grow as a software engineer.
            </motion.p>
            <motion.a
              href={`mailto:${profile.email}`}
              variants={staggerItem}
              whileHover={{ x: 4, color: '#f2b51c' }}
            >
              {profile.email} <ArrowUpRight size={15} />
            </motion.a>
          </motion.div>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}
