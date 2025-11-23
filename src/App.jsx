import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Login from "./pages/login";
import Signup from "./pages/signup";

import Sidebar from "./components/sidenavbar";
import Topnavbar from "./components/topnavbar";

import Dashboard from "./pages/dashboard";
import EmergencyCallHistory from "./pages/emergencycallHistory";
import Officers from "./pages/officersLoginHistory";
import IncidentReport from "./pages/IncidentReport";
import StationReadiness from "./pages/stationreadiness";
import Settings from "./pages/Settings";
import TestPage from "./pages/TestPage";

import { StatusProvider } from "./context/StatusContext";
import "./layout.css";

function AppContent() {
  const location = useLocation();

  // pages without layout
  const noLayoutRoutes = ["/login", "/signup"];

  const hideLayout = noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {/* If LOGIN or SIGNUP → show ONLY the page */}
      {hideLayout ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      ) : (
        // Else → show sidebar + topbar + page
        <div className="app-layout">
          <Sidebar />

          <div className="main-container">
            <Topnavbar />

            <main className="content-area">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/emergency-calls" element={<EmergencyCallHistory />} />
                <Route path="/officers" element={<Officers />} />
                <Route path="/incident-report" element={<IncidentReport />} />
                <Route path="/station-readiness" element={<StationReadiness />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/test" element={<TestPage />} />
              </Routes>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <StatusProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </StatusProvider>
  );
}
