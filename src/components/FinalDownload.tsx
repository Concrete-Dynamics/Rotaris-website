import { LATEST_RELEASE_URL } from '../data/release'
import type { ReleaseState } from '../hooks/useRelease'

export default function FinalDownload({ release }: { release: ReleaseState }) {
  const { release: platform, channelInfo } = release

  return (
    <section id="download-final" className="final-download rt-dot-grid-soft">
      <div className="wrap">
        <h2>Put your coding agents under control.</h2>
        <p>Free, open source, no account required.</p>

        <div className="final-actions">
          {platform.soon ? (
            <a className="btn btn-primary" href={LATEST_RELEASE_URL}>
              <i className="ph ph-download-simple" aria-hidden="true" />
              See all downloads
            </a>
          ) : (
            <a className="btn btn-primary" href={LATEST_RELEASE_URL}>
              <i className={platform.icon} aria-hidden="true" />
              {platform.label}
            </a>
          )}
          <a className="btn btn-secondary" href="#docs">
            <i className="ph ph-book-open" aria-hidden="true" />
            Read the documentation
          </a>
        </div>

        <div className="mono" style={{ fontSize: 11, color: 'var(--rt-text-tertiary)', marginTop: 18 }}>
          v{channelInfo.version} · Windows x64 · Linux AppImage / deb / rpm · macOS coming soon
        </div>
      </div>
    </section>
  )
}
