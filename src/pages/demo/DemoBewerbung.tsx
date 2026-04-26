import { useState, type CSSProperties } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSeo } from '@/shared/seo/useSeo'
import { DemoTerminalShell, TermFooter, TermNav } from './DemoTerminalShared'
import { terminal } from './DemoTerminalTheme'

type InputProps = {
  label: string
  placeholder?: string
  type?: string
}

function InputT({ label, placeholder, type = 'text' }: InputProps) {
  return (
    <div>
      <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.dim, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
        {label}
      </div>
      <input
        type={type}
        placeholder={placeholder}
        style={{
          width: '100%',
          padding: '12px 14px',
          fontSize: 16,
          background: terminal.bg,
          color: terminal.text,
          border: `1px solid ${terminal.border2}`,
          borderRadius: 8,
          fontFamily: terminal.sans,
          outline: 'none',
          colorScheme: 'dark',
        }}
      />
    </div>
  )
}

function SelectT({ label, options }: { label?: string; options: string[] }) {
  return (
    <div>
      {label && (
        <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.dim, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
          {label}
        </div>
      )}
      <select
        style={{
          width: '100%',
          padding: '12px 14px',
          fontSize: 16,
          background: terminal.bg,
          color: terminal.text,
          border: `1px solid ${terminal.border2}`,
          borderRadius: 8,
          fontFamily: terminal.sans,
          appearance: 'none',
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'><path d='M1 1l5 5 5-5' stroke='%23e6e4df' stroke-width='1.5' fill='none'/></svg>")`,
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'right 14px center',
        }}
      >
        {options.map(o => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </div>
  )
}

const SIDEBAR_STEPS: Array<[string, string]> = [
  ['1', 'Formular ausfüllen · dauert ca. 2 Minuten'],
  ['2', 'Bestätigungsmail landet sofort in deinem Postfach'],
  ['3', 'Ein Engineer meldet sich persönlich bei dir · innerhalb von 48 Stunden'],
  ['4', 'Einladung zum Kennenlerngespräch oder ehrliche Absage mit Begründung'],
]

const TAGS = ['Rust', 'Go', 'Java/Kotlin', 'Python', 'C++', 'Postgres', 'Kafka', 'K8s']
const LOCATIONS = ['Berlin', 'Remote EU', 'Hybrid']

export function DemoBewerbung() {
  const [step, setStep] = useState<number>(1)
  const navigate = useNavigate()

  useSeo({
    title: 'Bewerbung · Novacode Demo · Flowstack',
    description: 'Dark-Terminal Bewerbungsformular Demo.',
    path: '/demo-bewerbung',
    noindex: true,
  })

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      navigate('/demo-danke')
    }
  }

  const progressBar: CSSProperties = { flex: 1, height: 4, borderRadius: 2 }

  return (
    <DemoTerminalShell>
      <TermNav />

      <main>
      <div style={{ padding: '20px 72px', borderBottom: `1px solid ${terminal.border}`, fontFamily: terminal.mono, fontSize: 12, color: terminal.dim }}>
        <Link to="/demo" style={{ color: terminal.dim, textDecoration: 'none' }}>
          ← Zurück zu careers.novacode.de
        </Link>
      </div>

      <div style={{ padding: '64px 72px', display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 72, alignItems: 'start' }}>
        <div style={{ position: 'sticky', top: 40 }}>
          <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.accent, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 20 }}>
            Bewerbung für
          </div>
          <h1 style={{ fontFamily: terminal.sans, fontSize: 44, lineHeight: 1, margin: 0, letterSpacing: -1.2, fontWeight: 500, marginBottom: 20 }}>
            Senior Backend Engineer
          </h1>
          <div style={{ fontFamily: terminal.serif, fontStyle: 'italic', fontSize: 22, color: terminal.accent, marginBottom: 20 }}>
            Team Ledger
          </div>
          <p style={{ fontSize: 14.5, lineHeight: 1.55, color: terminal.dim, marginTop: 0, marginBottom: 28 }}>
            <strong style={{ color: terminal.text }}>Vier Fragen, keine Lebenslauf-Pflicht.</strong> Du brauchst nur einen Link zu deinem Code und eine E-Mail-Adresse. Lesen und bewerten tut kein Recruiter, sondern ein Engineer aus dem Team Ledger.
          </p>
          <div
            style={{
              display: 'grid',
              gap: 14,
              fontFamily: terminal.mono,
              fontSize: 13,
              color: terminal.dim,
              paddingBottom: 28,
              borderBottom: `1px solid ${terminal.border}`,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Standort</span>
              <span style={{ color: terminal.text }}>Berlin / Remote EU</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Stack</span>
              <span style={{ color: terminal.text }}>Rust · Postgres</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Gehalt</span>
              <span style={{ color: terminal.text }}>€110–145k</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Equity</span>
              <span style={{ color: terminal.text }}>0.10–0.35%</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Start</span>
              <span style={{ color: terminal.text }}>ab sofort</span>
            </div>
          </div>

          <div style={{ marginTop: 28 }}>
            <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.dim, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 14 }}>
              So läuft deine Bewerbung ab
            </div>
            {SIDEBAR_STEPS.map(([n, t]) => (
              <div key={n} style={{ display: 'flex', gap: 12, alignItems: 'center', fontSize: 13.5, marginBottom: 10 }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: '50%',
                    background: 'rgba(232,183,92,0.15)',
                    color: terminal.accent,
                    display: 'grid',
                    placeItems: 'center',
                    fontSize: 11,
                    fontFamily: terminal.mono,
                  }}
                >
                  {n}
                </div>
                <span style={{ color: terminal.dim }}>{t}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ background: terminal.panel, border: `1px solid ${terminal.border2}`, borderRadius: 14, padding: 40 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.accent, letterSpacing: 1.5, textTransform: 'uppercase' }}>
              Schritt {step} von 3
            </div>
            <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.dim }}>
              noch ca. {step === 1 ? '2 Minuten' : step === 2 ? '1 Minute' : '30 Sekunden'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, marginBottom: 32 }}>
            {[1, 2, 3].map(n => (
              <div key={n} style={{ ...progressBar, background: n <= step ? terminal.accent : terminal.border2 }} />
            ))}
          </div>

          <h2 style={{ fontFamily: terminal.sans, fontSize: 32, margin: '0 0 8px', letterSpacing: -0.8, fontWeight: 500 }}>
            {step === 1 && 'Wer bist du?'}
            {step === 2 && 'Zeig uns, was du baust.'}
            {step === 3 && 'Fast geschafft.'}
          </h2>
          <p style={{ color: terminal.dim, fontSize: 14.5, marginBottom: 28 }}>
            {step === 1 && 'Name, E-Mail und Wohnort. Mehr brauchen wir an dieser Stelle nicht.'}
            {step === 2 && 'Ein Link zu deinem GitHub, Portfolio oder öffentlichen Code reicht uns. Anschreiben brauchst du keines.'}
            {step === 3 && 'Nur noch dein frühester Starttermin und wo du arbeiten möchtest. Danach bist du durch.'}
          </p>

          {step === 1 && (
            <div style={{ display: 'grid', gap: 14 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <InputT label="Vorname *" placeholder="Max" />
                <InputT label="Nachname *" placeholder="Müller" />
              </div>
              <InputT label="E-Mail *" placeholder="max@beispiel.de" type="email" />
              <InputT label="Telefon (optional)" placeholder="+49 …" />
              <InputT label="Aktueller Wohnort" placeholder="Berlin, Deutschland" />
            </div>
          )}

          {step === 2 && (
            <div style={{ display: 'grid', gap: 14 }}>
              <InputT label="GitHub / Portfolio / LinkedIn *" placeholder="github.com/maxm" />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <SelectT label="Jahre Erfahrung *" options={['5–7 Jahre', '8–10 Jahre', '10+ Jahre', '3–5 Jahre']} />
                <SelectT label="Aktuelle Rolle *" options={['Senior Engineer', 'Staff Engineer', 'Tech Lead', 'Solo / Consulting']} />
              </div>
              <div>
                <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.dim, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Wichtigste Sprachen / Tools
                </div>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {TAGS.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      style={{
                        padding: '8px 14px',
                        fontSize: 13,
                        fontFamily: terminal.mono,
                        background: terminal.bg,
                        color: terminal.text,
                        border: `1px solid ${terminal.border2}`,
                        borderRadius: 999,
                        cursor: 'pointer',
                      }}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.dim, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Kurze Notiz (optional)
                </div>
                <textarea
                  placeholder="Woran arbeitest du gerade? Was reizt dich an dieser Rolle?"
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    fontSize: 16,
                    background: terminal.bg,
                    color: terminal.text,
                    border: `1px solid ${terminal.border2}`,
                    borderRadius: 8,
                    fontFamily: terminal.sans,
                    outline: 'none',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display: 'grid', gap: 16 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                <div>
                  <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.dim, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
                    Start-Datum (frühestens) *
                  </div>
                  <input
                    type="date"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      fontSize: 16,
                      background: terminal.bg,
                      color: terminal.text,
                      border: `1px solid ${terminal.border2}`,
                      borderRadius: 8,
                      fontFamily: terminal.sans,
                      outline: 'none',
                      colorScheme: 'dark',
                    }}
                  />
                </div>
                <SelectT label="Kündigungsfrist" options={['Sofort verfügbar', '4 Wochen', '8 Wochen', '12+ Wochen']} />
              </div>
              <div>
                <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.dim, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Standort-Präferenz *
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                  {LOCATIONS.map((l, i) => (
                    <button
                      key={l}
                      type="button"
                      style={{
                        padding: '14px',
                        fontSize: 14,
                        fontFamily: terminal.sans,
                        background: i === 0 ? 'rgba(232,183,92,0.08)' : terminal.bg,
                        color: terminal.text,
                        border: `1px solid ${i === 0 ? terminal.accent : terminal.border2}`,
                        borderRadius: 8,
                        cursor: 'pointer',
                        fontWeight: i === 0 ? 600 : 400,
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div style={{ fontFamily: terminal.mono, fontSize: 11, color: terminal.dim, marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }}>
                  Wie bist du auf uns gekommen?
                </div>
                <SelectT options={['GitHub / Open Source', 'Engineering Blog', 'Empfehlung von Mitarbeiter', 'Konferenz', 'LinkedIn', 'Google', 'Sonstiges']} />
              </div>
              <label style={{ display: 'flex', alignItems: 'start', gap: 10, fontSize: 13, color: terminal.dim, lineHeight: 1.55, marginTop: 8 }}>
                <input type="checkbox" style={{ marginTop: 3, accentColor: terminal.accent }} />
                <span>
                  Ich stimme der Verarbeitung meiner Daten gemäß <a style={{ color: terminal.accent }}>Datenschutzerklärung</a> zu. Daten werden nach 6 Monaten
                  gelöscht, falls es nicht passt.
                </span>
              </label>
            </div>
          )}

          <div style={{ display: 'flex', gap: 10, marginTop: 32 }}>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                style={{
                  padding: '16px 22px',
                  fontSize: 14,
                  fontFamily: terminal.sans,
                  background: 'transparent',
                  color: terminal.text,
                  border: `1px solid ${terminal.border2}`,
                  borderRadius: 8,
                  cursor: 'pointer',
                }}
              >
                ← Zurück
              </button>
            )}
            <button
              type="button"
              onClick={handleNext}
              style={{
                flex: 1,
                background: terminal.accent,
                color: terminal.bg,
                padding: '16px 22px',
                borderRadius: 8,
                fontWeight: 600,
                fontSize: 15,
                cursor: 'pointer',
                border: 'none',
                fontFamily: terminal.sans,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              {step === 3 ? 'Bewerbung absenden' : `Weiter zu Schritt ${step + 1}`}
              <span style={{ fontFamily: terminal.mono }}>→</span>
            </button>
          </div>
        </div>
      </div>
      </main>

      <TermFooter />
    </DemoTerminalShell>
  )
}
