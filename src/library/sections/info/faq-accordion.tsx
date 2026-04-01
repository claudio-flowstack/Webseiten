/**
 * @baustein FAQ Accordion
 * @zweck Klappbare FAQ-Liste mit Frage/Antwort
 * @geeignet-fuer FAQ, Häufige Fragen, Support
 * @stil Dark Theme, Chevron Toggle, Smooth Animation, Purple Active
 */

import { useState } from "react"
import { ChevronDown } from "lucide-react"

interface FaqItem {
  question: string
  answer: string
}

interface FaqAccordionProps {
  badge?: string
  headline?: string
  items: FaqItem[]
}

export function FaqAccordion({
  badge = "FAQ",
  headline = "Häufig gestellte Fragen",
  items,
}: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-24">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-16">
          {badge && <span className="inline-block px-4 py-2 bg-gray-800 text-gray-400 rounded-full text-sm font-semibold mb-4">{badge}</span>}
          <h2 className="text-3xl md:text-4xl font-bold text-white">{headline}</h2>
        </div>

        <div className="space-y-4">
          {items.map((faq, i) => (
            <div key={i} className="bg-gray-900/50 rounded-2xl border border-gray-800/50 overflow-hidden hover:border-gray-700 transition-all">
              <button onClick={() => setOpenIndex(openIndex === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left">
                <span className="font-semibold text-white pr-4">{faq.question}</span>
                <div className={`w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${openIndex === i ? "bg-purple-500/20 rotate-180" : ""}`}>
                  <ChevronDown className={`w-5 h-5 transition-colors ${openIndex === i ? "text-purple-400" : "text-gray-500"}`} />
                </div>
              </button>
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === i ? "max-h-96" : "max-h-0"}`}>
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
