import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { SECURITY_POLICY_URL } from '../data/release'
import { LEGAL_ROUTES } from '../data/routes'
import { useLocalePath } from '../hooks/useLocalePath'
import { usePageMeta } from '../hooks/usePageMeta'

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
 *
 * The body stays German in both locales: it is a statutory notice whose
 * required wording is German, for the same reason the documents in src/legal/
 * are not translated. Only the chrome around it follows the site language.
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

const RELATED = [
  { key: 'privacy', to: LEGAL_ROUTES.privacy },
  { key: 'terms', to: LEGAL_ROUTES.terms },
  { key: 'eula', to: LEGAL_ROUTES.eula },
  { key: 'withdrawal', to: LEGAL_ROUTES.withdrawal },
  { key: 'acceptableUse', to: LEGAL_ROUTES.acceptableUse },
] as const

export default function Imprint() {
  const { t } = useTranslation('legal')
  const { t: tCommon } = useTranslation('common')
  const localePath = useLocalePath()

  usePageMeta({ title: t('titles.imprint'), description: t('descriptions.imprint') })

  return (
    <main className="legal">
      <div className="wrap">
        <Link to={localePath('/')} className="legal-back">
          <i className="ph ph-arrow-left" aria-hidden="true" />
          {t('back')}
        </Link>

        <h1 className="legal-title">Impressum</h1>
        <p className="legal-german mono">{t('imprint.basis')}</p>

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
            in der <Link to={localePath(LEGAL_ROUTES.privacy)}>Datenschutzerklärung</Link>.
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
            Verfahren steht in der{' '}
            <a href={SECURITY_POLICY_URL}>
              <code>SECURITY.md</code>
            </a>{' '}
            im Quellcode-Repository.
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
          <span className="card-kicker">{t('imprint.related')}</span>
          <div className="legal-related-links">
            {RELATED.map((item) => (
              <Link key={item.key} to={localePath(item.to)}>
                {tCommon(`footer.legal.${item.key}`)}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
