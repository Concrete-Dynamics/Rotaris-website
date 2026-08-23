import { useTranslation } from 'react-i18next'
import logo from '../assets/logo.svg'
import { LATEST_RELEASE_URL, RELEASES_URL, REPO_URL } from '../data/release'
import { usePlatformCopy, useReleaseDate, type ReleaseState } from '../hooks/useRelease'
import ChannelSwitch from './ChannelSwitch'
import DownloadNetworkDisclosure from './DownloadNetworkDisclosure'
import WorkspaceMock from './WorkspaceMock'

export default function DownloadHero({ release }: { release: ReleaseState }) {
  const { t } = useTranslation('home')
  const { release: platform, channelInfo, channel, isPreview, setChannel } = release
  const copy = usePlatformCopy(release)
  const releasedOn = useReleaseDate(channelInfo.releasedOn)

  return (
    <header id="download" className="hero rt-dot-grid-soft">
      <div className="wrap">
        <img className="hero-logo" src={logo} alt="Rotaris" />
        <p className="hero-eyebrow">{t('hero.eyebrow')}</p>
        <h1>{t('hero.title')}</h1>
        <p className="hero-sub">{t('hero.sub')}</p>

        <ChannelSwitch channel={channel} onChange={setChannel} />

        {platform.soon ? (
          <>
            <div className="download-soon">
              <i className="ph ph-apple-logo" aria-hidden="true" />
              {t('hero.macosSoon')}
            </div>
            <a className="btn btn-secondary btn-compact" href={REPO_URL} style={{ marginTop: 12 }}>
              <i className="ph ph-bell" aria-hidden="true" />
              {t('hero.watchRepo')}
            </a>
          </>
        ) : (
          <a className="btn btn-primary btn-download-lg" href={LATEST_RELEASE_URL}>
            <i className={platform.icon} aria-hidden="true" />
            {copy.label}
          </a>
        )}

        <div className="mono release-line">
          {copy.sub} · {copy.size} · {copy.minOs}
        </div>

        {isPreview && (
          <p className="preview-warning">
            <i className="ph ph-warning" aria-hidden="true" />
            <span>{t('hero.previewWarning')}</span>
          </p>
        )}

        <div className="alt-platforms">
          <span>{t('hero.alsoAvailable')}</span>
          <a className="btn btn-secondary btn-compact" href={LATEST_RELEASE_URL}>
            <i className="ph ph-windows-logo" aria-hidden="true" />
            {t('hero.windows')} <span className="mono">x64</span>
          </a>
          <a className="btn btn-secondary btn-compact" href={LATEST_RELEASE_URL}>
            <i className="ph ph-linux-logo" aria-hidden="true" />
            {t('hero.linux')} <span className="mono">AppImage · deb · rpm</span>
          </a>
          <span className="btn btn-compact platform-soon">
            <i className="ph ph-apple-logo" aria-hidden="true" />
            {t('hero.macos')} <span className="mono">{t('hero.macosTag')}</span>
          </span>
        </div>

        <div className="mono meta-line">
          <span>v{channelInfo.version}</span>
          <span className="sep">·</span>
          <span>{t('hero.released', { date: releasedOn })}</span>
          <span className="sep">·</span>
          <span>GPL-3.0-only</span>
          <span className="sep">·</span>
          <a href={RELEASES_URL}>{t('hero.releaseNotes')}</a>
          <span className="sep">·</span>
          <a href={LATEST_RELEASE_URL}>{t('hero.checksums')}</a>
          <span className="sep">·</span>
          <span>
            <i className="ph ph-seal-check" style={{ color: 'var(--rt-run)' }} aria-hidden="true" />{' '}
            {t('hero.signed')}
          </span>
          <DownloadNetworkDisclosure />
        </div>

        <details className="advanced">
          <summary>
            <i className="ph ph-caret-down" style={{ verticalAlign: -2 }} aria-hidden="true" />{' '}
            {t('hero.advanced')}
          </summary>
          <div className="advanced-body">
            <p>{t('hero.advancedBody')}</p>
            <div className="download-soon">
              <i className="ph ph-clock" aria-hidden="true" />
              {t('hero.advancedSoon')}
            </div>
          </div>
        </details>

        <WorkspaceMock />
      </div>
    </header>
  )
}
