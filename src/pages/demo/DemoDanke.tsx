import { useSeo } from '@/shared/seo/useSeo'
import { DemoTerminalShell, TPlaceholder, TermFooter, TermNav, terminal } from './DemoTerminalShared'

type TimelineItem = {
  t: string
  d: string
  done?: boolean
}

const TIMELINE: TimelineItem[] = [
  { t: 'Soeben eingegangen', d: 'Deine Bewerbung liegt in unserem Posteingang. Die Bestätigungsmail ist auf dem Weg in dein Postfach.', done: true },
  { t: 'Innerhalb von 48 Stunden', d: 'Ein Engineer aus dem Team Ledger liest deine Antworten persönlich und schreibt dir schriftlich zurück. Keine automatische Antwort, kein Textbaustein, keine Verzögerung.' },
  { t: 'Wenn es passt', d: 'Wir laden dich zu einem 30-minütigen Kennenlerngespräch mit dem Team-Lead ein. Danach folgt eine Fachaufgabe in deinem eigenen Tempo, für die du €300 bekommst.' },
  { t: 'Spätestens nach zehn Tagen', d: 'Du hältst entweder ein Vertragsangebot in der Hand oder eine konkrete Begründung, warum es gerade nicht passt. Beides schriftlich, beides persönlich. Keine Funkstille.' },
]

type SidebarLink = {
  t: string
  d: string
  ext?: boolean
}

const SIDEBAR_LINKS: SidebarLink[] = [
  { t: 'Unser Engineering-Handbuch', d: '48 Seiten darüber, wie wir arbeiten, entscheiden und bauen', ext: true },
  { t: 'Engineering-Blog', d: 'Letzter Beitrag: Flink mit exactly-once Garantien', ext: true },
  { t: 'Open Source auf GitHub', d: 'Einige unserer Libraries sind öffentlich einsehbar', ext: true },
]

const TEAM_IMAGE = 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=900&q=80&auto=format&fit=crop'

export function DemoDanke() {
  useSeo({
    title: 'Danke · Novacode Demo · Flowstack',
    description: 'Dark-Terminal Bestätigungsseite Demo.',
    path: '/demo/danke',
    noindex: true,
  })

  return (
    <DemoTerminalShell>
      <TermNav />

      <div style={{ padding: '96px 72px 80px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 72, alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: '50%',
                background: 'rgba(143,209,164,0.15)',
                color: '#8fd1a4',
                display: 'grid',
                placeItems: 'center',
                fontFamily: terminal.mono,
                fontSize: 22,
                border: `1px solid rgba(143,209,164,0.3)`,
              }}
            >
              ✓
            </div>
            <div style={{ fontFamily: terminal.mono, fontSize: 12, color: '#8fd1a4', letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Bewerbung angekommen
            </div>
          </div>

          <h1 style={{ fontFamily: terminal.sans, fontSize: 88, lineHeight: 0.95, margin: 0, letterSpacing: -2.5, fontWeight: 500 }}>
            Bewerbung ist da.<br />
            <span style={{ fontFamily: terminal.serif, fontStyle: 'italic', fontWeight: 400, color: terminal.accent }}>Jetzt sind wir dran.</span>
          </h1>

          <p style={{ fontSize: 18, lineHeight: 1.55, color: terminal.dim, marginTop: 28, maxWidth: 560 }}>
            Deine Bewerbung für <strong style={{ color: terminal.text }}>Senior Backend Engineer, Team Ledger</strong> liegt bei uns im Posteingang. In den nächsten Stunden liest ein Engineer aus dem Team sie persönlich, und spätestens{' '}
            <strong style={{ color: terminal.text }}>nach 48 Stunden</strong> hast du eine schriftliche Rückmeldung im Postfach. Mit Einladung zum Gespräch oder mit einer konkreten Absage-Begründung. Keine Auto-Antwort, kein Textbaustein.
          </p>

          <div style={{ marginTop: 40, padding: '24px 28px', background: terminal.panel, border: `1px solid ${terminal.border2}`, borderRadius: 12 }}>
            <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.accent, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 16 }}>
              So geht es jetzt weiter
            </div>
            {TIMELINE.map((x, i) => (
              <div
                key={x.t}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr auto',
                  gap: 20,
                  padding: '16px 0',
                  borderTop: i === 0 ? 'none' : `1px solid ${terminal.border}`,
                }}
              >
                <div style={{ fontFamily: terminal.mono, fontSize: 13, color: x.done ? '#8fd1a4' : terminal.accent }}>
                  {x.done && '✓ '}
                  {x.t}
                </div>
                <div style={{ fontSize: 14, color: terminal.dim, lineHeight: 1.55 }}>{x.d}</div>
                {x.done && <div style={{ fontFamily: terminal.mono, fontSize: 11, color: '#8fd1a4' }}>fertig</div>}
              </div>
            ))}
          </div>

          <div
            style={{
              marginTop: 28,
              padding: '20px 24px',
              border: `1px dashed ${terminal.border2}`,
              borderRadius: 10,
              fontFamily: terminal.mono,
              fontSize: 13,
              color: terminal.dim,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
            }}
          >
            <span style={{ color: terminal.accent }}>ℹ</span>
            <span>
              Keine Bestätigungsmail nach 10 Minuten bekommen? Schau im Spam-Ordner nach. Dort landet unsere Mail ab und zu.
            </span>
          </div>
        </div>

        <div>
          <TPlaceholder label="Team-Foto · Sommerfest 2025" h={280} variant="portrait" src={TEAM_IMAGE} />

          <div style={{ marginTop: 20, padding: 24, background: terminal.panel, border: `1px solid ${terminal.border}`, borderRadius: 10 }}>
            <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.accent, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
              Bis du von uns hörst
            </div>
            {SIDEBAR_LINKS.map((l, i) => (
              <div
                key={l.t}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '14px 0',
                  borderTop: i === 0 ? 'none' : `1px solid ${terminal.border}`,
                  cursor: 'pointer',
                }}
              >
                <div>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{l.t}</div>
                  <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.dim, marginTop: 2 }}>{l.d}</div>
                </div>
                {l.ext && <span style={{ color: terminal.accent, fontFamily: terminal.mono, fontSize: 14 }}>↗</span>}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, fontFamily: terminal.mono, fontSize: 11, color: terminal.dim, textAlign: 'center', lineHeight: 1.7 }}>
            Deine Bewerbungs-Nr.: NC-2026-0418<br />
            Eingegangen am 23. April 2026 um 14:32 Uhr
          </div>
        </div>
      </div>

      <TermFooter />
    </DemoTerminalShell>
  )
}
