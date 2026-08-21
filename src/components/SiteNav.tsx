import logo from '../assets/logo.svg'
import { REPO_URL } from '../data/release'

const LINKS = [
  { href: '#product', label: 'Product' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#security', label: 'Security' },
  { href: '#docs', label: 'Docs' },
]

export default function SiteNav() {
  return (
    <nav className="site-nav">
      <div className="wrap">
        <a className="nav-brand" href="#download">
          <img src={logo} alt="Rotaris" />
          <span>Rotaris</span>
        </a>
        <div className="nav-links">
          {LINKS.map((link) => (
            <a key={link.href} className="nav-link" href={link.href}>
              {link.label}
            </a>
          ))}
          <a className="nav-link" href={REPO_URL}>
            <i className="ph ph-github-logo" aria-hidden="true" />
            GitHub
          </a>
          <a className="btn btn-primary btn-compact nav-download" href="#download">
            <i className="ph ph-download-simple" aria-hidden="true" />
            Download
          </a>
        </div>
      </div>
    </nav>
  )
}
