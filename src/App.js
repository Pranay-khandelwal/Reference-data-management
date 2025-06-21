import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import EquityTradeForm from './EquityTradeForm';
import ForexTradeForm from './ForexTradeForm';
import TradeModifier from './TradeModifier';
import TradeViewer from './TradeViewer'; // ✅ Correct default import

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'equity':
        return <EquityTradeForm />;
      case 'forex':
        return <ForexTradeForm />;
      case 'viewer':
        return <TradeViewer />; // ✅ FIXED: removed conflicting "Coming Soon"
      case 'modifier':
        return <TradeModifier />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div className="nav-buttons">
        <button onClick={() => setActiveTab('dashboard')}>Dashboard</button>
        <button onClick={() => setActiveTab('equity')}>Equity Trades</button>
        <button onClick={() => setActiveTab('forex')}>Forex Trades</button>
        <button onClick={() => setActiveTab('viewer')}>Trade Viewer</button>
        <button onClick={() => setActiveTab('modifier')}>Trade Modifier</button>
      </div>
      {renderTab()}
    </div>
  );
}

export default App;