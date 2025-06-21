import React, { useState, useEffect } from 'react';
import './App.css';

const TradeViewer = () => {
  const [allTrades, setAllTrades] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTrades, setFilteredTrades] = useState([]);
  const [columns, setColumns] = useState([]);

  useEffect(() => {
    const equityTrades = JSON.parse(localStorage.getItem('equityTrades')) || [];
    const forexTrades = JSON.parse(localStorage.getItem('forexTrades')) || [];
    const all = [...equityTrades, ...forexTrades];
    setAllTrades(all);
    const columnSet = new Set();
    all.forEach(trade => {
      Object.keys(trade).forEach(col => columnSet.add(col));
    });
    setColumns(Array.from(columnSet));
    setFilteredTrades(all);
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const results = allTrades.filter((trade) =>
      Object.values(trade).some(val =>
        val?.toString().toLowerCase().includes(query)
      )
    );
    setFilteredTrades(results);
  };

  return (
    <div className="trade-viewer-root">
      <h2>Linked Trade Viewer</h2>
      <p>Find trades linked to specific reference data entries and trace issues</p>
      <div className="viewer-search">
        <input
          type="text"
          placeholder="Search by Trade ID, Symbol, or ISIN..."
          value={searchQuery}
          onChange={handleSearch}
        />
        <select>
          <option>All Types</option>
        </select>
      </div>
      {filteredTrades.length > 0 ? (
        <div className="viewer-table-container">
          <table className="viewer-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredTrades.map((trade, idx) => (
                <tr key={idx}>
                  {columns.map((col) => (
                    <td key={col}>{trade[col] || ''}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="viewer-empty">No trades found matching your criteria.</p>
      )}
    </div>
  );
};

export default TradeViewer;