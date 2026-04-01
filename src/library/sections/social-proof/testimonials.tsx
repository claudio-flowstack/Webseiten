/**
 * @baustein Testimonials
 * @zweck Kunden-Zitate als Card-Grid mit Result-Badge
 * @geeignet-fuer Social Proof, Case Studies, Kundenstimmen
 * @stil Dark Theme, Quote Cards, Result Badge, Border Bottom
 */

interface Testimonial {
  name: string
  role: string
  quote: string
  result?: string
  image?: string
}

interface TestimonialsProps {
  badge?: string
  headline?: string
  testimonials: Testimonial[]
  columns?: 2 | 3
}

export function Testimonials({
  badge = "Ergebnisse",
  headline = "Das sagen unsere Kunden",
  testimonials,
  columns = 3,
}: TestimonialsProps) {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-3"

  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          {badge && <span className="inline-block px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-full text-sm font-semibold mb-4 border border-emerald-500/20">{badge}</span>}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{headline}</h2>
        </div>

        <div className={`grid ${gridCols} gap-6`}>
          {testimonials.map((t, i) => (
            <div key={i} className="bg-gray-900/50 p-8 rounded-3xl border border-gray-800/50 h-full flex flex-col">
              {t.result && (
                <span className="inline-flex items-center px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold mb-6 border border-purple-500/20 self-start">
                  {t.result}
                </span>
              )}
              <p className="text-gray-300 leading-relaxed mb-8 flex-1">"{t.quote}"</p>
              <div className="pt-6 border-t border-gray-800/50 flex items-center gap-4">
                {t.image && <img src={t.image} alt={t.name} className="w-10 h-10 rounded-full object-cover" />}
                <div>
                  <p className="font-semibold text-white">{t.name}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
