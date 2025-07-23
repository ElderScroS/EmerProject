import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";
import Layout from "./Layouts/Layout";
import CookieBanner from "./components/cookie/cookie.jsx";
import './i18n';
import './App.css';

const HomePage = lazy(() => import("./pages/home"));
const CompanyPage = lazy(() => import("./pages/company"));
const SupportPage = lazy(() => import("./pages/support"));
const DriverPage = lazy(() => import("./pages/driver"));
const FleetPage = lazy(() => import("./pages/fleet"));

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Suspense>
        <Routes location={location}>
          <Route
            path="/"
            element={
              <Layout>
                <HomePage />
              </Layout>
            }
          />
          <Route
            path="company"
            element={
              <Layout>
                <CompanyPage />
              </Layout>
            }
          />
          <Route
            path="support"
            element={
              <Layout>
                <SupportPage />
              </Layout>
            }
          />
          <Route
            path="driver"
            element={
              <Layout>
                <DriverPage />
              </Layout>
            }
          />
          <Route
            path="fleet"
            element={
              <Layout>
                <FleetPage />
              </Layout>
            }
          />
        </Routes>
      </Suspense>
      <CookieBanner />
    </div>
  );
}

export default App;
