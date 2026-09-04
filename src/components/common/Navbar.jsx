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
          className="carlos-brand"
          href="#top"
          aria-label={`${profile.name}, home`}
          onClick={() => handleNavClick('#top')}
        >
          <motion.div
            className="carlos-logo-mark"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 6C10.4772 6 6 10.4772 6 16C6 21.5228 10.4772 26 16 26C21.5228 26 26 21.5228 26 16H16V6Z" fill="#F4B836"/>
              <path d="M16 6C21.5228 6 26 10.4772 26 16C26 21.5228 21.5228 26 16 26V6Z" fill="#F4B836" fillOpacity="0.85"/>
            </svg>
          </motion.div>
        </a>

        <div className="nav-links desktop-only">
          {profile.navItems.map((item) => {
            const isActive = active === item.href
            return (
              <a
                href={item.href}
                key={item.href}
                className={`carlos-nav-link${isActive ? ' is-active' : ''}`}
                onClick={() => handleNavClick(item.href)}
              >
                <span>{item.label}</span>
                {isActive && (
                  <motion.span
                    layoutId="carlosActiveDot"
                    className="carlos-nav-dot"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </a>
            )
          })}
        </div>

        <button
          type="button"
          className="nav-toggle mobile-only"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
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
