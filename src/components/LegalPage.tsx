import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'

export interface LegalSection {
  /** Heading, in the site's language. */
  title: string
  /** The German legal term, where the two differ meaningfully. */
  german?: string
  /** What belongs in this section, so filling it in is a mechanical job. */
  hint: ReactNode
}

interface Props {
  title: string
  german: string
  /** The statute the page answers to, shown under the title. */
  basis: string
  intro: ReactNode
  sections: LegalSection[]
}

/**
 * Shared shell for the imprint, privacy and terms pages.
 *
 * These ship as scaffolding: the required headings are in place with a note on
 * what each one has to contain, and every page carries a banner saying the
 * text is not final. Nothing here is legal advice or a substitute for it.
 */
export default function LegalPage({ title, german, basis, intro, sections }: Props) {
  useEffect(() => {
    document.title = `${title} — Rotaris`
    return () => {
      document.title = 'Rotaris — Download the agentic coding control plane'
    }
  }, [title])

  return (
    <main className="legal">
      <div className="wrap">
        <Link to="/" className="legal-back">
          <i className="ph ph-arrow-left" aria-hidden="true" />
          Back to Rotaris
        </Link>

        <h1 className="legal-title">{title}</h1>
        <p className="legal-german mono">
          {german} · {basis}
        </p>

        <div className="legal-draft" role="note">
          <i className="ph-fill ph-warning-circle" aria-hidden="true" />
          <div>
            <strong>Draft — not yet legally binding.</strong> This page is a
            placeholder: the headings below are the ones this document has to cover, with a
            note on what belongs in each. Replace them with text reviewed by qualified
            counsel before the site goes public.
          </div>
        </div>

        {intro && <div className="legal-intro">{intro}</div>}

        <ol className="legal-sections">
          {sections.map((section, index) => (
            <li className="legal-section" key={section.title}>
              <h2 className="legal-section-title">
                <span className="mono legal-section-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                {section.title}
                {section.german && <span className="legal-section-german">{section.german}</span>}
              </h2>
              <div className="legal-hint">{section.hint}</div>
              <p className="legal-todo mono">
                <i className="ph ph-note-pencil" aria-hidden="true" /> content to be supplied
              </p>
            </li>
          ))}
        </ol>
      </div>
    </main>
  )
}
