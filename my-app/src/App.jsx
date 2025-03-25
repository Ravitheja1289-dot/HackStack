import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Chatbot from "./components/Chatbot";
import Portfolio from "./components/Portfolio";
import Charts from "./components/Charts";
// import Home from "./components/Home";
import Profile from "./components/Profile";
import Login from "./components/Login"; // Import the new Login component

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // Replace with your actual Google Client ID

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div className="app">
          {user && <Sidebar />}
          <div className="content">
            <Routes>
              {/* Public Routes */}
              <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} />

              {/* Protected Routes */}
              {user ? (
                <>
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/profile" element={<Profile user={user} handleLogout={handleLogout} />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </>
              ) : (
                // Redirect unauthenticated users to login
                <Route path="*" element={<Navigate to="/login" />} />
              )}
            </Routes>
          </div>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
