import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';
import { Send, Bot, User, HelpCircle, Mic, Image, Plus, X } from 'lucide-react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Financial Assistant. How can I help you today?",
      sender: 'bot',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef(null);
  
  const suggestions = [
    "How is my portfolio performing?",
    "What stocks should I invest in?",
    "Explain recent market trends",
    "Generate a financial report",
    "Analyze my spending habits"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    setShowSuggestions(false);
    
    // Simulate AI typing
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        text: generateResponse(input),
        sender: 'bot',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prevMessages => [...prevMessages, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    setShowSuggestions(false);
  };

  const generateResponse = (query) => {
    // In a real app, this would call an AI API
    const responses = [
      "Based on my analysis, your portfolio has grown by 4.2% in the last month, outperforming the S&P 500 by 1.3%. Your tech stocks are performing particularly well.",
      "I've analyzed recent market trends and identified 3 potential stocks for your portfolio: AAPL, MSFT, and GOOGL. Would you like a detailed analysis of each?",
      "The recent market volatility is mainly due to inflation concerns and potential interest rate changes. Let me break down how this might affect your investments.",
      "I've generated a comprehensive financial report for your portfolio. Your asset allocation looks well-balanced, though you might consider increasing your exposure to international markets.",
      "After analyzing your transactions, I've noticed that your spending on subscriptions has increased by 15% in the last quarter. Would you like me to suggest some potential savings?"
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <Bot size={24} />
          <h2>AI Financial Assistant</h2>
        </div>
        <div className="chatbot-actions">
          <button className="icon-button">
            <HelpCircle size={20} />
          </button>
        </div>
      </div>
      
      <div className="chat-container">
        <div className="messages">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`message ${message.sender === 'bot' ? 'bot' : 'user'}`}
            >
              <div className="message-avatar">
                {message.sender === 'bot' ? <Bot size={18} /> : <User size={18} />}
              </div>
              <div className="message-content">
                <div className="message-text">{message.text}</div>
                <div className="message-timestamp">{message.timestamp}</div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message bot typing">
              <div className="message-avatar">
                <Bot size={18} />
              </div>
              <div className="message-content">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
        
        {showSuggestions && (
          <div className="suggestions">
            {suggestions.map((suggestion, index) => (
              <div 
                key={index} 
                className="suggestion"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </div>
            ))}
          </div>
        )}
      </div>
      
      <div className="chat-input">
        <button className="input-action">
          <Plus size={20} />
        </button>
        <input
          type="text"
          placeholder="Ask me anything about your finances..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="input-action">
          <Mic size={20} />
        </button>
        <button 
          className={`send-button ${input.trim() !== '' ? 'active' : ''}`}
          onClick={handleSend}
          disabled={input.trim() === ''}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;