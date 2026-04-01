import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import HomePage from '@/pages/HomePage'

const HomePagePlatform = lazy(() => import('@/pages/HomePagePlatform').then(m => ({ default: m.HomePage })))
const VslOptInPage = lazy(() => import('@/pages/funnel/VslOptInPage').then(m => ({ default: m.VslOptInPage })))
const VslTrainingPage = lazy(() => import('@/pages/funnel/VslTrainingPage').then(m => ({ default: m.VslTrainingPage })))
const VslQualifyPage = lazy(() => import('@/pages/funnel/VslQualifyPage').then(m => ({ default: m.VslQualifyPage })))
const VslBookingPage = lazy(() => import('@/pages/funnel/VslBookingPage').then(m => ({ default: m.VslBookingPage })))
const VslDankePage = lazy(() => import('@/pages/funnel/VslDankePage').then(m => ({ default: m.VslDankePage })))


export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0e]" />}>
        <Routes>
          <Route path="/alt-hp" element={<HomePage />} />
          <Route path="/test" element={<HomePagePlatform />} />
          <Route path="/kostenloses-videotraining" element={<VslOptInPage />} />
          <Route path="/videotraining" element={<VslTrainingPage />} />
          <Route path="/private-bewerbung" element={<VslQualifyPage />} />
          <Route path="/termin" element={<VslBookingPage />} />
          <Route path="/danke" element={<VslDankePage />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
