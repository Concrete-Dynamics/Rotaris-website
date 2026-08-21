import { useTranslation } from 'react-i18next'
import { REPO_URL } from '../data/release'
import type { ReleaseState } from '../hooks/useRelease'

export default function OpenSource({ release }: { release: ReleaseState }) {
  const { t } = useTranslation('home')

  // Only verifiable facts belong here — no invented adoption metrics (Section 14).
  const KPIS = [
    { value: 'MIT', unit: t('openSource.kpis.license') },
    { value: `v${release.channelInfo.version}`, unit: t('openSource.kpis.latestRelease') },
    { value: '2', unit: t('openSource.kpis.platforms') },
    { value: 'SHA-256', unit: t('openSource.kpis.checksums') },
  ]

  return (
    <section id="open-source" className="section">
      <div className="wrap">
        <h6>{t('openSource.kicker')}</h6>
        <h2 style={{ marginBottom: 14 }}>{t('openSource.title')}</h2>
        <p className="section-lede" style={{ marginBottom: 36 }}>
          {t('openSource.lede')}
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
              {t('openSource.kpis.repo')}
            </span>
            <a href={REPO_URL} className="mono" style={{ fontSize: 11 }}>
              theUpsider/Rotaris
            </a>
          </div>
        </div>

        <p style={{ fontSize: 12, color: 'var(--rt-text-tertiary)', margin: '20px 0 0' }}>
          {t('openSource.note')}
        </p>
      </div>
    </section>
  )
}
