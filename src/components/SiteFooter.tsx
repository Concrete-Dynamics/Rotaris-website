import logo from '../assets/logo.svg'
import { RELEASES_URL, REPO_URL } from '../data/release'

const COLUMNS = [
  {
    title: 'Documentation',
    links: [
      { label: 'Installation guides', href: '#docs' },
      { label: 'First-run guide', href: '#docs' },
      { label: 'Provider setup', href: '#docs' },
      { label: 'Architecture', href: '#docs' },
      { label: 'Migration from geraet-ai', href: '#docs' },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Security', href: '#security' },
      { label: 'Privacy & diagnostics', href: '#docs' },
      { label: 'Checksums', href: RELEASES_URL },
      { label: 'Release notes', href: RELEASES_URL },
    ],
  },
  {
    title: 'Project',
    links: [
      { label: 'GitHub', href: REPO_URL },
      { label: 'Previous versions', href: RELEASES_URL },
      { label: 'Changelog', href: '#docs' },
      { label: 'License · MIT', href: '#docs' },
    ],
  },
]

export default function SiteFooter() {
  return (
    <footer id="docs" className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img src={logo} alt="Rotaris" />
              <span>Rotaris</span>
            </div>
            <p className="footer-tagline">
              Visible, controllable, and verifiable multi-agent software development.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <div className="footer-col" key={column.title}>
              <span className="card-kicker">{column.title}</span>
              {column.links.map((link) => (
                <a key={link.label} href={link.href}>
                  {link.label}
                </a>
              ))}
            </div>
          ))}
        </div>

        <hr className="rt-fade-rule" style={{ margin: '36px 0 20px' }} />

        <div className="footer-legal">
          <span>© 2026 Concrete Dynamics UG (haftungsbeschränkt) · MIT license</span>
          <span>
            Rotaris is the desktop application powered by the geraet-ai orchestration engine.
          </span>
        </div>
      </div>
    </footer>
  )
}
