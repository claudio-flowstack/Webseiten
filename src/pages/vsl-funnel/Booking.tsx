import { useState, useEffect, useMemo, useLayoutEffect, useCallback } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock,
  Phone,
  Calendar,
  BarChart3,
  Lightbulb,
  MessageCircle,
  ArrowLeft,
  Loader2,
} from 'lucide-react';

const WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxAtxD5g4byY-SD5tuCV79d5k6UL9FEVVIguEiJd_AuBrhukRPCQVzvjSeMeuGGoNn1/exec';

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];

// 8:00 - 17:30 deutsche Zeit (letzter Slot 17:30 = Termin endet 18:00)
const ALL_SLOTS = [
  '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
  '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
  '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
  '17:00', '17:30',
];

const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

const AVATAR_URLS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBr_700kZpW0BPtlTaInrk8cd8pe_EV4hRM4Cl_yl3BZa9-T1t7O9sLq-8OMrcINttrqGwKS07yAwzwRzfUGyYXUUEnBQpzG1ypnU_HEQkiM0JWFx2BaOw9yESqp8I2iRVn3Caj4W5xQHIPz9rNEO8JsQScq-rU_pDrGQlm0_88oZKrw9JiWruT76BP8DBTL_uGb_04IwWWhb9QtbosknAOInwiS8-tEcoy9hyrwkQWR_FDcwUAhcnSTh9VDmu7FRrpoFawwMn9qFQ',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAAvMhSAxmbQ4eD2OJ63_TyqurYVzThr20SzWU7nwxL5HAYhVNUvMoMIbOPPoe2DewHksClueR8puZ9vPJy9RdtwWGSrKBUDcuO_VuozN00_PEUn0ZhBkPs-X8dzz1Dj817TU2PvnJgcJzFp-NCdh2-8AkVY4IkHQ4Fzl19_Xlzw71SYrRg3YktT_pwtB-A1cyZauTYIW46upMZ14UwbKAWaC_1SD63BDuz33w6pYJlD_Ew1N31pnBAYMQh0EgeBYi1Uy6YtHpPg7c',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuB75KGQT1b_a4pv0GkVqfpP6bw_DgIWKRc7IRM06q0kV1JdPTO85FMF-4OFytpYVbkxRa7JM69J25UXdUGgwMbRYdkATktg56c3AxNoZGLIIRg2ca9KSiGUigPBef-tfKDbpzRC4PUuslvl-SyepKSYZqJ1mXuG_CzHN9QWjoS7bJJjrNjR0D6PpTfzLjTcNyZk9e7uNq9ylqMf3RPoIzQzS7DeOEp0H-IEouYXBtbET6Y9YRKLkUFOc-pQKFI4lSEUTix2qD43fMs',
];

interface BusySlot {
  date: string;
  times: string[];
}

function getMonthData(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();

  return { startDay, daysInMonth, daysInPrevMonth, monthName: MONTH_NAMES[month], year };
}

/** Add minutes to a "HH:MM" string and return "HH:MM" */
function addMinutes(time: string, mins: number): string {
  const [h, m] = time.split(':').map(Number);
  const total = h * 60 + m + mins;
  return String(Math.floor(total / 60)).padStart(2, '0') + ':' + String(total % 60).padStart(2, '0');
}

function getAvailableSlots(dateStr: string, busySlots: BusySlot[]): string[] {
  const entry = busySlots.find((b) => b.date === dateStr);
  const busyTimes = entry ? entry.times : [];

  return ALL_SLOTS.filter((slot) => {
    // Termin = 30 Min + 15 Min Puffer = 45 Min blockiert
    const slotStart = slot;
    const slotEnd = addMinutes(slot, 45); // 30 Min Termin + 15 Min Puffer

    for (const busy of busyTimes) {
      // Slot ist blockiert wenn ein busy Event irgendwo im 45-Min-Fenster liegt
      if (busy >= slotStart && busy < slotEnd) return false;
      // Auch blockiert wenn ein vorheriger Termin + Puffer in diesen Slot ragt
      const busyEnd = addMinutes(busy, 45);
      if (busyEnd > slotStart && busy < slotEnd) return false;
    }
    return true;
  });
}

