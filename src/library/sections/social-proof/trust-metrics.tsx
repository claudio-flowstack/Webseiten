/**
 * @baustein Trust Metrics
 * @zweck 2-4 Spalten Grid mit großen Zahlen und Labels
 * @geeignet-fuer KPI-Anzeige, Trust-Strip, Ergebnisse
 * @stil Dark Theme, Purple Gradient Text, Hover-Lift
 */

interface TrustMetricsProps {
  metrics: { value: string; label: string }[]
  columns?: 2 | 3 | 4
}

export function TrustMetrics({
  metrics,
  columns = 4,
}: TrustMetricsProps) {
  const gridCols = { 2: "grid-cols-2", 3: "grid-cols-3", 4: "grid-cols-2 lg:grid-cols-4" }

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`grid ${gridCols[columns]} gap-4`}>
          {metrics.map((metric, i) => (
            <div key={i} className="group bg-gray-900/50 rounded-3xl p-8 border border-gray-800/50 hover:border-purple-500/30 hover:bg-gray-900/80 transition-all duration-300 hover:-translate-y-1">
              <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-purple-400 bg-clip-text text-transparent mb-2">{metric.value}</p>
              <p className="text-gray-400 font-medium text-sm">{metric.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
