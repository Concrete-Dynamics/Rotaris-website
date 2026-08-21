import LegalPage, { type LegalSection } from '../components/LegalPage'

const SECTIONS: LegalSection[] = [
  {
    title: 'Scope',
    german: 'Geltungsbereich',
    hint: 'Which offerings these terms cover, and the relationship to the MIT licence the application itself is distributed under.',
  },
  {
    title: 'Subject matter',
    german: 'Vertragsgegenstand',
    hint: 'What is being provided — the website, the download of the desktop application, and any paid or hosted service added later.',
  },
  {
    title: 'Formation of contract',
    german: 'Vertragsschluss',
    hint: 'How and when a contract comes about. Note that downloading the MIT-licensed application currently requires no account and no contract.',
  },
  {
    title: 'Prices and payment',
    german: 'Preise und Zahlung',
    hint: 'Only relevant once something is sold. Today the application is free and open source.',
  },
  {
    title: 'Right of withdrawal',
    german: 'Widerrufsrecht',
    hint: 'The consumer withdrawal notice, mandatory as soon as anything is sold to consumers, including the model withdrawal form.',
  },
  {
    title: 'Rights of use',
    german: 'Nutzungsrechte',
    hint: 'The licence granted. The application is MIT-licensed; state how that interacts with these terms and with third-party components.',
  },
  {
    title: 'Obligations of the user',
    german: 'Pflichten des Nutzers',
    hint: 'Acceptable use, and the user’s responsibility for the model providers and credentials they configure in the application.',
  },
  {
    title: 'Warranty',
    german: 'Gewährleistung',
    hint: 'Warranty terms, and how they relate to the MIT licence’s “as is” disclaimer.',
  },
  {
    title: 'Liability',
    german: 'Haftung',
    hint: 'The limitation of liability, drafted to survive German law on unfair terms — intent and gross negligence, and injury to life, body or health, cannot be excluded.',
  },
  {
    title: 'Third-party services',
    german: 'Leistungen Dritter',
    hint: 'Model providers, registries and GitHub are operated by third parties under their own terms; no responsibility is assumed for their availability or pricing.',
  },
  {
    title: 'Changes to these terms',
    german: 'Änderungen der AGB',
    hint: 'How changes are announced and when they take effect.',
  },
  {
    title: 'Final provisions',
    german: 'Schlussbestimmungen',
    hint: 'Governing law, place of jurisdiction and a severability clause.',
  },
]

export default function Terms() {
  return (
    <LegalPage
      title="Terms and conditions"
      german="Allgemeine Geschäftsbedingungen (AGB)"
      basis="§§ 305 ff. BGB"
      sections={SECTIONS}
      intro={
        <p>
          Rotaris is currently distributed free of charge under the MIT licence, with no
          account and no contract required to download it. These terms therefore mostly
          matter ahead of any paid or hosted offering — but the structure is here already.
        </p>
      }
    />
  )
}
