import { useLayoutEffect, useState } from 'react';
import { Play, CheckCircle2, Instagram, ExternalLink } from 'lucide-react';
import { useSeo } from '@/shared/seo/useSeo';

export function Danke() {
  useSeo({
    title: 'Danke · Flowstack System',
    description: 'Bestätigung deiner Terminbuchung.',
    path: '/danke',
    noindex: true,
  });
  const [videoPlaying, setVideoPlaying] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#111415';
    document.body.style.color = '#f6f6f7';
    document.body.style.fontFamily = "'Inter Tight', 'Geist', sans-serif";
    document.body.style.margin = '0';
    return () => {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
    };
  }, []);

  const ytThumbnails = [
    { title: 'Wie wir 47 manuelle Schritte pro Kunde automatisiert haben', duration: '12:34' },
    { title: 'Case Study: Von 20% auf 50%+ Umsatzrendite durch Automation', duration: '09:18' },
    { title: 'Die 3 größten Fehler bei der Fulfillment-Automatisierung', duration: '07:45' },
  ];

  return (
    <div className="vsl-danke" style={{ minHeight: '100dvh', backgroundColor: '#111415', backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(0,241,254,0.03) 0%, transparent 60%)', color: '#f6f6f7' }}>
      <style>{`
        .vsl-danke .danke-header { padding: 12px 16px; }
        .vsl-danke .danke-main { padding: 36px 16px 48px; }
        .vsl-danke .danke-hero { margin-bottom: 36px; }
        .vsl-danke .danke-video-grid { gap: 20px; margin-bottom: 48px; }
        .vsl-danke .danke-info-card { padding: 24px; }
        .vsl-danke .danke-insta-cta { padding: 12px 16px; font-size: 14px; }
        .vsl-danke .danke-insta-wrap { margin-bottom: 48px; }
        .vsl-danke .danke-yt-grid { grid-template-columns: 1fr !important; }
        .vsl-danke .danke-footer-links { gap: 16px; }
        @media (min-width: 768px) {
          .vsl-danke .danke-header { padding: 16px 24px; }
          .vsl-danke .danke-main { padding: 56px 24px 80px; }
          .vsl-danke .danke-hero { margin-bottom: 56px; }
          .vsl-danke .danke-video-grid { gap: 32px; margin-bottom: 64px; }
          .vsl-danke .danke-info-card { padding: 32px; }
          .vsl-danke .danke-insta-cta { padding: 12px 24px; font-size: 15px; }
          .vsl-danke .danke-insta-wrap { margin-bottom: 88px; }
          .vsl-danke .danke-yt-grid { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important; }
          .vsl-danke .danke-footer-links { gap: 24px; }
        }
      `}</style>
      {/* Header */}
      <header className="danke-header" style={{ backgroundColor: 'rgba(42,44,46,0.6)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', paddingTop: 'env(safe-area-inset-top)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center' }}>
          <span style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#f6f6f7' }}>
            Flow<span style={{ color: '#99f7ff' }}>stack</span>
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="danke-main" style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Hero */}
        <div className="danke-hero" style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Inter Tight', 'Geist', sans-serif",
            fontSize: 'clamp(24px, 5vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#f6f6f7',
            marginBottom: 16,
          }}>
            Vielen Dank für deine Terminbuchung!
          </h1>
          <p style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontSize: 17, fontWeight: 500, color: '#c4c5c7', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
            Schau dir noch meine kurze Videobotschaft an dich an...
          </p>
        </div>

        {/* Video Section: 2-column on desktop */}
        <div className="video-grid danke-video-grid" style={{ display: 'grid', gridTemplateColumns: '1fr' }}>
          <style>{`
            @media (min-width: 768px) {
              .video-grid {
                grid-template-columns: 3fr 2fr !important;
              }
            }
            .video-info-card {
              display: flex;
            }
          `}</style>

          {/* Left: Video Player */}
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', backgroundColor: '#111415', boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5)' }}>
            <div style={{ aspectRatio: '16/9', position: 'relative' }}>
              {/* BG Gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #111415 0%, #181a1b 50%, #111415 100%)' }} />

              {/* Play Button */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <button
                  onClick={() => setVideoPlaying(!videoPlaying)}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #99f7ff, #00e2ee)',
                    color: '#005f64',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 40px rgba(0,241,254,0.35)',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <Play size={32} fill="#005f64" />
                </button>
              </div>

              {/* Fake Controls */}
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '32px 20px 16px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ height: 4, flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '33%', backgroundColor: '#00f1fe', borderRadius: 9999 }} />
                  </div>
                  <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.5)' }}>02:45 / 08:12</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Info Card (desktop only) */}
          <div className="video-info-card danke-info-card" style={{
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 28,
            borderRadius: 16,
            backgroundColor: '#181a1b',
          }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#99f7ff', fontFamily: "'Inter Tight', 'Geist', sans-serif", marginBottom: 20 }}>
                In unserem Gespräch lernst du:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  'Welche deiner Prozesse wir sofort automatisieren würden',
                  'Wie du 80% deiner Fulfillment-Arbeit in 2-4 Wochen eliminierst',
                  'Ob das Flowstack-System für deine Agentur Sinn macht',
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <CheckCircle2 size={20} style={{ color: '#00f1fe', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontSize: 16, fontWeight: 500, color: '#c4c5c7', lineHeight: 1.5 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Instagram CTA */}
        <div className="danke-insta-wrap" style={{ textAlign: 'center' }}>
          <a
            href="https://instagram.com/flowstack.io"
            target="_blank"
            rel="noopener noreferrer"
            className="danke-insta-cta"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              color: '#99f7ff',
              fontWeight: 600,
              fontFamily: "'Inter Tight', 'Geist', sans-serif",
              textDecoration: 'none',
              borderRadius: 12,
              border: '1px solid rgba(70,72,73,0.15)',
              backgroundColor: 'transparent',
              transition: 'all 0.2s',
            }}
          >
            <Instagram size={20} />
            Folge mir auf Instagram!
            <ExternalLink size={14} style={{ opacity: 0.6 }} />
          </a>
        </div>

        {/* YouTube Section */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#f6f6f7', textAlign: 'center', marginBottom: 36 }}>
            Weitere Einblicke
          </h2>
          <div className="danke-yt-grid" style={{ display: 'grid', gap: 24 }}>
            {ytThumbnails.map((vid, i) => (
              <div key={i} style={{
                borderRadius: 16,
                overflow: 'hidden',
                backgroundColor: '#181a1b',
                transition: 'box-shadow 0.2s',
              }}>
                {/* Thumbnail */}
                <div style={{ aspectRatio: '16/9', backgroundColor: '#111415', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, hsl(${220 + i * 15}, 30%, 8%) 0%, #111415 100%)` }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #99f7ff, #00e2ee)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 20px rgba(0,241,254,0.2)' }}>
                      <Play size={22} fill="#005f64" style={{ color: '#005f64' }} />
                    </div>
                  </div>
                  <span style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 11, fontFamily: 'monospace', color: '#c4c5c7', backgroundColor: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: 4 }}>
                    {vid.duration}
                  </span>
                </div>
                {/* Info */}
                <div style={{ padding: '16px 20px' }}>
                  <h3 style={{ fontFamily: "'Inter Tight', 'Geist', sans-serif", fontSize: 14, fontWeight: 700, color: '#f6f6f7', marginBottom: 12, lineHeight: 1.4 }}>
                    {vid.title}
                  </h3>
                  <button style={{
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Inter Tight', 'Geist', sans-serif",
                    color: '#99f7ff',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '12px 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}>
                    Jetzt ansehen
                    <ExternalLink size={13} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ padding: '24px', background: '#111415' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <div className="danke-footer-links" style={{ display: 'flex', fontSize: 12, color: '#c4c5c7' }}>
            <a href="/impressum" target="_blank" rel="noopener noreferrer" style={{ color: '#c4c5c7', textDecoration: 'none' }}>Impressum</a>
            <a href="/datenschutz" target="_blank" rel="noopener noreferrer" style={{ color: '#c4c5c7', textDecoration: 'none' }}>Datenschutz</a>
          </div>
          <p style={{ fontSize: 11, color: '#464849', maxWidth: 600, lineHeight: 1.5, fontFamily: "'Inter Tight', 'Geist', sans-serif", fontWeight: 500 }}>
            Diese Website ist nicht Teil der Facebook-Website oder von Facebook Inc. Diese Seite ist NICHT im Auftrag der FACEBOOK, Inc. entstanden. FACEBOOK ist eine Marke von FACEBOOK, Inc.
          </p>
          <p style={{ fontSize: 11, color: '#464849', fontFamily: "'Inter Tight', 'Geist', sans-serif", fontWeight: 500 }}>© 2026 Flowstack. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
