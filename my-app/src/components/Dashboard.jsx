import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';
import { 
  Briefcase, 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  AlertCircle, 
  Clock, 
  Calendar 
} from 'lucide-react';

const API_KEY = 'VVGY1JVBQLRWCUBM';
const Dashboard = () => {
  const [stocks, setStocks] = useState(['AAPL', 'TSLA']);
  const [portfolioData, setPortfolioData] = useState([]);

  const fetchStockData = async () => {
    const promises = stocks.map(async (stock) => {
      try {
        const response = await axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${stock}&interval=5min&apikey=${API_KEY}`);
        const timeSeries = response.data['Time Series (5min)'];
        if (!timeSeries) return null;

        const latestTime = Object.keys(timeSeries)[0];
        return {
          name: stock,
          value: parseFloat(timeSeries[latestTime]['1. open'])
        };
      } catch (error) {
        console.error('Error fetching stock data:', error);
        return null;
      }
    });

    const results = await Promise.all(promises);
    setPortfolioData(results.filter(data => data !== null));
  };

  useEffect(() => {
    fetchStockData();
    const interval = setInterval(fetchStockData, 6000); // Refresh every minute
    return () => clearInterval(interval);
  }, [stocks]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Real-Time Portfolio</h1>
        <div className="date-info">
          <Calendar size={16} />
          <span>{new Date().toLocaleDateString()}</span>
        </div>
      </div>

      <div className="stock-input">
        <input 
          type="text" 
          placeholder="Enter stock symbols (comma-separated)" 
          onBlur={(e) => setStocks(e.target.value.split(',').map(s => s.trim().toUpperCase()))} 
        />
      </div>

      <div className="card portfolio-chart">
        <h3>Portfolio Performance</h3>
        <LineChart width={600} height={300} data={portfolioData}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>

      <div className="card asset-allocation">
        <h3>Asset Allocation</h3>
        <PieChart width={250} height={250}>
          <Pie data={portfolioData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8">
            {portfolioData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042'][index % 4]} />
            ))}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
};

export default Dashboard;
