import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './App.css';
import './TradeForms.css';

const ForexTradeForm = () => {
  const initialForm = {
    TradeID: '', TraderID: '', CurrencyPair: '', FXRate: '',
    TradeDate: '', SettlementDate: '', NotionalAmount: '',
    BuySell: '', Broker: '', Custodian: '',
    ExceptionFlag: '', ExceptionNotes: ''
  };

  const fixedColumnOrder = Object.keys(initialForm);
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
    setExcelData(prev => [...prev, newRow]);
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
    setSelectAll(!selectAll);
    setSelectedColumns(selectAll ? [] : fixedColumnOrder);
  };

  const handleColumnToggle = (col) => {
    if (selectedColumns.includes(col)) {
      setSelectedColumns(selectedColumns.filter(c => c !== col));
      setSelectAll(false);
    } else {
      const updated = [...selectedColumns, col];
      setSelectedColumns(updated);
      setSelectAll(updated.length === fixedColumnOrder.length);
    }
  };

  const downloadCSV = () => {
    const filtered = excelData.map(row =>
      Object.fromEntries(fixedColumnOrder.filter(col => selectedColumns.includes(col)).map(col => [col, row[col]]))
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
        {/* Input rows */}
        {/* File upload and table */}
      </form>
    </div>
  );
};

export default ForexTradeForm;