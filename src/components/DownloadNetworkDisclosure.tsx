import { useTranslation } from 'react-i18next'
import './DownloadNetworkDisclosure.css'

const COPY = {
  en: {
    label: 'Network and privacy information',
    title: 'Automatic network access',
    body:
      'On first launch, Rotaris may download missing tools and warm package caches from services such as GitHub, Astral, Node.js and relevant package registries. Standalone desktop builds also check GitHub for updates on every launch. These requests may expose technical connection data such as your IP address to the respective services. Project files, prompts and provider credentials are not sent as part of these setup or update requests.',
    privacy: 'Privacy Policy',
  },
  de: {
    label: 'Netzwerk- und Datenschutzhinweis',
    title: 'Automatische Netzwerkzugriffe',
    body:
      'Beim ersten Start kann Rotaris fehlende Werkzeuge herunterladen und benötigte Paket-Caches über Dienste wie GitHub, Astral, Node.js und die jeweils erforderlichen Paketregistries aufwärmen. Standalone-Desktop-Versionen prüfen außerdem bei jedem Start über GitHub, ob eine neuere Rotaris-Version verfügbar ist. Dabei können technisch notwendige Verbindungsdaten wie deine IP-Adresse an den jeweiligen Dienst übermittelt werden. Projektdateien, Prompts und Provider-Zugangsdaten werden im Rahmen dieser Setup- und Update-Anfragen nicht übertragen.',
    privacy: 'Datenschutzerklärung',
  },
} as const

export default function DownloadNetworkDisclosure() {
  const { i18n } = useTranslation()
  const isGerman = (i18n.resolvedLanguage ?? i18n.language).toLowerCase().startsWith('de')
  const copy = isGerman ? COPY.de : COPY.en
  const privacyHref = isGerman ? '/de/privacy' : '/privacy'

  return (
    <details className="download-network-disclosure">
      <summary aria-label={copy.label} title={copy.label}>
        <i className="ph ph-info" aria-hidden="true" />
        <span className="download-network-disclosure-label">{copy.label}</span>
      </summary>
      <div className="download-network-disclosure-popover">
        <strong>{copy.title}</strong>
        <p>{copy.body}</p>
        <a href={privacyHref}>{copy.privacy}</a>
      </div>
    </details>
  )
}