export function Booking() {
  const now = new Date();
  const [viewYear, setViewYear] = useState(now.getFullYear());
  const [viewMonth, setViewMonth] = useState(now.getMonth());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<'calendar' | 'form'>('calendar');
  const [busySlots, setBusySlots] = useState<BusySlot[]>([]);
  const [loading, setLoading] = useState(false);
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  // URL-Parameter auslesen (vorausfüllen aus vorherigen Steps)
  const urlParams = useMemo(() => new URLSearchParams(window.location.search), []);
  const [vorname, setVorname] = useState(urlParams.get('vorname') || '');
  const [nachname, setNachname] = useState(urlParams.get('nachname') || '');
  const [email, setEmail] = useState(urlParams.get('email') || '');
  const [telefon, setTelefon] = useState(urlParams.get('telefon') || '');
  const [anmerkung, setAnmerkung] = useState('');
  const [timezone, setTimezone] = useState('Europe/Berlin');
  const [tzOpen, setTzOpen] = useState(false);

  const TIMEZONES = [
    { value: 'Europe/Berlin', label: 'Berlin (MEZ)', flag: '🇩🇪' },
    { value: 'Europe/Vienna', label: 'Wien (MEZ)', flag: '🇦🇹' },
    { value: 'Europe/Zurich', label: 'Zürich (MEZ)', flag: '🇨🇭' },
    { value: 'Europe/London', label: 'London (GMT)', flag: '🇬🇧' },
    { value: 'America/New_York', label: 'New York (EST)', flag: '🇺🇸' },
    { value: 'America/Los_Angeles', label: 'Los Angeles (PST)', flag: '🇺🇸' },
    { value: 'Asia/Bangkok', label: 'Bangkok (ICT)', flag: '🇹🇭' },
    { value: 'Asia/Dubai', label: 'Dubai (GST)', flag: '🇦🇪' },
    { value: 'Asia/Tokyo', label: 'Tokyo (JST)', flag: '🇯🇵' },
    { value: 'Australia/Sydney', label: 'Sydney (AEST)', flag: '🇦🇺' },
  ];
  const activeTz = TIMEZONES.find(t => t.value === timezone) || TIMEZONES[0];

  useLayoutEffect(() => {
    document.documentElement.classList.add('dark');
    document.body.style.backgroundColor = '#111415';
    document.body.style.color = '#f6f6f7';
    document.body.style.fontFamily = "'Manrope', sans-serif";
    document.body.style.margin = '0';
    return () => {
      document.documentElement.classList.remove('dark');
      document.body.style.backgroundColor = '';
      document.body.style.color = '';
      document.body.style.fontFamily = '';
    };
  }, []);

  const fetchBusySlots = useCallback(async (year: number, month: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        WEBHOOK_URL + '?action=freebusy&month=' + year + '-' + String(month + 1).padStart(2, '0'),
      );
      const data = await res.json();
      if (data.success) {
        setBusySlots(data.busySlots);
      }
    } catch {
      // Silently fail, all slots remain available
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBusySlots(viewYear, viewMonth);
  }, [viewYear, viewMonth, fetchBusySlots]);

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
    setStep('calendar');
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
    setStep('calendar');
  };

  const isWeekend = (dayOfMonth: number) => {
    const d = new Date(viewYear, viewMonth, dayOfMonth);
    const dow = d.getDay();
    return dow === 0 || dow === 6;
  };

  const isPastDay = (dayOfMonth: number) => {
    const berlinNow = new Date(new Date().toLocaleString('en-US', { timeZone: 'Europe/Berlin' }));
    const cellDate = new Date(viewYear, viewMonth, dayOfMonth);
    const today = new Date(berlinNow.getFullYear(), berlinNow.getMonth(), berlinNow.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // Frühester Termin: morgen
    const maxDate = new Date(tomorrow);
    maxDate.setDate(maxDate.getDate() + 6); // 7 Tage ab morgen
    return cellDate < tomorrow || cellDate > maxDate;
  };

  const isFullyBooked = useCallback(
    (dayOfMonth: number) => {
      const dateStr =
        viewYear +
        '-' +
        String(viewMonth + 1).padStart(2, '0') +
        '-' +
        String(dayOfMonth).padStart(2, '0');
      return getAvailableSlots(dateStr, busySlots).length === 0;
    },
    [viewYear, viewMonth, busySlots],
  );

  const calendarCells: Array<{ day: number; isCurrentMonth: boolean; isDisabled: boolean }> = [];
  for (let i = monthData.startDay - 1; i >= 0; i--) {
    calendarCells.push({ day: monthData.daysInPrevMonth - i, isCurrentMonth: false, isDisabled: true });
  }
  for (let d = 1; d <= monthData.daysInMonth; d++) {
    calendarCells.push({
      day: d,
      isCurrentMonth: true,
      isDisabled: isPastDay(d) || isWeekend(d) || isFullyBooked(d),
    });
  }
  const remaining = 7 - (calendarCells.length % 7);
  if (remaining < 7) {
    for (let d = 1; d <= remaining; d++) {
      calendarCells.push({ day: d, isCurrentMonth: false, isDisabled: true });
    }
  }

  const selectedDateStr = selectedDay
    ? viewYear +
      '-' +
      String(viewMonth + 1).padStart(2, '0') +
      '-' +
      String(selectedDay).padStart(2, '0')
    : '';

  const availableSlots = useMemo(() => {
    if (!selectedDateStr) return [];
    return getAvailableSlots(selectedDateStr, busySlots);
  }, [selectedDateStr, busySlots]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingSubmitted) return;
    setBookingSubmitted(true);

    // Fire and forget
    fetch(WEBHOOK_URL + '?action=termin', {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        vorname,
        nachname,
        email,
        telefon,
        anmerkung,
        datum: selectedDateStr,
        zeit: selectedTime,
        timezone,
      }),
    }).catch(() => {});

    // GTM + Umami Events
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: 'vsl_termin', email });
    if (typeof window.umami !== 'undefined') window.umami.track('vsl_termin');

    setTimeout(() => {
      window.location.href = '/danke';
    }, 500);
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 0',
    borderRadius: 0,
    border: 'none',
    borderBottom: '1px solid #464849',
    backgroundColor: 'transparent',
    color: '#f6f6f7',
    fontSize: 14,
    fontFamily: "'Manrope', sans-serif",
    fontWeight: 500,
    outline: 'none',
    transition: 'border-color 0.2s',
  };

  return (
    <div
      className="vsl-booking"
      style={{
        minHeight: '100vh',
        backgroundColor: '#111415',
        backgroundImage: 'radial-gradient(ellipse at 20% 50%, rgba(0,241,254,0.03) 0%, transparent 60%)',
        color: '#f6f6f7',
      }}
    >
      <style>{`
        .vsl-booking .booking-header { padding: 12px 16px; }
        .vsl-booking .booking-main { padding: 32px 16px 48px; }
        .vsl-booking .booking-headline-wrap { margin-bottom: 32px; }
        .vsl-booking .booking-left-col { gap: 24px; }
        .vsl-booking .booking-sidebar { padding: 20px; }
        .vsl-booking .booking-cal-grid { padding: 20px; }
        .vsl-booking .booking-nav-btn { width: 44px; height: 44px; }
        .vsl-booking .booking-footer-links { gap: 16px; }
        .vsl-booking .booking-social-proof { flex-direction: column; text-align: center; }
        .vsl-booking input::placeholder, .vsl-booking textarea::placeholder { color: #464849; }
        .vsl-booking input:focus, .vsl-booking textarea:focus { border-bottom-color: #00f1fe !important; }
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

      {/* Header */}
      <header
        className="booking-header"
        style={{
          backgroundColor: 'rgba(42,44,46,0.6)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <span
            style={{
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: '-0.02em',
              fontFamily: "'Manrope', sans-serif",
              color: '#f6f6f7',
            }}
          >
            Flow<span style={{ color: '#99f7ff' }}>stack</span>
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: '#f6f6f7',
              fontFamily: "'Manrope', sans-serif",
            }}
          >
            Termin
          </span>
        </div>
      </header>

      {/* Main */}
      <main className="booking-main" style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Headline */}
        <div className="booking-headline-wrap" style={{ textAlign: 'center' }}>
          <h1
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 'clamp(26px, 4vw, 42px)',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              marginBottom: 16,
              color: '#f6f6f7',
            }}
          >
            Vielen Dank für deine Bewerbung!
          </h1>
          <p
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: 16,
              fontWeight: 500,
              color: '#c4c5c7',
              maxWidth: 640,
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            Buche jetzt einen Termin für ein kurzes Telefonat (ca. 15-20 Minuten), in dem wir deine
            Bewerbung besprechen und den nächsten Schritt planen.
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
              <h3
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 20,
                  fontWeight: 700,
                  color: '#f6f6f7',
                  marginBottom: 24,
                }}
              >
                Was dich im Gespräch erwartet:
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  {
                    icon: <BarChart3 size={20} style={{ color: '#99f7ff' }} />,
                    title: 'Status-Quo Analyse',
                    desc: 'Wir werfen einen detaillierten Blick auf deine bestehende Infrastruktur und identifizieren Engpässe.',
                  },
                  {
                    icon: <Lightbulb size={20} style={{ color: '#99f7ff' }} />,
                    title: 'Maßgeschneiderte Roadmap',
                    desc: 'Du erhältst einen konkreten Plan, wie KI deine Effizienz um bis zu 80% automatisieren kann.',
                  },
                  {
                    icon: <MessageCircle size={20} style={{ color: '#99f7ff' }} />,
                    title: 'Fragen & Antworten',
                    desc: 'Stelle alle deine Fragen direkt und erhalte sofort umsetzbare Antworten.',
                  },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div
                      style={{
                        flexShrink: 0,
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        backgroundColor: 'rgba(0,241,254,0.06)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {item.icon}
                    </div>
                    <div>
                      <h4
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontWeight: 700,
                          fontSize: 15,
                          color: '#f6f6f7',
                          marginBottom: 4,
                        }}
                      >
                        {item.title}
                      </h4>
                      <p
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: 13,
                          fontWeight: 500,
                          color: '#c4c5c7',
                          lineHeight: 1.6,
                          margin: 0,
                        }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Social Proof */}
            <div
              className="booking-social-proof"
              style={{
                padding: 20,
                borderRadius: 16,
                backgroundColor: '#111415',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
              }}
            >
              <div style={{ display: 'flex' }}>
                {AVATAR_URLS.map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt=""
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: '50%',
                      objectFit: 'cover',
                      border: '2px solid #111415',
                      marginLeft: i > 0 ? -10 : 0,
                    }}
                  />
                ))}
              </div>
              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#c4c5c7',
                  margin: 0,
                }}
              >
                Über 450 Agenturen vertrauen uns bereits.
              </p>
            </div>
          </div>

          {/* Right Column: Calendar Widget */}
          <div
            style={{
              borderRadius: 24,
              overflow: 'visible',
              background: '#181a1b',
              boxShadow: '0 20px 40px rgba(0,241,254,0.04)',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }} className="calendar-widget">
              <style>{`
                @media (min-width: 768px) {
                  .calendar-widget {
                    flex-direction: row !important;
                  }
                  .calendar-sidebar {
                    border-bottom: none !important;
                    border-right: 1px solid rgba(70,72,73,0.15) !important;
                    width: 220px !important;
                  }
                }
              `}</style>

              {/* Mini Sidebar */}
              <div
                className="calendar-sidebar booking-sidebar"
                style={{ backgroundColor: '#111415', borderBottom: '1px solid rgba(70,72,73,0.15)' }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: '50%',
                      backgroundColor: 'rgba(0,241,254,0.06)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Calendar size={20} style={{ color: '#99f7ff' }} />
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        letterSpacing: '0.08em',
                        color: '#747677',
                        fontFamily: "'Manrope', sans-serif",
                        margin: 0,
                        marginBottom: 4,
                      }}
                    >
                      Flowstack
                    </p>
                    <h3
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 17,
                        fontWeight: 700,
                        color: '#f6f6f7',
                        margin: 0,
                      }}
                    >
                      Prozessanalyse-Session
                    </h3>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#c4c5c7' }}>
                      <Clock size={16} />
                      <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500 }}>15-20 Min.</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 13, color: '#c4c5c7' }}>
                      <Phone size={16} />
                      <span style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 500 }}>
                        Telefonat
                      </span>
                    </div>
                  </div>

                  {/* Zeitzone - Custom Dropdown */}
                  <div id="tz-anchor" style={{ paddingTop: 12, borderTop: '1px solid rgba(70,72,73,0.15)', position: 'relative' }}>
                    <label style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', color: '#747677', marginBottom: 8, display: 'block' }}>Zeitzone</label>
                    <button
                      type="button"
                      onClick={() => setTzOpen(!tzOpen)}
                      style={{
                        width: '100%',
                        background: '#1e2021',
                        border: 'none',
                        borderRadius: 8,
                        color: '#f6f6f7',
                        fontSize: 13,
                        fontFamily: "'Manrope', sans-serif",
                        fontWeight: 500,
                        padding: '10px 12px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'background 0.15s',
                      }}
                    >
                      <span>{activeTz.flag} {activeTz.label}</span>
                      <ChevronDown size={14} style={{ color: '#c4c5c7', transform: tzOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} />
                    </button>
                    {tzOpen && (
                      <>
                        <div style={{ position: 'fixed', inset: 0, zIndex: 50 }} onClick={() => setTzOpen(false)} />
                        <div style={{
                          position: 'absolute',
                          top: '100%',
                          left: 0,
                          right: 0,
                          marginTop: 4,
                          background: '#1e2021',
                          borderRadius: 10,
                          boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                          zIndex: 51,
                          maxHeight: 240,
                          overflowY: 'auto',
                          padding: '4px 0',
                        }}>
                          {TIMEZONES.map(tz => (
                            <button
                              key={tz.value}
                              type="button"
                              onClick={() => { setTimezone(tz.value); setTzOpen(false); }}
                              style={{
                                width: '100%',
                                background: timezone === tz.value ? 'rgba(0,241,254,0.08)' : 'transparent',
                                border: 'none',
                                padding: '10px 14px',
                                fontSize: 13,
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: timezone === tz.value ? 600 : 500,
                                color: timezone === tz.value ? '#99f7ff' : '#c4c5c7',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                textAlign: 'left',
                                transition: 'background 0.1s',
                              }}
                              onMouseEnter={(e) => { if (timezone !== tz.value) (e.currentTarget).style.background = 'rgba(255,255,255,0.03)'; }}
                              onMouseLeave={(e) => { if (timezone !== tz.value) (e.currentTarget).style.background = 'transparent'; }}
                            >
                              <span>{tz.flag}</span>
                              <span>{tz.label}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {step === 'form' && selectedDay && selectedTime && (
                    <div
                      style={{
                        padding: '12px 14px',
                        borderRadius: 10,
                        backgroundColor: 'rgba(0,241,254,0.06)',
                        border: '1px solid rgba(0,241,254,0.12)',
                      }}
                    >
                      <p
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: 13,
                          fontWeight: 600,
                          color: '#99f7ff',
                          margin: 0,
                        }}
                      >
                        {selectedDay}. {monthData.monthName} {viewYear}
                      </p>
                      <p
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: 13,
                          fontWeight: 500,
                          color: '#c4c5c7',
                          margin: '4px 0 0 0',
                        }}
                      >
                        {selectedTime} Uhr
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Calendar Grid / Form */}
              <div className="booking-cal-grid" style={{ flex: 1, backgroundColor: '#111415' }}>
                {step === 'calendar' && (
                  <>
                    {/* Month Header */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: 24,
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: 17,
                          fontWeight: 700,
                          color: '#f6f6f7',
                          margin: 0,
                        }}
                      >
                        {monthData.monthName} {monthData.year}
                      </h3>
                      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                        {loading && (
                          <Loader2
                            size={16}
                            style={{ color: '#464849', animation: 'spin 1s linear infinite' }}
                          />
                        )}
                        <button
                          onClick={handlePrevMonth}
                          className="booking-nav-btn"
                          style={{
                            borderRadius: 8,
                            backgroundColor: '#1e2021',
                            border: '1px solid rgba(70,72,73,0.15)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <ChevronLeft size={16} style={{ color: '#c4c5c7' }} />
                        </button>
                        <button
                          onClick={handleNextMonth}
                          className="booking-nav-btn"
                          style={{
                            borderRadius: 8,
                            backgroundColor: '#1e2021',
                            border: '1px solid rgba(70,72,73,0.15)',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <ChevronRight size={16} style={{ color: '#c4c5c7' }} />
                        </button>
                      </div>
                    </div>

                    <style>{`
                      @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                    `}</style>

                    {/* Weekday Headers */}
                    <div
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(7, 1fr)',
                        gap: 4,
                        textAlign: 'center',
                        marginBottom: 8,
                      }}
                    >
                      {WEEKDAYS.map((day) => (
                        <div
                          key={day}
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: '#747677',
                            fontFamily: "'Manrope', sans-serif",
                            padding: '4px 0',
                          }}
                        >
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Day Cells */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 4 }}>
                      {calendarCells.map((cell, i) => {
                        if (!cell.isCurrentMonth) {
                          return (
                            <div
                              key={`pad-${i}`}
                              style={{
                                aspectRatio: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 13,
                                color: '#232628',
                              }}
                            >
                              {cell.day}
                            </div>
                          );
                        }

                        const isSelected = selectedDay === cell.day;

                        if (cell.isDisabled) {
                          return (
                            <div
                              key={`day-${cell.day}`}
                              style={{
                                aspectRatio: '1',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: 13,
                                color: '#232628',
                              }}
                            >
                              {cell.day}
                            </div>
                          );
                        }

                        return (
                          <button
                            key={`day-${cell.day}`}
                            onClick={() => {
                              setSelectedDay(cell.day);
                              setSelectedTime(null);
                            }}
                            style={{
                              aspectRatio: '1',
                              borderRadius: '50%',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: 13,
                              fontWeight: isSelected ? 700 : 500,
                              backgroundColor: isSelected ? '#00f1fe' : 'transparent',
                              color: isSelected ? '#005f64' : '#f6f6f7',
                              border: 'none',
                              cursor: 'pointer',
                              transition: 'all 0.15s',
                              boxShadow: isSelected ? '0 0 15px rgba(0,241,254,0.3)' : 'none',
                              fontFamily: "'Manrope', sans-serif",
                            }}
                            onMouseEnter={(e) => {
                              if (!isSelected) e.currentTarget.style.backgroundColor = '#1e2021';
                            }}
                            onMouseLeave={(e) => {
                              if (!isSelected) e.currentTarget.style.backgroundColor = 'transparent';
                            }}
                          >
                            {cell.day}
                          </button>
                        );
                      })}
                    </div>

                    {/* Time Slots */}
                    {selectedDay && (
                      <div
                        style={{
                          marginTop: 28,
                          paddingTop: 24,
                          borderTop: '1px solid rgba(70,72,73,0.15)',
                        }}
                      >
                        <h4
                          style={{
                            fontFamily: "'Manrope', sans-serif",
                            fontSize: 14,
                            fontWeight: 700,
                            color: '#f6f6f7',
                            marginBottom: 16,
                          }}
                        >
                          Verfügbare Zeiten für den {selectedDay}. {monthData.monthName}
                        </h4>

                        {availableSlots.length === 0 ? (
                          <p
                            style={{
                              fontFamily: "'Manrope', sans-serif",
                              fontSize: 14,
                              color: '#c4c5c7',
                              fontWeight: 500,
                              textAlign: 'center',
                              padding: '20px 0',
                            }}
                          >
                            Keine verfügbaren Zeiten an diesem Tag.
                          </p>
                        ) : (
                          <div
                            style={{
                              display: 'grid',
                              gridTemplateColumns: 'repeat(3, 1fr)',
                              gap: 10,
                            }}
                            className="time-grid"
                          >
                            <style>{`
                              @media (max-width: 480px) {
                                .time-grid { grid-template-columns: repeat(2, 1fr) !important; }
                              }
                            `}</style>
                            {availableSlots.map((time) => {
                              const isTimeSelected = selectedTime === time;
                              return (
                                <button
                                  key={time}
                                  onClick={() => setSelectedTime(time)}
                                  style={{
                                    padding: '16px 0',
                                    borderRadius: 10,
                                    fontSize: 14,
                                    fontWeight: 600,
                                    fontFamily: "'Manrope', sans-serif",
                                    backgroundColor: '#1e2021',
                                    color: isTimeSelected ? '#99f7ff' : '#c4c5c7',
                                    border: isTimeSelected
                                      ? '1px solid rgba(0,241,254,0.3)'
                                      : '1px solid rgba(70,72,73,0.15)',
                                    cursor: 'pointer',
                                    transition: 'all 0.15s',
                                    boxShadow: isTimeSelected ? '0 0 15px rgba(0,241,254,0.1)' : 'none',
                                  }}
                                >
                                  {time}
                                </button>
                              );
                            })}
                          </div>
                        )}

                        {/* Weiter Button */}
                        {selectedTime && (
                          <button
                            onClick={() => setStep('form')}
                            style={{
                              width: '100%',
                              marginTop: 16,
                              padding: '14px 24px',
                              borderRadius: 4,
                              border: 'none',
                              background: 'linear-gradient(135deg, #99f7ff, #00e2ee)',
                              color: '#003538',
                              fontSize: 14,
                              fontWeight: 700,
                              fontFamily: "'Manrope', sans-serif",
                              cursor: 'pointer',
                              transition: 'all 0.2s',
                              boxShadow: '0 0 15px rgba(0,241,254,0.3)',
                            }}
                          >
                            Weiter
                          </button>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Form Step */}
                {step === 'form' && selectedDay && selectedTime && (
                  <div>
                    <h3
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 20,
                        fontWeight: 700,
                        color: '#f6f6f7',
                        marginBottom: 8,
                      }}
                    >
                      Termin bestätigen
                    </h3>
                    <p
                      style={{
                        fontFamily: "'Manrope', sans-serif",
                        fontSize: 14,
                        color: '#99f7ff',
                        fontWeight: 600,
                        marginBottom: 28,
                      }}
                    >
                      {selectedDay}. {monthData.monthName} {viewYear} um {selectedTime} Uhr
                    </p>

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                      <div
                        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}
                        className="form-name-grid"
                      >
                        <style>{`
                          @media (max-width: 767px) {
                            .form-name-grid { grid-template-columns: 1fr !important; }
                          }
                        `}</style>
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: '#f6f6f7', marginBottom: 6, display: 'block' }}>Vorname *</label>
                          <input type="text" required value={vorname} onChange={(e) => setVorname(e.target.value)} style={inputStyle} />
                        </div>
                        <div>
                          <label style={{ fontSize: 12, fontWeight: 600, color: '#f6f6f7', marginBottom: 6, display: 'block' }}>Nachname *</label>
                          <input type="text" required value={nachname} onChange={(e) => setNachname(e.target.value)} style={inputStyle} />
                        </div>
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#f6f6f7', marginBottom: 6, display: 'block' }}>E-Mail *</label>
                        <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#f6f6f7', marginBottom: 6, display: 'block' }}>Handynummer *</label>
                        <input type="tel" required value={telefon} onChange={(e) => setTelefon(e.target.value)} style={inputStyle} />
                      </div>
                      <div>
                        <label style={{ fontSize: 12, fontWeight: 600, color: '#f6f6f7', marginBottom: 6, display: 'block' }}>Anmerkung (optional)</label>
                        <textarea value={anmerkung} onChange={(e) => setAnmerkung(e.target.value)} rows={3} style={{ ...inputStyle, resize: 'vertical' }} />
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 4 }}>
                        <button
                          type="button"
                          onClick={() => setStep('calendar')}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#c4c5c7',
                            fontSize: 13,
                            fontWeight: 600,
                            fontFamily: "'Manrope', sans-serif",
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 6,
                            padding: '12px 16px',
                            minHeight: 44,
                          }}
                        >
                          <ArrowLeft size={14} />
                          Zurück
                        </button>
                        <button
                          type="submit"
                          disabled={bookingSubmitted}
                          style={{
                            flex: 1,
                            padding: '14px 24px',
                            borderRadius: 4,
                            border: 'none',
                            background: bookingSubmitted
                              ? '#464849'
                              : 'linear-gradient(135deg, #99f7ff, #00e2ee)',
                            color: bookingSubmitted ? '#1e2021' : '#003538',
                            fontSize: 14,
                            fontWeight: 700,
                            fontFamily: "'Manrope', sans-serif",
                            cursor: bookingSubmitted ? 'not-allowed' : 'pointer',
                            transition: 'all 0.2s',
                            boxShadow: bookingSubmitted ? 'none' : '0 0 15px rgba(0,241,254,0.3)',
                          }}
                        >
                          {bookingSubmitted ? 'Wird gebucht...' : 'Termin planen'}
                        </button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

      </main>

      {/* Footer */}
      <footer style={{ padding: '24px', background: '#111415' }}>
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 16,
            textAlign: 'center',
          }}
        >
          <div className="booking-footer-links" style={{ display: 'flex', fontSize: 12, color: '#c4c5c7' }}>
            <a
              href="/impressum"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#c4c5c7', textDecoration: 'none' }}
            >
              Impressum
            </a>
            <a
              href="/datenschutz"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: '#c4c5c7', textDecoration: 'none' }}
            >
              Datenschutz
            </a>
          </div>
          <p
            style={{
              fontSize: 11,
              color: '#464849',
              maxWidth: 600,
              lineHeight: 1.5,
              fontFamily: "'Manrope', sans-serif",
              fontWeight: 500,
            }}
          >
            Diese Website ist nicht Teil der Facebook-Website oder von Facebook Inc. Diese Seite ist NICHT im
            Auftrag der FACEBOOK, Inc. entstanden. FACEBOOK ist eine Marke von FACEBOOK, Inc.
          </p>
          <p style={{ fontSize: 11, color: '#464849', fontFamily: "'Manrope', sans-serif", fontWeight: 500 }}>
            © 2026 Flowstack. Alle Rechte vorbehalten.
          </p>
        </div>
      </footer>
    </div>
  );
}
