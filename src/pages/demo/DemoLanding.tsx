import { Link } from 'react-router-dom'
import { useSeo } from '@/shared/seo/useSeo'
import {
  DemoTerminalShell,
  TPlaceholder,
  TermFooter,
  TermNav,
  terminal,
} from './DemoTerminalShared'

type Role = {
  t: string
  loc: string
  stack: string
  comp: string
  urgent?: boolean
}

const ROLES: Role[] = [
  { t: 'Senior Backend Engineer · Ledger', loc: 'Berlin / Remote EU', stack: 'Rust · Postgres', comp: '€110–145k + 0.10–0.35%', urgent: true },
  { t: 'Senior Backend Engineer · Reconciler', loc: 'Berlin / Remote EU', stack: 'Go · Kafka', comp: '€105–140k + 0.10–0.30%' },
  { t: 'Senior Platform Engineer', loc: 'Berlin', stack: 'K8s · Terraform', comp: '€110–140k + 0.10–0.30%' },
  { t: 'Senior Data Engineer', loc: 'Remote EU', stack: 'Flink · Iceberg', comp: '€100–135k + 0.10–0.25%' },
  { t: 'Staff Engineer · Infrastruktur', loc: 'Berlin', stack: 'Polyglot', comp: '€145–180k + 0.25–0.50%', urgent: true },
  { t: 'Senior SRE', loc: 'Berlin / Remote EU', stack: 'Go · Prometheus', comp: '€105–140k + 0.10–0.30%' },
  { t: 'Senior Security Engineer', loc: 'Berlin', stack: 'Rust · Zero Trust', comp: '€115–150k + 0.15–0.35%' },
]

const METRICS: Array<[string, string]> = [
  ['12M', 'TX / Tag'],
  ['37ms', 'p99'],
  ['99.998%', 'Uptime'],
  ['48', 'Engineers'],
]

const BENEFITS = [
  { t: 'Bewerbung in zwei Minuten', d: 'Vier Fragen, ein Link zu deinem Code. Keine Lebensläufe, keine Anschreiben, keine Motivationsschreiben-Theater.' },
  { t: 'Antwort in 48 Stunden', d: 'Schriftlich, persönlich, begründet. Geschrieben von einem Engineer aus dem Team. Egal, ob Zu- oder Absage.' },
  { t: 'Gehalt €105–180k', d: 'Alle Bänder stehen offen im Stellenangebot. Gleiche Rolle, gleiches Gehalt. Du musst nicht verhandeln, was dir sowieso zusteht.' },
  { t: '0,1–0,5 % Equity', d: 'Vier Jahre Vesting, ein Jahr Cliff, zehn Jahre Ausübungsfenster. Alles schwarz auf weiß im Arbeitsvertrag.' },
  { t: 'Berlin oder voll remote', d: 'Du entscheidest, wo du arbeitest. Voll remote aus der EU, hybrid, oder jeden Tag im Büro. €8.000 Umzugspauschale für den Wechsel nach Berlin.' },
  { t: '€3.000 Lernbudget pro Jahr', d: 'Konferenzen, Bücher, Kurse, Hardware. Du entscheidest, was du brauchst. Kein Antrag, keine Rechtfertigung gegenüber HR.' },
]

const PROCESS = [
  { n: '01', t: 'Bewerbung', d: 'Vier Fragen online beantworten. Dauert zwei Minuten.', dur: 'jetzt' },
  { n: '02', t: 'Kennenlernen', d: '30-Minuten-Videocall mit einem Engineer aus dem Team. Kein HR-Gespräch.', dur: '2 Tage' },
  { n: '03', t: 'Fachaufgabe', d: 'Drei bis vier Stunden an einer echten Problemstellung. Du bekommst €300 dafür.', dur: '4 Tage' },
  { n: '04', t: 'Code-Gespräch', d: '90 Minuten gemeinsam durch deinen eigenen Code. Keine Whiteboard-Algorithmen.', dur: '3 Tage' },
  { n: '05', t: 'Vertragsangebot', d: 'Mittagessen mit dem Team. Danach hast du 48 Stunden Bedenkzeit.', dur: 'fertig' },
]

