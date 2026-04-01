/**
 * @baustein Glowy Waves Hero
 * @zweck Immersiver Canvas-basierter Hero mit reaktiven Lichtwellen die auf Mausbewegung reagieren
 * @geeignet-fuer Creative Agencies, Gaming, Entertainment, Premium SaaS, Portfolio-Seiten
 * @stil Cinematic, Reactive Canvas, Theme-aware Farben, Glasmorphism Stats
 * @props Keine (Content inline)
 * @features Echtzeit Canvas-Animation, Mouse-Tracking, Theme-Observer, Reduced-Motion Support, Stats Grid
 */

import { motion, type Variants } from "framer-motion"
import { ArrowRight, Sparkles } from "lucide-react"
import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"

type Point = { x: number; y: number }

interface WaveConfig {
  offset: number
  amplitude: number
  frequency: number
  color: string
  opacity: number
}

const highlightPills = [
  "Kein Micromanagement",
  "Automatisch",
  "Fehlerfrei",
] as const

const heroStats: { label: string; value: string }[] = [
  { label: "Automatisierte Schritte", value: "47" },
  { label: "Phasen pro Kunde", value: "6" },
  { label: "Weniger operativer Aufwand", value: "80%" },
]

const containerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, staggerChildren: 0.12 } },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
}

const statsVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.08 } },
}

