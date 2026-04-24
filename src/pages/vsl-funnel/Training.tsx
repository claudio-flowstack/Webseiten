import { useLayoutEffect } from 'react';
import { Play, Pause, Volume2, Maximize, ArrowRight } from 'lucide-react';
import { useSeo } from '@/shared/seo/useSeo';

export function Training() {
  useSeo({
    title: 'Kostenloses Videotraining · Flowstack System',
    description: 'Geschlossenes Videotraining für Agenturen. Nur nach Opt-in erreichbar.',
    path: '/kostenloses-videotraining',
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

  return (
    <div className="vsl-training" style={{ fontFamily: "'Manrope', sans-serif", minHeight: '100vh', background: '#111415', backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(0,241,254,0.03) 0%, transparent 60%)', color: '#f6f6f7', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .vsl-training .training-header { padding: 14px 16px; }
        .vsl-training .training-header-label { display: none; }
        .vsl-training .training-main { padding: 48px 16px 64px; }
        .vsl-training .training-step-text { font-size: clamp(20px, 4vw, 26px); }
        .vsl-training .training-video { margin-bottom: 48px; }
        .vsl-training .training-divider { margin-bottom: 48px; }
        .vsl-training .training-cta { padding: 16px 20px; max-width: 100%; }
        .vsl-training .training-footer-links { gap: 16px; }
        @media (min-width: 768px) {
          .vsl-training .training-header { padding: 16px 24px; }
          .vsl-training .training-header-label { display: block; }
          .vsl-training .training-main { padding: 88px 20px 88px; }
          .vsl-training .training-video { margin-bottom: 64px; }
          .vsl-training .training-divider { margin-bottom: 64px; }
          .vsl-training .training-cta { padding: 18px 24px; max-width: 480px; }
          .vsl-training .training-footer-links { gap: 24px; }
        }
      `}</style>
      {/* Header */}
      <header className="training-header" style={{ background: 'rgba(42,44,46,0.6)', backdropFilter: 'blur(24px)', boxShadow: '0 1px 8px rgba(0,0,0,0.3)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#f6f6f7' }}>
              Flow<span style={{ color: '#99f7ff' }}>stack</span>
            </span>
          </div>
          <span className="training-header-label" style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: '#f6f6f7' }}>
            Kostenlose Videopräsentation
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="training-main" style={{ flex: 1, maxWidth: 900, margin: '0 auto', width: '100%', boxSizing: 'border-box' }}>
        {/* Schritt 1 */}
        <p style={{ marginBottom: 10 }}>
          <span className="training-step-text" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, letterSpacing: '-0.02em', color: '#99f7ff' }}>Schritt 1: </span>
          <span className="training-step-text" style={{ fontWeight: 500, color: '#f6f6f7' }}>Sieh dir jetzt die kostenlose 10-minütige Videopräsentation an</span>
        </p>
        <p style={{ fontSize: 14, color: '#c4c5c7', fontStyle: 'italic', marginBottom: 28, fontWeight: 500 }}>(Klicke dafür ins Bild)</p>

        {/* Video Player */}
        <div style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '16/9',
          background: '#111415',
          borderRadius: '0.5rem',
          overflow: 'hidden',
          cursor: 'pointer',
          boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
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
              background: 'linear-gradient(135deg, #99f7ff, #00e2ee)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 40px rgba(0,241,254,0.35)',
            }}>
              <Play style={{ width: 32, height: 32, color: '#005f64', fill: '#005f64', marginLeft: 3 }} />
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
            <div style={{ width: '100%', height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, marginBottom: 10 }}>
              <div style={{ width: '0%', height: '100%', background: '#00f1fe', borderRadius: 2 }} />
            </div>
            {/* Controls Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <Pause style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.5)' }} />
                <Volume2 style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.5)' }} />
                <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', fontWeight: 500 }}>0:00 / 10:24</span>
              </div>
              <Maximize style={{ width: 18, height: 18, color: 'rgba(255,255,255,0.5)' }} />
            </div>
          </div>
        </div>

        {/* Divider - bg shift instead of border */}
        <div className="training-divider" style={{ height: 1, background: '#1e2021' }} />

        {/* Schritt 2 */}
        <p style={{ marginBottom: 20 }}>
          <span className="training-step-text" style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, letterSpacing: '-0.02em', color: '#99f7ff' }}>Schritt 2: </span>
          <span className="training-step-text" style={{ fontWeight: 500, color: '#f6f6f7' }}>Dein kostenloses Erstgespräch mit Claudio (ca. 15-20 Min.)</span>
        </p>

        <p style={{ fontSize: 16, color: '#c4c5c7', lineHeight: 1.65, marginBottom: 40, maxWidth: 700, textAlign: 'center', margin: '0 auto 40px', fontWeight: 500 }}>
          Möchtest du, dass wir dir zeigen, wie du in nur 2-4 Wochen dein Fulfillment automatisierst und deine Marge verdoppelst? Wenn das der Fall ist, schau dir das Video bis zum Ende an.
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
            background: 'linear-gradient(135deg, #99f7ff, #00e2ee)',
            color: '#005f64',
            border: 'none',
            borderRadius: 4,
            fontSize: 16,
            fontWeight: 700,
            fontFamily: "'Manrope', sans-serif",
            textDecoration: 'none',
            cursor: 'pointer',
            boxSizing: 'border-box',
            transition: 'box-shadow 0.2s ease',
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 0 15px rgba(0,241,254,0.3)'; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none'; }}
        >
          Jetzt kostenloses Erstgespräch sichern!
          <ArrowRight style={{ width: 18, height: 18 }} />
        </a>
        <p style={{ fontSize: 12, color: '#c4c5c7', marginTop: 12, textAlign: 'center', fontWeight: 500 }}>Die Plätze sind limitiert</p>
      </main>

      {/* Footer */}
      <footer style={{ padding: '32px 24px', background: '#111415' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <div className="training-footer-links" style={{ display: 'flex', fontSize: 12, color: '#c4c5c7' }}>
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
