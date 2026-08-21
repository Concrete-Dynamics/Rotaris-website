import LegalPage, { type LegalSection } from '../components/LegalPage'

const SECTIONS: LegalSection[] = [
  {
    title: 'Controller',
    german: 'Verantwortlicher',
    hint: 'Name and contact details of the controller under Art. 4(7) GDPR, plus the data protection officer (Datenschutzbeauftragter) if one has been appointed.',
  },
  {
    title: 'What this website processes',
    german: 'Verarbeitete Daten',
    hint: 'Server log data from the hosting provider — IP address, timestamp, request, referrer, user agent — and its retention period. See the technical note above for what this build does and does not do.',
  },
  {
    title: 'Legal bases',
    german: 'Rechtsgrundlagen',
    hint: 'The basis for each processing operation under Art. 6(1) GDPR, typically legitimate interest (lit. f) for operating and securing the site.',
  },
  {
    title: 'Hosting and data processing agreement',
    german: 'Hosting und Auftragsverarbeitung',
    hint: 'The hosting provider, where the servers are located, and confirmation of a processing agreement under Art. 28 GDPR.',
  },
  {
    title: 'Cookies and local storage',
    german: 'Cookies und lokale Speicherung',
    hint: 'Which cookies are set, their purpose and lifetime, and how consent is obtained where they are not strictly necessary.',
  },
  {
    title: 'Analytics',
    german: 'Webanalyse',
    hint: 'If analytics are introduced later: the tool, what it records, the legal basis, and how to object. The requirements limit this to download and navigation events, never repository names, file paths, prompts or session content.',
  },
  {
    title: 'Downloads and GitHub',
    german: 'Downloads und GitHub',
    hint: 'Download buttons link to GitHub Releases, so following one transmits the visitor’s IP address to GitHub, Inc. Name the recipient and the transfer basis.',
  },
  {
    title: 'Transfers to third countries',
    german: 'Drittlandübermittlung',
    hint: 'Any transfer outside the EU/EEA and the safeguard relied on under Art. 44 ff. GDPR.',
  },
  {
    title: 'Retention',
    german: 'Speicherdauer',
    hint: 'How long each category of data is kept, or the criteria used to determine that period.',
  },
  {
    title: 'Your rights',
    german: 'Betroffenenrechte',
    hint: 'Access, rectification, erasure, restriction, portability and objection under Art. 15–21 GDPR, and how to exercise them.',
  },
  {
    title: 'Right to lodge a complaint',
    german: 'Beschwerderecht',
    hint: 'The right to complain to a supervisory authority under Art. 77 GDPR, with the competent authority named.',
  },
  {
    title: 'Contact enquiries',
    german: 'Kontaktaufnahme',
    hint: 'What happens to data sent by email or through any form added later, and how long it is retained.',
  },
]

export default function Privacy() {
  return (
    <LegalPage
      title="Privacy policy"
      german="Datenschutzerklärung"
      basis="Art. 13, 14 DSGVO / GDPR"
      sections={SECTIONS}
      intro={
        <>
          <p>
            The information duties in Art. 13 and 14 GDPR have to be met in clear, plain
            language, before or at the point the data is collected.
          </p>
          <div className="card card-accented legal-facts">
            <span className="card-kicker">What this build actually does</span>
            <p className="card-body">
              Useful input for the finished text — accurate for the site as it stands today,
              and worth re-checking whenever it changes:
            </p>
            <ul className="legal-facts-list">
              <li>
                It is a static site. There is no application server, no database, no account
                system and no form that submits anything.
              </li>
              <li>
                It sets <strong>no cookies</strong> and writes nothing to local or session
                storage.
              </li>
              <li>
                It loads <strong>no third-party resources</strong> at runtime. Fonts and icons
                are served from the same origin, so no request reaches a CDN or Google Fonts.
              </li>
              <li>
                There is <strong>no analytics or tracking</strong> of any kind in this build.
              </li>
              <li>
                Platform detection reads the browser&apos;s user-agent string locally to pick
                which download button to recommend. Nothing is transmitted or stored.
              </li>
              <li>
                What remains is whatever the web server and any reverse proxy log — typically
                IP address, timestamp and request line. That is the hosting side to describe.
              </li>
            </ul>
          </div>
        </>
      }
    />
  )
}
