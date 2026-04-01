/**
 * @baustein Navbar Floating
 * @zweck Sticky floating Navbar mit Logo, Desktop-Nav, Mobile-Toggle, CTA-Button
 * @geeignet-fuer Landingpages, Marketing-Seiten, SaaS
 * @stil Dark Theme, Glassmorphism, Rounded, Purple Accent
 */

import { useState } from "react"
import { Link } from "react-router-dom"
import { Zap, ArrowRight, ArrowUpRight, X, Menu } from "lucide-react"

interface NavbarFloatingProps {
  logo?: string
  logoIcon?: React.ReactNode
  navItems?: { label: string; href: string }[]
  ctaText?: string
  ctaHref?: string
}

export function NavbarFloating({
  logo = "Flowstack",
  logoIcon = <Zap className="w-4 h-4 md:w-5 md:h-5 text-white" />,
  navItems = [
    { label: "System", href: "#system" },
    { label: "Leistungen", href: "#leistungen" },
    { label: "Team", href: "#team" },
    { label: "FAQ", href: "#faq" },
  ],
  ctaText = "Prozess-Analyse",
  ctaHref = "/kostenlose-beratung",
}: NavbarFloatingProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-4 mt-4">
        <div className="max-w-7xl mx-auto bg-gray-900/70 backdrop-blur-xl rounded-2xl border border-gray-800/50 shadow-2xl px-4 md:px-6 py-3">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2 md:gap-3">
              <div className="w-9 h-9 md:w-10 md:h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
                {logoIcon}
              </div>
              <span className="text-lg md:text-xl font-bold text-white">{logo}</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navItems.map((item) => (
                <a key={item.label} href={item.href} className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all font-medium text-sm">
                  {item.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <Link to={ctaHref} className="hidden md:flex group bg-gradient-to-r from-purple-500 to-purple-600 text-white px-6 py-2.5 rounded-xl font-semibold text-sm hover:shadow-lg hover:shadow-purple-500/25 transition-all hover:-translate-y-0.5 items-center gap-2">
                {ctaText}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 text-gray-400 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all" aria-label="Menü">
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden mt-4 pt-4 border-t border-gray-800/50">
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <a key={item.label} href={item.href} onClick={() => setMobileMenuOpen(false)} className="px-4 py-3 text-gray-300 hover:text-white hover:bg-gray-800/50 rounded-xl transition-all font-medium text-base">
                    {item.label}
                  </a>
                ))}
                <Link to={ctaHref} onClick={() => setMobileMenuOpen(false)} className="mt-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-3 rounded-xl font-semibold text-base text-center flex items-center justify-center gap-2">
                  {ctaText} <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
