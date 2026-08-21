import { Trans, useTranslation } from 'react-i18next'
import LegalDocument from '../components/LegalDocument'

export default function Withdrawal() {
  const { t } = useTranslation('legal')

  return (
    <LegalDocument
      documentKey="withdrawal"
      intro={
        <p>
          <Trans t={t} i18nKey="intros.withdrawal" components={[<strong />]} />
        </p>
      }
    />
  )
}
