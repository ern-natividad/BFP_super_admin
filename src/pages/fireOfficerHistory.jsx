import React from "react";
import "../style/fireOfficerHistory.css";

export default function FireOfficerHistory() {
  const rows = [
    { name: "Juan Dela Cruz", position: "Fire Officer II", time: "08:31 AM", date: "2025-10-23" },
    { name: "Mark Santos", position: "Fire Officer I", time: "09:12 AM", date: "2025-10-23" },
    { name: "Rico Malinao", position: "Captain", time: "07:58 AM", date: "2025-10-23" },
  ];

  return (
    <div className="history-page">
      <div className="top-right-profile">
        <div className="notif">🔔</div>
        <div className="profile">
          <div className="avatar" />
          <span className="name">shane</span>
        </div>
      </div>

      <h1 className="history-title">Fire Officers Log-In History</h1>

      <div className="search-row">
        <div className="searchbox">
          <span>🔍</span>
          <input placeholder="Search" />
        </div>
        <button className="filter">⚙</button>
      </div>

      <div className="table-wrap">
        <table className="history-table">
          <thead>
            <tr>
              <th>NAME</th>
              <th>POSITION</th>
              <th>TIME LOGGED-IN</th>
              <th>DATE</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}>
                <td>{r.name}</td>
                <td>{r.position}</td>
                <td>{r.time}</td>
                <td>{r.date}</td>
                <td><button className="btn-details">View More Details</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
