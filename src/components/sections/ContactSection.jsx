import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { profile } from '../../data/portfolio'
import { revealOnScroll } from '../../lib/animations'
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
          <div className="contact-copy">
            <h2>Let's build something meaningful.</h2>
            <p>
              I am interested in opportunities that challenge me to learn, contribute, and grow as a software engineer.
            </p>
            <a href={`mailto:${profile.email}`}>
              {profile.email} <ArrowUpRight size={15} />
            </a>
          </div>
          <ContactForm />
        </motion.div>
      </div>
    </section>
  )
}
