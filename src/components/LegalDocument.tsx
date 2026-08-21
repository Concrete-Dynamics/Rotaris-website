import { useMemo, type ReactNode } from 'react'
import { Trans, useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { DOCUMENT_LINKS, LEGAL_DOCUMENTS, type DocumentKey } from '../legal'
import { useLocale, useLocalePath, useSwitchLocalePath } from '../hooks/useLocalePath'
import { usePageMeta } from '../hooks/usePageMeta'
import { LOCALES } from '../i18n/config'

/**
 * A heading whose own text says it is not for publication ends the public part
 * of the document; everything from there on is cut.
 *
 * Such sections are already removed from the files in src/legal/ when they are
 * imported. This is the second line of defence, so that dropping in an updated
 * document cannot publish an internal annex by accident. Both languages are
 * matched, because a translation inherits the structure of its original.
 */
const NOT_PUBLIC = /^#{1,6}\s.*(nicht veröffentlichen|nicht Bestandteil|not for publication|not part of)/i

/**
 * Unresolved editorial markers the package leaves for the company to settle.
 * The German documents carry the German keywords, the translations the English
 * ones, and both render as the same warning.
 */
const OPEN_ITEM = /\[(PRÜFEN|PLATZHALTER|CHECK|PLACEHOLDER)(:|\s—|\s-)([^\]]*)\]/g

/** Sentinel that survives Markdown parsing as an inline code node. */
const OPEN_ITEM_PREFIX = '⚠︎ '

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
  /** Also the key under `titles`/`descriptions` in the legal namespace. */
  documentKey: DocumentKey
  /** Rendered above the document, in the site's language. */
  intro?: ReactNode
}

export default function LegalDocument({ documentKey, intro }: Props) {
  const { t } = useTranslation('legal')
  const locale = useLocale()
  const localePath = useLocalePath()
  const switchPath = useSwitchLocalePath()
  const other = LOCALES.find((candidate) => candidate !== locale) ?? locale
  const source = LEGAL_DOCUMENTS[locale][documentKey]
  const { body, openItems } = useMemo(() => publicPortion(source), [source])

  usePageMeta({
    title: t(`titles.${documentKey}`),
    description: t(`descriptions.${documentKey}`),
  })

  return (
    <main className="legal">
      <div className="wrap">
        <Link to={localePath('/')} className="legal-back">
          <i className="ph ph-arrow-left" aria-hidden="true" />
          {t('back')}
        </Link>

        <div className="legal-draft" role="note">
          <i className="ph-fill ph-warning-circle" aria-hidden="true" />
          <div>
            <strong>{t('draft.title')}</strong> {t('draft.body')}
            {openItems > 0 && (
              <Trans
                t={t}
                i18nKey="draft.openItems"
                count={openItems}
                components={[<strong />, <span className="legal-open-inline" />]}
              />
            )}
            .
          </div>
        </div>

        {/*
          Which of the two wordings binds — see the comment in src/legal/index.ts.
          It links to the same document in the other language, so a reader who
          wants the authoritative text is one click away from it.
        */}
        <p className="legal-language-note">
          <Trans
            t={t}
            i18nKey="draft.languageNote"
            components={[<Link to={switchPath(other)} hrefLang={other} lang={other} />]}
          />
        </p>

        {intro && <div className="legal-intro">{intro}</div>}

        <article className="legal-doc" lang={locale}>
          <Markdown
            remarkPlugins={[remarkGfm]}
            components={{
              // Rewrite the package's relative cross-references onto site routes.
              a({ href, children, ...rest }) {
                const target = href ? DOCUMENT_LINKS[href.replace(/^.*\//, '')] : undefined
                if (target) {
                  return <Link to={localePath(target)}>{children}</Link>
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
                  return (
                    <span className="legal-open">
                      {t('draft.openLabel')} — {text.slice(OPEN_ITEM_PREFIX.length).trim()}
                    </span>
                  )
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
