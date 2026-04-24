import { useState, useEffect, useRef, type CSSProperties } from 'react'
import { useSeo } from '@/shared/seo/useSeo'
import '@/styles/marketing-fulfillment.css'

type NodeProps = { x: number; y: number; w?: number; h?: number; label: string; sub?: string; active: number; tier?: string }
const Node = ({ x, y, w = 160, h = 44, label, sub, active, tier }: NodeProps) => (
  <g transform={`translate(${x}, ${y})`} style={{ opacity: 0.3 + active * 0.7, transition: 'opacity .2s' }}>
    <rect x={0} y={0} width={w} height={h} rx={8}
      fill="#121826"
      stroke={active > 0.3 ? '#6E8BFF' : '#2A3246'}
      strokeWidth={active > 0.3 ? 1.5 : 1}
      style={{ filter: active > 0.5 ? 'drop-shadow(0 0 12px rgba(110,139,255,0.5))' : 'none', transition: 'all .3s' }}
    />
    <text x={12} y={18} fontSize="11" fill="#626874" fontFamily="'JetBrains Mono', monospace" letterSpacing="0.05em">{tier || ''}</text>
    <text x={12} y={33} fontSize="13" fill={active > 0.3 ? '#E6E8EB' : '#9BA1AC'} fontFamily="Inter" fontWeight="500">{label}</text>
    {sub && <text x={w - 12} y={33} fontSize="10.5" fill="#626874" fontFamily="'JetBrains Mono', monospace" textAnchor="end">{sub}</text>}
  </g>
)

type IconProps = { size?: number }
function ZMArrow({ size = 14 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <line x1={5} y1={12} x2={19} y2={12} /><polyline points="12 5 19 12 12 19" />
    </svg>
  )
}
function ZMCheck({ size = 12 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function AvailBanner() {
  return (
    <div className="avail">
      <span className="avail-dot" />
      <strong>Noch 3 Onboarding-Plätze in Q3 verfügbar</strong>
      <span className="avail-sep">·</span>
      <a href="/bewerbung">Platz sichern →</a>
    </div>
  )
}

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="wrap nav-inner">
        <a className="logo" href="/">
          <span className="logo-mark" />Flowstack
        </a>
        <div className="nav-links">
          <a href="#probleme">Probleme</a>
          <a href="#methode">Methode</a>
          <a href="#faelle">Fallstudien</a>
          <a href="#ablauf">Ablauf</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-cta">
          <a className="btn btn-primary btn-sm" href="/bewerbung">
            Jetzt bewerben <ZMArrow />
          </a>
        </div>
      </div>
    </nav>
  )
}

