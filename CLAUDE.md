# Flowstack Platform

## Komplette Flowstack Ordnerstruktur

**Flowstack** = KI-Automatisierung & Skalierungssystem für Agenturen (Recruiting, Marketing, Webdesign)
**LeadFlow Marketing** = Claudio's Marketing-Agentur (`~/Desktop/LeadFlow-Marketing/`)

```
~/Desktop/Flowstack /
├── 01_Kunden/
│   └── 00_Vorlage_Kundenordner/
├── 02_Vertrieb/
│   ├── Leads/                          ← Cold Mail Skripte, CRM-Daten, Lead-Listen
│   ├── Angebote/
│   ├── Vertragsvorlagen/
│   ├── Pitch_Decks/
│   ├── Vorlagen/
│   └── Case_Studies/
├── 03_Automations/
│   ├── Workflows/                      ← n8n Workflows
│   ├── Skripte/
│   ├── Vorlagen/
│   ├── Use_Cases/
│   └── Dokumentation/
├── 04_Marketing/
│   ├── Branding/
│   │   ├── Brand_Guidelines/
│   │   ├── Farben_Schriften/
│   │   └── Logos/
│   ├── Email/
│   │   ├── Newsletter/
│   │   └── Sequenzen/
│   ├── Social_Media/
│   │   ├── Content_Kalender/
│   │   ├── Instagram/
│   │   └── LinkedIn/
│   ├── Vorlagen/                       ← Banner, Carousel, Flyer, Reels, etc.
│   ├── Webseite/
│   │   ├── Blog_Artikel/
│   │   ├── Landing_Pages/
│   │   └── Seiten code/                ← ALLE CODE-PROJEKTE (siehe unten)
│   └── Werbung/
│       ├── Google_Ads/
│       ├── LinkedIn_Ads/
│       └── Meta_Ads/
├── 05_Finanzen/
│   ├── Rechnungen_Ausgang/
│   ├── Rechnungen_Eingang/
│   ├── Steuern/
│   └── Buchhaltung/
├── 06_Betrieb/
│   ├── Prozesse/
│   ├── Checklisten/
│   ├── Interne_Workflows/
│   └── Backup_LeadDaten_2026-03-06/
├── 07_Team/
│   ├── Schulungen/
│   ├── Vorlagen/
│   ├── Vertraege/
│   └── Onboarding/
├── 08_Rechtliches/
│   ├── Datenschutz/
│   ├── Lizenzen/
│   ├── Vertragsvorlagen/
│   └── AGB/
├── 09_Assets/
│   ├── Stock_Medien/
│   ├── Mockups/
│   ├── Videos/
│   └── Icons/
├── 10_Tools/
│   ├── Scripts/                        ← google_oauth_refresh.py
│   ├── Docs/                           ← Claude Code Befehle.md, Feature Specs, Workflow-Analysen
│   ├── API_Keys/
│   ├── Anleitungen/
│   ├── LinkedIn_Scripts/
│   ├── Lizenzen/
│   └── Zugangsdaten/
├── Bauli-Charisma-Calls/               ← Event-Recherche Screenshots + CSV
└── LI daten/                           ← LinkedIn Daten-Export
```

