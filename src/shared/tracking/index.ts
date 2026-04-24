/**
 * Tracking primitives for Flowstack SPA.
 * Umami runs cookielessly on every page (legitimate interest).
 * GTM is loaded by index.html but respects Consent Mode v2 (configured in dataLayer).
 * Meta Pixel script + init are deferred until marketing consent is granted (see CookieBanner).
 */

const isBrowser = typeof window !== 'undefined'
const isLocalhost =
  isBrowser &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.endsWith('.local'))

export type TrackingEventPayload = Record<string, unknown>

function hasMarketingConsent(): boolean {
  if (!isBrowser) return false
  try {
    const raw = localStorage.getItem('cookieConsent')
    if (!raw) return false
    const parsed = JSON.parse(raw) as { settings?: { marketing?: boolean } } | null
    return parsed?.settings?.marketing === true
  } catch {
    return false
  }
}

function gtmPush(payload: TrackingEventPayload): void {
  if (!isBrowser) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

function metaPixelTrack(event: string, payload?: TrackingEventPayload): void {
  if (!isBrowser || typeof window.fbq !== 'function') return
  if (!hasMarketingConsent()) return
  if (payload) window.fbq('track', event, payload)
  else window.fbq('track', event)
}

function umamiTrack(event: string, payload?: TrackingEventPayload): void {
  if (!isBrowser || !window.umami) return
  if (payload && Object.keys(payload).length > 0) {
    window.umami.track(event, payload)
  } else {
    window.umami.track(event)
  }
}

export function trackPageView(path: string, title: string): void {
  if (isLocalhost) {
    console.warn('[tracking:dev] page_view', { path, title })
    return
  }
  gtmPush({
    event: 'page_view',
    page_path: path,
    page_title: title,
    page_location: window.location.href,
  })
  metaPixelTrack('PageView')
}

export function trackEvent(
  eventName: string,
  payload?: TrackingEventPayload,
): void {
  if (isLocalhost) {
    console.warn('[tracking:dev] event', eventName, payload)
    return
  }
  gtmPush({ event: eventName, ...(payload ?? {}) })
  umamiTrack(eventName, payload)
}

export function trackLeadSubmit(payload?: TrackingEventPayload): void {
  if (isLocalhost) {
    console.warn('[tracking:dev] Lead', payload)
    return
  }
  gtmPush({ event: 'application_submit', ...(payload ?? {}) })
  metaPixelTrack('Lead', payload)
  umamiTrack('application_submit', payload)
}
