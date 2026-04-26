import { useState, useLayoutEffect, type ReactNode } from 'react'
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ShieldCheck,
  BadgeCheck,
  BarChart3,
  ChevronRight,
} from 'lucide-react'

export type FormTheme = {
  bg: string
  card: string
  surfaceIdle: string
  surfaceActive: string
  text: string
  textMuted: string
  accent: string
  accentStrong: string
  accentText: string
  border: string
  borderMuted: string
  font: string
}

export type FormFieldInput = {
  kind: 'input'
  id: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'url'
  placeholder?: string
  required?: boolean
  validate?: (value: string) => boolean
}

export type FormFieldTextarea = {
  kind: 'textarea'
  id: string
  label: string
  placeholder?: string
  minLength?: number
  required?: boolean
  hint?: string
}

export type FormFieldCards = {
  kind: 'cards'
  id: string
  options: string[]
  columns?: 1 | 2
  required?: boolean
}

export type FormFieldConsent = {
  kind: 'consent'
  id: string
  label: ReactNode
  required?: boolean
}

export type FormField = FormFieldInput | FormFieldTextarea | FormFieldCards | FormFieldConsent

export type FormStep = {
  id: string
  title: string
  subtitle?: string
  fields: FormField[]
}

export type ApplicationFormProps = {
  steps: FormStep[]
  theme: FormTheme
  submitEndpoint?: string
  submitAction?: string
  header: {
    logoMain: string
    logoAccent: string
    label: string
  }
  hero: {
    badge: string
    title: ReactNode
    subtitle: string
  }
  trust?: Array<{ icon: 'shield' | 'badge' | 'chart'; label: string }>
  ctaLabel?: string
  ctaSubmittingLabel?: string
  ctaFinalLabel?: string
  onSubmit?: (data: Record<string, string>) => void
  onSuccess?: (data: Record<string, string>) => void
  redirectTo?: (data: Record<string, string>) => string
  footerText?: string
  analyticsEvent?: string
}

function validateField(field: FormField, value: string): boolean {
  if (field.kind === 'consent') {
    return field.required ? value === 'ja' : true
  }
  if (field.kind === 'cards') {
    return field.required !== false ? value.trim().length > 0 : true
  }
  if (field.kind === 'textarea') {
    if (field.required === false) return true
    const min = field.minLength ?? 1
    return value.trim().length >= min
  }
  if (field.kind === 'input') {
    if (field.required === false) return true
    if (field.type === 'email') return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
    if (field.type === 'tel') return value.replace(/\D/g, '').length >= 4
    if (field.validate) return field.validate(value)
    return value.trim().length > 0
  }
  return true
}

function getInitialData(steps: FormStep[]): Record<string, string> {
  const data: Record<string, string> = {}
  for (const step of steps) {
    for (const field of step.fields) {
      data[field.id] = ''
    }
  }
  return data
}

