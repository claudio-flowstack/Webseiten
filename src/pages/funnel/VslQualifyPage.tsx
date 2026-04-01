import { useState, useLayoutEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Lock,
  CheckCircle2,
  ShieldCheck,
  BadgeCheck,
  BarChart3,
  ChevronRight,
} from 'lucide-react';

interface FormData {
  anrede: string;
  vorname: string;
  nachname: string;
  email: string;
  telefon: string;
  website: string;
  dienstleistung: string;
  monatsumsatz: string;
  zielumsatz: string;
  problem: string;
  werbeanzeigen: string;
  mitarbeiter: string;
  investition: string;
  motivation: string;
}

const INITIAL_FORM: FormData = {
  anrede: '',
  vorname: '',
  nachname: '',
  email: '',
  telefon: '',
  website: '',
  dienstleistung: '',
  monatsumsatz: '',
  zielumsatz: '',
  problem: '',
  werbeanzeigen: '',
  mitarbeiter: '',
  investition: '',
  motivation: '',
};

const TOTAL_STEPS = 11;

export function VslQualifyPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);

  useLayoutEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0e0e0e';
    document.body.style.color = '#ffffff';
    document.body.style.fontFamily = "'Inter', sans-serif";
    return () => {
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
    };
  }, []);

  const update = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = (): boolean => {
    switch (currentStep) {
      case 0:
        return form.anrede !== '' && form.vorname.trim().length > 0;
      case 1:
        return form.nachname.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email);
      case 2:
        return form.telefon.trim().length >= 4;
      case 3:
        return form.dienstleistung !== '';
      case 4:
        return form.monatsumsatz !== '';
      case 5:
        return form.zielumsatz.trim().length > 0;
      case 6:
        return form.problem !== '';
      case 7:
        return form.werbeanzeigen !== '';
      case 8:
        return form.mitarbeiter !== '';
      case 9:
        return form.investition.trim().length > 0;
      case 10:
        return form.motivation.trim().length >= 20;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!isStepValid()) return;
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.location.href = '/termin';
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const isLast = currentStep === TOTAL_STEPS - 1;

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0e0e0e', color: '#fff' }}>
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-[#0e0e0e]/80 backdrop-blur-xl shadow-[0_16px_32px_rgba(255,255,255,0.04)]">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 2C16 2 20 8 20 12C20 14 18.5 15.5 16 16C13.5 15.5 12 14 12 12C12 8 16 2 16 2Z" fill="#FF6B00" />
              <path d="M16 16C18.5 15.5 20 14 20 12C22 14 24 16 24 19C24 22 21 24 16 26C11 24 8 22 8 19C8 16 10 14 12 12C12 14 13.5 15.5 16 16Z" fill="#FF9E00" />
              <path d="M16 26C21 24 24 22 24 19C25 21 26 23 26 25C26 28 22 30 16 30C10 30 6 28 6 25C6 23 7 21 8 19C8 22 11 24 16 26Z" fill="#FFB84D" opacity="0.7" />
            </svg>
            <span className="text-2xl font-bold tracking-tighter text-white" style={{ fontFamily: "'Manrope', sans-serif" }}>
              Flowstack
            </span>
          </div>
          <div className="text-sm font-bold text-white" style={{ fontFamily: "'Inter', sans-serif" }}>
            Private Bewerbung
          </div>
        </div>
      </nav>

      {/* Main */}
      <main
        className="min-h-screen pt-32 pb-20 px-4"
        style={{
          backgroundImage:
            'radial-gradient(at 0% 0%, rgba(148, 170, 255, 0.05) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(255, 107, 0, 0.08) 0px, transparent 50%)',
        }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Quiz Header */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#262626] text-[#FF6B00] text-[0.6875rem] font-bold tracking-[0.1em] uppercase mb-6 border border-[#FF6B00]/20">
              Deine kostenlose Prozessanalyse
            </span>
            <h1
              className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-4"
              style={{ fontFamily: "'Manrope', sans-serif" }}
            >
              Nur noch ein Schritt zu deiner{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B00] to-[#FF9E00]">
                automatisierten Agentur
              </span>
            </h1>
            <p className="text-[#adaaaa] text-lg max-w-xl mx-auto leading-relaxed">
              Bitte fülle das folgende kurze Formular aus, damit wir wissen, wie wir dir am besten helfen können:
            </p>
          </div>

          {/* Form Container */}
          <div className="bg-[#131313] rounded-2xl p-8 md:p-12 border border-[#484847]/10 shadow-2xl relative overflow-hidden">
            {/* Progress Bars */}
            <div className="flex gap-2 mb-10">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                    i <= currentStep ? 'bg-[#FF6B00]' : 'bg-[#262626]'
                  }`}
                />
              ))}
            </div>

            {/* Back + Step Label */}
            <div className="flex items-center gap-3 mb-6">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 text-[#adaaaa] hover:text-white hover:bg-white/10 transition-all"
                  aria-label="Zurück"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              <span className="text-xs uppercase tracking-widest font-bold text-[#FF6B00]/80">
                Schritt {currentStep + 1} von {TOTAL_STEPS}
              </span>
            </div>

            {/* Step Content */}
            <div className="space-y-6">
              {/* Step 1: Anrede + Vorname */}
              {currentStep === 0 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Wie dürfen wir dich ansprechen?
                  </h2>
                  <div className="grid grid-cols-2 gap-4">
                    <CardButton label="Herr" selected={form.anrede === 'Herr'} onClick={() => update('anrede', 'Herr')} />
                    <CardButton label="Frau" selected={form.anrede === 'Frau'} onClick={() => update('anrede', 'Frau')} />
                  </div>
                  <FormInput
                    label="Vorname"
                    value={form.vorname}
                    onChange={(v) => update('vorname', v)}
                    placeholder="Max"
                  />
                </div>
              )}

              {/* Step 2: Nachname + E-Mail */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Wie können wir dich erreichen?
                  </h2>
                  <FormInput
                    label="Nachname"
                    value={form.nachname}
                    onChange={(v) => update('nachname', v)}
                    placeholder="Mustermann"
                  />
                  <FormInput
                    label="E-Mail"
                    value={form.email}
                    onChange={(v) => update('email', v)}
                    type="email"
                    placeholder="max@agentur.de"
                  />
                </div>
              )}

              {/* Step 3: Telefon + Website */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Kontaktdaten & Website
                  </h2>
                  <FormInput
                    label="Handynummer"
                    value={form.telefon}
                    onChange={(v) => update('telefon', v)}
                    type="tel"
                    placeholder="176 12345678"
                    prefix="+49"
                  />
                  <FormInput
                    label="Website"
                    value={form.website}
                    onChange={(v) => update('website', v)}
                    type="url"
                    placeholder="https://deine-agentur.de"
                    required={false}
                  />
                </div>
              )}

              {/* Step 4: Dienstleistung */}
              {currentStep === 3 && (
                <StepCardSelect
                  title="Welche Art Dienstleistung bietest du an?"
                  options={['Marketing-Agentur', 'Recruiting-Agentur', 'Coaching/Beratung', 'Andere Dienstleistung']}
                  selected={form.dienstleistung}
                  onSelect={(v) => update('dienstleistung', v)}
                  columns={2}
                />
              )}

              {/* Step 5: Aktueller Monatsumsatz */}
              {currentStep === 4 && (
                <StepCardSelect
                  title="Wie hoch ist dein aktueller Monatsumsatz?"
                  options={['Unter 10.000 €', '10.000 - 25.000 €', '25.000 - 50.000 €', '50.000 - 100.000 €', 'Über 100.000 €']}
                  selected={form.monatsumsatz}
                  onSelect={(v) => update('monatsumsatz', v)}
                  columns={2}
                />
              )}

              {/* Step 6: Zielumsatz */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Welchen Monatsumsatz möchtest du erreichen?
                  </h2>
                  <FormInput
                    label="Zielumsatz pro Monat"
                    value={form.zielumsatz}
                    onChange={(v) => update('zielumsatz', v)}
                    placeholder="z.B. 50.000 €"
                  />
                </div>
              )}

              {/* Step 7: Größtes Problem */}
              {currentStep === 6 && (
                <StepCardSelect
                  title="Was ist gerade dein größtes Problem?"
                  options={[
                    'Zu viel manuelle Arbeit',
                    'Skalierung ohne mehr Personal',
                    'Qualität schwankt bei mehr Kunden',
                    'Zu wenig Zeit für Strategie',
                    'Kundengewinnung ist unberechenbar',
                  ]}
                  selected={form.problem}
                  onSelect={(v) => update('problem', v)}
                  columns={2}
                />
              )}

              {/* Step 8: Werbeanzeigen */}
              {currentStep === 7 && (
                <StepCardSelect
                  title="Schaltest du bereits bezahlte Werbeanzeigen?"
                  options={['Ja, regelmäßig', 'Gelegentlich', 'Nein, noch nicht']}
                  selected={form.werbeanzeigen}
                  onSelect={(v) => update('werbeanzeigen', v)}
                  columns={1}
                />
              )}

              {/* Step 9: Mitarbeiter */}
              {currentStep === 8 && (
                <StepCardSelect
                  title="Wie viele festangestellte Mitarbeiter hast du?"
                  options={['Nur ich allein', '2-5', '6-10', '11-25', '25+']}
                  selected={form.mitarbeiter}
                  onSelect={(v) => update('mitarbeiter', v)}
                  columns={2}
                />
              )}

              {/* Step 10: Investitionsbereitschaft */}
              {currentStep === 9 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Wie viel bist du bereit zu investieren?
                  </h2>
                  <FormInput
                    label="Monatliches Budget"
                    value={form.investition}
                    onChange={(v) => update('investition', v)}
                    placeholder="z.B. 3.000 - 5.000 €"
                  />
                </div>
              )}

              {/* Step 11: Motivation */}
              {currentStep === 10 && (
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold" style={{ fontFamily: "'Manrope', sans-serif" }}>
                    Warum sollten wir ausgerechnet mit dir zusammenarbeiten?
                  </h2>
                  <p className="text-[#adaaaa] text-sm leading-relaxed">
                    Wir arbeiten nur mit einer begrenzten Anzahl an Kunden gleichzeitig. Erkläre uns kurz,
                    warum du der richtige Partner für eine Zusammenarbeit mit Flowstack bist.
                  </p>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-[#a1a1aa]">
                      Deine Antwort <span className="text-[#FF6B00] ml-1">*</span>
                    </label>
                    <textarea
                      value={form.motivation}
                      onChange={(e) => update('motivation', e.target.value)}
                      rows={5}
                      placeholder="Erzähl uns kurz, warum du dich für Flowstack interessierst und was du dir von der Zusammenarbeit erhoffst..."
                      className="w-full py-4 px-5 rounded-xl bg-[#262626] border border-[#484847]/20 text-white text-sm outline-none resize-y min-h-[140px] focus:border-[#FF6B00] transition-colors"
                      style={{ fontFamily: "'Inter', sans-serif" }}
                    />
                    <span
                      className={`text-xs ${form.motivation.trim().length >= 20 ? 'text-[#4b5563]' : 'text-[#6b7280]'}`}
                    >
                      Mindestens 20 Zeichen ({form.motivation.trim().length}/20)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* CTA Button */}
            <div className="pt-6">
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className={`w-full py-5 rounded-xl text-lg font-extrabold flex items-center justify-center gap-3 transition-all ${
                  isStepValid()
                    ? 'bg-gradient-to-br from-[#FF6B00] to-[#FF9E00] text-black hover:shadow-[0_0_30px_rgba(255,107,0,0.3)] cursor-pointer'
                    : 'bg-gradient-to-br from-[#FF6B00]/30 to-[#FF9E00]/30 text-black/40 cursor-not-allowed'
                }`}
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                {isLast ? 'Bewerbung absenden' : 'Nächster Schritt'}
                <ArrowRight size={20} />
              </button>
              <p className="text-center text-[#adaaaa] text-xs mt-6 flex items-center justify-center gap-2">
                <Lock size={13} />
                Deine Daten sind 100% sicher und werden verschlüsselt übertragen.
              </p>
            </div>
          </div>

          {/* Trust Bar */}
          <div className="mt-20 flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <div className="flex items-center gap-2">
              <BadgeCheck size={24} />
              <span
                className="font-bold text-xl uppercase tracking-tighter"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Zertifizierter KI-Partner
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck size={24} />
              <span
                className="font-bold text-xl uppercase tracking-tighter"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Enterprise-Sicherheit
              </span>
            </div>
            <div className="flex items-center gap-2">
              <BarChart3 size={24} />
              <span
                className="font-bold text-xl uppercase tracking-tighter"
                style={{ fontFamily: "'Manrope', sans-serif" }}
              >
                Skalierungs-KI
              </span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#0e0e0e] w-full py-12 border-t border-[#484847]/20">
        <div className="flex flex-col items-center px-8 max-w-7xl mx-auto gap-6 text-center">
          <div className="flex gap-8">
            <a
              href="/impressum"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#adaaaa] hover:text-[#FF6B00] transition-colors text-[0.6875rem] uppercase tracking-[0.1em]"
            >
              Impressum
            </a>
            <a
              href="/datenschutz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#adaaaa] hover:text-[#FF6B00] transition-colors text-[0.6875rem] uppercase tracking-[0.1em]"
            >
              Datenschutz
            </a>
          </div>
          <p className="text-[#6b7280] text-xs max-w-[600px] leading-relaxed">
            Diese Website ist nicht Teil der Facebook-Website oder von Facebook Inc. Diese Seite ist NICHT im Auftrag
            der FACEBOOK, Inc. entstanden. FACEBOOK ist eine Marke von FACEBOOK, Inc.
          </p>
          <p className="text-[#4b5563] text-xs">&copy; 2026 Flowstack. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  );
}

/* --- Sub-Components --- */

function StepCardSelect({
  title,
  options,
  selected,
  onSelect,
  columns = 2,
}: {
  title: string;
  options: string[];
  selected: string;
  onSelect: (v: string) => void;
  columns?: number;
}) {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold" style={{ fontFamily: "'Manrope', sans-serif" }}>
        {title}
      </h2>
      <div
        className={`grid gap-4 ${
          columns === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'
        }`}
      >
        {options.map((opt) => (
          <CardButton key={opt} label={opt} selected={selected === opt} onClick={() => onSelect(opt)} />
        ))}
      </div>
    </div>
  );
}

function CardButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group flex items-center justify-between p-5 rounded-xl transition-all text-left ${
        selected
          ? 'bg-[#20201f] border-2 border-[#FF6B00]'
          : 'bg-[#1a1a1a] border border-[#484847]/20 hover:border-[#FF6B00]/50'
      }`}
      style={selected ? { boxShadow: '0 0 20px rgba(255, 107, 0, 0.15)' } : undefined}
    >
      <span className={selected ? 'font-bold' : 'font-medium'}>{label}</span>
      {selected ? (
        <CheckCircle2 size={18} className="text-[#FF6B00] flex-shrink-0" />
      ) : (
        <ChevronRight size={16} className="text-[#adaaaa] group-hover:text-[#FF6B00] transition-colors flex-shrink-0" />
      )}
    </button>
  );
}

function FormInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = true,
  prefix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  prefix?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-[#a1a1aa]">
        {label}
        {required && <span className="text-[#FF6B00] ml-1">*</span>}
      </label>
      <div className="flex">
        {prefix && (
          <span className="flex items-center px-4 bg-[#262626] border border-[#484847]/20 border-r-0 rounded-l-xl text-[#6b7280] text-sm font-medium">
            {prefix}
          </span>
        )}
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          className={`w-full py-4 px-5 bg-[#262626] border border-[#484847]/20 text-white text-sm outline-none focus:border-[#FF6B00] transition-colors ${
            prefix ? 'rounded-r-xl' : 'rounded-xl'
          }`}
          style={{ fontFamily: "'Inter', sans-serif" }}
        />
      </div>
    </div>
  );
}
