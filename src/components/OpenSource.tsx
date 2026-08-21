import { REPO_URL } from '../data/release'
import type { ReleaseState } from '../hooks/useRelease'

export default function OpenSource({ release }: { release: ReleaseState }) {
  // Only verifiable facts belong here — no invented adoption metrics (Section 14).
  const KPIS = [
    { value: 'MIT', unit: 'license' },
    { value: `v${release.channelInfo.version}`, unit: 'latest release' },
    { value: '2', unit: 'platforms · macOS soon' },
    { value: 'SHA-256', unit: 'checksums per artifact' },
  ]

  return (
    <section id="open-source" className="section">
      <div className="wrap">
        <h6>Open source</h6>
        <h2 style={{ marginBottom: 14 }}>Built in the open</h2>
        <p className="section-lede" style={{ marginBottom: 36 }}>
          MIT-licensed, CI-built from tagged commits, released with checksums. Every claim on this
          page maps to code you can read.
        </p>

        <div className="grid-cards cols-sm">
          {KPIS.map((kpi) => (
            <div className="card" style={{ gap: 2 }} key={kpi.unit}>
              <span className="kpi-value" style={{ fontSize: 21 }}>
                {kpi.value}
              </span>
              <span className="kpi-unit">{kpi.unit}</span>
            </div>
          ))}
          <div className="card" style={{ gap: 2 }}>
            <span
              className="kpi-value"
              style={{ fontSize: 21, display: 'inline-flex', alignItems: 'center', gap: 8 }}
            >
              <i className="ph ph-github-logo" style={{ fontSize: 19 }} aria-hidden="true" />
              repo
            </span>
            <a href={REPO_URL} className="mono" style={{ fontSize: 11 }}>
              theUpsider/Rotaris
            </a>
          </div>
        </div>

        <p style={{ fontSize: 12, color: 'var(--rt-text-tertiary)', margin: '20px 0 0' }}>
          All releases are built by CI from tagged commits and published to GitHub Releases.
          Previous versions remain available for rollback and reproducibility.
        </p>
      </div>
    </section>
  )
}
