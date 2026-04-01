/**
 * @baustein Services Tabs
 * @zweck Tab-Navigation mit Detail-Content pro Service/Leistung
 * @geeignet-fuer Leistungen, Produkt-Features, Pakete
 * @stil Dark Theme, Pill-Tabs, Purple Active, 2-Column Content
 */

import { useState } from "react"
import { Check, ArrowRight } from "lucide-react"
import { Link } from "react-router-dom"

interface ServiceItem {
  icon: React.ReactNode
  title: string
  items: string[]
}

interface ServicesTabsProps {
  badge?: string
  headline?: string
  services: ServiceItem[]
  ctaText?: string
  ctaHref?: string
}

export function ServicesTabs({
  badge = "Leistungen",
  headline = "Was wir für dich tun",
  services,
  ctaText = "Mehr erfahren",
  ctaHref = "/kostenlose-beratung",
}: ServicesTabsProps) {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center mb-12">
          {badge && <span className="inline-block px-4 py-2 bg-purple-500/10 text-purple-400 rounded-full text-sm font-semibold mb-4 border border-purple-500/20">{badge}</span>}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">{headline}</h2>
        </div>

        {/* Tab Navigation */}
        <div className="flex overflow-x-auto pb-2 gap-2 md:gap-3 px-2 md:px-0 md:flex-wrap md:justify-center mb-8">
          {services.map((service, i) => (
            <button
              key={service.title}
              onClick={() => setActiveTab(i)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all flex-shrink-0 ${
                activeTab === i
                  ? "bg-purple-500 text-white shadow-lg shadow-purple-500/20"
                  : "bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
              }`}
            >
              {service.icon}
              <span className="hidden sm:inline">{service.title}</span>
              <span className="sm:hidden">{service.title.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="rounded-2xl border border-gray-800/50 bg-gray-900/50 p-6 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="w-14 h-14 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6 text-purple-400">
                {services[activeTab]?.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-medium text-white mb-3">{services[activeTab]?.title}</h3>
              <Link to={ctaHref} className="group inline-flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white px-6 py-3 rounded-xl font-semibold mt-4 transition-all">
                {ctaText}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-gray-800/30 rounded-xl p-5 md:p-6">
              <p className="text-xs uppercase tracking-widest text-gray-500 mb-4">Was enthalten ist</p>
              <ul className="space-y-3">
                {services[activeTab]?.items?.map((item, j) => (
                  <li key={j} className="flex items-start gap-3">
                    <div className="p-1 rounded-full bg-purple-500/20 mt-0.5">
                      <Check className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
