# Legacy-Komponenten (Alte Homepage)

Inline-Sektionen aus `src/pages/HomePage.tsx` (Route `/alt-hp`).
Diese sind NICHT als eigenstaendige Komponenten extrahiert, sondern leben noch inline in der HomePage.
Hier dokumentiert als Referenz fuer spaetere Wiederverwendung oder Migration in die Library.

## Einzigartige Inline-Komponenten (NICHT in Library vorhanden)

| Komponente | Beschreibung | Zeilen in HomePage.tsx |
|---|---|---|
| **AnimatedWorkflow** | SVG Node-Graph mit Tool-Icons (n8n, OpenAI, Airtable, Slack). Animierte Verbindungslinien. | ~339-485 |
| **AgencyAutomationFlow** | Groesserer Automation-Flow mit Phasen (Onboarding, KI-Generierung, Kampagne, Reporting, Optimierung) | ~490-740 |
| **SolutionPreviewGraphic** | 3 Varianten: Progress Bars (Vorher/Nachher), Donut Chart (80% automatisiert), Stat Cards (5x Kunden) | ~207-278 |
| **Empathy Opening** | "Grundproblem" Flow-Diagramm (Mehr Kunden → Mehr Arbeit → Weniger Rendite) + Loesung | Inline ~964-1017 |
| **Outcomes Comparison** | Desktop: Side-by-Side Tabelle mit Icons. Mobile: Gestapelte Cards. 6 Vergleichs-Rows. | Inline ~1200-1317 |
| **Target Audience (Custom)** | 2-Spalten mit Glow-Effekt, Purple/Red Borders, Checks/X Icons | Inline ~1322-1400+ |

## Wiederverwendbare Animations-Hooks

| Hook/Utility | Beschreibung | Zeilen |
|---|---|---|
| `useScrollAnimation` | IntersectionObserver, disabled on mobile option | ~66-101 |
| `useCountUp` | Zaehlt Zahl hoch mit easing wenn sichtbar | ~106-140 |
| `AnimatedProgressBar` | Animierte Fortschrittsbalken mit delay | ~145-176 |
| `AnimatedStatCard` | Zaehler-Card mit useCountUp | ~181-202 |
| `AnimatedSection` | Wrapper mit fade+slide Scroll-Reveal | ~280-304 |
| `StaggeredContainer` | Kinder nacheinander einblenden | ~306-334 |

## Content-basierte Sektionen (Library-Bausteine MIT altem Content)

Diese nutzen die generischen Library-Bausteine, aber mit Content aus `config/content.ts`.
Import-Referenzen stehen in `./legacy-sections-reference.tsx`.

| Section | Library-Baustein | Content |
|---|---|---|
| Trust Metrics | `sections/social-proof/trust-metrics` | `trustMetrics` |
| Problem Cards | `sections/conversion/problem-cards` | `problemSection` |
| Comparison Table | `sections/content/comparison-table` | `outcomes` |
| Feature Grid | `sections/content/feature-grid` | `solutionPreview` |
| CTA Inline | `cta/cta-inline` | `ctaInline.primary` |
| Services Tabs | `sections/conversion/services-tabs` | `services` |
| Steps Grid | `sections/content/steps-grid` | `flowstackSystem` |
| Target Audience | `sections/conversion/target-audience` | `targetAudience` |
| Team Section | `sections/info/team-section` | `teamContent` |
| CTA Final | `cta/cta-final` | `finalCta` |

## Wie Legacy-Elemente wiederverwenden

Option 1: Direkt aus HomePage.tsx kopieren (schnell, dirty)
Option 2: Als eigenstaendige Komponente in `library/legacy/` extrahieren (sauber)
Option 3: Neue Premium-Version in `library/sections/` bauen die besser ist
