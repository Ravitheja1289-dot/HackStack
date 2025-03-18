import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Chatbot from "./components/Chatbot";
import Portfolio from "./components/Portfolio";
import Charts from "./components/Charts";
import Home from "./components/Home";
import Profile from "./components/Profile";

const clientId = "597400534990-sorf2tm37o3hv7nn8aqfjtffm8dr24li.apps.googleusercontent.com"; // Replace with your actual Google Client ID

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Retrieve user from localStorage on page load
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    localStorage.setItem("user", JSON.stringify(decoded)); // Store user in localStorage
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // Remove user from localStorage
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <Router>
        <div className="app">
          {/* Show Sidebar only if user is logged in */}
          {user && <Sidebar />}
          <div className="content">
            <Routes>
              {/* Show Login Page if not authenticated */}
              <Route
                path="/home"
                element={
                  user ? (
                    <Navigate to="/dashboard" />
                  ) : (
                    <div style={{ textAlign: "center", marginTop: "50px" }}>
                      <h2>Login with Google</h2>
                      <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log("Login Failed")} />
                    </div>
                  )
                }
              />

              {/* Protected Routes (Require Authentication) */}
              {user ? (
                <>
                  <Route path="/home" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/chatbot" element={<Chatbot />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/charts" element={<Charts />} />
                  <Route path="/profile" element={<Profile user={user} handleLogout={handleLogout} />} />
                  <Route path="/" element={<Navigate to="/dashboard" />} />
                </>
              ) : (
                // Redirect to login if user tries to access a protected route
                <Route path="*" element={<Navigate to="/home" />} />
              )}
            </Routes>
          </div>
        </div>
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
