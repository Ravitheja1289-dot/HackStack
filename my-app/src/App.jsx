import "./App.css";
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Chatbot from "./components/Chatbot";
import Portfolio from "./components/Portfolio";
import Charts from "./components/Charts";
import Profile from "./components/Profile";
import LoginPage from "./components/LoginPage";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        {isLoggedIn ? (
          <div className="app">
            <Sidebar />
            <div className="content">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chatbot" element={<Chatbot />} />
                <Route path="/portfolio" element={<Portfolio />} />
                <Route path="/charts" element={<Charts />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/" element={<Navigate to="/dashboard" />} />
              </Routes>
            </div>
          </div>
        ) : (
          <LoginPage setIsLoggedIn={setIsLoggedIn} />
        )}
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
