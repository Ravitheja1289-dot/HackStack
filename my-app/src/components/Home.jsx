import React, { useState, useEffect } from 'react';
import { Instagram, Twitter, Linkedin, Menu, X } from 'lucide-react';
import './Home.css';

const Home = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scrolling effect for the navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMenu = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuName);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    if (!mobileMenuOpen) {
      setActiveMenu(null);
    }
  };

  return (
    <div className="app-container">
      {/* Header/Navigation */}
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <div className="logo">
            <span className="logo-text"></span>
          </div>
          
          <div className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </div>
          
          <nav className={`desktop-nav ${mobileMenuOpen ? 'mobile-open' : ''}`}>

            
            <div className="auth-buttons">
              <button className="log-in-btn">Log in</button>
              <button className="sign-up-btn">Sign up</button>
            </div>
          </nav>
        </div>
      </header>

      {/* Landing Page */}
      <div className="landing-page">
        <div className="hero-overlay"></div>
        <div className="content-container">
          <h1 className="title">Quantum-Fin</h1>
          <p className="tagline">
            Empowering Investors with AI: A Scalable Solution for Financial Literacy in India
          </p>
          <p className="subtitle">
            Revolutionize your investment journey with AI-powered insights tailored for the Indian market
          </p>
          <div className="cta-buttons">
            <button className="primary-btn">Get Started</button>
            <button className="secondary-btn">Learn More</button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="section-title">Why Choose Quantum-Fin?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🧠</div>
            <h3>AI-Powered Insights</h3>
            <p>Advanced algorithms analyze market trends specifically for Indian investors</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Personalized Portfolio</h3>
            <p>Custom investment strategies based on your financial goals and risk tolerance</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Platform</h3>
            <p>Bank-grade security to protect your financial data and investments</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Responsive Design</h3>
            <p>Seamless experience across all devices, from mobile to desktop</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Quantum-Fin</h3>
            <p>Making financial wisdom accessible to all Indians</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-column">
              <h4>Company</h4>
              <a href="#">About Us</a>
              <a href="#">Careers</a>
              <a href="#">Press</a>
            </div>
            
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#">Blog</a>
              <a href="#">Guides</a>
              <a href="#">FAQ</a>
            </div>
            
            <div className="footer-column">
              <h4>Legal</h4>
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
            </div>
          </div>
          
          <div className="social-links">
            <Instagram size={20} />
            <Twitter size={20} />
            <Linkedin size={20} />
          </div>
        </div>
        
        <div className="copyright">
          <p>&copy; {new Date().getFullYear()} Quantum-Fin. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;