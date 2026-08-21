import { useTranslation } from 'react-i18next'

const QUESTIONS = [
  'what',
  'python',
  'code',
  'providers',
  'concurrency',
  'finished',
  'cancel',
  'cli',
  'rename',
  'security',
]

export default function Faq() {
  const { t } = useTranslation('home')

  return (
    <section id="faq" className="section faq">
      <div className="wrap">
        <h6>{t('faq.kicker')}</h6>
        <h2 style={{ marginBottom: 32 }}>{t('faq.title')}</h2>
        <div className="faq-list">
          {QUESTIONS.map((item) => (
            <details className="faq-item" key={item}>
              <summary>
                {t(`faq.items.${item}.q`)}
                <i className="ph ph-plus" aria-hidden="true" />
              </summary>
              <p>{t(`faq.items.${item}.a`)}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}
