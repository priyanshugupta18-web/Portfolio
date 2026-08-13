import { motion } from 'framer-motion'
import { ArrowDownRight, ArrowUpRight, ChevronDown } from 'lucide-react'
import heroBackground from '../../assets/youtubeBanner.png'
import mobileProfile from '../../assets/mobileProfile.jpeg'
import { profile } from '../../data/portfolio'
import { heroReveal } from '../../lib/animations'

export default function Hero() {
  return (
    <section
      className="hero hero-with-background"
      id="top"
      style={{
        '--desktop-hero-bg': `url(${heroBackground})`,
        '--mobile-hero-bg': `url(${mobileProfile})`,
      }}
    >
      <div className="hero-background-overlay" />
      <motion.div
        className="hero-copy hero-overlay-copy"
        initial="hidden"
        animate="visible"
        transition={{ staggerChildren: 0.1, delayChildren: 0.1 }}
      >
        <motion.p className="mobile-hero-intro" variants={heroReveal}>
          <span>Hi, I am Priyanshu Gupta,</span>
          <span>
            a <strong>CSE undergrad</strong> and an aspiring software developer.
          </span>
        </motion.p>
        <motion.div className="hero-actions" variants={heroReveal}>
          <a className="button-primary" href="#work">
            View projects <ArrowDownRight size={17} />
          </a>
          <a className="button-quiet" href={`mailto:${profile.email}`}>
            Contact me <ArrowUpRight size={16} />
          </a>
        </motion.div>
        <motion.a className="mobile-scroll-cue" href="#about" variants={heroReveal} aria-label="Go to about section">
          <ChevronDown size={20} />
        </motion.a>
      </motion.div>
    </section>
  )
}
