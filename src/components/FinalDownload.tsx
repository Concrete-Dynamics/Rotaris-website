import { useTranslation } from 'react-i18next'
import { LATEST_RELEASE_URL, README_ANCHORS } from '../data/release'
import { usePlatformCopy, type ReleaseState } from '../hooks/useRelease'

export default function FinalDownload({ release }: { release: ReleaseState }) {
  const { t } = useTranslation('home')
  const { release: platform, channelInfo } = release
  const copy = usePlatformCopy(release)

  return (
    <section id="download-final" className="final-download rt-dot-grid-soft">
      <div className="wrap">
        <h2>{t('final.title')}</h2>
        <p>{t('final.sub')}</p>

        <div className="final-actions">
          {platform.soon ? (
            <a className="btn btn-primary" href={LATEST_RELEASE_URL}>
              <i className="ph ph-download-simple" aria-hidden="true" />
              {t('final.seeAll')}
            </a>
          ) : (
            <a className="btn btn-primary" href={LATEST_RELEASE_URL}>
              <i className={platform.icon} aria-hidden="true" />
              {copy.label}
            </a>
          )}
          {/* The documentation is the repository README until a docs site exists. */}
          <a className="btn btn-secondary" href={README_ANCHORS.quickStart}>
            <i className="ph ph-book-open" aria-hidden="true" />
            {t('final.readDocs')}
          </a>
        </div>

        <div
          className="mono"
          style={{ fontSize: 11, color: 'var(--rt-text-tertiary)', marginTop: 18 }}
        >
          v{channelInfo.version} · {t('final.meta')}
        </div>
      </div>
    </section>
  )
}