export function GlowyWavesHero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const mouseRef = useRef<Point>({ x: 0, y: 0 })
  const targetMouseRef = useRef<Point>({ x: 0, y: 0 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationId: number
    let time = 0

    const computeThemeColors = () => {
      const rootStyles = getComputedStyle(document.documentElement)
      const resolveColor = (variables: string[], alpha = 1) => {
        const tempEl = document.createElement("div")
        tempEl.style.position = "absolute"
        tempEl.style.visibility = "hidden"
        tempEl.style.width = "1px"
        tempEl.style.height = "1px"
        document.body.appendChild(tempEl)
        let color = `rgba(9, 9, 11, ${alpha})`
        for (const variable of variables) {
          const value = rootStyles.getPropertyValue(variable).trim()
          if (value) {
            tempEl.style.backgroundColor = `var(${variable})`
            const computedColor = getComputedStyle(tempEl).backgroundColor
            if (computedColor && computedColor !== "rgba(0, 0, 0, 0)") {
              if (alpha < 1) {
                const rgbMatch = computedColor.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/)
                if (rgbMatch) color = `rgba(${rgbMatch[1]}, ${rgbMatch[2]}, ${rgbMatch[3]}, ${alpha})`
                else color = computedColor
              } else {
                color = computedColor
              }
              break
            }
          }
        }
        document.body.removeChild(tempEl)
        return color
      }
      return {
        backgroundTop: resolveColor(["--background"], 1),
        backgroundBottom: resolveColor(["--muted", "--background"], 0.95),
        wavePalette: [
          { offset: 0, amplitude: 70, frequency: 0.003, color: resolveColor(["--primary"], 0.8), opacity: 0.45 },
          { offset: Math.PI / 2, amplitude: 90, frequency: 0.0026, color: resolveColor(["--accent", "--primary"], 0.7), opacity: 0.35 },
          { offset: Math.PI, amplitude: 60, frequency: 0.0034, color: resolveColor(["--secondary", "--foreground"], 0.65), opacity: 0.3 },
          { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: resolveColor(["--primary-foreground", "--foreground"], 0.25), opacity: 0.25 },
          { offset: Math.PI * 2, amplitude: 55, frequency: 0.004, color: resolveColor(["--foreground"], 0.2), opacity: 0.2 },
        ] satisfies WaveConfig[],
      }
    }

    let themeColors = computeThemeColors()
    const observer = new MutationObserver(() => { themeColors = computeThemeColors() })
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class", "data-theme"] })

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const mouseInfluence = prefersReducedMotion ? 10 : 70
    const influenceRadius = prefersReducedMotion ? 160 : 320
    const smoothing = prefersReducedMotion ? 0.04 : 0.1

    const resizeCanvas = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight }
    const recenterMouse = () => { const c = { x: canvas.width / 2, y: canvas.height / 2 }; mouseRef.current = c; targetMouseRef.current = c }
    const handleResize = () => { resizeCanvas(); recenterMouse() }
    const handleMouseMove = (e: MouseEvent) => { targetMouseRef.current = { x: e.clientX, y: e.clientY } }
    const handleMouseLeave = () => { recenterMouse() }

    resizeCanvas(); recenterMouse()
    window.addEventListener("resize", handleResize)
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("mouseleave", handleMouseLeave)

    const drawWave = (wave: WaveConfig) => {
      ctx.save(); ctx.beginPath()
      for (let x = 0; x <= canvas.width; x += 4) {
        const dx = x - mouseRef.current.x; const dy = canvas.height / 2 - mouseRef.current.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - distance / influenceRadius)
        const mouseEffect = influence * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset)
        const y = canvas.height / 2 + Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude + Math.sin(x * wave.frequency * 0.4 + time * 0.003) * (wave.amplitude * 0.45) + mouseEffect
        if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y)
      }
      ctx.lineWidth = 2.5; ctx.strokeStyle = wave.color; ctx.globalAlpha = wave.opacity; ctx.shadowBlur = 35; ctx.shadowColor = wave.color; ctx.stroke(); ctx.restore()
    }

    const animate = () => {
      time += 1
      mouseRef.current.x += (targetMouseRef.current.x - mouseRef.current.x) * smoothing
      mouseRef.current.y += (targetMouseRef.current.y - mouseRef.current.y) * smoothing
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, themeColors.backgroundTop); gradient.addColorStop(1, themeColors.backgroundBottom)
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.globalAlpha = 1; ctx.shadowBlur = 0
      themeColors.wavePalette.forEach(drawWave)
      animationId = window.requestAnimationFrame(animate)
    }
    animationId = window.requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", handleResize)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("mouseleave", handleMouseLeave)
      cancelAnimationFrame(animationId); observer.disconnect()
    }
  }, [])

  return (
    <section className="relative isolate flex min-h-screen w-full items-center justify-center overflow-hidden bg-black">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute left-1/2 top-0 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-white/[0.06] blur-[140px]" />
        <div className="absolute bottom-0 right-0 h-[360px] w-[360px] rounded-full bg-white/[0.05] blur-[120px]" />
      </div>
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-6 py-24 text-center md:px-8 lg:px-12">
        <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full">
          <motion.div variants={itemVariants} className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-white/80">
            <Sparkles className="h-4 w-4 text-purple-400" aria-hidden="true" />
            Operative Freiheit
          </motion.div>
          <motion.h1 variants={itemVariants} className="mb-6 text-4xl font-semibold tracking-tight text-white md:text-6xl lg:text-7xl">
            Dein System{" "}
            <span className="bg-gradient-to-r from-purple-400 via-purple-400/60 to-white/80 bg-clip-text text-transparent">arbeitet. Du lebst.</span>
          </motion.h1>
          <motion.p variants={itemVariants} className="mx-auto mb-10 max-w-3xl text-lg text-white/70 md:text-2xl">
            Kannst du in Urlaub fahren und wissen, dass die Kundenergebnisse stimmen? Mit Flowstack musst du dir die Frage gar nicht stellen. Das System läuft. 24/7.
          </motion.p>
          <motion.div variants={itemVariants} className="mb-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" className="group gap-2 rounded-full px-8 text-base uppercase tracking-[0.2em]">
              Potenzial-Analyse starten
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Button>
            <Button size="lg" variant="outline" className="rounded-full border-white/10 bg-black/60 px-8 text-base text-white/80 backdrop-blur">
              So funktioniert's
            </Button>
          </motion.div>
          <motion.ul variants={itemVariants} className="mb-12 flex flex-wrap items-center justify-center gap-3 text-xs uppercase tracking-[0.2em] text-white/70">
            {highlightPills.map((pill) => (
              <li key={pill} className="rounded-full border border-white/10 bg-black/60 px-4 py-2 backdrop-blur">{pill}</li>
            ))}
          </motion.ul>
          <motion.div variants={statsVariants} className="grid gap-4 rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur-sm sm:grid-cols-3">
            {heroStats.map((stat) => (
              <motion.div key={stat.label} variants={itemVariants} className="space-y-1">
                <div className="text-xs uppercase tracking-[0.3em] text-white/50">{stat.label}</div>
                <div className="text-3xl font-semibold text-white">{stat.value}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
