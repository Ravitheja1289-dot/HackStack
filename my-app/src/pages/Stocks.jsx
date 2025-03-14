import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
// import "./index.css";
// import "./App.css";

// Sample stock data (Replace this with real API data later)
const sampleStockData = [
  { name: "09:00", price: 120 },
  { name: "10:00", price: 130 },
  { name: "11:00", price: 125 },
  { name: "12:00", price: 135 },
  { name: "13:00", price: 140 },
  { name: "14:00", price: 138 },
  { name: "15:00", price: 142 },
];

const Stocks = () => {
  const [stockSymbol, setStockSymbol] = useState("");
  const [stockPrice, setStockPrice] = useState(null);
  const [chartData, setChartData] = useState(sampleStockData);

  useEffect(() => {
    // Simulated stock price change (Replace with real API data)
    const interval = setInterval(() => {
      setChartData((prevData) => [
        ...prevData.slice(1),
        { name: new Date().toLocaleTimeString().slice(0, 5), price: Math.floor(Math.random() * 20) + 120 },
      ]);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchStockPrice = () => {
    if (!stockSymbol.trim()) return;

    // Simulated API fetch (Replace this with a real API)
    const simulatedPrice = Math.floor(Math.random() * 2000) + 100;
    setStockPrice(simulatedPrice);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-4">Live Stock Market Trends</h2>

      {/* Search Stock */}
      <div className="flex items-center space-x-2 mb-6">
        <input
          type="text"
          className="p-2 bg-gray-800 rounded-lg text-white outline-none flex-grow"
          placeholder="Enter Stock Symbol (e.g., AAPL, TSLA, RELIANCE)"
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}
        />
        <button
          onClick={fetchStockPrice}
          className="px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Get Price
        </button>
      </div>

      {/* Display Stock Price */}
      {stockPrice !== null && (
        <div className="mb-6 p-4 bg-gray-800 rounded-lg">
          <p className="text-lg">
            Current Price of <span className="font-bold">{stockSymbol.toUpperCase()}</span>: ₹{stockPrice}
          </p>
        </div>
      )}

      {/* Stock Price Chart */}
      <div className="bg-gray-800 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Stock Price Trends</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <XAxis dataKey="name" stroke="#fff" />
            <YAxis stroke="#fff" />
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <Tooltip />
            <Line type="monotone" dataKey="price" stroke="#4CAF50" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Stocks;
