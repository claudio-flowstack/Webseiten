/**
 * @baustein Footer2
 * @zweck Vollständiger Footer mit Logo, 4 Menü-Spalten, Copyright und Bottom-Links
 * @geeignet-fuer Jede Webseite, SaaS, Agentur, Corporate
 * @stil Dark Theme, Grid-Layout, Responsive, Hover-Effekte
 */

interface MenuItem {
  title: string
  links: { text: string; url: string }[]
}

interface Footer2Props {
  logoTitle?: string
  tagline?: string
  menuItems?: MenuItem[]
  copyright?: string
  bottomLinks?: { text: string; url: string }[]
}

export function Footer2({
  logoTitle = "Flowstack",
  tagline = "KI-Automatisierung für Agenturen.",
  menuItems = [
    {
      title: "Produkt",
      links: [
        { text: "Features", url: "#features" },
        { text: "Preise", url: "#pricing" },
        { text: "Demo buchen", url: "#demo" },
        { text: "API Docs", url: "#" },
      ],
    },
    {
      title: "Unternehmen",
      links: [
        { text: "Über uns", url: "#" },
        { text: "Team", url: "#" },
        { text: "Karriere", url: "#" },
        { text: "Kontakt", url: "#" },
      ],
    },
    {
      title: "Rechtliches",
      links: [
        { text: "Impressum", url: "/demo/impressum" },
        { text: "Datenschutz", url: "/demo/datenschutz" },
        { text: "AGB", url: "#" },
      ],
    },
    {
      title: "Social",
      links: [
        { text: "LinkedIn", url: "#" },
        { text: "Instagram", url: "#" },
        { text: "Twitter", url: "#" },
      ],
    },
  ],
  copyright = "2026 Flowstack. Alle Rechte vorbehalten.",
  bottomLinks = [
    { text: "AGB", url: "#" },
    { text: "Datenschutz", url: "/demo/datenschutz" },
  ],
}: Footer2Props) {
  return (
    <section className="py-20 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6">
        <footer>
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
            <div className="col-span-2 mb-8 lg:mb-0">
              <div className="flex items-center gap-2 lg:justify-start">
                <p className="text-xl font-bold text-white">{logoTitle}</p>
              </div>
              <p className="mt-4 font-medium text-white/60">{tagline}</p>
            </div>
            {menuItems.map((section, i) => (
              <div key={i}>
                <h3 className="mb-4 font-bold text-white">{section.title}</h3>
                <ul className="space-y-4 text-white/40">
                  {section.links.map((link, j) => (
                    <li key={j} className="font-medium hover:text-purple-400 transition-colors">
                      <a href={link.url}>{link.text}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-24 flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm font-medium text-white/40 md:flex-row md:items-center">
            <p>{copyright}</p>
            <ul className="flex gap-4">
              {bottomLinks.map((link, i) => (
                <li key={i} className="underline hover:text-purple-400 transition-colors">
                  <a href={link.url}>{link.text}</a>
                </li>
              ))}
            </ul>
          </div>
        </footer>
      </div>
    </section>
  )
}
