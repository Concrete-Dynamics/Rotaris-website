import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { LOCALES, OG_LOCALES, localizePath, splitLocale } from '../i18n/config'

/** Set once at build time; see `SITE_URL` in vite.config.ts. */
const SITE_URL: string = import.meta.env.VITE_SITE_URL || window.location.origin

function head(selector: string, create: () => HTMLElement): HTMLElement {
  const existing = document.head.querySelector<HTMLElement>(selector)
  if (existing) return existing
  const created = create()
  document.head.appendChild(created)
  return created
}

function meta(attribute: 'name' | 'property', value: string): HTMLMetaElement {
  return head(`meta[${attribute}="${value}"]`, () => {
    const element = document.createElement('meta')
    element.setAttribute(attribute, value)
    return element
  }) as HTMLMetaElement
}

function link(rel: string, hreflang?: string): HTMLLinkElement {
  const selector = hreflang
    ? `link[rel="${rel}"][hreflang="${hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`
  return head(selector, () => {
    const element = document.createElement('link')
    element.rel = rel
    if (hreflang) element.hreflang = hreflang
    return element
  }) as HTMLLinkElement
}

interface Meta {
  /** Page title without the " — Rotaris" suffix; omit on the homepage. */
  title?: string
  description: string
}

/**
 * Title, description, canonical, hreflang and Open Graph for the current route.
 *
 * These have to be per-route: index.html can only carry one canonical, and it
 * used to declare the homepage as canonical for every legal page too. The
 * alternates are emitted for every locale so the two language versions are
 * announced as the same page rather than as duplicates.
 */
export function usePageMeta({ title, description }: Meta): void {
  const { t, i18n } = useTranslation('common')
  const { pathname } = useLocation()

  useEffect(() => {
    const suffix = t('meta.titleSuffix')
    document.title = title ? `${title} — ${suffix}` : t('meta.home.title')

    meta('name', 'description').content = description

    const { locale: current, rest } = splitLocale(pathname)
    const canonical = `${SITE_URL}${pathname}`
    link('canonical').href = canonical
    for (const locale of LOCALES) {
      link('alternate', locale).href = `${SITE_URL}${localizePath(rest, locale)}`
    }
    link('alternate', 'x-default').href = `${SITE_URL}${rest}`

    // index.html carries these for "/" only, so a shared /de or /privacy link
    // used to preview as the English homepage. Twitter reads og:* when it finds
    // no twitter:title, so the twitter:card in index.html is all that side needs.
    meta('property', 'og:title').content = document.title
    meta('property', 'og:description').content = description
    meta('property', 'og:url').content = canonical
    meta('property', 'og:locale').content = OG_LOCALES[current]

    // The alternate is the *other* language, so the tag for the current one is
    // removed rather than left behind by the route the visitor came from.
    for (const locale of LOCALES) {
      const selector = `meta[property="og:locale:alternate"][data-locale="${locale}"]`
      if (locale === current) {
        document.head.querySelector(selector)?.remove()
        continue
      }
      const tag = head(selector, () => {
        const element = document.createElement('meta')
        element.setAttribute('property', 'og:locale:alternate')
        element.dataset.locale = locale
        return element
      }) as HTMLMetaElement
      tag.content = OG_LOCALES[locale]
    }
  }, [t, i18n.language, title, description, pathname])
}
