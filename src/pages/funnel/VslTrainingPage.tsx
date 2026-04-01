import { useLayoutEffect } from 'react';
import { Play, Pause, Volume2, Maximize, ArrowRight } from 'lucide-react';

export function VslTrainingPage() {
  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#0e0e0e';
    document.body.style.margin = '0';
    document.documentElement.classList.add('dark');
    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.classList.remove('dark');
    };
  }, []);

  return (
    <div className="vsl-training" style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#0e0e0e', backgroundImage: 'radial-gradient(at 0% 0%, rgba(148,170,255,0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255,107,0,0.08) 0px, transparent 50%)', color: '#fff', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .vsl-training .training-header { padding: 12px 16px; }
        .vsl-training .training-header-label { display: none; }
        .vsl-training .training-main { padding: 32px 16px 48px; }
        .vsl-training .training-step-text { font-size: clamp(18px, 4vw, 22px); }
        .vsl-training .training-video { margin-bottom: 32px; }
        .vsl-training .training-divider { margin-bottom: 32px; }
        .vsl-training .training-cta { padding: 16px 20px; max-width: 100%; }
        .vsl-training .training-footer-links { gap: 16px; }
        @media (min-width: 768px) {
          .vsl-training .training-header { padding: 16px 24px; }
          .vsl-training .training-header-label { display: block; }
          .vsl-training .training-main { padding: 48px 20px 64px; }
          .vsl-training .training-video { margin-bottom: 48px; }
          .vsl-training .training-divider { margin-bottom: 48px; }
          .vsl-training .training-cta { padding: 18px 24px; max-width: 480px; }
          .vsl-training .training-footer-links { gap: 24px; }
        }
      `}</style>
      {/* Header */}
      <header className="training-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#0e0e0e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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
          <span className="training-header-label" style={{ fontFamily: "'Manrope', sans-serif", fontSize: 18, fontWeight: 700, letterSpacing: '-0.02em', color: '#ffffff' }}>
            Kostenlose Videopräsentation
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="training-main" style={{ flex: 1, maxWidth: 900, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {/* Schritt 1 */}
        <p style={{ marginBottom: 8 }}>
          <span className="training-step-text" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, color: '#FF6B00' }}>Schritt 1: </span>
          <span className="training-step-text" style={{ fontWeight: 600 }}>Sieh dir jetzt die kostenlose 10-minütige Videopräsentation an</span>
        </p>
        <p style={{ fontSize: 14, color: '#6b7280', fontStyle: 'italic', marginBottom: 24 }}>(Klicke dafür ins Bild)</p>

        {/* Video Player */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 40%, #0d1117 100%)',
          borderRadius: 12,
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          cursor: 'pointer',
        }} className="training-video">
          {/* Play Button Overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.3)',
          }}>
            <div style={{
              width: 72,
              height: 72,
              borderRadius: '50%',
              background: '#FF6B00',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(255,107,0,0.4)',
            }}>
              <Play style={{ width: 32, height: 32, color: '#000', fill: '#000', marginLeft: 3 }} />
            </div>
          </div>

          {/* Fake Video Controls */}
          <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '24px 16px 14px',
            background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
          }}>
            {/* Progress Bar */}
            <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.15)', borderRadius: 2, marginBottom: 10 }}>
              <div style={{ width: '0%', height: '100%', background: '#FF6B00', borderRadius: 2 }} />
            </div>
            {/* Controls Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Pause style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.7)' }} />
                <Volume2 style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.7)' }} />
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>0:00 / 10:24</span>
              </div>
              <Maximize style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.7)' }} />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="training-divider" style={{ height: 1, background: 'rgba(255,255,255,0.06)' }} />

        {/* Schritt 2 */}
        <p style={{ marginBottom: 16 }}>
          <span className="training-step-text" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, color: '#FF6B00' }}>Schritt 2: </span>
          <span className="training-step-text" style={{ fontWeight: 600 }}>Dein kostenloses 60-minütiges Erstgespräch mit Claudio</span>
        </p>

        <p style={{ fontSize: 16, color: '#9ca3af', lineHeight: 1.65, marginBottom: 32, maxWidth: 700, textAlign: 'center', margin: '0 auto 32px' }}>
          Möchtest du, dass wir dir zeigen, wie du in nur 4-12 Wochen dein Fulfillment automatisierst und deine Marge verdoppelst? Wenn das der Fall ist, schau dir das Video bis zum Ende an.
        </p>

        {/* CTA Button */}
        <a
          href="/private-bewerbung"
          className="training-cta"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            width: '100%',
            margin: '0 auto',
            background: 'linear-gradient(to bottom right, #FF6B00, #FF9E00)',
            color: '#000',
            border: 'none',
            borderRadius: 10,
            fontSize: 16,
            fontWeight: 700,
            textDecoration: 'none',
            cursor: 'pointer',
            boxSizing: 'border-box',
          }}
        >
          Jetzt kostenloses Erstgespräch sichern!
          <ArrowRight style={{ width: 18, height: 18 }} />
        </a>
        <p style={{ fontSize: 12, color: '#6b7280', marginTop: 10, textAlign: 'center' }}>Die Plätze sind limitiert</p>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px', background: '#0e0e0e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <div className="training-footer-links" style={{ display: 'flex', fontSize: 12, color: '#6b7280' }}>
            <a href="/impressum" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>Impressum</a>
            <a href="/datenschutz" target="_blank" rel="noopener noreferrer" style={{ color: '#6b7280', textDecoration: 'none' }}>Datenschutz</a>
          </div>
          <p style={{ fontSize: 11, color: '#4b5563', maxWidth: 600, lineHeight: 1.5 }}>
            Diese Website ist nicht Teil der Facebook-Website oder von Facebook Inc. Diese Seite ist NICHT im Auftrag der FACEBOOK, Inc. entstanden. FACEBOOK ist eine Marke von FACEBOOK, Inc.
          </p>
          <p style={{ fontSize: 11, color: '#4b5563' }}>&copy; 2026 Flowstack. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}
