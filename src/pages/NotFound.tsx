import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.svg'
import { HOME_ANCHORS } from '../data/routes'

export default function NotFound() {
  useEffect(() => {
    document.title = 'Page not found — Rotaris'
    return () => {
      document.title = 'Rotaris — Download the agentic coding control plane'
    }
  }, [])

  return (
    <main className="notfound rt-dot-grid-soft">
      <div className="wrap">
        <img src={logo} alt="" aria-hidden="true" width={44} height={50} />
        <p className="mono notfound-code">404</p>
        <h1>This page does not exist.</h1>
        <p className="notfound-sub">
          The link may be out of date. Everything about Rotaris lives on one page.
        </p>
        <div className="final-actions">
          <Link className="btn btn-primary" to={HOME_ANCHORS.download}>
            <i className="ph ph-download-simple" aria-hidden="true" />
            Download Rotaris
          </Link>
          <Link className="btn btn-secondary" to="/">
            <i className="ph ph-house" aria-hidden="true" />
            Back to the homepage
          </Link>
        </div>
      </div>
    </main>
  )
}
