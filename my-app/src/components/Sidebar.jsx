import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './Sidebar.css';
import { 
  BarChart2, 
  MessageSquare, 
  PieChart, 
  ChartCandlestick, 
  TrendingUp, 
  User, 
  Settings, 
  LogOut,
  House
} from 'lucide-react';

const Sidebar = () => {
  const navigate = useNavigate(); // Hook for navigation
  const location = useLocation(); // Get the current route

  const menuItems = [
    { id: 'home', name: 'Home', icon: <House size={20} />, path: '/home' },
    { id: 'dashboard', name: 'Dashboard', icon: <BarChart2 size={20} />, path: '/dashboard' },
    { id: 'chatbot', name: 'AI Assistant', icon: <MessageSquare size={20} />, path: '/chatbot' },
    { id: 'portfolio', name: 'Portfolio', icon: <PieChart size={20} />, path: '/portfolio' },
    { id: 'charts', name: 'Charts', icon: <ChartCandlestick size={20} />, path: '/charts' },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <TrendingUp size={24} />
          {/* <a className="head-link" href="http://localhost:5174/dashboard"> */}
          <h1>Quantum Fin</h1>
          {/* </a> */}
        </div>
      </div>
      
      <div className="menu-items">
        {menuItems.map((item) => (
          <div 
            key={item.id}
            className={`menu-item ${location.pathname === item.path ? 'active' : ''}`} // Apply 'active' class
            onClick={() => navigate(item.path)} // Navigate on click
          >
            {item.icon}
            <span>{item.name}</span>
          </div>
        ))}
      </div>
      
      <div className="sidebar-footer">
        <div className="menu-item">
          <User size={20} />
          <span>Profile</span>
        </div>
        <div className="menu-item">
          <Settings size={20} />
          <span>Settings</span>
        </div>
        <div className="menu-item logout">
          <LogOut size={20} />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
