import { useState, useMemo, useLayoutEffect } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Video,
  Calendar,
  BarChart3,
  Lightbulb,
  MessageCircle,
} from 'lucide-react';

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const TIME_SLOTS = ['09:30', '10:00', '11:30', '14:00', '15:30', '16:00'];

const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

const AVATAR_URLS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBr_700kZpW0BPtlTaInrk8cd8pe_EV4hRM4Cl_yl3BZa9-T1t7O9sLq-8OMrcINttrqGwKS07yAwzwRzfUGyYXUUEnBQpzG1ypnU_HEQkiM0JWFx2BaOw9yESqp8I2iRVn3Caj4W5xQHIPz9rNEO8JsQScq-rU_pDrGQlm0_88oZKrw9JiWruT76BP8DBTL_uGb_04IwWWhb9QtbosknAOInwiS8-tEcoy9hyrwkQWR_FDcwUAhcnSTh9VDmu7FRrpoFawwMn9qFQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAAvMhSAxmbQ4eD2OJ63_TyqurYVzThr20SzWU7nwxL5HAYhVNUvMoMIbOPPoe2DewHksClueR8puZ9vPJy9RdtwWGSrKBUDcuO_VuozN00_PEUn0ZhBkPs-X8dzz1Dj817TU2PvnJgcJzFp-NCdh2-8AkVY4IkHQ4Fzl19_Xlzw71SYrRg3YktT_pwtB-A1cyZauTYIW46upMZ14UwbKAWaC_1SD63BDuz33w6pYJlD_Ew1N31pnBAYMQh0EgeBYi1Uy6YtHpPg7c',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB75KGQT1b_a4pv0GkVqfpP6bw_DgIWKRc7IRM06q0kV1JdPTO85FMF-4OFytpYVbkxRa7JM69J25UXdUGgwMbRYdkATktg56c3AxNoZGLIIRg2ca9KSiGUigPBef-tfKDbpzRC4PUuslvl-SyepKSYZqJ1mXuG_CzHN9QWjoS7bJJjrNjR0D6PpTfzLjTcNyZk9e7uNq9ylqMf3RPoIzQzS7DeOEp0H-IEouYXBtbET6Y9YRKLkUFOc-pQKFI4lSEUTix2qD43fMs',
];

function getMonthData(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  return { startDay, daysInMonth, daysInPrevMonth, monthName: MONTH_NAMES[month], year };
}

