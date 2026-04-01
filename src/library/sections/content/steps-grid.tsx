/**
 * @baustein Steps Grid
 * @zweck 3-Spalten Schritte-Grid mit nummerierten Karten
 * @geeignet-fuer Onboarding-Prozess, "So startest du", How-it-Works
 * @stil Dark Theme, Purple Numbered Boxes, Centered Layout
 */

interface Step {
  title: string
  description: string
}

interface StepsGridProps {
  headline?: string
  steps: Step[]
  columns?: 2 | 3 | 4
}

export function StepsGrid({
  headline = "In 3 Schritten zum Ziel",
  steps,
  columns = 3,
}: StepsGridProps) {
  const gridCols = { 2: "md:grid-cols-2", 3: "md:grid-cols-3", 4: "md:grid-cols-2 lg:grid-cols-4" }

  return (
    <section className="py-24 bg-gray-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white">{headline}</h2>
        </div>

        <div className={`grid ${gridCols[columns]} gap-8`}>
          {steps.map((step, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold text-white mx-auto mb-6 shadow-lg shadow-purple-500/20">
                {i + 1}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
