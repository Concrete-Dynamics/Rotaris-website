import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LegalDocument from '../components/LegalDocument'
import { LEGAL_ROUTES } from '../data/routes'
import { useLocalePath } from '../hooks/useLocalePath'

export default function AcceptableUse() {
  const { t } = useTranslation('legal')
  const localePath = useLocalePath()

  return (
    <LegalDocument
      documentKey="acceptableUse"
      intro={
        <p>
          <Trans
            t={t}
            i18nKey="intros.acceptableUse"
            components={[
              <Link to={localePath(LEGAL_ROUTES.terms)} />,
              <Link to={localePath(LEGAL_ROUTES.eula)} />,
            ]}
          />
        </p>
      }
    />
  )
}
