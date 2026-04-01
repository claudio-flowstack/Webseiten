/**
 * @baustein Comparison Table
 * @zweck Ohne/Mit Vergleichstabelle (2 Spalten)
 * @geeignet-fuer Vorher/Nachher, Ohne/Mit Produkt, Konkurrenz-Vergleich
 * @stil Dark Theme, Red (ohne) vs Purple (mit), Desktop Table + Mobile Cards
 */

import { Check, X, AlertCircle, Sparkles, ArrowRight } from "lucide-react"

interface ComparisonRow {
  without: string
  with: string
}

interface ComparisonTableProps {
  headline?: string
  highlightWord?: string
  leftLabel?: string
  rightLabel?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  rows: ComparisonRow[]
}

export function ComparisonTable({
  headline = "Was unser System für einen Unterschied macht",
  highlightWord = "Unterschied",
  leftLabel = "Ohne System",
  rightLabel = "Mit System",
  leftIcon = <AlertCircle className="w-5 h-5 text-red-400" />,
  rightIcon = <Sparkles className="w-5 h-5 text-purple-400" />,
  rows,
}: ComparisonTableProps) {
  const parts = headline.split(highlightWord)

  return (
    <section className="py-24 bg-gray-900/30">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
            {parts[0]}<span className="text-purple-400">{highlightWord}</span>{parts[1] || ""}
          </h2>
        </div>

        {/* Desktop */}
        <div className="hidden md:block rounded-2xl border border-gray-800/50 overflow-hidden">
          <div className="grid grid-cols-[1fr_auto_1fr] bg-gray-900/80">
            <div className="p-5 text-center">
              <div className="flex items-center gap-2 justify-center">
                {leftIcon}
                <span className="font-medium text-red-400">{leftLabel}</span>
              </div>
            </div>
            <div className="flex items-center justify-center px-4">
              <div className="bg-gray-800 border border-purple-500/30 rounded-full p-2">
                <ArrowRight className="w-5 h-5 text-purple-400" />
              </div>
            </div>
            <div className="p-5 text-center">
              <div className="flex items-center gap-2 justify-center">
                {rightIcon}
                <span className="font-medium text-purple-400">{rightLabel}</span>
              </div>
            </div>
          </div>
          {rows.map((row, i) => (
            <div key={i} className="grid grid-cols-2 border-t border-gray-800/50">
              <div className="p-5 lg:p-6 border-r border-gray-800/50 bg-red-950/10 hover:bg-red-950/20 transition-colors">
                <div className="flex items-start gap-3">
                  <X className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{row.without}</span>
                </div>
              </div>
              <div className="p-5 lg:p-6 bg-purple-500/5 hover:bg-purple-500/10 transition-colors">
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white">{row.with}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile */}
        <div className="md:hidden space-y-4">
          {rows.map((row, i) => (
            <div key={i} className="rounded-xl border border-gray-800/50 overflow-hidden">
              <div className="p-4 bg-red-950/10 border-b border-gray-800/50">
                <div className="flex items-center gap-2 mb-2">
                  {leftIcon}
                  <span className="text-xs font-medium text-red-400 uppercase tracking-wide">Vorher</span>
                </div>
                <div className="flex items-start gap-3">
                  <X className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">{row.without}</span>
                </div>
              </div>
              <div className="p-4 bg-purple-500/5">
                <div className="flex items-center gap-2 mb-2">
                  {rightIcon}
                  <span className="text-xs font-medium text-purple-400 uppercase tracking-wide">Nachher</span>
                </div>
                <div className="flex items-start gap-3">
                  <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-white text-sm">{row.with}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
