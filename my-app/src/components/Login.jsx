import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Import the dark mode CSS

const Login = ({ setUser }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    localStorage.setItem("user", JSON.stringify(decoded));
    navigate("/dashboard"); // Redirect after login
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome To Quantum Fin</h2>
        <p style={{ color: "#b0b0b0", fontSize: "14px" }}>
          Login securely to access your dashboard
        </p>
        <div className="google-login-btn">
          <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log("Login Failed")} />
        </div>
      </div>
    </div>
  );
};

export default Login;
