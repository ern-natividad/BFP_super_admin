import { useState } from "react";
import { useStatus } from "../context/StatusContext";
import ConfirmModal from "../components/ConfirmModal";
import "../style/incidentReport.css";
import "../style/confirmModal.css";

export default function IncidentReport() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    location: "",
    incidentType: "",
    alarmLevel: "Alarm 0 — Normal",
    narrative: ""
  });

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  // Use status context
  const { updateAlarmLevel } = useStatus();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Update status when alarm level changes
    if (name === "alarmLevel") {
      updateAlarmLevel(value);
    }
  };

  const handleSubmitClick = () => {
    // Show confirmation modal
    setShowConfirmModal(true);
  };

  const handleConfirmSubmit = () => {
    // Here you would normally submit the form data
    console.log("Incident Report Submitted:", formData);
    
    // Close modal
    setShowConfirmModal(false);
    
    // Reset form or redirect as needed
    setFormData({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      location: "",
      incidentType: "",
      alarmLevel: "Alarm 0 — Normal",
      narrative: ""
    });
  };

  const handleCancelSubmit = () => {
    setShowConfirmModal(false);
  };

  return (
    <div className="incident-wrapper">

      <div className="incident-container">

        {/* LEFT — MAP */}
        <div className="incident-map">
          <div className="map-box">
            <p className="map-error">
              Google Maps API key missing — map cannot load.
            </p>
            
          </div>
        </div>

        {/* RIGHT — FORM */}
        <div className="incident-form">
          
          <h2 className="section-title">Caller Information</h2>

          <div className="form-row">
            <div className="form-item">
              <label>First Name</label>
              <input 
                type="text" 
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="Enter first name" 
              />
            </div>
            <div className="form-item">
              <label>Last Name</label>
              <input 
                type="text" 
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Enter last name" 
              />
            </div>
          </div>

          <div className="form-item">
            <label>Caller Phone Number</label>
            <input 
              type="text" 
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              placeholder="09xx xxx xxxx" 
            />
          </div>

          <h2 className="section-title">Location</h2>
          <div className="form-item">
            <label>Exact Location</label>
            <input 
              type="text" 
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              placeholder="House number, street, barangay" 
            />
          </div>

          <h2 className="section-title">Incident Details</h2>

          <div className="form-item">
            <label>Type of Incident</label>
            <select 
              name="incidentType"
              value={formData.incidentType}
              onChange={handleInputChange}
            >
              <option value="">Select Type</option>
              <option value="Fire">Fire</option>
              <option value="Medical Emergency">Medical Emergency</option>
            </select>
          </div>

          <div className="form-item">
            <label>Alarm Level</label>
            <select 
              name="alarmLevel"
              value={formData.alarmLevel}
              onChange={handleInputChange}
            >
              <option value="Alarm 0 — Normal">Alarm 0 — Normal</option>
              <option value="Alarm 1">Alarm 1</option>
              <option value="Alarm 2">Alarm 2</option>
              <option value="Alarm 3">Alarm 3</option>
            </select>
          </div>

          <div className="form-item">
            <label>Narrative Report</label>
            <textarea 
              name="narrative"
              value={formData.narrative}
              onChange={handleInputChange}
              placeholder="Describe the situation..."
            ></textarea>
          </div>

          <div className="form-buttons">
            <button className="cancel-btn">Cancel</button>
            <button className="submit-btn" onClick={handleSubmitClick}>
              Submit Report
            </button>
          </div>

        </div> {/* END FORM */}

      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <ConfirmModal
          title="Confirm Incident Report"
          message={`Are you sure you want to send this incident report? This will change the station readiness to ${formData.alarmLevel} and notify all responding units.`}
          onConfirm={handleConfirmSubmit}
          onCancel={handleCancelSubmit}
        />
      )}

    </div>
  );
}

