import React from "react";
import "../style/fireOfficerHistory.css";

export default function FireOfficerHistory() {
  const rows = [
    { name: "Juan Dela Cruz", time: "08:31 AM", date: "2025-10-23", status: "Offline" },
    { name: "Mark Santos", time: "09:12 AM", date: "2025-10-23", status: "Offline" },
    { name: "Rico Malinao", time: "07:58 AM", date: "2025-10-23", status: "Offline" },
  ];

  return (
    <div className="history-page">
      <div className="top-right">
        <button className="notif-btn">🔔</button>
        <div className="user-pill">
          <div className="user-avatar" />
          <span className="user-name">shane</span>
        </div>
      </div>

      <h1 className="history-title">Fire Officers Log-In History</h1>

      <div className="search-row">
        <div className="searchbox">
          <input placeholder="Search" />
        </div>
        <button className="filter">⚙️</button>
      </div>

      <div className="table-wrap">
        <table className="history-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>TIME LOGGED-IN</th>
              <th>DATE</th>
              <th>STATUS</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td>{r.time}</td>
                <td>{r.date}</td>
                <td>{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
