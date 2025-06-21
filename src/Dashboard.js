import React from 'react';
import './Dashboard.css';

const Dashboard = () => (
  <div>
    <h2>Reference Data Health Dashboard</h2>
    <p style={{ color: 'gray' }}>Last updated: {new Date().toLocaleTimeString()}</p>

    <div className="card-wrapper">
      <div className="card">
        <p className="card-title">Missing Key Identifiers</p>
        <p className="card-value red">0</p>
        <p className="card-description">Requires immediate attention</p>
      </div>
      <div className="card">
        <p className="card-title">Daily Stale Entries</p>
        <p className="card-value orange">0</p>
        <p className="card-description">Not updated in 24+ hours</p>
      </div>
      <div className="card">
        <p className="card-title">24h Edit Volume</p>
        <p className="card-value green">0</p>
        <p className="card-description">Active data maintenance</p>
      </div>
    </div>
    <div className="alert-box">
      <h3>Smart Alerts</h3>
      <p className="success-text"> No active alerts. All systems are running smoothly.</p>
    </div>
  </div>
);

export default Dashboard; 