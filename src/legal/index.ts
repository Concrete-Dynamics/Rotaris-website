/**
 * The published legal documents.
 *
 * The Markdown files in this directory are **verbatim copies** of
 * the documents cleared for publication in the Concrete Dynamics legal package. That package is the canonical source and lives
 * outside this repository; these are downstream copies. To update a document,
 * replace the file — do not edit the text here, or the two will drift.
 *
 * They stay in German on purpose. The contract language for a DACH B2C offering
 * is German, and translating a withdrawal notice or a privacy statement would
 * create a second wording that could be read against the first.
 */

import acceptableUse from './acceptable-use-policy.md?raw'
import agb from './agb.md?raw'
import datenschutz from './datenschutzerklaerung.md?raw'
import eula from './eula.md?raw'
import widerruf from './widerrufsbelehrung.md?raw'

export const LEGAL_DOCUMENTS = {
  privacy: datenschutz,
  terms: agb,
  eula,
  withdrawal: widerruf,
  acceptableUse,
} as const

/** Cross-document links inside the Markdown, mapped onto site routes. */
export const DOCUMENT_LINKS: Record<string, string> = {
  'agb.md': '/terms',
  'eula.md': '/eula',
  'widerrufsbelehrung.md': '/withdrawal',
  'acceptable-use-policy.md': '/acceptable-use',
  'datenschutzerklaerung.md': '/privacy',
}
