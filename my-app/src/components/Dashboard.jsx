import React from 'react';
import './Dashboard.css';
import { LineChart, PieChart, BarChart } from 'recharts';
import { 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Clock, 
  Calendar 
} from 'lucide-react';

const Dashboard = () => {
  // Sample data for charts
  const portfolioValue = [
    { name: 'Jan', value: 5000 },
    { name: 'Feb', value: 5600 },
    { name: 'Mar', value: 5400 },
    { name: 'Apr', value: 5900 },
    { name: 'May', value: 6300 },
    { name: 'Jun', value: 6800 },
    { name: 'Jul', value: 7200 },
  ];

  const assetAllocation = [
    { name: 'Stocks', value: 60 },
    { name: 'Bonds', value: 20 },
    { name: 'Cash', value: 10 },
    { name: 'Crypto', value: 5 },
    { name: 'Real Estate', value: 5 },
  ];

  const recentTransactions = [
    { id: 1, stock: 'AAPL', action: 'Buy', amount: '$2,500', date: 'Today, 10:30 AM' },
    { id: 2, stock: 'TSLA', action: 'Sell', amount: '$1,800', date: 'Yesterday, 3:45 PM' },
    { id: 3, stock: 'MSFT', action: 'Buy', amount: '$1,200', date: '02/28/2025, 11:20 AM' },
    { id: 4, stock: 'AMZN', action: 'Dividend', amount: '$120', date: '02/25/2025, 9:15 AM' },
  ];

  const marketInsights = [
    { id: 1, title: 'Market Volatility Alert', description: 'Increased market volatility expected due to upcoming Fed announcement', priority: 'high' },
    { id: 2, title: 'Tech Sector Outlook', description: 'Positive outlook for tech stocks based on recent AI advancements', priority: 'medium' },
    { id: 3, title: 'Dividend Stock Recommendations', description: 'Top 5 dividend stocks for income-focused investors', priority: 'medium' },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Financial Dashboard</h1>
        <div className="date-info">
          <Calendar size={16} />
          <span>March 11, 2025</span>
        </div>
      </div>

      <div className="quick-stats">
        <div className="stat-card">
          <div className="stat-icon positive">
            <Briefcase size={24} />
          </div>
          <div className="stat-info">
            <h3>Portfolio Value</h3>
            <h2>$72,450.65</h2>
            <p className="trend positive">
              <TrendingUp size={16} />
              <span>+4.2% ($2,945)</span>
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon positive">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h3>Total Returns</h3>
            <h2>$12,386.41</h2>
            <p className="trend positive">
              <TrendingUp size={16} />
              <span>+17.1% YTD</span>
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon negative">
            <AlertCircle size={24} />
          </div>
          <div className="stat-info">
            <h3>Risk Score</h3>
            <h2>72/100</h2>
            <p className="trend negative">
              <TrendingDown size={16} />
              <span>+5 pts (Moderate)</span>
            </p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <Clock size={24} />
          </div>
          <div className="stat-info">
            <h3>Next AI Update</h3>
            <h2>3 Hours</h2>
            <p>Market analysis pending</p>
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="card portfolio-chart">
          <div className="card-title">
            <TrendingUp size={18} />
            <h3>Portfolio Performance</h3>
          </div>
          <div className="chart-container">
            <LineChart width={600} height={250} data={portfolioValue}>
              {/* Chart components would go here in a complete implementation */}
            </LineChart>
          </div>
        </div>

        <div className="card asset-allocation">
          <div className="card-title">
            <PieChart size={18} />
            <h3>Asset Allocation</h3>
          </div>
          <div className="chart-container">
            <PieChart width={250} height={250} data={assetAllocation}>
              {/* Chart components would go here in a complete implementation */}
            </PieChart>
          </div>
          <div className="allocation-legend">
            {assetAllocation.map((item, index) => (
              <div key={index} className="legend-item">
                <div className={`color-box color-${index + 1}`}></div>
                <span>{item.name}</span>
                <span className="percentage">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="dashboard-row">
        <div className="card transactions">
          <div className="card-title">
            <DollarSign size={18} />
            <h3>Recent Transactions</h3>
          </div>
          <div className="transactions-list">
            {recentTransactions.map((transaction) => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-icon">
                  {transaction.action === 'Buy' ? (
                    <TrendingUp size={16} className="buy" />
                  ) : transaction.action === 'Sell' ? (
                    <TrendingDown size={16} className="sell" />
                  ) : (
                    <DollarSign size={16} className="dividend" />
                  )}
                </div>
                <div className="transaction-details">
                  <div className="transaction-top">
                    <span className="stock-name">{transaction.stock}</span>
                    <span className="transaction-amount">{transaction.amount}</span>
                  </div>
                  <div className="transaction-bottom">
                    <span className="transaction-type">{transaction.action}</span>
                    <span className="transaction-date">{transaction.date}</span>
                  </div>
                </div>
              </div>
            ))}
            <button className="button view-all">View All Transactions</button>
          </div>
        </div>

        <div className="card market-insights">
          <div className="card-title">
            <AlertCircle size={18} />
            <h3>AI Market Insights</h3>
          </div>
          <div className="insights-list">
            {marketInsights.map((insight) => (
              <div key={insight.id} className={`insight-item priority-${insight.priority}`}>
                <div className="insight-header">
                  <h4>{insight.title}</h4>
                  <span className={`priority priority-${insight.priority}`}>
                    {insight.priority}
                  </span>
                </div>
                <p>{insight.description}</p>
              </div>
            ))}
            <button className="button view-all">Generate More Insights</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;