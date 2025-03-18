import { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { ShieldAlert, TrendingUp, Wallet, MessageCircle, Sun, Moon } from "lucide-react";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";

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

const pieData = [
  { name: "Shopping", value: 500 },
  { name: "Groceries", value: 100 },
  { name: "Electronics", value: 2000 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];


// const called=()=>{
  //   navigate("/chatbot");
  // }
  
export default function Dashboard() {
  const navigate=useNavigate();
  const [search, setSearch] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [balance, setBalance] = useState(0);
  const [investments, setInvestments] = useState(0);
  const [fraudAlerts, setFraudAlerts] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setBalance(10500);
      setInvestments(5000);
      setFraudAlerts(transactions.filter((t) => t.fraud).length);
    }, 500);
  }, []);

  return (
    <div className={`dashboard ${darkMode ? "dark-mode" : ""}`}>
      <div className="header">
        <h1 className="title">AI Financial Assistant</h1>
        {/* <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={24} /> : <Moon size={24} />}
        </button> */}
      </div>

      <div className="grid-container">
        <div className="card">
          <Wallet size={32} className="icon green" />
          <h2>Balance: ${balance.toLocaleString()}</h2>
        </div>
        <div className="card">
          <TrendingUp size={32} className="icon blue" />
          <h2>Investments: ${investments.toLocaleString()}</h2>
        </div>
        <div className={`card ${fraudAlerts > 0 ? "alert" : ""}`}>
          <ShieldAlert size={32} className="icon red" />
          <h2>Fraud Alerts: {fraudAlerts}</h2>
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

      <div className="pie-chart-container">
        <h2>Expense Distribution</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Legend />
          </PieChart>
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
        <button className="chat-button" onClick={() => navigate("/chatbot")}>
          <MessageCircle size={24} className="icon yellow" />
          Talk to Your AI Financial Assistant
        </button>
      </div>
    </div>
  );
}
