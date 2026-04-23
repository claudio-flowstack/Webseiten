import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { X, Cookie, Shield, Megaphone, BarChart3 } from 'lucide-react';

interface CookieSettings {
  notwendig: boolean;
  analytics: boolean;
  marketing: boolean;
}

interface BannerTheme {
  accent: string;          // Haupt-Akzentfarbe
  accentHover: string;     // zweiter Gradient-Stop
  accentShadow: string;    // rgba für hover-shadow
  accentTintStrong: string;// rgba für gefüllte Toggle/Icon-BG
  accentTintSoft: string;  // rgba für "Notwendig"-Card-BG
  accentTintBorder: string;// rgba für "Notwendig"-Card-Border
  panelBg: string;         // Banner-/Modal-Hintergrund
  panelBorder: string;     // subtile Border
  textHeading: string;
  textBody: string;
  textMuted: string;
  buttonSecondaryBg: string;
  buttonSecondaryBorder: string;
  fontFamily?: string;
}

const FLOWSTACK_THEME: BannerTheme = {
  accent: '#22d3ee',
  accentHover: '#06b6d4',
  accentShadow: 'rgba(34,211,238,0.25)',
  accentTintStrong: 'rgba(34,211,238,0.2)',
  accentTintSoft: 'rgba(34,211,238,0.1)',
  accentTintBorder: 'rgba(34,211,238,0.2)',
  panelBg: 'rgba(10,10,14,0.95)',
  panelBorder: 'rgba(31,41,55,0.5)',
  textHeading: '#ffffff',
  textBody: '#9ca3af',
  textMuted: '#6b7280',
  buttonSecondaryBg: 'rgba(17,24,39,0.8)',
  buttonSecondaryBorder: 'rgba(55,65,81,0.5)',
};

const NOVACODE_THEME: BannerTheme = {
  accent: '#e8b75c',
  accentHover: '#d6a344',
  accentShadow: 'rgba(232,183,92,0.25)',
  accentTintStrong: 'rgba(232,183,92,0.2)',
  accentTintSoft: 'rgba(232,183,92,0.1)',
  accentTintBorder: 'rgba(232,183,92,0.22)',
  panelBg: 'rgba(12,12,13,0.96)',
  panelBorder: 'rgba(255,255,255,0.1)',
  textHeading: '#e6e4df',
  textBody: 'rgba(230,228,223,0.7)',
  textMuted: 'rgba(230,228,223,0.45)',
  buttonSecondaryBg: 'rgba(20,20,22,0.9)',
  buttonSecondaryBorder: 'rgba(255,255,255,0.12)',
  fontFamily: '"Geist", "Inter Tight", -apple-system, sans-serif',
};

function resolveTheme(pathname: string): BannerTheme {
  if (pathname.startsWith('/demo')) return NOVACODE_THEME;
  return FLOWSTACK_THEME;
}

// Push consent update to GTM dataLayer
const updateConsent = (settings: CookieSettings) => {
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) {
    window.dataLayer!.push(args);
  }

  gtag('consent', 'update', {
    'ad_storage': settings.marketing ? 'granted' : 'denied',
    'ad_user_data': settings.marketing ? 'granted' : 'denied',
    'ad_personalization': settings.marketing ? 'granted' : 'denied',
    'analytics_storage': settings.analytics ? 'granted' : 'denied',
  });

  // Meta Pixel consent
  if (window.fbq) {
    if (settings.marketing) {
      window.fbq('consent', 'grant');
      window.fbq('track', 'PageView');
    } else {
      window.fbq('consent', 'revoke');
    }
  }

  // Fire custom event so GTM can react
  window.dataLayer.push({
    event: 'consent_update',
    consent_analytics: settings.analytics,
    consent_marketing: settings.marketing,
  });
};

