import { Navigate, Route, Routes } from 'react-router-dom'
import ScrollToHash from './components/ScrollToHash'
import SiteNav from './components/SiteNav'
import SiteFooter from './components/SiteFooter'
import Home from './pages/Home'
import Imprint from './pages/Imprint'
import Privacy from './pages/Privacy'
import Terms from './pages/Terms'
import NotFound from './pages/NotFound'
import { LEGAL_ALIASES, LEGAL_ROUTES } from './data/routes'
import { useRelease } from './hooks/useRelease'

export default function App() {
  const release = useRelease()

  return (
    <>
      <ScrollToHash />
      <SiteNav />
      <Routes>
        <Route path="/" element={<Home release={release} />} />
        <Route path={LEGAL_ROUTES.imprint} element={<Imprint />} />
        <Route path={LEGAL_ROUTES.privacy} element={<Privacy />} />
        <Route path={LEGAL_ROUTES.terms} element={<Terms />} />

        {/* German slugs redirect to the canonical English paths. */}
        {Object.entries(LEGAL_ALIASES).map(([alias, target]) => (
          <Route key={alias} path={alias} element={<Navigate to={target} replace />} />
        ))}

        <Route path="*" element={<NotFound />} />
      </Routes>
      <SiteFooter />
    </>
  )
}
