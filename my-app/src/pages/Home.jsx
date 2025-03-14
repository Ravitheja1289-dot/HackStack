import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { TrendingUp, BarChart3, Users, DollarSign } from "lucide-react";
// import "./index.css";
// import "./App.css";
import "./Home.css";

const marketTrends = [
  { date: "Mar 1", value: 1200 },
  { date: "Mar 2", value: 1250 },
  { date: "Mar 3", value: 1300 },
  { date: "Mar 4", value: 1270 },
  { date: "Mar 5", value: 1350 },
  { date: "Mar 6", value: 1400 },
];

const Home = () => {
  return (
    <div className="p-6 bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">📊 Financial Dashboard</h1>
      <p className="text-gray-400 mb-6">
        Get an overview of the market, track your portfolio, and stay updated on investment trends.
      </p>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 p-5 rounded-lg shadow-md flex items-center">
          <TrendingUp size={28} className="text-green-400" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Market Growth</h2>
            <p className="text-gray-300">+8.2% this month</p>
          </div>
        </div>

        <div className="bg-gray-800 p-5 rounded-lg shadow-md flex items-center">
          <BarChart3 size={28} className="text-blue-400" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Top Stocks</h2>
            <p className="text-gray-300">AAPL, TSLA, MSFT</p>
          </div>
        </div>

        <div className="bg-gray-800 p-5 rounded-lg shadow-md flex items-center">
          <Users size={28} className="text-yellow-400" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">New Investors</h2>
            <p className="text-gray-300">+15,200 this week</p>
          </div>
        </div>

        <div className="bg-gray-800 p-5 rounded-lg shadow-md flex items-center">
          <DollarSign size={28} className="text-red-400" />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">Avg Investment</h2>
            <p className="text-gray-300">$3,500 per user</p>
          </div>
        </div>
      </div>

      {/* Market Trends Graph */}
      <div className="bg-gray-800 p-5 rounded-lg shadow-md mt-6">
        <h2 className="text-lg font-semibold mb-4">📈 Market Trends</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={marketTrends}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#ddd" />
            <YAxis stroke="#ddd" />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#4CAF50" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent News Section */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">📰 Financial News & Updates</h2>
        <div className="space-y-4">
          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">📢 New Investment Policies Announced</h3>
            <p className="text-gray-300">
              The government has introduced new policies to boost retail investments...
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">📉 Stock Market Dips Amid Global Tensions</h3>
            <p className="text-gray-300">
              The stock market saw a slight dip due to ongoing geopolitical issues...
            </p>
          </div>

          <div className="bg-gray-800 p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold">💰 Top 5 Stocks to Watch This Month</h3>
            <p className="text-gray-300">
              Analysts suggest keeping an eye on these promising stocks for long-term gains...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
