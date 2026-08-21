import { Link } from 'react-router-dom'
import LegalDocument from '../components/LegalDocument'
import { LEGAL_DOCUMENTS } from '../legal'

export default function AcceptableUse() {
  return (
    <LegalDocument
      title="Acceptable use policy"
      source={LEGAL_DOCUMENTS.acceptableUse}
      intro={
        <p>
          Diese Richtlinie ist Bestandteil der <Link to="/terms">AGB</Link> und der{' '}
          <Link to="/eula">Endnutzerbedingungen</Link>.
        </p>
      }
    />
  )
}
