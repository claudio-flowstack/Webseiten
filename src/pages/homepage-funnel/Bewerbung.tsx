import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSeo } from '@/shared/seo/useSeo'
import { trackLeadSubmit } from '@/shared/tracking'
import { ApplicationForm, type FormStep, type FormTheme } from '@/components/shared/ApplicationForm'

const HOMEPAGE_THEME: FormTheme = {
  bg: '#0a0a0e',
  card: '#111318',
  surfaceIdle: '#15171d',
  surfaceActive: '#1b1e25',
  text: '#f6f6f7',
  textMuted: '#c4c5c7',
  accent: '#22d3ee',
  accentStrong: '#06b6d4',
  accentText: '#042f2e',
  border: '#464849',
  borderMuted: 'rgba(70,72,73,0.15)',
  font: "'Inter', sans-serif",
}

const STEPS: FormStep[] = [
  {
    id: 'name',
    title: 'Wie heißt du?',
    subtitle: 'Wir fangen mit dem Einfachen an.',
    fields: [
      { kind: 'cards', id: 'anrede', options: ['Herr', 'Frau'], columns: 2 },
      { kind: 'input', id: 'vorname', label: 'Vorname', placeholder: 'Max' },
      { kind: 'input', id: 'nachname', label: 'Nachname', placeholder: 'Mustermann' },
    ],
  },
  {
    id: 'contact',
    title: 'Wie erreichen wir dich?',
    subtitle: 'Bei Qualifikation melden wir uns in den nächsten 24 Stunden.',
    fields: [
      { kind: 'input', id: 'email', label: 'E-Mail', type: 'email', placeholder: 'max@agentur.de' },
      { kind: 'input', id: 'telefon', label: 'Handynummer', type: 'tel', placeholder: '+49 170 1234567' },
    ],
  },
  {
    id: 'website',
    title: 'Deine Firmen-Webseite',
    subtitle: 'Damit wir uns vorab ein Bild deines Angebots machen können.',
    fields: [
      { kind: 'input', id: 'website', label: 'Website', type: 'url', placeholder: 'www.deine-agentur.de' },
    ],
  },
  {
    id: 'service',
    title: 'Welche Art Dienstleistung verkaufst du?',
    subtitle: 'So wissen wir, welche Fallstudien wir dir zeigen.',
    fields: [
      { kind: 'cards', id: 'dienstleistung', options: ['Marketing-Agentur', 'Recruiting-Agentur', 'Coaching / Beratung', 'Andere Dienstleistung'] },
    ],
  },
  {
    id: 'monatsumsatz',
    title: 'Wie hoch ist dein aktueller Monatsumsatz?',
    subtitle: 'Ehrliche Antwort. Wir qualifizieren danach, nicht nach unten oder oben.',
    fields: [
      { kind: 'cards', id: 'monatsumsatz', options: ['Unter 10.000 €', '10.000 - 25.000 €', '25.000 - 50.000 €', '50.000 - 100.000 €', 'Über 100.000 €'] },
    ],
  },
  {
    id: 'zielumsatz',
    title: 'Welchen Monatsumsatz willst du in 12 Monaten?',
    subtitle: 'Damit wir bewerten können, ob Flowstack der richtige Hebel ist.',
    fields: [
      { kind: 'input', id: 'zielumsatz', label: 'Zielumsatz pro Monat', placeholder: 'z.B. 100.000 €' },
    ],
  },
  {
    id: 'problem',
    title: 'Was ist aktuell dein größtes Problem?',
    subtitle: 'Mehrere mögen passen, wähle das dringendste.',
    fields: [
      {
        kind: 'cards',
        id: 'problem',
        options: [
          'Zu viel manuelle Arbeit im Fulfillment',
          'Kann nicht skalieren ohne mehr Personal',
          'Keine standardisierten Prozesse',
          'Zu wenig qualifizierte Anfragen',
          'Etwas anderes',
        ],
      },
    ],
  },
  {
    id: 'werbeanzeigen',
    title: 'Schaltest du bezahlte Werbeanzeigen?',
    subtitle: 'Meta, YouTube, LinkedIn, Google Ads, alles zählt.',
    fields: [
      {
        kind: 'cards',
        id: 'werbeanzeigen',
        options: [
          'Ja, auf Meta (Facebook/Instagram)',
          'Ja, auf Google/YouTube',
          'Ja, auf mehreren Plattformen',
          'Nein, noch nicht',
        ],
      },
    ],
  },
  {
    id: 'mitarbeiter',
    title: 'Wie viele festangestellte Mitarbeiter hast du?',
    subtitle: 'Freelancer und Agenturen zählen nicht mit.',
    fields: [
      { kind: 'cards', id: 'mitarbeiter', options: ['Keine / Nur Freelancer', '1 bis 3', '3 bis 10', '10 bis 20', 'Über 20'] },
    ],
  },
  {
    id: 'investition',
    title: 'Wie viel kannst du investieren, um das Ziel zu erreichen?',
    subtitle: 'Flowstack ist ein Investment, keine Ausgabe. Realistische Einschätzung hilft uns beiden.',
    fields: [
      { kind: 'cards', id: 'investition', options: ['Unter 1.000 €', '1.000 - 3.000 €', '3.000 - 5.000 €', '5.000 - 10.000 €', 'Über 10.000 €'] },
    ],
  },
  {
    id: 'motivation',
    title: 'Warum sollten wir mit dir arbeiten?',
    subtitle: 'Ich erhalte viele Anfragen. Nutze diese Box, um dich abzuheben.',
    fields: [
      {
        kind: 'textarea',
        id: 'motivation',
        label: 'Deine Antwort',
        placeholder: 'Erzähl mir kurz, warum du der richtige Partner bist...',
        minLength: 150,
      },
      {
        kind: 'consent',
        id: 'datenschutz',
        label: (
          <>
            Ich habe die <a href="/datenschutz" target="_blank" rel="noopener noreferrer" style={{ color: '#22d3ee', textDecoration: 'underline' }}>Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu.
          </>
        ),
      },
      {
        kind: 'consent',
        id: 'telefonConsent',
        label: 'Ich bin einverstanden, dass Flowstack mich telefonisch kontaktieren darf.',
      },
    ],
  },
]

