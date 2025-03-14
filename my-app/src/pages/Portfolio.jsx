import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { TrendingUp, TrendingDown, DollarSign, BarChart3 } from "lucide-react";
// import "./index.css";
// import "./App.css";

const portfolioData = [
  { name: "Stocks", value: 45000, color: "#4CAF50" },
  { name: "Bonds", value: 15000, color: "#FF9800" },
  { name: "Mutual Funds", value: 25000, color: "#2196F3" },
  { name: "Real Estate", value: 20000, color: "#E91E63" },
  { name: "Cryptocurrency", value: 10000, color: "#9C27B0" },
];

const performanceData = [
  { name: "January", value: 5 },
  { name: "February", value: 3 },
  { name: "March", value: -2 },
  { name: "April", value: 8 },
  { name: "May", value: 6 },
  { name: "June", value: -1 },
];

const Portfolio = () => {
  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">📁 My Portfolio</h1>
      <p className="text-gray-400 mb-6">Track your assets, monitor investments, and analyze performance.</p>

      {/* Portfolio Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-5 rounded-lg shadow-md flex items-center">
          <DollarSign size={28} className="text-green-400" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Total Value</h2>
            <p className="text-gray-300">$115,000</p>
          </div>
        </div>

        <div className="bg-gray-800 p-5 rounded-lg shadow-md flex items-center">
          <TrendingUp size={28} className="text-blue-400" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Overall Growth</h2>
            <p className="text-gray-300">+12.5% this year</p>
          </div>
        </div>

        <div className="bg-gray-800 p-5 rounded-lg shadow-md flex items-center">
          <TrendingDown size={28} className="text-red-400" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Risk Level</h2>
            <p className="text-gray-300">Moderate</p>
          </div>
        </div>

        <div className="bg-gray-800 p-5 rounded-lg shadow-md flex items-center">
          <BarChart3 size={28} className="text-yellow-400" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Best Performing Asset</h2>
            <p className="text-gray-300">Stocks (+18%)</p>
          </div>
        </div>
      </div>

      {/* Asset Allocation */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-4">📊 Asset Allocation</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={portfolioData} cx="50%" cy="50%" outerRadius={100} dataKey="value">
              {portfolioData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Investment Performance */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-4">📈 Investment Performance</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 border border-gray-700">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Month</th>
                <th className="py-2 px-4 border-b">Return (%)</th>
              </tr>
            </thead>
            <tbody>
              {performanceData.map((data, index) => (
                <tr key={index} className="border-b border-gray-700">
                  <td className="py-2 px-4">{data.name}</td>
                  <td className={`py-2 px-4 ${data.value >= 0 ? "text-green-400" : "text-red-400"}`}>
                    {data.value}%
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Insights & Recommendations */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">💡 Investment Insights</h2>
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">📢 Diversify Your Portfolio</h3>
            <p className="text-gray-300">
              Consider allocating more funds to bonds and mutual funds to balance risk.
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">📉 Reduce High-Risk Investments</h3>
            <p className="text-gray-300">
              Your cryptocurrency exposure is high—consider shifting funds into stable assets.
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">📈 Top Growth Opportunities</h3>
            <p className="text-gray-300">
              Real estate investments have seen a 10% rise; consider increasing allocation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
