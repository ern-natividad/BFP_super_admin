import React from "react";
import "../style/dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-page">

      <div className="top-right">
        <button className="notif-btn">🔔</button>
        <div className="user-pill">
          <div className="user-avatar" />
          <span className="user-name">shane</span>
        </div>
      </div>

      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p className="dashboard-sub">
          Displays real-time data and summaries of emergency calls, reports, and safety updates managed by the Zamboanga City Fire District.
        </p>
      </header>

      <section className="statistics-wrapper">
        <h2 className="section-title">Statistics</h2>

        <div className="stats-container">
          <div className="stats-inner">
            <div className="stat-card gradient-a">
              <div className="stat-value">10,000</div>
              <div className="stat-label">Registered Users</div>
            </div>

            <div className="stat-card gradient-b">
              <div className="stat-value">50</div>
              <div className="stat-label">Emergency Call This Month</div>
            </div>

            <div className="stat-card gradient-c">
              <div className="stat-value">300</div>
              <div className="stat-label">Total of posted news articles</div>
            </div>
          </div>
        </div>
      </section>

      <section className="middle-row">

        <div className="left-column">
          <h3 className="small-title">No. of Fire Incident reports</h3>

          <div className="incident-cards">
            <div className="mini-card">
              <div className="mini-value">16</div>
              <div className="mini-label">Fire incident this April</div>
            </div>

            <div className="mini-card">
              <div className="mini-value">1</div>
              <div className="mini-label">Fire incident this week</div>
            </div>
          </div>

          <div className="year-chart-card">
            <div className="chart-title">No. Fire Incidents in a year</div>

            <svg className="bar-chart" viewBox="0 0 560 220" preserveAspectRatio="none" aria-hidden>
              <rect x="0" y="0" width="560" height="220" fill="#fff" />
              {[0,1,2,3,4].map(i => (
                <rect key={i} x={i*112 + 60} y={30} width="2" height="160" fill="#f4f4f7" />
              ))}

              <rect x="60" y="80" width="60" height="110" rx="4" fill="#b94d4d" />
              <rect x="172" y="60" width="60" height="130" rx="4" fill="#b94d4d" />
              <rect x="284" y="40" width="60" height="150" rx="4" fill="#b94d4d" />
              <rect x="396" y="90" width="60" height="100" rx="4" fill="#b94d4d" />
              <rect x="508" y="110" width="20" height="80" rx="4" fill="transparent" />

              <text x="60" y="205" fontSize="12" fill="#777">January</text>
              <text x="172" y="205" fontSize="12" fill="#777">February</text>
              <text x="284" y="205" fontSize="12" fill="#777">March</text>
              <text x="396" y="205" fontSize="12" fill="#777">April</text>
              <text x="460" y="205" fontSize="12" fill="#777">May</text>

              <rect x="420" y="185" width="12" height="8" fill="#b94d4d" rx="1" />
              <text x="440" y="193" fontSize="11" fill="#777">2025</text>
            </svg>
          </div>
        </div>

        <aside className="right-column">
          <h3 className="small-title">Recent Emergency calls</h3>

          <div className="recent-card">
            <div className="recent-inner">
              <p><strong>Caller:</strong> Juan Dela Cruz</p>
              <p><strong>Location:</strong> Brgy. Malagut, Zamboanga City</p>
              <p><strong>Type:</strong> Electrical Fire</p>
              <p><strong>Date:</strong> Nov 2, 2025 — 3:42 PM</p>
            </div>
          </div>

          <div className="recent-card">
            <div className="recent-inner">
              <p><strong>Caller:</strong> Maria Reyes</p>
              <p><strong>Location:</strong> Gov. Camins Ave, Zamboanga City</p>
              <p><strong>Type:</strong> Electrical Fire</p>
              <p><strong>Date:</strong> Nov 5, 2025 — 10:24 AM</p>
            </div>
          </div>
        </aside>
      </section>

    </div>
  );
}
