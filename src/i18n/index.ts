import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

import { DEFAULT_LOCALE, LOCALES } from './config'

import enCommon from './locales/en/common.json'
import enHome from './locales/en/home.json'
import enLegal from './locales/en/legal.json'
import deCommon from './locales/de/common.json'
import deHome from './locales/de/home.json'
import deLegal from './locales/de/legal.json'

/**
 * Both locales are bundled rather than fetched. The site is one page and the
 * build already prefers a single chunk over waterfalled requests (see the
 * comment on `assetsInlineLimit` in vite.config.ts); a locale that arrives
 * after first paint would show English text and then swap it.
 */
export const resources = {
  en: { common: enCommon, home: enHome, legal: enLegal },
  de: { common: deCommon, home: deHome, legal: deLegal },
} as const

/**
 * No language detector and no caching plugin.
 *
 * The URL is the whole of the language state: `/` is English, `/de` is German,
 * and LocaleLayout sets the language from the route. Nothing is written to
 * cookies, localStorage or sessionStorage, because the privacy page tells
 * visitors this site uses none of them — i18next-browser-languagedetector
 * caches to localStorage by default, which is why it is not wired in here.
 * First-visit detection reads navigator.language and redirects; see
 * src/components/LocaleLayout.tsx.
 */
void i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LOCALE,
  fallbackLng: DEFAULT_LOCALE,
  supportedLngs: LOCALES,
  ns: ['common', 'home', 'legal'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
  returnNull: false,
})

export default i18n
