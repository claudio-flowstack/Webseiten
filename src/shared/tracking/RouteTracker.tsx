import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { trackPageView } from '.'

/**
 * Fires a single page_view on each route-change.
 * Mount-guard via useRef prevents StrictMode double-firing in dev.
 */
export function RouteTracker() {
  const location = useLocation()
  const lastPathRef = useRef<string | null>(null)

  useEffect(() => {
    const path = location.pathname + location.search
    if (lastPathRef.current === path) return
    lastPathRef.current = path

    const title = document.title || 'Flowstack System'
    trackPageView(path, title)
  }, [location.pathname, location.search])

  return null
}
