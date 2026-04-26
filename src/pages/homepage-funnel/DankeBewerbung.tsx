import { useState } from 'react'
import { useSeo } from '@/shared/seo/useSeo'
import '@/styles/marketing-flowstack.css'

type FaqItem = {
  q: string
  a: string
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Wann genau meldet ihr euch?',
    a: 'Werktags innerhalb von 24 Stunden, meist schneller. Am Wochenende am folgenden Werktag morgens. Wenn du nicht abnimmst, versuchen wir es bis zu dreimal und schreiben dir parallel eine Mail.',
  },
  {
    q: 'Was kostet das Erstgespräch?',
    a: 'Null Euro. Keine versteckten Kosten, kein Sales-Druck. Du bekommst eine ehrliche Einschätzung, ob Flowstack für dich Sinn ergibt — und falls nicht, eine konkrete Empfehlung, was stattdessen passt.',
  },
  {
    q: 'Was passiert, wenn ich gerade nicht abnehmen kann?',
    a: 'Kein Problem — wir versuchen es erneut und schicken dir eine Mail mit zwei Terminvorschlägen. Du kannst auch selbst direkt einen Slot in unserem Kalender buchen, sobald die Qualifikationsmail bei dir ankommt.',
  },
  {
    q: 'Muss ich mich vorbereiten?',
    a: 'Kein Pflicht-Briefing. Es reicht, wenn du deine drei größten Prozess-Kopfschmerzen im Kopf hast. Wir machen die Analyse im Call mit dir gemeinsam.',
  },
]

