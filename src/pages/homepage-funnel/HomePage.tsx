import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { useSeo } from '@/shared/seo/useSeo'
import '@/styles/marketing-flowstack-landing.css'

type IconProps = { size?: number }
type IcoProps = IconProps & { d: string }

const Ico = ({ d, size = 18 }: IcoProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
    <path d={d} />
  </svg>
)

const Check = ({ size = 16 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const Arrow = ({ size = 14 }: IconProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

function AvailBanner() {
  return (
    <div className="avail-banner">
      <strong>Aktuell 3 Onboarding-Plätze frei</strong> für Q2
      <a href="/bewerbung">Kostenloses Strategiegespräch sichern →</a>
    </div>
  )
}

function Nav() {
  return (
    <nav className="nav">
      <div className="wrap nav-inner">
        <a className="logo" href="/">
          <span className="logo-mark" />
          Flowstack System
        </a>
        <div className="nav-links">
          <a href="#methode">Methode</a>
          <a href="#rechner">ROI-Rechner</a>
          <a href="#cases">Cases</a>
          <a href="#faq">FAQ</a>
        </div>
        <div className="nav-cta">
          <a className="btn btn-ghost btn-sm" href="#rechner">Zeit berechnen</a>
          <a className="btn btn-primary btn-sm" href="/bewerbung">Jetzt bewerben <Arrow /></a>
        </div>
      </div>
    </nav>
  )
}

type HeroNode = { name: string; sub: string; ico: string; status: string }

function HeroVisual() {
  const [active, setActive] = useState(1)
  useEffect(() => {
    const t = setInterval(() => setActive(a => (a + 1) % 4), 2200)
    return () => clearInterval(t)
  }, [])
  const nodes: HeroNode[] = [
    { name: 'Neuer Lead aus Meta Ads', sub: 'Webhook Trigger', ico: 'M22 2 11 13M22 2l-7 20-4-9-9-4 20-7Z', status: 'TRIGGER' },
    { name: 'KI qualifiziert & scort Lead', sub: 'GPT-4 · Scoring 0–100', ico: 'M12 2a5 5 0 0 1 5 5v3a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5ZM8 14h8v8H8z', status: 'RUNNING' },
    { name: 'CRM-Eintrag + Slack-Ping', sub: 'HubSpot · Slack', ico: 'M4 6h16M4 12h16M4 18h10', status: 'QUEUED' },
    { name: 'Personalisierte E-Mail-Sequenz', sub: '4-Step Nurture · Deutsch', ico: 'M4 4h16v16H4zM4 4l8 8 8-8', status: 'QUEUED' },
  ]
  return (
    <div className="hero-visual">
      <div className="wf-card">
        <div className="wf-head">
          <div className="wf-head-title"><span className="dot" /> flowstack / leads.inbound.v3</div>
          <div className="wf-head-meta">LIVE · 14,832 runs / mo</div>
        </div>
        <div className="wf-nodes">
          {nodes.map((n, i) => (
            <div key={i} className={`wf-node ${active === i ? 'active' : ''}`}>
              {i > 0 && <div className="wf-connector" />}
              <div className="wf-ico"><Ico d={n.ico} size={16} /></div>
              <div>
                <div className="wf-name">{n.name}</div>
                <div className="wf-sub">{n.sub}</div>
              </div>
              <div className="wf-status"><span className="d" /> {active === i ? 'ACTIVE' : n.status}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="hero-stat">
        <div className="hero-stat-num">87h</div>
        <div className="hero-stat-lbl">Manuelle Arbeit, ersetzt pro Monat</div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-grid">
        <div>
          <span className="chip"><span className="dot" /> Aktuell 3 Onboarding-Plätze frei in Q2</span>
          <h1 style={{ marginTop: 24 }}>
            Gib deiner Agentur <strong>20 Stunden</strong> pro Woche zurück — mit KI-Automatisierung, die wirklich läuft.
          </h1>
          <p className="lede" style={{ marginTop: 24 }}>
            Flowstack baut maßgeschneiderte KI-Workflows für Marketing-Agenturen.
            Reporting, Content-Produktion, Lead-Qualifizierung, Client-Onboarding — automatisiert in 30 Tagen, betreut von Profis.
          </p>
          <div className="hero-ctas">
            <a className="btn btn-primary" href="#rechner">Ersparnis berechnen <Arrow /></a>
            <a className="btn btn-ghost" href="#cases">Cases ansehen</a>
          </div>
          <div className="hero-sub">
            <Check size={14} /> Keine Vorkasse · Setup in 30 Tagen · 100% DSGVO-konform
          </div>
        </div>
        <HeroVisual />
      </div>
    </section>
  )
}

function TrustStrip() {
  const kpis = [
    { v: '40+', e: '', l: 'Agenturen im DACH-Raum, die mit Flowstack arbeiten' },
    { v: '', e: '18.300h', l: 'Manuelle Arbeit pro Monat ersetzt über alle Kunden' },
    { v: '', e: '× 3.2', l: 'Durchschnittliche Outputsteigerung pro Mitarbeitender' },
    { v: '', e: '€ 2.4M', l: 'Eingesparte Personalkosten in 12 Monaten, summiert' },
  ]
  return (
    <section className="trust-strip">
      <div className="wrap">
        <div className="trust-grid">
          {kpis.map((k, i) => (
            <div className="trust-item" key={i}>
              <div className="trust-num">{k.v}{k.e && <em>{k.e}</em>}</div>
              <div className="trust-lbl">{k.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Marquee() {
  return (
    <div className="marquee">
      <div className="wrap marquee-inner">
        <span className="marquee-label">Vertraut von 40+ Agenturen in DACH</span>
        <div className="logos">
          <span className="serif">Northfield &amp; Co.</span>
          <span>NOVA MEDIA</span>
          <span className="serif">Kobalt Studio</span>
          <span>POLARIS/</span>
          <span className="serif">Feldmann Digital</span>
        </div>
      </div>
    </div>
  )
}

function Empathy() {
  return (
    <section className="empathy">
      <div className="wrap empathy-inner">
        <span className="eyebrow">Direkt gesagt</span>
        <h2 style={{ marginTop: 18 }}>
          Es ist <strong>nicht deine Schuld</strong>, dass deine Agentur nicht skaliert, ohne dass deine Marge darunter leidet.
        </h2>
        <p>
          Du hast alles richtig gemacht. Du hast einen starken Service aufgebaut, Kunden gewonnen, Mitarbeiter eingestellt. Und trotzdem steckst du fest: Jeder neue Kunde braucht neue Stunden, jede neue Stunde braucht neue Menschen, jeder neue Mensch frisst die Marge.
        </p>
        <p>
          Die Wahrheit ist: Das klassische Agentur-Modell ist kaputt. Es ist für eine Welt gebaut worden, in der KI keine Creatives produzieren, keine Landingpages schreiben und keine Auswertungen liefern konnte. Diese Welt gibt es seit 18 Monaten nicht mehr.
        </p>
        <div className="empathy-sign">
          <div className="empathy-sign-av">CD</div>
          <div>
            <div className="empathy-sign-name">Claudio Di Franco</div>
            <div className="empathy-sign-role">Gründer, Flowstack System</div>
          </div>
        </div>
      </div>
    </section>
  )
}

type MirrorTier = 'operational' | 'emotional' | 'identity'
type MirrorItem = { tier: MirrorTier; t: string; q: string; s: string }

function Mirror() {
  const items: MirrorItem[] = [
    { tier: 'operational', t: 'Operativ', q: 'Jede neue Kundenanfrage fühlt sich nach mehr Arbeit an als nach mehr Umsatz.', s: 'Du rechnest im Kopf durch, wie viele Stunden deine Leute für den nächsten Kunden frei haben. Nicht, wie viel Marge er bringt.' },
    { tier: 'operational', t: 'Operativ', q: 'Du klickst selbst noch in Ads-Managern und baust Reports in Google Sheets.', s: 'Obwohl du Geschäftsführer:in bist, nicht Junior Media Buyer. Weil es sonst keiner richtig macht.' },
    { tier: 'emotional', t: 'Emotional', q: 'Du arbeitest mehr als vor zwei Jahren, aber die EBIT-Marge ist dieselbe.', s: 'Umsatz verdoppelt, Gewinn stagniert. Jede Einstellung frisst den Hebel wieder auf, den du gerade aufgebaut hast.' },
    { tier: 'emotional', t: 'Emotional', q: 'Am Wochenende denkst du an die 5 Posts, die am Montag live müssen.', s: 'Fulfillment-Druck verfolgt dich bis in den Sonntag. Abschalten wird zur Illusion.' },
    { tier: 'identity', t: 'Identität', q: 'Du hast aufgehört zu sagen: „Ich baue eine Agentur, die einmal ohne mich läuft."', s: 'Stattdessen: „Ich halte den Laden zusammen, solange es geht." Das war nie der Plan.' },
    { tier: 'identity', t: 'Identität', q: 'Du fragst dich, ob du überhaupt noch Unternehmer:in bist oder nur der bestbezahlte Mitarbeiter.', s: 'Die Firma hängt an dir. Wenn du eine Woche ausfällst, steht alles. Das ist kein Asset, das ist ein Job.' },
  ]
  return (
    <section className="section" id="mirror">
      <div className="wrap">
        <span className="eyebrow">Welcher dieser 6 Störfaktoren bremst dich?</span>
        <h2 style={{ marginTop: 18, maxWidth: 820 }}>
          Wenn du dich in auch nur einer dieser Situationen wiedererkennst, lies weiter.
        </h2>
        <div className="mirror-grid">
          {items.map((it, i) => (
            <div className="mirror" key={i}>
              <div className={`mirror-tier ${it.tier}`}>· {it.t}</div>
              <div className="mirror-q">{it.q}</div>
              <div className="mirror-s">{it.s}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

type PreviewItem = { v: string; body: ReactNode }

function Preview() {
  const items: PreviewItem[] = [
    { v: 'Vervielfache', body: <>deinen <strong>Kreativ-Output um das 3- bis 5-fache</strong>, ohne einen einzigen neuen Hire. Die KI produziert in deiner Tone-of-Voice, dein Team gibt frei.<span className="mech">Hebel: Kreativ-Engine mit deiner Tone-of-Voice</span></> },
    { v: 'Senke', body: <>deine <strong>Fulfillment-Kosten um bis zu 60%</strong> bei gleichem Output. Die wiederholbaren 70% deines Delivery-Prozesses laufen automatisiert, dein Team macht Qualitätskontrolle.<span className="mech">Hebel: Automatisierung mit Qualitäts-Gate</span></> },
    { v: 'Hebe', body: <>deine <strong>EBIT-Marge von 12% auf 30 bis 60%</strong> in 9 bis 14 Monaten — nicht durch mehr Umsatz, sondern weil dein größter Kostenblock (Personal) kleiner wird, nicht größer.<span className="mech">Hebel: Marge-Hebel-System</span></> },
    { v: 'Gewinne', body: <>die <strong>Kontrolle über dein Wochenende zurück</strong>. Ad-Launches, Landingpages und Reportings bauen sich, während du schläfst.<span className="mech">Hebel: selbstlaufende Launches</span></> },
  ]
  return (
    <section className="preview">
      <div className="wrap preview-inner">
        <span className="eyebrow">Stell dir vor</span>
        <h2 style={{ marginTop: 18 }}>
          Stell dir vor, dein Fulfillment läuft ohne dich — und am Monatsende bleibt endlich wieder Geld übrig.
        </h2>
        <div className="preview-list">
          {items.map((it, i) => (
            <div className="preview-item" key={i}>
              <div className="preview-verb">{it.v}</div>
              <div className="preview-body">{it.body}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Method() {
  const phases = [
    { n: 'PHASE 01', name: 'Audit & Blueprint', out: 'Priorisierte Prozess-Map mit den 5 größten KI-Hebeln deiner Agentur, quantifiziert in Euro und Stunden.', time: '7 Tage' },
    { n: 'PHASE 02', name: 'G4U-Setup', out: 'Maschine baut Creatives, Landingpages, Ad-Launches und Reports in deiner Tone-of-Voice. Direkt an deinen Stack angeschlossen.', time: '14 Tage' },
    { n: 'PHASE 03', name: 'Supervised Launch', out: 'Dein Team lernt, die KI zu steuern statt selbst zu produzieren. Qualität bleibt oben, Stunden gehen runter.', time: '7 Tage' },
    { n: 'PHASE 04', name: 'Scale & Compound', out: 'Jeden Monat wird die Maschine schlauer. Dein Output steigt, deine Personalkosten sinken, deine Marge klettert.', time: 'ab Tag 30' },
  ]
  return (
    <section className="method" id="methode">
      <div className="wrap">
        <div className="method-head">
          <div>
            <span className="eyebrow">Das Flowstack G4U-System</span>
            <h2 style={{ marginTop: 18 }}>
              Generated-for-you statt Done-for-you. In 4 Phasen zur KI-Fliessband-Agentur.
            </h2>
          </div>
          <p className="lede" style={{ fontSize: 16 }}>
            Bewährtes, systematisches Framework — validiert mit 40+ Agenturen zwischen 50k und 3 Mio Jahresumsatz. Kein Experiment, kein „Mal sehen". Schritt für Schritt.
          </p>
        </div>
        <div className="method-grid">
          {phases.map((p, i) => (
            <div className="mphase" key={i}>
              <div className="mphase-n">{p.n}</div>
              <div className="mphase-name">{p.name}</div>
              <div className="mphase-out">{p.out}</div>
              <div className="mphase-time">⏱ {p.time}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

type AnchorCTAProps = { title: ReactNode; sub: string; cta: string }

function AnchorCTA({ title, sub, cta }: AnchorCTAProps) {
  return (
    <section className="anchor-cta">
      <div className="wrap">
        <div className="anchor-card">
          <div>
            <div className="anchor-title">{title}</div>
            <div className="anchor-sub">{sub}</div>
          </div>
          <a className="btn btn-primary btn-lg" href="/bewerbung">{cta} <Arrow /></a>
        </div>
      </div>
    </section>
  )
}

type OutcomeItem = {
  av: string
  name: string
  meta: string
  quote: string
  before: { k: string; v: string }
  after: { k: string; v: string }
}

function Outcomes() {
  const items: OutcomeItem[] = [
    { av: 'LW', name: 'Leonie W.', meta: 'Agenturinhaberin, 34 · Social-Media-Agentur, Berlin', quote: '„Wir haben den Sprung geschafft, von dem alle nur reden. Unsere Marge hat sich verdreifacht, weil unser Team die halbe Zeit mit Creatives verbringt."', before: { k: 'EBIT-Marge', v: '11%' }, after: { k: 'EBIT-Marge', v: '38%' } },
    { av: 'MO', name: 'Marek O.', meta: 'Solo-Founder, 41 · Performance-Agentur, Hamburg', quote: '„Ich war knapp davor, zwei Leute einzustellen. Stattdessen haben wir Flowstack gebaut. Heute mache ich 40% mehr Umsatz, alleine."', before: { k: 'Monatsumsatz', v: '42k €' }, after: { k: 'Monatsumsatz', v: '61k €' } },
    { av: 'JF', name: 'Jana F.', meta: 'Coach & Beraterin, 38 · Sichtbarkeits-Coaching', quote: '„Vorher 45 Wochenstunden, heute 22. Kunden-Ergebnisse sind besser als je zuvor, weil die KI konsistenter ist als ich es je war."', before: { k: 'Arbeitszeit/Woche', v: '45h' }, after: { k: 'Arbeitszeit/Woche', v: '22h' } },
    { av: 'TB', name: 'Tobias B.', meta: 'Agenturinhaber, 46 · B2B-Leadgen-Agentur', quote: '„Wir haben seit 6 Monaten keinen neuen Mitarbeiter eingestellt und trotzdem 12 neue Kunden onboarded. Das ist der Hebel, den ich immer wollte."', before: { k: 'Kunden/Mitarbeiter', v: '2.1' }, after: { k: 'Kunden/Mitarbeiter', v: '4.8' } },
  ]
  return (
    <section className="section" id="outcomes">
      <div className="wrap">
        <span className="eyebrow">Ergebnisse aus der Praxis</span>
        <h2 style={{ marginTop: 18, maxWidth: 780 }}>
          Vier Agenturinhaber, vier Startpunkte, ein System. Echte Zahlen, echte Transformationen.
        </h2>
        <div className="outcomes-grid">
          {items.map((c, i) => (
            <div className="outcome" key={i}>
              <div className="outcome-head">
                <div className="outcome-av">{c.av}</div>
                <div>
                  <div className="outcome-who-name">{c.name}</div>
                  <div className="outcome-who-meta">{c.meta}</div>
                </div>
              </div>
              <div className="outcome-quote">{c.quote}</div>
              <div className="outcome-ba">
                <div className="outcome-ba-col">
                  <div className="outcome-ba-lbl">Vorher</div>
                  <div className="outcome-ba-val">{c.before.v}</div>
                  <div className="outcome-ba-lbl" style={{ marginTop: 4, opacity: 0.7 }}>{c.before.k}</div>
                </div>
                <div className="outcome-ba-arrow"><Arrow size={18} /></div>
                <div className="outcome-ba-col after">
                  <div className="outcome-ba-lbl">Nachher</div>
                  <div className="outcome-ba-val">{c.after.v}</div>
                  <div className="outcome-ba-lbl" style={{ marginTop: 4, opacity: 0.7 }}>{c.after.k}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Demark() {
  return (
    <section className="section" id="demarketing">
      <div className="wrap">
        <span className="eyebrow">Nicht für jeden</span>
        <h2 style={{ marginTop: 18, maxWidth: 820 }}>
          Flowstack ist bewusst kein Massenprodukt. Wir arbeiten nur mit wenigen Agenturen pro Quartal.
        </h2>
        <div className="demark-grid">
          <div className="demark yes">
            <h3>Das passt zu dir <span className="demark-badge">QUALIFIZIERT</span></h3>
            <ul>
              <li><span className="mk"><Check size={12} /></span><span>Du machst <strong>zwischen 50k und 3 Mio Jahresumsatz</strong> und willst skalieren, ohne weiter einzustellen</span></li>
              <li><span className="mk"><Check size={12} /></span><span>Du betreibst eine <strong>Agentur, Coaching-Firma oder Dienstleistungs-Business</strong> mit wiederholbaren Prozessen</span></li>
              <li><span className="mk"><Check size={12} /></span><span>Du bist bereit, <strong>in den nächsten 12 Monaten 5-stellig zu investieren</strong>, wenn der Business-Case stimmt</span></li>
              <li><span className="mk"><Check size={12} /></span><span>Du willst die Kontrolle über dein Business zurück und verstehst, dass das Setup 30 Tage fokussierte Arbeit braucht</span></li>
            </ul>
          </div>
          <div className="demark no">
            <h3>Das passt nicht <span className="demark-badge">KEIN FIT</span></h3>
            <ul>
              <li><span className="mk">×</span><span>Du suchst eine Done-for-you-Agentur, die alles übernimmt, während du zuschaust</span></li>
              <li><span className="mk">×</span><span>Du bist unter 50k Jahresumsatz — dann ist das System überdimensioniert, komm später wieder</span></li>
              <li><span className="mk">×</span><span>Du willst Ergebnisse ohne eigenes Zutun und ohne 4 Wochen Onboarding-Zeit einzuplanen</span></li>
              <li><span className="mk">×</span><span>Du glaubst, KI sei eine Bedrohung statt der größten Chance der letzten 20 Jahre</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

function Services() {
  const items = [
    { tag: 'SVC.01', t: 'Automatisiertes Client-Reporting', d: 'Monatsreports, die sich selbst bauen. GA4, Meta, Google Ads, LinkedIn, TikTok — in Looker, Notion oder eurem Whitelabel-Dashboard. Inkl. KI-generierter Insights auf Deutsch.', ico: 'M3 3v18h18M7 14l4-4 4 4 5-5' },
    { tag: 'SVC.02', t: 'KI-gestützte Content-Pipeline', d: 'Von Briefing bis Freigabe: Claude & GPT-4 erstellen Erstentwürfe in eurer Tone-of-Voice. Direkt verknüpft mit Notion, Asana und eurem CMS. Menschen prüfen, KI produziert.', ico: 'M12 19l7-7-7-7M5 12h14' },
    { tag: 'SVC.03', t: 'Lead-Qualifizierung & Outbound', d: 'Eingehende Leads in < 60 Sekunden qualifiziert, gescort und an den richtigen Sales-Kontakt geroutet. Cold Outbound mit hyperpersonalisierten Openern pro Prospect.', ico: 'M12 2L4 7v10l8 5 8-5V7l-8-5zM12 12l8-5M12 12v10M12 12L4 7' },
    { tag: 'SVC.04', t: 'Internes Agentur-OS', d: 'Timesheets, Projektstatus, Kundenkommunikation — zentral, durchsuchbar, mit KI-Zusammenfassungen. Slack-Bot kennt jedes Projekt. Onboarding neuer Mitarbeiter in Tagen statt Wochen.', ico: 'M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z' },
  ]
  return (
    <section className="section" id="leistungen">
      <div className="wrap">
        <span className="eyebrow">Was wir bauen</span>
        <h2 style={{ marginTop: 18, maxWidth: 720 }}>
          Vier Systeme, die in 95% der Marketing-Agenturen den größten Hebel bringen.
        </h2>
        <div className="services-grid">
          {items.map(s => (
            <div className="svc" key={s.tag}>
              <div className="svc-tag">{s.tag}</div>
              <div className="svc-ico"><Ico d={s.ico} size={22} /></div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    { n: '01', t: 'Audit & Roadmap', d: '90 Minuten Workshop. Wir identifizieren die 3 größten Hebel in eurer Agentur und priorisieren nach ROI.' },
    { n: '02', t: 'Blueprint', d: 'Konkreter Plan: welche Tools, welche Workflows, welcher Zeitplan, welches Investment. Fix-Preis, keine Überraschungen.' },
    { n: '03', t: 'Build (30 Tage)', d: 'Wir bauen die Automationen. Tägliche Updates in Slack, zwei Sync-Calls pro Woche, Preview-Links ab Tag 7.' },
    { n: '04', t: 'Handover & Care', d: 'Dokumentation, Team-Schulung, 90 Tage Support inklusive. Danach optional Retainer für Weiterentwicklung.' },
  ]
  return (
    <section className="section" id="prozess">
      <div className="wrap">
        <span className="eyebrow">Wie wir arbeiten</span>
        <h2 style={{ marginTop: 18, maxWidth: 620 }}>Von Audit bis Live-System in 30 Tagen.</h2>
        <div className="proc-grid">
          {steps.map(s => (
            <div className="step" key={s.n}>
              <div className="step-n">STEP · {s.n}</div>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

type TaskKey = 'reporting' | 'content' | 'leads' | 'onboarding' | 'scheduling' | 'invoicing'
type TaskState = Record<TaskKey, boolean>
type TaskDef = { label: string; hpw: number }

function Calculator() {
  const [team, setTeam] = useState(8)
  const [rate, setRate] = useState(65)
  const [tasks, setTasks] = useState<TaskState>({
    reporting: true,
    content: true,
    leads: true,
    onboarding: false,
    scheduling: false,
    invoicing: false,
  })

  const taskDefs: Record<TaskKey, TaskDef> = {
    reporting: { label: 'Client Reporting', hpw: 3.2 },
    content: { label: 'Content-Produktion', hpw: 4.5 },
    leads: { label: 'Lead-Qualifizierung', hpw: 2.8 },
    onboarding: { label: 'Client-Onboarding', hpw: 1.5 },
    scheduling: { label: 'Meetings & Scheduling', hpw: 1.2 },
    invoicing: { label: 'Rechnung & Timesheets', hpw: 1.4 },
  }

  const calc = useMemo(() => {
    const activeKeys = (Object.keys(tasks) as TaskKey[]).filter(k => tasks[k])
    const hpwPerEmployee = activeKeys.reduce((sum, k) => sum + taskDefs[k].hpw, 0)
    const efficiency = 0.7
    const weeklyHours = hpwPerEmployee * team * efficiency
    const monthlyHours = weeklyHours * 4.33
    const monthlySavings = monthlyHours * rate
    const yearlySavings = monthlySavings * 12

    const breakdown = activeKeys.map(k => ({
      key: k,
      label: taskDefs[k].label,
      hours: Math.round(taskDefs[k].hpw * team * efficiency * 4.33),
    }))
    const maxBar = Math.max(1, ...breakdown.map(b => b.hours))

    return {
      monthlyHours: Math.round(monthlyHours),
      monthlySavings: Math.round(monthlySavings),
      yearlySavings: Math.round(yearlySavings),
      breakdown,
      maxBar,
      fteSaved: (monthlyHours / 160).toFixed(1),
    }
  }, [team, rate, tasks])

  const fmt = (n: number) => n.toLocaleString('de-DE')
  const activeCount = Object.values(tasks).filter(Boolean).length

  return (
    <section className="section calc-section" id="rechner">
      <div className="wrap">
        <span className="eyebrow">ROI-Rechner</span>
        <h2 style={{ marginTop: 18, maxWidth: 760 }}>
          Wie viel Zeit und Budget spart euer Team mit KI — in 60 Sekunden berechnet.
        </h2>
        <p className="lede" style={{ marginTop: 16 }}>
          Basierend auf Durchschnittswerten aus 40+ DACH-Agenturen. Je nach Setup und Stack können die realen Ersparnisse abweichen — meistens nach oben.
        </p>

        <div className="calc-wrap">
          <div className="calc-controls">
            <div className="field">
              <div className="field-head">
                <label>Team-Größe</label>
                <span className="field-val">{team} {team === 1 ? 'Person' : 'Personen'}</span>
              </div>
              <input type="range" min={1} max={50} value={team} onChange={e => setTeam(+e.target.value)} />
              <div className="field-hint">Alle Mitarbeitenden, die an Kundenprojekten mitwirken.</div>
            </div>

            <div className="field">
              <div className="field-head">
                <label>Ø Stundensatz (intern, brutto)</label>
                <span className="field-val">{fmt(rate)} €/h</span>
              </div>
              <input type="range" min={25} max={180} step={5} value={rate} onChange={e => setRate(+e.target.value)} />
              <div className="field-hint">Vollkosten pro Mitarbeiter:in inkl. Lohnnebenkosten.</div>
            </div>

            <div className="field">
              <div className="field-head">
                <label>Was wollt ihr automatisieren?</label>
                <span className="field-val">{activeCount} ausgewählt</span>
              </div>
              <div className="tasks">
                {(Object.keys(taskDefs) as TaskKey[]).map(k => (
                  <label className={`task ${tasks[k] ? 'on' : ''}`} key={k}>
                    <input
                      type="checkbox"
                      checked={tasks[k]}
                      onChange={e => setTasks(t => ({ ...t, [k]: e.target.checked }))}
                      style={{ display: 'none' }}
                    />
                    <span className="task-check">{tasks[k] && <Check size={11} />}</span>
                    {taskDefs[k].label}
                  </label>
                ))}
              </div>
              <div className="field-hint" style={{ marginTop: 12 }}>Mehrfachauswahl möglich. Jeder Block ist ein realer Workflow, den wir gebaut haben.</div>
            </div>
          </div>

          <div className="calc-result">
            <div className="res-head">Monatliche Ersparnis</div>
            <div className="res-big">
              <div className="res-big-num">{fmt(calc.monthlySavings)} €</div>
              <div className="res-big-unit">entspricht {calc.fteSaved} Vollzeit-Äquivalenten · {fmt(calc.monthlyHours)}h pro Monat</div>
            </div>

            <div className="res-divider" />

            <div className="res-row">
              <div className="res-row-item">
                <div className="k">Stunden / Monat</div>
                <div className="v">{fmt(calc.monthlyHours)}h</div>
                <div className="s">~ {Math.round(calc.monthlyHours / 4.33)}h pro Woche</div>
              </div>
              <div className="res-row-item">
                <div className="k">Jahres-Ersparnis</div>
                <div className="v">{fmt(calc.yearlySavings)} €</div>
                <div className="s">bei {activeCount} aktiven Workflows</div>
              </div>
            </div>

            <div className="bars">
              {calc.breakdown.length === 0 && (
                <div style={{ fontSize: 13, color: 'oklch(0.85 0.02 258 / 0.7)', padding: '12px 0' }}>
                  Wähle mindestens einen Workflow aus, um deine Ersparnis zu berechnen.
                </div>
              )}
              {calc.breakdown.map(b => (
                <div className="bar-row" key={b.key}>
                  <div className="label">{b.label}</div>
                  <div className="track"><div className="fill" style={{ width: `${(b.hours / calc.maxBar) * 100}%` }} /></div>
                  <div className="val">{b.hours}h</div>
                </div>
              ))}
            </div>

            <div className="res-cta">
              <div>Interessiert an einem konkreten Plan für euer Setup?</div>
              <a href="/bewerbung" className="btn btn-primary btn-sm">Gespräch buchen <Arrow /></a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cases() {
  const items = [
    { stat: '62h', quote: '„Unser Reporting-Freitag ist abgeschafft. Die Stunden stecken jetzt in Strategie — genau wo sie hingehören."', name: 'L. Weber', role: 'Managing Director, Northfield & Co.', av: 'LW' },
    { stat: '3.4×', quote: '„Wir produzieren dreieinhalb mal so viel Content pro Monat — ohne einen einzigen neuen Hire. Qualität ist gestiegen, nicht gesunken."', name: 'M. Ortiz', role: 'Head of Content, Nova Media', av: 'MO' },
    { stat: '41%', quote: '„Lead-Response-Zeit von 4h auf unter 5 Minuten. Wir haben die Close-Rate in einem Quartal um 41 Prozent gesteigert."', name: 'J. Falk', role: 'Agenturinhaber, Kobalt Studio', av: 'JF' },
  ]
  return (
    <section className="section" id="cases">
      <div className="wrap">
        <span className="eyebrow">Ergebnisse</span>
        <h2 style={{ marginTop: 18, maxWidth: 680 }}>Agenturen, die mit Flowstack gebaut haben.</h2>
        <div className="cases-grid">
          {items.map((c, i) => (
            <div className="case" key={i}>
              <div className="case-stat">{c.stat}</div>
              <div className="case-quote">{c.quote}</div>
              <div className="case-ft">
                <div className="case-av">{c.av}</div>
                <div>
                  <div className="case-ft-name">{c.name}</div>
                  <div className="case-ft-role">{c.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Team() {
  return (
    <section className="section" id="team">
      <div className="wrap">
        <span className="eyebrow">Wer hinter Flowstack steht</span>
        <h2 style={{ marginTop: 18, maxWidth: 700 }}>
          Einer, der selbst eine Agentur skaliert hat. Und wieder.
        </h2>
        <div className="team-wrap">
          <div>
            <div className="team-portrait">[ Portrait · Claudio Di Franco ]</div>
          </div>
          <div>
            <div className="team-role">Gründer · Flowstack System</div>
            <div className="team-name">Claudio Di Franco</div>
            <div className="team-story">
              Claudio hat mit 24 seine erste Performance-Agentur gegründet und sie in 3 Jahren auf 2,1 Mio Umsatz skaliert — mit 11 Mitarbeitern und 9% EBIT-Marge. Genug für den Namen, zu wenig für ein echtes Asset.
              <br /><br />
              2023 hat er den kompletten Stack auf KI umgestellt. Heute macht dieselbe Firma <strong>3,4 Mio Umsatz mit 4 Mitarbeitern und 47% EBIT-Marge</strong>. Flowstack ist das System, das daraus entstanden ist — jetzt verfügbar für Agenturen, die denselben Sprung machen wollen.
            </div>
            <div className="team-credits">
              <div className="team-credit"><div className="team-credit-v">40+</div><div className="team-credit-l">Agenturen als Klienten seit 2023</div></div>
              <div className="team-credit"><div className="team-credit-v">t3n</div><div className="team-credit-l">Interview über KI-first Agenturen, 2025</div></div>
              <div className="team-credit"><div className="team-credit-v">OMR</div><div className="team-credit-l">Speaker 2024 · KI im Marketing</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FinalROI() {
  return (
    <section className="final-roi" id="angebot">
      <div className="wrap">
        <div className="final-roi-card">
          <div className="final-roi-inner">
            <div>
              <span className="chip" style={{ background: 'oklch(1 0 0 / 0.08)', borderColor: 'oklch(1 0 0 / 0.15)', color: 'oklch(0.88 0.02 258)' }}>
                <span className="dot" /> Noch 3 Onboarding-Slots in Q2
              </span>
              <h2 style={{ marginTop: 20 }}>Rechne kurz nach, bevor du klickst.</h2>
              <p className="final-roi-lede">
                Ein durchschnittlicher Agentur-Kunde bringt dir 2.400 € MRR. Flowstack kostet einmalig im mittleren 5-stelligen Bereich. Amortisation typischerweise unter 6 Monaten. Danach läuft die Maschine.
              </p>
              <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href="/bewerbung" className="btn btn-primary btn-lg">Jetzt kostenloses Gespräch sichern <Arrow /></a>
              </div>
            </div>
            <div className="final-roi-calc">
              <div className="final-roi-row">
                <div className="final-roi-k">1 neuer Agentur-Kunde</div>
                <div className="final-roi-v">2.400 € MRR</div>
              </div>
              <div className="final-roi-row">
                <div className="final-roi-k">× 12 Monate Lifetime</div>
                <div className="final-roi-v">28.800 € LTV</div>
              </div>
              <div className="final-roi-row">
                <div className="final-roi-k">Investment Flowstack</div>
                <div className="final-roi-v">ab 22.000 €</div>
              </div>
              <div className="final-roi-row">
                <div className="final-roi-k">Break-Even nach</div>
                <div className="final-roi-v big">&lt; 1 Kunde</div>
              </div>
              <div className="final-roi-note">
                * Konservative Rechnung. Durchschnittskunden bringen 1.2–1.8× mehr MRR. Kosten fix, skaliert danach ohne weitere Zahlungen.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function FAQ() {
  const items = [
    { q: 'Wie lange dauert ein typisches Projekt?', a: 'Von Kickoff bis Live-System rechnen wir 30 Tage für den ersten Workflow. Wenn ihr mehrere Systeme parallel baut, planen wir 45–60 Tage. Danach bleiben wir 90 Tage mit Support an Bord.' },
    { q: 'Was kostet das ganze?', a: 'Einmalprojekte starten bei 6.900 € (ein kompletter Workflow, Build + Handover). Die meisten Agenturen investieren 15–35k für ihren ersten Stack — und amortisieren das in unter 6 Monaten. Den exakten Rahmen bekommt ihr nach dem Audit als Fix-Preis.' },
    { q: 'Müssen wir unsere Tools wechseln?', a: 'Nein. Wir bauen auf eurem bestehenden Stack (HubSpot, Notion, Airtable, GA4, Meta Ads, Google Ads, Asana, Slack etc.). Nur wenn ein Tool echte Blocker hat, schlagen wir Alternativen vor.' },
    { q: 'Wie sieht das mit DSGVO und Datenschutz aus?', a: 'Alle Flows laufen auf EU-Servern oder lokal. Wir nutzen AV-Verträge mit allen eingesetzten Modell-Anbietern (inkl. OpenAI Enterprise, Anthropic Business). Kundendaten werden niemals zum Training verwendet.' },
    { q: 'Was, wenn das KI-Modell Fehler macht?', a: 'Wir bauen Human-in-the-Loop in kritische Prozesse ein. KI schlägt vor, Mensch bestätigt. Für weniger sensible Aufgaben gibt es Confidence-Thresholds, die Edge-Cases automatisch an einen Menschen eskalieren.' },
    { q: 'Können wir die Systeme später selbst warten?', a: 'Ja. Jede Automation kommt mit kompletter Dokumentation, Video-Walkthroughs und einer 2-tägigen Team-Schulung. Viele Kunden betreiben nach 6 Monaten eigenständig.' },
  ]
  const [open, setOpen] = useState<number>(0)
  return (
    <section className="section" id="faq">
      <div className="wrap">
        <div className="faq-grid">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2 style={{ marginTop: 18 }}>Häufig<br/>gestellte<br/>Fragen.</h2>
            <p className="lede" style={{ marginTop: 20, fontSize: 15 }}>
              Deine Frage ist nicht dabei? Schreib direkt an{' '}
              <span style={{ color: 'var(--accent-ink)' }}>hallo@flowstack-system.de</span>
            </p>
          </div>
          <div className="faq-list">
            {items.map((it, i) => (
              <div className={`faq-item ${open === i ? 'open' : ''}`} key={i} onClick={() => setOpen(open === i ? -1 : i)}>
                <div className="faq-q">
                  {it.q}
                  <span className="faq-plus">+</span>
                </div>
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
    <section className="wrap" id="call">
      <div className="final-cta">
        <div className="final-cta-inner">
          <div>
            <span className="chip" style={{ background: 'oklch(1 0 0 / 0.08)', borderColor: 'oklch(1 0 0 / 0.15)', color: 'oklch(0.88 0.02 258)' }}>
              <span className="dot" /> Noch 3 Onboarding-Slots in Q2
            </span>
            <h2 style={{ marginTop: 18 }}>Kostenloses 30-Minuten-Audit für deine Agentur.</h2>
            <p>Wir schauen uns euren Stack an und identifizieren konkret, wo KI für euch den größten Hebel bringt. Keine Verkaufsfolien, keine Verpflichtung.</p>
            <div style={{ marginTop: 28, display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href="/bewerbung" className="btn btn-primary">Termin buchen <Arrow /></a>
              <a href="mailto:hallo@flowstack-system.de" className="btn btn-ghost" style={{ color: '#fff', borderColor: 'oklch(1 0 0 / 0.2)' }}>Schreib uns direkt</a>
            </div>
          </div>
          <div className="final-features">
            {[
              'Konkrete Automatisierungs-Ideen für euren Stack',
              'Ersparnis-Kalkulation mit realen Werten aus eurer Agentur',
              'Priorisierte Roadmap — was zuerst, was später',
              'Fester Ansprechpartner, keine Call-Center-Manier',
            ].map((f, i) => (
              <div className="final-f" key={i}>
                <Check size={18} />
                <span>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="wrap footer">
      <div className="footer-inner">
        <div style={{ maxWidth: 320 }}>
          <a className="logo" href="/">
            <span className="logo-mark" />
            Flowstack System
          </a>
          <p style={{ fontSize: 13.5, color: 'var(--ink-3)', marginTop: 14, lineHeight: 1.55 }}>
            KI-Automatisierung für Marketing-Agenturen in DACH. Wir bauen Systeme, die laufen — heute, morgen und in zwei Jahren noch.
          </p>
        </div>
        <div className="footer-cols">
          <div className="footer-col">
            <h4>Leistungen</h4>
            <a href="#leistungen">Reporting-Automation</a>
            <a href="#leistungen">Content-Pipeline</a>
            <a href="#leistungen">Lead-Systeme</a>
            <a href="#leistungen">Agentur-OS</a>
          </div>
          <div className="footer-col">
            <h4>Firma</h4>
            <a href="#cases">Cases</a>
            <a href="#prozess">Prozess</a>
            <a href="#team">Über Claudio</a>
            <a href="/bewerbung">Kontakt</a>
          </div>
          <div className="footer-col">
            <h4>Rechtliches</h4>
            <a href="/impressum">Impressum</a>
            <a href="/datenschutz">Datenschutz</a>
            <a href="/agb">AGB</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div>© 2026 Flowstack System GmbH · München</div>
        <div className="mono">v3.12 · Built with humans & machines</div>
      </div>
    </footer>
  )
}

export function HomePage() {
  useSeo({
    title: 'Flowstack System · KI-Automatisierung für Agenturen',
    description:
      'Flowstack baut maßgeschneiderte KI-Workflows für Marketing-Agenturen. Reporting, Content-Produktion, Lead-Qualifizierung — automatisiert in 30 Tagen.',
    path: '/',
  })

  return (
    <div className="marketing-root">
      <AvailBanner />
      <Nav />
      <Hero />
      <TrustStrip />
      <Marquee />
      <Empathy />
      <Mirror />
      <Preview />
      <Method />
      <AnchorCTA
        title={<>Bereit, das <strong>System für deine Agentur</strong> aufzusetzen?</>}
        sub="12-Schritte-Bewerbung. Dauert 3 Minuten. Rückruf in 24h bei Qualifikation."
        cta="Jetzt bewerben"
      />
      <Outcomes />
      <Demark />
      <Services />
      <Process />
      <AnchorCTA
        title={<>Noch unsicher? <strong>Lass uns 30 Minuten sprechen.</strong></>}
        sub="Kostenlos, unverbindlich, ohne Sales-Druck. Entweder es passt, oder wir sagen dir ehrlich wo du falsch bist."
        cta="Kostenloses Gespräch sichern"
      />
      <Calculator />
      <Cases />
      <Team />
      <FinalROI />
      <FAQ />
      <FinalCTA />
      <Footer />
    </div>
  )
}
