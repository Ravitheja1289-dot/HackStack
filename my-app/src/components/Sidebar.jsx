import React from 'react';
import './Sidebar.css';
import { 
  BarChart2, 
  MessageSquare, 
  PieChart, 
  BookOpen, 
  TrendingUp,
  User,
  Settings,
  LogOut,
  ChartCandlestick 
} from 'lucide-react';

const Sidebar = ({ activeComponent, setActiveComponent }) => {
  const menuItems = [
    { id: 'dashboard', name: 'Dashboard', icon: <BarChart2 size={20} /> },
    { id: 'chatbot', name: 'AI Assistant', icon: <MessageSquare size={20} /> },
    { id: 'portfolio', name: 'Portfolio', icon: <PieChart size={20} /> },
    { id: 'charts', name: 'Charts', icon: <ChartCandlestick size={20} /> },
    // { id: 'stocks', name: 'Stocks', icon: <TrendingUp size={20} /> },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <TrendingUp size={24} />
          <h1>FinAI</h1>
        </div>
      </div>
      
      <div className="menu-items">
        {menuItems.map((item) => (
          <div 
            key={item.id}
            className={`menu-item ${activeComponent === item.id ? 'active' : ''}`}
            onClick={() => setActiveComponent(item.id)}
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