### Code-Projekte (`04_Marketing/Webseite/Seiten code/`)
| Projekt | Ordner | Typ | Stack |
|---|---|---|---|
| **Flowstack Platform** | `Flowstack-Platform/` | Haupt-App (Dashboard, Kunden-Hub, Automation, Homepage /hp, Demo /demo/*) | React 19, Vite, TS, Three.js, Python Backend |
| **Flowstack Agentur-Webseite** | `Flowstack-Agentur-Webseite/` | Reiner Webseiten-Hub: alle Landingpages, Sections, Marketing-UI | React 18, Vite, Tailwind, shadcn |
| **AI Automation V1** | `[CODE] - Ai Automation Seite V1/` | Original-Projekt (Webseite + App-Logik, Referenz) | React 18, Vite, shadcn |
| **Docvault 2026** | `Docvault-2026/` | Email-/PDF-Extraktion, Job-Klassifizierung | Python, Supabase, Google Sheets |

## Tech Stack
- React 19.2 + React Router DOM 7.12 (SPA)
- TypeScript 5.9 (strict mode, `noUnusedLocals`, `noUncheckedIndexedAccess`)
- Vite 7.3 (Build-Tool), Tailwind CSS 4.1, Radix UI
- Zustand 5.0 (State), LocalStorage (Persistence)
- Lucide React (Icons), Recharts (Charts), Zod (Validation)
- Path-Alias: `@/` → `./src/`

## Projektstruktur
```
src/
├── core/           # Infrastruktur (i18n, persistence, events, theme, ai)
├── shell/          # App.tsx, DashboardLayout, Sidebar, Header, MobileBottomNav
├── modules/        # Feature-Module (lazy-loaded)
│   ├── automation/ # Workflow-Builder + Canvas-Editor (Hauptmodul)
│   ├── content/    # Content-Kalender, Planung, Dateien
│   ├── research/   # Lead-Research, AI-Analyse, Batch-Upload
│   ├── dashboard/  # Haupt-Dashboard
│   ├── kpi/        # Metriken & Analytics
│   ├── linkedin/   # LinkedIn-Integration
│   └── settings/   # Einstellungen
├── shared/         # Gemeinsame Components, Hooks, Utils
└── styles/         # globals.css (Tailwind + Animationen)
```

## Modul-Aufbau (jedes Modul)
```
modules/<name>/
├── application/    # Zustand Store
├── domain/         # Types, Constants
├── pages/          # Page-Components (lazy-loaded)
├── components/     # UI-Components
├── canvas/         # Canvas-spezifisch (nur automation)
└── data/           # Storage, Demo-Daten
```

## Routing (4-Level Navigation)
```
Standalone (eigenes Layout):
  /kunden-hub/*                        → KundenHubPage (eigene Sidebar, Contexts)
  /hp                                  → HomePage (Flowstack Marketing)

Demo-Funnel (standalone Seiten):
  /demo                                → LandingPage
  /demo/kostenlose-beratung            → FormularPage
  /demo/danke                          → DankePage
  /demo/datenschutz                    → DatenschutzPage
  /demo/impressum                      → ImpressumPage

Full-Screen (OHNE Sidebar):
  /automation/system/:systemId/editor  → SystemEditorPage
  /automation/funnel/:funnelId         → FunnelEditorPage

Dashboard (MIT Sidebar):
  /                                    → DashboardPage
  /automation/*                        → AutomationPage (Grid)
  /automation/system/:systemId         → SystemDetailPage (Pipeline)
  /content/*                           → ContentPage
  /research/*                          → ResearchPage
  /kpi/*                               → KpiPage
  /settings                            → SettingsPage
  /terminal/*                          → TerminalPage
```
Full-Screen-Editoren werden in App.tsx VOR dem DashboardLayout definiert.

## Stores (5 Zustand Stores)
- `useUIStore` — Sidebar, Demo-Mode, Theme
- `useAutomationStore` — Systeme, Templates, Resources (CRUD)
- `useContentStore` — Content-Items, Files, Plans
- `useResearchStore` — Lead-Research, Batch-Jobs
- `useContentResearchStore` — YouTube/News-Suche, AI-Analyse

Alle Stores nutzen `createLocalRepository()` für LocalStorage-Persistence.

## Automation Canvas (Kernkomponente)
- `WorkflowCanvas.tsx` (~5600 Zeilen, `@ts-nocheck` — Legacy-Migration)
- `CanvasNode.tsx` — 16 Node-Typen, 9 Design-Themes, 4 Layouts
- `CanvasConnection.tsx` — V3-Style mit Farbanimationen
- `CanvasToolbar.tsx` — Toolbar-Buttons
- `constants.ts` — NODE_STYLES, NODE_TYPE_DIMENSIONS, Farben
- Standard-Theme: `nodelab` (1:1 NodeLab V3 Styling)

## i18n
- Deutsch-first. `createT(lang)` aus `core/i18n/translations.ts`
- Fallback: DE → Key-Name
- Alle neuen UI-Texte als Translation-Keys anlegen

## Coding-Conventions
- `cn()` für conditional classNames (aus `shared/lib/utils`)
- Neue Dateien: kein `@ts-nocheck`
- Komponenten: Named Exports, kein default export
- Imports: `@/` Alias verwenden
- State: Zustand mit Repository-Pattern
- Events: `eventBus.emit()` für Cross-Modul-Kommunikation

## Workflow-Regeln
- **Plan-Mode zuerst** bei Features mit >3 Dateien
- **1 Feature pro Durchgang**, dann verifizieren
- **Build-Check nach jedem Edit:** `npx vite build`
- **Maximal 3 Dateien gleichzeitig** ändern
- **Existierende Dateien editieren** statt neue erstellen
- **Keine Over-Abstraction** — 3 ähnliche Zeilen > premature Abstraction
- **Immer echte Umlaute** (ä, ö, ü, ß) - niemals ae, oe, ue
- **Keine "–" Gedankenstriche** - wirkt KI-generiert

## Verfügbare Skills
- `/port-standalone-to-platform` - Beim Portieren von Code aus dem Standalone Kunden-Hub Projekt nutzen
- `/fix-issue` - Issue autonom fixen (recherchieren, implementieren, testen, PR erstellen)
- `/review-pr` - Pull Request mit mehreren Agenten parallel reviewen

## Kunden-Hub Modul (`src/modules/kunden-hub/`)

### Kritische Regeln (IMMER beachten)
1. **`import type { X }`** für Type-only Imports - NIEMALS `import { X }` wenn X nur als Typ genutzt wird. Sonst Runtime-Crash im Browser (ESM linking error). Besonders: `ApexOptions` aus `apexcharts`, Interfaces aus `data/types.ts`.
2. **ThemeContext NICHT ändern** - Der verzögerte Zwei-Zyklen-Ansatz (`isInitialized` delayed) ist Absicht wegen Konflikt mit Core-ThemeProvider. Kein module-level Code.
3. **`react-router-dom`** verwenden, NICHT `react-router` - Platform nutzt react-router-dom.
4. **Navigate-Pfade mit `/kunden-hub/` Prefix** - Modul ist unter `/kunden-hub/` gemountet. `navigate('/clients')` geht ins Leere, korrekt: `navigate('/kunden-hub/clients')`.
5. **Charts lazy laden** - `const Chart = lazy(() => import('react-apexcharts'))` mit `<Suspense>`. Chart-Optionen IMMER in `useMemo()`.
6. **React Hooks VOR early return** - Alle `useState`, `useMemo`, `useCallback` VOR `if (!data) return` platzieren.

### Import-Pfad Mapping (Standalone → Platform)
| Standalone | Platform |
|---|---|
| `../../components/fulfillment/X` | `../components/X` |
| `../../components/ui/X` | `../ui/components/X` |
| `../../components/common/X` | `../ui/common/X` |
| `../../context/i18n/LanguageContext` | `../i18n/LanguageContext` |
| `../../context/SidebarContext` | `../contexts/SidebarContext` |
| `../../store/fulfillment-store` | `../store/fulfillment-store` |
| `../../data/*` | `../data/*` |
| `../../icons` | `../icons` |

### Architektur-Eigenheiten
- **Zwei ThemeProvider**: Core (`flowstack-theme` key) vs Kunden-Hub (`theme` key) - kämpfen um `<html>` classList
- **`index.html`**: Hatte `class="dark"` - wurde entfernt, Core-Default auf `'light'`
- **CSS Kaskade**: `dark:!bg-gray-900` mit `!important` kann inline `backgroundColor` überschreiben
- **globals.css**: `.dark { --background: #09090b }` macht body schwarz wenn dark class aktiv
- **Standalone-Projekt**: Gelöscht (komplett in Platform integriert)
- **Bug-Dokumentation**: Siehe `KUNDEN-HUB-BUGS.md` im Projekt-Root

## Wichtige Dateien (Automation)
| Datei | Zweck |
|---|---|
| `canvas/WorkflowCanvas.tsx` | Canvas-Engine (~5600 Zeilen) |
| `canvas/CanvasNode.tsx` | Node-Rendering (16 Typen, 9 Themes) |
| `canvas/constants.ts` | NODE_STYLES, Dimensionen, Farben |
| `domain/constants.ts` | Palette-Items, Themes, Features |
| `domain/types.ts` | AutomationSystem, SystemNode, etc. |
| `pages/SystemEditorPage.tsx` | Full-Screen Editor (Level 3) |
| `pages/SystemDetailPage.tsx` | Pipeline-Ansicht (Level 2) |
| `pages/AutomationPage.tsx` | System-Grid (Level 1) |
| `components/PipelineView.tsx` | Horizontale Pipeline-Cards |
| `components/OutputViewer.tsx` | Dokument-Anzeige |
| `components/ResourceManager.tsx` | Ressourcen-Verwaltung |
