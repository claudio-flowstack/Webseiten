import { useLayoutEffect, useState, type FormEvent } from 'react';
import { Check, X, Phone, User, Mail, ArrowRight } from 'lucide-react';

export function VslOptInPage() {
  const [showModal, setShowModal] = useState(false);
  const [vorname, setVorname] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');

  useLayoutEffect(() => {
    document.body.style.backgroundColor = '#0e0e0e';
    document.body.style.margin = '0';
    document.documentElement.classList.add('dark');
    return () => {
      document.body.style.backgroundColor = '';
      document.documentElement.classList.remove('dark');
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ vorname, email, telefon });
    window.location.href = '/videotraining';
  };

  return (
    <div className="vsl-optin" style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#0e0e0e', backgroundImage: 'radial-gradient(at 0% 0%, rgba(148,170,255,0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255,107,0,0.08) 0px, transparent 50%)', color: '#fff' }}>
      <style>{`
        .vsl-optin .optin-header { padding: 12px 16px; }
        .vsl-optin .optin-header-label { display: none; }
        .vsl-optin .optin-main { padding: 32px 16px 48px; }
        .vsl-optin .optin-headline { font-size: clamp(22px, 5vw, 42px); margin-bottom: 32px; }
        .vsl-optin .optin-columns { display: flex; gap: 24px; flex-direction: column; }
        .vsl-optin .optin-col-left { min-width: 0; }
        .vsl-optin .optin-col-right { min-width: 0; }
        .vsl-optin .optin-modal-inner { padding: 24px 20px; }
        .vsl-optin .optin-modal-title { font-size: 20px; }
        .vsl-optin .optin-footer-links { gap: 16px; }
        @media (min-width: 768px) {
          .vsl-optin .optin-header { padding: 16px 24px; }
          .vsl-optin .optin-header-label { display: block; }
          .vsl-optin .optin-main { padding: 48px 20px 64px; }
          .vsl-optin .optin-headline { margin-bottom: 48px; }
          .vsl-optin .optin-columns { flex-direction: row; gap: 48px; }
          .vsl-optin .optin-col-left { flex: 1; min-width: 280px; }
          .vsl-optin .optin-col-right { flex: 1; min-width: 300px; }
          .vsl-optin .optin-modal-inner { padding: 36px 32px; }
          .vsl-optin .optin-modal-title { font-size: 22px; }
          .vsl-optin .optin-footer-links { gap: 24px; }
        }
      `}</style>
      {/* Header */}
      <header className="optin-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', background: '#0e0e0e' }}>
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
          <span className="optin-header-label" style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', color: '#ffffff' }}>
            Kostenloses Videotraining
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="optin-main" style={{ maxWidth: 1100, margin: '0 auto' }}>
        {/* Headline */}
        <h1 className="optin-headline" style={{
          fontFamily: "'Manrope', sans-serif",
          fontSize: 'clamp(22px, 5vw, 42px)',
          fontWeight: 800,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          maxWidth: 900,
          textAlign: 'center' as const,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Wie du 80% deines Agency-Fulfillments an KI-Agenten auslagerst und deine Marge verdoppelst{' '}
          <span style={{ color: '#FF6B00' }}>— ohne neue Mitarbeiter einzustellen.</span>
        </h1>

        {/* 2-Column Layout */}
        <div className="optin-columns">
          {/* Left Column - Image */}
          <div className="optin-col-left" style={{ flex: 1 }}>
            <div style={{
              aspectRatio: '4/3',
              borderRadius: 12,
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
              border: '1px solid rgba(255,255,255,0.08)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{ textAlign: 'center', opacity: 0.3 }}>
                <User style={{ width: 48, height: 48, margin: '0 auto 8px' }} />
                <p style={{ fontSize: 12 }}>Foto Platzhalter</p>
              </div>
            </div>
            <div style={{ marginTop: 16, background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', borderRadius: 10, padding: '12px 16px' }}>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 15, marginBottom: 2 }}>CLAUDIO DI FRANCO</p>
              <p style={{ fontSize: 13, color: '#9ca3af' }}>Gründer, Flowstack Systems</p>
            </div>
          </div>

          {/* Right Column - Bullets + CTA */}
          <div className="optin-col-right" style={{ flex: 1 }}>
            <p style={{
              fontSize: 14,
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#FF6B00',
              marginBottom: 24,
            }}>
              Kostenloses Videotraining enthüllt:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 36 }}>
              {[
                'Warum 90% aller Agenturen an manuellen Prozessen scheitern und wie du es vermeidest',
                'Die exakte KI-Workflow-Methode, mit der unsere Kunden ihre Fulfillment-Zeit um 80% reduzieren',
                'Die 3 konkreten Schritte, um deine Agentur auf Autopilot zu stellen — ohne technisches Vorwissen',
              ].map((text, i) => (
                <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    flexShrink: 0,
                    width: 24,
                    height: 24,
                    borderRadius: '50%',
                    background: 'rgba(148,170,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 2,
                  }}>
                    <Check style={{ width: 14, height: 14, color: '#FF6B00' }} />
                  </div>
                  <p style={{ fontSize: 14, lineHeight: 1.5, color: '#d1d5db' }}>{text}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <button
              onClick={() => setShowModal(true)}
              style={{
                width: '100%',
                padding: '18px 24px',
                background: 'linear-gradient(to bottom right, #FF6B00, #FF9E00)',
                color: '#000',
                border: 'none',
                borderRadius: 10,
                fontSize: 16,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
              }}
            >
              Jetzt kostenloses Videotraining ansehen!
              <ArrowRight style={{ width: 18, height: 18 }} />
            </button>
            <p style={{ fontSize: 12, color: '#6b7280', textAlign: 'center', marginTop: 10 }}>
              Nur 1 Klick nötig - Keine Anmeldung notwendig
            </p>
          </div>
        </div>
      </main>

      {/* Modal */}
      {showModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 100,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.7)',
            backdropFilter: 'blur(8px)',
            padding: 20,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="optin-modal-inner" style={{
            background: '#161616',
            border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: 16,
            width: '100%',
            maxWidth: 420,
            position: 'relative',
          }}>
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              style={{
                position: 'absolute',
                top: 14,
                right: 14,
                background: 'none',
                border: 'none',
                color: '#6b7280',
                cursor: 'pointer',
                padding: 4,
              }}
            >
              <X style={{ width: 20, height: 20 }} />
            </button>

            <h2 className="optin-modal-title" style={{
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 700,
              marginBottom: 24,
              textAlign: 'center',
            }}>
              Video freischalten
            </h2>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Vorname */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', marginBottom: 6, display: 'block' }}>Vorname</label>
                <div style={{ position: 'relative' }}>
                  <User style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#6b7280' }} />
                  <input
                    type="text"
                    required
                    value={vorname}
                    onChange={(e) => setVorname(e.target.value)}
                    placeholder="Dein Vorname"
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 44px',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: 15,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* E-Mail */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', marginBottom: 6, display: 'block' }}>E-Mail</label>
                <div style={{ position: 'relative' }}>
                  <Mail style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#6b7280' }} />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Deine beste E-Mail Adresse"
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 44px',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: 15,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              {/* Telefonnummer */}
              <div>
                <label style={{ fontSize: 12, fontWeight: 600, color: '#9ca3af', marginBottom: 6, display: 'block' }}>Telefonnummer</label>
                <div style={{ position: 'relative' }}>
                  <Phone style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', width: 18, height: 18, color: '#6b7280' }} />
                  <input
                    type="tel"
                    required
                    value={telefon}
                    onChange={(e) => setTelefon(e.target.value)}
                    placeholder="Deine Telefonnummer"
                    style={{
                      width: '100%',
                      padding: '14px 14px 14px 44px',
                      background: 'rgba(0,0,0,0.4)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: 8,
                      color: '#fff',
                      fontSize: 15,
                      outline: 'none',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              </div>

              <button
                type="submit"
                style={{
                  width: '100%',
                  padding: '16px 24px',
                  background: 'linear-gradient(to bottom right, #FF6B00, #FF9E00)',
                  color: '#000',
                  border: 'none',
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                  marginTop: 4,
                }}
              >
                Video jetzt ansehen
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px', background: '#0e0e0e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <div className="optin-footer-links" style={{ display: 'flex', fontSize: 12, color: '#6b7280' }}>
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
