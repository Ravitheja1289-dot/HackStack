import './App.css';
import React from "react";

const App = () => {
  return (
    <div className="home-container">
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Quantum Fin</div>
        <ul className="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#login">Login</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section className="hero-section">
        <h1>Redefining Financial Intelligence</h1>
        <p>Quantum Fin harnesses the power of AI to simplify financial management, making smarter decisions effortless.</p>
        <div className="auth-buttons">
          <button className="login-btn">Login</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <h2>About Quantum Fin</h2>
        <p>
          In a world driven by data, Quantum Fin is your AI-powered financial assistant, helping you track, analyze, and optimize your finances effortlessly.  
          Our platform provides real-time insights tailored to your goals, ensuring a seamless financial journey.
        </p>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <h2>Why Choose Quantum Fin?</h2>
        <ul>
          <li>⚡ AI-driven financial insights</li>
          <li>📊 Real-time analytics & predictive modeling</li>
          <li>🔒 Secure, private, and encrypted transactions</li>
          <li>💡 Smart expense tracking & goal-based planning</li>
          <li>📈 Adaptive strategies for financial growth</li>
        </ul>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Take Control of Your Finances</h2>
        <p>Join Quantum Fin today and experience the future of financial intelligence.</p>
        <button className="get-started-btn">Get Started</button>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Quantum Fin. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
