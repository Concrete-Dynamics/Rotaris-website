import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { HOME_ANCHORS } from '../data/routes'
import { useLocalePath } from '../hooks/useLocalePath'
import { usePageMeta } from '../hooks/usePageMeta'

export default function NotFound() {
  const { t } = useTranslation('common')
  const localePath = useLocalePath()

  usePageMeta({
    title: t('meta.notFound.title'),
    description: t('meta.notFound.description'),
  })

  return (
    <main className="notfound rt-dot-grid-soft">
      <div className="wrap">
        <img src={logo} alt="" aria-hidden="true" width={44} height={50} />
        <p className="mono notfound-code">404</p>
        <h1>{t('notFound.heading')}</h1>
        <p className="notfound-sub">{t('notFound.sub')}</p>
        <div className="final-actions">
          <Link className="btn btn-primary" to={localePath(HOME_ANCHORS.download)}>
            <i className="ph ph-download-simple" aria-hidden="true" />
            {t('notFound.download')}
          </Link>
          <Link className="btn btn-secondary" to={localePath('/')}>
            <i className="ph ph-house" aria-hidden="true" />
            {t('notFound.home')}
          </Link>
        </div>
      </div>
    </main>
  )
}
