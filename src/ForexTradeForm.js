// Paste this into your ForexTradeForm.js

import React, { useState } from 'react';
import './App.css';
import * as XLSX from 'xlsx';

const ForexTradeForm = () => {
  const initialForm = {
    TradeID: '',
    TraderID: '',
    CurrencyPair: '',
    FXRate: '',
    TradeDate: '',
    SettlementDate: '',
    NotionalAmount: '',
    BuySell: '',
    Broker: '',
    Custodian: '',
    ExceptionFlag: '',
    ExceptionNotes: ''
  };

  const fixedColumnOrder = [
    'TradeID', 'TraderID', 'CurrencyPair', 'FXRate',
    'BuySell', 'NotionalAmount', 'TradeDate', 'SettlementDate',
    'Broker', 'Custodian', 'ExceptionFlag', 'ExceptionNotes'
  ];

  const [form, setForm] = useState(initialForm);
  const [excelData, setExcelData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState(fixedColumnOrder);
  const [selectAll, setSelectAll] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? (checked ? 'Yes' : 'No') : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRow = { ...form };
    const updated = [...excelData, newRow];
    setExcelData(updated);
    setSelectedColumns(fixedColumnOrder);
    setSelectAll(true);
    setForm(initialForm);
    alert('Forex trade submitted!');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(jsonData);
      setSelectedColumns(fixedColumnOrder);
      setSelectAll(true);
      alert('Forex Excel parsed!');
    };
    reader.readAsArrayBuffer(file);
  };

  const handleSelectAllToggle = () => {
    if (selectAll) {
      setSelectedColumns([]);
      setSelectAll(false);
    } else {
      setSelectedColumns(fixedColumnOrder);
      setSelectAll(true);
    }
  };

  const handleColumnToggle = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter(col => col !== column));
      setSelectAll(false);
    } else {
      const updated = [...selectedColumns, column];
      setSelectedColumns(updated);
      setSelectAll(updated.length === fixedColumnOrder.length);
    }
  };

  const downloadCSV = () => {
    const filtered = excelData.map(row =>
      Object.fromEntries(
        fixedColumnOrder
          .filter((col) => selectedColumns.includes(col))
          .map((col) => [col, row[col]])
      )
    );
    const worksheet = XLSX.utils.json_to_sheet(filtered);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'ForexData');
    XLSX.writeFile(workbook, 'forex_data.csv');
  };

  return (
    <div>
      <h2>Forex Trade Data Entry</h2>
      <form onSubmit={handleSubmit} className="form-box">
        <div className="form-row">
          <input name="TradeID" placeholder="Trade ID" value={form.TradeID} onChange={handleChange} />
          <input name="TraderID" placeholder="Trader ID" value={form.TraderID} onChange={handleChange} />
        </div>
        <div className="form-row">
          <select name="CurrencyPair" value={form.CurrencyPair} onChange={handleChange}>
            <option value="">Select currency pair</option>
            <option value="EUR/USD">EUR/USD</option>
            <option value="USD/INR">USD/INR</option>
            <option value="JPY/USD">JPY/USD</option>
          </select>
          <input name="FXRate" placeholder="FX Rate" value={form.FXRate} onChange={handleChange} />
        </div>
        <div className="form-row">
          <select name="BuySell" value={form.BuySell} onChange={handleChange}>
            <option value="">Select trade type</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
          <input type="number" name="NotionalAmount" placeholder="Notional Amount" value={form.NotionalAmount} onChange={handleChange} />
        </div>
        <div className="form-row">
          <label>Trade Date</label>
          <input type="date" name="TradeDate" value={form.TradeDate} onChange={handleChange} />
          <label>Settlement Date</label>
          <input type="date" name="SettlementDate" value={form.SettlementDate} onChange={handleChange} />
        </div>
        <div className="form-row">
          <select name="Broker" value={form.Broker} onChange={handleChange}>
            <option value="">Select broker</option>
            <option value="ICAP">ICAP</option>
            <option value="GFI">GFI</option>
          </select>
          <select name="Custodian" value={form.Custodian} onChange={handleChange}>
            <option value="">Select custodian</option>
            <option value="BNY Mellon">BNY Mellon</option>
            <option value="Citi">Citi</option>
          </select>
        </div>
        <div className="form-row checkbox-row">
          <input type="checkbox" id="exceptionFlag" name="ExceptionFlag" checked={form.ExceptionFlag === 'Yes'} onChange={handleChange} />
          <label htmlFor="exceptionFlag">Exception Flag</label>
        </div>
        <div className="form-row full">
          <textarea name="ExceptionNotes" placeholder="Enter exception details..." value={form.ExceptionNotes} onChange={handleChange} />
        </div>
        <div className="form-row full">
          <label htmlFor="fileUpload">Upload Forex Excel File</label>
          <input type="file" id="fileUpload" accept=".csv, .xlsx" onChange={handleFileUpload} />
        </div>
        <div className="form-row right" style={{ gap: '1rem' }}>
          <button type="button" onClick={() => alert('Draft Saved!')}>Save Draft</button>
          <button type="submit">Submit Trade</button>
        </div>
      </form>

      {excelData.length > 0 && (
        <div className="excel-preview">
          <h3>📄 Uploaded Forex Data</h3>
          <div className="column-selector">
            <label style={{ fontWeight: 'bold' }}>
              <input type="checkbox" checked={selectAll} onChange={handleSelectAllToggle} />
              Select All
            </label>
            {fixedColumnOrder.map((col) => (
              <label key={col}>
                <input type="checkbox" checked={selectedColumns.includes(col)} onChange={() => handleColumnToggle(col)} />
                {col}
              </label>
            ))}
          </div>
          <button className="download-button" onClick={downloadCSV}>⬇️ Download CSV</button>
          <table>
            <thead>
              <tr>
                {fixedColumnOrder.filter(col => selectedColumns.includes(col)).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {excelData.map((row, idx) => (
                <tr key={idx}>
                  {fixedColumnOrder.filter(col => selectedColumns.includes(col)).map((col) => (
                    <td key={col}>{row[col]}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ForexTradeForm;