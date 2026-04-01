/**
 * @baustein Expand Map / Location Card
 * @zweck Interaktive Standort-Karte mit 3D-Tilt, Expand-Animation und SVG-Straßenraster
 * @geeignet-fuer Footer, Kontakt-Seiten, About-Seiten, Team-Seiten
 * @stil Dark Theme, Emerald Akzente, 3D Perspective, Spring-Animationen
 */

import type React from "react"
import { useState, useRef } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion"

interface LocationMapProps {
  location?: string
  coordinates?: string
  className?: string
}

export function LocationMap({
  location = "Köln, Deutschland",
  coordinates = "50.9375° N, 6.9603° O",
  className,
}: LocationMapProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-50, 50], [8, -8])
  const rotateY = useTransform(mouseX, [-50, 50], [-8, 8])
  const springRotateX = useSpring(rotateX, { stiffness: 300, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mouseX.set(e.clientX - (rect.left + rect.width / 2))
    mouseY.set(e.clientY - (rect.top + rect.height / 2))
  }

  return (
    <motion.div
      ref={containerRef}
      className={`relative cursor-pointer select-none ${className}`}
      style={{ perspective: 1000 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { mouseX.set(0); mouseY.set(0); setIsHovered(false) }}
      onClick={() => setIsExpanded(!isExpanded)}
    >
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-black/50 border border-white/10"
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformStyle: "preserve-3d" }}
        animate={{ width: isExpanded ? 360 : 240, height: isExpanded ? 280 : 140 }}
        transition={{ type: "spring", stiffness: 400, damping: 35 }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-white/10" />
        <AnimatePresence>
          {isExpanded && (
            <motion.div className="absolute inset-0 pointer-events-none" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="absolute inset-0 bg-neutral-900" />
              <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <motion.line x1="0%" y1="35%" x2="100%" y2="35%" className="stroke-white/20" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.2 }} />
                <motion.line x1="0%" y1="65%" x2="100%" y2="65%" className="stroke-white/20" strokeWidth="4" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.8, delay: 0.3 }} />
                <motion.line x1="30%" y1="0%" x2="30%" y2="100%" className="stroke-white/15" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.4 }} />
                <motion.line x1="70%" y1="0%" x2="70%" y2="100%" className="stroke-white/15" strokeWidth="3" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.6, delay: 0.5 }} />
              </svg>
              <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" initial={{ scale: 0, y: -20 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 400, damping: 20, delay: 0.3 }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" style={{ filter: "drop-shadow(0 0 10px rgba(129,140,248,0.5))" }}>
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#818cf8" />
                  <circle cx="12" cy="9" r="2.5" fill="black" />
                </svg>
              </motion.div>
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
            </motion.div>
          )}
        </AnimatePresence>
        <div className="relative z-10 h-full flex flex-col justify-between p-5">
          <div className="flex items-start justify-between">
            <motion.svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-400" animate={{ opacity: isExpanded ? 0 : 1 }}>
              <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21" />
              <line x1="9" x2="9" y1="3" y2="18" />
              <line x1="15" x2="15" y1="6" y2="21" />
            </motion.svg>
            <motion.div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-white/5 backdrop-blur-sm" animate={{ scale: isHovered ? 1.05 : 1 }}>
              <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              <span className="text-[10px] font-medium text-white/50 tracking-wide uppercase">Live</span>
            </motion.div>
          </div>
          <div className="space-y-1">
            <motion.h3 className="text-white font-medium text-sm tracking-tight" animate={{ x: isHovered ? 4 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}>{location}</motion.h3>
            <AnimatePresence>
              {isExpanded && (
                <motion.p className="text-white/40 text-xs font-mono" initial={{ opacity: 0, y: -10, height: 0 }} animate={{ opacity: 1, y: 0, height: "auto" }} exit={{ opacity: 0, y: -10, height: 0 }}>{coordinates}</motion.p>
              )}
            </AnimatePresence>
            <motion.div className="h-px bg-gradient-to-r from-purple-500/50 via-purple-400/30 to-transparent" initial={{ scaleX: 0, originX: 0 }} animate={{ scaleX: isHovered || isExpanded ? 1 : 0.3 }} transition={{ duration: 0.4 }} />
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
