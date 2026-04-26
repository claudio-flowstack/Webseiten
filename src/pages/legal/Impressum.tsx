import { useLayoutEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useSeo } from '@/shared/seo/useSeo';

export function Impressum() {
  useSeo({
    title: 'Impressum · Flowstack System',
    description: 'Impressum und rechtliche Angaben von Flowstack System nach §5 TMG.',
    path: '/impressum',
    noindex: true,
  });

  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#111415';
    document.body.style.color = '#f6f6f7';
    document.documentElement.classList.add('dark');
    document.body.style.margin = '0';
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.documentElement.classList.remove('dark');
    };
  }, []);

  const cardStyle = {
    background: 'rgba(24,26,27,0.5)',
    borderRadius: 12,
    padding: 32,
  };

  const accentLine = (
    <div style={{ width: 40, height: 3, background: '#99f7ff', marginBottom: 16, borderRadius: 2 }} />
  );

  return (
    <div className="legal-impressum" style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", minHeight: '100dvh', background: '#111415', backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(0,241,254,0.03) 0%, transparent 60%)', color: '#f6f6f7', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .legal-impressum .legal-header { padding: 14px 16px; }
        .legal-impressum .legal-main { padding: 48px 16px 64px; }
        .legal-impressum .legal-title { font-size: clamp(28px, 5vw, 40px); }
        .legal-impressum .legal-footer-links { gap: 16px; }
        .legal-impressum a:not(.legal-back-btn) { transition: text-decoration-color 0.2s, opacity 0.2s; }
        .legal-impressum a:not(.legal-back-btn):hover { text-decoration: underline; text-decoration-color: rgba(153,247,255,0.4); text-underline-offset: 3px; }
        @media (min-width: 768px) {
          .legal-impressum .legal-header { padding: 16px 24px; padding-bottom: 24px; }
          .legal-impressum .legal-main { padding: 88px 20px 88px; }
          .legal-impressum .legal-footer-links { gap: 24px; }
        }
      `}</style>

      {/* Header */}
      <header className="legal-header" style={{ background: 'rgba(42,44,46,0.6)', backdropFilter: 'blur(24px)', boxShadow: '0 1px 8px rgba(0,0,0,0.3)', position: 'sticky', top: 0, zIndex: 50, paddingTop: 'env(safe-area-inset-top)', paddingBottom: 24 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#f6f6f7' }}>
              Flow<span style={{ color: '#99f7ff' }}>stack</span>
            </span>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="legal-main" style={{ flex: 1, maxWidth: 720, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        <h1 className="legal-title" style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.15, color: '#f6f6f7', marginTop: 0, marginBottom: 56 }}>
          Impressum
        </h1>

        {/* Angaben gemäß § 5 DDG */}
        <section style={{ marginBottom: 56 }}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontWeight: 800, fontSize: 20, color: '#f6f6f7', marginBottom: 16, marginTop: 0, letterSpacing: '-0.02em' }}>
              Angaben gemäß § 5 DDG
            </h2>
            <p style={{ color: '#c4c5c7', fontWeight: 500, lineHeight: 1.8, fontSize: 15, margin: 0 }}>
              Flowstack Systems<br />
              Claudio Di Franco<br />
              Falkenweg 2<br />
              76327 Pfinztal
            </p>
          </div>
        </section>

        {/* Kontakt */}
        <section style={{ marginBottom: 56 }}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontWeight: 800, fontSize: 20, color: '#f6f6f7', marginBottom: 16, marginTop: 0, letterSpacing: '-0.02em' }}>
              Kontakt
            </h2>
            <p style={{ color: '#c4c5c7', fontWeight: 500, lineHeight: 1.8, fontSize: 15, margin: 0 }}>
              E-Mail:{' '}
              <a href="mailto:info@flowstack.io" style={{ color: '#99f7ff', textDecoration: 'none' }}>
                info@flowstack.io
              </a>
            </p>
          </div>
        </section>

        {/* USt-IdNr */}
        <section style={{ marginBottom: 56 }}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontWeight: 800, fontSize: 20, color: '#f6f6f7', marginBottom: 16, marginTop: 0, letterSpacing: '-0.02em' }}>
              Umsatzsteuer-Identifikationsnummer
            </h2>
            <p style={{ color: '#c4c5c7', fontWeight: 500, lineHeight: 1.8, fontSize: 15, margin: 0 }}>
              Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
              [wird nachgetragen]
            </p>
          </div>
        </section>

        {/* Verantwortlich für den Inhalt */}
        <section style={{ marginBottom: 56 }}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontWeight: 800, fontSize: 20, color: '#f6f6f7', marginBottom: 16, marginTop: 0, letterSpacing: '-0.02em' }}>
              Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV
            </h2>
            <p style={{ color: '#c4c5c7', fontWeight: 500, lineHeight: 1.8, fontSize: 15, margin: 0 }}>
              Claudio Di Franco<br />
              Falkenweg 2<br />
              76327 Pfinztal
            </p>
          </div>
        </section>

        {/* Haftung für Inhalte */}
        <section style={{ marginBottom: 56 }}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontWeight: 800, fontSize: 20, color: '#f6f6f7', marginBottom: 24, marginTop: 0, letterSpacing: '-0.02em' }}>
              Haftungsausschluss
            </h2>

            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontWeight: 800, fontSize: 17, color: '#f6f6f7', marginBottom: 10, letterSpacing: '-0.01em' }}>
                Haftung für Inhalte
              </h3>
              <p style={{ color: '#c4c5c7', fontWeight: 500, lineHeight: 1.8, fontSize: 15, margin: 0 }}>
                Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
              </p>
            </div>

            <div style={{ marginBottom: 28 }}>
              <h3 style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontWeight: 800, fontSize: 17, color: '#f6f6f7', marginBottom: 10, letterSpacing: '-0.01em' }}>
                Haftung für Links
              </h3>
              <p style={{ color: '#c4c5c7', fontWeight: 500, lineHeight: 1.8, fontSize: 15, margin: 0 }}>
                Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
              </p>
            </div>

            <div style={{ marginBottom: 0 }}>
              <h3 style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontWeight: 800, fontSize: 17, color: '#f6f6f7', marginBottom: 10, letterSpacing: '-0.01em' }}>
                Urheberrecht
              </h3>
              <p style={{ color: '#c4c5c7', fontWeight: 500, lineHeight: 1.8, fontSize: 15, margin: 0 }}>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
              </p>
            </div>
          </div>
        </section>

        {/* Streitschlichtung */}
        <section style={{ marginBottom: 56 }}>
          <div style={cardStyle}>
            {accentLine}
            <h2 style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontWeight: 800, fontSize: 20, color: '#f6f6f7', marginBottom: 16, marginTop: 0, letterSpacing: '-0.02em' }}>
              EU-Streitschlichtung
            </h2>
            <p style={{ color: '#c4c5c7', fontWeight: 500, lineHeight: 1.8, fontSize: 15, margin: '0 0 12px 0' }}>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:{' '}
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" style={{ color: '#99f7ff', textDecoration: 'none' }}>
                https://ec.europa.eu/consumers/odr/
              </a>
            </p>
            <p style={{ color: '#c4c5c7', fontWeight: 500, lineHeight: 1.8, fontSize: 15, margin: 0 }}>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </div>
        </section>

        {/* Zurück-Link */}
        <div style={{ marginTop: 56, paddingTop: 32, borderTop: '1px solid rgba(196,197,199,0.1)', display: 'flex', justifyContent: 'flex-start' }}>
          <a
            className="legal-back-btn"
            href="/kostenloses-videotraining"
            style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#99f7ff', textDecoration: 'none', fontSize: 15, fontWeight: 700, fontFamily: "'Inter Tight', 'Geist', sans-serif", transition: 'background 0.2s, border-color 0.2s', border: '1px solid rgba(70,72,73,0.2)', padding: '12px 24px', borderRadius: 4 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(153,247,255,0.05)'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(153,247,255,0.2)'; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = 'transparent'; (e.currentTarget as HTMLAnchorElement).style.borderColor = 'rgba(70,72,73,0.2)'; }}
          >
            <ArrowLeft style={{ width: 16, height: 16 }} />
            Zurück
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', background: '#111415' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <div className="legal-footer-links" style={{ display: 'flex', fontSize: 12, color: '#c4c5c7' }}>
            <a href="/impressum" target="_blank" rel="noopener noreferrer" style={{ color: '#c4c5c7', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = '#99f7ff'; }} onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = '#c4c5c7'; }}>Impressum</a>
            <a href="/datenschutz" target="_blank" rel="noopener noreferrer" style={{ color: '#c4c5c7', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={(e) => { (e.target as HTMLAnchorElement).style.color = '#99f7ff'; }} onMouseLeave={(e) => { (e.target as HTMLAnchorElement).style.color = '#c4c5c7'; }}>Datenschutz</a>
          </div>
          <p style={{ fontSize: 11, color: '#464849', maxWidth: 600, lineHeight: 1.5, fontWeight: 500 }}>
            Diese Website ist nicht Teil der Facebook-Website oder von Facebook Inc. Diese Seite ist NICHT im Auftrag der FACEBOOK, Inc. entstanden. FACEBOOK ist eine Marke von FACEBOOK, Inc.
          </p>
          <p style={{ fontSize: 11, color: '#464849', fontWeight: 500 }}>&copy; 2026 Flowstack. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
