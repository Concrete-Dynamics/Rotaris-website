import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { HOME_ANCHORS } from '../data/routes'
import { useLocalePath } from '../hooks/useLocalePath'
import { usePlatformCopy, type ReleaseState } from '../hooks/useRelease'

/** Mid-page download access — DL-11 asks for the action to recur down the page. */
export default function DownloadBand({ release }: { release: ReleaseState }) {
  const { t } = useTranslation('home')
  const localePath = useLocalePath()
  const copy = usePlatformCopy(release)

  return (
    <div className="download-band">
      <div className="wrap">
        <strong>{t('band.lead')}</strong>
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
