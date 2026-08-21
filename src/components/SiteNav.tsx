import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { HOME_ANCHORS } from '../data/routes'
import { REPO_URL } from '../data/release'

const LINKS = [
  { to: HOME_ANCHORS.product, label: 'Product' },
  { to: HOME_ANCHORS.howItWorks, label: 'How it works' },
  { to: HOME_ANCHORS.security, label: 'Security' },
  { to: HOME_ANCHORS.docs, label: 'Docs' },
]

export default function SiteNav() {
  return (
    <nav className="site-nav">
      <div className="wrap">
        <Link className="nav-brand" to="/">
          <img src={logo} alt="Rotaris" />
          <span>Rotaris</span>
        </Link>
        <div className="nav-links">
          {LINKS.map((link) => (
            <Link key={link.to} className="nav-link" to={link.to}>
              {link.label}
            </Link>
          ))}
          <a className="nav-link" href={REPO_URL}>
            <i className="ph ph-github-logo" aria-hidden="true" />
            GitHub
          </a>
          <Link className="btn btn-primary btn-compact nav-download" to={HOME_ANCHORS.download}>
            <i className="ph ph-download-simple" aria-hidden="true" />
            Download
          </Link>
        </div>
      </div>
    </nav>
  )
}
