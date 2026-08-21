import { useTranslation } from 'react-i18next'
import LegalDocument from '../components/LegalDocument'
import { LEGAL_DOCUMENTS } from '../legal'

export default function Eula() {
  const { t } = useTranslation('legal')

  return (
    <LegalDocument
      documentKey="eula"
      source={LEGAL_DOCUMENTS.eula}
      intro={<p>{t('intros.eula')}</p>}
    />
  )
}
