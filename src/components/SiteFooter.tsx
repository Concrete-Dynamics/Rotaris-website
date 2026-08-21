import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import {
  ARCHITECTURE_URL,
  LATEST_RELEASE_URL,
  LICENSE_URL,
  README_ANCHORS,
  RELEASES_URL,
  REPO_URL,
  SECURITY_POLICY_URL,
} from '../data/release'
import { HOME_ANCHORS, LEGAL_ROUTES } from '../data/routes'
import { useLocalePath } from '../hooks/useLocalePath'

interface FooterLink {
  /** Key under `footer.<column>` in the common namespace. */
  key: string
  href: string
  /** Internal targets go through the router; external ones are plain anchors. */
  internal?: boolean
}

const COLUMNS: { title: string; group: string; links: FooterLink[] }[] = [
  {
    title: 'footer.columns.product',
    group: 'product',
    links: [
      { key: 'whatItIs', href: HOME_ANCHORS.product, internal: true },
      { key: 'howItWorks', href: HOME_ANCHORS.howItWorks, internal: true },
      { key: 'views', href: HOME_ANCHORS.views, internal: true },
      { key: 'orchestration', href: HOME_ANCHORS.orchestration, internal: true },
      { key: 'verification', href: HOME_ANCHORS.verification, internal: true },
      { key: 'control', href: HOME_ANCHORS.control, internal: true },
      { key: 'models', href: HOME_ANCHORS.models, internal: true },
      { key: 'git', href: HOME_ANCHORS.git, internal: true },
      { key: 'openSource', href: HOME_ANCHORS.openSource, internal: true },
      { key: 'faq', href: HOME_ANCHORS.faq, internal: true },
    ],
  },
  {
    // Until a docs site exists the README is the documentation, so these point
    // at its headings rather than at a placeholder anchor on this page.
    title: 'footer.columns.documentation',
    group: 'documentation',
    links: [
      { key: 'install', href: README_ANCHORS.quickStart },
      { key: 'firstRun', href: README_ANCHORS.firstRun },
      { key: 'providers', href: README_ANCHORS.providers },
      { key: 'permissions', href: README_ANCHORS.permissions },
      { key: 'architecture', href: ARCHITECTURE_URL },
      { key: 'rename', href: HOME_ANCHORS.faq, internal: true },
    ],
  },
  {
    title: 'footer.columns.trust',
    group: 'trust',
    links: [
      { key: 'security', href: HOME_ANCHORS.security, internal: true },
      { key: 'securityPolicy', href: SECURITY_POLICY_URL },
      { key: 'checksums', href: LATEST_RELEASE_URL },
      { key: 'releaseNotes', href: RELEASES_URL },
      { key: 'github', href: REPO_URL },
    ],
  },
  {
    title: 'footer.columns.legal',
    group: 'legal',
    links: [
      { key: 'imprint', href: LEGAL_ROUTES.imprint, internal: true },
      { key: 'privacy', href: LEGAL_ROUTES.privacy, internal: true },
      { key: 'terms', href: LEGAL_ROUTES.terms, internal: true },
      { key: 'eula', href: LEGAL_ROUTES.eula, internal: true },
      { key: 'withdrawal', href: LEGAL_ROUTES.withdrawal, internal: true },
      { key: 'acceptableUse', href: LEGAL_ROUTES.acceptableUse, internal: true },
      { key: 'license', href: LICENSE_URL },
    ],
  },
]

export default function SiteFooter() {
  const { t } = useTranslation('common')
  const localePath = useLocalePath()

  return (
    <footer id="docs" className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="footer-brand">
              <img src={logo} alt="Rotaris" />
              <span>Rotaris</span>
            </div>
            <p className="footer-tagline">{t('footer.tagline')}</p>
          </div>

          {COLUMNS.map((column) => (
            <div className="footer-col" key={column.group}>
              <span className="card-kicker">{t(column.title)}</span>
              {column.links.map((link) =>
                link.internal ? (
                  <Link key={link.key} to={localePath(link.href)}>
                    {t(`footer.${column.group}.${link.key}`)}
                  </Link>
                ) : (
                  <a key={link.key} href={link.href}>
                    {t(`footer.${column.group}.${link.key}`)}
                  </a>
                ),
              )}
            </div>
          ))}
        </div>

        <hr className="rt-fade-rule" style={{ margin: '36px 0 20px' }} />

        <div className="footer-legal">
          <span>{t('footer.copyright')}</span>
          <span>{t('footer.entity')}</span>
        </div>
      </div>
    </footer>
  )
}
