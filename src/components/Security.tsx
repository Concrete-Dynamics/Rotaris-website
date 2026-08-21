import { Trans, useTranslation } from 'react-i18next'
import { README_ANCHORS, SECURITY_POLICY_URL } from '../data/release'

const BOUNDARIES = [
  { key: 'files', icon: 'ph ph-folder-lock' },
  { key: 'shell', icon: 'ph ph-terminal' },
  { key: 'secrets', icon: 'ph ph-eye-slash' },
  { key: 'tokens', icon: 'ph ph-key' },
  { key: 'loops', icon: 'ph ph-arrows-counter-clockwise' },
  { key: 'cancel', icon: 'ph ph-hand-palm' },
]

export default function Security() {
  const { t } = useTranslation('home')

  return (
    <section id="security" className="section">
      <div className="wrap">
        <h6>{t('security.kicker')}</h6>
        <h2 style={{ marginBottom: 14 }}>{t('security.title')}</h2>
        <p className="section-lede">{t('security.lede')}</p>

        <div className="grid-cards cols-security" style={{ marginBottom: 44 }}>
          {BOUNDARIES.map((item) => (
            <div className="card security-card" key={item.key}>
              <div className="icon-title">
                <i className={item.icon} aria-hidden="true" />
                <span className="card-title">{t(`security.boundaries.${item.key}.title`)}</span>
              </div>
              <p className="card-body">{t(`security.boundaries.${item.key}.body`)}</p>
            </div>
          ))}
        </div>

        {/* Local operation, stated precisely rather than as "fully local" (MSG-05). */}
        <div className="card card-accented where-card">
          <span className="card-kicker">{t('security.where.kicker')}</span>
          <div className="where-list">
            <div>
              <i className="ph ph-desktop" style={{ color: 'var(--rt-run)' }} aria-hidden="true" />
              <span>{t('security.where.local')}</span>
            </div>
            <div>
              <i
                className="ph ph-arrow-square-out"
                style={{ color: 'var(--rt-wait)' }}
                aria-hidden="true"
              />
              <span>{t('security.where.providers')}</span>
            </div>
            <div>
              <i
                className="ph ph-chart-bar"
                style={{ color: 'var(--rt-accent-300)' }}
                aria-hidden="true"
              />
              <span>
                <Trans
                  t={t}
                  i18nKey="security.where.telemetry"
                  components={[
                    <span className="mono" style={{ fontSize: 12 }} />,
                    <span className="mono" style={{ fontSize: 12 }} />,
                  ]}
                />
              </span>
            </div>
            <div>
              <i
                className="ph ph-arrows-clockwise"
                style={{ color: 'var(--rt-text-tertiary)' }}
                aria-hidden="true"
              />
              <span>{t('security.where.update')}</span>
            </div>
          </div>

          {/*
            There is no security page on this site. These go to the two places
            that actually answer the question — the README section on
            permissions, and the repository's disclosure policy.
          */}
          <div className="security-links" style={{ marginTop: 6 }}>
            <a href={README_ANCHORS.permissions} style={{ fontSize: 12.5, fontWeight: 600 }}>
              {t('security.permissionsLink')}{' '}
              <i className="ph ph-arrow-right" style={{ verticalAlign: -2 }} aria-hidden="true" />
            </a>
            <a href={SECURITY_POLICY_URL} style={{ fontSize: 12.5, fontWeight: 600 }}>
              {t('security.reportLink')}{' '}
              <i className="ph ph-arrow-right" style={{ verticalAlign: -2 }} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
