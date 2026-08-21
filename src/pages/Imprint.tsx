import LegalPage, { type LegalSection } from '../components/LegalPage'

const SECTIONS: LegalSection[] = [
  {
    title: 'Provider',
    german: 'Diensteanbieter',
    hint: 'Full legal name and registered address of the operating company — Concrete Dynamics UG (haftungsbeschränkt) — including street, postcode, city and country. A PO box is not sufficient.',
  },
  {
    title: 'Represented by',
    german: 'Vertreten durch',
    hint: 'The managing director or directors (Geschäftsführer) authorised to represent the company.',
  },
  {
    title: 'Contact',
    german: 'Kontakt',
    hint: 'An email address and a second channel allowing direct and efficient contact — a telephone number or an equivalent electronic enquiry form.',
  },
  {
    title: 'Register entry',
    german: 'Registereintrag',
    hint: 'Registering court (Registergericht) and commercial register number (HRB …).',
  },
  {
    title: 'VAT identification number',
    german: 'Umsatzsteuer-Identifikationsnummer',
    hint: 'The VAT ID under § 27a UStG, if one has been issued.',
  },
  {
    title: 'Responsible for editorial content',
    german: 'Verantwortlich nach § 18 Abs. 2 MStV',
    hint: 'Name and address of the person responsible for the journalistic-editorial content, where the site carries any.',
  },
  {
    title: 'Online dispute resolution',
    german: 'EU-Streitschlichtung / Verbraucherschlichtung',
    hint: 'A statement on whether the company is willing or obliged to participate in dispute resolution proceedings before a consumer arbitration board (Verbraucherschlichtungsstelle).',
  },
  {
    title: 'Liability for content and links',
    german: 'Haftung für Inhalte und Links',
    hint: 'The customary disclaimer regarding own content and linked third-party content, including the GitHub repository and release downloads this site points to.',
  },
]

export default function Imprint() {
  return (
    <LegalPage
      title="Imprint"
      german="Impressum"
      basis="§ 5 DDG · § 18 Abs. 2 MStV"
      sections={SECTIONS}
      intro={
        <p>
          German law requires an easily recognisable, directly reachable and permanently
          available imprint. It is linked from the footer of every page on this site.
        </p>
      }
    />
  )
}
