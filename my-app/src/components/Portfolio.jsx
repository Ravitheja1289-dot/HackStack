import React, { useState, useEffect } from 'react';
import './Portfolio.css';
import { useNavigate } from "react-router-dom";
import { Pie } from 'recharts';
import { PieChart, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ArrowUpRight, ArrowDownRight, TrendingUp, Activity, History, MessageCircle, DollarSign } from 'lucide-react';

const Portfolio = () => {
  const navigate=useNavigate();
  // Sample portfolio data - in a real app this would come from an API
  const [portfolioData, setPortfolioData] = useState({
    totalValue: 124850.75,
    dayChange: 1250.50,
    dayChangePercent: 1.01,
    totalReturn: 24850.75,
    totalReturnPercent: 24.85,
    lastUpdated: new Date().toLocaleString(),
  });

  // Investment breakdown data
  const [investmentBreakdown, setInvestmentBreakdown] = useState([
    { name: 'Stocks', value: 62450.25, color: '#4ade80' },
    { name: 'Crypto', value: 31250.50, color: '#3b82f6' },
    { name: 'ETFs', value: 18750.00, color: '#a855f7' },
    { name: 'Bonds', value: 12400.00, color: '#f97316' },
  ]);

  // Transaction history
  const [transactions, setTransactions] = useState([
    { id: 1, type: 'BUY', asset: 'AAPL', amount: '5 shares', value: '$980.25', date: '2025-03-16', status: 'completed' },
    { id: 2, type: 'SELL', asset: 'BTC', amount: '0.15 BTC', value: '$1,245.30', date: '2025-03-15', status: 'completed' },
    { id: 3, type: 'BUY', asset: 'VOO', amount: '2 shares', value: '$850.00', date: '2025-03-14', status: 'completed' },
    { id: 4, type: 'DIVIDEND', asset: 'MSFT', amount: '', value: '$32.50', date: '2025-03-13', status: 'completed' },
    { id: 5, type: 'BUY', asset: 'ETH', amount: '1.2 ETH', value: '$3,600.00', date: '2025-03-12', status: 'completed' },
  ]);

  // Function to handle chatbot redirect
  const redirectToChatbot = () => {
    // alert('Redirecting to AI Financial Assistant Chatbot...'); 
    navigate("/chatbot");
    // In a real app, use window.location.href or router navigation
  };

  return (
    <div className="financial-portfolio">
      <header className="portfolio-header">
        <h1>Financial Portfolio Dashboard</h1>
        <div className="last-updated">
          Last updated: {portfolioData.lastUpdated}
        </div>
      </header>

      <section className="portfolio-summary">
        <div className="summary-card main-value">
          <div className="card-title">
            <DollarSign size={20} />
            <h2>Total Portfolio Value</h2>
          </div>
          <div className="value-display">
            ${portfolioData.totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
        </div>

        <div className="summary-card">
          <div className="card-title">
            <Activity size={20} />
            <h2>Day Change</h2>
          </div>
          <div className={`value-display ${portfolioData.dayChange >= 0 ? 'positive' : 'negative'}`}>
            {portfolioData.dayChange >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
            ${Math.abs(portfolioData.dayChange).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="percent">({portfolioData.dayChangePercent}%)</span>
          </div>
        </div>

        <div className="summary-card">
          <div className="card-title">
            <TrendingUp size={20} />
            <h2>Total Return</h2>
          </div>
          <div className={`value-display ${portfolioData.totalReturn >= 0 ? 'positive' : 'negative'}`}>
            {portfolioData.totalReturn >= 0 ? <ArrowUpRight size={20} /> : <ArrowDownRight size={20} />}
            ${Math.abs(portfolioData.totalReturn).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            <span className="percent">({portfolioData.totalReturnPercent}%)</span>
          </div>
        </div>
      </section>

      <div className="portfolio-details">
        <section className="investment-breakdown">
          <h2>Investment Breakdown</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={investmentBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {investmentBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => ['$' + value.toLocaleString('en-US', { minimumFractionDigits: 2 })]} 
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="breakdown-table">
            {investmentBreakdown.map((item) => (
              <div key={item.name} className="breakdown-item">
                <div className="item-name">
                  <span className="color-indicator" style={{ backgroundColor: item.color }}></span>
                  {item.name}
                </div>
                <div className="item-value">${item.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
              </div>
            ))}
          </div>
        </section>

        <section className="transaction-history">
          <h2>Transaction History</h2>
          <div className="transaction-list">
            <div className="transaction-header">
              <div>Type</div>
              <div>Asset</div>
              <div>Amount</div>
              <div>Value</div>
              <div>Date</div>
            </div>
            {transactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className={`transaction-type ${transaction.type.toLowerCase()}`}>{transaction.type}</div>
                <div className="transaction-asset">{transaction.asset}</div>
                <div className="transaction-amount">{transaction.amount}</div>
                <div className="transaction-value">{transaction.value}</div>
                <div className="transaction-date">{transaction.date}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="chatbot-section">
        <button className="chatbot-button" onClick={redirectToChatbot}>
          <MessageCircle size={20} />
          Talk to Your AI Financial Assistant
        </button>
      </div>
    </div>
  );
};

export default Portfolio;