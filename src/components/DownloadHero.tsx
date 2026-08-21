import logo from '../assets/logo.svg'
import { LATEST_RELEASE_URL, RELEASES_URL, REPO_URL } from '../data/release'
import type { ReleaseState } from '../hooks/useRelease'
import ChannelSwitch from './ChannelSwitch'
import WorkspaceMock from './WorkspaceMock'

export default function DownloadHero({ release }: { release: ReleaseState }) {
  const { release: platform, channelInfo, channel, isPreview, setChannel } = release

  return (
    <header id="download" className="hero rt-dot-grid-soft">
      <div className="wrap">
        <img className="hero-logo" src={logo} alt="Rotaris" />
        <p className="hero-eyebrow">
          Beyond the terminal. Into the era of agentic software development.
        </p>
        <h1>Download Rotaris</h1>
        <p className="hero-sub">
          Agentic coding has outgrown the command line. Rotaris gives multi-agent development
          the interface it deserves.
        </p>

        <ChannelSwitch channel={channel} onChange={setChannel} />

        {platform.soon ? (
          <>
            <div className="download-soon">
              <i className="ph ph-apple-logo" aria-hidden="true" />
              macOS build coming soon
            </div>
            <a className="btn btn-secondary btn-compact" href={REPO_URL} style={{ marginTop: 12 }}>
              <i className="ph ph-bell" aria-hidden="true" />
              Watch the repo for the macOS release
            </a>
          </>
        ) : (
          <a className="btn btn-primary btn-download-lg" href={LATEST_RELEASE_URL}>
            <i className={platform.icon} aria-hidden="true" />
            {platform.label}
          </a>
        )}

        <div className="mono release-line">
          {platform.sub} · {platform.size} · {platform.minOs}
        </div>

        {isPreview && (
          <p className="preview-warning">
            <i className="ph ph-warning" aria-hidden="true" />
            <span>
              Preview builds may be unstable. They use a separate configuration and can be
              reported on GitHub. You can return to Stable at any time.
            </span>
          </p>
        )}

        <div className="alt-platforms">
          <span>Also available for</span>
          <a className="btn btn-secondary btn-compact" href={LATEST_RELEASE_URL}>
            <i className="ph ph-windows-logo" aria-hidden="true" />
            Windows <span className="mono">x64</span>
          </a>
          <a className="btn btn-secondary btn-compact" href={LATEST_RELEASE_URL}>
            <i className="ph ph-linux-logo" aria-hidden="true" />
            Linux <span className="mono">AppImage · deb · rpm</span>
          </a>
          <span className="btn btn-compact platform-soon">
            <i className="ph ph-apple-logo" aria-hidden="true" />
            macOS <span className="mono">coming soon</span>
          </span>
        </div>

        <div className="mono meta-line">
          <span>v{channelInfo.version}</span>
          <span className="sep">·</span>
          <span>released {channelInfo.releasedOn}</span>
          <span className="sep">·</span>
          <span>MIT licensed</span>
          <span className="sep">·</span>
          <a href={RELEASES_URL}>Release notes</a>
          <span className="sep">·</span>
          <a href={RELEASES_URL}>SHA-256 checksums</a>
          <span className="sep">·</span>
          <span>
            <i className="ph ph-seal-check" style={{ color: 'var(--rt-run)' }} aria-hidden="true" />{' '}
            signed
          </span>
        </div>

        <details className="advanced">
          <summary>
            <i className="ph ph-caret-down" style={{ verticalAlign: -2 }} aria-hidden="true" />{' '}
            Advanced installation
          </summary>
          <div className="advanced-body">
            <p>
              CLI-only and Python package installation, for headless or scripted use. The desktop
              application above bundles everything — no Python required.
            </p>
            <pre className="mono">
              <span className="dim"># Python 3.12+ · terminal interface</span>
              {'\n'}pip install rotaris{'\n'}rotaris run
            </pre>
          </div>
        </details>

        <WorkspaceMock />
      </div>
    </header>
  )
}
