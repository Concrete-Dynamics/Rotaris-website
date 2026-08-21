import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation } from 'react-router-dom'

import { DEFAULT_LOCALE, isLocale, localizePath, splitLocale, type Locale } from '../i18n/config'

/** The locale the current URL is addressed in. */
export function useLocale(): Locale {
  const { i18n } = useTranslation()
  return isLocale(i18n.language) ? i18n.language : DEFAULT_LOCALE
}

/**
 * Turns a canonical path — the values in HOME_ANCHORS and LEGAL_ROUTES — into
 * one for the current locale. Every `to=` in the site goes through this, so no
 * component needs to know that German lives under a prefix.
 */
export function useLocalePath(): (path: string) => string {
  const locale = useLocale()
  return useCallback((path: string) => localizePath(path, locale), [locale])
}

/** The current page addressed in `locale` — the language switcher's target. */
export function useSwitchLocalePath(): (locale: Locale) => string {
  const { pathname, search, hash } = useLocation()
  return useCallback(
    (locale: Locale) => `${localizePath(splitLocale(pathname).rest, locale)}${search}${hash}`,
    [pathname, search, hash],
  )
}
