/**
 * @baustein Feature Grid
 * @zweck 2-3 Spalten Grid mit Feature-Cards (Icon + Title + Desc + Checklist)
 * @geeignet-fuer Feature-Showcase, Leistungen, Produkt-Bereiche
 * @stil Dark Theme, Purple Accents, Hover-Lift, Check-Items
 */

import { Check } from "lucide-react"

interface FeatureItem {
  icon: React.ReactNode
  title: string
  description: string
  items?: string[]
}

interface FeatureGridProps {
  badge?: string
  headline?: string
  features: FeatureItem[]
  columns?: 2 | 3
}

export function FeatureGrid({
  badge,
  headline = "Alle Bereiche, komplett automatisiert.",
  features,
  columns = 3,
}: FeatureGridProps) {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          {badge && <span className="inline-block px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold mb-4 border border-purple-500/20">{badge}</span>}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{headline}</h2>
        </div>

        <div className={`grid ${gridCols} gap-6`}>
          {features.map((f, i) => (
            <div key={i} className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800/50 hover:border-purple-500/30 transition-all duration-300 hover:-translate-y-1 group">
              <div className="w-14 h-14 bg-gradient-to-br from-purple-500/20 to-purple-600/10 rounded-2xl flex items-center justify-center mb-6 text-purple-400 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{f.title}</h3>
              <p className="text-gray-400 text-sm mb-6">{f.description}</p>
              {f.items && (
                <ul className="space-y-2">
                  {f.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-gray-400">
                      <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
