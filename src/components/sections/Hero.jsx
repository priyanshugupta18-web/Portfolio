import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ChevronDown, Code2, Mic2, ArrowUpRight } from 'lucide-react'
import { FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
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

/* ── Ambient 3D Glowing Bokeh Discs ── */
const BOKEH_ORBS = [
  { id: 1, top: '15%', left: '10%', size: 280, blur: 70, color: 'rgba(242, 181, 28, 0.16)', dur: 8, delay: 0 },
  { id: 2, top: '55%', right: '8%', size: 340, blur: 90, color: 'rgba(177, 66, 214, 0.13)', dur: 10, delay: 1 },
  { id: 3, top: '25%', right: '22%', size: 220, blur: 60, color: 'rgba(242, 181, 28, 0.14)', dur: 7, delay: 0.5 },
  { id: 4, top: '75%', left: '18%', size: 300, blur: 80, color: 'rgba(242, 181, 28, 0.11)', dur: 9, delay: 1.5 },
]

export default function Hero() {
  const sectionRef = useRef(null)

  /* ── Scroll progress for Parallax ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  /* ── Mouse 3D Camera & Grid Tilt Simulation ── */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothRotY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), { stiffness: 60, damping: 25 })
  const smoothRotX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), { stiffness: 60, damping: 25 })
  const smoothTransX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-25, 25]), { stiffness: 70, damping: 28 })
  const smoothTransY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), { stiffness: 70, damping: 28 })

  /* ── Scroll-driven Background Parallax Zoom & Lift ── */
  const gridY   = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const gridRot = useTransform(scrollYProgress, [0, 1], [65, 75])
  const textY   = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])

  /* ── Anamorphic Lens Flare Sweep ── */
  const flareX = useTransform(scrollYProgress, [0, 1], ['-20%', '120%'])
  const flareOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.35, 0.75, 0.5, 0.2])

  /* ── Spotlight on cursor ── */
  const spotX = useMotionValue('50%')
  const spotY = useMotionValue('50%')
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${spotX} ${spotY}, rgba(242,181,28,0.13), transparent 70%)`

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
      className="hero hero-parallax-fullbleed hero-tech-mesh"
      id="top"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ━━ Full-Bleed 3D Perspective Tech Matrix Stage ━━ */}
      <div className="hpf-3d-stage">
        {/* 3D Interactive Perspective Grid Plane */}
        <motion.div
          className="hpf-grid-plane"
          style={{
            y: gridY,
            rotateX: gridRot,
            rotateY: smoothRotX,
            rotateZ: smoothRotY,
            x: smoothTransX,
          }}
          aria-hidden="true"
        />

        {/* Anamorphic Lens Flare Streak */}
        <motion.div
          className="hpf-anamorphic-flare"
          style={{
            left: flareX,
            opacity: flareOpacity,
            y: smoothTransY,
          }}
          aria-hidden="true"
        />

        {/* Ambient 3D Bokeh Orbs */}
        <div className="hpf-bokeh-container" aria-hidden="true">
          {BOKEH_ORBS.map((orb) => (
            <motion.div
              key={orb.id}
              className="hpf-bokeh-orb"
              style={{
                top: orb.top,
                left: orb.left,
                right: orb.right,
                width: orb.size,
                height: orb.size,
                background: orb.color,
                filter: `blur(${orb.blur}px)`,
                x: smoothTransX,
                y: smoothTransY,
              }}
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.55, 0.85, 0.55],
              }}
              transition={{
                duration: orb.dur,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: orb.delay,
              }}
            />
          ))}
        </div>

        {/* Vignette & Gradient Overlays for High Legibility */}
        <div className="hpf-vignette" aria-hidden="true" />
        <div className="hpf-gradient" aria-hidden="true" />
        <motion.div className="hero-spotlight" style={{ background: spotlight }} aria-hidden="true" />
      </div>

      {/* ━━ Content Layer Pinned Over Parallax Background ━━ */}
      <motion.div className="hero-inner shell hpf-content" style={{ y: textY }}>
        <motion.div
          className="hpf-grid"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          {/* Left Column: Designation, Heading, Intro & Social Media */}
          <motion.div className="hero-copy-block hpf-copy" variants={staggerItem}>
            {/* Designation Eyebrow */}
            <div className="hero-eyebrow">
              <span className="eyebrow-bar" aria-hidden="true" />
              <span>CSE Undergrad</span>
              <span className="eyebrow-sep">/</span>
              <span>Software Developer</span>
            </div>

            {/* Heading */}
            <h1 className="hero-heading hpf-heading">
              Hi, I&apos;m <em>Priyanshu</em>
            </h1>

            {/* Intro Paragraph */}
            <p className="hero-intro hpf-intro">
              A Computer Science undergrad who loves <strong>building and speaking in public</strong>. Check out my social media below to explore my tech talks, videos, and projects.
            </p>

            {/* Social Media Buttons (YouTube, LinkedIn, X) */}
            <div className="hero-social-actions">
              <div className="hero-social-group">
                {heroSocials.map((social) => (
                  <SocialMagneticButton key={social.name} {...social} />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Pop-Up Badges */}
          <motion.div className="hpf-badges-column" variants={staggerItem}>
            <motion.div
              className="hero-portrait-tag hpf-hud-badge static-badge"
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            >
              <div className="tag-icon-wrap">
                <Mic2 size={16} />
              </div>
              <div className="tag-text">
                <b>Public Speaker</b>
                <span>Tech talks on YouTube</span>
              </div>
            </motion.div>

            <motion.div
              className="hero-portrait-tag hpf-hud-badge static-badge"
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 320, damping: 20 }}
            >
              <div className="tag-icon-wrap">
                <Code2 size={16} />
              </div>
              <div className="tag-text">
                <b>Full-stack</b>
                <span>React, Node.js &amp; App Dev</span>
              </div>
            </motion.div>
          </motion.div>
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
