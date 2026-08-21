import LegalDocument from '../components/LegalDocument'
import { LEGAL_DOCUMENTS } from '../legal'

export default function Eula() {
  return (
    <LegalDocument
      title="End-user terms"
      source={LEGAL_DOCUMENTS.eula}
      intro={
        <p>
          Diese Bedingungen gelten für die kostenlose Rotaris-Anwendung — Desktop,
          Kommandozeile und Terminaloberfläche.
        </p>
      }
    />
  )
}
