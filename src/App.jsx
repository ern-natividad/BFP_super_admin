import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import LogIn from './pages/log_in.jsx';
import SignUp from './pages/sign_up.jsx';

import Layout from "./components/layout";

import Dashboard from "./pages/dashboard";
import FireOfficerHistory from "./pages/FireOfficerHistory";
import FireEmergencyCallHistory from "./pages/fire_emergency_call_history";
import FireIncident from "./pages/fire_incident";
import Inbox from "./pages/inbox";
import ContentManagement from "./pages/content_management";

const Placeholder = ({ name }) => (
  <div style={{ padding: 30 }}>
    <h2>{name}</h2>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/history" element={<FireOfficerHistory />} />
          <Route path="/emergency-calls" element={<FireEmergencyCallHistory />} />
          <Route path="/fire_incident" element={<FireIncident />} />
          <Route path="/inbox" element={<Inbox />} />
          <Route path="/content-management" element={<ContentManagement />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
