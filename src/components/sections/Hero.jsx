import { useRef } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion'
import { ChevronDown, Code2, Mic2, ArrowUpRight } from 'lucide-react'
import { FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import profileImage from '../../assets/mobileProfile.jpeg'
import FloatingOrbs from '../common/FloatingOrbs'
import { profile } from '../../data/portfolio'
import { staggerContainer, staggerItem } from '../../lib/animations'

const heroSocials = [
  {
    name: 'YouTube',
    href: 'https://youtube.com/@techyyp/',
    icon: FaYoutube,
    className: 'social-btn-yt',
  },
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/in/techyyp/',
    icon: FaLinkedinIn,
    className: 'social-btn-li',
  },
  {
    name: 'X',
    href: 'https://x.com/techyyp/',
    icon: FaSquareXTwitter,
    className: 'social-btn-x',
  },
]

function SocialMagneticButton({ href, name, icon: Icon, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 240, damping: 20 })
  const springY = useSpring(y, { stiffness: 240, damping: 20 })

  function handleMove(event) {
    // Only apply magnetic effect on pointer devices with hover capability
    if (window.matchMedia('(hover: hover)').matches) {
      const node = ref.current
      if (!node) return
      const rect = node.getBoundingClientRect()
      x.set((event.clientX - rect.left - rect.width / 2) * 0.16)
      y.set((event.clientY - rect.top - rect.height / 2) * 0.16)
    }
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      className={`hero-social-btn ${className}`}
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={`Visit ${name} profile`}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      whileHover={{ scale: 1.04, y: -2 }}
      whileTap={{ scale: 0.96 }}
    >
      <span className="social-icon-box">
        <Icon size={18} />
      </span>
      <span className="social-label">{name}</span>
      <ArrowUpRight size={13} className="social-arrow" />
    </motion.a>
  )
}

export default function Hero() {
  const sectionRef = useRef(null)
  const spotX = useMotionValue(0)
  const spotY = useMotionValue(0)
  const portraitX = useMotionValue(0)
  const portraitY = useMotionValue(0)
  const springSpotX = useSpring(spotX, { stiffness: 90, damping: 24 })
  const springSpotY = useSpring(spotY, { stiffness: 90, damping: 24 })
  const springPortraitX = useSpring(portraitX, { stiffness: 60, damping: 20 })
  const springPortraitY = useSpring(portraitY, { stiffness: 60, damping: 20 })
  const spotlight = useMotionTemplate`radial-gradient(580px circle at ${springSpotX}px ${springSpotY}px, rgba(242,181,28,0.13), transparent 68%)`

  function handleMouseMove(event) {
    if (!window.matchMedia('(hover: hover)').matches) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const localX = event.clientX - rect.left
    const localY = event.clientY - rect.top
    spotX.set(localX)
    spotY.set(localY)
    portraitX.set((localX - rect.width / 2) * 0.018)
    portraitY.set((localY - rect.height / 2) * 0.018)
  }

  return (
    <section
      ref={sectionRef}
      className="hero hero-portrait"
      id="top"
      onMouseMove={handleMouseMove}
    >
      <div className="hero-background-overlay" aria-hidden="true" />
      <motion.div className="hero-spotlight" style={{ background: spotlight }} aria-hidden="true" />
      <FloatingOrbs />

      <div className="hero-inner shell">
        <motion.div
          className="hero-grid"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Left Column: Copy & Social Actions */}
          <motion.div className="hero-copy-block" variants={staggerItem}>
            <div className="hero-eyebrow">
              <span className="eyebrow-bar" aria-hidden="true" />
              <span>CSE Undergrad</span>
              <span className="eyebrow-sep">/</span>
              <span>Software Developer</span>
              <span className="eyebrow-sep">/</span>
              <span>Creator</span>
            </div>

            <h1 className="hero-heading">
              Hi, I&apos;m <em>Priyanshu</em>
            </h1>

            <p className="hero-intro">
              A Computer Science undergrad who loves <strong>building and speaking in public</strong>. Check out my social media below to explore my tech talks, videos, and projects.
            </p>

            <div className="hero-social-actions">
              <div className="hero-social-group">
                {heroSocials.map((social) => (
                  <SocialMagneticButton key={social.name} {...social} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Portrait Stage */}
          <motion.div
            className="hero-portrait-stage"
            variants={staggerItem}
            style={{ x: springPortraitX, y: springPortraitY }}
          >
            <div className="hero-portrait-backdrop" aria-hidden="true" />
            <div className="hero-portrait-halo" aria-hidden="true">
              <i /><i /><i />
            </div>

            <motion.div
              className="hero-portrait-frame"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={profileImage}
                alt={`${profile.name} portrait`}
                loading="eager"
                fetchPriority="high"
              />
            </motion.div>

            {/* Floating Tag 1 */}
            <motion.div
              className="hero-portrait-tag tag-top"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="tag-icon-wrap">
                <Mic2 size={16} />
              </div>
              <div className="tag-text">
                <b>Public Speaker</b>
                <span>Tech talks on YouTube</span>
              </div>
            </motion.div>

            {/* Floating Tag 2 */}
            <motion.div
              className="hero-portrait-tag tag-bottom"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            >
              <div className="tag-icon-wrap">
                <Code2 size={16} />
              </div>
              <div className="tag-text">
                <b>Full-stack</b>
                <span>React, Node.js & App Dev</span>
              </div>
            </motion.div>

            <div className="hero-portrait-orbit" aria-hidden="true">
              <i />
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll down indicator cue */}
        <motion.div
          className="hero-scroll-wrap"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <a
            className="hero-scroll-cue"
            href="#about"
            aria-label="Scroll to About section"
          >
            <motion.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={18} />
            </motion.span>
          </a>
        </motion.div>
      </div>
    </section>
  )
}
