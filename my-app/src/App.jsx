import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Menu } from "lucide-react";
import "./index.css";
import "./App.css";
import Home from "./pages/Home.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import Stocks from "./pages/Stocks.jsx";
import Portfolio from "./pages/Portfolio.jsx";
import Calculator from "./pages/Calculator.jsx";
import Resources from "./pages/Resources.jsx";

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="flex h-screen bg-gray-900 text-white">
        {/* Sidebar */}
        <div className={`w-64 bg-gray-800 p-5 ${sidebarOpen ? "block" : "hidden"} md:block fixed h-full`}>
          <h2 className="text-2xl font-bold mb-6">FinAI Assistant</h2>
          <ul className="space-y-4">
            <li><Link to="/" className="block p-2 hover:bg-gray-700 rounded">Dashboard</Link></li>
            <li><Link to="/chatbot" className="block p-2 hover:bg-gray-700 rounded">AI Chatbot</Link></li>
            <li><Link to="/stocks" className="block p-2 hover:bg-gray-700 rounded">Stocks</Link></li>
            <li><Link to="/portfolio" className="block p-2 hover:bg-gray-700 rounded">Portfolio</Link></li>
            <li><Link to="/calculator" className="block p-2 hover:bg-gray-700 rounded">Investment Calculator</Link></li>
            <li><Link to="/resources" className="block p-2 hover:bg-gray-700 rounded">Resources</Link></li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-5 ml-64">
          {/* Mobile Sidebar Toggle */}
          <button className="md:hidden text-white mb-4" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <Menu size={24} />
          </button>

          {/* Routes for Pages */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/stocks" element={<Stocks />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
