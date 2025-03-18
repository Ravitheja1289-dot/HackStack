import React, { useState } from 'react';
import { Bell, Lock, LogOut, User, ChevronRight, Shield, Moon, Settings } from 'lucide-react';
import './Profile.css';

const Profile = () => {
  const [activeSection, setActiveSection] = useState('personal');

  // Mock user data
  const userData = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    accountNumber: "****5678",
    joinDate: "Mar 2023",
    lastLogin: "Today, 10:45 AM",
    phoneNumber: "+1 (555) 123-4567",
    twoFactorEnabled: true,
    notificationsEnabled: {
      email: true,
      push: true,
      sms: false
    }
  };

  // Local state for toggles
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(userData.twoFactorEnabled);
  const [emailNotifications, setEmailNotifications] = useState(userData.notificationsEnabled.email);
  const [pushNotifications, setPushNotifications] = useState(userData.notificationsEnabled.push);
  const [smsNotifications, setSmsNotifications] = useState(userData.notificationsEnabled.sms);

  const renderProfileSettings = () => (
    <div className="section-content">
      <div className="profile-header">
        <div className="profile-avatar">
          <span>{userData.name.charAt(0)}</span>
        </div>
        <div className="profile-details">
          <h3>{userData.name}</h3>
          <p>{userData.email}</p>
          <p className="account-number">Account: {userData.accountNumber}</p>
        </div>
      </div>

      <div className="info-grid">
        <div className="info-item">
          <label>Email</label>
          <p>{userData.email}</p>
        </div>
        <div className="info-item">
          <label>Phone</label>
          <p>{userData.phoneNumber}</p>
        </div>
        <div className="info-item">
          <label>Member Since</label>
          <p>{userData.joinDate}</p>
        </div>
        <div className="info-item">
          <label>Last Login</label>
          <p>{userData.lastLogin}</p>
        </div>
      </div>

      <button className="edit-button">Edit Profile</button>
    </div>
  );

  const renderSecurity = () => (
    <div className="section-content">
      <div className="security-item">
        <div className="security-item-header">
          <Shield size={20} />
          <h4>Password</h4>
        </div>
        <p>Last changed 30 days ago</p>
        <button className="security-button">Change Password</button>
      </div>

      <div className="security-item">
        <div className="security-item-header">
          <Lock size={20} />
          <h4>Two-Factor Authentication</h4>
        </div>
        <div className="toggle-container">
          <span>Status: {twoFactorEnabled ? 'Enabled' : 'Disabled'}</span>
          <label className="toggle">
            <input 
              type="checkbox" 
              checked={twoFactorEnabled} 
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <p>Protect your account with an extra layer of security</p>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="section-content">
      <div className="notification-item">
        <div className="notification-header">
          <h4>Email Notifications</h4>
          <label className="toggle">
            <input 
              type="checkbox" 
              checked={emailNotifications} 
              onChange={() => setEmailNotifications(!emailNotifications)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <p>Receive account updates, security alerts, and transaction confirmations</p>
      </div>

      <div className="notification-item">
        <div className="notification-header">
          <h4>Push Notifications</h4>
          <label className="toggle">
            <input 
              type="checkbox" 
              checked={pushNotifications} 
              onChange={() => setPushNotifications(!pushNotifications)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <p>Get real-time alerts about account activity</p>
      </div>

      <div className="notification-item">
        <div className="notification-header">
          <h4>SMS Alerts</h4>
          <label className="toggle">
            <input 
              type="checkbox" 
              checked={smsNotifications} 
              onChange={() => setSmsNotifications(!smsNotifications)}
            />
            <span className="slider"></span>
          </label>
        </div>
        <p>Receive text message alerts for important updates</p>
      </div>
    </div>
  );

  return (
    <div className="profile-page">
      <div className="sidebar">
        <div className="logo">
          <h2><span>Profile</span></h2>
        </div>

        <nav className="nav-menu">
          <button 
            className={`nav-item ${activeSection === 'personal' ? 'active' : ''}`}
            onClick={() => setActiveSection('personal')}
          >
            <User size={20} />
            <span>Profile Settings</span>
            <ChevronRight size={16} className="nav-arrow" />
          </button>

          <button 
            className={`nav-item ${activeSection === 'security' ? 'active' : ''}`}
            onClick={() => setActiveSection('security')}
          >
            <Lock size={20} />
            <span>Security & Authentication</span>
            <ChevronRight size={16} className="nav-arrow" />
          </button>

          <button 
            className={`nav-item ${activeSection === 'notifications' ? 'active' : ''}`}
            onClick={() => setActiveSection('notifications')}
          >
            <Bell size={20} />
            <span>Notifications & Alerts</span>
            <ChevronRight size={16} className="nav-arrow" />
          </button>

          <button className="nav-item logout">
            <LogOut size={20} />
            <span>Logout</span>
          </button>
        </nav>
      </div>

      <main className="main-content">
        <header className="content-header">
          <h1>Profile Settings</h1>
          <p>Manage your account preferences and settings</p>
        </header>

        <div className="content-body">
          {activeSection === 'personal' && renderProfileSettings()}
          {activeSection === 'security' && renderSecurity()}
          {activeSection === 'notifications' && renderNotifications()}
        </div>
      </main>
    </div>
  );
};

export default Profile;
