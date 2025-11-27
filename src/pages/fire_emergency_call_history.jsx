import React from "react";
import "../style/fire_emergency_call_history.css";

export default function FireEmergencyCallHistory() {
  const rows = [
    { caller: "Juan Dela Cruz", type: "Electrical", time: "10:45 AM", date: "2025-10-23" },
    { caller: "Maria Santos", type: "Kitchen", time: "11:10 AM", date: "2025-10-23" },
  ];

  return (
    <div className="call-history-page">
      <div className="top-right">
        <button className="notif-btn">🔔</button>
        <div className="user-pill">
          <div className="user-avatar" />
          <span className="user-name">shane</span>
        </div>
      </div>

      <h1 className="page-title">Fire Emergency Call History</h1>

      <div className="search-row">
        <div className="searchbox">
          <input placeholder="Search" />
        </div>
        <button className="filter">⚙️</button>
      </div>

      <div className="table-wrap">
        <table className="calls-table">
          <thead>
            <tr>
              <th>CALLER</th>
              <th>TYPE</th>
              <th>TIME</th>
              <th>DATE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.caller}</td>
                <td>{r.type}</td>
                <td>{r.time}</td>
                <td>{r.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
