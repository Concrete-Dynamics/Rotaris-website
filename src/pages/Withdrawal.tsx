import LegalDocument from '../components/LegalDocument'
import { LEGAL_DOCUMENTS } from '../legal'

export default function Withdrawal() {
  return (
    <LegalDocument
      title="Right of withdrawal"
      source={LEGAL_DOCUMENTS.withdrawal}
      intro={
        <p>
          Die Widerrufsbelehrung betrifft kostenpflichtige Verträge über{' '}
          <strong>Rotaris Cloud</strong>. Der Download und die Nutzung der
          Rotaris-Anwendung sind kostenlos und begründen keinen solchen Vertrag.
        </p>
      }
    />
  )
}
