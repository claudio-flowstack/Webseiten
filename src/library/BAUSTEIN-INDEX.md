# Baustein-Index (Komponenten-Bibliothek)

> Alle verfuegbaren Bausteine, organisiert nach Kategorie. Neue Premium-Komponenten getrennt von Legacy.

## Heroes (`heroes/`)

| Komponente | Datei | Geeignet fuer |
|---|---|---|
| **Hero Dark** | `hero-section-dark.tsx` | SaaS, Produkt-Launch, Landingpages |
| **Hero Video Dialog** | `hero-video-dialog.tsx` | Produkt-Demo, Erklaervideo |
| **Hero Section 2** | `hero-section-2.tsx` | B2B, Dev-Tools (Blur-Slide) |
| **Hero Section 6** | `hero-section-6.tsx` | Newsletter, SaaS (Split Email) |
| **Glowy Waves** | `glowy-waves-hero.tsx` | Creative, Premium |
| **Ethereal Beams** | `ethereal-beams-hero.tsx` | Tech, KI, Premium (3D, lazy) |
| **Animated Shader** | `animated-shader-hero.tsx` | Tech, Premium (WebGL, lazy) |

## Sections: Social Proof (`sections/social-proof/`)

| Komponente | Datei | Props |
|---|---|---|
| **Logo Marquee** | `logo-marquee.tsx` | `logos[], label, speed` |
| **Trust Metrics** | `trust-metrics.tsx` | `metrics[], columns` |
| **Testimonials** | `testimonials.tsx` | `testimonials[], badge, headline` |

## Sections: Content (`sections/content/`)

| Komponente | Datei | Props |
|---|---|---|
| **Feature Grid** | `feature-grid.tsx` | `features[], badge, headline` |
| **Comparison Table** | `comparison-table.tsx` | `rows[], headline, leftLabel, rightLabel` |
| **Steps Grid** | `steps-grid.tsx` | `steps[], headline, columns` |
| **Timeline** | `timeline.tsx` | `data[]` (title + content ReactNode) |

## Sections: Conversion (`sections/conversion/`)

| Komponente | Datei | Props |
|---|---|---|
| **Problem Cards** | `problem-cards.tsx` | `problems[], badge, headline` |
| **Services Tabs** | `services-tabs.tsx` | `services[], badge, headline` |
| **Target Audience** | `target-audience.tsx` | `forYouItems[], notForYouItems[]` |

## Sections: Pricing (`sections/pricing/`)

| Komponente | Datei | Props |
|---|---|---|
| **Bento Pricing** | `bento-pricing.tsx` | Keine Props (hardcoded) |
| **Pricing with Chart** | `pricing-with-chart.tsx` | Deaktiviert (react-is fehlt) |

## Sections: Info (`sections/info/`)

| Komponente | Datei | Props |
|---|---|---|
| **FAQ Accordion** | `faq-accordion.tsx` | `items[], badge, headline` |
| **Team Section** | `team-section.tsx` | `members[], badge, headline` |
| **Location Map** | `expand-map.tsx` | `location, coordinates` |

## CTA (`cta/`)

| Komponente | Datei | Props |
|---|---|---|
| **CTA Inline** | `cta-inline.tsx` | `headline, bullets[], ctaText` |
| **CTA Final** | `cta-final.tsx` | `headline, bullets[], ctaText, trustItems[]` |

## Navigation (`navigation/`)

| Komponente | Datei | Props |
|---|---|---|
| **Navbar Floating** | `navbar-floating.tsx` | `logo, navItems[], ctaText` |
| **Footer2** | `footer2.tsx` | `logoTitle, tagline, menuItems[]` |

## Effects (`effects/`)

| Komponente | Datei | Props |
|---|---|---|
| **WebGL Shader** | `web-gl-shader.tsx` | Shader Background |

## Legacy (`legacy/`)

Alte Inline-Sektionen aus der Homepage (`/alt-hp`).
Siehe `legacy/LEGACY-INDEX.md` fuer Details.