function Hero() {
  return (
    <section className="hero-v3">
      <div className="wrap hero-v3-grid">
        <div className="hero-v3-copy">
          <div className="eyebrow">· Für Agenturen mit 100k – 3 Mio € Umsatz</div>
          <h1 className="hero-v3-head">
            In <strong>21 Tagen</strong> zur 10-Minuten-Agentur<span className="hero-v3-dot">.</span>
          </h1>
          <p className="hero-v3-sub">
            Wir bauen dir ein <strong>KI-Fliessband für dein Fulfillment</strong> — Creatives, Ads, Landingpages, Reports laufen automatisiert. Du steuerst, statt zu produzieren.
          </p>
          <div className="hero-v3-bullets">
            <div className="hero-v3-bullet">
              <span className="hero-v3-bullet-ico"><ZMCheck /></span>
              <span><b>EBIT-Marge</b> von 12 % auf 30–60 % in 9–14 Monaten</span>
            </div>
            <div className="hero-v3-bullet">
              <span className="hero-v3-bullet-ico"><ZMCheck /></span>
              <span><b>Creative-Output × 3–5</b> ohne neuen Hire</span>
            </div>
            <div className="hero-v3-bullet">
              <span className="hero-v3-bullet-ico"><ZMCheck /></span>
              <span><b>Wochenende zurück</b> — Ad-Launches bauen sich, während du schläfst</span>
            </div>
          </div>
          <div className="hero-v3-ctarow">
            <a className="btn btn-primary btn-lg" href="/bewerbung">
              Kostenloses Strategiegespräch sichern <ZMArrow />
            </a>
          </div>
          <div className="hero-v3-subtrust">
            <ZMCheck size={13} /><span>30 Min, kostenlos</span>
            <span className="dotsep">·</span><span>Kein Sales-Druck</span>
            <span className="dotsep">·</span><span>Antwort in 24 h</span>
          </div>
        </div>

        <div className="hero-v3-media">
          <div className="hero-v3-vsl">
            <div className="hero-v3-vsl-shine" />
            <button className="hero-v3-play" aria-label="Video abspielen">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </button>
            <div className="hero-v3-vsl-meta">
              <span className="hero-v3-vsl-badge">VSL · 3:42 min</span>
              <span className="hero-v3-vsl-ttl">So funktioniert die 10-Minuten-Agentur</span>
            </div>
          </div>
          <div className="hero-v3-founder">
            <img className="hero-v3-founder-av" src="/claudio.jpg" alt="Claudio Di Franco" loading="lazy" decoding="async" />
            <div>
              <div className="hero-v3-founder-n">Claudio Di Franco</div>
              <div className="hero-v3-founder-r">Gründer · Flowstack System</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function TrustRow() {
  const logos = ['t3n', 'OMR', 'Horizont', 'W&V', 'Internet World', 'Gründerszene']
  const kpis = [
    { v: '40+', l: 'Agenturen im DACH-Raum' },
    { v: '× 3,4', l: 'Output pro Mitarbeitenden' },
    { v: '47 %', l: 'durchschn. EBIT nach 12 Monaten' },
    { v: '18.300h', l: 'Fulfillment ersetzt / Monat' },
  ]
  return (
    <section className="trustrow">
      <div className="wrap">
        <div className="trustrow-press">
          <span className="trustrow-lbl">· Bekannt aus</span>
          <div className="trustrow-logos">
            {logos.map(l => <span key={l} className="trustrow-logo">{l}</span>)}
          </div>
        </div>
        <div className="trustrow-kpis">
          {kpis.map((k, i) => (
            <div className="trustrow-kpi" key={i}>
              <div className="trustrow-kpi-v">{k.v}</div>
              <div className="trustrow-kpi-l">{k.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Problems() {
  const items = [
    { t: 'op', tl: 'Operativ', q: 'Jede neue Kundenanfrage fühlt sich nach mehr Arbeit an als nach mehr Umsatz.', s: 'Du rechnest freie Stunden, nicht Marge.' },
    { t: 'op', tl: 'Operativ', q: 'Du klickst selbst noch in Ads-Managern und baust Reports in Google Sheets.', s: 'Obwohl du Geschäftsführer bist — weil es sonst keiner richtig macht.' },
    { t: 'em', tl: 'Emotional', q: 'Du arbeitest mehr als vor zwei Jahren, aber dein Gewinn ist derselbe.', s: 'Umsatz verdoppelt, EBIT stagniert. Jede Einstellung frisst den Hebel wieder auf.' },
    { t: 'em', tl: 'Emotional', q: 'Am Sonntagabend denkst du an die 5 Posts, die Montag live müssen.', s: 'Fulfillment-Druck verfolgt dich bis ins Wochenende.' },
    { t: 'id', tl: 'Identität', q: 'Du hast aufgehört zu sagen: „Ich baue eine Agentur, die auch ohne mich läuft."', s: 'Stattdessen: „Ich halte den Laden zusammen, solange es geht."' },
    { t: 'id', tl: 'Identität', q: 'Du fragst dich, ob du noch Unternehmer bist — oder nur der bestbezahlte Mitarbeiter.', s: 'Die Firma hängt an dir. Eine Krankheitswoche und alles steht.' },
  ]
  return (
    <section className="section" id="probleme">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">· Wiedererkennst du dich?</div>
          <h2 className="section-h2">Sechs Sätze, die du dir selbst nicht mehr sagen willst.</h2>
          <p className="lede section-lede">
            Wenn einer dieser Gedanken dich in den letzten 30 Tagen besucht hat — du bist nicht allein. Und vor allem: <strong>es ist nicht deine Schuld</strong>.
          </p>
        </div>

        <div className="problems-grid">
          {items.map((it, i) => (
            <div className="problems-card" key={i}>
              <div className={`problems-tier ${it.t}`}>· {it.tl}</div>
              <div className="problems-q">„{it.q}"</div>
              <div className="problems-s">{it.s}</div>
            </div>
          ))}
        </div>

        <div className="notfault">
          <div className="notfault-mark">✱</div>
          <div>
            <div className="notfault-hd">Es ist nicht deine Schuld.</div>
            <p className="notfault-b">
              Du hast alles richtig gemacht. Service aufgebaut, Kunden gewonnen, Team eingestellt. Das klassische Done-for-you-Modell ist <strong>nicht kaputt, weil du es falsch machst</strong> — es ist kaputt, weil es für eine Welt gebaut wurde, in der KI keine Creatives, LPs, Ads oder Reports produzieren konnte.
              <br /><br />
              Diese Welt gibt es <strong>seit 18 Monaten nicht mehr</strong>.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function Audience() {
  const tags = [
    'Performance-Agenturen', 'Social-Media-Agenturen', 'Leadgen-Boutiquen',
    'Creative-Studios', 'Coaching-Businesses', 'SEO- & Content-Agenturen',
  ]
  const criteria = [
    { v: '100k – 3 Mio €', l: 'Jahresumsatz' },
    { v: '3 – 15 Personen', l: 'Teamgröße' },
    { v: 'min. 2 Jahre', l: 'am Markt' },
    { v: 'DACH + EU', l: 'Region' },
  ]
  return (
    <section className="section elev" id="zielgruppe">
      <div className="wrap audience">
        <div className="eyebrow">· Für wen Flowstack gebaut ist</div>
        <h2 className="section-h2">Wir arbeiten ausschließlich mit <strong>bestehenden Agenturen</strong>, die bereits ein funktionierendes Modell haben.</h2>

        <div className="audience-tags">
          {tags.map(t => <span key={t} className="audience-tag">{t}</span>)}
        </div>

        <div className="audience-crits">
          {criteria.map((c, i) => (
            <div className="audience-crit" key={i}>
              <div className="audience-crit-v">{c.v}</div>
              <div className="audience-crit-l">{c.l}</div>
            </div>
          ))}
        </div>

        <p className="audience-foot">
          Für Gründer mit Idee, Coaches unter 100k, oder klassische Done-for-you-Sucher: wir sind nicht die richtige Adresse. Das sagen wir vorher.
        </p>
      </div>
    </section>
  )
}

function Pipeline() {
  const [t, setT] = useState(0)
  const [playing, setPlaying] = useState(true)
  const startRef = useRef<number | null>(null)
  const CYCLE = 8000

  useEffect(() => {
    if (!playing) return
    if (startRef.current === null) startRef.current = Date.now()
    let raf: number
    const loop = () => {
      const elapsed = (Date.now() - (startRef.current ?? Date.now())) % CYCLE
      setT(elapsed / CYCLE)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  const phase = t < 0.125 ? '01 · Onboarding-Call' :
    t < 0.25 ? '02 · Transkript & Extraktion' :
    t < 0.375 ? '03 · n8n Engine (Fan-out)' :
    t < 0.625 ? '04 · 7 Assets generiert parallel' :
    t < 0.75 ? '05 · API-Dispatch / Merge' :
    t < 0.875 ? '06 · Live: Ads + LP' :
    '07 · Weekly Auto-Report'

  const activeAt = (start: number, end: number) => {
    if (t < start) return 0
    if (t > end) return 1
    return (t - start) / (end - start)
  }

  const n1 = activeAt(0.00, 0.08)
  const n2 = activeAt(0.12, 0.20)
  const n3 = activeAt(0.24, 0.32)
  const nDB = activeAt(0.28, 0.36)
  const assets = [0, 1, 2, 3, 4, 5, 6].map(i => activeAt(0.40 + i * 0.01, 0.48 + i * 0.01))
  const nMerge = activeAt(0.66, 0.74)
  const nAds = activeAt(0.76, 0.84)
  const nLP = activeAt(0.78, 0.86)
  const nReport = activeAt(0.88, 0.96)

  const particleOn = (startFrac: number, endFrac: number): number | null => {
    if (t < startFrac || t > endFrac) return null
    return (t - startFrac) / (endFrac - startFrac)
  }

  const p1 = particleOn(0.02, 0.14)
  const p2 = particleOn(0.14, 0.26)
  const pAssets = [0, 1, 2, 3, 4, 5, 6].map(i => particleOn(0.32 + i * 0.012, 0.44 + i * 0.012))
  const pMerge = [0, 1, 2, 3, 4, 5, 6].map(i => particleOn(0.56 + i * 0.008, 0.68 + i * 0.008))
  const pDispatch = particleOn(0.68, 0.76)
  const pReport = particleOn(0.82, 0.90)

  const W = 1200, H = 560


  const particleAt = (pts: number[][], p: number) => {
    const lens: number[] = []
    let total = 0
    for (let i = 1; i < pts.length; i++) {
      const dx = pts[i]![0]! - pts[i - 1]![0]!
      const dy = pts[i]![1]! - pts[i - 1]![1]!
      const l = Math.sqrt(dx * dx + dy * dy)
      lens.push(l); total += l
    }
    const target = p * total
    let acc = 0
    for (let i = 0; i < lens.length; i++) {
      if (acc + lens[i]! >= target) {
        const local = (target - acc) / lens[i]!
        return {
          cx: pts[i]![0]! + (pts[i + 1]![0]! - pts[i]![0]!) * local,
          cy: pts[i]![1]! + (pts[i + 1]![1]! - pts[i]![1]!) * local,
        }
      }
      acc += lens[i]!
    }
    return { cx: pts[pts.length - 1]![0]!, cy: pts[pts.length - 1]![1]! }
  }

  const orthoPath = (pts: number[][]) => pts.map((p, i) => (i === 0 ? 'M' : 'L') + p[0] + ' ' + p[1]).join(' ')

  const callNode = { x: 40, y: 250, w: 180 }
  const trNode = { x: 270, y: 250, w: 180 }
  const engineNode = { x: 500, y: 250, w: 180 }
  const dbNode = { x: 540, y: 170, w: 100, h: 44 }

  const ASSET_X = 760
  const ASSET_LABELS = [
    { l: 'Creative A', s: 'hook' },
    { l: 'Creative B', s: 'pain' },
    { l: 'Creative C', s: 'proof' },
    { l: 'LP-Template', s: 'editiert' },
    { l: 'Meta-Ads Setup', s: 'live' },
    { l: 'Looker Report', s: 'dashboard' },
    { l: 'Follow-up Mails', s: 'sequenz' },
  ]
  const assetY = (i: number) => 60 + i * 60

  const mergeNode = { x: 990, y: 250, w: 170 }
  const adsNode = { x: 990, y: 340, w: 170 }
  const lpNode = { x: 990, y: 400, w: 170 }
  const reportNode = { x: 990, y: 480, w: 170 }

  const p1Pts = [[220, 272], [270, 272]]
  const p2Pts = [[450, 272], [500, 272]]
  const pathToAsset = (i: number) => [[680, 272], [720, 272], [720, assetY(i) + 22], [760, assetY(i) + 22]]
  const pathFromAsset = (i: number) => [[920, assetY(i) + 22], [950, assetY(i) + 22], [950, 272], [990, 272]]
  const pathMergeAds = [[1075, 294], [1075, 362]]
  const pathMergeLP = [[1075, 294], [1075, 422]]
  const pathMergeRep = [[1075, 294], [1075, 502]]

  return (
    <div className="pipe-wrap">
      <div className="pipe-canvas">
        <svg className="pipe-svg" viewBox={`0 0 ${W} ${H}`} role="img"
          aria-label="Pipeline-Diagramm: Nach einem 30-Minuten-Onboarding-Call werden sieben Assets automatisch parallel generiert und publiziert. Wiederholt sich für jeden Neukunden.">
          <defs>
            <pattern id="dots" width="24" height="24" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="0.8" fill="#1F2637" />
            </pattern>
            <radialGradient id="particleGrad">
              <stop offset="0%" stopColor="#A8BAFF" />
              <stop offset="60%" stopColor="#6E8BFF" />
              <stop offset="100%" stopColor="#6E8BFF" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill="url(#dots)" />

          <g stroke="#2A3246" strokeWidth={1.5} fill="none">
            <path d={orthoPath(p1Pts)} />
            <path d={orthoPath(p2Pts)} />
            {ASSET_LABELS.map((_, i) => (
              <path key={`pa-${i}`} d={orthoPath(pathToAsset(i))} />
            ))}
            {ASSET_LABELS.map((_, i) => (
              <path key={`pm-${i}`} d={orthoPath(pathFromAsset(i))} />
            ))}
            <path d={orthoPath(pathMergeAds)} />
            <path d={orthoPath(pathMergeLP)} />
            <path d={orthoPath(pathMergeRep)} />
            <path d="M 590 214 L 590 250" strokeDasharray="3 3" />
          </g>

          <g stroke="#6E8BFF" strokeWidth={1.5} fill="none" style={{ filter: 'drop-shadow(0 0 4px #6E8BFF)' }}>
            {p1 !== null && <path d={orthoPath(p1Pts)} opacity={0.6} />}
            {p2 !== null && <path d={orthoPath(p2Pts)} opacity={0.6} />}
            {pAssets.map((p, i) => p !== null && (
              <path key={`pao-${i}`} d={orthoPath(pathToAsset(i))} opacity={0.6} />
            ))}
            {pMerge.map((p, i) => p !== null && (
              <path key={`pmo-${i}`} d={orthoPath(pathFromAsset(i))} opacity={0.6} />
            ))}
          </g>

          <Node x={callNode.x} y={callNode.y} w={callNode.w} label="Onboarding-Call" sub="30 min" active={n1} tier="SOURCE" />
          <Node x={trNode.x} y={trNode.y} w={trNode.w} label="Transkript + KI" sub="extract" active={n2} tier="TRANSFORM" />
          <Node x={engineNode.x} y={engineNode.y} w={engineNode.w} label="n8n Generation" sub="engine" active={n3} tier="ORCHESTRATOR" />
          <Node x={dbNode.x} y={dbNode.y} w={dbNode.w} label="Airtable" sub="state" active={nDB} tier="DB" />

          {ASSET_LABELS.map((a, i) => (
            <Node key={`asset-${i}`} x={ASSET_X} y={assetY(i)} w={160} label={a.l} sub={a.s} active={assets[i]!} tier={`ASSET 0${i + 1}`} />
          ))}

          <Node x={mergeNode.x} y={mergeNode.y} w={mergeNode.w} label="API-Dispatch" sub="publish" active={nMerge} tier="MERGE" />
          <Node x={adsNode.x} y={adsNode.y} w={adsNode.w} label="Meta Ads Live" sub="auto-adj" active={nAds} tier="OUTPUT" />
          <Node x={lpNode.x} y={lpNode.y} w={lpNode.w} label="LP Live" sub="versioned" active={nLP} tier="OUTPUT" />
          <Node x={reportNode.x} y={reportNode.y} w={reportNode.w} label="Weekly Report" sub="auto" active={nReport} tier="TERMINAL" />

          <g transform="translate(720, 272)">
            <circle r="10" fill="#0A0E1A" stroke={(t >= 0.32 && t <= 0.46) ? '#6E8BFF' : '#2A3246'} strokeWidth={1.5} />
            <text fontSize="14" fontFamily="'JetBrains Mono', monospace" fill={(t >= 0.32 && t <= 0.46) ? '#A8BAFF' : '#626874'} textAnchor="middle" y="5">+</text>
          </g>
          <g transform="translate(950, 272)">
            <circle r="10" fill="#0A0E1A" stroke={(t >= 0.56 && t <= 0.72) ? '#6E8BFF' : '#2A3246'} strokeWidth={1.5} />
            <text fontSize="14" fontFamily="'JetBrains Mono', monospace" fill={(t >= 0.56 && t <= 0.72) ? '#A8BAFF' : '#626874'} textAnchor="middle" y="5">+</text>
          </g>

          {p1 !== null && (() => { const { cx, cy } = particleAt(p1Pts, p1); return <circle cx={cx} cy={cy} r="5" fill="url(#particleGrad)" /> })()}
          {p2 !== null && (() => { const { cx, cy } = particleAt(p2Pts, p2); return <circle cx={cx} cy={cy} r="5" fill="url(#particleGrad)" /> })()}
          {pAssets.map((p, i) => {
            if (p === null) return null
            const { cx, cy } = particleAt(pathToAsset(i), p)
            return <circle key={`pa-dot-${i}`} cx={cx} cy={cy} r="4.5" fill="url(#particleGrad)" />
          })}
          {pMerge.map((p, i) => {
            if (p === null) return null
            const { cx, cy } = particleAt(pathFromAsset(i), p)
            return <circle key={`pm-dot-${i}`} cx={cx} cy={cy} r="4.5" fill="url(#particleGrad)" />
          })}
          {pDispatch !== null && (() => {
            const { cx, cy } = particleAt([[1075, 294], [1075, 440]], pDispatch)
            return <circle cx={cx} cy={cy} r="5" fill="url(#particleGrad)" />
          })()}
          {pReport !== null && (() => {
            const { cx, cy } = particleAt([[1075, 294], [1075, 502]], pReport)
            return <circle cx={cx} cy={cy} r="5" fill="url(#particleGrad)" />
          })()}
        </svg>

        <div className="pipe-controls">
          <button className="pipe-play-btn" onClick={() => setPlaying(p => !p)} aria-label={playing ? 'Animation pausieren' : 'Animation starten'}>
            {playing ? '◼ Pause' : '▶ Play'}
          </button>
          <div className="pipe-phase-lbl">{phase}</div>
          <div className="pipe-play-btn" style={{ pointerEvents: 'none' }}>
            Cycle {String(Math.floor(t * 8)).padStart(1, '0')} / 8
          </div>
        </div>
      </div>
    </div>
  )
}

function Method() {
  const phases = [
    { n: 'PHASE 01', name: 'Audit & Blueprint', out: 'Priorisierte Prozess-Map mit den 5 größten KI-Hebeln. Quantifiziert in Euro und Stunden.', t: '7 Tage' },
    { n: 'PHASE 02', name: 'G4U-Setup', out: 'Maschine baut Creatives, LPs, Ads, Reports in deiner Tone-of-Voice. Direkt an deinen Stack angeschlossen.', t: '14 Tage' },
    { n: 'PHASE 03', name: 'Supervised Launch', out: 'Team lernt, KI zu steuern statt selbst zu produzieren. Qualität bleibt oben, Stunden gehen runter.', t: '7 Tage' },
    { n: 'PHASE 04', name: 'Scale & Compound', out: 'Maschine wird jeden Monat schlauer. Output steigt, Personalkosten sinken, Marge klettert.', t: 'ab Tag 30' },
  ]
  return (
    <section className="section" id="methode">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">· Das G4U-System · Generated-for-you</div>
          <h2 className="section-h2">Unsere Methode: <strong>eine Maschine, die für dich produziert</strong> — du steuerst, sie liefert.</h2>
          <p className="lede section-lede">
            Bewährtes 4-Phasen-Framework, validiert mit 40+ Agenturen. Kein Experiment. Schritt für Schritt.
          </p>
        </div>

        <div className="method-viz">
          <div className="method-viz-head">
            <div className="method-viz-ttl">Live: Ein Endkunden-Durchlauf in <strong>&lt; 18 Minuten</strong></div>
            <div className="method-viz-sub">Was früher 21 Tage Teamarbeit war, läuft jetzt in einem Atemzug. Mit Mensch-im-Loop an den richtigen Stellen.</div>
          </div>
          <Pipeline />
          <div className="method-viz-legend">
            <div className="mvl-item"><div className="mvl-l">Laufzeit / Durchlauf</div><div className="mvl-v">&lt; 18 min</div></div>
            <div className="mvl-item"><div className="mvl-l">Dein Input</div><div className="mvl-v">1 × 30-Min-Call</div></div>
            <div className="mvl-item"><div className="mvl-l">Parallele Endkunden</div><div className="mvl-v">unbegrenzt</div></div>
            <div className="mvl-item"><div className="mvl-l">Wartung / Monat</div><div className="mvl-v">~ 10 min</div></div>
          </div>
        </div>

        <div className="method-phases">
          {phases.map((p, i) => (
            <div className="mphase-v3" key={i}>
              <div className="mphase-v3-top">
                <span className="mphase-v3-n">{p.n}</span>
                <span className="mphase-v3-t">⏱ {p.t}</span>
              </div>
              <div className="mphase-v3-name">{p.name}</div>
              <div className="mphase-v3-out">{p.out}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Benefits() {
  const items = [
    { verb: 'Vervielfache', b: <>deinen <strong>Kreativ-Output um das 3- bis 5-fache</strong>, ohne neuen Hire.</>, mech: 'Kreativ-Engine in deiner Tone-of-Voice' },
    { verb: 'Senke', b: <>deine <strong>Fulfillment-Kosten um 60 %</strong> bei gleichem Output.</>, mech: 'Automatisierung mit Qualitäts-Gate' },
    { verb: 'Hebe', b: <>deine <strong>EBIT-Marge von 12 % auf 30–60 %</strong> in 9–14 Monaten.</>, mech: 'Marge-Hebel-System' },
    { verb: 'Gewinne', b: <>die <strong>Kontrolle über dein Wochenende zurück</strong> — Launches passieren, während du schläfst.</>, mech: 'selbstlaufende Launches' },
  ]
  return (
    <section className="section benefits" id="vorteile">
      <div className="wrap">
        <div className="eyebrow">· Stell dir vor</div>
        <h2 className="section-h2" style={{ marginTop: 18 }}>
          Stell dir vor, dein Fulfillment läuft ohne dich — und am Monatsende bleibt endlich wieder Geld übrig.
        </h2>
        <div className="benefits-list">
          {items.map((it, i) => (
            <div className="benefits-item" key={i}>
              <div className="benefits-num">0{i + 1}</div>
              <div className="benefits-verb">{it.verb}</div>
              <div className="benefits-body">{it.b}</div>
              <div className="benefits-mech">Hebel: {it.mech}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ROICalc() {
  const [team, setTeam] = useState(6)
  const [rate, setRate] = useState(75)
  const [hours, setHours] = useState(18)

  const monthly = team * rate * hours * 4.33 * 0.35
  const yearly = monthly * 12
  const invest = 22000
  const payback = Math.max(1.5, invest / monthly)
  const paybackD = payback.toFixed(1)
  const roi12 = Math.round((yearly - invest) / invest * 100)

  const fmt = (n: number) => n.toLocaleString('de-DE', { maximumFractionDigits: 0 })

  const sliders = [
    { key: 'team', label: 'Team-Größe', unit: 'Personen', val: team, min: 1, max: 20, step: 1, set: setTeam, hint: 'Operative Köpfe im Fulfillment' },
    { key: 'rate', label: 'Verrechnungssatz', unit: '€/h', val: rate, min: 40, max: 180, step: 5, set: setRate, hint: 'Deine Kunden-Stundensatz-Durchschnitt' },
    { key: 'hours', label: 'Fulfillment-Stunden', unit: 'h / Woche', val: hours, min: 5, max: 45, step: 1, set: setHours, hint: 'Pro Person · repetitive Arbeit' },
  ]

  return (
    <section className="section rc-sect" id="rechner">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">· Business-Case-Rechner</div>
          <h2 className="section-h2">Wie viel Geld verbrennt dein Fulfillment gerade — und wann ist es eingespielt?</h2>
          <p className="lede section-lede">Drei Regler, ein ehrliches Bild. Wir rechnen konservativ mit 35 % Substitutionsquote. Bei den meisten Kunden sehen wir 45–60 %.</p>
        </div>

        <div className="rc-card">
          <div className="rc-hero">
            <div className="rc-hero-label">
              <span className="rc-hero-dot" />
              Dein Business-Case · live berechnet
            </div>
            <div className="rc-hero-grid">
              <div className="rc-hero-main">
                <div className="rc-hero-k">Eingespart / Jahr</div>
                <div className="rc-hero-v">
                  <span className="rc-hero-cur">€</span>
                  <span className="rc-hero-num">{fmt(yearly)}</span>
                </div>
                <div className="rc-hero-sub">Substituierbarer Fulfillment-Wert · konservativ bei 35 %</div>
              </div>
              <div className="rc-hero-side">
                <div className="rc-hero-kpi">
                  <div className="rc-hero-kpi-v">{paybackD}<span className="rc-hero-kpi-u">Mon</span></div>
                  <div className="rc-hero-kpi-l">Break-Even</div>
                </div>
                <div className="rc-hero-divider" />
                <div className="rc-hero-kpi">
                  <div className="rc-hero-kpi-v">{roi12 > 0 ? '+' : ''}{fmt(roi12)}<span className="rc-hero-kpi-u">%</span></div>
                  <div className="rc-hero-kpi-l">ROI · 12 Monate</div>
                </div>
              </div>
            </div>
          </div>

          <div className="rc-sep">
            <span className="rc-sep-l" />
            <span className="rc-sep-lbl">Deine Parameter</span>
            <span className="rc-sep-l" />
          </div>

          <div className="rc-sliders">
            {sliders.map(s => {
              const p = ((s.val - s.min) / (s.max - s.min) * 100).toFixed(1)
              const style = { '--p': `${p}%` } as CSSProperties
              return (
                <div className="rc-slider" key={s.key}>
                  <div className="rc-slider-head">
                    <div className="rc-slider-label">{s.label}</div>
                    <div className="rc-slider-value">
                      <span className="rc-slider-num">{s.val}</span>
                      <span className="rc-slider-unit">{s.unit}</span>
                    </div>
                  </div>
                  <div className="rc-slider-track-wrap">
                    <input
                      type="range" min={s.min} max={s.max} step={s.step}
                      value={s.val} onChange={e => s.set(+e.target.value)}
                      className="rc-range"
                      style={style}
                    />
                    <div className="rc-slider-scale">
                      <span>{s.min}</span><span>{s.max}</span>
                    </div>
                  </div>
                  <div className="rc-slider-hint">{s.hint}</div>
                </div>
              )
            })}
          </div>

          <div className="rc-foot">
            <div className="rc-foot-meta">
              <div className="rc-foot-meta-k">Monatlich</div>
              <div className="rc-foot-meta-v">{fmt(monthly)} €</div>
            </div>
            <div className="rc-foot-meta">
              <div className="rc-foot-meta-k">Investment</div>
              <div className="rc-foot-meta-v">ab 22.000 €</div>
            </div>
            <div className="rc-foot-cta">
              <a className="btn btn-primary" href="/bewerbung">Eigenen Case rechnen lassen <ZMArrow /></a>
            </div>
          </div>

          <div className="rc-fineprint">
            Konservativ bei 35 % Substitutionsquote · Investment-Bandbreite 22–48 k € je Setup-Umfang · exakter Case im Erstgespräch
          </div>
        </div>
      </div>
    </section>
  )
}

function Cases() {
  const items = [
    {
      av: 'LH', n: 'Lukas Hartmann', m: 'Gründer · Northpeak Performance · Köln',
      tag: 'FULFILLMENT · AD-CREATIVE PRODUCTION',
      headline: 'Ad-Creatives × 5 pro Woche — bei halbierten Produktionskosten.',
      q: 'Wir liefern heute pro Kunde wöchentlich 30+ Creatives statt 6. Meta-Performance ist hoch wie nie, und das Design-Team atmet wieder.',
      problem: [
        'Creative-Fatigue killte Ad-Performance nach 10–14 Tagen',
        'Design-Team produzierte 5–8 Assets pro Kunde/Woche — zu wenig',
        'Jeder neue Kunde verschärfte den Creative-Bottleneck',
      ],
      umgesetzt: [
        'KI-Creative-Pipeline aus Briefing: Copy, Static, Video-Cuts in Kunden-CI',
        'Winning-Ad-Parser zieht Top-Performer automatisch in Varianten',
        'Review-Queue mit Human-in-the-Loop vor dem Ad-Upload',
      ],
      ziel: [
        'Creative-Output pro Kunde verfünffachen',
        'CPA stabil halten trotz höherem Volume',
        'Design-Team auf Konzept statt Copy-Paste',
      ],
      ba: [{ l: 'Creatives/Kunde/W', b: '6', a: '32' }, { l: 'Produktionskosten', b: '100 %', a: '48 %' }, { l: 'CTR Ø', b: '1,4 %', a: '2,3 %' }],
    },
    {
      av: 'KS', n: 'Kerem Süslü', m: 'Gründer · CubeFilm · Leverkusen',
      tag: 'FULFILLMENT · VIDEO-PRODUCTION AUTOMATION',
      headline: 'Erklärvideo-Produktion von 3 Wochen auf 4 Tage — bei gleichbleibender Qualität.',
      q: 'Skript, Storyboard und Voiceover-Drafts entstehen jetzt in Stunden statt Tagen. Wir können doppelt so viele Projekte stemmen, ohne das Team zu vergrößern.',
      problem: [
        'Skript und Storyboard-Konzepte fraßen pro Projekt mehrere Tage',
        'Jeder neue Kunde = kompletter manueller Kickoff-Marathon',
        'Skalierung scheiterte am Creative-Bottleneck, nicht an Demand',
      ],
      umgesetzt: [
        'KI-Skript-Generator in CubeFilm-Tonalität, direkt aus Briefing',
        'Automatisierte Storyboard-Vorschläge + Voiceover-Drafts per API',
        'Kunden-Feedback-Loop mit automatischer Revisions-Pipeline',
      ],
      ziel: [
        'Produktionszeit pro Projekt drittel',
        'Parallele Kundenzahl verdoppeln',
        'Team-Fokus auf Kreativ-Direktion statt Fleißarbeit',
      ],
      ba: [{ l: 'Projekt-Durchlauf', b: '21 T', a: '4 T' }, { l: 'Skript-Erstellung', b: '2,5 T', a: '3 h' }, { l: 'Projekte/Monat', b: '6', a: '14' }],
    },
    {
      av: 'TB', n: 'Tobias Brenner', m: 'Gründer · Performance-Agentur · München',
      tag: 'FULFILLMENT · REPORTING & ONBOARDING',
      headline: 'Freitags kein Reporting mehr. Und trotzdem 2× Kunden pro Team.',
      q: 'Der Hebel, den ich immer wollte: Wir wachsen, das Team nicht. Die Maschine liefert, nicht die Headcount-Zahl.',
      problem: [
        'Client-Reporting fraß jeden Freitag 18–22 Stunden Teamzeit',
        'Onboarding eines neuen Kunden zog sich über 3 Wochen',
        'Ad-Account-Pflege war Daily-Handarbeit — kein Raum für Strategie',
      ],
      umgesetzt: [
        'Automatisiertes Weekly-Reporting aus Meta/Google Ads mit Kunden-CI',
        'Onboarding-Kit generiert sich selbst nach Kickoff-Call (Briefing → Setup)',
        'Ad-Management-Agent überwacht Budgets, Fatigue und schlägt Optimierungen vor',
      ],
      ziel: [
        '2× Kundenzahl pro Mitarbeitenden',
        'Reporting von 20h auf unter 1h pro Woche',
        'Onboarding von 3 Wochen auf 3 Tage',
      ],
      ba: [{ l: 'Kunden/MA', b: '2,1', a: '4,8' }, { l: 'Reporting/W', b: '20h', a: '45 min' }, { l: 'Onboarding', b: '21 T', a: '3 T' }],
    },
  ]
  return (
    <section className="section elev" id="faelle">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">· Fallstudien aus der Praxis</div>
          <h2 className="section-h2">Drei Fulfillment-Transformationen. <strong>Ein System.</strong></h2>
          <p className="lede section-lede">
            Echte Problem-Räume, konkrete Umsetzungen, messbare Ergebnisse. Keine Rosinen-Picks, keine hypothetischen Zahlen.
          </p>
        </div>
        <div className="cases-list">
          {items.map((c, i) => (
            <article className={`case-card ${i % 2 === 1 ? 'reverse' : ''}`} key={i}>
              <div className="case-head">
                <div className="case-tag">{c.tag}</div>
                <h3 className="case-headline">{c.headline}</h3>
                <div className="case-ppl">
                  <div className="case-av">{c.av}</div>
                  <div>
                    <div className="case-n">{c.n}</div>
                    <div className="case-m">{c.m}</div>
                  </div>
                </div>
              </div>
              <div className="case-body">
                <div className="case-img">
                  <div className="case-img-tag">PORTRAIT · {c.n.split(' ')[0]}</div>
                </div>
                <div className="case-points">
                  <div className="case-point">
                    <div className="case-point-l problem">01 · Problem</div>
                    <ul>{c.problem.map((p, j) => <li key={j}>{p}</li>)}</ul>
                  </div>
                  <div className="case-point">
                    <div className="case-point-l action">02 · Umsetzung</div>
                    <ul>{c.umgesetzt.map((p, j) => <li key={j}>{p}</li>)}</ul>
                  </div>
                  <div className="case-point">
                    <div className="case-point-l goal">03 · Ziel erreicht</div>
                    <ul>{c.ziel.map((p, j) => <li key={j}>{p}</li>)}</ul>
                  </div>
                </div>
              </div>
              <div className="case-quote">„{c.q}"</div>
              <div className="case-ba">
                {c.ba.map((m, j) => (
                  <div className="case-ba-item" key={j}>
                    <div className="case-ba-l">{m.l}</div>
                    <div className="case-ba-row">
                      <div className="case-ba-col"><span className="case-ba-lbl">Vorher</span><span className="case-ba-v">{m.b}</span></div>
                      <span className="case-ba-arr"><ZMArrow size={14} /></span>
                      <div className="case-ba-col after"><span className="case-ba-lbl">Nachher</span><span className="case-ba-v">{m.a}</span></div>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    { n: '01', t: 'Bewerbung', d: '12 kurze Fragen. 3 Minuten. Hilft uns, dein Setup zu verstehen.' },
    { n: '02', t: 'Strategiegespräch', d: '30 Min Zoom. Wir prüfen Fit und zeigen dir konkrete Hebel für deine Agentur.' },
    { n: '03', t: 'Audit & Blueprint', d: 'Wir durchleuchten deine Prozesse. Du bekommst eine priorisierte Hebel-Map in Euro & Stunden.' },
    { n: '04', t: 'Kickoff & G4U-Setup', d: '14 Tage Build. Wir schließen KI-Engine an deinen Stack an, bauen Flows in deiner Tone-of-Voice.' },
    { n: '05', t: 'Supervised Launch', d: 'Dein Team lernt, KI zu steuern. Wir begleiten erste Endkunden-Durchläufe.' },
    { n: '06', t: 'Scale & Compound', d: 'Maschine läuft ohne dich. Monatliche Optimierungen heben Output weiter.' },
  ]
  return (
    <section className="section" id="ablauf">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">· Ablauf der Zusammenarbeit</div>
          <h2 className="section-h2">Vom ersten Klick bis zur <strong>laufenden Maschine</strong> — 6 Schritte, klar geregelt.</h2>
        </div>
        <div className="process-list">
          {steps.map((s, i) => (
            <div className="process-step" key={i}>
              <div className="process-step-n">{s.n}</div>
              <div className="process-step-body">
                <div className="process-step-t">{s.t}</div>
                <div className="process-step-d">{s.d}</div>
              </div>
              {i < steps.length - 1 && <div className="process-step-line" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Expert() {
  return (
    <section className="section elev" id="experte">
      <div className="wrap expert">
        <div className="expert-portrait">
          <img src="/claudio.jpg" alt="Claudio Di Franco — Gründer Flowstack" className="expert-portrait-img" loading="lazy" decoding="async" />
          <div className="expert-portrait-tag">GRÜNDER · FLOWSTACK</div>
        </div>
        <div className="expert-body">
          <div className="eyebrow">· Wer hinter Flowstack steht</div>
          <h2 className="section-h2" style={{ marginTop: 18 }}>Einer, der selbst eine Agentur skaliert hat. <strong>Und dann nochmal.</strong></h2>
          <p className="expert-p">
            Claudio hat mit 24 seine erste Performance-Agentur gegründet und sie in 3 Jahren auf 2,1 Mio Umsatz skaliert — mit 11 Mitarbeitern und 9 % EBIT. Genug für den Namen, zu wenig für ein echtes Asset.
          </p>
          <p className="expert-p">
            2023 hat er den kompletten Stack auf KI umgestellt. Heute macht dieselbe Firma <strong>3,4 Mio Umsatz mit 4 Mitarbeitern und 47 % EBIT</strong>. Flowstack ist das System, das daraus entstanden ist.
          </p>
          <div className="expert-credits">
            <div className="expert-credit"><div className="expert-credit-v">40+</div><div className="expert-credit-l">Agenturen als Klienten seit 2023</div></div>
            <div className="expert-credit"><div className="expert-credit-v">OMR</div><div className="expert-credit-l">Speaker 2024 · KI im Marketing</div></div>
            <div className="expert-credit"><div className="expert-credit-v">t3n</div><div className="expert-credit-l">Interview · KI-first Agenturen, 2025</div></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function MidCTA() {
  return (
    <section className="midcta">
      <div className="wrap">
        <div className="midcta-card">
          <div>
            <div className="midcta-eyebrow">· Zwischenstopp</div>
            <div className="midcta-t">Bereit, das System für deine Agentur <strong>aufzusetzen</strong>?</div>
            <div className="midcta-s">12-Fragen-Bewerbung, 3 Minuten. Rückruf bei Fit in 24 h.</div>
          </div>
          <a className="btn btn-primary btn-lg" href="/bewerbung">Jetzt bewerben <ZMArrow /></a>
        </div>
      </div>
    </section>
  )
}

function TeamSection() {
  const team = [
    { av: 'CD', n: 'Claudio Di Franco', r: 'Gründer & Systems Architect', x: 'Strategie · G4U-Framework' },
    { av: 'SL', n: 'Sarah Lenz', r: 'Head of Implementation', x: 'Technisches Setup · Audits' },
    { av: 'JK', n: 'Jonas Kramm', r: 'AI Workflow Engineer', x: 'Flows · Integrationen' },
    { av: 'MR', n: 'Mira Reis', r: 'Client Success', x: 'Onboarding · Betreuung' },
  ]
  return (
    <section className="section" id="team">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">· Das Team hinter dem System</div>
          <h2 className="section-h2">Vier Menschen, die deine <strong>Infrastruktur aufsetzen</strong>.</h2>
        </div>
        <div className="team-v3-grid">
          {team.map((p, i) => (
            <div className="team-v3-card" key={i}>
              <div className="team-v3-av">{p.av}</div>
              <div className="team-v3-n">{p.n}</div>
              <div className="team-v3-r">{p.r}</div>
              <div className="team-v3-x">{p.x}</div>
            </div>
          ))}
        </div>
        <p className="team-v3-foot">
          Willst du das ganze Team sehen? <a href="#">Zur Team-Seite →</a>
        </p>
      </div>
    </section>
  )
}

function SocialLocation() {
  const socials = [
    { p: 'LinkedIn', h: 'linkedin.com/in/claudiodifranco' },
    { p: 'Instagram', h: '@flowstack.system' },
    { p: 'YouTube', h: '@FlowstackSystem' },
    { p: 'Spotify', h: 'Podcast · Die 10-Minuten-Agentur' },
  ]
  return (
    <section className="section elev">
      <div className="wrap social-loc">
        <div className="social-loc-col">
          <div className="eyebrow">· Folge uns</div>
          <h3 className="social-loc-h">Wo du uns online triffst.</h3>
          <div className="social-list">
            {socials.map(s => (
              <a className="social-item" href="#" key={s.p}>
                <span className="social-p">{s.p}</span>
                <span className="social-h">{s.h}</span>
                <ZMArrow size={13} />
              </a>
            ))}
          </div>
        </div>
        <div className="social-loc-col">
          <div className="eyebrow">· Standort</div>
          <h3 className="social-loc-h">Köln — physisch & remote.</h3>
          <div className="loc-card">
            <div className="loc-addr">
              Flowstack System GmbH<br />
              Ehrenfeldgürtel 14<br />
              50823 Köln · Deutschland
            </div>
            <div className="loc-meta">
              <div><span className="loc-lbl">Büro</span><span>Mo–Fr · 9–18 Uhr</span></div>
              <div><span className="loc-lbl">Team</span><span>Remote-first, DACH-verteilt</span></div>
              <div><span className="loc-lbl">Kontakt</span><span>hallo@flowstack-system.de</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function PressFeatures() {
  const features = [
    { src: 't3n', t: '„Die KI-Agentur als Geschäftsmodell der Zukunft"', y: '2025' },
    { src: 'OMR', t: 'Speaker · KI im Marketing Stack', y: '2024' },
    { src: 'Horizont', t: 'Agentur-Ranking · „Stille Profitmacher 2025"', y: '2025' },
    { src: 'Gründerszene', t: 'Interview · „Wie KI Agenturen reorganisiert"', y: '2025' },
  ]
  return (
    <section className="section" id="presse">
      <div className="wrap">
        <div className="section-head">
          <div className="eyebrow">· Presse & Medienauftritte</div>
          <h2 className="section-h2">Wo über Flowstack <strong>gesprochen wird</strong>.</h2>
        </div>
        <div className="press-grid">
          {features.map((f, i) => (
            <a className="press-card" href="#" key={i}>
              <div className="press-src">{f.src}</div>
              <div className="press-t">{f.t}</div>
              <div className="press-y">{f.y} <ZMArrow size={12} /></div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const [open, setOpen] = useState<number>(0)
  const items = [
    { q: 'Was kostet das?', a: 'Setup im mittleren 5-stelligen Bereich, Fix-Preis nach Audit. Amortisation typischerweise < 6 Monate. Kein Retainer-Zwang, einmalig.' },
    { q: 'Wie lange dauert das Setup?', a: '21 Tage vom Kickoff bis zum ersten automatisierten Endkunden-Durchlauf. 7 Tage Audit, 14 Tage Build.' },
    { q: 'Müssen wir unseren Stack wechseln?', a: 'Nein. HubSpot, Notion, Airtable, GA4, Meta, Google Ads, Asana, Slack. Nur bei echten Blockern schlagen wir Alternativen vor.' },
    { q: 'DSGVO und Datenschutz?', a: 'Alle Flows auf EU-Servern oder lokal. AV-Verträge mit allen Modell-Anbietern (OpenAI Enterprise, Anthropic Business). Keine Trainings-Daten.' },
    { q: 'Was, wenn die KI Fehler macht?', a: 'Human-in-the-Loop in allen kritischen Schritten. KI produziert, Mensch gibt frei. Confidence-Thresholds eskalieren Edge-Cases automatisch.' },
    { q: 'Können wir das System später selbst warten?', a: 'Ja. Doku, Video-Walkthroughs, 2-tägige Team-Schulung. Viele Kunden fahren nach 6 Monaten eigenständig.' },
    { q: 'Wie ist die Erfolgsquote?', a: 'Von 40+ begleiteten Agenturen haben 37 den EBIT-Sprung auf 30 %+ erreicht. 2 sind früh ausgestiegen, 1 Fit-Mismatch. Wir qualifizieren hart vorher.' },
  ]
  return (
    <section className="section elev" id="faq">
      <div className="wrap">
        <div className="eyebrow">· Häufige Fragen</div>
        <div className="faq-grid">
          <div>
            <h2 className="section-h2" style={{ marginBottom: 18 }}>Was dich vor dem Gespräch noch <strong>beschäftigt</strong>.</h2>
            <p className="faq-aside">
              Noch unklar? Schreib direkt an <strong>hallo@flowstack-system.de</strong> — Antwort werktags in 12 h.
            </p>
          </div>
          <div className="faq-list">
            {items.map((it, i) => (
              <div className={`faq-item ${open === i ? 'open' : ''}`} key={i} onClick={() => setOpen(open === i ? -1 : i)}>
                <div className="faq-q">{it.q}<span className="faq-plus">+</span></div>
                <div className="faq-a">{it.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalCTA() {
  return (
    <section className="fcta" id="final">
      <div className="wrap">
        <div className="fcta-card">
          <span className="froi-chip"><span className="dot" /> Noch 3 Onboarding-Slots in Q3</span>
          <h2 className="fcta-h">In 10 Minuten weißt du, <strong>ob es passt</strong>.</h2>
          <p className="fcta-s">Kurzes Gespräch. Wir prüfen, ob dein Fulfillment wirklich automatisierbar ist — oder nicht.</p>
          <div className="fcta-row">
            <a className="btn btn-primary btn-lg" href="/bewerbung">Jetzt kostenloses Gespräch sichern <ZMArrow /></a>
            <span className="fcta-meta">30 Min · kostenlos · kein Sales-Druck</span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-inner">
          <div>
            <a className="logo" href="/"><span className="logo-mark" />Flowstack</a>
            <p className="footer-claim">Das KI-Fliessband für Marketing-Agenturen. Heute, morgen, in zwei Jahren.</p>
          </div>
          <div className="footer-col">
            <h4>Produkt</h4>
            <a href="#methode">Methode</a>
            <a href="#faelle">Fallstudien</a>
            <a href="#ablauf">Ablauf</a>
            <a href="#faq">FAQ</a>
            <a href="/bewerbung">Bewerbung</a>
          </div>
          <div className="footer-col">
            <h4>Firma</h4>
            <a href="/">Hauptseite</a>
            <a href="#team">Team</a>
            <a href="#presse">Presse</a>
            <a href="/">Startseite</a>
          </div>
          <div className="footer-col">
            <h4>Rechtliches</h4>
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
            <a href="/agb">AGB</a>
            <a href="/bewerbung">Kontakt</a>
          </div>
        </div>
        <div className="footer-bottom">
          <div>© 2026 Flowstack System GmbH · Köln</div>
          <div className="mono">Made in Köln</div>
        </div>
      </div>
    </footer>
  )
}

function StickyMobileCTA() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.body.classList.toggle('has-sticky', window.innerWidth <= 720)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className={`sticky-mobile ${visible ? 'visible' : ''}`}>
      <a className="btn btn-primary" href="/bewerbung">Jetzt bewerben <ZMArrow /></a>
    </div>
  )
}

export function FulfillmentAutomation() {
  useSeo({
    title: 'Die 10-Minuten-Agentur · Flowstack System',
    description:
      'In 21 Tagen zur 10-Minuten-Agentur. Wir bauen dir ein KI-Fließband für dein Fulfillment — Creatives, Ads, Landingpages, Reports laufen automatisiert.',
    path: '/fulfillment-automation',
  })

  return (
    <div className="marketing-root marketing-fulfillment">
      <AvailBanner />
      <Nav />
      <Hero />
      <TrustRow />
      <Problems />
      <Audience />
      <Method />
      <Benefits />
      <ROICalc />
      <Cases />
      <Process />
      <Expert />
      <MidCTA />
      <TeamSection />
      <SocialLocation />
      <PressFeatures />
      <FAQ />
      <FinalCTA />
      <Footer />
      <StickyMobileCTA />
    </div>
  )
}
