/**
 * Flowstack Landing Page - Conversion-optimiert
 * Struktur: fulfillment-system.de | Design: Flowstack Library Components
 */

import { useState, useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import {
  Zap, Check, X, ArrowRight, ChevronDown, Menu, Clock,
  Users, Bot, Target, Shield, FileText, RefreshCw,
  TrendingUp, Sparkles, AlertCircle, Linkedin, Mail, MapPin,
  BarChart3, Workflow, PenTool, Headphones, MousePointer,
} from "lucide-react"
import { HeroSection } from "@/library/heroes/hero-section-dark"
import { Timeline } from "@/library/sections/content/timeline"
import { Footer2 } from "@/library/navigation/footer2"
import { AnimatedGroup } from "@/components/ui/animated-group"

// ─── Scroll Animation Hook ───
const useScrollAnimation = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setIsVisible(true) }, { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return { ref, isVisible }
}

const AnimatedSection = ({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) => {
  const { ref, isVisible } = useScrollAnimation()
  return (
    <div ref={ref} className={`transition-all duration-700 ease-out ${className}`} style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(40px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

// ─── Content Data ───
const tools = [
  { name: "Make", logo: "https://cdn.simpleicons.org/make/ffffff" },
  { name: "Airtable", logo: "https://cdn.simpleicons.org/airtable/ffffff" },
  { name: "Notion", logo: "https://cdn.simpleicons.org/notion/ffffff" },
  { name: "Slack", logo: "https://cdn.simpleicons.org/slack/ffffff" },
  { name: "Zapier", logo: "https://cdn.simpleicons.org/zapier/ffffff" },
  { name: "HubSpot", logo: "https://cdn.simpleicons.org/hubspot/ffffff" },
  { name: "OpenAI", logo: "https://cdn.simpleicons.org/openai/ffffff" },
  { name: "n8n", logo: "https://cdn.simpleicons.org/n8n/ffffff" },
]

const problems = [
  { icon: <Clock className="w-6 h-6" />, title: "10+ Stunden pro Woche", desc: "verschwendest du mit manuellen Routineaufgaben, die eine KI in Sekunden erledigt." },
  { icon: <Users className="w-6 h-6" />, title: "Jeder neue Kunde = neue Kosten", desc: "Mehr Umsatz, aber nicht mehr Gewinn. Deine Umsatzrendite stagniert bei 15-25%." },
  { icon: <AlertCircle className="w-6 h-6" />, title: "Du bist der Engpass", desc: "Ohne dich läuft nichts. Urlaub? Krankheit? Dann steht alles still." },
]

const features = [
  { icon: <Workflow className="w-7 h-7" />, title: "Automatisiertes Fulfillment", desc: "Vom Onboarding bis zur fertigen Dienstleistung, komplett automatisiert in unter 10 Minuten.", items: ["Kunden-Onboarding", "Aufgabenverteilung", "Qualitätskontrolle"] },
  { icon: <Bot className="w-7 h-7" />, title: "KI-gestützte Prozesse", desc: "GPT-4 analysiert, erstellt und optimiert deine Arbeit automatisch.", items: ["Content-Erstellung", "Lead-Qualifizierung", "Report-Generierung"] },
  { icon: <BarChart3 className="w-7 h-7" />, title: "Live-Reporting", desc: "Alle KPIs auf einen Blick. Automatisch generiert, ohne Excel.", items: ["Echtzeit-Dashboards", "Automatische Reports", "Trend-Analysen"] },
  { icon: <Target className="w-7 h-7" />, title: "Lead-Automation", desc: "Von der Anfrage bis zum Abschluss, jeder Schritt automatisiert.", items: ["Lead-Scoring", "Follow-up Sequenzen", "Pipeline-Management"] },
  { icon: <Shield className="w-7 h-7" />, title: "Qualitätssicherung", desc: "Automatische Checks und Freigabe-Workflows für fehlerfreie Ergebnisse.", items: ["Automatische Prüfungen", "Approval-Workflows", "Fehler-Erkennung"] },
  { icon: <FileText className="w-7 h-7" />, title: "Dokument-Automation", desc: "Verträge, Rechnungen, Angebote, alles wird automatisch erstellt und versendet.", items: ["Vertrags-Erstellung", "Automatische Rechnungen", "E-Mail-Sequenzen"] },
]

const comparisons = [
  { without: "Chaos aus Trello, Slack, Excel und Google Docs", with: "Ein System. Ein Login. Volle Kontrolle." },
  { without: "10+ Stunden/Woche für Routineaufgaben", with: "80% weniger manuelle Arbeit durch KI" },
  { without: "Neue Kunden = neue Mitarbeiter = gleiche Marge", with: "5x mehr Kunden ohne Personalaufbau" },
  { without: "Fulfillment hängt an einzelnen Personen", with: "System läuft 24/7, unabhängig von Personen" },
  { without: "Fehler durch manuelle Übergaben", with: "Automatische Qualitätskontrolle bei jedem Schritt" },
]

const kiFeatures = [
  { title: "KI-Content in Sekunden", save: "4-8 Stunden/Woche", desc: "GPT-4 erstellt Texte, Social Posts und Kampagnen-Copy automatisch in deinem Markenton." },
  { title: "Intelligentes Lead-Scoring", save: "3-5 Stunden/Woche", desc: "Die KI bewertet jeden Lead automatisch und priorisiert die mit dem höchsten Abschluss-Potenzial." },
  { title: "Automatische Reports", save: "2-4 Stunden/Woche", desc: "Wöchentliche Performance-Reports werden automatisch erstellt und an dein Team versendet." },
]

const testimonials = [
  { name: "Marcel K.", role: "Geschäftsführer, Digital-Agentur", quote: "Mit Flowstack spare ich mir 2-3 Vollzeitkräfte. Das System läuft einfach, ohne dass ich mich darum kümmern muss.", result: "2-3 Vollzeitkräfte eingespart" },
  { name: "Sarah M.", role: "Gründerin, Marketing-Agentur", quote: "Über 40 Arbeitsstunden pro Woche eingespart. Mein Team kann sich endlich auf das Wesentliche konzentrieren.", result: "40+ Stunden/Woche eingespart" },
  { name: "Tim B.", role: "COO, Recruiting-Agentur", quote: "Endlich weiß jeder im Team, was zu tun ist. Das Onboarding neuer Kunden dauert jetzt 10 Minuten statt 3 Tage.", result: "Onboarding: 3 Tage → 10 Min" },
]

const timelineData = [
  { title: "Schritt 1", content: (
    <div className="space-y-4">
      <h4 className="text-xl font-bold text-white">Kostenlose Prozess-Analyse</h4>
      <p className="text-white/60">In einem 20-minütigen Call analysieren wir deine aktuellen Prozesse und identifizieren die 3 größten Automatisierungs-Potenziale.</p>
      <div className="flex flex-wrap gap-2">
        {["Ist-Analyse", "Potenzial-Bewertung", "Konkreter Fahrplan"].map(t => (
          <span key={t} className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20">{t}</span>
        ))}
      </div>
    </div>
  )},
  { title: "Schritt 2", content: (
    <div className="space-y-4">
      <h4 className="text-xl font-bold text-white">System-Aufbau (2-4 Wochen)</h4>
      <p className="text-white/60">Wir bauen dein maßgeschneidertes Flowstack-System. Du lehnst dich zurück, während wir alles einrichten, testen und optimieren.</p>
      <div className="flex flex-wrap gap-2">
        {["Workflow-Design", "KI-Integration", "Testing & QA"].map(t => (
          <span key={t} className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20">{t}</span>
        ))}
      </div>
    </div>
  )},
  { title: "Schritt 3", content: (
    <div className="space-y-4">
      <h4 className="text-xl font-bold text-white">Live-Schaltung & Übergabe</h4>
      <p className="text-white/60">Dein System geht live. Wir schulen dein Team und begleiten die ersten 2 Wochen intensiv, bis alles reibungslos läuft.</p>
      <div className="flex flex-wrap gap-2">
        {["Team-Schulung", "2 Wochen Support", "Optimierung"].map(t => (
          <span key={t} className="px-3 py-1 bg-purple-500/10 text-purple-400 rounded-full text-sm border border-purple-500/20">{t}</span>
        ))}
      </div>
    </div>
  )},
]

// ─── CTA Button Component ───
const CtaButton = ({ className = "", size = "lg" }: { className?: string; size?: "md" | "lg" }) => (
  <Link
    to="/kostenlose-beratung"
    className={`group inline-flex items-center gap-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold rounded-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/30 ${size === "lg" ? "px-8 py-4 text-lg" : "px-6 py-3 text-base"} ${className}`}
  >
    Jetzt kostenlose Prozess-Analyse sichern
    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
  </Link>
)

// ─── MAIN COMPONENT ───
export const FlowstackLanding = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const allTools = [...tools, ...tools]

  const faqItems = [
    { q: "Wie lange dauert die Implementierung?", a: "In der Regel 2-4 Wochen. Wir übernehmen den kompletten Aufbau, du musst nur für die Prozess-Analyse verfügbar sein." },
    { q: "Muss ich meine bestehenden Tools ersetzen?", a: "Nein. Das Flowstack-System integriert sich nahtlos in deine bestehende Tool-Landschaft (Slack, Notion, HubSpot, etc.)." },
    { q: "Was kostet das Flowstack-System?", a: "Das hängt vom Umfang ab. In der kostenlosen Prozess-Analyse besprechen wir, was für dich sinnvoll ist und erstellen ein transparentes Angebot." },
    { q: "Funktioniert das auch für kleine Agenturen?", a: "Ja, ab 3-5 Mitarbeitern ist Automation sinnvoll. Die meisten unserer Kunden haben 5-30 Mitarbeiter." },
    { q: "Was passiert, wenn etwas nicht funktioniert?", a: "Wir begleiten dich in den ersten 2 Wochen nach Live-Schaltung intensiv. Danach hast du einen direkten Draht zu unserem Support-Team." },
  ]

  return (
    <div className="bg-[#0a0a0e] text-gray-100 min-h-screen overflow-x-hidden antialiased">

      {/* ═══════════════ NAVBAR ═══════════════ */}
      <nav className="fixed top-0 left-0 right-0 z-50">
        <div className="mx-4 mt-4">
          <div className="max-w-7xl mx-auto bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl px-4 md:px-6 py-3">
            <div className="flex items-center justify-between">
              <Link to="/" className="flex items-center gap-2 md:gap-3">
                <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                  <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <span className="text-lg md:text-xl font-bold text-white">Flowstack</span>
              </Link>
              <div className="hidden md:flex items-center gap-1">
                {["Funktionen", "Prozess", "Ergebnisse", "FAQ"].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all font-medium text-sm">{item}</a>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Link to="/kostenlose-beratung" className="hidden md:flex group bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all items-center gap-2">
                  Demo-Call buchen <ArrowRight className="w-4 h-4" />
                </Link>
                <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-400 hover:text-white rounded-xl">
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
            {mobileMenuOpen && (
              <div className="md:hidden mt-4 pt-4 border-t border-gray-800/50 flex flex-col gap-2">
                {["Funktionen", "Prozess", "Ergebnisse", "FAQ"].map(item => (
                  <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl font-medium">{item}</a>
                ))}
                <Link to="/kostenlose-beratung" onClick={() => setMobileMenuOpen(false)} className="mt-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold text-center">Demo-Call buchen</Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* ═══════════════ HERO (Library: HeroSection Dark) ═══════════════ */}
      <section className="relative pt-32 pb-20">
        <HeroSection
          title="Flowstack Systems"
          subtitle={{ regular: "Deine komplette Agentur-Dienstleistung automatisieren und ", gradient: "mindestens 10-15 Stunden pro Woche einsparen." }}
          description="Ohne neuen Mitarbeiter einzustellen. Ohne monatelange Einrichtung. Ohne deine Prozesse komplett umzustellen."
          ctaText="Jetzt kostenlose Prozess-Analyse sichern"
          ctaHref="/kostenlose-beratung"
          gridOptions={{ angle: 65, cellSize: 60, opacity: 0.3, darkLineColor: "#7c3aed33" }}
        />
        {/* Extra Bullets under hero */}
        <div className="max-w-4xl mx-auto px-6 mt-12">
          <div className="grid sm:grid-cols-2 gap-4">
            {["80-90% weniger Routineaufgaben durch KI-Workflows", "In 10 Minuten vom Onboarding zur fertigen Dienstleistung", "Fulfillment läuft automatisch, 24/7, ohne Ausfall", "Bis zu 5x mehr Kunden ohne Personalkosten-Steigerung"].map((point, i) => (
              <div key={i} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                  <Check className="w-4 h-4 text-purple-400" />
                </div>
                <span className="text-gray-300">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ LOGO MARQUEE ═══════════════ */}
      <section className="py-16 border-y border-gray-800/50 overflow-hidden">
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-500 mb-10">Wir arbeiten mit führenden Tools</p>
        <div className="relative">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-[#0a0a0e] to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#0a0a0e] to-transparent z-10" />
          <div className="flex animate-marquee">
            {allTools.map((tool, i) => (
              <div key={`${tool.name}-${i}`} className="flex-shrink-0 mx-12 flex items-center justify-center">
                <img src={tool.logo} alt={tool.name} loading="lazy" className="h-8 w-auto object-contain opacity-40 hover:opacity-80 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ WAS IST FLOWSTACK? (Problem + Lösung) ═══════════════ */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold mb-6 border border-purple-500/20">Was ist Flowstack?</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">Das EINZIGE System, das du wirklich brauchst</h2>
            <p className="text-xl text-gray-400 leading-relaxed">
              Wir haben über 60 Agenturen analysiert. Das Ergebnis: 80% der Arbeitszeit fließt in Routineaufgaben, die eine KI besser, schneller und fehlerfreier erledigt. Flowstack automatisiert genau diese Prozesse.
            </p>
          </AnimatedSection>

          <AnimatedSection>
            <div className="grid md:grid-cols-3 gap-6">
              {problems.map((p, i) => (
                <div key={i} className="bg-gray-900/50 p-8 rounded-2xl border border-gray-800/50 hover:border-red-500/30 transition-all group">
                  <div className="w-14 h-14 bg-red-500/10 rounded-2xl flex items-center justify-center mb-6 text-red-400 group-hover:scale-110 transition-transform">{p.icon}</div>
                  <h3 className="text-lg font-bold text-white mb-2">{p.title}</h3>
                  <p className="text-gray-400 text-sm">{p.desc}</p>
                </div>
              ))}
            </div>
          </AnimatedSection>

          {/* CTA after section */}
          <AnimatedSection className="text-center mt-12">
            <CtaButton size="md" />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════ OHNE vs. MIT FLOWSTACK ═══════════════ */}
      <section className="py-24 bg-gray-900/30">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Was Flowstack für einen <span className="text-purple-400">Unterschied</span> macht</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="rounded-2xl border border-gray-800/50 overflow-hidden">
              {/* Header */}
              <div className="grid grid-cols-2 bg-gray-900/80">
                <div className="p-5 text-center border-r border-gray-800/50">
                  <div className="flex items-center gap-2 justify-center">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="font-medium text-red-400">Ohne Flowstack</span>
                  </div>
                </div>
                <div className="p-5 text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <Sparkles className="w-5 h-5 text-purple-400" />
                    <span className="font-medium text-purple-400">Mit Flowstack</span>
                  </div>
                </div>
              </div>
              {/* Rows */}
              {comparisons.map((row, i) => (
                <div key={i} className="grid grid-cols-2 border-t border-gray-800/50">
                  <div className="p-5 lg:p-6 border-r border-gray-800/50 bg-red-950/10">
                    <div className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm">{row.without}</span>
                    </div>
                  </div>
                  <div className="p-5 lg:p-6 bg-purple-500/5">
                    <div className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-white text-sm">{row.with}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>

          <AnimatedSection className="text-center mt-12">
            <CtaButton size="md" />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════ FEATURE CARDS (6er Grid) ═══════════════ */}
      <section id="funktionen" className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold mb-4 border border-purple-500/20">Funktionen</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Alle Bereiche, komplett automatisiert.</h2>
          </AnimatedSection>

          <AnimatedGroup preset="blur-slide" className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 group">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">{f.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm mb-6">{f.desc}</p>
                <ul className="space-y-2">
                  {f.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </AnimatedGroup>
        </div>
      </section>

      {/* ═══════════════ INTEGRATIONEN ═══════════════ */}
      <section className="py-24 bg-gray-900/30">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Integriert sich in deine bestehenden Tools</h2>
            <p className="text-xl text-gray-400">Kein Tool-Wechsel nötig. Flowstack verbindet sich nahtlos mit allem, was du bereits nutzt.</p>
          </AnimatedSection>
          <AnimatedSection>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-6 mb-12">
              {tools.map((tool, i) => (
                <div key={i} className="flex flex-col items-center gap-2 group">
                  <div className="w-14 h-14 bg-gray-800/50 rounded-2xl flex items-center justify-center border border-gray-700/50 group-hover:border-purple-500/30 transition-all">
                    <img src={tool.logo} alt={tool.name} className="w-7 h-7 object-contain opacity-60 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <span className="text-xs text-gray-500">{tool.name}</span>
                </div>
              ))}
            </div>
          </AnimatedSection>
          <AnimatedSection className="text-center">
            <CtaButton size="md" />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════ KI-TURBOS ═══════════════ */}
      <section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold mb-4 border border-purple-500/20">KI-Power</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">KI-Turbos für dein Fulfillment</h2>
            <p className="text-xl text-gray-400">Das ist kein Feature. Das ist dein unfairer Marktvorteil.</p>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {kiFeatures.map((f, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800/50 hover:border-purple-500/30 transition-all h-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-semibold mb-6 border border-emerald-500/20">
                    <TrendingUp className="w-4 h-4" />
                    {f.save} gespart
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
                  <p className="text-gray-400">{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <CtaButton size="md" />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════ IMPLEMENTIERUNG (Library: Timeline) ═══════════════ */}
      <section id="prozess">
        <Timeline data={timelineData} />
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section id="ergebnisse" className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-semibold mb-4 border border-emerald-500/20">Ergebnisse</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">Das sagen unsere Kunden</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <AnimatedSection key={i} delay={i * 100}>
                <div className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800/50 h-full flex flex-col">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold mb-6 border border-purple-500/20 self-start">
                    {t.result}
                  </div>
                  <p className="text-gray-300 leading-relaxed mb-8 flex-1">"{t.quote}"</p>
                  <div className="pt-6 border-t border-gray-800/50">
                    <p className="font-semibold text-white">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ SO STARTEST DU ═══════════════ */}
      <section className="py-24 bg-gray-900/30">
        <div className="max-w-4xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white">In 3 Schritten zum automatisierten Business</h2>
          </AnimatedSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Demo-Call buchen", desc: "Kostenloses 20-Min Gespräch. Wir analysieren deine Prozesse und zeigen dir live, was möglich ist." },
              { step: "2", title: "System-Aufbau", desc: "Wir bauen dein maßgeschneidertes System in 2-4 Wochen. Du lehnst dich zurück." },
              { step: "3", title: "Live & Skalieren", desc: "Dein System läuft. Du gewinnst 10-15+ Stunden pro Woche und kannst endlich skalieren." },
            ].map((s, i) => (
              <AnimatedSection key={i} delay={i * 150}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg shadow-purple-500/20">{s.step}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                  <p className="text-gray-400">{s.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="text-center mt-12">
            <CtaButton />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════ FAQ ═══════════════ */}
      <section id="faq" className="py-24">
        <div className="max-w-3xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <span className="inline-block px-4 py-2 bg-gray-800 text-gray-400 rounded-full text-sm font-semibold mb-4">FAQ</span>
            <h2 className="text-3xl md:text-4xl font-bold text-white">Häufig gestellte Fragen</h2>
          </AnimatedSection>

          <AnimatedSection>
            <div className="space-y-4">
              {faqItems.map((faq, i) => (
                <div key={i} className="bg-gray-900/50 rounded-2xl border border-gray-800/50 overflow-hidden hover:border-gray-700 transition-all">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                    <span className="font-semibold text-white pr-4">{faq.q}</span>
                    <div className={`w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openFaq === i ? "bg-purple-500/20 rotate-180" : ""}`}>
                      <ChevronDown className={`w-5 h-5 transition-colors ${openFaq === i ? "text-purple-400" : "text-gray-500"}`} />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${openFaq === i ? "max-h-96" : "max-h-0"}`}>
                    <div className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════ FINAL CTA (Urgency) ═══════════════ */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0e] via-purple-950/20 to-[#0a0a0e]" />
        <div className="absolute inset-0 hidden md:block">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <AnimatedSection className="text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">Dein manuelles Fulfillment frisst Zeit, Geld und Nerven.</h2>
            <p className="text-2xl md:text-3xl font-bold text-purple-400 mb-8">In 20 Minuten zeigen wir dir, wie du das ab morgen stoppst.</p>

            <div className="bg-gray-900/50 rounded-3xl p-8 lg:p-10 border border-gray-800/50 backdrop-blur-sm max-w-2xl mx-auto mb-8">
              <ul className="space-y-4 mb-8 text-left">
                {[
                  "Welche 3 Prozesse du zuerst automatisieren solltest",
                  "Wie viel Zeit und Geld du damit sparst",
                  "Ob Flowstack das Richtige für dich ist",
                  "Konkreter Fahrplan für die nächsten 4 Wochen",
                ].map((b, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-3 h-3 text-purple-400" />
                    </div>
                    <span className="text-gray-300">{b}</span>
                  </li>
                ))}
              </ul>
              <CtaButton className="w-full justify-center" />
              <div className="mt-6 pt-6 border-t border-gray-800 grid grid-cols-3 gap-4 text-center">
                <div className="text-gray-500 text-sm"><span className="block text-lg mb-1">🔒</span>100% kostenlos</div>
                <div className="text-gray-500 text-sm"><span className="block text-lg mb-1">📞</span>Persönlicher Call</div>
                <div className="text-gray-500 text-sm"><span className="block text-lg mb-1">⏱️</span>3-4 Plätze/Woche</div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════════ FOOTER (Library: Footer2) ═══════════════ */}
      <Footer2
        logoTitle="Flowstack"
        tagline="KI-Automatisierung für Agenturen und B2B-Dienstleister."
        menuItems={[
          { title: "Produkt", links: [{ text: "Funktionen", url: "#funktionen" }, { text: "Prozess", url: "#prozess" }, { text: "Ergebnisse", url: "#ergebnisse" }] },
          { title: "Unternehmen", links: [{ text: "Team", url: "#team" }, { text: "FAQ", url: "#faq" }, { text: "Kontakt", url: "mailto:kontakt@flowstack-systems.de" }] },
          { title: "Rechtliches", links: [{ text: "Impressum", url: "/impressum" }, { text: "Datenschutz", url: "/datenschutz" }] },
          { title: "Social", links: [{ text: "LinkedIn", url: "https://linkedin.com" }] },
        ]}
        copyright={`${new Date().getFullYear()} Flowstack Systems. Alle Rechte vorbehalten.`}
      />

      {/* ═══════════════ ANIMATIONS ═══════════════ */}
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .animate-marquee { animation: marquee 30s linear infinite; }
        @keyframes grid { to { transform: translateY(var(--cell-size)); } }
        .animate-grid { animation: grid 15s linear infinite; }
        @media (max-width: 767px) { .animate-marquee { animation-duration: 15s; } }
      `}</style>
    </div>
  )
}

export default FlowstackLanding
