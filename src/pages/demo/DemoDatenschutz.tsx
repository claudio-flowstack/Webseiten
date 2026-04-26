import { useSeo } from '@/shared/seo/useSeo'
import { DemoTerminalShell, TermFooter, TermNav } from './DemoTerminalShared'
import { terminal } from './DemoTerminalTheme'

type Section = {
  label: string
  title: string
  body: string[]
}

const SECTIONS: Section[] = [
  {
    label: '01',
    title: 'Verantwortlicher',
    body: [
      'Verantwortlich für die Datenverarbeitung auf dieser Seite ist die Novacode GmbH, Oranienburger Straße 66, 10117 Berlin.',
      'Fragen rund um Datenschutz richtest du an unseren Datenschutzbeauftragten Dr. Fabian Holzer: datenschutz@novacode.de.',
    ],
  },
  {
    label: '02',
    title: 'Welche Daten wir verarbeiten',
    body: [
      'Wenn du dich auf eine Stelle bewirbst, verarbeiten wir die Angaben, die du im Formular machst: Name, E-Mail-Adresse, Wohnort, Link zu öffentlichem Code (GitHub-Profil o.ä.) und optional ergänzende Angaben.',
      'Beim Aufruf unserer Seite werden technische Daten erfasst: IP-Adresse (gekürzt), Browser-Typ, aufgerufene Seite, Referrer, Zeitstempel. Diese Daten werden nach 14 Tagen gelöscht.',
    ],
  },
  {
    label: '03',
    title: 'Rechtsgrundlage',
    body: [
      'Deine Bewerbungsdaten verarbeiten wir auf Grundlage von § 26 Abs. 1 BDSG und Art. 6 Abs. 1 lit. b DSGVO (Anbahnung eines Beschäftigungsverhältnisses).',
      'Technische Log-Daten auf Grundlage unseres berechtigten Interesses an einem stabilen und sicheren Seitenbetrieb (Art. 6 Abs. 1 lit. f DSGVO).',
    ],
  },
  {
    label: '04',
    title: 'Speicherdauer',
    body: [
      'Erfolgreiche Bewerbungen werden Teil deiner Personalakte. Wenn es nicht zu einem Vertrag kommt, löschen wir deine Bewerbungsdaten spätestens sechs Monate nach Abschluss des Verfahrens, es sei denn du stimmst einer Aufnahme in unseren Talent-Pool aktiv zu.',
      'Log-Daten werden nach 14 Tagen automatisch gelöscht.',
    ],
  },
  {
    label: '05',
    title: 'Empfänger',
    body: [
      'Bewerbungsdaten sehen ausschließlich Engineers aus dem jeweiligen Team sowie das People-Operations-Team. Wir geben deine Daten nicht an Dritte außerhalb der EU weiter.',
      'Für den Betrieb der Seite nutzen wir folgende Auftragsverarbeiter: Vercel Inc. (Hosting, USA, mit Standardvertragsklauseln), Hetzner Online GmbH (Datenbank, Deutschland) und Postmark (Transaktionsmails, USA, mit Standardvertragsklauseln).',
    ],
  },
  {
    label: '06',
    title: 'Cookies und Tracking',
    body: [
      'Wir nutzen ausschließlich notwendige Session-Cookies. Es gibt kein Re-Targeting, kein Fingerprinting und keine Weitergabe an Ad-Netzwerke.',
      'Optional setzen wir ein pseudonymisiertes Analytics-Cookie (Plausible, keine IP-Speicherung), wenn du dem in unserem Cookie-Banner zustimmst.',
    ],
  },
  {
    label: '07',
    title: 'Deine Rechte',
    body: [
      'Du hast jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16), Löschung (Art. 17), Einschränkung (Art. 18), Datenübertragbarkeit (Art. 20) und Widerspruch (Art. 21). Eine E-Mail an datenschutz@novacode.de reicht.',
      'Du kannst dich außerdem bei der zuständigen Aufsichtsbehörde beschweren: Berliner Beauftragte für Datenschutz und Informationsfreiheit, Friedrichstraße 219, 10969 Berlin.',
    ],
  },
  {
    label: '08',
    title: 'Sicherheit',
    body: [
      'Alle Übertragungen laufen über TLS 1.3. Bewerbungsdaten liegen verschlüsselt in einer Datenbank in Deutschland. Zugriff ist strikt rollenbasiert und wird auditiert.',
    ],
  },
]

export function DemoDatenschutz() {
  useSeo({
    title: 'Datenschutz · Novacode Demo · Flowstack',
    description: 'Datenschutzerklärung der fiktiven Novacode GmbH für die Recruiting-Demo.',
    path: '/demo-datenschutz',
    noindex: true,
  })

  return (
    <DemoTerminalShell>
      <TermNav />

      <main>
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '80px 72px 96px' }}>
        <div style={{ fontFamily: terminal.mono, fontSize: 12, color: terminal.accent, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 18 }}>
          /legal/datenschutz
        </div>
        <h1 style={{ fontFamily: terminal.sans, fontSize: 64, lineHeight: 1, margin: 0, letterSpacing: -1.5, fontWeight: 500 }}>
          Datenschutz.
        </h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: terminal.dim, marginTop: 20, maxWidth: 640 }}>
          Kurz und konkret, wie wir mit deinen Daten umgehen. Alle Angaben sind fiktiv und gelten für die
          Recruiting-Demo der Novacode GmbH.
        </p>

        <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 20 }}>
          {SECTIONS.map((s) => (
            <div
              key={s.label}
              style={{
                display: 'grid',
                gridTemplateColumns: '72px 1fr',
                gap: 32,
                padding: '28px 28px 28px 24px',
                background: terminal.panel,
                border: `1px solid ${terminal.border2}`,
                borderRadius: 12,
              }}
            >
              <div style={{ fontFamily: terminal.mono, fontSize: 13, color: terminal.accent, letterSpacing: 1, paddingTop: 4 }}>
                {s.label}
              </div>
              <div>
                <h2 style={{ fontFamily: terminal.sans, fontSize: 22, margin: 0, fontWeight: 500, letterSpacing: -0.3, color: terminal.text }}>
                  {s.title}
                </h2>
                <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {s.body.map((p, i) => (
                    <p key={i} style={{ fontSize: 15, lineHeight: 1.65, color: terminal.dim, margin: 0 }}>
                      {p}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 48, fontFamily: terminal.mono, fontSize: 12, color: terminal.dim, textAlign: 'center' }}>
          Stand: April 2026 · Diese Seite ist Teil einer Demo und nicht rechtsverbindlich.
        </div>
      </div>
      </main>

      <TermFooter />
    </DemoTerminalShell>
  )
}
