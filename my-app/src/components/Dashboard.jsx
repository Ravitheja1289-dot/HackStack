import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ShieldAlert, TrendingUp, Wallet, MessageCircle } from "lucide-react";
import "./Dashboard.css";

const transactions = [
  { id: 1, date: "2025-03-10", amount: -500, category: "Shopping", fraud: false },
  { id: 2, date: "2025-03-12", amount: -100, category: "Groceries", fraud: false },
  { id: 3, date: "2025-03-14", amount: -2000, category: "Electronics", fraud: true },
];

const spendingData = [
  { month: "Jan", amount: 400 },
  { month: "Feb", amount: 600 },
  { month: "Mar", amount: 300 },
  { month: "Apr", amount: 700 },
];

export default function Dashboard() {
  const [search, setSearch] = useState("");

  return (
    <div className="dashboard">
      <h1 className="title">AI Financial Assistant</h1>
      <div className="grid-container">
        <div className="card">
          <Wallet size={32} className="icon green" />
          <h2>Balance: $10,500</h2>
        </div>
        <div className="card">
          <TrendingUp size={32} className="icon blue" />
          <h2>Investments: $5,000</h2>
        </div>
        <div className="card">
          <ShieldAlert size={32} className="icon red" />
          <h2>Fraud Alerts: 1</h2>
        </div>
      </div>
      <div className="chart-container">
        <h2>Spending Analysis</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={spendingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="month" stroke="#ccc" />
            <YAxis stroke="#ccc" />
            <Tooltip contentStyle={{ backgroundColor: "#333", borderColor: "#555" }} />
            <Line type="monotone" dataKey="amount" stroke="#38bdf8" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="transactions-container">
        <h2>Transactions</h2>
        <input
          type="text"
          placeholder="Search Transactions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-box"
        />
        <ul>
          {transactions
            .filter((t) => t.category.toLowerCase().includes(search.toLowerCase()))
            .map((t) => (
              <li key={t.id} className={`transaction ${t.fraud ? "fraud" : "normal"}`}>
                <span>{t.date}</span>
                <span>{t.category}</span>
                <span>${t.amount}</span>
              </li>
            ))}
        </ul>
      </div>
      <div className="assistant">
        <div className="assistant-info">
          <MessageCircle size={32} className="icon yellow" />
          <h2>AI Financial Assistant</h2>
        </div>
        <button className="chat-button">Chat Now</button>
      </div>
    </div>
  );
}
