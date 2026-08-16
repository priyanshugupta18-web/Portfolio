import { motion } from 'framer-motion'
import { FaReact } from 'react-icons/fa'
import { SiFramer, SiTailwindcss } from 'react-icons/si'
import { profile } from '../../data/portfolio'

export default function Footer() {
  return (
    <motion.footer
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="footer-inner shell">
        <span>Copyright {new Date().getFullYear()} {profile.name}</span>
        <div className="footer-tech">
          <span>Built with</span>
          <span>
            <FaReact /> React
          </span>
          <span>
            <SiTailwindcss /> Tailwind
          </span>
          <span>
            <SiFramer /> Motion
          </span>
        </div>
        <div className="footer-links">
          {profile.socialLinks.map(({ href, icon: Icon, label }) => (
            <motion.a
              className="social-link"
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              key={label}
              whileHover={{ y: -3, color: '#f2b51c' }}
            >
              <Icon size={17} />
            </motion.a>
          ))}
        </div>
      </div>
    </motion.footer>
  )
}
