import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import './TradeForms.css';

const EquityTradeForm = () => {
  const initialForm = {
    tradeId: '',
    orderId: '',
    clientId: '',
    isin: '',
    symbol: '',
    tradeType: 'Buy',
    quantity: '',
    price: '',
    tradeValue: '',
    currency: '',
    tradeDate: '',
    settlementDate: '',
    settlementStatus: 'Pending',
    counterparty: '',
    tradingVenue: '',
    traderName: '',
    kycStatus: 'Pending',
    referenceValidated: 'No',
    commission: '',
    taxes: '',
    totalCost: '',
    confirmationStatus: 'Pending',
    country: '',
    opsNotes: '',
    pricingSource: '',
    marketImpactCost: '',
    fxRate: '',
    netAmount: '',
    collateralRequired: '',
    marginType: 'Variation',
    marginStatus: 'Pending'
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Equity Trade submitted!');
    console.log(form);
    setForm(initialForm);
  };

  return (
    <div className="form-box">
      <h2>Enter New Equity Trade</h2>
      <form onSubmit={handleSubmit}>
        <h4>Manual Entry</h4>

        <div className="form-row">
          <input name="tradeId" placeholder="Trade ID" value={form.tradeId} onChange={handleChange} />
          <input name="orderId" placeholder="Order ID" value={form.orderId} onChange={handleChange} />
          <input name="clientId" placeholder="Client ID" value={form.clientId} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input name="isin" placeholder="ISIN" value={form.isin} onChange={handleChange} />
          <input name="symbol" placeholder="Symbol" value={form.symbol} onChange={handleChange} />
          <select name="tradeType" value={form.tradeType} onChange={handleChange}>
            <option value="Buy">Buy</option>
            <option value="Sell">Sell</option>
          </select>
        </div>

        <div className="form-row">
          <input name="quantity" placeholder="Quantity" value={form.quantity} onChange={handleChange} />
          <input name="price" placeholder="Price" value={form.price} onChange={handleChange} />
          <input name="tradeValue" placeholder="Trade Value" value={form.tradeValue} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input name="currency" placeholder="Currency" value={form.currency} onChange={handleChange} />
          <input type="date" name="tradeDate" value={form.tradeDate} onChange={handleChange} />
          <input type="date" name="settlementDate" value={form.settlementDate} onChange={handleChange} />
        </div>

        <div className="form-row">
          <select name="settlementStatus" value={form.settlementStatus} onChange={handleChange}>
            <option>Pending</option>
            <option>Settled</option>
          </select>
          <input name="counterparty" placeholder="Counterparty" value={form.counterparty} onChange={handleChange} />
          <input name="tradingVenue" placeholder="Trading Venue" value={form.tradingVenue} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input name="traderName" placeholder="Trader Name" value={form.traderName} onChange={handleChange} />
          <select name="kycStatus" value={form.kycStatus} onChange={handleChange}>
            <option>Pending</option>
            <option>Completed</option>
          </select>
          <select name="referenceValidated" value={form.referenceValidated} onChange={handleChange}>
            <option>No</option>
            <option>Yes</option>
          </select>
        </div>

        <div className="form-row">
          <input name="commission" placeholder="Commission" value={form.commission} onChange={handleChange} />
          <input name="taxes" placeholder="Taxes" value={form.taxes} onChange={handleChange} />
          <input name="totalCost" placeholder="Total Cost" value={form.totalCost} onChange={handleChange} />
        </div>

        <div className="form-row">
          <select name="confirmationStatus" value={form.confirmationStatus} onChange={handleChange}>
            <option>Pending</option>
            <option>Confirmed</option>
          </select>
          <input name="country" placeholder="Country of Trade" value={form.country} onChange={handleChange} />
        </div>

        <div className="form-row full">
          <textarea name="opsNotes" placeholder="Ops Team Notes" value={form.opsNotes} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input name="pricingSource" placeholder="Pricing Source" value={form.pricingSource} onChange={handleChange} />
          <input name="marketImpactCost" placeholder="Market Impact Cost" value={form.marketImpactCost} onChange={handleChange} />
          <input name="fxRate" placeholder="FX Rate Applied" value={form.fxRate} onChange={handleChange} />
        </div>

        <div className="form-row">
          <input name="netAmount" placeholder="Net Amount" value={form.netAmount} onChange={handleChange} />
          <input name="collateralRequired" placeholder="Collateral Required" value={form.collateralRequired} onChange={handleChange} />
          <select name="marginType" value={form.marginType} onChange={handleChange}>
            <option value="Variation">Variation</option>
            <option value="Initial">Initial</option>
          </select>
        </div>

        <div className="form-row">
          <select name="marginStatus" value={form.marginStatus} onChange={handleChange}>
            <option value="Pending">Pending</option>
            <option value="Posted">Posted</option>
          </select>
        </div>

        <div className="form-row right">
          <button type="submit">Add Equity Trade</button>
        </div>
      </form>

      <div className="form-row full" style={{ background: '#e5f9e6', padding: '1rem', marginTop: '2rem', borderRadius: '6px' }}>
        <label>Upload CSV</label>
        <input type="file" />
        <p style={{ fontSize: '0.8rem', color: '#444' }}>
          Upload a CSV file containing equity trade data. Ensure column headers match the trade fields (e.g., "Trade ID", "ISIN").
        </p>
      </div>
    </div>
  );
};

export default EquityTradeForm;
