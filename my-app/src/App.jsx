import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Portfolio from './components/Portfolio';
import Charts from './components/Charts';
import Home from './components/Home';
import Profile from './components/Profile';
// import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/chatbot" element={<Chatbot />} />
            <Route path="/portfolio" element={<Portfolio />} />
            <Route path="/charts" element={<Charts />} />
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/profile" element={<Profile/>} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
