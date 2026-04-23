import { useLayoutEffect, useState, type FormEvent } from 'react';
import { Check, X, User, Mail, ArrowRight, ShieldCheck, Play, Lock } from 'lucide-react';
import { sendSmsCode, type ConfirmationResult } from '@/lib/firebase';

const COUNTRY_CODES = [
  { code: '+49', country: 'DE', flag: '🇩🇪' },
  { code: '+43', country: 'AT', flag: '🇦🇹' },
  { code: '+41', country: 'CH', flag: '🇨🇭' },
  { code: '+44', country: 'GB', flag: '🇬🇧' },
  { code: '+1', country: 'US', flag: '🇺🇸' },
  { code: '+33', country: 'FR', flag: '🇫🇷' },
  { code: '+39', country: 'IT', flag: '🇮🇹' },
  { code: '+31', country: 'NL', flag: '🇳🇱' },
  { code: '+34', country: 'ES', flag: '🇪🇸' },
  { code: '+48', country: 'PL', flag: '🇵🇱' },
  { code: '+66', country: 'TH', flag: '🇹🇭' },
];

export function OptIn() {
  const [showModal, setShowModal] = useState(false);
  const [vorname, setVorname] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [countryCode, setCountryCode] = useState('+49');

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

  const [submitting, setSubmitting] = useState(false);
  const [phoneError, setPhoneError] = useState('');
  const [step, setStep] = useState<'form' | 'verify'>('form');
  const [verifyCode, setVerifyCode] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  const WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxAtxD5g4byY-SD5tuCV79d5k6UL9FEVVIguEiJd_AuBrhukRPCQVzvjSeMeuGGoNn1/exec';

  const fullPhone = () => {
    const cleaned = telefon.replace(/[\s\-\/\(\)]/g, '');
    if (cleaned.startsWith('+') || cleaned.startsWith('00')) return cleaned;
    if (cleaned.startsWith('0')) return countryCode + cleaned.slice(1);
    return countryCode + cleaned;
  };

  // Schritt 1: Code senden
  const handleSendCode = async (e: FormEvent) => {
    e.preventDefault();
    if (!vorname.trim() || !email.trim() || !telefon.trim()) {
      setPhoneError('Bitte fülle alle Felder aus.');
      return;
    }
    setPhoneError('');
    setSubmitting(true);

    // Lead sofort speichern (auch wenn SMS fehlschlägt)
    try {
      fetch(WEBHOOK_URL + '?action=optin', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vorname, email, telefon: fullPhone(), quelle: 'VSL Opt-in (unbestätigt)' }),
      }).catch(() => {});

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: 'vsl_optin', vorname, email });
      if (typeof window.umami !== 'undefined') window.umami.track('vsl_optin');
    } catch {}

    // SMS senden
    try {
      const result = await sendSmsCode(fullPhone(), 'send-code-btn');
      setConfirmationResult(result);
      setStep('verify');
    } catch (err: unknown) {
      console.error('SMS Error:', err);
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('auth/too-many-requests')) {
        setPhoneError('Zu viele Versuche. Bitte warte kurz und versuche es erneut.');
      } else if (msg.includes('auth/invalid-phone-number')) {
        setPhoneError('Ungültige Telefonnummer. Bitte prüfe die Nummer.');
      } else {
        setPhoneError('SMS konnte nicht gesendet werden: ' + msg);
      }
    }
    setSubmitting(false);
  };

  // Schritt 2: Code verifizieren
  const handleVerify = async (e: FormEvent) => {
    e.preventDefault();
    if (verifyCode.length !== 6 || !confirmationResult) return;
    setPhoneError('');
    setSubmitting(true);

    try {
      await confirmationResult.confirm(verifyCode);
      // Lead auf bestätigt aktualisieren
      fetch(WEBHOOK_URL + '?action=optin', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ vorname, email, telefon: fullPhone(), quelle: 'VSL Opt-in (bestätigt)' }),
      }).catch(() => {});
    } catch {
      setPhoneError('Code ungültig. Versuche es nochmal.');
      setSubmitting(false);
      return;
    }

    window.location.href = '/videotraining';
  };

  return (
    <div className="vsl-optin" style={{ fontFamily: "'Manrope', sans-serif", minHeight: '100vh', background: '#111415', backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(0,241,254,0.03) 0%, transparent 60%)', color: '#f6f6f7' }}>
      <style>{`
        .vsl-optin .optin-header { padding: 14px 16px; }
        .vsl-optin .optin-header-label { display: none; }
        .vsl-optin .optin-main { padding: 48px 16px 64px; }
        .vsl-optin .optin-headline { font-size: clamp(22px, 5vw, 42px); margin-bottom: 48px; }
        .vsl-optin .optin-columns { display: flex; gap: 24px; flex-direction: column; }
        .vsl-optin .optin-col-left { min-width: 0; }
        .vsl-optin .optin-col-right { min-width: 0; }
        .vsl-optin .optin-modal-inner { padding: 28px 20px; }
        .vsl-optin .optin-modal-title { font-size: 20px; }
        .vsl-optin .optin-content-box { padding: 20px; }
        .vsl-optin .optin-footer-links { gap: 16px; }
        .vsl-optin .optin-input:focus { border-color: transparent !important; border-bottom-color: #99f7ff !important; border-bottom-width: 2px !important; }
        @media (min-width: 768px) {
          .vsl-optin .optin-header { padding: 16px 24px; }
          .vsl-optin .optin-header-label { display: block; }
          .vsl-optin .optin-main { padding: 88px 20px 88px; }
          .vsl-optin .optin-headline { margin-bottom: 64px; }
          .vsl-optin .optin-columns { flex-direction: row; gap: 56px; }
          .vsl-optin .optin-col-left { flex: 1; min-width: 280px; }
          .vsl-optin .optin-col-right { flex: 1; min-width: 300px; }
          .vsl-optin .optin-modal-inner { padding: 36px 32px; }
          .vsl-optin .optin-modal-title { font-size: 22px; }
          .vsl-optin .optin-content-box { padding: 32px 28px; }
          .vsl-optin .optin-footer-links { gap: 24px; }
        }
      `}</style>
      {/* Header */}
      <header className="optin-header" style={{ background: 'rgba(42,44,46,0.6)', backdropFilter: 'blur(24px)', boxShadow: '0 1px 8px rgba(0,0,0,0.3)', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ fontFamily: "'Manrope', sans-serif", fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: '#f6f6f7' }}>
              Flow<span style={{ color: '#99f7ff' }}>stack</span>
            </span>
          </div>
          <span className="optin-header-label" style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#f6f6f7' }}>
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
          color: '#f6f6f7',
        }}>
          Wie du 80% deines Agency-Fulfillments an KI-Agenten auslagerst und deine Marge verdoppelst{' '}
          <span style={{ color: '#99f7ff' }}>ohne neue Mitarbeiter einzustellen.</span>
        </h1>

        {/* 2-Column Layout */}
        <div className="optin-columns">
          {/* Left Column - Image */}
          <div className="optin-col-left" style={{ flex: 1 }}>
            <div style={{
              aspectRatio: '4/3',
              borderRadius: '0.5rem',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
            }}>
              <img src="/claudio-hero.jpg" alt="Claudio Di Franco" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ marginTop: 16, background: '#111415', borderRadius: '0.5rem', padding: '14px 18px' }}>
              <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800, fontSize: 15, marginBottom: 2, color: '#f6f6f7', letterSpacing: '-0.02em' }}>CLAUDIO DI FRANCO</p>
              <p style={{ fontSize: 13, color: '#c4c5c7', fontWeight: 500 }}>Experte für KI-Automatisierung & Agentur-Skalierung</p>
            </div>
          </div>

          {/* Right Column - Bullets + CTA in Content Box */}
          <div className="optin-col-right" style={{ flex: 1 }}>
            <div className="optin-content-box" style={{
              background: '#181a1b',
              borderRadius: '0.5rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            }}>
              <p style={{
                fontSize: 16,
                fontWeight: 800,
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
                color: '#99f7ff',
                marginBottom: 28,
              }}>
                Kostenloses Videotraining enthüllt:
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 36 }}>
                {[
                  'Warum 90% aller Agenturen an manuellen Prozessen scheitern und wie du es vermeidest',
                  'Die exakte KI-Workflow-Methode, mit der unsere Kunden ihre Fulfillment-Zeit um 80% reduzieren',
                  'Die 3 konkreten Schritte, um deine Agentur auf Autopilot zu stellen ohne technisches Vorwissen',
                ].map((text, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                    <div style={{
                      flexShrink: 0,
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      background: 'rgba(0,241,254,0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginTop: 2,
                    }}>
                      <Check style={{ width: 14, height: 14, color: '#00f1fe' }} />
                    </div>
                    <p style={{ fontSize: 15, lineHeight: 1.6, color: '#f6f6f7', fontWeight: 600 }}>{text}</p>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => setShowModal(true)}
                style={{
                  width: '100%',
                  padding: '18px 24px',
                  background: 'linear-gradient(135deg, #99f7ff, #00e2ee)',
                  color: '#005f64',
                  border: 'none',
                  borderRadius: 4,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  transition: 'box-shadow 0.2s ease',
                }}
                onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.boxShadow = '0 0 15px rgba(0,241,254,0.3)'; }}
                onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.boxShadow = 'none'; }}
              >
                Jetzt kostenloses Videotraining ansehen!
                <ArrowRight style={{ width: 18, height: 18 }} />
              </button>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 12 }}>
                <ShieldCheck style={{ width: 14, height: 14, color: '#99f7ff', flexShrink: 0 }} />
                <p style={{ fontSize: 12, color: '#c4c5c7', margin: 0, fontWeight: 500 }}>
                  Über 450 Agenturen vertrauen uns bereits
                </p>
              </div>
            </div>
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
            background: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(12px)',
            padding: 20,
          }}
          onClick={(e) => { if (e.target === e.currentTarget) setShowModal(false); }}
        >
          <div className="optin-modal-inner" style={{
            background: '#181a1b',
            borderRadius: 12,
            width: '100%',
            maxWidth: 720,
            position: 'relative',
            boxShadow: '0 32px 64px rgba(0,0,0,0.5), 0 0 60px rgba(0,241,254,0.05)',
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
          }}>
            <style>{`
              @media (max-width: 640px) {
                .optin-modal-inner { flex-direction: column !important; max-width: 420px !important; }
                .optin-modal-preview { display: none !important; }
              }
            `}</style>

            {/* Left: Form */}
            <div style={{ flex: 1, padding: '36px 32px' }}>
              {/* Close Button */}
              <button
                onClick={() => setShowModal(false)}
                style={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  background: 'none',
                  border: 'none',
                  color: '#464849',
                  cursor: 'pointer',
                  padding: 10,
                  minWidth: 44,
                  minHeight: 44,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 10,
                }}
              >
                <X style={{ width: 20, height: 20 }} />
              </button>

              <h2 style={{
                fontFamily: "'Manrope', sans-serif",
                fontWeight: 800,
                fontSize: 22,
                letterSpacing: '-0.02em',
                marginBottom: 10,
                color: '#f6f6f7',
              }}>
                Video freischalten
              </h2>

              <p style={{
                fontSize: 14,
                color: '#f6f6f7',
                lineHeight: 1.6,
                marginBottom: 28,
                fontWeight: 500,
              }}>
                Trage jetzt kurz deine Daten ein, um das Videotraining direkt freizuschalten.
              </p>

              {step === 'form' ? (
              <form onSubmit={handleSendCode} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                {/* Vorname */}
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#c4c5c7', marginBottom: 6, display: 'block' }}>Vorname</label>
                  <div style={{ position: 'relative' }}>
                    <User style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#464849' }} />
                    <input
                      type="text"
                      required
                      value={vorname}
                      onChange={(e) => setVorname(e.target.value)}
                      placeholder="Dein Vorname"
                      className="optin-input"
                      style={{
                        width: '100%',
                        padding: '11px 0 11px 28px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #464849',
                        borderRadius: 0,
                        color: '#f6f6f7',
                        fontSize: 14,
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 500,
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s ease',
                      }}
                    />
                  </div>
                </div>

                {/* E-Mail */}
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#c4c5c7', marginBottom: 6, display: 'block' }}>E-Mail</label>
                  <div style={{ position: 'relative' }}>
                    <Mail style={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', width: 16, height: 16, color: '#464849' }} />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Deine beste E-Mail"
                      className="optin-input"
                      style={{
                        width: '100%',
                        padding: '11px 0 11px 28px',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #464849',
                        borderRadius: 0,
                        color: '#f6f6f7',
                        fontSize: 14,
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 500,
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s ease',
                      }}
                    />
                  </div>
                </div>

                {/* Telefonnummer mit Ländervorwahl */}
                <div>
                  <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#c4c5c7', marginBottom: 6, display: 'block' }}>Telefonnummer</label>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #464849',
                        color: '#f6f6f7',
                        fontSize: 14,
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 500,
                        padding: '11px 4px',
                        outline: 'none',
                        width: 90,
                        cursor: 'pointer',
                      }}
                    >
                      {COUNTRY_CODES.map(c => (
                        <option key={c.code} value={c.code} style={{ background: '#181a1b', color: '#f6f6f7' }}>
                          {c.flag} {c.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      required
                      value={telefon}
                      onChange={(e) => setTelefon(e.target.value)}
                      placeholder="170 1234567"
                      className="optin-input"
                      style={{
                        flex: 1,
                        padding: '11px 0',
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid #464849',
                        borderRadius: 0,
                        color: '#f6f6f7',
                        fontSize: 14,
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 500,
                        outline: 'none',
                        boxSizing: 'border-box',
                        transition: 'border-color 0.2s ease',
                      }}
                    />
                  </div>
                </div>

                {phoneError && (
                  <p style={{ color: '#ff6b6b', fontSize: 13, margin: 0 }}>{phoneError}</p>
                )}

                <button
                  id="send-code-btn"
                  type="submit"
                  disabled={submitting}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    background: submitting ? 'rgba(153,247,255,0.4)' : 'linear-gradient(135deg, #99f7ff, #00e2ee)',
                    color: '#003538',
                    border: 'none',
                    borderRadius: 4,
                    fontSize: 15,
                    fontWeight: 700,
                    fontFamily: "'Manrope', sans-serif",
                    cursor: submitting ? 'wait' : 'pointer',
                    marginTop: 4,
                    transition: 'box-shadow 0.2s ease',
                  }}
                  onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.boxShadow = '0 0 20px rgba(0,241,254,0.3)'; }}
                  onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.boxShadow = 'none'; }}
                >
                  {submitting ? 'Code wird gesendet...' : 'Code per SMS erhalten'}
                </button>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 4 }}>
                  <Lock style={{ width: 13, height: 13, color: '#99f7ff', flexShrink: 0 }} />
                  <p style={{ fontSize: 11, color: '#c4c5c7', margin: 0, lineHeight: 1.4 }}>
                    Wir senden dir einen Bestätigungscode per SMS. Keine Kosten.
                  </p>
                </div>
              </form>
              ) : (
              <form onSubmit={handleVerify} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                <div style={{ textAlign: 'center', marginBottom: 8 }}>
                  <ShieldCheck style={{ width: 40, height: 40, color: '#99f7ff', margin: '0 auto 12px' }} />
                  <p style={{ fontSize: 14, color: '#f6f6f7', fontWeight: 500, marginBottom: 4 }}>
                    Code wurde an <strong>{fullPhone()}</strong> gesendet
                  </p>
                  <p style={{ fontSize: 12, color: '#c4c5c7' }}>Gib den 6-stelligen Code ein</p>
                </div>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={verifyCode}
                  onChange={(e) => setVerifyCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                  placeholder="• • • • • •"
                  style={{
                    width: '100%', padding: '16px 0', background: 'transparent', border: 'none',
                    borderBottom: '2px solid #99f7ff', borderRadius: 0, color: '#f6f6f7', fontSize: 28,
                    fontFamily: "'Manrope', sans-serif", fontWeight: 700, letterSpacing: '0.3em',
                    textAlign: 'center', outline: 'none', boxSizing: 'border-box',
                  }}
                  autoFocus
                />

                {phoneError && <p style={{ color: '#ff6b6b', fontSize: 13, margin: 0, textAlign: 'center' }}>{phoneError}</p>}

                <button
                  type="submit"
                  disabled={submitting || verifyCode.length !== 6}
                  style={{
                    width: '100%', padding: '16px 24px',
                    background: (submitting || verifyCode.length !== 6) ? 'rgba(153,247,255,0.4)' : 'linear-gradient(135deg, #99f7ff, #00e2ee)',
                    color: '#003538', border: 'none', borderRadius: 4, fontSize: 15, fontWeight: 700,
                    fontFamily: "'Manrope', sans-serif",
                    cursor: (submitting || verifyCode.length !== 6) ? 'not-allowed' : 'pointer',
                  }}
                >
                  {submitting ? 'Wird geprüft...' : 'Video freischalten'}
                </button>

                <button
                  type="button"
                  onClick={() => { setStep('form'); setPhoneError(''); setVerifyCode(''); }}
                  style={{ background: 'none', border: 'none', color: '#c4c5c7', fontSize: 12, cursor: 'pointer', padding: 8 }}
                >
                  ← Andere Nummer verwenden
                </button>
              </form>
              )}
            </div>

            {/* Right: Video Preview (Desktop only) */}
            <div className="optin-modal-preview" style={{
              width: 280,
              flexShrink: 0,
              background: '#111415',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 32,
              gap: 20,
            }}>
              {/* Fake Video Thumbnail */}
              <div style={{
                width: '100%',
                aspectRatio: '16/9',
                borderRadius: 8,
                background: 'linear-gradient(135deg, #1e2021, #232628)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden',
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #99f7ff, #00e2ee)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 0 30px rgba(0,241,254,0.3)',
                }}>
                  <Play style={{ width: 20, height: 20, color: '#003538', marginLeft: 2 }} />
                </div>
              </div>

              <div style={{ textAlign: 'center' }}>
                <p style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 14, color: '#f6f6f7', marginBottom: 8 }}>
                  Exklusives Videotraining
                </p>
                <p style={{ fontSize: 12, color: '#c4c5c7', lineHeight: 1.5 }}>
                  Erfahre die exakte Methode, mit der Agenturen ihr Fulfillment um 80% automatisieren.
                </p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                <ShieldCheck style={{ width: 16, height: 16, color: '#99f7ff' }} />
                <span style={{ fontSize: 11, color: '#c4c5c7' }}>100% kostenlos</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ padding: '32px 24px', background: '#111415' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <div className="optin-footer-links" style={{ display: 'flex', fontSize: 12, color: '#c4c5c7' }}>
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
