# Flowstack Agentur-Webseite

Reine Marketing- und Lead-Generation-Webseite von Flowstack. React + Vite SPA, deployed auf Vercel.

## Stack

- React 18 + React Router DOM 7 (SPA, lazy-loaded Routes)
- TypeScript 5.9 (strict)
- Vite 7
- Tailwind CSS 4.1 (via @tailwindcss/vite)
- Firebase Auth (SMS-Verifizierung im VSL-Funnel)
- GTM + Meta Pixel + Umami (über Consent Mode v2)

## Struktur

```
src/
├── shell/App.tsx                # Router mit allen Routen
├── pages/
│   ├── homepage-funnel/         # HomePage, Bewerbung, DankeBewerbung
│   ├── fulfillment-automation/  # FulfillmentAutomation
│   ├── vsl-funnel/              # OptIn, Training, Qualify, Booking, Danke
│   ├── legal/                   # Impressum, Datenschutz, Agb
│   └── demo/                    # Recruiting-Demos (noindex)
│       ├── _shared/             # DemoRecruitingTemplate
│       ├── _config/             # Konfigurationen pro Demo
│       ├── NovaCodeRecruiting.tsx
│       ├── SeniorProgrammiererDemo.tsx
│       └── BrightLabsDemo.tsx
├── shared/
│   ├── seo/useSeo.ts            # SEO-Hook: Title, OG, Twitter, Canonical, noindex
│   └── tracking/                # GTM dataLayer + Meta Pixel + Umami
├── components/shared/
│   └── CookieBanner.tsx         # Consent Mode v2 Cookie-Banner
├── lib/firebase.ts              # Firebase Auth für SMS-Verifizierung
└── styles/                      # globals.css + 3 Marketing-CSS-Module
```

## Funnel-Gruppen

### Homepage-Funnel
- `/` — HomePage (organischer Traffic)
- `/bewerbung` — Multi-Step Bewerbungsformular
- `/danke-bewerbung` — Danke-Seite nach Bewerbung

### Fulfillment
- `/fulfillment-automation` — Produkt-Landingpage für Recruiting-Automatisierung

### VSL-Funnel (nur über Ads, noindex)
- `/kostenloses-videotraining` — OptIn mit SMS-Verifikation (Firebase)
- `/videotraining` — Training-Video
- `/private-bewerbung` — Qualifizierungs-Formular
- `/termin` — Calendly-Booking
- `/danke` — Abschluss

### Demo-Recruiting (noindex)
- `/demo/novacode` — Tech-Startup-Demo
- `/demo/senior-programmierer` — Mittelstands-Senior-Position
- `/demo/brightlabs` — Kreativagentur-Werkstudent

### Legal
- `/impressum`
- `/datenschutz`
- `/agb`

## Entwicklung

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # Production-Build
npm run preview    # Preview des Build-Outputs
```

## Deployment

Vercel — `vercel.json` regelt SPA-Rewrite (alle Routen → `/index.html`).

## Tracking & Consent

- Google Consent Mode v2 initialisiert mit `denied` in `index.html`
- CookieBanner schreibt Zustimmung in `localStorage` und pusht `consent update` in GTM-DataLayer
- Meta Pixel nutzt `fbq('consent', 'grant'|'revoke')`
- Umami läuft nur bei akzeptiertem Analytics-Consent

## Konventionen

- Named Exports, kein `default export` (außer CookieBanner aus Legacy-Gründen)
- `@/` Alias für alle Imports
- Deutsche Umlaute (ä, ö, ü, ß) — nie ae/oe/ue/ss
- Keine Gedankenstriche (–) in UI-Texten
- Neue Demo-Seiten: Config in `pages/demo/_config/`, Wrapper-Component dazu, Route in App.tsx
