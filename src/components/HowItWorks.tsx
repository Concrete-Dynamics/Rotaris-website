import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'

const PIPELINE = [
  { key: 'define', colour: 'var(--rt-text)' },
  { key: 'plan', colour: 'var(--rt-text)' },
  { key: 'delegate', colour: 'var(--rt-text)' },
  { key: 'execute', colour: 'var(--rt-run)' },
  { key: 'inspect', colour: 'var(--rt-wait)' },
  { key: 'verify', colour: 'var(--rt-accent-300)' },
]

const STEPS = ['define', 'plan', 'delegate', 'run', 'control', 'verify']

export default function HowItWorks() {
  const { t } = useTranslation('home')

  return (
    <section id="how-it-works" className="section">
      <div className="wrap">
        <h6>{t('howItWorks.kicker')}</h6>
        <h2 style={{ marginBottom: 14 }}>{t('howItWorks.title')}</h2>

        <div className="mono pipeline">
          {PIPELINE.map((stage, i) => (
            <Fragment key={stage.key}>
              <span style={{ color: stage.colour }}>{t(`howItWorks.pipeline.${stage.key}`)}</span>
              {i < PIPELINE.length - 1 && <span className="sep">→</span>}
            </Fragment>
          ))}
        </div>

        <div className="grid-cards cols-lg">
          {STEPS.map((step, i) => (
            <div className="card step-card" key={step}>
              <span className="mono step-index">{String(i + 1).padStart(2, '0')}</span>
              <span className="card-title">{t(`howItWorks.steps.${step}.title`)}</span>
              <p className="card-body">{t(`howItWorks.steps.${step}.body`)}</p>
              <div className="card-meta">
                <i className="ph ph-user" aria-hidden="true" />
                {t('howItWorks.youControl')} {t(`howItWorks.steps.${step}.control`)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
