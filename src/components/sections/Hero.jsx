import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ChevronDown, ArrowUpRight, Code2, Mic2, Sparkles, Terminal } from 'lucide-react'
import { FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import carlosPortrait from '../../assets/carlosPortrait.jpg'
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

const HERO_METRICS = [
  { label: 'Specialization', value: 'Full-Stack & Apps', icon: Code2 },
  { label: 'Public Creator', value: 'YouTube Tech Speaker', icon: Mic2 },
  { label: 'Engineering', value: 'Production Code', icon: Terminal },
]

function SocialMagneticButton({ href, name, icon: Icon, className }) {
  const ref = useRef(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 240, damping: 20 })
  const springY = useSpring(y, { stiffness: 240, damping: 20 })

  function handleMove(event) {
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
      whileHover={{ scale: 1.06, y: -3 }}
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

  /* ── Scroll progress ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  /* ── Mouse 3D Camera Simulation ── */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothRotY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), { stiffness: 60, damping: 25 })
  const smoothRotX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 60, damping: 25 })
  const smoothTransX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), { stiffness: 70, damping: 28 })

  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-10%'])

  /* ── Spotlight on cursor ── */
  const spotX = useMotionValue('50%')
  const spotY = useMotionValue('50%')
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${spotX} ${spotY}, rgba(242,181,28,0.14), transparent 70%)`

  function handleMouseMove(e) {
    if (!window.matchMedia('(hover: hover)').matches) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    const normX = (e.clientX - rect.left) / rect.width - 0.5
    const normY = (e.clientY - rect.top) / rect.height - 0.5
    mouseX.set(normX)
    mouseY.set(normY)
    spotX.set(`${e.clientX - rect.left}px`)
    spotY.set(`${e.clientY - rect.top}px`)
  }

  function handleMouseLeave() {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={sectionRef}
      className="hero hero-carlos-stage"
      id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Ambient Radial Spotlight & Grid Overlay */}
      <div className="carlos-bg-grid" aria-hidden="true" />
      <motion.div className="hero-spotlight" style={{ background: spotlight }} aria-hidden="true" />

      <motion.div className="hero-inner shell carlos-hero-inner" style={{ y: textY }}>
        <motion.div
          className="carlos-hero-grid"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Left Column: Designation, Heading, Subtitle & Social Links */}
          <motion.div className="carlos-hero-copy" variants={staggerItem}>
            {/* Designation Eyebrow Badge */}
            <div className="carlos-eyebrow">
              <span className="carlos-eyebrow-dot" />
              <span>CSE Undergrad</span>
              <span className="eyebrow-sep">/</span>
              <span>Software Developer</span>
            </div>

            {/* Main Headline */}
            <h1 className="carlos-heading">
              Building digital products, apps &amp; web experiences with <em>Priyanshu</em>
            </h1>

            {/* Intro Paragraph */}
            <p className="carlos-intro">
              A Computer Science undergraduate passionate about <strong>engineering scalable web apps &amp; public speaking</strong>. Explore my tech talks, videos, and production projects below.
            </p>

            {/* Social Media Buttons */}
            <div className="hero-social-actions">
              <div className="hero-social-group">
                {heroSocials.map((social) => (
                  <SocialMagneticButton key={social.name} {...social} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Carlos Dark Studio Portrait Stage */}
          <motion.div className="carlos-portrait-column" variants={staggerItem}>
            <motion.div
              className="carlos-portrait-card"
              style={{
                rotateY: smoothRotY,
                rotateX: smoothRotX,
                x: smoothTransX,
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            >
              <div className="carlos-portrait-glow" aria-hidden="true" />
              <div className="carlos-portrait-frame">
                <img
                  src={carlosPortrait}
                  alt={`${profile.name} portrait`}
                  fetchPriority="high"
                  loading="eager"
                />
              </div>
              <div className="carlos-portrait-badge">
                <Sparkles size={14} className="badge-sparkle" />
                <span>CS Undergrad &amp; Developer</span>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Carlos Bottom Highlight Metrics Bar */}
        <motion.div
          className="carlos-metrics-bar"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {HERO_METRICS.map((metric) => {
            const Icon = metric.icon
            return (
              <motion.div
                key={metric.label}
                className="carlos-metric-card"
                whileHover={{ scale: 1.04, y: -4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <div className="metric-icon-box">
                  <Icon size={18} />
                </div>
                <div className="metric-text">
                  <span className="metric-label">{metric.label}</span>
                  <b className="metric-value">{metric.value}</b>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Scroll Cue */}
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
      </motion.div>
    </section>
  )
}
