/**
 * @baustein Problem Cards
 * @zweck Grid mit Problem-/Schmerzpunkt-Cards (rote Akzente)
 * @geeignet-fuer Problem-Mirror, Pain Points, Störfaktoren
 * @stil Dark Theme, Red Accents, Icon + Title + Description
 */

import { useRef, useState, useEffect } from "react"

interface ProblemCard {
  icon: React.ReactNode
  label?: string
  title: string
  description: string
}

interface ProblemCardsProps {
  badge?: string
  headline?: string
  subheadline?: string
  problems: ProblemCard[]
  columns?: 2 | 3
}

export function ProblemCards({
  badge = "Das Problem",
  headline = "Welcher dieser Engpässe bremst dein Wachstum?",
  subheadline,
  problems,
  columns = 3,
}: ProblemCardsProps) {
  const gridCols = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          {badge && <span className="inline-block px-4 py-2 bg-red-500/10 text-red-400 rounded-full text-sm font-semibold mb-4 border border-red-500/20">{badge}</span>}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">{headline}</h2>
          {subheadline && <p className="text-xl text-gray-400 max-w-3xl mx-auto">{subheadline}</p>}
        </div>

        <div className={`grid ${gridCols} gap-6`}>
          {problems.map((problem, i) => (
            <div key={i} className="group bg-gray-900/50 p-8 rounded-3xl border border-gray-800/50 hover:border-red-500/30 transition-all duration-300 hover:-translate-y-1">
              <div className="w-14 h-14 bg-gradient-to-br from-red-500/20 to-red-600/10 rounded-2xl flex items-center justify-center mb-6 text-red-400 group-hover:scale-110 transition-transform">
                {problem.icon}
              </div>
              {problem.label && <span className="text-xs font-bold text-red-400 uppercase tracking-wider">{problem.label}</span>}
              <h3 className="text-xl font-bold text-white mt-2 mb-3">{problem.title}</h3>
              <p className="text-gray-400 leading-relaxed">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