export function Bewerbung() {
  const navigate = useNavigate()

  useSeo({
    title: 'Bewerbung · Flowstack System',
    description: 'Bewerbung für ein Strategiegespräch mit Claudio Di Franco. Kostenlos, unverbindlich, 30 Minuten.',
    path: '/bewerbung',
    noindex: true,
  })

  useEffect(() => {
    // Listener bleiben passiv; ApplicationForm handled Step-Events selbst
  }, [])

  return (
    <ApplicationForm
      steps={STEPS}
      theme={HOMEPAGE_THEME}
      submitEndpoint="https://script.google.com/macros/s/AKfycbxAtxD5g4byY-SD5tuCV79d5k6UL9FEVVIguEiJd_AuBrhukRPCQVzvjSeMeuGGoNn1/exec"
      submitAction="bewerbung"
      analyticsEvent="homepage_bewerbung"
      header={{ logoMain: 'Flow', logoAccent: 'stack', label: 'Bewerbung' }}
      hero={{
        badge: 'Strategie-Gespräch beantragen',
        title: (
          <>
            Gib deiner Agentur <span style={{ color: '#22d3ee' }}>20 Stunden pro Woche</span> zurück
          </>
        ),
        subtitle: 'Fülle das Formular ehrlich aus. Bei Qualifikation melden wir uns innerhalb von 24 Stunden.',
      }}
      trust={[
        { icon: 'badge', label: 'Done-for-You Automation' },
        { icon: 'shield', label: 'DSGVO-konform' },
        { icon: 'chart', label: '2-4 Wochen Go-Live' },
      ]}
      ctaFinalLabel="Bewerbung absenden"
      onSuccess={data => {
        trackLeadSubmit({
          service: data.dienstleistung ?? '',
          revenue_range: data.monatsumsatz ?? '',
          invest_range: data.investition ?? '',
          team_size: data.mitarbeiter ?? '',
        })
        try {
          sessionStorage.setItem('flowstack-submitted', JSON.stringify({
            firstName: data.vorname ?? '',
            phone: data.telefon ?? '',
            email: data.email ?? '',
          }))
        } catch {
          // noop
        }
        setTimeout(() => navigate('/danke-bewerbung'), 300)
      }}
    />
  )
}