export function VslBookingPage() {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [vorname, setVorname] = useState('');
  const [nachname, setNachname] = useState('');
  const [email, setEmail] = useState('');
  const [telefon, setTelefon] = useState('');
  const [anmerkung, setAnmerkung] = useState('');

  useLayoutEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#0e0e0e';
    document.body.style.color = '#ffffff';
    document.body.style.fontFamily = "'Inter', sans-serif";
    document.body.style.margin = '0';
  }, []);

  const monthData = useMemo(
    () => getMonthData(viewYear, viewMonth),
    [viewYear, viewMonth],
  );

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear(viewYear - 1);
    } else {
      setViewMonth(viewMonth - 1);
    }
    setSelectedDay(null);
    setSelectedTime(null);
    setShowForm(false);
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear(viewYear + 1);
    } else {
      setViewMonth(viewMonth + 1);
    }
    setSelectedDay(null);
    setSelectedTime(null);
    setShowForm(false);
  };

  const isWeekend = (dayOfMonth: number) => {
    const d = new Date(viewYear, viewMonth, dayOfMonth);
    const dow = d.getDay();
    return dow === 0 || dow === 6;
  };

  const isPastDay = (dayOfMonth: number) => {
    const berlinNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
    return (
      viewYear < berlinNow.getFullYear() ||
      (viewYear === berlinNow.getFullYear() && viewMonth < berlinNow.getMonth()) ||
      (viewYear === berlinNow.getFullYear() && viewMonth === berlinNow.getMonth() && dayOfMonth < berlinNow.getDate())
    );
  };

  const calendarCells: Array<{ day: number; isCurrentMonth: boolean; isDisabled: boolean }> = [];
  for (let i = monthData.startDay - 1; i >= 0; i--) {
    calendarCells.push({ day: monthData.daysInPrevMonth - i, isCurrentMonth: false, isDisabled: true });
  }
  for (let d = 1; d <= monthData.daysInMonth; d++) {
    calendarCells.push({ day: d, isCurrentMonth: true, isDisabled: isPastDay(d) || isWeekend(d) });
  }
  const remaining = 7 - (calendarCells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      calendarCells.push({ day: d, isCurrentMonth: false, isDisabled: true });
    }
  }

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = '/danke';
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 16px',
    borderRadius: 10,
    border: '1px solid rgba(255,255,255,0.1)',
    backgroundColor: 'rgba(255,255,255,0.05)',
    color: '#fff',
    fontSize: 14,
    fontFamily: "'Inter', sans-serif",
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div className="vsl-booking" style={{ minHeight: '100vh', backgroundColor: '#0e0e0e', color: '#fff' }}>
      <style>{`
        .vsl-booking .booking-header { padding: 12px 16px; }
        .vsl-booking .booking-main { padding: 32px 16px 48px; }
        .vsl-booking .booking-headline-wrap { margin-bottom: 32px; }
        .vsl-booking .booking-left-col { gap: 24px; }
        .vsl-booking .booking-sidebar { padding: 20px; }
        .vsl-booking .booking-cal-grid { padding: 20px; }
        .vsl-booking .booking-nav-btn { width: 40px; height: 40px; }
        .vsl-booking .booking-footer-links { gap: 16px; }
        .vsl-booking .booking-social-proof { flex-direction: column; text-align: center; }
        @media (min-width: 768px) {
          .vsl-booking .booking-header { padding: 16px 24px; }
          .vsl-booking .booking-main { padding: 48px 24px 80px; }
          .vsl-booking .booking-headline-wrap { margin-bottom: 48px; }
          .vsl-booking .booking-left-col { gap: 32px; }
          .vsl-booking .booking-sidebar { padding: 28px; }
          .vsl-booking .booking-cal-grid { padding: 28px; }
          .vsl-booking .booking-nav-btn { width: 32px; height: 32px; }
          .vsl-booking .booking-footer-links { gap: 24px; }
          .vsl-booking .booking-social-proof { flex-direction: row; text-align: left; }
        }
      `}</style>
      {/* Progress Bar */}
      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, height: 4, backgroundColor: 'rgba(255,255,255,0.05)' }}>
        <div style={{ height: '100%', width: '75%', backgroundColor: '#FF6B00', borderRadius: '0 2px 2px 0' }} />
      </div>

      {/* Header */}
      <header className="booking-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.03em', fontFamily: "'Manrope', sans-serif", color: '#fff' }}>
            Flowstack
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: '#ffffff', fontFamily: "'Inter', sans-serif" }}>
            Termin
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="booking-main" style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Headline */}
        <div className="booking-headline-wrap" style={{ textAlign: 'center' }}>
          <h1 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 16, color: '#fff' }}>
            Vielen Dank für deine Bewerbung!
          </h1>
          <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 16, color: '#9ca3af', maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
            Buche bitte jetzt noch hier unten deinen Termin für ein kurzes Vorgespräch und die Bewerbung auf das persönliche kostenlose Erstgespräch, in dem du dir einen neuen Termin aussuchst.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 40 }} className="booking-grid">
          <style>{`
            @media (min-width: 1024px) {
              .booking-grid {
                grid-template-columns: 5fr 7fr !important;
              }
            }
          `}</style>

          {/* Left Column */}
          <div className="booking-left-col" style={{ display: 'flex', flexDirection: 'column' }}>
            {/* What to expect */}
            <div>
              <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 24 }}>
                Was dich im Gespräch erwartet:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { icon: <BarChart3 size={20} style={{ color: '#FF6B00' }} />, title: 'Status-Quo Analyse', desc: 'Wir werfen einen detaillierten Blick auf deine bestehende Infrastruktur und identifizieren Engpässe.' },
                  { icon: <Lightbulb size={20} style={{ color: '#FF6B00' }} />, title: 'Maßgeschneiderte Roadmap', desc: 'Du erhältst einen konkreten Plan, wie KI deine Effizienz um bis zu 40% steigern kann.' },
                  { icon: <MessageCircle size={20} style={{ color: '#FF6B00' }} />, title: 'Q&A Session', desc: 'Stelle alle deine Fragen direkt und erhalte sofort umsetzbare Antworten.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(148,170,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700, fontSize: 15, color: '#fff', marginBottom: 4 }}>{item.title}</h4>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#9ca3af', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof */}
            <div className="booking-social-proof" style={{ padding: 20, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ display: 'flex' }}>
                {AVATAR_URLS.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt=""
                    style={{ width: 36, height: 36, borderRadius: '50%', objectFit: 'cover', border: '2px solid #0e0e0e', marginLeft: i > 0 ? -10 : 0 }}
                  />
                ))}
              </div>
              <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 600, color: '#d1d5db', margin: 0 }}>
                Über 200 Unternehmen haben bereits gebucht.
              </p>
            </div>
          </div>

          {/* Right Column: Calendar Widget */}
          <div style={{
            borderRadius: 24,
            overflow: 'hidden',
            background: 'rgba(26,26,26,0.6)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255,255,255,0.06)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.4)',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }} className="calendar-widget">
              <style>{`
                @media (min-width: 768px) {
                  .calendar-widget {
                    flex-direction: row !important;
                  }
                  .calendar-sidebar {
                    border-bottom: none !important;
                    border-right: 1px solid rgba(255,255,255,0.06) !important;
                    width: 220px !important;
                  }
                }
              `}</style>

              {/* Mini Sidebar */}
              <div className="calendar-sidebar booking-sidebar" style={{ backgroundColor: 'rgba(255,255,255,0.02)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: '50%', backgroundColor: 'rgba(148,170,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Calendar size={20} style={{ color: '#FF6B00' }} />
                  </div>
                  <div>
                    <p style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: '#6b7280', fontFamily: "'Inter', sans-serif", margin: 0, marginBottom: 4 }}>Flowstack</p>
                    <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', margin: 0 }}>Prozessanalyse-Session</h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#9ca3af' }}>
                      <Clock size={16} />
                      <span style={{ fontFamily: "'Inter', sans-serif" }}>30 Min.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#9ca3af' }}>
                      <Video size={16} />
                      <span style={{ fontFamily: "'Inter', sans-serif" }}>Google Meet / Zoom</span>
                    </div>
                  </div>
                  <p style={{ fontSize: 12, color: '#6b7280', fontFamily: "'Inter', sans-serif", fontStyle: 'italic', margin: 0 }}>
                    Kostenlos für Neukunden.
                  </p>
                </div>
              </div>

              {/* Calendar Grid */}
              <div className="booking-cal-grid" style={{ flex: 1, backgroundColor: '#0e0e0e' }}>
                {/* Month Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
                  <h3 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 17, fontWeight: 700, color: '#fff', margin: 0 }}>
                    {monthData.monthName} {monthData.year}
                  </h3>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={handlePrevMonth} className="booking-nav-btn" style={{ borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ChevronLeft size={16} style={{ color: '#fff' }} />
                    </button>
                    <button onClick={handleNextMonth} className="booking-nav-btn" style={{ borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.05)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <ChevronRight size={16} style={{ color: '#fff' }} />
                    </button>
                  </div>
                </div>

                {/* Weekday Headers */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4, textAlign: 'center', marginBottom: 8 }}>
                  {WEEKDAYS.map((day) => (
                    <div key={day} style={{ fontSize: 11, fontWeight: 600, color: '#6b7280', fontFamily: "'Inter', sans-serif", padding: '4px 0' }}>
                      {day}
                    </div>
                  ))}
                </div>

                {/* Day Cells */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                  {calendarCells.map((cell, i) => {
                    if (!cell.isCurrentMonth) {
                      return (
                        <div key={`pad-${i}`} style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'rgba(255,255,255,0.1)' }}>
                          {cell.day}
                        </div>
                      );
                    }

                    const isSelected = selectedDay === cell.day;

                    if (cell.isDisabled) {
                      return (
                        <div key={`day-${cell.day}`} style={{ aspectRatio: '1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: 'rgba(255,255,255,0.15)' }}>
                          {cell.day}
                        </div>
                      );
                    }

                    return (
                      <button
                        key={`day-${cell.day}`}
                        onClick={() => { setSelectedDay(cell.day); setSelectedTime(null); setShowForm(false); }}
                        style={{
                          aspectRatio: '1',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: 13,
                          fontWeight: isSelected ? 700 : 500,
                          backgroundColor: isSelected ? '#FF6B00' : 'transparent',
                          color: isSelected ? '#000' : '#fff',
                          border: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.15s',
                          boxShadow: isSelected ? '0 0 20px rgba(148,170,255,0.4)' : 'none',
                        }}
                      >
                        {cell.day}
                      </button>
                    );
                  })}
                </div>

                {/* Time Slots */}
                {selectedDay && !showForm && (
                  <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <h4 style={{ fontFamily: "'Manrope', sans-serif", fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 16 }}>
                      Verfügbare Zeiten für den {selectedDay}. {monthData.monthName}
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10 }} className="time-grid">
                      <style>{`
                        @media (max-width: 480px) {
                          .time-grid { grid-template-columns: repeat(2, 1fr) !important; }
                        }
                      `}</style>
                      {TIME_SLOTS.map((time) => {
                        const isTimeSelected = selectedTime === time;
                        return (
                          <button
                            key={time}
                            onClick={() => handleTimeSelect(time)}
                            style={{
                              padding: '10px 0',
                              borderRadius: 10,
                              fontSize: 14,
                              fontWeight: 600,
                              fontFamily: "'Inter', sans-serif",
                              backgroundColor: isTimeSelected ? 'rgba(148,170,255,0.15)' : 'rgba(255,255,255,0.05)',
                              color: isTimeSelected ? '#FF6B00' : '#fff',
                              border: isTimeSelected ? '1px solid rgba(148,170,255,0.2)' : '1px solid rgba(255,255,255,0.08)',
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                            }}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Booking Form */}
                {showForm && selectedDay && selectedTime && (
                  <div style={{ marginTop: 28, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: '#FF6B00', fontWeight: 600, marginBottom: 20 }}>
                      {selectedDay}. {monthData.monthName} {viewYear} um {selectedTime} Uhr
                    </p>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }} className="form-name-grid">
                        <style>{`
                          @media (max-width: 480px) {
                            .form-name-grid { grid-template-columns: 1fr !important; }
                          }
                        `}</style>
                        <input
                          type="text"
                          placeholder="Vorname *"
                          required
                          value={vorname}
                          onChange={(e) => setVorname(e.target.value)}
                          style={inputStyle}
                        />
                        <input
                          type="text"
                          placeholder="Nachname *"
                          required
                          value={nachname}
                          onChange={(e) => setNachname(e.target.value)}
                          style={inputStyle}
                        />
                      </div>
                      <input
                        type="email"
                        placeholder="E-Mail *"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={inputStyle}
                      />
                      <input
                        type="tel"
                        placeholder="Handynummer *"
                        required
                        value={telefon}
                        onChange={(e) => setTelefon(e.target.value)}
                        style={inputStyle}
                      />
                      <textarea
                        placeholder="Anmerkung (optional)"
                        value={anmerkung}
                        onChange={(e) => setAnmerkung(e.target.value)}
                        rows={3}
                        style={{ ...inputStyle, resize: 'vertical' }}
                      />
                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '14px 24px',
                          borderRadius: 12,
                          border: 'none',
                          background: 'linear-gradient(to bottom right, #FF6B00, #FF9E00)',
                          color: '#000',
                          fontSize: 14,
                          fontWeight: 700,
                          fontFamily: "'Manrope', sans-serif",
                          cursor: 'pointer',
                          transition: 'all 0.2s',
                          boxShadow: '0 0 30px rgba(255,107,0,0.25)',
                          marginTop: 4,
                        }}
                      >
                        Kostenlosen 30-Min Prozessanalyse-Termin sichern
                      </button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <p style={{ textAlign: 'center', marginTop: 20, fontSize: 12, color: '#6b7280', fontFamily: "'Inter', sans-serif" }}>
          Zeitzone: Europe/Berlin
        </p>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '24px', background: '#0e0e0e' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16, textAlign: 'center' }}>
          <div className="booking-footer-links" style={{ display: 'flex', fontSize: 12, color: '#6b7280' }}>
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
