import { useState, useRef, useEffect } from "react";
import { useStatus } from "../context/StatusContext";
import "../style/topnavbar.css";

export default function Topnavbar() {
  const [showNotif, setShowNotif] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  
  // Use status context
  const { stationStatus, getStatusClass, getReadinessPercentage, checklistUpdated } = useStatus();

  const notifRef = useRef(null);

  // 🔊 preload sounds
  const notifSound = new Audio("/sounds/notif.mp3");
  const openSound = new Audio("/sounds/open.mp3");

  // 🔘 Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setShowNotif(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔔 Trigger notification sound on first load
  useEffect(() => {
    if (hasUnread) notifSound.play();
  }, [hasUnread]);

  const toggleNotification = () => {
    openSound.play(); // 🔊 sound when opening

    setShowNotif((prev) => !prev);

    if (!showNotif) setHasUnread(false); // removes red dot
  };

  const readinessPercentage = getReadinessPercentage();
  const isNotReady = !checklistUpdated && readinessPercentage === 0;

  return (
    <header className="topnav">
      <div className="topnav-left">
        <h2 className="topnav-title">BFP Station Status</h2>

        <div className={`status-chip ${getStatusClass()} ${isNotReady ? 'not-updated' : ''}`}>
          <span className="status-dot"></span>
          <span className="status-text">{stationStatus}</span>
          <span className="readiness-percentage">{readinessPercentage}%</span>
          {isNotReady && <span className="warning-text">⚠️</span>}
        </div>

        {isNotReady && (
          <div className="status-warning">
            <span>Checklist not updated - Station not ready</span>
          </div>
        )}
      </div>

      <div className="topnav-right">
        
        <div className="notif-wrapper" ref={notifRef}>
          <button
            className={`notif-btn ${showNotif ? "notif-active" : ""}`}
            onClick={toggleNotification}
          >
            <i className="fa-solid fa-bell"></i>

            {hasUnread && <span className="notif-indicator"></span>}
          </button>

          {showNotif && (
            <div className="notif-dropdown">
              <h4>Notifications</h4>

              <div className="notif-item">
                <p className="notif-title">New Incident Report Submitted</p>
                <span className="notif-time">2 minutes ago</span>
              </div>

              <div className="notif-item">
                <p className="notif-title">Station marked as {stationStatus}</p>
                <span className="notif-time">10 minutes ago</span>
              </div>

              {isNotReady && (
                <div className="notif-item warning">
                  <p className="notif-title">⚠️ Checklist Not Updated</p>
                  <span className="notif-time">Station readiness at 0%</span>
                </div>
              )}

              <div className="notif-item">
                <p className="notif-title">Station Readiness: {readinessPercentage}%</p>
                <span className="notif-time">Just now</span>
              </div>

              <button className="notif-view-all">View All</button>
            </div>
          )}
        </div>

        {/* Avatar */}
        <div className="user-avatar">
          <i className="fa-solid fa-user"></i>
        </div>

      </div>
    </header>
  );
}





