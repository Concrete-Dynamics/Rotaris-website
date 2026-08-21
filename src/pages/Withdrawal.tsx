import { Trans, useTranslation } from 'react-i18next'
import LegalDocument from '../components/LegalDocument'
import { LEGAL_DOCUMENTS } from '../legal'

export default function Withdrawal() {
  const { t } = useTranslation('legal')

  return (
    <LegalDocument
      documentKey="withdrawal"
      source={LEGAL_DOCUMENTS.withdrawal}
      intro={
        <p>
          <Trans t={t} i18nKey="intros.withdrawal" components={[<strong />]} />
        </p>
      }
    />
  )
}
