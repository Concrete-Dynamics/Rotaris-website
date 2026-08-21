import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollToHash from './components/ScrollToHash'
import LocaleLayout from './components/LocaleLayout'
import Home from './pages/Home'
import Imprint from './pages/Imprint'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import Eula from './pages/Eula'
import Withdrawal from './pages/Withdrawal'
import AcceptableUse from './pages/AcceptableUse'
import NotFound from './pages/NotFound'
import { LEGAL_ALIASES, LEGAL_SEGMENTS, segmentOf } from './data/routes'
import { DEFAULT_LOCALE, LOCALE_PREFIX, LOCALES, localizePath, type Locale } from './i18n/config'
import { useRelease } from './hooks/useRelease'

type Release = ReturnType<typeof useRelease>

/**
 * The routes below a locale layout, identical in every locale.
 *
 * Paths are relative segments rather than the absolute values in LEGAL_ROUTES,
 * which is what lets the same tree mount at both `/` and `/de`.
 */
function localeRoutes(release: Release, locale: Locale) {
  return (
    <>
      <Route index element={<Home release={release} />} />
      <Route path={LEGAL_SEGMENTS.imprint} element={<Imprint />} />
      <Route path={LEGAL_SEGMENTS.privacy} element={<Privacy />} />
      <Route path={LEGAL_SEGMENTS.terms} element={<Terms />} />
      <Route path={LEGAL_SEGMENTS.eula} element={<Eula />} />
      <Route path={LEGAL_SEGMENTS.withdrawal} element={<Withdrawal />} />
      <Route path={LEGAL_SEGMENTS.acceptableUse} element={<AcceptableUse />} />

      {/* German slugs redirect to the canonical path, staying in this locale. */}
      {Object.entries(LEGAL_ALIASES).map(([alias, target]) => (
        <Route
          key={alias}
          path={segmentOf(alias)}
          element={<Navigate to={localizePath(target, locale)} replace />}
        />
      ))}

      <Route path="*" element={<NotFound />} />
    </>
  )
}

export default function App() {
  const release = useRelease()

  return (
    <>
      <ScrollToHash />
      <Routes>
        {LOCALES.map((locale) => (
          <Route
            key={locale}
            path={LOCALE_PREFIX[locale] || '/'}
            element={<LocaleLayout locale={locale} detect={locale === DEFAULT_LOCALE} />}
          >
            {localeRoutes(release, locale)}
          </Route>
        ))}

        {/*
          The explicit English URL. `/` sends a first-time visitor to their
          browser's language, so this is how someone with a German browser
          reaches English durably without the site storing a preference.
        */}
        <Route path="/en/*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}
