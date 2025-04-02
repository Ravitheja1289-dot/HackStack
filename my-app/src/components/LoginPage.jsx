import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import "./Login.css";

const LoginPage = ({ onLoginSuccess }) => {
  const handleLogin = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("User Info:", decoded);

    // Store login status
    localStorage.setItem("isLoggedIn", "true");
    onLoginSuccess();
  };

  const handleLoginFailure = () => {
    console.error("Google login failed");
  };

  return (
    <div className="login-container">
      <div className="login-intro">
        <h1>Welcome to Quantum Fin</h1>
        <p>AI-powered financial intelligence at your fingertips.</p>
      </div>

      <div className="login-box">
        <h2>Sign in to continue</h2>
        <GoogleLogin
          onSuccess={handleLogin}
          onError={handleLoginFailure}
        />
      </div>
    </div>
  );
};

export default LoginPage;
