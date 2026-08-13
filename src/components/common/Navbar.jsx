import { profile } from '../../data/portfolio'

export default function Navbar() {
  return (
    <header className="nav-wrap">
      <nav className="nav shell" aria-label="Main navigation">
        <a className="brand" href="#top" aria-label={`${profile.name}, home`}>
          <span className="nav-mark" aria-hidden="true">P</span>
          <span className="brand-copy">
            <span className="wordmark">{profile.name}</span>
          </span>
        </a>

        <div className="nav-links">
          {profile.navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      </nav>
    </header>
  )
}
