/**
 * @baustein Target Audience
 * @zweck 2-Spalten Vergleich: Für wen geeignet / Nicht geeignet
 * @geeignet-fuer Zielgruppe, Qualifizierung, Für wen ist das
 * @stil Dark Theme, Purple (positiv) vs Red (negativ), Check/X Icons
 */

import { Check, X, Sparkles, ShieldX, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

interface TargetAudienceProps {
  headline?: string
  forYouLabel?: string
  forYouDescription?: string
  forYouItems: string[]
  notForYouLabel?: string
  notForYouDescription?: string
  notForYouItems: string[]
  ctaText?: string
  ctaButton?: string
  ctaHref?: string
}

export function TargetAudience({
  headline = "Für wen ist das geeignet?",
  forYouLabel = "Für dich geeignet",
  forYouDescription,
  forYouItems,
  notForYouLabel = "Nicht für dich geeignet",
  notForYouDescription = "Das System ist nicht das Richtige, wenn:",
  notForYouItems,
  ctaText,
  ctaButton = "Jetzt Prozess-Analyse sichern",
  ctaHref = "/kostenlose-beratung",
}: TargetAudienceProps) {
  return (
    <section className="py-24 bg-gray-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{headline}</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Für dich */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 via-purple-500/30 to-purple-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 md:p-10 rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent backdrop-blur-sm hover:border-purple-500/50 transition-all duration-300 h-full">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 text-purple-400 text-sm font-semibold rounded-full mb-6">
                <Sparkles className="w-4 h-4" />
                {forYouLabel}
              </div>
              {forYouDescription && <p className="text-gray-400 mb-8">{forYouDescription}</p>}
              <ul className="space-y-5">
                {forYouItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30 mt-0.5 flex-shrink-0">
                      <Check className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-gray-300 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Nicht für dich */}
          <div className="group relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-red-500/10 via-red-500/20 to-red-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative p-8 md:p-10 rounded-2xl border border-red-400/20 bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent backdrop-blur-sm hover:border-red-400/40 transition-all duration-300 h-full">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-400/30 text-red-400 text-sm font-semibold rounded-full mb-6">
                <ShieldX className="w-4 h-4" />
                {notForYouLabel}
              </div>
              {notForYouDescription && <p className="text-gray-400 mb-8">{notForYouDescription}</p>}
              <ul className="space-y-5">
                {notForYouItems.map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-400/30 mt-0.5 flex-shrink-0">
                      <X className="w-4 h-4 text-red-400" />
                    </div>
                    <span className="text-gray-400 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="text-center">
          {ctaText && <p className="text-lg text-gray-400 mb-6">{ctaText}</p>}
          <Link to={ctaHref} className="inline-flex items-center gap-3 bg-purple-500 hover:bg-purple-600 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/20">
            {ctaButton}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
