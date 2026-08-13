import { FaReact } from 'react-icons/fa'
import { SiFramer, SiTailwindcss } from 'react-icons/si'
import { profile } from '../../data/portfolio'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner shell">
        <span>Copyright {new Date().getFullYear()} {profile.name} / {profile.role}</span>
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
            <a className="social-link" href={href} target="_blank" rel="noreferrer" aria-label={label} key={label}>
              <Icon size={17} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
