import { useLayoutEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { useSeo } from '@/shared/seo/useSeo'

export function Agb() {
  useSeo({
    title: 'AGB · Flowstack System',
    description: 'Allgemeine Geschäftsbedingungen der Flowstack System GmbH.',
    path: '/agb',
    noindex: true,
  })

  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#111415'
    document.body.style.color = '#f6f6f7'
    document.documentElement.classList.add('dark')
    document.body.style.margin = '0'
    return () => {
      document.body.style.backgroundColor = ''
      document.body.style.color = ''
      document.documentElement.classList.remove('dark')
    }
  }, [])

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        minHeight: '100vh',
        background: '#111415',
        color: '#f6f6f7',
        padding: '48px 20px',
        maxWidth: 820,
        margin: '0 auto',
      }}
    >
      <Link
        to="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 6,
          color: '#99f7ff',
          textDecoration: 'none',
          fontSize: 14,
          marginBottom: 40,
        }}
      >
        <ArrowLeft size={16} /> Zurück zur Startseite
      </Link>

      <h1 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 700, marginBottom: 24 }}>
        Allgemeine Geschäftsbedingungen
      </h1>

      <div
        style={{
          background: 'rgba(255, 200, 0, 0.08)',
          border: '1px solid rgba(255, 200, 0, 0.25)',
          borderRadius: 8,
          padding: '16px 20px',
          marginBottom: 32,
          fontSize: 14,
          lineHeight: 1.6,
        }}
      >
        <strong>Hinweis:</strong> Dieser Text ist ein Platzhalter. Die finalen AGB werden
        vor Go-Live durch die Rechtsabteilung geprüft und ersetzt.
      </div>

      <div style={{ lineHeight: 1.7, fontSize: 15, color: '#c9cbcd' }}>
        <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, color: '#f6f6f7' }}>
          § 1 Geltungsbereich
        </h2>
        <p>
          Diese Allgemeinen Geschäftsbedingungen gelten für alle Verträge zwischen der
          Flowstack System GmbH (nachfolgend „Anbieter") und ihren Kunden über die
          Erbringung von Leistungen im Bereich KI-Automatisierung, Beratung und
          Softwareentwicklung.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, color: '#f6f6f7' }}>
          § 2 Vertragsschluss
        </h2>
        <p>
          Der Vertrag kommt durch Angebot des Anbieters und Annahme des Kunden in
          Textform zustande. Mündliche Nebenabreden bedürfen der schriftlichen
          Bestätigung.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, color: '#f6f6f7' }}>
          § 3 Leistungen und Vergütung
        </h2>
        <p>
          Umfang und Vergütung der Leistungen ergeben sich aus dem jeweiligen
          Einzelvertrag. Rechnungen sind innerhalb von 14 Tagen ab Zugang ohne Abzug zur
          Zahlung fällig.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, color: '#f6f6f7' }}>
          § 4 Mitwirkungspflichten
        </h2>
        <p>
          Der Kunde stellt alle für die Leistungserbringung erforderlichen Informationen,
          Zugänge und Materialien rechtzeitig bereit.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, color: '#f6f6f7' }}>
          § 5 Haftung
        </h2>
        <p>
          Der Anbieter haftet unbeschränkt für Vorsatz und grobe Fahrlässigkeit sowie für
          Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit. Für
          leichte Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher
          Vertragspflichten, begrenzt auf den vertragstypischen, vorhersehbaren Schaden.
        </p>

        <h2 style={{ fontSize: 20, marginTop: 32, marginBottom: 12, color: '#f6f6f7' }}>
          § 6 Schlussbestimmungen
        </h2>
        <p>
          Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts. Gerichtsstand ist
          München, soweit der Kunde Kaufmann ist. Sollten einzelne Bestimmungen unwirksam
          sein, bleibt die Wirksamkeit der übrigen Bestimmungen unberührt.
        </p>

        <p style={{ marginTop: 40, fontSize: 13, color: '#8a8d90' }}>
          Stand: April 2026 · Flowstack System GmbH, München
        </p>
      </div>
    </div>
  )
}
