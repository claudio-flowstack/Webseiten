import { useLayoutEffect, useState } from 'react';
import { Play, CheckCircle2, Instagram, ExternalLink } from 'lucide-react';

export function VslDankePage() {
  const [videoPlaying, setVideoPlaying] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0e0e0e';
    document.body.style.color = '#ffffff';
    document.body.style.fontFamily = "'Inter', sans-serif";
    document.body.style.margin = '0';
  }, []);

  const ytThumbnails = [
    { title: 'Wie KI deinen Vertrieb in 30 Tagen transformiert', duration: '12:34' },
    { title: 'Case Study: 40% mehr Effizienz durch Automatisierung', duration: '09:18' },
    { title: 'Die 3 größten Fehler bei der Digitalisierung', duration: '07:45' },
  ];

  return (
    <div className="vsl-danke" style={{ minHeight: '100vh', backgroundColor: '#0e0e0e', backgroundImage: 'radial-gradient(at 0% 0%, rgba(148,170,255,0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255,107,0,0.08) 0px, transparent 50%)', color: '#fff' }}>
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
          .vsl-danke .danke-insta-wrap { margin-bottom: 80px; }
          .vsl-danke .danke-yt-grid { grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)) !important; }
          .vsl-danke .danke-footer-links { gap: 24px; }
        }
      `}</style>
      {/* Header */}
      <header className="danke-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 10 }}>
          <svg width="28" height="28" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
              fill="#FF6B00"
            />
          </svg>
          <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 20, fontWeight: 700, letterSpacing: '-0.02em' }}>
            Flow<span style={{ color: '#FF6B00' }}>stack</span>
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="danke-main" style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Hero */}
        <div className="danke-hero" style={{ textAlign: 'center' }}>
          <h1 style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: 'clamp(24px, 5vw, 44px)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            textTransform: 'uppercase',
            color: '#fff',
            marginBottom: 16,
          }}>
            Vielen Dank für deine Bewerbung!
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 17, color: '#9ca3af', maxWidth: 560, margin: '0 auto', lineHeight: 1.6 }}>
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
              display: none;
            }
            @media (min-width: 768px) {
              .video-info-card {
                display: flex !important;
              }
            }
          `}</style>

          {/* Left: Video Player */}
          <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', backgroundColor: '#111', border: '1px solid rgba(255,255,255,0.06)', boxShadow: '0 25px 60px -15px rgba(0,0,0,0.5)' }}>
            <div style={{ aspectRatio: '16/9', position: 'relative' }}>
              {/* BG Gradient */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, #0e0e0e 0%, #1a1a2e 50%, #0e0e0e 100%)' }} />

              {/* Play Button */}
              <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
                <button
                  onClick={() => setVideoPlaying(!videoPlaying)}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: '50%',
                    backgroundColor: '#FF6B00',
                    color: '#000',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 40px rgba(255,107,0,0.35)',
                    transition: 'transform 0.2s',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                >
                  <Play size={32} fill="#000" />
                </button>
              </div>

              {/* Fake Controls */}
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '32px 20px 16px', background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', zIndex: 3 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ height: 4, flex: 1, backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 9999, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '33%', backgroundColor: '#FF6B00', borderRadius: 9999 }} />
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
            backgroundColor: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div>
              <p style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#FF6B00', fontFamily: "'Inter', sans-serif", marginBottom: 20 }}>
                In unserem Gespräch lernst du:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  'Wie du dein eigenes Business startest',
                  'Effizient dein Vertrieb aufbaust',
                  'Schnelle Abo-Schritte zu deinem Erfolg',
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 12 }}>
                    <CheckCircle2 size={20} style={{ color: '#FF6B00', flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: '#d1d5db', lineHeight: 1.5 }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Claudio Placeholder */}
            <div style={{ width: 80, height: 80, borderRadius: 12, backgroundColor: 'rgba(148,170,255,0.1)', border: '1px solid rgba(148,170,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', alignSelf: 'flex-end' }}>
              <span style={{ fontSize: 11, color: '#6b7280', fontFamily: "'Inter', sans-serif", textAlign: 'center' }}>Claudio</span>
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
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              color: '#FF6B00',
              fontWeight: 600,
              fontFamily: "'Inter', sans-serif",
              textDecoration: 'none',
              /* padding via CSS class danke-insta-cta */
              borderRadius: 12,
              border: '1px solid rgba(148,170,255,0.2)',
              backgroundColor: 'rgba(148,170,255,0.05)',
              transition: 'all 0.2s',
            }}
          >
            <Instagram size={20} />
            Hier klicken um mir auf Instagram zu folgen!
            <ExternalLink size={14} style={{ opacity: 0.6 }} />
          </a>
        </div>

        {/* YouTube Section */}
        <div style={{ marginBottom: 40 }}>
          <h2 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 36 }}>
            Weitere Einblicke
          </h2>
          <div className="danke-yt-grid" style={{ display: 'grid', gap: 24 }}>
            {ytThumbnails.map((vid, i) => (
              <div key={i} style={{
                borderRadius: 16,
                overflow: 'hidden',
                backgroundColor: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                transition: 'border-color 0.2s',
              }}>
                {/* Thumbnail */}
                <div style={{ aspectRatio: '16/9', backgroundColor: '#111', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, hsl(${220 + i * 15}, 30%, 12%) 0%, #0e0e0e 100%)` }} />
                  <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <div style={{ width: 48, height: 48, borderRadius: '50%', backgroundColor: 'rgba(148,170,255,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Play size={22} fill="#0a0a0a" style={{ color: '#0a0a0a' }} />
                    </div>
                  </div>
                  <span style={{ position: 'absolute', bottom: 8, right: 8, fontSize: 11, fontFamily: 'monospace', color: '#fff', backgroundColor: 'rgba(0,0,0,0.7)', padding: '2px 6px', borderRadius: 4 }}>
                    {vid.duration}
                  </span>
                </div>
                {/* Info */}
                <div style={{ padding: '16px 20px' }}>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 12, lineHeight: 1.4 }}>
                    {vid.title}
                  </h3>
                  <button style={{
                    fontSize: 13,
                    fontWeight: 600,
                    fontFamily: "'Inter', sans-serif",
                    color: '#FF6B00',
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
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
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px', background: '#0e0e0e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <div className="danke-footer-links" style={{ display: 'flex', fontSize: 12, color: '#6b7280' }}>
            <a href="/impressum" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>Impressum</a>
            <a href="/datenschutz" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>Datenschutz</a>
          </div>
          <p style={{ fontSize: 11, color: '#4b5563', maxWidth: 600, lineHeight: 1.5 }}>
            Diese Website ist nicht Teil der Facebook-Website oder von Facebook Inc. Diese Seite ist NICHT im Auftrag der FACEBOOK, Inc. entstanden. FACEBOOK ist eine Marke von FACEBOOK, Inc.
          </p>
          <p style={{ fontSize: 11, color: '#4b5563' }}>© 2026 Flowstack. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
