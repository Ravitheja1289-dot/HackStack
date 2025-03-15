import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Chatbot from './components/Chatbot';
import Portfolio from './components/Portfolio';
// import Resources from './components/Resources';
// import Stocks from './components/Stocks';
import Charts from './components/Charts';
import './App.css';

const App = () => {
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const renderComponent = () => {
    switch(activeComponent) {
      case 'dashboard':
        return <Dashboard />;
      case 'chatbot':
        return <Chatbot />;
      case 'portfolio':
        return <Portfolio />;
      case 'charts':
        return <Charts />;
      // case 'stocks':
      //   return <Stocks />;
      // default:
        // return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Sidebar activeComponent={activeComponent} setActiveComponent={setActiveComponent} />
      <div className="content">
        {renderComponent()}
      </div>
    </div>
  );
};

export default App;