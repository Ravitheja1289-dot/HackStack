import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import { Send, Bot, User, Trash2, Mic } from "lucide-react";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your AI Assistant. I analyze financial text using FinBERT. How can I help you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);

  // Function to send user message to Flask API
  const handleSend = async () => {
    if (input.trim() === "") return;

    // Add user message
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
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const data = await response.json();

      // Format bot response
      let sentimentResponse = `Sentiment: <strong>${data.sentiment}</strong> <br><br> Confidence: ${data.confidence.toFixed(2)}`;

      // Add bot response
      const botMessage = {
        id: messages.length + 2,
        text: sentimentResponse,
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
          text: "⚠️ Error connecting to FinBERT API. Please try again later.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    }

    setIsTyping(false);
  };

  // Function to start voice recognition
  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    recognitionRef.current.continuous = false;
    recognitionRef.current.interimResults = false;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onstart = () => {
      setIsRecording(true);
    };

    recognitionRef.current.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
    };

    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    recognitionRef.current.start();
  };

  // Function to clear chat
  const clearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your AI Assistant. I analyze financial text using FinBERT. How can I help you today?",
        sender: "bot",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  // Scroll to bottom when new messages are added
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chatbot">
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-title">
          <Bot size={24} />
          <h2>FinBERT Assistant</h2>
        </div>
        <button className="clear-button" onClick={clearChat}>
          <Trash2 className="trash-btn" size={18} />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="chat-container">
        <div className="messages">
          {messages.map((message) => (
            <div key={message.id} className={`message ${message.sender === "bot" ? "bot" : "user"}`}>
              <div className="message-avatar">{message.sender === "bot" ? <Bot size={18} /> : <User size={18} />}</div>
              <div className="message-content">
                <div className="message-text" dangerouslySetInnerHTML={{ __html: message.text.replace(/\n/g, "<br>") }}></div>
                <div className="message-timestamp">{message.timestamp}</div>
              </div>
            </div>
          ))}

          {/* Typing Indicator */}
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

      {/* Chat Input */}
      <div className="chat-input">
        <button className="mic-button" onClick={startListening}>
          <Mic className="mic-btn" size={20} color={isRecording ? "red" : "white"} />
        </button>
        <input
          type="text"
          placeholder="Enter financial news or statement..."
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
