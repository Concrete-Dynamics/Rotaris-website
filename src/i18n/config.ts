/**
 * Locale set and the URL shape that carries it.
 *
 * English is the default and lives at the root; German lives under /de. The
 * prefix is the whole of the language state — nothing is written to cookies,
 * localStorage or sessionStorage, because src/pages/Privacy.tsx tells visitors
 * that this site uses none of them. Keep it that way, or change that page too.
 */
export const LOCALES = ['en', 'de'] as const

export type Locale = (typeof LOCALES)[number]

export const DEFAULT_LOCALE: Locale = 'en'

/** The path segment for a locale; the default locale has none. */
export const LOCALE_PREFIX: Record<Locale, string> = {
  en: '',
  de: '/de',
}

/** Open Graph writes a locale as language_TERRITORY, not as a bare language. */
export const OG_LOCALES: Record<Locale, string> = {
  en: 'en_US',
  de: 'de_DE',
}

/** Language names, each written in its own language. */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: 'English',
  de: 'Deutsch',
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}

/** The locale a path is addressed in, and the path with the prefix removed. */
export function splitLocale(pathname: string): { locale: Locale; rest: string } {
  const [, first = '', ...others] = pathname.split('/')
  if (isLocale(first) && first !== DEFAULT_LOCALE) {
    return { locale: first, rest: `/${others.join('/')}` }
  }
  return { locale: DEFAULT_LOCALE, rest: pathname }
}

/**
 * Address `path` in `locale`. `path` is always the canonical, unprefixed form
 * — the values in HOME_ANCHORS and LEGAL_ROUTES — so this is the single place
 * that knows about the prefix.
 */
export function localizePath(path: string, locale: Locale): string {
  const prefix = LOCALE_PREFIX[locale]
  if (!prefix) return path
  // Anchors arrive as '/#download'; the prefix goes before the hash, not after.
  const hash = path.indexOf('#')
  const base = hash === -1 ? path : path.slice(0, hash)
  const fragment = hash === -1 ? '' : path.slice(hash)
  const trimmed = base === '/' ? '' : base.replace(/\/$/, '')
  return `${prefix}${trimmed}${fragment}` || prefix
}
