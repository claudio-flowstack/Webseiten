import { Link } from 'react-router-dom'
import { useSeo } from '@/shared/seo/useSeo'

export function NotFound404() {
  useSeo({
    title: '404 · Seite nicht gefunden · Flowstack System',
    description: 'Die angeforderte Seite existiert nicht oder wurde verschoben.',
    path: '/404',
    noindex: true,
  })

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0a0a0e',
        color: '#e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        fontFamily: '"Geist", "Inter Tight", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
      }}
    >
      <div style={{ maxWidth: 520, textAlign: 'center' }}>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.04em',
            background: 'linear-gradient(90deg, #22d3ee, #06b6d4)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            marginBottom: 16,
          }}
        >
          404
        </div>
        <h1 style={{ fontSize: 24, fontWeight: 600, marginBottom: 12, color: '#ffffff' }}>
          Seite nicht gefunden
        </h1>
        <p style={{ color: '#9ca3af', marginBottom: 28, lineHeight: 1.6 }}>
          Die Seite, die du suchst, existiert nicht oder wurde verschoben. Kehr zur Startseite zurück
          oder kontaktier uns, falls du einen Fehler vermutest.
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link
            to="/"
            style={{
              background: 'linear-gradient(90deg, #22d3ee, #06b6d4)',
              color: '#0a0a0e',
              padding: '12px 24px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Zur Startseite
          </Link>
          <Link
            to="/impressum"
            style={{
              background: 'rgba(17,24,39,0.8)',
              border: '1px solid rgba(55,65,81,0.5)',
              color: '#e5e7eb',
              padding: '12px 24px',
              borderRadius: 10,
              fontWeight: 600,
              fontSize: 14,
              textDecoration: 'none',
            }}
          >
            Kontakt
          </Link>
        </div>
      </div>
    </div>
  )
}
