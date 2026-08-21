import { useEffect } from 'react'
import { Link } from 'react-router-dom'

/**
 * Angaben gemäß § 5 DDG.
 *
 * Built from data rather than copied from a document, so the details stay in
 * one place. A few choices here are deliberate and should survive edits:
 *
 *   - § 5 Abs. 1 Nr. 6 DDG asks for the USt-IdNr., and only where one exists.
 *     A tax number is not a substitute and does not belong here.
 *   - The current provisions are § 5 DDG and § 18 Abs. 2 MStV.
 *   - "(haftungsbeschränkt)" must read exactly as registered (§ 5a Abs. 1
 *     GmbHG).
 *   - No data protection officer is named. None is required here, and naming a
 *     managing director would be a conflict under Art. 38(6) GDPR.
 *   - No link to the EU ODR platform, which closed on 20 July 2025. The § 36
 *     VSBG statement stands in its place.
 */

const COMPANY = {
  name: 'Concrete Dynamics UG (haftungsbeschränkt)',
  street: 'Bahnhofstr. 15',
  city: '87435 Kempten (Allgäu)',
  country: 'Deutschland',
  directors: 'David Fischer und Philipp Geirhos',
  court: 'Amtsgericht Kempten (Allgäu)',
  register: 'HRB 18115',
  email: 'info@concrete-dynamics.com',
  security: 'security@concrete-dynamics.com',
  phone: '+49 157 34796582',
}

export default function Imprint() {
  useEffect(() => {
    document.title = 'Impressum — Rotaris'
    return () => {
      document.title = 'Rotaris — Download the agentic coding control plane'
    }
  }, [])

  return (
    <main className="legal">
      <div className="wrap">
        <Link to="/" className="legal-back">
          <i className="ph ph-arrow-left" aria-hidden="true" />
          Back to Rotaris
        </Link>

        <h1 className="legal-title">Impressum</h1>
        <p className="legal-german mono">Angaben gemäß § 5 DDG · § 18 Abs. 2 MStV</p>

        <article className="legal-doc" lang="de">
          <h2>Anbieter</h2>
          <p>
            {COMPANY.name}
            <br />
            {COMPANY.street}
            <br />
            {COMPANY.city}
            <br />
            {COMPANY.country}
          </p>

          <h2>Vertreten durch</h2>
          <p>Die Geschäftsführer {COMPANY.directors}</p>

          <h2>Kontakt</h2>
          <p>
            E-Mail: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
            <br />
            Telefon: <a href={`tel:${COMPANY.phone.replace(/\s/g, '')}`}>{COMPANY.phone}</a>
          </p>

          <h2>Registereintrag</h2>
          <p>
            Registergericht: {COMPANY.court}
            <br />
            Registernummer: {COMPANY.register}
          </p>

          <h2>Umsatzsteuer-Identifikationsnummer</h2>
          <p>
            <span className="legal-open">
              OFFEN — USt-IdNr. nach § 27a UStG eintragen, sobald sie vorliegt. Bis dahin
              bleibt diese Angabe leer; die Steuernummer gehört nicht ins Impressum.
            </span>
          </p>

          <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
          <p>
            {COMPANY.directors}
            <br />
            Anschrift wie oben
          </p>

          <h2>Datenschutz</h2>
          <p>
            Einen Datenschutzbeauftragten haben wir nicht bestellt; die gesetzlichen
            Voraussetzungen des Art. 37 DSGVO und des § 38 BDSG liegen bei uns nicht vor.
            Anfragen zum Datenschutz richtest du an{' '}
            <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. Einzelheiten stehen
            in der <Link to="/privacy">Datenschutzerklärung</Link>.
          </p>

          <h2>Verbraucherstreitbeilegung</h2>
          <p>
            Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor
            einer Verbraucherschlichtungsstelle teilzunehmen (§ 36 VSBG).
          </p>

          <h2>Sicherheitslücken</h2>
          <p>
            Meldungen zu Sicherheitslücken nimmt{' '}
            <a href={`mailto:${COMPANY.security}`}>{COMPANY.security}</a> entgegen. Das
            Verfahren steht in der <code>SECURITY.md</code> im Quellcode-Repository.
          </p>

          <h2>Haftung für Inhalte und Links</h2>
          <p>
            Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Für die Inhalte externer Links sind
            ausschließlich deren Betreiber verantwortlich. Zum Zeitpunkt der Verlinkung
            waren keine Rechtsverstöße erkennbar; bei Bekanntwerden entfernen wir
            entsprechende Links umgehend.
          </p>
        </article>

        <div className="legal-related">
          <span className="card-kicker">Weitere Rechtsdokumente</span>
          <div className="legal-related-links">
            <Link to="/privacy">Datenschutzerklärung</Link>
            <Link to="/terms">AGB — Rotaris Cloud</Link>
            <Link to="/eula">Endnutzerbedingungen</Link>
            <Link to="/withdrawal">Widerrufsbelehrung</Link>
            <Link to="/acceptable-use">Zulässige Nutzung</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