export function DankeBewerbung() {
  const [openFaq, setOpenFaq] = useState<number>(0)
  const [firstName] = useState<string>(() => {
    try {
      const raw = typeof window === 'undefined' ? null : sessionStorage.getItem('flowstack-submitted')
      if (raw) {
        const d = JSON.parse(raw) as { firstName?: string }
        if (d.firstName) return d.firstName.replace(/[<>]/g, '')
      }
    } catch {
      // sessionStorage unavailable or invalid JSON — fall through to empty string
    }
    return ''
  })

  useSeo({
    title: 'Danke · Flowstack System',
    description:
      'Deine Bewerbung ist eingegangen. Wir prüfen deine Angaben innerhalb von 24 Stunden und melden uns telefonisch.',
    path: '/danke-bewerbung',
    noindex: true,
  })

  return (
    <div className="marketing-root">
      <nav className="nav">
        <div className="wrap nav-inner">
          <a className="logo" href="/">
            <span className="logo-mark" /> Flowstack System
          </a>
          <div className="nav-links">
            <a href="/#methode">Methode</a>
            <a href="/#cases">Cases</a>
            <a href="/#faq">FAQ</a>
          </div>
          <div className="nav-cta">
            <a className="btn btn-ghost btn-sm" href="/">
              Zur Webseite
            </a>
          </div>
        </div>
      </nav>

      <main>
      <section className="thanks-hero">
        <div className="wrap">
          <div className="thanks-hero-check">
            <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>
          <h1>
            {firstName ? `Danke, ${firstName}. Deine Bewerbung ist ` : 'Deine Bewerbung ist '}
            <strong>eingegangen</strong>.
          </h1>
          <p>
            Wir prüfen deine Angaben in den nächsten 24 Stunden. Bei Qualifikation meldet sich mein Team telefonisch an der von dir angegebenen Nummer. Halte dein Handy griffbereit.
          </p>
          <div
            className="video-placeholder"
            style={{ maxWidth: 720, margin: '40px auto 0', textAlign: 'left' }}
          >
            <div className="video-play">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <div className="video-caption">[ Video · 3:14 · Claudio über die G4U-Philosophie ]</div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <span className="eyebrow">Wie es jetzt weitergeht</span>
          <h2 style={{ marginTop: 18, maxWidth: 680 }}>Drei Schritte bis zum Strategiegespräch.</h2>
          <div className="nextsteps-grid">
            <div className="nextstep">
              <div className="nextstep-time">INNERHALB 24H</div>
              <div className="nextstep-n">1</div>
              <h3>Wir prüfen deine Angaben</h3>
              <p>Mein Team schaut sich deine Bewerbung und deine Webseite an. Wir bewerten, ob Flowstack für deine Situation der richtige Hebel ist.</p>
            </div>
            <div className="nextstep">
              <div className="nextstep-time">BEI QUALIFIKATION</div>
              <div className="nextstep-n">2</div>
              <h3>Wir rufen dich an</h3>
              <p>Anruf auf deine angegebene Mobilnummer, um einen Termin für das Strategiegespräch zu vereinbaren. Kurz, unkompliziert, 5 Minuten.</p>
            </div>
            <div className="nextstep">
              <div className="nextstep-time">30 MIN</div>
              <div className="nextstep-n">3</div>
              <h3>Dein Strategiegespräch</h3>
              <p>Wir analysieren gemeinsam dein KI-Automatisierungs-Potenzial. Du gehst mit einer klaren Roadmap aus dem Call — unabhängig davon, ob wir zusammenarbeiten.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <span className="eyebrow">Was du bis dahin tun kannst</span>
          <h2 style={{ marginTop: 18, maxWidth: 680 }}>Drei kleine Vorbereitungen, die den Call hochwertig machen.</h2>
          <div className="prep-card">
            <ul className="prep-list">
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Halte dein Handy in den nächsten 24 Stunden griffbereit. Wir rufen mit deutscher Nummer an. Unbekannte Nummer ist normal.</span>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Überlege, welche drei Prozesse in deiner Agentur aktuell am meisten Zeit fressen. Wir fragen im Call danach.</span>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>Blocke dir 45 Minuten im Kalender ab morgen für ein potenzielles Gespräch. So können wir flexibel einen Termin finden.</span>
              </li>
              <li>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>
                  Falls du die Bewerbung erweitern willst: Schreib eine kurze Mail an{' '}
                  <strong style={{ color: 'var(--accent-ink)' }}>hallo@flowstack-system.de</strong>.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="wrap">
          <div className="trust-grid">
            <div className="trust-item">
              <div className="trust-num">40+</div>
              <div className="trust-lbl">Agenturen, die mit Flowstack arbeiten</div>
            </div>
            <div className="trust-item">
              <div className="trust-num">18.300h</div>
              <div className="trust-lbl">Manuelle Arbeit monatlich ersetzt</div>
            </div>
            <div className="trust-item">
              <div className="trust-num">× 3.2</div>
              <div className="trust-lbl">Ø Outputsteigerung pro Mitarbeiter</div>
            </div>
            <div className="trust-item">
              <div className="trust-num">€ 2.4M</div>
              <div className="trust-lbl">Eingesparte Personalkosten, summiert</div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <span className="eyebrow">Direkt nach dem Absenden häufig gefragt</span>
          <h2 style={{ marginTop: 18, maxWidth: 680 }}>Kurze Antworten auf die typischen Fragen.</h2>
          <div className="faq-list" style={{ marginTop: 40 }}>
            {FAQ_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className={`faq-item ${openFaq === idx ? 'open' : ''}`}
                onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
              >
                <div className="faq-q">
                  {item.q} <span className="faq-plus">+</span>
                </div>
                <div className="faq-a">{item.a}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      </main>

      <footer className="wrap footer">
        <div className="footer-inner">
          <div style={{ maxWidth: 320 }}>
            <a className="logo" href="/">
              <span className="logo-mark" /> Flowstack System
            </a>
            <p style={{ fontSize: 13.5, color: 'var(--ink-3)', marginTop: 14, lineHeight: 1.55 }}>
              KI-Automatisierung für Agenturen, Coaches und Dienstleister in DACH.
            </p>
          </div>
          <div className="footer-cols">
            <div className="footer-col">
              <h4>Methode</h4>
              <a href="/#methode">G4U-System</a>
              <a href="/#cases">Cases</a>
              <a href="/#faq">FAQ</a>
            </div>
            <div className="footer-col">
              <h4>Firma</h4>
              <a href="/#team">Über Claudio</a>
              <a href="/#">Karriere</a>
              <a href="/#">Kontakt</a>
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
          <div className="mono">flowstack-system.de</div>
        </div>
      </footer>
    </div>
  )
}
