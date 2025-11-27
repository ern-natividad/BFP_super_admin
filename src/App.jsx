import React, { useState } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Sidebar from "./components/sidenavbar";
import Topnavbar from "./components/topnavbar";
import Dashboard from "./pages/dashboard";
import Reports from "./pages/reports";
import EmergencyCallHistory from "./pages/emergencycallHistory";
import Officers from "./pages/officersLoginHistory";
import IncidentReport from "./pages/IncidentReport";
import BranchStatus from "./pages/branchstatus";
import Settings from "./pages/Settings";
import TestPage from "./pages/TestPage";

import { StatusProvider } from "./context/StatusContext";

import CallModal from "./components/CallModal";
import IncomingCallModal from "./components/IncomingCallModal";
import "./layout.css";

function AppContent() {
  const location = useLocation();
  const noLayoutRoutes = ["/login", "/signup"];
  const hideLayout = noLayoutRoutes.includes(location.pathname);

  // ==== Call states ====
  const [ongoingCalls, setOngoingCalls] = useState([]);
  const [incomingCalls, setIncomingCalls] = useState([]);

  const triggerIncomingCall = (number) => {
    setIncomingCalls([...incomingCalls, { id: Date.now(), number }]);
  };

  const acceptCall = (callId) => {
    const call = incomingCalls.find(c => c.id === callId);
    if (!call) return;
    setOngoingCalls([
      ...ongoingCalls,
      {
        ...call,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString(),
        status: "Ongoing"
      },
    ]);
    setIncomingCalls(incomingCalls.filter(c => c.id !== callId));
  };

  const rejectCall = (callId) => {
    setIncomingCalls(incomingCalls.filter(c => c.id !== callId));
  };

  const endOngoingCall = (callId) => {
    setOngoingCalls(ongoingCalls.filter(c => c.id !== callId));
  };
  // ==================

  return (
    <>
      {hideLayout ? (
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/signup" element={<div>Signup Page</div>} />
        </Routes>
      ) : (
        <div className="app-layout">
          <Sidebar />
          <div className="main-container">
            <Topnavbar />

            <main className="content-area">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/reports" element={<Reports />} />
                <Route path="/emergency-calls" element={<EmergencyCallHistory />} />
                <Route path="/officers" element={<Officers />} />
                <Route path="/incident-report" element={<IncidentReport />} />
                <Route path="/branch-status" element={<BranchStatus />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/test" element={<TestPage />} />
              </Routes>

              <button
                style={{ marginTop: 20 }}
                onClick={() => triggerIncomingCall("09171234567")}
              >
                Trigger Incoming Call
              </button>
            </main>
          </div>

          {/* ==== Fixed Ongoing Calls Horizontal Stack ==== */}
          <div className="fixed-call-stack-horizontal">
            {ongoingCalls.map(call => (
              <CallModal
                key={call.id}
                callData={call}
                onClose={() => endOngoingCall(call.id)}
                topMode
              />
            ))}
          </div>

          {/* ==== Incoming Calls Modal ==== */}
          {incomingCalls.map(call => (
            <IncomingCallModal
              key={call.id}
              callNumber={call.number}
              onAccept={() => acceptCall(call.id)}
              onReject={() => rejectCall(call.id)}
            />
          ))}
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
