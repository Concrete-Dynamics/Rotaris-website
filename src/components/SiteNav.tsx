import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { HOME_ANCHORS } from '../data/routes'
import { REPO_URL } from '../data/release'
import { useLocale, useLocalePath, useSwitchLocalePath } from '../hooks/useLocalePath'
import { LOCALES, LOCALE_LABELS } from '../i18n/config'

const LINKS = [
  { to: HOME_ANCHORS.product, key: 'nav.product' },
  { to: HOME_ANCHORS.howItWorks, key: 'nav.howItWorks' },
  { to: HOME_ANCHORS.security, key: 'nav.security' },
  { to: HOME_ANCHORS.docs, key: 'nav.docs' },
] as const

export default function SiteNav() {
  const { t } = useTranslation('common')
  const localePath = useLocalePath()
  const switchPath = useSwitchLocalePath()
  const locale = useLocale()
  const other = LOCALES.find((candidate) => candidate !== locale) ?? locale

  return (
    <nav className="site-nav">
      <div className="wrap">
        <Link className="nav-brand" to={localePath('/')}>
          <img src={logo} alt="Rotaris" />
          <span>Rotaris</span>
        </Link>
        <div className="nav-links">
          {LINKS.map((link) => (
            <Link key={link.key} className="nav-link" to={localePath(link.to)}>
              {t(link.key)}
            </Link>
          ))}
          <a className="nav-link" href={REPO_URL}>
            <i className="ph ph-github-logo" aria-hidden="true" />
            {t('nav.github')}
          </a>
          {/*
            A real link rather than a control, so the other language is
            crawlable and can be opened in a new tab. `hrefLang` states what is
            on the other end; `lang` states what the label itself is written in.
          */}
          <Link
            className="nav-link nav-link-keep nav-lang"
            to={switchPath(other)}
            hrefLang={other}
            lang={other}
            title={t('language.switchTo')}
          >
            <i className="ph ph-translate" aria-hidden="true" />
            {LOCALE_LABELS[other]}
          </Link>
          <Link
            className="btn btn-primary btn-compact nav-download"
            to={localePath(HOME_ANCHORS.download)}
          >
            <i className="ph ph-download-simple" aria-hidden="true" />
            {t('nav.download')}
          </Link>
        </div>
      </div>
    </nav>
  )
}
