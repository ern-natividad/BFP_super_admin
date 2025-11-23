import { useState } from "react";
import { useStatus } from "../context/StatusContext";
import "../style/stationreadiness.css";
import ConfirmModal from "../components/ConfirmModal";

export default function StationReadiness() {
  const [checklist, setChecklist] = useState({
    firetruck: false,
    scba: false,
    hoses: false,
    radio: false,
    water: false,
    crew: false,
    oic: false,
    driver: false,
    generator: false,
  });

  const [modalOpen, setModalOpen] = useState(false);

  // Use status context
  const { updateStationStatus } = useStatus();

  const toggleItem = (key) => {
    setChecklist((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // COMPUTE STATUS
  const criticalFail =
    !checklist.firetruck ||
    !checklist.radio ||
    !checklist.driver ||
    !checklist.scba;

  const partiallyReady = Object.values(checklist).includes(false);

  let finalStatus = "READY";
  if (criticalFail) finalStatus = "NOT READY";
  else if (partiallyReady) finalStatus = "PARTIALLY READY";

  // Calculate readiness percentage
  const checkedItems = Object.values(checklist).filter(item => item).length;
  const readinessPercentage = Math.round((checkedItems / Object.keys(checklist).length) * 100);

  const openConfirm = () => setModalOpen(true);

  const submitReadiness = () => {
    setModalOpen(false);

    // Update main station status
    updateStationStatus(finalStatus, readinessPercentage);

    console.log("Submitted Station Readiness:", {
      checklist,
      finalStatus,
      readinessPercentage,
      time: new Date(),
    });
  };

  return (
    <div className="readiness-wrapper">
      <h1 className="readiness-title">BFP Station Readiness</h1>

      <div className="readiness-container">
        {/* Header */}
        <div className="readiness-header">
          <h2>BFP Main Station Operational Readiness</h2>
        </div>

        {/* Content */}
        <div className="readiness-content">

          {/* Equipment Checklist */}
          <div className="checklist-section">
            <h3 className="section-title">Equipment Checklist</h3>
            <div className="checklist-items">
              {[
                ["firetruck", "Firetruck Operational"],
                ["scba", "SCBA Sets Complete"],
                ["hoses", "Hoses Functional"],
                ["radio", "Radio Communication Working"],
                ["water", "Water Supply Adequate"],
              ].map(([key, label]) => (
                <label key={key} className="check-row">
                  <input
                    type="checkbox"
                    checked={checklist[key]}
                    onChange={() => toggleItem(key)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Personnel & Station */}
          <div className="checklist-section">
            <h3 className="section-title">Personnel & Station</h3>
            <div className="checklist-items">
              {[
                ["crew", "Minimum Crew On Duty"],
                ["oic", "Officer-In-Charge Present"],
                ["driver", "Driver Available"],
                ["generator", "Generator Functional"],
              ].map(([key, label]) => (
                <label key={key} className="check-row">
                  <input
                    type="checkbox"
                    checked={checklist[key]}
                    onChange={() => toggleItem(key)}
                  />
                  <span>{label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Status Section */}
          <div className="status-section">
            <h3>Station Status</h3>
            <div className={`status-meter ${finalStatus.replace(" ", "").toLowerCase()}`}>
              <span>{finalStatus}</span>
              <span className="readiness-percent">{readinessPercentage}%</span>
            </div>
            <p className="status-note">Review your checklist before confirming readiness.</p>
            <button className="confirm-button" onClick={openConfirm}>
              Confirm Readiness
            </button>
          </div>

        </div>
      </div>

      {/* MODAL */}
      {modalOpen && (
        <ConfirmModal
          title="Submit Readiness?"
          message={`Your current station status is "${finalStatus}" with ${readinessPercentage}% readiness. Submit report to Headquarters?`}
          onConfirm={submitReadiness}
          onCancel={() => setModalOpen(false)}
        />
      )}
    </div>
  );
}
