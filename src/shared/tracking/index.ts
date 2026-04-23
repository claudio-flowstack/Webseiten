/**
 * Tracking primitives for Flowstack SPA.
 * Global Umami + GTM + Meta Pixel are bootstrapped in index.html.
 * These helpers push to dataLayer / fbq / umami at runtime from React.
 */

const isBrowser = typeof window !== 'undefined'
const isLocalhost =
  isBrowser &&
  (window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname.endsWith('.local'))

export type TrackingEventPayload = Record<string, unknown>

function gtmPush(payload: TrackingEventPayload): void {
  if (!isBrowser) return
  window.dataLayer = window.dataLayer || []
  window.dataLayer.push(payload)
}

function metaPixelTrack(event: string, payload?: TrackingEventPayload): void {
  if (!isBrowser || typeof window.fbq !== 'function') return
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
    console.info('[tracking:dev] page_view', { path, title })
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
    console.info('[tracking:dev] event', eventName, payload)
    return
  }
  gtmPush({ event: eventName, ...(payload ?? {}) })
  umamiTrack(eventName, payload)
}

export function trackLeadSubmit(payload?: TrackingEventPayload): void {
  if (isLocalhost) {
    console.info('[tracking:dev] Lead', payload)
    return
  }
  gtmPush({ event: 'application_submit', ...(payload ?? {}) })
  metaPixelTrack('Lead', payload)
  umamiTrack('application_submit', payload)
}
