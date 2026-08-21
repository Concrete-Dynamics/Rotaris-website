import { useTranslation } from 'react-i18next'

const PILLARS = [
  { key: 'orchestration', icon: 'ph ph-tree-structure' },
  { key: 'control', icon: 'ph ph-hand-palm' },
  { key: 'verification', icon: 'ph ph-seal-check' },
  { key: 'traceability', icon: 'ph ph-path' },
]

export default function ProductDefinition() {
  const { t } = useTranslation('home')

  return (
    <section id="product" className="section">
      <div className="wrap">
        <div className="definition-copy">
          <h6>{t('product.kicker')}</h6>
          <h2 style={{ marginBottom: 18, textWrap: 'pretty' }}>{t('product.title')}</h2>
          <p>{t('product.lede')}</p>
          <p style={{ marginBottom: 0 }}>{t('product.closing')}</p>
        </div>

        <div className="grid-cards cols-md" style={{ marginTop: 44 }}>
          {PILLARS.map((pillar) => (
            <div className="card card-accented" key={pillar.key}>
              <div className="icon-title">
                <i className={pillar.icon} aria-hidden="true" />
                <span className="card-title">{t(`product.pillars.${pillar.key}.title`)}</span>
              </div>
              <p className="card-body">{t(`product.pillars.${pillar.key}.body`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
