import React, { useState } from "react";
import "../style/branchstatus.css";

export default function BranchStatus() {
  // Mock Data (replace with API data later)
  const [stations] = useState([
    { id: 1, name: "Branch 1 - Lunzuran", status: "Ready" },
    { id: 2, name: "Branch 2 - Putik", status: "On Dispatch" },
    { id: 3, name: "Branch 3 - Divisoria", status: "Not Ready" },
    { id: 4, name: "Branch 4 - Calarian", status: "Under Maintenance" },
    { id: 5, name: "Branch 5 - Pasonanca", status: "Not Ready" },
    { id: 6, name: "Branch 6 - Zambowood", status: "Not Ready" },
    { id: 7, name: "Branch 7 - Mercedes", status: "Not Ready" },
    { id: 8, name: "Branch 8 - Sta. Maria", status: "Not Ready" },
    { id: 9, name: "Branch 9 - Tumaga", status: "Not Ready" },
    { id: 10, name: "Branch 10 - Guiwan", status: "Under Maintenance" },
  ]);

  const statusMap = {
    Ready: { class: "status-ready", icon: "fa-solid fa-circle-check" },
    "Not Ready": {
      class: "status-notready",
      icon: "fa-solid fa-circle-xmark",
    },
    "On Dispatch": { class: "status-dispatch", icon: "fa-solid fa-truck" },
    "Under Maintenance": {
      class: "status-maintenance",
      icon: "fa-solid fa-screwdriver-wrench",
    },
  };

  return (
    <div className="status-page">
      <h1 className="page-title">Station Status Overview</h1>

      <div className="stations-grid">
        {stations.map((station) => (
          <div key={station.id} className="station-card">
            <div className="station-header">
              <h2>{station.name}</h2>
            </div>

            <div className="station-status">
              <i
                className={`status-icon ${statusMap[station.status].icon} ${statusMap[station.status].class}`}
              ></i>

              <span
                className={`status-text ${statusMap[station.status].class}`}
              >
                {station.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
