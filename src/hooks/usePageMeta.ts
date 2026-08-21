import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { LOCALES, localizePath, splitLocale } from '../i18n/config'

/** Set once at build time; see `SITE_URL` in vite.config.ts. */
const SITE_URL: string = import.meta.env.VITE_SITE_URL || window.location.origin

function head(selector: string, create: () => HTMLElement): HTMLElement {
  const existing = document.head.querySelector<HTMLElement>(selector)
  if (existing) return existing
  const created = create()
  document.head.appendChild(created)
  return created
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
 * Title, description, canonical and hreflang for the current route.
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

    const meta = head('meta[name="description"]', () => {
      const element = document.createElement('meta')
      element.name = 'description'
      return element
    }) as HTMLMetaElement
    meta.content = description

    const { rest } = splitLocale(pathname)
    link('canonical').href = `${SITE_URL}${pathname}`
    for (const locale of LOCALES) {
      link('alternate', locale).href = `${SITE_URL}${localizePath(rest, locale)}`
    }
    link('alternate', 'x-default').href = `${SITE_URL}${rest}`
  }, [t, i18n.language, title, description, pathname])
}
