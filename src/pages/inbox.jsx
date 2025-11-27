import React from 'react';
import '../style/inbox.css';

export default function Inbox() {
  const conversations = [
    {
      id: 1,
      name: 'Station 12 - Pasonanca',
      avatar: 'https://via.placeholder.com/60',
      preview: 'Reported a fire incident at...'
    },
    {
      id: 2,
      name: 'Station 4 - Putik',
      avatar: 'https://via.placeholder.com/60',
      preview: 'Update: Controlled warehouse fire...'
    }
  ];

  return (
    <div className="Main">
      <div className="top-right">
          <button className="notif-btn">🔔</button>
          <div className="user-pill">
            <div className="user-avatar" />
            <span className="user-name">shane</span>
          </div>
        </div>
        
      <div className="inbox-container">
        <div className="left-panel">
          <div className="panel-title">
              <h3>Inbox</h3>
          </div>
          <ul className="conversation-list">
            {conversations.map((item) => (
              <li key={item.id} className="conversation-item">
                <img src={item.avatar} alt={item.name} className="avatar" />
                <div>
                  <p className="name">{item.name}</p>
                  <p className="preview">{item.preview}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="right-panel">
          <div className="report-header">
            <h2>Report Details</h2>
          </div>
          <div className="report-content">
            <p>Select a station on the left to view detailed reports.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
