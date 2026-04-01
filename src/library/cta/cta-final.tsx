/**
 * @baustein CTA Final
 * @zweck Full-Width Urgency CTA am Seitenende mit Glow-Hintergrund
 * @geeignet-fuer Bottom CTA, Urgency, Abschluss-Sektion
 * @stil Dark Theme, Purple Gradient Glow, Bullet-Liste, Trust-Icons
 */

import { Check, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

interface CtaFinalProps {
  headline?: string
  headlineAccent?: string
  subheadline?: string
  bullets?: string[]
  ctaText?: string
  ctaHref?: string
  trustItems?: { emoji: string; label: string }[]
  sideContent?: React.ReactNode
}

export function CtaFinal({
  headline = "Bereit herauszufinden, wie viel",
  headlineAccent = "Potenzial in deinem Business steckt?",
  subheadline,
  bullets = [],
  ctaText = "Jetzt kostenlose Prozess-Analyse sichern",
  ctaHref = "/kostenlose-beratung",
  trustItems = [
    { emoji: "🔒", label: "100% kostenlos" },
    { emoji: "📞", label: "Persönlicher Call" },
    { emoji: "⏱️", label: "3-4 Plätze/Woche" },
  ],
  sideContent,
}: CtaFinalProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0e] via-purple-950/20 to-[#0a0a0e]" />
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold mb-6 border border-purple-500/20">Limitierte Plätze</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{headline}</h2>
          {headlineAccent && <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-400 mb-6">{headlineAccent}</h3>}
          {subheadline && <p className="text-xl text-gray-400 max-w-2xl mx-auto">{subheadline}</p>}
        </div>

        <div className={`grid ${sideContent ? "lg:grid-cols-2" : ""} gap-8 items-center`}>
          {sideContent && <div>{sideContent}</div>}

          <div className={`bg-gray-900/50 rounded-3xl p-8 lg:p-10 border border-gray-800/50 backdrop-blur-sm ${sideContent ? "" : "max-w-2xl mx-auto"}`}>
            {bullets.length > 0 && (
              <>
                <h4 className="text-xl font-bold text-white mb-6">Das erwartet dich:</h4>
                <ul className="space-y-4 mb-8">
                  {bullets.map((bullet, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                        <Check className="w-3 h-3 text-purple-400" />
                      </div>
                      <span className="text-gray-300">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            <Link to={ctaHref} className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-5 rounded-xl font-semibold text-lg hover:shadow-2xl hover:shadow-purple-500/30 transition-all hover:-translate-y-1">
              {ctaText}
              <ArrowRight className="w-5 h-5" />
            </Link>

            {trustItems.length > 0 && (
              <div className={`mt-6 pt-6 border-t border-gray-800 grid grid-cols-${trustItems.length} gap-4 text-center`}>
                {trustItems.map((item, i) => (
                  <div key={i} className="text-gray-500 text-sm">
                    <span className="block text-lg mb-1">{item.emoji}</span>
                    {item.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
