import { useTranslation } from 'react-i18next'

export default function Verification() {
  const { t } = useTranslation('home')

  const summary = [
    { label: t('verification.summary.tasks'), value: <>{t('verification.summary.tasksValue')}</> },
    { label: t('verification.summary.filesChanged'), value: <>14</> },
    {
      label: t('verification.summary.tests'),
      value: (
        <>
          <span style={{ color: 'var(--rt-run)' }}>{t('verification.summary.testsPassed')}</span> ·{' '}
          {t('verification.summary.testsFailed')}
        </>
      ),
    },
    {
      label: t('verification.summary.requirements'),
      value: <>{t('verification.summary.requirementsValue')}</>,
    },
    { label: t('verification.summary.git'), value: <>{t('verification.summary.gitValue')}</> },
    {
      label: t('verification.summary.warnings'),
      value: (
        <span style={{ color: 'var(--rt-wait)' }}>{t('verification.summary.warningsValue')}</span>
      ),
    },
  ]

  return (
    <section id="verification" className="section">
      <div className="wrap">
        <h6>{t('verification.kicker')}</h6>
        <h2 style={{ marginBottom: 14 }}>{t('verification.title')}</h2>
        <p className="section-lede" style={{ maxWidth: 640 }}>
          {t('verification.lede')}
        </p>

        {/* Requirement → task → change → test → verification (Section 9). */}
        <div className="scroll-x" style={{ marginBottom: 44 }}>
          <div className="chain">
            <div className="card chain-first">
              <span className="card-kicker">{t('verification.chain.requirement')}</span>
              <span className="mono chain-id" style={{ color: 'var(--rt-accent-300)' }}>
                SWR-2104
              </span>
              <p className="card-body">{t('verification.chain.requirementBody')}</p>
            </div>
            <ChainArrow />
            <div className="card">
              <span className="card-kicker">{t('verification.chain.task')}</span>
              <span className="mono chain-id">T-014</span>
              <p className="card-body">{t('verification.chain.taskBody')}</p>
            </div>
            <ChainArrow />
            <div className="card">
              <span className="card-kicker">{t('verification.chain.change')}</span>
              <span className="mono chain-id">a3f19c2</span>
              <p className="card-body mono">
                src/api/session.py <span style={{ color: 'var(--rt-run)' }}>+214</span>{' '}
                <span style={{ color: 'var(--rt-danger-300)' }}>−96</span>
              </p>
            </div>
            <ChainArrow />
            <div className="card">
              <span className="card-kicker">{t('verification.chain.test')}</span>
              <span className="mono chain-id">test_session.py</span>
              <p className="card-body mono">
                <span style={{ color: 'var(--rt-run)' }}>✓</span>{' '}
                {t('verification.chain.testBody')}
              </p>
            </div>
            <ChainArrow />
            <div className="card chain-last">
              <span className="card-kicker">{t('verification.chain.verification')}</span>
              <span className="tag tag-done" style={{ alignSelf: 'flex-start' }}>
                <i className="ph ph-seal-check" aria-hidden="true" />
                {t('verification.chain.verified')}
              </span>
              <p className="card-body">{t('verification.chain.verificationBody')}</p>
            </div>
          </div>
        </div>

        <div className="split">
          <div>
            <h5 style={{ marginBottom: 12 }}>{t('verification.gate.title')}</h5>
            <p style={{ fontSize: 14, color: 'var(--rt-text-secondary)', textWrap: 'pretty' }}>
              {t('verification.gate.body')}
            </p>
            <p
              style={{
                fontSize: 14,
                color: 'var(--rt-text-secondary)',
                marginBottom: 0,
                textWrap: 'pretty',
              }}
            >
              {t('verification.gate.traceability')}
            </p>
          </div>

          {/* The completion summary — the signature Rotaris visual (UI-07). */}
          <div className="card elev-md summary-card">
            <div className="summary-head">
              <i className="ph-fill ph-seal-check" aria-hidden="true" />
              <span>{t('verification.summary.head')}</span>
              <span className="tag tag-done" style={{ marginLeft: 'auto' }}>
                {t('verification.summary.verified')}
              </span>
            </div>
            <div className="summary-grid">
              {summary.map((row) => (
                <div className="summary-row" key={row.label}>
                  <span className="dim">{row.label}</span>
                  <span className="mono">{row.value}</span>
                </div>
              ))}
            </div>
            <div className="summary-actions">
              <span className="btn btn-primary btn-compact">
                {t('verification.summary.accept')}
              </span>
              <span className="btn btn-secondary btn-compact">
                {t('verification.summary.reviewDiff')}
              </span>
              <span className="btn btn-ghost btn-compact" style={{ marginLeft: 'auto' }}>
                {t('verification.summary.viewEvidence')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ChainArrow() {
  return (
    <div className="chain-arrow" aria-hidden="true">
      <i className="ph ph-arrow-right" />
    </div>
  )
}
