import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Chatbot from "./components/Chatbot";
import Portfolio from "./components/Portfolio";
import Charts from "./components/Charts";
import Profile from "./components/Profile";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

const App = () => {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div className="app">
          <Sidebar />
          <div className="content">
            {console.log("Google Client ID:", clientId)}
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
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;