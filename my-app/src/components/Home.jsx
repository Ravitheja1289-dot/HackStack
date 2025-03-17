import React, { useState } from 'react';
import './QuantumFin.css';

// Social Media Icons
import { Instagram, Twitter, Linkedin } from 'lucide-react';

const QuantumFin = () => {
  const [activeMenu, setActiveMenu] = useState(null);
  
  const toggleMenu = (menuName) => {
    if (activeMenu === menuName) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menuName);
    }
  };

  return (
    <div className="app-container">
      {/* Landing Page */}
      <div className="landing-page">
        <div className="content-container">
          <h1 className="title">Quantum-Fin</h1>
          <p className="tagline">
            "Empowering Investors with AI: A Scalable Solution for Financial Literacy in India"
          </p>
          <div className="auth-buttons">
            <button className="sign-up-btn">Sign-up</button>
            <button className="log-in-btn">Log in</button>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="navigation-menu">
        <div className="social-icons">
          <Instagram size={20} />
          <Twitter size={20} />
          <Linkedin size={20} />
        </div>

        <div className="menu-columns">
          <div className="menu-column">
            <div className="menu-header" onClick={() => toggleMenu('ui')}>
              UI design
            </div>
            {activeMenu === 'ui' && (
              <div className="menu-items">
                <div className="menu-item">UX design</div>
                <div className="menu-item">Wireframing</div>
                <div className="menu-item">Programming</div>
                <div className="menu-item">Brainstorming</div>
                <div className="menu-item">Online dashboard</div>
                <div className="menu-item">Team collaboration</div>
              </div>
            )}
          </div>

          <div className="menu-column">
            <div className="menu-header" onClick={() => toggleMenu('design')}>
              Design
            </div>
            {activeMenu === 'design' && (
              <div className="menu-items">
                <div className="menu-item">Prototyping</div>
                <div className="menu-item">Development features</div>
                <div className="menu-item">Design systems</div>
                <div className="menu-item">Collaboration features</div>
                <div className="menu-item">Design process</div>
                <div className="menu-item">Tokens</div>
              </div>
            )}
          </div>

          <div className="menu-column">
            <div className="menu-header" onClick={() => toggleMenu('help')}>
              Help
            </div>
            {activeMenu === 'help' && (
              <div className="menu-items">
                <div className="menu-item">Best practices</div>
                <div className="menu-item">Plugins</div>
                <div className="menu-item">Color wheel</div>
                <div className="menu-item">Support</div>
                <div className="menu-item">Developers</div>
                <div className="menu-item">Resource library</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuantumFin;