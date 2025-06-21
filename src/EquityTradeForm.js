import React, { useState } from 'react';
import './App.css';
import * as XLSX from 'xlsx';

const EquityTradeForm = () => {
  const [form, setForm] = useState({
    tradeId: '',
    orderId: '',
    clientId: '',
    isin: '',
    symbol: '',
    quantity: '',
    price: '',
    tradeType: '',
    currency: '',
    tradeDate: '',
    settlementDate: '',
    counterparty: '',
    venue: '',
    traderName: '',
    country: '',
    referenceValidated: false,
    notes: ''
  });

  const [excelData, setExcelData] = useState([]);
  const [selectedColumns, setSelectedColumns] = useState([]);
  const [fixedColumnOrder, setFixedColumnOrder] = useState([]);
  const [selectAll, setSelectAll] = useState(true);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newRow = { ...form };
    const updatedData = [...excelData, newRow];
    setExcelData(updatedData);
    const allKeys = Array.from(new Set(updatedData.flatMap(row => Object.keys(row))));
    setSelectedColumns(allKeys);
    setFixedColumnOrder(allKeys);
    setSelectAll(true);

    setForm({
      tradeId: '',
      orderId: '',
      clientId: '',
      isin: '',
      symbol: '',
      quantity: '',
      price: '',
      tradeType: '',
      currency: '',
      tradeDate: '',
      settlementDate: '',
      counterparty: '',
      venue: '',
      traderName: '',
      country: '',
      referenceValidated: false,
      notes: ''
    });

    alert('Trade submitted and added to table!');
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
      const columns = Object.keys(jsonData[0] || {});
      setSelectedColumns(columns);
      setFixedColumnOrder(columns);
      setSelectAll(true);
      alert('Excel file parsed! Scroll down to see table.');
    };
    reader.readAsArrayBuffer(file);
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

  const handleSelectAllToggle = () => {
    if (selectAll) {
      setSelectedColumns([]);
      setSelectAll(false);
    } else {
      setSelectedColumns(fixedColumnOrder);
      setSelectAll(true);
    }
  };

  const downloadCSV = () => {
    const filteredData = excelData.map(row =>
      Object.fromEntries(Object.entries(row).filter(([key]) => selectedColumns.includes(key)))
    );
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'FilteredData');
    XLSX.writeFile(workbook, 'filtered_data.csv');
  };

  const getUniqueValues = (key) => {
    return Array.from(new Set(excelData.map(row => row[key]).filter(Boolean)));
  };

  return (
    <div>
      <h2>Equity Trade Data Entry</h2>
      <p>Enter equity trade details and reference data</p>
      <form onSubmit={handleSubmit} className="form-box">
        <div className="form-row">
          <input type="text" name="tradeId" placeholder="Trade ID" value={form.tradeId} onChange={handleChange} />
          <input list="orderIds" name="orderId" placeholder="Order ID" value={form.orderId} onChange={handleChange} />
          <datalist id="orderIds">
            {getUniqueValues('Order ID').map((val, idx) => (
              <option key={idx} value={val} />
            ))}
          </datalist>
          <input list="clientIds" name="clientId" placeholder="Client ID" value={form.clientId} onChange={handleChange} />
          <datalist id="clientIds">
            {getUniqueValues('Client ID').map((val, idx) => (
              <option key={idx} value={val} />
            ))}
          </datalist>
        </div>
        <div className="form-row">
          <input name="isin" placeholder="ISIN" value={form.isin} onChange={handleChange} />
          <input name="symbol" placeholder="Symbol" value={form.symbol} onChange={handleChange} />
        </div>
        <div className="form-row">
          <input type="number" name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
          <input type="number" name="price" placeholder="Price" value={form.price} onChange={handleChange} />
        </div>
        <div className="form-row">
          <select name="tradeType" value={form.tradeType} onChange={handleChange}>
            <option value="">Select trade type</option>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
          <select name="currency" value={form.currency} onChange={handleChange}>
            <option value="">Select currency</option>
            <option value="USD">USD</option>
            <option value="INR">INR</option>
            <option value="EUR">EUR</option>
          </select>
          <input type="date" name="tradeDate" value={form.tradeDate} onChange={handleChange} />
          <input type="date" name="settlementDate" value={form.settlementDate} onChange={handleChange} />
        </div>
        <div className="form-row">
          <select name="counterparty" value={form.counterparty} onChange={handleChange}>
            <option value="">Select counterparty</option>
            <option value="Citibank">Citibank</option>
            <option value="JPMorgan">JPMorgan</option>
            <option value="Goldman Sachs">Goldman Sachs</option>
          </select>
          <select name="venue" value={form.venue} onChange={handleChange}>
            <option value="">Select venue</option>
            <option value="IEX">IEX</option>
            <option value="NYSE">NYSE</option>
            <option value="NSE">NSE</option>
          </select>
          <input name="traderName" placeholder="Trader Name" value={form.traderName} onChange={handleChange} />
          <input name="country" placeholder="Country of Trade" value={form.country} onChange={handleChange} />
        </div>
        <div className="form-row checkbox-row">
          <input type="checkbox" id="referenceValidated" name="referenceValidated" checked={form.referenceValidated} onChange={handleChange} />
          <label htmlFor="referenceValidated">Reference Data Validated</label>
        </div>
        <div className="form-row full">
          <label htmlFor="fileUpload">Upload Excel/CSV File</label>
          <input
            type="file"
            id="fileUpload"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
            onChange={handleFileUpload}
          />
        </div>
        <div className="form-row full">
          <textarea name="notes" placeholder="Enter operational notes..." value={form.notes} onChange={handleChange} />
        </div>
        <div className="form-row right">
          <button type="submit">Submit Trade</button>
        </div>
      </form>

      {excelData.length > 0 && (
        <div className="excel-preview">
          <h3>📄 Uploaded Excel Data</h3>
          <div className="column-selector">
            <label style={{ fontWeight: 'bold' }}>
              <input type="checkbox" checked={selectAll} onChange={handleSelectAllToggle} />
              Select All
            </label>
            {fixedColumnOrder.map((col) => (
              <label key={col}>
                <input
                  type="checkbox"
                  checked={selectedColumns.includes(col)}
                  onChange={() => handleColumnToggle(col)}
                />
                {col}
              </label>
            ))}
          </div>
          <button className="download-button" onClick={downloadCSV}>
            ⬇️ Download Selected as CSV
          </button>
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

export default EquityTradeForm;