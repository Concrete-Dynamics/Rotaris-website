import { useTranslation } from 'react-i18next'
import LegalDocument from '../components/LegalDocument'

export default function Eula() {
  const { t } = useTranslation('legal')

  return (
    <LegalDocument
      documentKey="eula"
      intro={<p>{t('intros.eula')}</p>}
    />
  )
}
