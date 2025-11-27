import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../style/sidebar.css";

export default function Sidebar() {
  const location = useLocation();

  const menuItems = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Inbox", path: "/inbox" },
    { label: "Call History", path: "/emergency-calls" },
    { label: "Fire Officers", path: "/history" },
    { label: "Fire Incident", path: "/fire_incident" },
    { label: "Content Management", path: "/content-management" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-logo" />
        <div className="sidebar-title">Zamboanga Fire</div>
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path ? "menu-item active" : "menu-item"
            }
          >
            {item.label}
          </Link>
        ))}

        <div className="sidebar-divider" />

        <Link to="/settings" className="menu-item">
          Settings
        </Link>
      </nav>
      
      <Link to="/" className="logout">
      <button className="sidebar-logout">Log Out</button>
      </Link>
    </aside>
  );
}
