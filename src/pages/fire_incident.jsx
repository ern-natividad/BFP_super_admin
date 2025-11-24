import React from "react";
import "../style/fire_incident.css";

export default function FireIncident() {
  return (
    <div className="fire-incident-container">
      <div className="top-info-card">
        <div>
          <p className="label">Date</p>
          <p className="value">Apr 1, 2025</p>
        </div>

        <div>
          <p className="label">Time</p>
          <p className="value">9:41 AM</p>
        </div>

        <div>
          <p className="label">Status</p>
          <p className="status ongoing">On going</p>
        </div>

        <button className="end-call-btn">End Call</button>
      </div>

      <div className="content-area">

        <div className="map-placeholder">
          <p>Map Placeholder (API goes here)</p>
        </div>

        <div className="form-area">
          <h2 className="form-title">Fire Emergency Report</h2>

          <h4 className="section-label">CALLER INFO FORM</h4>

          <label>Caller’s Name</label>
          <input type="text" placeholder="Value" />

          <label>Type of Incident</label>
          <select>
            <option>Value</option>
            <option>example1</option>
            <option>example2</option>
            <option>example3</option>
          </select>

          <label>Location</label>
          <input type="text" placeholder="Value" />

          <label>Other Details / Remarks</label>
          <textarea placeholder="Value"></textarea>

          <button className="submit-btn">Submit</button>
        </div>

      </div>

      <div className="bottom-space"></div>
    </div>
  );
}
