import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * React Router changes the URL without moving the viewport, so the in-page
 * anchors and the legal routes both need this: jump to the targeted section, or
 * to the top when a new page is opened.
 */
export default function ScrollToHash() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }

    // The target renders in the same commit, so it is already in the document.
    document.querySelector(hash)?.scrollIntoView()
  }, [pathname, hash])

  return null
}
