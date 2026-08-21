/** Canonical paths for the legal pages, plus the German slugs people type. */
export const LEGAL_ROUTES = {
  imprint: '/imprint',
  privacy: '/privacy',
  terms: '/terms',
} as const

/** German aliases, kept working because that is what German visitors guess. */
export const LEGAL_ALIASES: Record<string, string> = {
  '/impressum': LEGAL_ROUTES.imprint,
  '/datenschutz': LEGAL_ROUTES.privacy,
  '/datenschutzerklaerung': LEGAL_ROUTES.privacy,
  '/agb': LEGAL_ROUTES.terms,
}

/** Homepage section anchors, absolute so they work from the legal pages too. */
export const HOME_ANCHORS = {
  download: '/#download',
  product: '/#product',
  howItWorks: '/#how-it-works',
  security: '/#security',
  docs: '/#docs',
} as const