const VOICES = [
  {
    q: 'Ich habe die Bewerbung morgens in der U-Bahn ausgefüllt. Zwei Tage später saß ich im Intro-Call mit dem Team-Lead. Keine zwölf Gesprächsrunden, kein Assessment-Center, keine Tage voller Wartezeit.',
    n: 'Karim A.',
    r: 'Senior Backend · Ledger',
    y: '2024',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=640&q=80&auto=format&fit=crop',
  },
  {
    q: 'Ich war davor bei zwei großen Tech-Firmen. Novacode ist der erste Arbeitgeber, bei dem Engineering tatsächlich die Entscheidungen trifft. Nicht Sales, nicht Marketing, nicht irgendein Steering-Komitee.',
    n: 'Annika R.',
    r: 'Staff · Platform',
    y: '2023',
    img: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=640&q=80&auto=format&fit=crop',
  },
  {
    q: 'On-Call-Dienste laufen hier einmal pro Quartal nachts an. Nicht jede zweite Nacht wegen kaputter Tests oder unsauberer Deployments. Allein dieser Unterschied hat mich überzeugt.',
    n: 'Tobias W.',
    r: 'Senior · Reconciler',
    y: '2023',
    img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=640&q=80&auto=format&fit=crop',
  },
]

const IMAGES = {
  hero: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1100&q=80&auto=format&fit=crop',
  whiteboard: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&q=80&auto=format&fit=crop',
  engineer: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=900&q=80&auto=format&fit=crop',
} as const

export function DemoLanding() {
  useSeo({
    title: 'Novacode · Recruiting Demo · Flowstack',
    description: 'Dark-Terminal Recruiting-Funnel Demo. Variation A.',
    path: '/demo',
    noindex: true,
  })

  return (
    <DemoTerminalShell>
      <TermNav />
      <Hero />
      <ImageStrip />
      <Roles />
      <Benefits />
      <Process />
      <Voices />
      <FinalCta />
      <TermFooter />
    </DemoTerminalShell>
  )
}

function Hero() {
  return (
    <div style={{ padding: '88px 72px 72px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 64, alignItems: 'center' }}>
      <div>
        <div
          style={{
            fontFamily: terminal.mono,
            fontSize: 12,
            color: terminal.accent,
            letterSpacing: 1.5,
            textTransform: 'uppercase',
            marginBottom: 24,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            border: `1px solid ${terminal.border2}`,
            padding: '8px 14px',
            borderRadius: 999,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: terminal.accent, boxShadow: `0 0 8px ${terminal.accent}` }} />
          Novacode Engineering · 7 offene Senior-Positionen
        </div>
        <h1 style={{ fontFamily: terminal.sans, fontSize: 80, lineHeight: 0.96, margin: 0, letterSpacing: -2.2, fontWeight: 500 }}>
          Senior Engineer werden.<br />
          <span style={{ fontFamily: terminal.serif, fontStyle: 'italic', fontWeight: 400, color: terminal.accent }}>In zwei Minuten bewerben.</span>
        </h1>
        <p style={{ fontSize: 20, lineHeight: 1.5, marginTop: 32, maxWidth: 600, color: terminal.dim }}>
          Vier Fragen beantworten, Link zu deinem Code hochladen, fertig. <strong style={{ color: terminal.text }}>Innerhalb von 48 Stunden schreibt dir ein Engineer persönlich zurück.</strong> €105–180k, 0,1–0,5 % Equity, Berlin oder voll remote aus der EU.
        </p>

        <div style={{ display: 'flex', gap: 14, marginTop: 40, alignItems: 'center' }}>
          <Link
            to="/demo/bewerbung"
            style={{
              background: terminal.accent,
              color: terminal.bg,
              padding: '18px 32px',
              borderRadius: 8,
              fontWeight: 600,
              fontSize: 16,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
            }}
          >
            Jetzt in zwei Minuten bewerben
            <span style={{ fontFamily: terminal.mono }}>→</span>
          </Link>
          <a
            href="#rollen"
            style={{
              color: terminal.text,
              padding: '18px 24px',
              fontSize: 15,
              textDecoration: 'none',
              border: `1px solid ${terminal.border2}`,
              borderRadius: 8,
              cursor: 'pointer',
            }}
          >
            Alle sieben Positionen ansehen
          </a>
        </div>

        <div style={{ display: 'flex', gap: 32, marginTop: 36, fontFamily: terminal.mono, fontSize: 12, color: terminal.dim }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: terminal.accent }}>✓</span> Vier Fragen · zwei Minuten
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: terminal.accent }}>✓</span> Rückmeldung binnen 48&nbsp;Stunden
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ color: terminal.accent }}>✓</span> Fachaufgabe mit €300 vergütet
          </div>
        </div>
      </div>

      <TPlaceholder label="Engineering Floor Berlin" h={520} variant="portrait" src={IMAGES.hero} />
    </div>
  )
}

