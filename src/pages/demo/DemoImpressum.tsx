import { useSeo } from '@/shared/seo/useSeo'
import { DemoTerminalShell, TermFooter, TermNav, terminal } from './DemoTerminalShared'

type Row = { label: string; value: string | string[] }

const CONTACT: Row[] = [
  { label: 'Firma', value: 'Novacode GmbH' },
  { label: 'Anschrift', value: ['Oranienburger Straße 66', '10117 Berlin', 'Deutschland'] },
  { label: 'Telefon', value: '+49 30 901 23 456' },
  { label: 'E-Mail', value: 'kontakt@novacode.de' },
  { label: 'Web', value: 'novacode.de' },
]

const LEGAL: Row[] = [
  { label: 'Vertretungsberechtigt', value: ['Jonas Reuter (CEO)', 'Miriam Senftleben (CTO)'] },
  { label: 'Registergericht', value: 'Amtsgericht Berlin-Charlottenburg' },
  { label: 'Registernummer', value: 'HRB 247 891 B' },
  { label: 'Umsatzsteuer-ID', value: 'DE 349 821 456' },
  { label: 'Inhaltlich verantwortlich nach § 18 Abs. 2 MStV', value: 'Jonas Reuter, Adresse wie oben' },
]

const SECTION_TITLE: React.CSSProperties = {
  fontFamily: terminal.mono,
  fontSize: 11,
  color: terminal.accent,
  letterSpacing: 1.5,
  textTransform: 'uppercase',
  marginBottom: 18,
}

function Table({ rows }: { rows: Row[] }) {
  return (
    <div
      style={{
        padding: '24px 28px',
        background: terminal.panel,
        border: `1px solid ${terminal.border2}`,
        borderRadius: 12,
      }}
    >
      {rows.map((r, i) => (
        <div
          key={r.label}
          style={{
            display: 'grid',
            gridTemplateColumns: '260px 1fr',
            gap: 24,
            padding: '14px 0',
            borderTop: i === 0 ? 'none' : `1px solid ${terminal.border}`,
          }}
        >
          <div style={{ fontFamily: terminal.mono, fontSize: 13, color: terminal.dim }}>{r.label}</div>
          <div style={{ fontSize: 15, color: terminal.text, lineHeight: 1.6 }}>
            {Array.isArray(r.value)
              ? r.value.map((line, idx) => <div key={idx}>{line}</div>)
              : r.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export function DemoImpressum() {
  useSeo({
    title: 'Impressum · Novacode Demo · Flowstack',
    description: 'Impressum der fiktiven Novacode GmbH für die Recruiting-Demo.',
    path: '/demo-impressum',
    noindex: true,
  })

  return (
    <DemoTerminalShell>
      <TermNav />

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 72px 96px' }}>
        <div style={{ fontFamily: terminal.mono, fontSize: 12, color: terminal.accent, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 18 }}>
          /legal/impressum
        </div>
        <h1 style={{ fontFamily: terminal.sans, fontSize: 64, lineHeight: 1, margin: 0, letterSpacing: -1.5, fontWeight: 500 }}>
          Impressum.
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: terminal.dim, marginTop: 20, maxWidth: 640 }}>
          Pflichtangaben nach § 5 Digitale-Dienste-Gesetz (DDG) und § 18 Medienstaatsvertrag (MStV). Alle
          Angaben dieser Demo-Seite sind fiktiv und dienen ausschließlich der Veranschaulichung.
        </p>

        <div style={{ marginTop: 48 }}>
          <div style={SECTION_TITLE}>Anbieter</div>
          <Table rows={CONTACT} />
        </div>

        <div style={{ marginTop: 40 }}>
          <div style={SECTION_TITLE}>Gesellschaft</div>
          <Table rows={LEGAL} />
        </div>

        <div style={{ marginTop: 40 }}>
          <div style={SECTION_TITLE}>EU-Streitschlichtung</div>
          <div
            style={{
              padding: '24px 28px',
              background: terminal.panel,
              border: `1px solid ${terminal.border2}`,
              borderRadius: 12,
              fontSize: 15,
              lineHeight: 1.7,
              color: terminal.text,
            }}
          >
            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung bereit:{' '}
            <span style={{ fontFamily: terminal.mono, fontSize: 14, color: terminal.accent }}>
              https://ec.europa.eu/consumers/odr
            </span>
            . Unsere E-Mail-Adresse findest du oben. Wir sind nicht bereit und nicht verpflichtet, an
            Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
          </div>
        </div>

        <div style={{ marginTop: 40 }}>
          <div style={SECTION_TITLE}>Haftung für Inhalte</div>
          <div
            style={{
              padding: '24px 28px',
              background: terminal.panel,
              border: `1px solid ${terminal.border2}`,
              borderRadius: 12,
              fontSize: 15,
              lineHeight: 1.7,
              color: terminal.text,
            }}
          >
            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den
            allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir jedoch nicht verpflichtet,
            übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu
            forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder
            Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
          </div>
        </div>

        <div style={{ marginTop: 40, fontFamily: terminal.mono, fontSize: 12, color: terminal.dim, textAlign: 'center' }}>
          Stand: April 2026
        </div>
      </div>

      <TermFooter />
    </DemoTerminalShell>
  )
}
