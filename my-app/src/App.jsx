// src/App.jsx
import React, { useState, useRef } from 'react';
import './App.css';
import { MessageCircle, Send, ArrowRight, Home, BookOpen, PieChart, HelpCircle, Search } from 'lucide-react';

function App() {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm FinanceGPT, your AI-powered financial assistant. How can I help you with your financial journey today?",
      sender: 'assistant'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [activeSidebar, setActiveSidebar] = useState(false);
  const [activeSection, setActiveSection] = useState('chat');
  const messagesEndRef = useRef(null);

  const sampleQuestions = [
    "What is the difference between mutual funds and stocks?",
    "How should I start investing with a small amount of money?",
    "Explain SIP investment to a beginner",
    "What tax benefits are available for investments in India?",
    "How do I plan for retirement in my 20s?"
  ];

  const sampleProducts = [
    { name: "Tax-saving ELSS Funds", category: "Mutual Funds", risk: "Moderate" },
    { name: "PPF (Public Provident Fund)", category: "Government Scheme", risk: "Low" },
    { name: "Sukanya Samriddhi Yojana", category: "Government Scheme", risk: "Low" },
    { name: "Corporate Fixed Deposits", category: "Fixed Income", risk: "Low-Moderate" },
    { name: "Nifty 50 Index Funds", category: "Mutual Funds", risk: "Moderate" }
  ];

  const handleSend = () => {
    if (inputValue.trim() === '') return;
    
    // Add user message
    const newMessages = [...messages, { text: inputValue, sender: 'user' }];
    setMessages(newMessages);
    setInputValue('');
    
    // Simulate AI response (in a real app, this would call an API)
    setTimeout(() => {
      let response;
      const userQuery = inputValue.toLowerCase();
      
      if (userQuery.includes('mutual fund') || userQuery.includes('stock')) {
        response = "Mutual funds pool money from many investors to buy a diversified portfolio managed by professionals. Stocks represent ownership in a specific company. Mutual funds offer diversification and professional management but have expense ratios, while stocks offer potentially higher returns but with greater risk and require more knowledge to select wisely.";
      } else if (userQuery.includes('sip') || userQuery.includes('systematic')) {
        response = "A Systematic Investment Plan (SIP) allows you to invest fixed amounts in mutual funds at regular intervals. This approach offers the benefits of rupee-cost averaging, discipline in investing, and compounding returns over time. SIPs are excellent for beginners as you can start with as little as ₹500 per month.";
      } else if (userQuery.includes('tax') || userQuery.includes('80c')) {
        response = "Under Section 80C of Income Tax Act, you can claim deductions up to ₹1.5 lakhs for investments in PPF, ELSS funds, tax-saving FDs, NPS, etc. Additionally, you can get deductions under Section 80D for health insurance premiums and under Section 24 for home loan interest. The LTCG tax on equity investments is 10% for gains above ₹1 lakh.";
      } else if (userQuery.includes('start') || userQuery.includes('beginner')) {
        response = "As a beginner in India, start by:\n1. Building an emergency fund covering 6 months of expenses\n2. Getting term life and health insurance\n3. Opening a demat account with a reputable broker\n4. Starting SIPs in 1-2 good index funds\n5. Learning consistently about personal finance\n\nYou can begin with as little as ₹500 per month in SIPs and gradually increase your investments as you learn more.";
      } else {
        response = "Thank you for your question. I'd be happy to help with your query about " + inputValue.trim() + ". In a fully implemented version, I would connect to a financial AI model trained on investment knowledge relevant to the Indian market. Would you like me to provide more specific information about any particular financial product or concept?";
      }
      
      setMessages([...newMessages, { text: response, sender: 'assistant' }]);
    }, 1000);
  };

  const handleQuestionClick = (question) => {
    setInputValue(question);
    handleSend();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  React.useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderSection = () => {
    switch (activeSection) {
      case 'chat':
        return (
          <div className="chat-container">
            <div className="messages">
              {messages.map((message, index) => (
                <div key={index} className={`message ${message.sender}`}>
                  <div className="message-bubble">{message.text}</div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="input-area">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about investing, saving, or financial planning..."
              />
              <button onClick={handleSend} className="send-button">
                <Send size={20} />
              </button>
            </div>
          </div>
        );
      case 'learn':
        return (
          <div className="learn-section">
            <h2>Financial Learning Hub</h2>
            <div className="search-bar">
              <Search size={20} />
              <input type="text" placeholder="Search for financial topics..." />
            </div>
            <div className="learning-categories">
              <div className="category-card">
                <h3>Investing Basics</h3>
                <p>Learn the fundamentals of investing in the Indian market</p>
                <button>Explore <ArrowRight size={16} /></button>
              </div>
              <div className="category-card">
                <h3>Tax Planning</h3>
                <p>Understand tax-saving investments and strategies</p>
                <button>Explore <ArrowRight size={16} /></button>
              </div>
              <div className="category-card">
                <h3>Retirement Planning</h3>
                <p>Build a secure financial future with proper planning</p>
                <button>Explore <ArrowRight size={16} /></button>
              </div>
              <div className="category-card">
                <h3>Stock Market</h3>
                <p>Learn how to analyze and invest in equities</p>
                <button>Explore <ArrowRight size={16} /></button>
              </div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div className="products-section">
            <h2>Recommended Financial Products</h2>
            <div className="product-filters">
              <select defaultValue="">
                <option value="" disabled>Category</option>
                <option>All Categories</option>
                <option>Mutual Funds</option>
                <option>Fixed Income</option>
                <option>Government Schemes</option>
                <option>Stocks</option>
              </select>
              <select defaultValue="">
                <option value="" disabled>Risk Level</option>
                <option>All Risk Levels</option>
                <option>Low</option>
                <option>Moderate</option>
                <option>High</option>
              </select>
            </div>
            <div className="product-cards">
              {sampleProducts.map((product, index) => (
                <div key={index} className="product-card">
                  <div className="product-header">
                    <h3>{product.name}</h3>
                    <span className={`risk-badge ${product.risk.toLowerCase()}`}>{product.risk}</span>
                  </div>
                  <p className="product-category">{product.category}</p>
                  <p>This is a placeholder description for {product.name}. In a real application, this would contain actual information about the product, its features, and benefits.</p>
                  <button>Learn More <ArrowRight size={16} /></button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="help-section">
            <h2>How to Use FinanceGPT</h2>
            <div className="help-content">
              <div className="help-item">
                <h3>Ask Any Financial Question</h3>
                <p>Just type your query in the chat and get instant, personalized financial guidance tailored to the Indian market</p>
              </div>
              <div className="help-item">
                <h3>Explore Learning Resources</h3>
                <p>Access curated financial education content to build your knowledge at your own pace</p>
              </div>
              <div className="help-item">
                <h3>Discover Suitable Products</h3>
                <p>Get recommendations for financial products that match your goals and risk tolerance</p>
              </div>
              <div className="help-item">
                <h3>Track Your Progress</h3>
                <p>In the full version, monitor your financial journey and growth over time</p>
              </div>
            </div>
            <div className="sample-questions">
              <h3>Try Asking:</h3>
              <ul>
                {sampleQuestions.map((question, index) => (
                  <li key={index} onClick={() => handleQuestionClick(question)}>
                    {question}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="app-container">
      <aside className={`sidebar ${activeSidebar ? 'active' : ''}`}>
        <div className="logo">
          <MessageCircle />
          <h1>FinanceGPT</h1>
        </div>
        <nav>
          <ul>
            <li className={activeSection === 'chat' ? 'active' : ''} onClick={() => setActiveSection('chat')}>
              <Home size={20} />
              <span>Chat</span>
            </li>
            <li className={activeSection === 'learn' ? 'active' : ''} onClick={() => setActiveSection('learn')}>
              <BookOpen size={20} />
              <span>Learn</span>
            </li>
            <li className={activeSection === 'products' ? 'active' : ''} onClick={() => setActiveSection('products')}>
              <PieChart size={20} />
              <span>Products</span>
            </li>
            <li className={activeSection === 'help' ? 'active' : ''} onClick={() => setActiveSection('help')}>
              <HelpCircle size={20} />
              <span>Help</span>
            </li>
          </ul>
        </nav>
        <div className="sidebar-footer">
          <p>© 2025 FinanceGPT</p>
          <p>AI-Powered Financial Guidance</p>
        </div>
      </aside>
      <main>
        <header>
          <button className="menu-toggle" onClick={() => setActiveSidebar(!activeSidebar)}>
            ☰
          </button>
          <h2>Your Financial Assistant</h2>
          <div className="user-profile">
            <span>Guest User</span>
            <div className="avatar">G</div>
          </div>
        </header>
        {renderSection()}
      </main>
    </div>
  );
}

export default App;