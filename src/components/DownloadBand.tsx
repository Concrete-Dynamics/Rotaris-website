import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { HOME_ANCHORS } from '../data/routes'
import { useLocalePath } from '../hooks/useLocalePath'
import { usePlatformCopy, type ReleaseState } from '../hooks/useRelease'

/** Mid-page download access — DL-11 asks for the action to recur down the page. */
export default function DownloadBand({ release }: { release: ReleaseState }) {
  const { t, i18n } = useTranslation('home')
  const localePath = useLocalePath()
  const copy = usePlatformCopy(release)
  const isGerman = (i18n.resolvedLanguage ?? i18n.language).toLowerCase().startsWith('de')
  const licenseLead = isGerman
    ? 'Kostenlos und Open Source unter GPL-3.0-only.'
    : 'Free and open source under GPL-3.0-only.'

  return (
    <div className="download-band">
      <div className="wrap">
        <strong>{licenseLead}</strong>
        <span className="band-note">{t('band.note')}</span>
        <Link
          className="btn btn-primary btn-compact"
          to={localePath(HOME_ANCHORS.download)}
        >
          <i className="ph ph-download-simple" aria-hidden="true" />
          {copy.label}
        </Link>
      </div>
    </div>
  )
}