const CookieBanner = () => {
  const location = useLocation();
  const theme = useMemo(() => resolveTheme(location.pathname), [location.pathname]);

  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    notwendig: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // TEMP: bei jedem Refresh anzeigen bis finaler Consent-Flow steht
    localStorage.removeItem('cookieConsent');
    setVisible(true);
  }, []);

  useEffect(() => {
    const handleResetConsent = () => {
      localStorage.removeItem('cookieConsent');
      setVisible(true);
    };
    window.addEventListener('resetCookieConsent', handleResetConsent);
    return () => window.removeEventListener('resetCookieConsent', handleResetConsent);
  }, []);

  useEffect(() => {
    const handleOpenSettings = () => {
      setShowSettings(true);
      setVisible(true);
    };
    window.addEventListener('openCookieSettings', handleOpenSettings);
    return () => window.removeEventListener('openCookieSettings', handleOpenSettings);
  }, []);

  const saveConsent = (settings: CookieSettings) => {
    // TEMP: Persistenz deaktiviert, damit Banner bei jedem Refresh kommt
    updateConsent(settings);
    setVisible(false);
    setShowSettings(false);
  };

  const handleAcceptAll = () => {
    saveConsent({ notwendig: true, analytics: true, marketing: true });
  };

  const handleRejectAll = () => {
    saveConsent({ notwendig: true, analytics: false, marketing: false });
  };

  if (!visible) return null;

  const fontStyle = theme.fontFamily ? { fontFamily: theme.fontFamily } : {};

  const panelStyle = {
    background: theme.panelBg,
    borderColor: theme.panelBorder,
    ...fontStyle,
  };

  const primaryButtonStyle = {
    background: `linear-gradient(90deg, ${theme.accent}, ${theme.accentHover})`,
    color: theme === NOVACODE_THEME ? '#0c0c0d' : '#ffffff',
    boxShadow: 'none' as const,
    transition: 'box-shadow 0.2s, transform 0.2s',
  };

  const secondaryButtonStyle = {
    background: theme.buttonSecondaryBg,
    borderColor: theme.buttonSecondaryBorder,
    color: theme.textHeading,
  };

  return createPortal(
    <>
      {/* Cookie Banner */}
      {!showSettings && (
        <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 sm:w-full sm:max-w-2xl z-50">
          <div
            className="backdrop-blur-xl border shadow-2xl rounded-2xl p-6 flex flex-col gap-4"
            style={panelStyle}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: theme.accentTintStrong }}
              >
                <Cookie className="w-5 h-5" style={{ color: theme.accent }} />
              </div>
              <h3 className="font-semibold text-lg" style={{ color: theme.textHeading }}>
                Cookie-Einstellungen
              </h3>
            </div>

            <p className="text-sm leading-relaxed" style={{ color: theme.textBody }}>
              Wir verwenden notwendige Cookies für den Betrieb der Website, Analytics-Cookies zur Verbesserung
              unseres Angebots und Marketing-Cookies für personalisierte Werbung.
              Weitere Infos findest du in unserer{' '}
              <Link to="/datenschutz" className="hover:underline" style={{ color: theme.accent }}>
                Datenschutzerklärung
              </Link>
              .
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleAcceptAll}
                className="flex-1 rounded-xl px-5 py-2.5 text-sm font-semibold transition-all"
                style={primaryButtonStyle}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 10px 25px -10px ${theme.accentShadow}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                Alle akzeptieren
              </button>
              <button
                onClick={handleRejectAll}
                className="flex-1 border rounded-xl px-5 py-2.5 text-sm font-semibold transition-colors"
                style={secondaryButtonStyle}
              >
                Nur notwendige
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="text-sm underline transition-colors px-2 py-1"
                style={{ color: theme.textMuted }}
              >
                Einstellungen
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div
            className="border rounded-2xl shadow-2xl max-w-lg w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto"
            style={panelStyle}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ background: theme.accentTintStrong }}
                >
                  <Cookie className="w-5 h-5" style={{ color: theme.accent }} />
                </div>
                <h3 className="text-xl font-semibold" style={{ color: theme.textHeading }}>
                  Cookie-Einstellungen
                </h3>
              </div>
              <button
                onClick={() => setShowSettings(false)}
                className="transition-colors"
                style={{ color: theme.textMuted }}
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 mb-6">
              <p className="text-sm" style={{ color: theme.textBody }}>
                Wähle aus, welche Arten von Cookies du zulassen möchtest.
              </p>

              <div className="space-y-3">
                {/* Notwendig — immer aktiv */}
                <div
                  className="flex items-center justify-between p-4 border rounded-xl"
                  style={{ background: theme.accentTintSoft, borderColor: theme.accentTintBorder }}
                >
                  <div className="flex items-center gap-3">
                    <Shield className="w-5 h-5" style={{ color: theme.accent }} />
                    <div>
                      <h4 className="font-medium" style={{ color: theme.textHeading }}>Notwendig</h4>
                      <p className="text-xs" style={{ color: theme.textMuted }}>Erforderlich für den Betrieb der Website</p>
                    </div>
                  </div>
                  <div
                    className="w-11 h-6 rounded-full flex items-center justify-end px-1"
                    style={{ background: theme.accent }}
                  >
                    <div className="w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>

                {/* Analytics */}
                <div
                  className="flex items-center justify-between p-4 border rounded-xl transition-colors"
                  style={{ borderColor: theme.panelBorder }}
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5" style={{ color: theme.textMuted }} />
                    <div>
                      <h4 className="font-medium" style={{ color: theme.textHeading }}>Analytics</h4>
                      <p className="text-xs" style={{ color: theme.textMuted }}>Google Analytics zur Verbesserung der Website</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCookieSettings(prev => ({ ...prev, analytics: !prev.analytics }))}
                    className={`w-11 h-6 rounded-full flex items-center transition-colors duration-300 ${
                      cookieSettings.analytics ? 'justify-end' : 'justify-start'
                    }`}
                    style={{ background: cookieSettings.analytics ? theme.accent : 'rgba(55,65,81,0.7)' }}
                  >
                    <div className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm"></div>
                  </button>
                </div>

                {/* Marketing */}
                <div
                  className="flex items-center justify-between p-4 border rounded-xl transition-colors"
                  style={{ borderColor: theme.panelBorder }}
                >
                  <div className="flex items-center gap-3">
                    <Megaphone className="w-5 h-5" style={{ color: theme.textMuted }} />
                    <div>
                      <h4 className="font-medium" style={{ color: theme.textHeading }}>Marketing</h4>
                      <p className="text-xs" style={{ color: theme.textMuted }}>Google Ads & Facebook Pixel für personalisierte Werbung</p>
                    </div>
                  </div>
                  <button
                    onClick={() => setCookieSettings(prev => ({ ...prev, marketing: !prev.marketing }))}
                    className={`w-11 h-6 rounded-full flex items-center transition-colors duration-300 ${
                      cookieSettings.marketing ? 'justify-end' : 'justify-start'
                    }`}
                    style={{ background: cookieSettings.marketing ? theme.accent : 'rgba(55,65,81,0.7)' }}
                  >
                    <div className="w-4 h-4 bg-white rounded-full mx-1 shadow-sm"></div>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => saveConsent(cookieSettings)}
                className="flex-1 rounded-xl px-5 py-3 text-sm font-semibold transition-all"
                style={primaryButtonStyle}
                onMouseEnter={(e) => { e.currentTarget.style.boxShadow = `0 10px 25px -10px ${theme.accentShadow}`; }}
                onMouseLeave={(e) => { e.currentTarget.style.boxShadow = 'none'; }}
              >
                Auswahl speichern
              </button>
              <button
                onClick={() => setShowSettings(false)}
                className="flex-1 border rounded-xl px-5 py-3 text-sm font-semibold transition-colors"
                style={secondaryButtonStyle}
              >
                Abbrechen
              </button>
            </div>
          </div>
        </div>
      )}
    </>,
    document.body
  );
};

export default CookieBanner;
