import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import { Send, Bot, User, Trash2, Mic } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Financial Assistant. Ask me anything about finance!",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Function to send user message to the backend server
  const handleSend = async () => {
    if (input.trim() === "") return;

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: "user",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      const botMessage = {
        id: messages.length + 2,
        text: data.reply, // The response from the server
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: messages.length + 2,
          text: "⚠️ Error connecting to the server. Please try again later.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }

    setIsTyping(false);
  };

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot">
      <div className="chatbot-header">
        <div className="chatbot-title">
          <Bot size={24} />
          <h2>Finance AI Assistant</h2>
        </div>
        <button className="clear-button" onClick={() => setMessages([messages[0]])}>
          <Trash2 className="trash-btn" size={18} />
        </button>
      </div>
      <div className="chat-container">
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender === "bot" ? "bot" : "user"}`}>
              <div className="message-avatar">{message.sender === "bot" ? <Bot size={18} /> : <User size={18} />}</div>
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
      </div>
      <div className="chat-input">
        <input
          type="text"
          placeholder="Ask me about finance..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button className={`send-button ${input.trim() !== "" ? "active" : ""}`} onClick={handleSend} disabled={input.trim() === ""}>
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
