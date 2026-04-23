import type { CSSProperties, ReactNode } from 'react'
import { Link } from 'react-router-dom'

export const terminal = {
  accent: '#e8b75c',
  bg: '#0c0c0d',
  panel: '#141416',
  border: 'rgba(255,255,255,0.08)',
  border2: 'rgba(255,255,255,0.14)',
  text: '#e6e4df',
  dim: 'rgba(230,228,223,0.55)',
  mono: '"Geist Mono", "JetBrains Mono", ui-monospace, monospace',
  sans: '"Geist", "Inter Tight", -apple-system, sans-serif',
  serif: '"Fraunces", Georgia, serif',
} as const

type PlaceholderVariant = 'stripes' | 'portrait' | 'office'

type PlaceholderProps = {
  label: string
  aspect?: string
  variant?: PlaceholderVariant
  h?: number
  src?: string
}

export function TPlaceholder({ label, aspect = '4/3', variant = 'stripes', h, src }: PlaceholderProps) {
  const fallbackBg =
    variant === 'portrait'
      ? `radial-gradient(circle at 30% 20%, rgba(232,183,92,0.25), transparent 60%), linear-gradient(135deg, #1a1a1c, #0f0f10)`
      : variant === 'office'
      ? `linear-gradient(135deg, #18181a, #0e0e10), repeating-linear-gradient(45deg, rgba(232,183,92,0.04) 0 8px, transparent 8px 20px)`
      : `repeating-linear-gradient(45deg, rgba(255,255,255,0.03) 0 10px, rgba(255,255,255,0.01) 10px 22px)`

  const boxStyle: CSSProperties = {
    aspectRatio: h ? undefined : aspect,
    height: h,
    background: src ? '#0f0f10' : fallbackBg,
    borderRadius: 10,
    border: `1px solid ${terminal.border2}`,
    position: 'relative',
    overflow: 'hidden',
  }

  if (src) {
    return (
      <div style={boxStyle}>
        <img
          src={src}
          alt={label}
          loading="lazy"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'saturate(0.9) contrast(1.05)' }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(12,12,13,0) 50%, rgba(12,12,13,0.55) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>
    )
  }

  const cornerBase: CSSProperties = { position: 'absolute', width: 14, height: 14, opacity: 0.5 }

  return (
    <div style={boxStyle}>
      <div style={{ ...cornerBase, top: 10, left: 10, borderTop: `1px solid ${terminal.accent}`, borderLeft: `1px solid ${terminal.accent}` }} />
      <div style={{ ...cornerBase, top: 10, right: 10, borderTop: `1px solid ${terminal.accent}`, borderRight: `1px solid ${terminal.accent}` }} />
      <div style={{ ...cornerBase, bottom: 10, left: 10, borderBottom: `1px solid ${terminal.accent}`, borderLeft: `1px solid ${terminal.accent}` }} />
      <div style={{ ...cornerBase, bottom: 10, right: 10, borderBottom: `1px solid ${terminal.accent}`, borderRight: `1px solid ${terminal.accent}` }} />
      <div
        style={{
          position: 'absolute',
          left: 14,
          bottom: 14,
          fontFamily: terminal.mono,
          fontSize: 10,
          color: terminal.dim,
          background: 'rgba(0,0,0,0.5)',
          padding: '4px 8px',
          borderRadius: 4,
          textTransform: 'uppercase',
          letterSpacing: 1,
        }}
      >
        [ {label} ]
      </div>
    </div>
  )
}

type NavLinkDescriptor = { label: string; href?: string }

const DEFAULT_NAV_LINKS: NavLinkDescriptor[] = [
  { label: 'Rollen' },
  { label: 'Team' },
  { label: 'Prozess' },
  { label: 'FAQ' },
]

export function TermNav() {
  const linkStyle: CSSProperties = {
    color: terminal.text,
    textDecoration: 'none',
    fontSize: 13,
    opacity: 0.75,
    cursor: 'pointer',
  }

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 72px',
        borderBottom: `1px solid ${terminal.border}`,
        fontFamily: terminal.mono,
        fontSize: 13,
      }}
    >
      <Link to="/demo" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none', color: terminal.text }}>
        <div
          style={{
            width: 22,
            height: 22,
            borderRadius: 4,
            background: terminal.accent,
            color: terminal.bg,
            display: 'grid',
            placeItems: 'center',
            fontWeight: 700,
            fontSize: 13,
          }}
        >
          N
        </div>
        <span style={{ fontWeight: 600 }}>novacode</span>
        <span style={{ opacity: 0.4, marginLeft: 6 }}>/careers</span>
      </Link>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {DEFAULT_NAV_LINKS.map(l => (
          <a key={l.label} style={linkStyle} href={l.href}>
            {l.label}
          </a>
        ))}
        <Link
          to="/demo/bewerbung"
          style={{
            ...linkStyle,
            color: terminal.bg,
            background: terminal.accent,
            padding: '8px 14px',
            borderRadius: 6,
            fontWeight: 600,
            opacity: 1,
          }}
        >
          Jetzt bewerben →
        </Link>
      </div>
    </div>
  )
}

export function TermFooter() {
  return (
    <div
      style={{
        padding: '32px 72px',
        borderTop: `1px solid ${terminal.border}`,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: terminal.mono,
        fontSize: 12,
        color: terminal.dim,
      }}
    >
      <div>© 2026 Novacode GmbH · Oranienburger Str. 66, Berlin · careers@novacode.de</div>
      <div style={{ display: 'flex', gap: 24 }}>
        <span>Impressum</span>
        <span>Datenschutz</span>
        <span>Engineering Blog ↗</span>
      </div>
    </div>
  )
}

export function DemoTerminalShell({ children }: { children: ReactNode }) {
  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        background: terminal.bg,
        color: terminal.text,
        fontFamily: terminal.sans,
        fontSize: 15,
        lineHeight: 1.5,
      }}
    >
      {children}
    </div>
  )
}
