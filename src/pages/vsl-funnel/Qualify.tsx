import { ApplicationForm, type FormStep, type FormTheme } from '@/components/shared/ApplicationForm'

const VSL_THEME: FormTheme = {
  bg: '#111415',
  card: '#111415',
  surfaceIdle: '#181a1b',
  surfaceActive: '#1e2021',
  text: '#f6f6f7',
  textMuted: '#c4c5c7',
  accent: '#99f7ff',
  accentStrong: '#00e2ee',
  accentText: '#003538',
  border: '#464849',
  borderMuted: 'rgba(70,72,73,0.15)',
  font: "'Manrope', sans-serif",
}

const STEPS: FormStep[] = [
  {
    id: 'name',
    title: 'Wie dürfen wir dich ansprechen?',
    fields: [
      { kind: 'cards', id: 'anrede', options: ['Herr', 'Frau'], columns: 2 },
      { kind: 'input', id: 'vorname', label: 'Vorname', placeholder: 'Max' },
      { kind: 'input', id: 'nachname', label: 'Nachname', placeholder: 'Mustermann' },
    ],
  },
  {
    id: 'contact',
    title: 'Wie können wir dich erreichen?',
    fields: [
      { kind: 'input', id: 'email', label: 'E-Mail', type: 'email', placeholder: 'max@agentur.de' },
      { kind: 'input', id: 'telefon', label: 'Handynummer', type: 'tel', placeholder: '+49 170 1234567' },
    ],
  },
  {
    id: 'website',
    title: 'Webseite deines Unternehmens',
    fields: [
      { kind: 'input', id: 'website', label: 'Website', type: 'url', placeholder: 'www.deine-agentur.de', required: false },
    ],
  },
  {
    id: 'service',
    title: 'Welche Art von Dienstleistung bietest du an?',
    fields: [
      { kind: 'cards', id: 'dienstleistung', options: ['Marketing-Agentur', 'Recruiting-Agentur', 'Coaching / Beratung', 'Andere Dienstleistung'] },
    ],
  },
  {
    id: 'monatsumsatz',
    title: 'Wie hoch ist dein aktueller Monatsumsatz?',
    fields: [
      { kind: 'cards', id: 'monatsumsatz', options: ['Unter 10.000 €', '10.000 - 25.000 €', '25.000 - 50.000 €', '50.000 - 100.000 €', 'Über 100.000 €'] },
    ],
  },
  {
    id: 'zielumsatz',
    title: 'Welchen Monatsumsatz möchtest du erreichen?',
    fields: [
      { kind: 'input', id: 'zielumsatz', label: 'Zielumsatz pro Monat', placeholder: 'z.B. 100.000 €' },
    ],
  },
  {
    id: 'problem',
    title: 'Was ist gerade dein größtes Problem bei der Erreichung dieses Ziels?',
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
    title: 'Schaltest du bereits bezahlte Werbeanzeigen?',
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
    fields: [
      { kind: 'cards', id: 'mitarbeiter', options: ['Keine / Nur Freelancer', '1 bis 3', '3 bis 10', '10 bis 20', 'Über 20'] },
    ],
  },
  {
    id: 'investition',
    title: 'Erfolgreiche Unternehmer wissen, dass sie zuerst investieren müssen. Wie viel kannst du zum jetzigen Zeitpunkt in die Automatisierung deines Business investieren?',
    fields: [
      { kind: 'cards', id: 'investition', options: ['Unter 1.000 €', '1.000 - 3.000 €', '3.000 - 5.000 €', '5.000 - 10.000 €', 'Über 10.000 €'] },
    ],
  },
  {
    id: 'motivation',
    title: 'Was unterscheidet dich von den anderen Bewerbern und warum sollten wir ausgerechnet mit dir zusammenarbeiten?',
    subtitle: 'Wir erhalten ca. 100-200 Anfragen pro Monat und nehmen nur die geeignetsten Bewerber an.',
    fields: [
      {
        kind: 'textarea',
        id: 'motivation',
        label: 'Deine Antwort',
        placeholder: 'Erzähl uns kurz, warum du der richtige Partner für eine Zusammenarbeit mit Flowstack bist...',
        minLength: 20,
      },
      {
        kind: 'consent',
        id: 'datenschutz',
        label: (
          <>
            Ich habe die <a href="/datenschutz" target="_blank" rel="noopener noreferrer" style={{ color: '#99f7ff', textDecoration: 'underline' }}>Datenschutzerklärung</a> gelesen und stimme der Verarbeitung meiner Daten zu.
          </>
        ),
      },
      {
        kind: 'consent',
        id: 'telefonConsent',
        label: 'Ich bin einverstanden, dass Flowstack mich telefonisch kontaktieren darf.',
      },
      {
        kind: 'consent',
        id: 'zustimmung',
        label: 'Ja, ich stimme zu und möchte an der kostenlosen Prozessanalyse teilnehmen.',
      },
    ],
  },
]

export function Qualify() {
  return (
    <ApplicationForm
      steps={STEPS}
      theme={VSL_THEME}
      submitEndpoint="https://script.google.com/macros/s/AKfycbxAtxD5g4byY-SD5tuCV79d5k6UL9FEVVIguEiJd_AuBrhukRPCQVzvjSeMeuGGoNn1/exec"
      submitAction="bewerbung"
      analyticsEvent="vsl_bewerbung"
      header={{ logoMain: 'Flow', logoAccent: 'stack', label: 'Private Bewerbung' }}
      hero={{
        badge: 'Deine kostenlose Prozessanalyse',
        title: (
          <>
            Nur noch ein Schritt zu deiner <span style={{ color: '#99f7ff' }}>automatisierten Agentur</span>
          </>
        ),
        subtitle: 'Bitte fülle das folgende kurze Formular aus, damit wir wissen, wie wir dir am besten helfen können:',
      }}
      trust={[
        { icon: 'badge', label: 'Done-for-You Automation' },
        { icon: 'shield', label: 'DSGVO-konform' },
        { icon: 'chart', label: '2-4 Wochen Go-Live' },
      ]}
      ctaFinalLabel="Bewerbung absenden"
      footerText="Diese Website ist nicht Teil der Facebook-Website oder von Facebook Inc. Diese Seite ist NICHT im Auftrag der FACEBOOK, Inc. entstanden. FACEBOOK ist eine Marke von FACEBOOK, Inc."
      redirectTo={data =>
        '/termin?' + new URLSearchParams({
          vorname: data.vorname ?? '',
          nachname: data.nachname ?? '',
          email: data.email ?? '',
          telefon: data.telefon ?? '',
        }).toString()
      }
    />
  )
}
