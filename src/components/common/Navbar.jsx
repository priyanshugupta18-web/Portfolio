import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { profile } from '../../data/portfolio'

const navVariants = {
  hidden: { y: -24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 },
  },
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('#top')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)

    const sections = profile.navItems
      .map((item) => document.querySelector(item.href))
      .filter(Boolean)

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible?.target?.id) {
          setActive(`#${visible.target.id}`)
        }
      },
      { rootMargin: '-30% 0px -40% 0px', threshold: [0.1, 0.3, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleNavClick = (href) => {
    setActive(href)
    setMenuOpen(false)
  }

  return (
    <motion.header
      className={`nav-wrap${scrolled ? ' nav-wrap--scrolled' : ''}${menuOpen ? ' nav-wrap--open' : ''}`}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <nav className="nav shell" aria-label="Main navigation">
        <a
          className="brand"
          href="#top"
          aria-label={`${profile.name}, home`}
          onClick={() => handleNavClick('#top')}
        >
          <motion.span
            className="nav-mark"
            aria-hidden="true"
            whileHover={{ scale: 1.06, rotate: -4 }}
            whileTap={{ scale: 0.96 }}
          >
            P
          </motion.span>
          <span className="brand-copy">
            <span className="wordmark">{profile.name}</span>
          </span>
        </a>

        <div className="nav-links desktop-only">
          {profile.navItems.map((item) => (
            <a
              href={item.href}
              key={item.href}
              className={active === item.href ? 'is-active' : undefined}
              onClick={() => handleNavClick(item.href)}
            >
              {item.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="nav-toggle mobile-only"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-nav-panel shell"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mobile-nav-links">
              {profile.navItems.map((item) => (
                <a
                  href={item.href}
                  key={item.href}
                  className={`mobile-nav-link${active === item.href ? ' is-active' : ''}`}
                  onClick={() => handleNavClick(item.href)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
