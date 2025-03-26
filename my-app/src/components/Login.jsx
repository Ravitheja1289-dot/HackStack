import React, { useEffect } from "react";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./Login.css"; // Import CSS file

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; // Load client ID

const Login = ({ setUser }) => {
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleSuccess = (response) => {
    const userProfile = jwtDecode(response.credential);
    setUser(userProfile);
    localStorage.setItem("user", JSON.stringify(userProfile));
  };

  const handleFailure = () => {
    console.log("Login failed");
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Welcome Back!</h2>
        <p>Sign in with Google to continue</p>

        <div className="google-button">
          {clientId ? (
            <GoogleLogin clientId={clientId} onSuccess={handleSuccess} onError={handleFailure} />
          ) : (
            <p className="error">Google Client ID is missing!</p>
          )}
        </div>

        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Login;