function ImageStrip() {
  return (
    <div style={{ padding: '0 72px 80px', display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: 16 }}>
      <TPlaceholder label="Whiteboard · Ledger System Design" variant="office" h={300} src={IMAGES.whiteboard} />
      <TPlaceholder label="Engineer · Code Review" variant="portrait" h={300} src={IMAGES.engineer} />
      <div
        style={{
          background: terminal.panel,
          border: `1px solid ${terminal.border2}`,
          borderRadius: 10,
          padding: 24,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0,
        }}
      >
        {METRICS.map(([v, l], i) => (
          <div
            key={l}
            style={{
              padding: 14,
              borderRight: i % 2 === 0 ? `1px solid ${terminal.border}` : 'none',
              borderBottom: i < 2 ? `1px solid ${terminal.border}` : 'none',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 500, letterSpacing: -1 }}>{v}</div>
            <div style={{ fontFamily: terminal.mono, fontSize: 10.5, color: terminal.dim, textTransform: 'uppercase', letterSpacing: 1, marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Roles() {
  return (
    <div id="rollen" style={{ padding: '40px 72px 100px', scrollMarginTop: 40 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 40 }}>
        <div>
          <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.accent, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>
            Offene Rollen
          </div>
          <h2 style={{ fontFamily: terminal.sans, fontSize: 52, lineHeight: 1, margin: 0, letterSpacing: -1.5, fontWeight: 500 }}>
            Sieben Positionen. <span style={{ fontFamily: terminal.serif, fontStyle: 'italic', fontWeight: 400 }}>Gehalt öffentlich.</span>
          </h2>
        </div>
        <div style={{ fontFamily: terminal.mono, fontSize: 13, color: terminal.dim, textAlign: 'right' }}>
          Du siehst Gehalt und Equity, bevor du klickst.<br />
          <span style={{ color: terminal.text }}>Gleiche Rolle, gleiches Gehalt. Für alle.</span>
        </div>
      </div>

      <div style={{ borderTop: `1px solid ${terminal.border}` }}>
        {ROLES.map(r => (
          <div
            key={r.t}
            style={{
              display: 'grid',
              gridTemplateColumns: '2.4fr 1fr 1fr 1.2fr auto',
              gap: 24,
              padding: '26px 8px',
              alignItems: 'center',
              borderBottom: `1px solid ${terminal.border}`,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 20, fontWeight: 500 }}>{r.t}</span>
              {r.urgent && (
                <span
                  style={{
                    fontFamily: terminal.mono,
                    fontSize: 10,
                    color: terminal.accent,
                    background: 'rgba(232,183,92,0.12)',
                    padding: '3px 8px',
                    borderRadius: 4,
                    textTransform: 'uppercase',
                    letterSpacing: 1,
                  }}
                >
                  Dringend
                </span>
              )}
            </div>
            <div style={{ fontFamily: terminal.mono, fontSize: 13, color: terminal.dim }}>{r.loc}</div>
            <div style={{ fontFamily: terminal.mono, fontSize: 13, color: terminal.dim }}>{r.stack}</div>
            <div style={{ fontFamily: terminal.mono, fontSize: 13, color: terminal.text }}>{r.comp}</div>
            <Link
              to="/demo/bewerbung"
              style={{
                fontFamily: terminal.sans,
                fontSize: 13,
                fontWeight: 600,
                color: terminal.bg,
                background: terminal.accent,
                padding: '10px 18px',
                borderRadius: 6,
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              Bewerben <span>→</span>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

function Benefits() {
  return (
    <div style={{ padding: '80px 72px', borderTop: `1px solid ${terminal.border}`, borderBottom: `1px solid ${terminal.border}` }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64 }}>
        <div>
          <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.accent, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>
            Was du bekommst
          </div>
          <h2 style={{ fontFamily: terminal.sans, fontSize: 44, margin: '0 0 24px', letterSpacing: -1.2, lineHeight: 1, fontWeight: 500 }}>
            Was im Arbeitsvertrag <span style={{ fontFamily: terminal.serif, fontStyle: 'italic', fontWeight: 400 }}>tatsächlich</span> drinsteht.
          </h2>
          <p style={{ fontSize: 15, color: terminal.dim, lineHeight: 1.6, maxWidth: 340 }}>
            Kein Obstkorb, kein Tischkicker, keine „flachen Hierarchien". Sechs Dinge, die wir garantieren und die schwarz auf weiß im Vertrag stehen. Du kannst uns daran messen.
          </p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: terminal.border }}>
          {BENEFITS.map(x => (
            <div key={x.t} style={{ background: terminal.bg, padding: '24px 28px' }}>
              <div style={{ fontSize: 20, fontWeight: 500, letterSpacing: -0.3, marginBottom: 10, color: terminal.accent }}>{x.t}</div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: terminal.dim }}>{x.d}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Process() {
  return (
    <div style={{ padding: '100px 72px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'end', marginBottom: 48 }}>
        <div>
          <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.accent, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>
            Prozess
          </div>
          <h2 style={{ fontFamily: terminal.sans, fontSize: 52, lineHeight: 1, margin: 0, letterSpacing: -1.5, fontWeight: 500 }}>
            Von Bewerbung zu Vertrag in <span style={{ fontFamily: terminal.serif, fontStyle: 'italic', fontWeight: 400 }}>zehn Tagen</span>.
          </h2>
        </div>
        <div style={{ fontFamily: terminal.mono, fontSize: 13, color: terminal.dim, textAlign: 'right' }}>
          Fünf Schritte. Jeder mit schriftlichem Feedback.<br />
          <span style={{ color: terminal.text }}>Keine Wochen der Ungewissheit.</span>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12 }}>
        {PROCESS.map(s => (
          <div key={s.n} style={{ background: terminal.panel, border: `1px solid ${terminal.border}`, borderRadius: 10, padding: '22px 22px 26px' }}>
            <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.accent, marginBottom: 20 }}>{s.n}</div>
            <div style={{ fontSize: 22, fontWeight: 500, marginBottom: 10 }}>{s.t}</div>
            <div style={{ fontFamily: terminal.mono, fontSize: 12, color: terminal.dim, lineHeight: 1.55, marginBottom: 18 }}>{s.d}</div>
            <div
              style={{
                fontFamily: terminal.mono,
                fontSize: 11,
                color: terminal.text,
                background: 'rgba(232,183,92,0.1)',
                padding: '4px 10px',
                borderRadius: 4,
                display: 'inline-block',
              }}
            >
              → {s.dur}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function Voices() {
  return (
    <div style={{ padding: '100px 72px', borderTop: `1px solid ${terminal.border}` }}>
      <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.accent, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>
        Stimmen
      </div>
      <h2 style={{ fontFamily: terminal.sans, fontSize: 52, margin: '0 0 56px', letterSpacing: -1.5, lineHeight: 1, fontWeight: 500 }}>
        Drei Engineers, die geblieben sind. <span style={{ fontFamily: terminal.serif, fontStyle: 'italic', fontWeight: 400 }}>Und warum.</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
        {VOICES.map(v => (
          <div key={v.n} style={{ background: terminal.panel, border: `1px solid ${terminal.border}`, borderRadius: 10, padding: 24, display: 'flex', flexDirection: 'column' }}>
            <TPlaceholder label={`Portrait · ${v.n}`} aspect="4/3" variant="portrait" src={v.img} />
            <div style={{ fontFamily: terminal.serif, fontSize: 19, lineHeight: 1.4, letterSpacing: -0.2, marginTop: 20, fontWeight: 400 }}>
              „{v.q}"
            </div>
            <div style={{ marginTop: 20, paddingTop: 16, borderTop: `1px solid ${terminal.border}`, display: 'flex', alignItems: 'center', gap: 12 }}>
              <div>
                <div style={{ fontFamily: terminal.mono, fontSize: 13, fontWeight: 500 }}>{v.n}</div>
                <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.dim, marginTop: 2 }}>{v.r} · seit {v.y}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function FinalCta() {
  return (
    <div style={{ padding: '140px 72px', borderTop: `1px solid ${terminal.border}`, textAlign: 'center' }}>
      <div style={{ fontFamily: terminal.mono, fontSize: 12, color: terminal.accent, letterSpacing: 2, textTransform: 'uppercase', marginBottom: 28 }}>
        $ apply --time=2min --cv=none
      </div>
      <h2 style={{ fontFamily: terminal.sans, fontSize: 88, lineHeight: 1, letterSpacing: -3, margin: 0, fontWeight: 500 }}>
        Die letzte Bewerbung,<br />
        <span style={{ fontFamily: terminal.serif, fontStyle: 'italic', fontWeight: 400 }}>die du schreiben</span> wirst.
      </h2>
      <p style={{ fontSize: 18, color: terminal.dim, maxWidth: 560, margin: '28px auto 0', lineHeight: 1.55 }}>
        Zwei Minuten Aufwand. Keine Lebensläufe, keine Anschreiben, keine sechs Interview-Runden. Stattdessen: ein echtes Gespräch mit dem Team, in dem du bauen wirst. Und eine Antwort, auf die du dich verlassen kannst, innerhalb von 48 Stunden.
      </p>
      <div style={{ display: 'flex', gap: 14, marginTop: 44, justifyContent: 'center' }}>
        <Link
          to="/demo/bewerbung"
          style={{
            background: terminal.accent,
            color: terminal.bg,
            padding: '18px 36px',
            borderRadius: 8,
            fontWeight: 600,
            fontSize: 16,
            textDecoration: 'none',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          Bewerbung starten <span style={{ fontFamily: terminal.mono }}>→</span>
        </Link>
        <a
          href="#rollen"
          style={{
            color: terminal.text,
            padding: '18px 26px',
            fontSize: 15,
            textDecoration: 'none',
            border: `1px solid ${terminal.border2}`,
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          Alle sieben Positionen ansehen
        </a>
      </div>
    </div>
  )
}

