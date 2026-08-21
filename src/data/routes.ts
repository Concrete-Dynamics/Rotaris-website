/** Canonical paths for the legal pages. */
export const LEGAL_ROUTES = {
  imprint: '/imprint',
  privacy: '/privacy',
  terms: '/terms',
  eula: '/eula',
  withdrawal: '/withdrawal',
  acceptableUse: '/acceptable-use',
} as const

/** The last path segment of a canonical route, for use as a child route path. */
export function segmentOf(path: string): string {
  return path.replace(/^\//, '')
}

/**
 * The same routes as relative segments. React Router mounts this set once per
 * locale — at `/` and at `/de` — so the paths below a locale must be relative.
 */
export const LEGAL_SEGMENTS = {
  imprint: segmentOf(LEGAL_ROUTES.imprint),
  privacy: segmentOf(LEGAL_ROUTES.privacy),
  terms: segmentOf(LEGAL_ROUTES.terms),
  eula: segmentOf(LEGAL_ROUTES.eula),
  withdrawal: segmentOf(LEGAL_ROUTES.withdrawal),
  acceptableUse: segmentOf(LEGAL_ROUTES.acceptableUse),
} as const

/**
 * German slugs, kept working because the documents themselves are German and
 * that is what visitors will type. Also what other sites tend to link to.
 */
export const LEGAL_ALIASES: Record<string, string> = {
  '/impressum': LEGAL_ROUTES.imprint,
  '/datenschutz': LEGAL_ROUTES.privacy,
  '/datenschutzerklaerung': LEGAL_ROUTES.privacy,
  '/agb': LEGAL_ROUTES.terms,
  '/endnutzerbedingungen': LEGAL_ROUTES.eula,
  '/widerruf': LEGAL_ROUTES.withdrawal,
  '/widerrufsbelehrung': LEGAL_ROUTES.withdrawal,
  '/nutzungsrichtlinie': LEGAL_ROUTES.acceptableUse,
}

/**
 * Homepage section anchors, absolute so they work from the legal pages too.
 *
 * Every entry must match an `id` on a section in src/components/. Nothing on
 * the page may be reachable only by scrolling: if a section is worth an id, it
 * belongs in a menu.
 */
export const HOME_ANCHORS = {
  download: '/#download',
  product: '/#product',
  howItWorks: '/#how-it-works',
  views: '/#views',
  orchestration: '/#orchestration',
  verification: '/#verification',
  control: '/#control',
  models: '/#models',
  security: '/#security',
  git: '/#git',
  openSource: '/#open-source',
  faq: '/#faq',
  /** The footer itself, which is where the documentation links live. */
  docs: '/#docs',
} as const
