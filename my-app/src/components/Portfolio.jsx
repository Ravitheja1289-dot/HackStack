import React, { useState } from 'react';
import './Portfolio.css';
import { 
  PieChart as PieIcon, 
  BarChart, 
  ArrowUpRight, 
  ArrowDownRight, 
  Briefcase, 
  Filter, 
  Download, 
  Plus, 
  Edit3, 
  Trash2 
} from 'lucide-react';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAddAsset, setShowAddAsset] = useState(false);

  // Sample data
  const portfolioAssets = [
    { id: 1, name: 'Apple Inc.', symbol: 'AAPL', shares: 15, price: 178.72, value: 2680.80, change: 1.24, allocation: 12.5 },
    { id: 2, name: 'Microsoft Corp.', symbol: 'MSFT', shares: 8, price: 415.50, value: 3324.00, change: 0.85, allocation: 15.5 },
    { id: 3, name: 'Amazon.com Inc.', symbol: 'AMZN', shares: 10, price: 178.35, value: 1783.50, change: -0.76, allocation: 8.3 },
    { id: 4, name: 'Alphabet Inc.', symbol: 'GOOGL', shares: 12, price: 147.68, value: 1772.16, change: 2.15, allocation: 8.3 },
    { id: 5, name: 'Tesla Inc.', symbol: 'TSLA', shares: 5, price: 175.21, value: 876.05, change: -2.34, allocation: 4.1 },
    { id: 6, name: 'Nvidia Corp.', symbol: 'NVDA', shares: 6, price: 925.63, value: 5553.78, change: 3.67, allocation: 25.8 },
    { id: 7, name: 'Meta Platforms Inc.', symbol: 'META', shares: 7, price: 485.58, value: 3399.06, change: 1.92, allocation: 15.8 },
    { id: 8, name: 'Netflix Inc.', symbol: 'NFLX', shares: 3, price: 625.34, value: 1876.02, change: 0.45, allocation: 8.7 },
  ];

  const totalValue = portfolioAssets.reduce((acc, asset) => acc + asset.value, 0);

  const calculateAllocation = (value) => {
    return ((value / totalValue) * 100).toFixed(1);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  const renderTab = () => {
    switch(activeTab) {
      case 'overview':
        return (
          <div className="portfolio-overview">
            <div className="portfolio-summary">
              <div className="summary-card">
                <h3>Total Value</h3>
                <h2>{formatCurrency(totalValue)}</h2>
                <p className="trend positive">
                  <ArrowUpRight size={16} />
                  <span>+4.2% ($902.35 today)</span>
                </p>
              </div>
              
              <div className="summary-card">
                <h3>Day Change</h3>
                <h2>+$902.35</h2>
                <p className="trend positive">
                  <ArrowUpRight size={16} />
                  <span>+4.2%</span>
                </p>
              </div>
              
              <div className="summary-card">
                <h3>Total Return</h3>
                <h2>+$5,248.67</h2>
                <p className="trend positive">
                  <ArrowUpRight size={16} />
                  <span>+32.3% all time</span>
                </p>
              </div>
              
              <div className="summary-card">
                <h3>Dividend Yield</h3>
                <h2>$486.23</h2>
                <p>2.26% annually</p>
              </div>
            </div>
            
            <div className="portfolio-allocation-chart">
              <div className="card">
                <div className="card-title">
                  <PieIcon size={18} />
                  <h3>Asset Allocation</h3>
                </div>
                <div className="allocation-chart-wrapper">
                  <div className="allocation-chart">
                    {/* Placeholder for chart - would be implemented with recharts in real app */}
                    <div className="chart-placeholder">
                      <div className="donut-chart"></div>
                    </div>
                  </div>
                  <div className="allocation-legend">
                    {portfolioAssets.map((asset, index) => (
                      <div key={asset.id} className="legend-item">
                        <div className={`color-box color-${(index % 8) + 1}`}></div>
                        <div className="legend-text">
                          <span className="asset-name">{asset.symbol}</span>
                          <span className="allocation-percent">{asset.allocation}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'assets':
        return (
          <div className="portfolio-assets">
            <div className="assets-header">
              <h3>Your Assets</h3>
              <div className="assets-actions">
                <button className="icon-button">
                  <Filter size={18} />
                </button>
                <button className="icon-button">
                  <Download size={18} />
                </button>
                <button className="button add-asset" onClick={() => setShowAddAsset(true)}>
                  <Plus size={18} />
                  <span>Add Asset</span>
                </button>
              </div>
            </div>
            
            <div className="assets-table-container">
              <table className="assets-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Symbol</th>
                    <th>Shares</th>
                    <th className="right-align">Price</th>
                    <th className="right-align">Value</th>
                    <th className="right-align">Change</th>
                    <th className="right-align">Allocation</th>
                    <th className="actions-column">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {portfolioAssets.map((asset) => (
                    <tr key={asset.id}>
                      <td>{asset.name}</td>
                      <td>{asset.symbol}</td>
                      <td>{asset.shares}</td>
                      <td className="right-align">{formatCurrency(asset.price)}</td>
                      <td className="right-align">{formatCurrency(asset.value)}</td>
                      <td className={`right-align ${asset.change >= 0 ? 'positive' : 'negative'}`}>
                        {asset.change >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        {asset.change}%
                      </td>
                      <td className="right-align">{asset.allocation}%</td>
                      <td className="actions-cell">
                        <button className="action-button">
                          <Edit3 size={14} />
                        </button>
                        <button className="action-button">
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {showAddAsset && (
              <div className="modal-overlay">
                <div className="modal">
                  <div className="modal-header">
                    <h3>Add New Asset</h3>
                    <button className="close-button" onClick={() => setShowAddAsset(false)}>
                      <X size={20} />
                    </button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label>Symbol</label>
                      <input type="text" placeholder="e.g. AAPL" />
                    </div>
                    <div className="form-group">
                      <label>Shares</label>
                      <input type="number" placeholder="Number of shares" />
                    </div>
                    <div className="form-group">
                      <label>Purchase Price</label>
                      <input type="number" placeholder="Price per share" />
                    </div>
                    <div className="form-group">
                      <label>Purchase Date</label>
                      <input type="date" />
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button className="button secondary" onClick={() => setShowAddAsset(false)}>Cancel</button>
                    <button className="button">Add Asset</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
        
      case 'performance':
        return (
          <div className="portfolio-performance">
            <div className="card">
              <div className="card-title">
                <BarChart size={18} />
                <h3>Historical Performance</h3>
              </div>
              <div className="performance-chart">
                {/* Placeholder for chart - would be implemented with recharts in real app */}
                <div className="chart-placeholder large">
                  <div className="line-chart"></div>
                </div>
              </div>
              <div className="time-selector">
                <button className="time-button active">1D</button>
                <button className="time-button">1W</button>
                <button className="time-button">1M</button>
                <button className="time-button">3M</button>
                <button className="time-button">1Y</button>
                <button className="time-button">5Y</button>
                <button className="time-button">All</button>
              </div>
            </div>
            
            <div className="performance-stats">
              <div className="stats-card">
                <h3>Return Metrics</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Total Return</span>
                    <span className="stat-value positive">+32.3%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Annual Return</span>
                    <span className="stat-value positive">+14.8%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">1 Month Return</span>
                    <span className="stat-value positive">+3.2%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">1 Year Return</span>
                    <span className="stat-value positive">+18.5%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">3 Year Return</span>
                    <span className="stat-value positive">+64.7%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Dividend Return</span>
                    <span className="stat-value">2.26%</span>
                  </div>
                </div>
              </div>
              
              <div className="stats-card">
                <h3>Risk Metrics</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-label">Volatility</span>
                    <span className="stat-value">18.4%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Sharpe Ratio</span>
                    <span className="stat-value">1.28</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Beta</span>
                    <span className="stat-value">1.12</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Alpha</span>
                    <span className="stat-value positive">+2.34%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Max Drawdown</span>
                    <span className="stat-value negative">-15.6%</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">R-Squared</span>
                    <span className="stat-value">0.82</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return <div>Overview</div>;
    }
  };

  return (
    <div className="portfolio">
      <div className="portfolio-header">
        <div className="portfolio-title">
          <Briefcase size={24} />
          <h1>My Portfolio</h1>
        </div>
        <div className="portfolio-tabs">
          <button 
            className={`tab-button ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-button ${activeTab === 'assets' ? 'active' : ''}`}
            onClick={() => setActiveTab('assets')}
          >
            Assets
          </button>
          <button 
            className={`tab-button ${activeTab === 'performance' ? 'active' : ''}`}
            onClick={() => setActiveTab('performance')}
          >
            Performance
          </button>
        </div>
      </div>
      
      <div className="portfolio-content">
        {renderTab()}
      </div>
    </div>
  );
};

export default Portfolio;