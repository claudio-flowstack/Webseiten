/**
 * @baustein CTA Inline
 * @zweck 2-Spalten CTA-Sektion (Content links, CTA-Card rechts)
 * @geeignet-fuer Mid-Page CTA, Urgency-Messaging, Lead-Capture
 * @stil Dark Theme, Purple Glow, Gradient Background
 */

import { Check, Clock, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

interface CtaInlineProps {
  headline?: string
  headlineAccent?: string
  description?: string
  bullets?: string[]
  cardTitle?: string
  cardDescription?: string
  cardBadge?: string
  ctaText?: string
  ctaHref?: string
  ctaSubtext?: string
}

export function CtaInline({
  headline = "Der beste Zeitpunkt war gestern.",
  headlineAccent = "Der zweitbeste ist jetzt.",
  description,
  bullets = [],
  cardTitle = "Kostenlose Prozess-Analyse",
  cardDescription = "Finde heraus, wie viel Potenzial in deinem Business steckt.",
  cardBadge = "Nur wenige Plätze pro Monat",
  ctaText = "Jetzt Termin wählen",
  ctaHref = "/kostenlose-beratung",
  ctaSubtext = "Kostenlos und unverbindlich",
}: CtaInlineProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-purple-950/30 via-[#0a0a0e] to-[#0a0a0e] relative overflow-hidden">
      <div className="absolute inset-0 hidden md:block">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">{headline}</h2>
            {headlineAccent && <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-purple-400 mb-8">{headlineAccent}</h3>}
            {description && <p className="text-xl text-gray-400 mb-8">{description}</p>}
            {bullets.length > 0 && (
              <ul className="space-y-4 mb-8">
                {bullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 bg-purple-500/20 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                      <Check className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-white text-lg">{bullet}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-[2rem] blur-xl" />
            <div className="relative bg-gray-900/80 backdrop-blur-sm border border-purple-500/20 rounded-2xl p-8 md:p-10">
              <div className="text-center">
                {cardBadge && (
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 rounded-full text-purple-400 text-sm font-semibold mb-6 border border-purple-500/20">
                    <Clock className="w-4 h-4" />
                    {cardBadge}
                  </div>
                )}
                <h4 className="text-2xl font-bold text-white mb-4">{cardTitle}</h4>
                <p className="text-gray-400 mb-8">{cardDescription}</p>
                <Link to={ctaHref} className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-8 py-5 rounded-xl font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/30">
                  {ctaText}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                {ctaSubtext && <p className="mt-6 text-gray-500 text-sm">{ctaSubtext}</p>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
