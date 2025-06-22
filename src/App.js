import React, { useState } from 'react';
import './App.css';
import Dashboard from './Dashboard';
import EquityTradeForm from './EquityTradeForm';
import ForexTradeForm from './ForexTradeForm';
import TradeModifier from './TradeModifier';
import TradeViewer from './TradeViewer';

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
        return <TradeViewer />;
      case 'modifier':
        return <TradeModifier />;
      default:
        return null;
    }
  };

  return (
    <div className="app">
      <div className="navbar">
        <div className="logo-container">
          <span className="platform-name">Barclays RDM</span>
        </div>
        <div className="nav-buttons">
          <button onClick={() => setActiveTab('dashboard')}>
            <span className="material-icons">dashboard</span> Dashboard
          </button>
          <button onClick={() => setActiveTab('equity')}>
            <span className="material-icons">trending_up</span> Equity Trades
          </button>
          <button onClick={() => setActiveTab('forex')}>
            <span className="material-icons">currency_exchange</span> Forex Trades
          </button>
          <button onClick={() => setActiveTab('viewer')}>
            <span className="material-icons">search</span> Trade Viewer
          </button>
          <button onClick={() => setActiveTab('modifier')}>
            <span className="material-icons">edit</span> Trade Modifier
          </button>
        </div>
      </div>
      {renderTab()}
    </div>
  );
}

export default App;