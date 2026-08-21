import { useEffect, useMemo, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { DOCUMENT_LINKS } from '../legal'

/**
 * A heading whose own text says it is not for publication ends the public part
 * of the document; everything from there on is cut.
 *
 * Such sections are already removed from the files in src/legal/ when they are
 * imported. This is the second line of defence, so that dropping in an updated
 * document cannot publish an internal annex by accident.
 */
const NOT_PUBLIC = /^#{1,6}\s.*(nicht veröffentlichen|nicht Bestandteil)/i

/** Unresolved editorial markers the package leaves for the company to settle. */
const OPEN_ITEM = /\[(PRÜFEN|PLATZHALTER)(:|\s—|\s-)([^\]]*)\]/g

/** Sentinel that survives Markdown parsing as an inline code node. */
const OPEN_ITEM_PREFIX = '⚠︎ OFFEN — '

function publicPortion(markdown: string): { body: string; openItems: number } {
  const lines = markdown.split('\n')
  const cut = lines.findIndex((line) => NOT_PUBLIC.test(line))
  const kept = cut === -1 ? lines : lines.slice(0, cut)

  // Drop a trailing `---` left dangling by the cut.
  while (kept.length && (kept[kept.length - 1].trim() === '' || kept[kept.length - 1].trim() === '---')) {
    kept.pop()
  }

  let openItems = 0
  const body = kept.join('\n').replace(OPEN_ITEM, (_match, kind: string, _sep, rest: string) => {
    openItems += 1
    return `\`${OPEN_ITEM_PREFIX}${kind}:${rest.replace(/`/g, "'")}\``
  })

  return { body, openItems }
}

interface Props {
  /** English title for the page chrome; the document keeps its own German one. */
  title: string
  source: string
  /** Rendered above the document, in the site's language. */
  intro?: ReactNode
}

export default function LegalDocument({ title, source, intro }: Props) {
  const { body, openItems } = useMemo(() => publicPortion(source), [source])

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

        <div className="legal-draft" role="note">
          <i className="ph-fill ph-warning-circle" aria-hidden="true" />
          <div>
            <strong>Publication draft.</strong> This is the text prepared for launch, in
            German — the contract language for the offering it covers. It has not yet had
            the legal review the source package asks for
            {openItems > 0 && (
              <>
                , and it still contains{' '}
                <strong>
                  {openItems} open item{openItems === 1 ? '' : 's'}
                </strong>{' '}
                marked <span className="legal-open-inline">OFFEN</span> that have to be
                resolved before it goes live
              </>
            )}
            .
          </div>
        </div>

        {intro && <div className="legal-intro">{intro}</div>}

        <article className="legal-doc" lang="de">
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Rewrite the package's relative cross-references onto site routes.
              a({ href, children, ...rest }) {
                const target = href ? DOCUMENT_LINKS[href.replace(/^.*\//, '')] : undefined
                if (target) {
                  return <Link to={target}>{children}</Link>
                }
                if (href?.endsWith('.md')) {
                  // Points at an internal document that is not published.
                  return <span>{children}</span>
                }
                return (
                  <a href={href} {...rest}>
                    {children}
                  </a>
                )
              },
              code({ children, ...rest }) {
                const text = String(children)
                if (text.startsWith(OPEN_ITEM_PREFIX)) {
                  return <span className="legal-open">{text.slice(2).trim()}</span>
                }
                return <code {...rest}>{children}</code>
              },
              table({ children }) {
                return (
                  <div className="table-scroll">
                    <table>{children}</table>
                  </div>
                )
              },
            }}
          >
            {body}
          </Markdown>
        </article>
      </div>
    </main>
  )
}
