import { useRef } from 'react'
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { FaLinkedinIn, FaYoutube } from 'react-icons/fa'
import { FaSquareXTwitter } from 'react-icons/fa6'
import priyanshuCutout from '../../assets/priyanshuHero.png'
import { profile } from '../../data/portfolio'
import { staggerContainer, staggerItem } from '../../lib/animations'

const heroSocials = [
  { name: 'YouTube', href: 'https://youtube.com/@techyyp/', icon: FaYoutube },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/techyyp/', icon: FaLinkedinIn },
  { name: 'X', href: 'https://x.com/techyyp/', icon: FaSquareXTwitter },
]

export default function Hero() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const spotX = useMotionValue('50%')
  const spotY = useMotionValue('50%')
  const spotlight = useMotionTemplate`radial-gradient(650px circle at ${spotX} ${spotY}, rgba(244,184,54,0.06), transparent 70%)`

  function handleMouseMove(e) {
    if (!window.matchMedia('(hover: hover)').matches) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    spotX.set(`${e.clientX - rect.left}px`)
    spotY.set(`${e.clientY - rect.top}px`)
  }

  function handleMouseLeave() {
    spotX.set('50%')
    spotY.set('50%')
  }

  return (
    <section ref={sectionRef} className="carlos-hero" id="top" onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      <motion.div className="hero-spotlight" style={{ background: spotlight }} aria-hidden="true" />

      {/* Portrait — absolutely positioned, anchored to bottom center */}
      <div className="carlos-hero-portrait">
        <img src={priyanshuCutout} alt={`${profile.name} portrait`} fetchPriority="high" loading="eager" />
      </div>

      {/* Text content — 2-column grid overlaid on top */}
      <motion.div className="carlos-hero-content shell" style={{ y: textY }}>
        <motion.div className="carlos-hero-grid" initial="hidden" animate="visible" variants={staggerContainer}>
          {/* Left: Name + Social */}
          <motion.div className="carlos-left" variants={staggerItem}>
            <h1 className="carlos-display-name">
              Priyanshu<br />Gupta.
            </h1>
            <div className="carlos-name-bar" aria-hidden="true" />
            <div className="carlos-social-row">
              {heroSocials.map((social) => {
                const Icon = social.icon
                return (
                  <a key={social.name} href={social.href} target="_blank" rel="noreferrer" className="carlos-social-link" aria-label={`Visit ${social.name}`}>
                    <Icon size={17} />
                  </a>
                )
              })}
            </div>
          </motion.div>

          {/* Right: Intro + CTA */}
          <motion.div className="carlos-right" variants={staggerItem}>
            <div className="carlos-intro-eyebrow">
              <span className="eyebrow-dash">&mdash;</span>
              <span>Introduction</span>
            </div>
            <h2 className="carlos-intro-headline">
              Software Developer and Creator, based in India.
            </h2>
            <p className="carlos-intro-desc">
              Building scalable full-stack applications, interactive web tools, and technical video content. A CS undergrad who loves engineering software built for production.
            </p>
            <a className="carlos-story-btn" href="#about">
              <span>My story</span>
              <ArrowRight size={16} />
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
