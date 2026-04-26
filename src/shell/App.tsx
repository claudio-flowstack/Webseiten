import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import CookieBanner from '@/components/shared/CookieBanner'
import { RouteTracker } from '@/shared/tracking/RouteTracker'
import { ErrorBoundary } from '@/shared/components/ErrorBoundary'

// Homepage-Funnel
const HomePage = lazy(() => import('@/pages/homepage-funnel/HomePage').then(m => ({ default: m.HomePage })))
const Bewerbung = lazy(() => import('@/pages/homepage-funnel/Bewerbung').then(m => ({ default: m.Bewerbung })))
const DankeBewerbung = lazy(() => import('@/pages/homepage-funnel/DankeBewerbung').then(m => ({ default: m.DankeBewerbung })))

// Fulfillment-Funnel
const FulfillmentAutomation = lazy(() => import('@/pages/fulfillment-automation/FulfillmentAutomation').then(m => ({ default: m.FulfillmentAutomation })))

// VSL-Funnel
const OptIn = lazy(() => import('@/pages/vsl-funnel/OptIn').then(m => ({ default: m.OptIn })))
const Training = lazy(() => import('@/pages/vsl-funnel/Training').then(m => ({ default: m.Training })))
const Qualify = lazy(() => import('@/pages/vsl-funnel/Qualify').then(m => ({ default: m.Qualify })))
const Booking = lazy(() => import('@/pages/vsl-funnel/Booking').then(m => ({ default: m.Booking })))
const Danke = lazy(() => import('@/pages/vsl-funnel/Danke').then(m => ({ default: m.Danke })))

// Legal
const Impressum = lazy(() => import('@/pages/legal/Impressum').then(m => ({ default: m.Impressum })))
const Datenschutz = lazy(() => import('@/pages/legal/Datenschutz').then(m => ({ default: m.Datenschutz })))
const Agb = lazy(() => import('@/pages/legal/Agb').then(m => ({ default: m.Agb })))

// Demo · Novacode Dark Terminal
const DemoLanding = lazy(() => import('@/pages/demo/DemoLanding').then(m => ({ default: m.DemoLanding })))
const DemoBewerbung = lazy(() => import('@/pages/demo/DemoBewerbung').then(m => ({ default: m.DemoBewerbung })))
const DemoDanke = lazy(() => import('@/pages/demo/DemoDanke').then(m => ({ default: m.DemoDanke })))
const DemoImpressum = lazy(() => import('@/pages/demo/DemoImpressum').then(m => ({ default: m.DemoImpressum })))
const DemoDatenschutz = lazy(() => import('@/pages/demo/DemoDatenschutz').then(m => ({ default: m.DemoDatenschutz })))

// 404
const NotFound404 = lazy(() => import('@/pages/errors/NotFound404').then(m => ({ default: m.NotFound404 })))


export function App() {
  return (
    <BrowserRouter>
      <RouteTracker />
      <ErrorBoundary
        fallback={
          <div className="min-h-dvh bg-[#0a0a0e] text-white flex items-center justify-center p-6">
            <div className="max-w-md text-center">
              <h1 className="text-2xl font-semibold mb-3">Etwas ist schiefgelaufen</h1>
              <p className="text-gray-400 mb-6">
                Die Seite konnte nicht geladen werden. Bitte lade neu oder versuch es später erneut.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="rounded-lg bg-cyan-500 px-5 py-2.5 text-sm font-semibold text-black hover:bg-cyan-400 transition-colors"
              >
                Seite neu laden
              </button>
            </div>
          </div>
        }
      >
        <Suspense fallback={<div className="min-h-dvh bg-[#0a0a0e]" />}>
          <Routes>
          {/* Homepage-Funnel */}
          <Route path="/" element={<HomePage />} />
          <Route path="/bewerbung" element={<Bewerbung />} />
          <Route path="/danke-bewerbung" element={<DankeBewerbung />} />

          {/* Fulfillment */}
          <Route path="/fulfillment-automation" element={<FulfillmentAutomation />} />

          {/* VSL-Funnel */}
          <Route path="/kostenloses-videotraining" element={<OptIn />} />
          <Route path="/videotraining" element={<Training />} />
          <Route path="/private-bewerbung" element={<Qualify />} />
          <Route path="/termin" element={<Booking />} />
          <Route path="/danke" element={<Danke />} />

          {/* Demo · Novacode Dark Terminal */}
          <Route path="/demo" element={<DemoLanding />} />
          <Route path="/demo-bewerbung" element={<DemoBewerbung />} />
          <Route path="/demo-danke" element={<DemoDanke />} />
          <Route path="/demo-impressum" element={<DemoImpressum />} />
          <Route path="/demo-datenschutz" element={<DemoDatenschutz />} />

          {/* Legal */}
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/agb" element={<Agb />} />

          {/* 404 catch-all */}
          <Route path="*" element={<NotFound404 />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
      <CookieBanner />
    </BrowserRouter>
  )
}
