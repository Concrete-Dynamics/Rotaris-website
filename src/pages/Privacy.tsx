import { useTranslation } from 'react-i18next'
import LegalDocument from '../components/LegalDocument'

const FACTS = ['storage', 'analytics', 'thirdParty', 'forms', 'detection', 'logs']

export default function Privacy() {
  const { t } = useTranslation('legal')
  const authoritative = t('privacy.authoritative')

  return (
    <LegalDocument
      documentKey="privacy"
      intro={
        /* The package's privacy statement covers the product and the cloud
           service and explicitly excludes this website, so the website's own
           processing is stated here. The German wording is the authoritative
           one; the English page carries a translation and says so. */
        <div className="card card-accented legal-facts">
          <span className="card-kicker">{t('privacy.kicker')}</span>
          <p className="card-body">{t('privacy.lead')}</p>
          <ul className="legal-facts-list">
            {FACTS.map((fact) => (
              <li key={fact}>{t(`privacy.facts.${fact}`)}</li>
            ))}
          </ul>
          <p className="card-body legal-facts-note">{t('privacy.note')}</p>
          {authoritative && <p className="card-body legal-facts-note">{authoritative}</p>}
        </div>
      }
    />
  )
}
