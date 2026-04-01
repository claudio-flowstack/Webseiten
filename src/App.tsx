/**
 * Flowstack Systems Landing Page
 * React Router configuration with lazy-loaded pages
 */

import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, lazy, Suspense } from "react";
import CookieBanner from "./components/CookieBanner";
import "./App.css";

// Lazy-loaded pages for code splitting
const HomePage = lazy(() => import("./pages/HomePage"));
const HomePagePlatform = lazy(() => import("./pages/HomePagePlatform").then(m => ({ default: m.HomePage })));
const HomePageNew = lazy(() => import("./pages/HomePageNew").then(m => ({ default: m.HomePageNew })));

// Page titles for tab names
const pageTitles: Record<string, string> = {
  "/alt-hp": "Flowstack — Alte Homepage",
  "/test": "Flowstack — Komponenten Test",
  "/home": "Flowstack — KI-Automatisierung für Agenturen",
};

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.replace("#", ""));
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth" }), 100);
        return;
      }
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

function PageTitle() {
  const { pathname } = useLocation();
  useEffect(() => {
    document.title = pageTitles[pathname] || "Flowstack Systems";
  }, [pathname]);
  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <PageTitle />
      <Suspense fallback={<div className="min-h-screen bg-[#0a0a0e]" />}>
        <Routes>
          <Route path="/alt-hp" element={<HomePage />} />
          <Route path="/test" element={<HomePagePlatform />} />
          <Route path="/home" element={<HomePageNew />} />
        </Routes>
      </Suspense>
      <CookieBanner />
    </Router>
  );
}

export default App;
