/**
 * @baustein Logo Marquee
 * @zweck Endlos scrollende Logo-Leiste mit Gradient-Fade an den Rändern
 * @geeignet-fuer Trust-Strip, Partner-Logos, Tool-Integrationen
 * @stil Dark Theme, Grayscale Logos, Hover-Opacity
 */

interface LogoMarqueeProps {
  logos: { name: string; logo: string }[]
  label?: string
  speed?: number
  bgColor?: string
}

export function LogoMarquee({
  logos,
  label = "Wir arbeiten mit führenden Tools",
  speed = 30,
  bgColor = "#0a0a0e",
}: LogoMarqueeProps) {
  const doubled = [...logos, ...logos]

  return (
    <section className="py-16 border-y border-gray-800/50 overflow-hidden">
      {label && (
        <p className="text-center text-xs uppercase tracking-[0.2em] text-gray-500 mb-10">{label}</p>
      )}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 z-10" style={{ background: `linear-gradient(to right, ${bgColor}, transparent)` }} />
        <div className="absolute right-0 top-0 bottom-0 w-32 z-10" style={{ background: `linear-gradient(to left, ${bgColor}, transparent)` }} />
        <div className="flex" style={{ animation: `marquee ${speed}s linear infinite` }}>
          {doubled.map((tool, i) => (
            <div key={`${tool.name}-${i}`} className="flex-shrink-0 mx-12 flex items-center justify-center">
              <img src={tool.logo} alt={tool.name} loading="lazy" className="h-8 w-auto object-contain opacity-40 hover:opacity-80 transition-all duration-300 brightness-0 invert" />
            </div>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
    </section>
  )
}
