import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { DEFAULT_LOCALE, LOCALES, localizePath, type Locale } from '../i18n/config'
import SiteNav from './SiteNav'
import SiteFooter from './SiteFooter'

/**
 * Detection runs once per page load, not once per visit.
 *
 * A visitor whose browser asks for German is sent to /de the first time they
 * land on an unprefixed URL. Choosing English then navigates back to `/`
 * client-side, and this flag stops the redirect firing again and trapping them
 * there. The alternative — remembering the choice — would need storage, and the
 * privacy page states this site uses none; /en is the durable English URL for
 * anyone who wants one.
 */
let detectionUsed = false

/**
 * Spend the detection without running it.
 *
 * The /en alias redirects to `/`, where this layout would otherwise detect a
 * German browser and forward to /de — the opposite of what asking for /en
 * means.
 */
export function suppressDetection(): void {
  detectionUsed = true
}

function detectLocale(): Locale {
  if (detectionUsed) return DEFAULT_LOCALE
  detectionUsed = true

  const preferences = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const preference of preferences) {
    const tag = preference?.toLowerCase().split('-')[0]
    const match = LOCALES.find((locale) => locale === tag)
    if (match) return match
  }
  return DEFAULT_LOCALE
}

interface Props {
  locale: Locale
  /** Send a first-time visitor to their browser's language. Only `/` does. */
  detect?: boolean
}

/**
 * The shell every route renders inside: it fixes the locale for its subtree,
 * keeps `<html lang>` truthful, and carries the nav and footer — which is what
 * lets those two localize their links without prop drilling.
 */
export default function LocaleLayout({ locale, detect = false }: Props) {
  const { i18n } = useTranslation()
  const { pathname, search, hash } = useLocation()

  // Before paint, so no frame renders the previous language's text.
  if (i18n.language !== locale) {
    void i18n.changeLanguage(locale)
  }

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  if (detect) {
    const detected = detectLocale()
    if (detected !== locale) {
      return <Navigate to={`${localizePath(pathname, detected)}${search}${hash}`} replace />
    }
  }

  return (
    <>
      <SiteNav />
      <Outlet />
      <SiteFooter />
    </>
  )
}
