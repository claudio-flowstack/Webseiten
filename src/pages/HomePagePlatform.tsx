import { useEffect, lazy, Suspense, Component, type ReactNode, type ErrorInfo } from "react"
import {
  Zap, BarChart3, Users, Shield, Clock, AlertTriangle,
  Search, PenTool, Rocket, TrendingUp, Headphones, Code,
} from "lucide-react"

// === Navigation ===
import { NavbarFloating } from "@/library/navigation/navbar-floating"
import { Footer2 } from "@/library/navigation/footer2"

// === Heroes ===
import { HeroSection } from "@/library/heroes/hero-section-dark"
import { HeroVideoDialog } from "@/library/heroes/hero-video-dialog"
import { HeroSection as HeroSection2 } from "@/library/heroes/hero-section-2"
import { HeroSection as HeroSection6 } from "@/library/heroes/hero-section-6"
import { GlowyWavesHero } from "@/library/heroes/glowy-waves-hero"

// === Sections: Social Proof ===
import { LogoMarquee } from "@/library/sections/social-proof/logo-marquee"
import { TrustMetrics } from "@/library/sections/social-proof/trust-metrics"
import { Testimonials } from "@/library/sections/social-proof/testimonials"

// === Sections: Content ===
import { ComparisonTable } from "@/library/sections/content/comparison-table"
import { FeatureGrid } from "@/library/sections/content/feature-grid"
import { StepsGrid } from "@/library/sections/content/steps-grid"
import { Timeline } from "@/library/sections/content/timeline"

// === Sections: Conversion ===
import { ProblemCards } from "@/library/sections/conversion/problem-cards"
import { ServicesTabs } from "@/library/sections/conversion/services-tabs"
import { TargetAudience } from "@/library/sections/conversion/target-audience"

// === Sections: Pricing ===
import { BentoPricing } from "@/library/sections/pricing/bento-pricing"

// === Sections: Info ===
import { FaqAccordion } from "@/library/sections/info/faq-accordion"
import { TeamSection } from "@/library/sections/info/team-section"
import { LocationMap } from "@/library/sections/info/expand-map"

// === CTA ===
import { CtaInline } from "@/library/cta/cta-inline"
import { CtaFinal } from "@/library/cta/cta-final"

// === Content (nur fuer Nav + Hero) ===
import { siteConfig, navLinks, tools } from "@/config/content"

// === Lazy (heavy 3D/WebGL) ===
const EtherealBeamsHero = lazy(() => import("@/library/heroes/ethereal-beams-hero"))
const AnimatedShaderHero = lazy(() => import("@/library/heroes/animated-shader-hero"))
const WebGLShader = lazy(() => import("@/library/effects/web-gl-shader").then(m => ({ default: m.WebGLShader })))
const PricingWithChart = lazy(() => import("@/library/sections/pricing/pricing-with-chart"))

// === Error Boundary for 3D ===
class CanvasErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false }
  static getDerivedStateFromError() { return { hasError: true } }
  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("[3D Canvas Error]", error, info)
  }
  render() {
    if (this.state.hasError) return this.props.fallback ?? null
    return this.props.children
  }
}

// === Section Divider ===
function SectionLabel({ label }: { label: string }) {
  return (
    <div className="max-w-7xl mx-auto px-6 pt-20 pb-4">
      <span className="text-xs font-mono uppercase tracking-widest text-indigo-400/60 border border-indigo-400/20 rounded-full px-3 py-1">
        {label}
      </span>
    </div>
  )
}

// Hero container CSS vars
const heroContainerStyle: React.CSSProperties = {
  "--background": "#0a0a0e",
  "--foreground": "#fafafa",
  "--muted-foreground": "#a1a1aa",
  "--accent-foreground": "#e0e7ff",
  "--border": "rgba(255,255,255,0.1)",
} as React.CSSProperties

// ============================================================================
// MAIN PAGE
// ============================================================================

