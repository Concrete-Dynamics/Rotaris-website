/**
 * The published legal documents, in both site languages.
 *
 * The German files are copies of the documents cleared for publication in the
 * Concrete Dynamics legal package. That package is the canonical source and
 * lives outside this repository; these are downstream copies, with the sections
 * it marks as internal removed. To update a document, replace the file — do not
 * edit the text here, or the two will drift.
 *
 * The English files are translations of the published German text, so that a
 * visitor reading the site in English is not dropped into German halfway
 * through. They are a convenience translation and nothing more: German is the
 * contract language for a DACH B2C offering, so the German wording is the one
 * that binds, and every English page says so above the document. Replacing a
 * German file therefore means retranslating its English counterpart in the same
 * change — two wordings that have drifted apart are exactly the risk a
 * translation carries.
 */

import type { Locale } from '../i18n/config'

import acceptableUseDe from './de/acceptable-use-policy.md?raw'
import agbDe from './de/agb.md?raw'
import datenschutzDe from './de/datenschutzerklaerung.md?raw'
import eulaDe from './de/eula.md?raw'

import acceptableUseEn from './en/acceptable-use-policy.md?raw'
import termsEn from './en/terms.md?raw'
import privacyEn from './en/privacy-policy.md?raw'
import eulaEn from './en/eula.md?raw'

/** The documents, keyed the way the routes and the legal namespace key them. */
export type DocumentKey = 'privacy' | 'terms' | 'eula' | 'acceptableUse'

export const LEGAL_DOCUMENTS: Record<Locale, Record<DocumentKey, string>> = {
  de: {
    privacy: datenschutzDe,
    terms: agbDe,
    eula: eulaDe,
    acceptableUse: acceptableUseDe,
  },
  en: {
    privacy: privacyEn,
    terms: termsEn,
    eula: eulaEn,
    acceptableUse: acceptableUseEn,
  },
}

/**
 * Cross-document links inside the Markdown, mapped onto site routes.
 *
 * Both file names of a document lead to the same route, because the translation
 * links to its own language's file name and the route carries the locale.
 */
export const DOCUMENT_LINKS: Record<string, string> = {
  'agb.md': '/terms',
  'terms.md': '/terms',
  'eula.md': '/eula',
  'acceptable-use-policy.md': '/acceptable-use',
  'datenschutzerklaerung.md': '/privacy',
  'privacy-policy.md': '/privacy',
}
