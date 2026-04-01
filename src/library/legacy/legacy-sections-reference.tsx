/**
 * Legacy Sections Reference
 *
 * Exakte Props-Mappings der alten Homepage-Sektionen.
 * Nicht als Seite gedacht, nur als Referenz wie die Sections
 * zusammengebaut waren. Copy-Paste wenn noetig.
 */

import type { ReactNode } from "react"

// Alle Imports die gebraucht werden:
// import { TrustMetrics } from "@/library/sections/social-proof/trust-metrics"
// import { ProblemCards } from "@/library/sections/problem-cards"
// import { ComparisonTable } from "@/library/sections/comparison-table"
// import { FeatureGrid } from "@/library/sections/feature-grid"
// import { CtaInline } from "@/library/cta/cta-inline"
// import { ServicesTabs } from "@/library/sections/services-tabs"
// import { StepsGrid } from "@/library/sections/steps-grid"
// import { TargetAudience } from "@/library/sections/target-audience"
// import { TeamSection } from "@/library/sections/team-section"
// import { CtaFinal } from "@/library/cta/cta-final"
// import { ... } from "@/config/content"

// Helper: icon(name) → resolves string to Lucide ReactNode
// Nutzt ICON_MAP aus der jeweiligen Seite

// ============================================================================
// 1. TRUST METRICS
// ============================================================================
// <TrustMetrics metrics={trustMetrics.metrics} columns={4} />

// ============================================================================
// 2. PROBLEM CARDS
// ============================================================================
// <ProblemCards
//   badge="Das Problem"
//   headline={problemSection.headline}
//   subheadline={problemSection.subheadline}
//   problems={problemSection.problems.map(p => ({
//     icon: icon(p.icon),
//     label: p.label,
//     title: p.title,
//     description: p.description,
//   }))}
//   columns={3}
// />

// ============================================================================
// 3. COMPARISON TABLE (Vorher/Nachher)
// ============================================================================
// <ComparisonTable
//   headline={outcomes.headline}
//   leftLabel="Ohne System"
//   rightLabel="Mit Flowstack"
//   rows={outcomes.comparison.map(c => ({
//     without: `${c.right.highlight} ${c.right.subtitle}`,
//     with: `${c.left.highlight} ${c.left.subtitle}`,
//   }))}
// />

// ============================================================================
// 4. FEATURE GRID (Die Loesung)
// ============================================================================
// <FeatureGrid
//   badge="Die Lösung"
//   headline="Alle Bereiche, komplett automatisiert."
//   features={solutionPreview.benefits.map(b => ({
//     icon: icon(b.icon),
//     title: b.title,
//     description: b.description,
//   }))}
//   columns={3}
// />

// ============================================================================
// 5. CTA INLINE
// ============================================================================
// <CtaInline
//   headline={ctaInline.primary.headline}
//   bullets={ctaInline.primary.bullets}
//   ctaText={ctaInline.primary.cta}
//   cardBadge="Nur wenige Plätze pro Monat"
// />

// ============================================================================
// 6. SERVICES TABS
// ============================================================================
// <ServicesTabs
//   badge="Leistungen"
//   headline={services.headline}
//   services={services.items.map(s => ({
//     icon: icon(s.icon),
//     title: s.title,
//     items: s.items,
//   }))}
//   ctaText="Jetzt Prozess-Analyse sichern"
//   ctaHref="/kostenlose-beratung"
// />

// ============================================================================
// 7. STEPS GRID (Flowstack System 4 Stufen)
// ============================================================================
// <StepsGrid
//   headline={flowstackSystem.headline}
//   steps={flowstackSystem.stages.map(s => ({
//     title: `${s.title}: ${s.subtitle}`,
//     description: s.description,
//   }))}
//   columns={4}
// />

// ============================================================================
// 8. TARGET AUDIENCE (Nicht fuer jeden)
// ============================================================================
// <TargetAudience
//   headline={targetAudience.headline}
//   forYouItems={targetAudience.requirements}
//   notForYouItems={targetAudience.notFor.items}
//   ctaButton={targetAudience.cta.button}
//   ctaHref="/kostenlose-beratung"
// />

// ============================================================================
// 9. TEAM SECTION
// ============================================================================
// <TeamSection
//   badge="Über uns"
//   headline={teamContent.headline}
//   members={teamContent.members.map(m => ({
//     name: m.name,
//     role: m.role,
//     bio: m.bio,
//     image: m.image,
//   }))}
// />

// ============================================================================
// 10. CTA FINAL
// ============================================================================
// <CtaFinal
//   headline={finalCta.headline}
//   bullets={finalCta.bullets}
//   ctaText={finalCta.cta.text}
//   ctaHref={finalCta.cta.href}
//   trustItems={[
//     { emoji: "🔒", label: "100% kostenlos und unverbindlich" },
//     { emoji: "📞", label: "Persönlicher Call" },
//     { emoji: "⏱️", label: "Nur 3-4 Plätze pro Woche" },
//   ]}
// />

export {}