export function HomePage() {
  useEffect(() => {
    const prev = document.body.style.backgroundColor
    document.body.style.backgroundColor = "#000000"
    document.documentElement.classList.add("dark")
    return () => {
      document.body.style.backgroundColor = prev
      document.documentElement.classList.remove("dark")
      document.documentElement.classList.add("light")
    }
  }, [])

  return (
    <main className="dark bg-[#0a0a0e] min-h-screen text-gray-100">

      {/* ============================================================
          TEIL 1: Alle Premium-Komponenten Showcase
          ============================================================ */}

      {/* --- NAVIGATION --- */}
      <SectionLabel label="NavbarFloating" />
      <NavbarFloating
        logo="Flowstack"
        navItems={navLinks}
        ctaText={siteConfig.cta.text}
        ctaHref={siteConfig.cta.href}
      />

      {/* --- HERO DARK --- */}
      <SectionLabel label="HeroSection (Dark)" />
      <HeroSection
        title={siteConfig.name}
        subtitle={{ regular: siteConfig.title + " ", gradient: "mit KI-Automation" }}
        description={siteConfig.tagline}
        ctaText={siteConfig.cta.text}
        ctaHref={siteConfig.cta.href}
      />

      {/* --- LOGO MARQUEE --- */}
      <SectionLabel label="LogoMarquee" />
      <LogoMarquee
        logos={tools}
        label="Wir arbeiten mit führenden Tools"
        speed={30}
      />

      {/* --- TRUST METRICS --- */}
      <SectionLabel label="TrustMetrics" />
      <TrustMetrics
        metrics={[
          { value: "80%", label: "weniger Routinearbeit" },
          { value: "2-4 Wochen", label: "bis Go-Live" },
          { value: "50%+", label: "Umsatzrendite" },
          { value: "0", label: "Neueinstellungen nötig" },
        ]}
        columns={4}
      />

      {/* --- PROBLEM CARDS --- */}
      <SectionLabel label="ProblemCards" />
      <ProblemCards
        badge="Das Problem"
        headline="Welcher dieser Engpässe bremst dein Wachstum?"
        problems={[
          { icon: <BarChart3 className="w-5 h-5" />, label: "Störfaktor 1", title: "Umsatzrendite schrumpft", description: "Mehr Umsatz, aber nicht mehr Gewinn. Jeder neue Kunde kostet einen neuen Mitarbeiter." },
          { icon: <Clock className="w-5 h-5" />, label: "Störfaktor 2", title: "Team ertrinkt in Routine", description: "60% der Zeit geht für Copy-Paste, Datenpflege und Kleinkram drauf." },
          { icon: <AlertTriangle className="w-5 h-5" />, label: "Störfaktor 3", title: "Qualität schwankt", description: "Kein Standard, keine Konstanz. Ergebnisse hängen von der Tagesform ab." },
        ]}
        columns={3}
      />

      {/* --- COMPARISON TABLE --- */}
      <SectionLabel label="ComparisonTable" />
      <ComparisonTable
        headline="Was unser System für einen Unterschied macht"
        leftLabel="Ohne System"
        rightLabel="Mit Flowstack"
        rows={[
          { without: "15-25% Umsatzrendite", with: "40%+ Umsatzrendite" },
          { without: "Fehler passieren täglich", with: "Fehlerquote nahe null" },
          { without: "4-8 Wochen Fulfillment", with: "Kunde in 10 Minuten abgewickelt" },
          { without: "Fulfillment = Handarbeit", with: "90% Fulfillment = ein Klick" },
          { without: "Mehr Kunden = mehr Leute", with: "Mehr Kunden = gleiche Leute" },
        ]}
      />

      {/* --- FEATURE GRID --- */}
      <SectionLabel label="FeatureGrid" />
      <FeatureGrid
        badge="Features"
        headline="Alle Bereiche, komplett automatisiert."
        features={[
          { icon: <Zap className="w-5 h-5" />, title: "KI-Automatisierung", description: "Strategie, Texte und Kampagnen automatisch generiert." },
          { icon: <BarChart3 className="w-5 h-5" />, title: "Performance Tracking", description: "CPL, Leads, Conversion Rates auf einen Blick." },
          { icon: <Users className="w-5 h-5" />, title: "Multi-Client Management", description: "Beliebig viele Kunden gleichzeitig verwalten." },
        ]}
        columns={3}
      />

      {/* --- HERO VIDEO DIALOG --- */}
      <SectionLabel label="HeroVideoDialog" />
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8 text-white">Sieh selbst, wie es funktioniert</h2>
          <HeroVideoDialog
            videoSrc="https://www.youtube.com/embed/dQw4w9WgXcQ"
            thumbnailSrc="https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=450&fit=crop"
            thumbnailAlt="Flowstack Demo Video"
            animationStyle="from-center"
          />
        </div>
      </div>

      {/* --- CTA INLINE --- */}
      <SectionLabel label="CtaInline" />
      <CtaInline
        headline="Bereit herauszufinden, wie viel Potenzial"
        headlineAccent="in deiner Agentur steckt?"
        bullets={[
          "Welche Prozesse das größte Potenzial haben",
          "Wie viel Zeit und Geld du einsparen kannst",
          "Ob das Flowstack-System für dich Sinn macht",
        ]}
        ctaText="Jetzt Termin wählen"
        cardBadge="Nur wenige Plätze pro Monat"
      />

      {/* --- SERVICES TABS --- */}
      <SectionLabel label="ServicesTabs" />
      <ServicesTabs
        badge="Leistungen"
        headline="Was im Flowstack-System enthalten ist:"
        services={[
          { icon: <Search className="w-5 h-5" />, title: "Prozess-Audit & Strategie", items: ["Vollständiges Audit", "Engpass-Identifikation", "Automatisierungs-Roadmap"] },
          { icon: <PenTool className="w-5 h-5" />, title: "Workflow-Design", items: ["Individuelle Architektur", "KI-Prompt-Engineering", "Dokumentation & SOPs"] },
          { icon: <Code className="w-5 h-5" />, title: "Done-for-You Implementation", items: ["Komplette Umsetzung", "n8n/Make Workflows", "API-Anbindungen"] },
          { icon: <Rocket className="w-5 h-5" />, title: "Go-Live & Feinabstimmung", items: ["Testing", "Team-Einweisung", "14 Tage Feinabstimmung"] },
          { icon: <Headphones className="w-5 h-5" />, title: "Ongoing Support", items: ["Check-in Calls", "Priorisierter Support", "Workflow-Optimierung"] },
        ]}
        ctaText="Jetzt Prozess-Analyse sichern"
        ctaHref="/kostenlose-beratung"
      />

      {/* --- STEPS GRID --- */}
      <SectionLabel label="StepsGrid" />
      <StepsGrid
        headline="Der Weg zu 50%+ Umsatzrendite in 4 Stufen"
        steps={[
          { title: "Analyse", description: "Wir finden die größten Zeitfresser in deiner Agentur." },
          { title: "Architektur", description: "Wir übersetzen deine Prozesse in ein automatisiertes System." },
          { title: "Automation", description: "Done-for-You Implementation durch unser Team." },
          { title: "Skalierung", description: "Kontinuierliche Optimierung und Erweiterung." },
        ]}
        columns={4}
      />

      {/* --- TIMELINE --- */}
      <SectionLabel label="Timeline" />
      <Timeline
        data={[
          { title: "Prozess-Analyse", content: <p className="text-neutral-400 text-sm">15-20 Min Call, größte Hebel identifizieren.</p> },
          { title: "Strategie-Session", content: <p className="text-neutral-400 text-sm">60-90 Min Deep-Dive, konkrete Roadmap.</p> },
          { title: "Kick-Off", content: <p className="text-neutral-400 text-sm">Individuelles Angebot, sofortiger Projektstart.</p> },
          { title: "Implementation", content: <p className="text-neutral-400 text-sm">Wir bauen dein System in 2-4 Wochen.</p> },
          { title: "Go-Live", content: <p className="text-neutral-400 text-sm">System geht live, wir optimieren weiter.</p> },
        ]}
      />

      {/* --- TARGET AUDIENCE --- */}
      <SectionLabel label="TargetAudience" />
      <TargetAudience
        headline="Das Flowstack-System ist nicht für jeden."
        forYouItems={[
          "Du führst eine Agentur mit 15.000€+ Monatsumsatz",
          "Du willst mehr Kunden ohne mehr Mitarbeiter",
          "Du siehst Automation als Investment",
        ]}
        notForYouItems={[
          "Dein Umsatz liegt unter 10.000€",
          "Jedes Projekt ist 100% individuell",
          "Du suchst ein günstiges DIY-Tool",
        ]}
        ctaButton="Jetzt Potenzial-Check starten"
        ctaHref="/kostenlose-beratung"
      />

      {/* --- TESTIMONIALS --- */}
      <SectionLabel label="Testimonials" />
      <Testimonials
        badge="Ergebnisse"
        headline="Das sagen unsere Kunden"
        testimonials={[
          { name: "Max M.", role: "Social Media Agentur", quote: "Wir betreuen jetzt 45 Kunden mit weniger Aufwand als vorher bei 30.", result: "73% weniger Zeitaufwand" },
          { name: "Sandra L.", role: "Recruiting Agentur", quote: "Kunden sind in 2 Tagen live statt 2 Wochen.", result: "Onboarding in 48h" },
          { name: "Tom R.", role: "Performance Agentur", quote: "Unsere Kunden fragen nicht mehr nach dem Stand. Sie wissen es.", result: "85% weniger Rückfragen" },
        ]}
        columns={3}
      />

      {/* --- TEAM SECTION --- */}
      <SectionLabel label="TeamSection" />
      <TeamSection
        badge="Über uns"
        headline="Die Köpfe hinter Flowstack"
        members={[
          { name: "Claudio Di Franco", role: "Gründer & Systemarchitekt", bio: "Hat selbst eine Agentur aufgebaut und dabei gelernt, dass mehr Kunden nicht mehr Chaos bedeuten muss.", image: "/claudio.jpg" },
          { name: "Anak Wannaphaschaiyong", role: "Automation & AI Engineer", bio: "Machine Learning Spezialist mit Master der Florida Atlantic University. Baut Systeme die unter Last performen.", image: "/anak.jpg" },
        ]}
      />

      {/* --- BENTO PRICING --- */}
      <SectionLabel label="BentoPricing" />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-indigo-400 bg-indigo-400/10 rounded-full px-3 py-1">Preise</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mt-6">Transparente Preise, keine versteckten Kosten</h2>
          </div>
          <BentoPricing />
        </div>
      </section>

      {/* --- FAQ ACCORDION --- */}
      <SectionLabel label="FaqAccordion" />
      <FaqAccordion
        badge="FAQ"
        headline="Häufig gestellte Fragen"
        items={[
          { question: "Was kostet das Flowstack-System?", answer: "Nach der kostenlosen Prozess-Analyse erstellen wir ein individuelles Angebot. Die meisten Kunden erreichen den ROI innerhalb von 60-90 Tagen." },
          { question: "Wie lange dauert die Implementation?", answer: "2-4 Wochen, abhängig vom Projektumfang. Erste Ergebnisse oft schon nach wenigen Tagen." },
          { question: "Muss ich technisch fit sein?", answer: "Nein. Wir machen alles Done-for-You. Null Technik-Skills erforderlich." },
          { question: "Was wenn etwas nicht funktioniert?", answer: "14 Tage Feinabstimmung nach Go-Live ohne Zusatzkosten." },
        ]}
      />

      {/* --- LOCATION MAP --- */}
      <SectionLabel label="LocationMap" />
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center">
          <h2 className="text-2xl font-bold text-white mb-8">Unser Standort</h2>
          <LocationMap
            location="Köln, Deutschland"
            coordinates="50.9375° N, 6.9603° O"
          />
        </div>
      </section>

      {/* --- CTA FINAL --- */}
      <SectionLabel label="CtaFinal" />
      <CtaFinal
        headline="Bereit für eine Agentur, die für dich arbeitet"
        headlineAccent="statt umgekehrt?"
        bullets={[
          "15-20 Minuten Call mit einem Experten",
          "Analyse deiner 3 größten Hebel",
          "Ehrliche Antwort, ob wir helfen können",
        ]}
        ctaText="Jetzt kostenlose Prozess-Analyse sichern"
        ctaHref="/kostenlose-beratung"
        trustItems={[
          { emoji: "🔒", label: "100% kostenlos und unverbindlich" },
          { emoji: "📞", label: "Persönlicher Call" },
          { emoji: "⏱️", label: "Nur 3-4 Plätze pro Woche" },
        ]}
      />

      {/* --- FOOTER --- */}
      <SectionLabel label="Footer2" />
      <Footer2
        logoTitle="Flowstack"
        tagline="KI-Automatisierung für Agenturen."
      />

      {/* ============================================================
          TEIL 2: Hero Showcase (alle Hero-Varianten)
          ============================================================ */}

      <div className="border-t-2 border-indigo-500/30">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <h2 className="text-4xl font-bold text-white mb-2">Hero Showcase</h2>
          <p className="text-neutral-400">Alle verfügbaren Hero-Varianten aus der Bibliothek</p>
        </div>
      </div>

      {/* Glowy Waves Hero */}
      <SectionLabel label="GlowyWavesHero" />
      <GlowyWavesHero />

      {/* Ethereal Beams Hero */}
      <SectionLabel label="EtherealBeamsHero" />
      <CanvasErrorBoundary fallback={<div className="h-[600px] bg-neutral-900 flex items-center justify-center text-neutral-500">3D nicht verfügbar</div>}>
        <Suspense fallback={<div className="h-[600px] bg-neutral-900 animate-pulse" />}>
          <EtherealBeamsHero />
        </Suspense>
      </CanvasErrorBoundary>

      {/* Hero Section 2 */}
      <SectionLabel label="HeroSection2 (Blur-Slide)" />
      <div className="relative overflow-hidden" style={heroContainerStyle}>
        <style>{`.hero-scope-2 header, .hero-scope-2 nav { position: relative !important; z-index: auto !important; }`}</style>
        <div className="hero-scope-2">
          <HeroSection2 />
        </div>
      </div>

      {/* Hero Section 6 (Split Email) */}
      <SectionLabel label="HeroSection6 (Split Email)" />
      <div className="relative overflow-hidden" style={heroContainerStyle}>
        <style>{`.hero-scope-6 header, .hero-scope-6 nav { position: relative !important; z-index: auto !important; }`}</style>
        <div className="hero-scope-6">
          <HeroSection6 />
        </div>
      </div>

      {/* Animated Shader Hero */}
      <SectionLabel label="AnimatedShaderHero" />
      <CanvasErrorBoundary fallback={<div className="h-[600px] bg-neutral-900 flex items-center justify-center text-neutral-500">WebGL nicht verfügbar</div>}>
        <Suspense fallback={<div className="h-[600px] bg-neutral-900 animate-pulse" />}>
          <AnimatedShaderHero
            headline={{ line1: "KI-Automation", line2: "für Agenturen" }}
            subtitle="Automatisiere 80% deiner Routinearbeit. Done-for-You in 2-4 Wochen."
            trustBadge={{ text: "Flowstack Systems" }}
            buttons={{
              primary: { text: "Prozess-Analyse sichern" },
              secondary: { text: "Mehr erfahren" },
            }}
          />
        </Suspense>
      </CanvasErrorBoundary>

      {/* WebGL Shader Effect */}
      <SectionLabel label="WebGLShader (Effect)" />
      <div className="relative h-[500px] overflow-hidden">
        <CanvasErrorBoundary fallback={<div className="h-[500px] bg-neutral-900 flex items-center justify-center text-neutral-500">WebGL nicht verfügbar</div>}>
          <Suspense fallback={<div className="h-[500px] bg-neutral-900 animate-pulse" />}>
            <WebGLShader />
          </Suspense>
        </CanvasErrorBoundary>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <h3 className="text-3xl font-bold text-white/80">WebGL Shader Background</h3>
        </div>
      </div>

      {/* Pricing with Chart */}
      <SectionLabel label="PricingWithChart" />
      <CanvasErrorBoundary fallback={<div className="h-[400px] bg-neutral-900 flex items-center justify-center text-neutral-500">Chart nicht verfügbar</div>}>
        <Suspense fallback={<div className="h-[400px] bg-neutral-900 animate-pulse" />}>
          <PricingWithChart />
        </Suspense>
      </CanvasErrorBoundary>

    </main>
  )
}
