import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { RELEASES_URL, REPO_URL } from '../data/release'
import { HOME_ANCHORS, LEGAL_ROUTES } from '../data/routes'

interface FooterLink {
  label: string
  href: string
  /** Internal targets go through the router; external ones are plain anchors. */
  internal?: boolean
}

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: 'Documentation',
    links: [
      { label: 'Installation guides', href: HOME_ANCHORS.docs, internal: true },
      { label: 'First-run guide', href: HOME_ANCHORS.docs, internal: true },
      { label: 'Provider setup', href: HOME_ANCHORS.docs, internal: true },
      { label: 'Architecture', href: HOME_ANCHORS.docs, internal: true },
      { label: 'Migration from geraet-ai', href: HOME_ANCHORS.docs, internal: true },
    ],
  },
  {
    title: 'Trust',
    links: [
      { label: 'Security', href: HOME_ANCHORS.security, internal: true },
      { label: 'Checksums', href: RELEASES_URL },
      { label: 'Release notes', href: RELEASES_URL },
      { label: 'GitHub', href: REPO_URL },
    ],
  },
  {
    title: 'Legal',
    links: [
      { label: 'Impressum', href: LEGAL_ROUTES.imprint, internal: true },
      { label: 'Datenschutzerklärung', href: LEGAL_ROUTES.privacy, internal: true },
      { label: 'AGB · Rotaris Cloud', href: LEGAL_ROUTES.terms, internal: true },
      { label: 'Endnutzerbedingungen', href: LEGAL_ROUTES.eula, internal: true },
      { label: 'Widerrufsbelehrung', href: LEGAL_ROUTES.withdrawal, internal: true },
      { label: 'Zulässige Nutzung', href: LEGAL_ROUTES.acceptableUse, internal: true },
      { label: 'Lizenz · MIT', href: `${REPO_URL}/blob/main/LICENSE` },
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
              {column.links.map((link) =>
                link.internal ? (
                  <Link key={link.label} to={link.href}>
                    {link.label}
                  </Link>
                ) : (
                  <a key={link.label} href={link.href}>
                    {link.label}
                  </a>
                ),
              )}
            </div>
          ))}
        </div>

        <hr className="rt-fade-rule" style={{ margin: '36px 0 20px' }} />

        <div className="footer-legal">
          <span>© 2026 Concrete Dynamics UG (haftungsbeschränkt) · MIT license</span>
          <span>
            Rotaris — vormals geraet-ai. Concrete Dynamics UG (haftungsbeschränkt),
            Kempten (Allgäu).
          </span>
        </div>
      </div>
    </footer>
  )
}