export function ApplicationForm({
  steps,
  theme,
  submitEndpoint,
  submitAction,
  header,
  hero,
  trust,
  ctaLabel = 'Nächster Schritt',
  ctaSubmittingLabel = 'Wird gesendet...',
  ctaFinalLabel = 'Bewerbung absenden',
  onSubmit,
  onSuccess,
  redirectTo,
  footerText,
  analyticsEvent,
}: ApplicationFormProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [data, setData] = useState<Record<string, string>>(() => getInitialData(steps))
  const [submitting, setSubmitting] = useState(false)

  useLayoutEffect(() => {
    document.documentElement.classList.add('dark')
    document.body.style.backgroundColor = theme.bg
    document.body.style.color = theme.text
    document.body.style.fontFamily = theme.font
    return () => {
      document.documentElement.classList.remove('dark')
      document.body.style.backgroundColor = ''
      document.body.style.color = ''
      document.body.style.fontFamily = ''
    }
  }, [theme])

  const update = (fieldId: string, value: string) => {
    setData(prev => ({ ...prev, [fieldId]: value }))
  }

  const currentStepDef = steps[currentStep]
  const totalSteps = steps.length

  const isStepValid = (): boolean => {
    if (!currentStepDef) return false
    return currentStepDef.fields.every(field => validateField(field, data[field.id] ?? ''))
  }

  const isLast = currentStep === totalSteps - 1

  const handleNext = async () => {
    if (!isStepValid()) return
    if (!isLast) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    if (submitting) return
    setSubmitting(true)

    try {
      if (submitEndpoint) {
        const url = submitAction ? `${submitEndpoint}?action=${submitAction}` : submitEndpoint
        await fetch(url, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        })
      }
    } catch {
      // silent — no-cors anyway
    }

    if (analyticsEvent) {
      window.dataLayer = window.dataLayer || []
      window.dataLayer.push({ event: analyticsEvent, email: data.email ?? '' })
      if (typeof window.umami !== 'undefined') window.umami.track(analyticsEvent)
    }

    if (onSubmit) onSubmit(data)
    if (onSuccess) onSuccess(data)

    if (redirectTo) {
      window.location.href = redirectTo(data)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1)
  }

  const renderField = (field: FormField) => {
    const value = data[field.id] ?? ''
    if (field.kind === 'input') {
      return (
        <FormInput
          key={field.id}
          label={field.label}
          value={value}
          type={field.type ?? 'text'}
          placeholder={field.placeholder}
          required={field.required !== false}
          theme={theme}
          onChange={v => update(field.id, v)}
        />
      )
    }
    if (field.kind === 'textarea') {
      const count = value.trim().length
      const min = field.minLength ?? 0
      return (
        <div key={field.id} className="flex flex-col gap-1.5">
          <label style={{ fontSize: '12px', fontWeight: 800, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            {field.label}
            {field.required !== false && <span style={{ color: theme.accent, marginLeft: '4px' }}>*</span>}
          </label>
          <textarea
            value={value}
            onChange={e => update(field.id, e.target.value)}
            rows={5}
            placeholder={field.placeholder}
            className="w-full outline-none resize-y"
            style={{
              padding: '16px 0',
              background: 'transparent',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              borderBottom: `1px solid ${theme.border}`,
              color: theme.text,
              fontSize: '16px',
              fontWeight: 500,
              fontFamily: theme.font,
              minHeight: '140px',
              transition: 'border-color 0.2s',
            }}
            onFocus={e => { e.target.style.borderBottom = `2px solid ${theme.accent}` }}
            onBlur={e => { e.target.style.borderBottom = `1px solid ${theme.border}` }}
          />
          {min > 0 && (
            <span style={{ fontSize: '12px', color: count >= min ? theme.textMuted : theme.border }}>
              Mindestens {min} Zeichen ({count}/{min})
            </span>
          )}
          {field.hint && (
            <span style={{ fontSize: '13px', color: theme.textMuted, fontWeight: 500, lineHeight: 1.6 }}>{field.hint}</span>
          )}
        </div>
      )
    }
    if (field.kind === 'cards') {
      const columns = field.columns ?? 2
      return (
        <div key={field.id} className={`grid gap-4 ${columns === 1 ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2'}`}>
          {field.options.map(opt => (
            <CardButton
              key={opt}
              label={opt}
              selected={value === opt}
              theme={theme}
              onClick={() => update(field.id, opt)}
            />
          ))}
        </div>
      )
    }
    if (field.kind === 'consent') {
      return (
        <label key={field.id} style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={value === 'ja'}
            onChange={e => update(field.id, e.target.checked ? 'ja' : '')}
            style={{ marginTop: 4, accentColor: theme.accentStrong, width: 18, height: 18, flexShrink: 0 }}
          />
          <span style={{ fontSize: 13, color: theme.textMuted, lineHeight: 1.5 }}>
            {field.label}
            {field.required !== false && ' *'}
          </span>
        </label>
      )
    }
    return null
  }

  if (!currentStepDef) return null

  const consentFields = currentStepDef.fields.filter(f => f.kind === 'consent')
  const nonConsentFields = currentStepDef.fields.filter(f => f.kind !== 'consent')

  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{ backgroundColor: theme.bg, color: theme.text, fontFamily: theme.font }}
    >
      <style>{`
        .apply-header-label { display: none; }
        @media (min-width: 768px) {
          .apply-header-label { display: block; }
        }
      `}</style>

      <nav
        className="fixed top-0 w-full z-50 pt-safe"
        style={{
          background: 'rgba(42,44,46,0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div className="flex justify-between items-center px-4 md:px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center">
            <span style={{ fontFamily: theme.font, fontSize: 20, fontWeight: 800, letterSpacing: '-0.02em', color: theme.text }}>
              {header.logoMain}<span style={{ color: theme.accent }}>{header.logoAccent}</span>
            </span>
          </div>
          <span
            className="apply-header-label"
            style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: theme.text }}
          >
            {header.label}
          </span>
        </div>
      </nav>

      <main
        className="min-h-dvh pt-32 pb-20 px-4"
        style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, ${theme.accent}0D 0%, transparent 60%)`,
        }}
      >
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span
              className="inline-block px-4 py-1.5 mb-6"
              style={{
                backgroundColor: theme.surfaceIdle,
                color: theme.accent,
                fontSize: '12px',
                fontWeight: 800,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                borderRadius: '8px',
              }}
            >
              {hero.badge}
            </span>
            <h1 className="text-4xl md:text-5xl tracking-tighter mb-4" style={{ fontWeight: 800, color: theme.text }}>
              {hero.title}
            </h1>
            <p className="text-lg max-w-xl mx-auto leading-relaxed" style={{ color: theme.textMuted, fontWeight: 500 }}>
              {hero.subtitle}
            </p>
          </div>

          <div
            className="p-5 md:p-12 relative overflow-hidden"
            style={{
              backgroundColor: theme.card,
              borderRadius: '8px',
              boxShadow: `0 20px 40px ${theme.accent}0A`,
            }}
          >
            <div className="flex gap-1 md:gap-2 mb-10">
              {Array.from({ length: totalSteps }).map((_, i) => (
                <div
                  key={i}
                  className="h-1.5 flex-1 transition-colors duration-300"
                  style={{
                    backgroundColor: i <= currentStep ? theme.accentStrong : theme.surfaceActive,
                    borderRadius: '4px',
                  }}
                />
              ))}
            </div>

            <div className="flex items-center gap-3 mb-6">
              {currentStep > 0 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center justify-center w-11 h-11 transition-all"
                  style={{ backgroundColor: theme.surfaceActive, color: theme.textMuted, borderRadius: '4px' }}
                  aria-label="Zurück"
                >
                  <ArrowLeft size={16} />
                </button>
              )}
              <span
                style={{
                  fontSize: '12px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 800,
                  color: theme.accent,
                }}
              >
                Schritt {currentStep + 1} von {totalSteps}
              </span>
            </div>

            <div className="space-y-6" style={{ minHeight: 280 }}>
              <h2 className="text-2xl" style={{ fontWeight: 800, color: theme.text }}>
                {currentStepDef.title}
              </h2>
              {currentStepDef.subtitle && (
                <p style={{ color: theme.textMuted, fontSize: '14px', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
                  {currentStepDef.subtitle}
                </p>
              )}
              {nonConsentFields.map(renderField)}
              {consentFields.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
                  {consentFields.map(renderField)}
                </div>
              )}
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid() || (isLast && submitting)}
                className="w-full py-5 text-lg flex items-center justify-center gap-3 transition-all"
                style={{
                  background: isStepValid()
                    ? `linear-gradient(135deg, ${theme.accent}, ${theme.accentStrong})`
                    : `linear-gradient(135deg, ${theme.accent}4D, ${theme.accentStrong}4D)`,
                  color: isStepValid() ? theme.accentText : `${theme.accentText}80`,
                  fontWeight: 800,
                  borderRadius: '4px',
                  cursor: isStepValid() ? 'pointer' : 'not-allowed',
                }}
              >
                {isLast ? (submitting ? ctaSubmittingLabel : ctaFinalLabel) : ctaLabel}
                <ArrowRight size={20} />
              </button>
              <div className="mt-6 flex items-center justify-center gap-3">
                <ShieldCheck size={18} style={{ color: theme.accent, flexShrink: 0 }} />
                <p style={{ fontSize: 13, margin: 0, fontWeight: 500, color: theme.text }}>
                  Deine Daten sind 100% sicher und werden verschlüsselt übertragen.
                </p>
              </div>
            </div>
          </div>

          {trust && trust.length > 0 && (
            <div className="mt-20 flex flex-wrap justify-center items-center gap-6 md:gap-12 transition-all duration-700">
              {trust.map((item, i) => (
                <div key={i} className="flex items-center gap-2">
                  {item.icon === 'badge' && <BadgeCheck size={24} style={{ color: theme.accent }} />}
                  {item.icon === 'shield' && <ShieldCheck size={24} style={{ color: theme.accent }} />}
                  {item.icon === 'chart' && <BarChart3 size={24} style={{ color: theme.accent }} />}
                  <span
                    className="text-sm md:text-xl uppercase tracking-tighter"
                    style={{ fontWeight: 800, color: theme.textMuted }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <footer style={{ padding: '32px 24px', background: theme.bg }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 24, fontSize: 12, color: theme.textMuted }}>
            <a href="/impressum" target="_blank" rel="noopener noreferrer" style={{ color: theme.textMuted, textDecoration: 'none' }}>Impressum</a>
            <a href="/datenschutz" target="_blank" rel="noopener noreferrer" style={{ color: theme.textMuted, textDecoration: 'none' }}>Datenschutz</a>
            <a href="/agb" target="_blank" rel="noopener noreferrer" style={{ color: theme.textMuted, textDecoration: 'none' }}>AGB</a>
          </div>
          {footerText && (
            <p style={{ fontSize: 11, color: theme.border, maxWidth: 600, lineHeight: 1.5, fontWeight: 500 }}>{footerText}</p>
          )}
          <p style={{ fontSize: 11, color: theme.border, fontWeight: 500 }}>&copy; 2026 Flowstack. Alle Rechte vorbehalten.</p>
        </div>
      </footer>
    </div>
  )
}

function CardButton({
  label,
  selected,
  theme,
  onClick,
}: {
  label: string
  selected: boolean
  theme: FormTheme
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex items-center justify-between p-5 transition-all text-left"
      style={{
        backgroundColor: selected ? theme.surfaceActive : theme.surfaceIdle,
        border: selected ? `1px solid ${theme.accentStrong}` : `1px solid ${theme.borderMuted}`,
        borderRadius: '8px',
        boxShadow: selected ? `0 0 15px ${theme.accentStrong}26` : 'none',
      }}
      onMouseEnter={e => {
        if (!selected) e.currentTarget.style.boxShadow = `0 0 10px ${theme.accentStrong}14`
      }}
      onMouseLeave={e => {
        if (!selected) e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <span style={{ fontWeight: selected ? 800 : 500, color: theme.text }}>{label}</span>
      {selected ? (
        <CheckCircle2 size={18} style={{ color: theme.accent, flexShrink: 0 }} />
      ) : (
        <ChevronRight size={16} style={{ color: theme.border, flexShrink: 0 }} />
      )}
    </button>
  )
}

function FormInput({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  required = true,
  theme,
}: {
  label: string
  value: string
  onChange: (v: string) => void
  type?: string
  placeholder?: string
  required?: boolean
  theme: FormTheme
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label style={{ fontSize: '12px', fontWeight: 800, color: theme.textMuted, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
        {required && <span style={{ color: theme.accent, marginLeft: '4px' }}>*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        className="w-full outline-none"
        style={{
          padding: '16px 0',
          background: 'transparent',
          borderTop: 'none',
          borderLeft: 'none',
          borderRight: 'none',
          borderBottom: `1px solid ${theme.border}`,
          color: theme.text,
          fontSize: '16px',
          fontWeight: 500,
          fontFamily: theme.font,
          transition: 'border-color 0.2s',
        }}
        onFocus={e => { e.target.style.borderBottom = `2px solid ${theme.accent}` }}
        onBlur={e => { e.target.style.borderBottom = `1px solid ${theme.border}` }}
      />
    </div>
  )
}
