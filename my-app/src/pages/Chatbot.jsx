import React, { useState, useEffect, useRef } from "react";
// import "./index.css";
// import "./App.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I assist you with your investments today?" },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Function to handle user input and generate bot response
  const handleSendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { sender: "user", text: input };
    setMessages((prevMessages) => [...prevMessages, newMessage]);

    setInput("");

    // Simulate AI bot response
    setTimeout(() => {
      generateBotResponse(input);
    }, 1000);
  };

  // Function to generate bot responses
  const generateBotResponse = (userMessage) => {
    let botResponse = "I'm not sure about that. Can you provide more details?";

    if (userMessage.toLowerCase().includes("invest")) {
      botResponse = "Investing wisely involves understanding your risk tolerance. Are you looking for short-term or long-term investment options?";
    } else if (userMessage.toLowerCase().includes("stocks")) {
      botResponse = "Stock investments require proper research. I recommend checking the latest market trends and diversifying your portfolio.";
    } else if (userMessage.toLowerCase().includes("mutual funds")) {
      botResponse = "Mutual funds are a great way to invest passively. Would you like to learn about low-risk or high-return funds?";
    } else if (userMessage.toLowerCase().includes("crypto")) {
      botResponse = "Cryptocurrency is highly volatile. Do you need guidance on selecting safe coins or managing risk?";
    } else if (userMessage.toLowerCase().includes("loan")) {
      botResponse = "Are you looking for home loans, personal loans, or business loans? I can help you with eligibility and best options.";
    } else if (userMessage.toLowerCase().includes("insurance")) {
      botResponse = "Insurance is important for financial security. Are you interested in health, life, or vehicle insurance?";
    }

    const botMessage = { sender: "bot", text: botResponse };
    setMessages((prevMessages) => [...prevMessages, botMessage]);
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gray-900 text-white">
      <div className="flex-grow p-5 overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">AI Chatbot</h2>

        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg max-w-xs ${
                msg.sender === "user" ? "bg-blue-600 ml-auto" : "bg-gray-700"
              }`}
            >
              {msg.text}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 bg-gray-800 flex">
        <input
          type="text"
          className="flex-grow p-2 bg-gray-700 rounded-lg outline-none text-white"
          placeholder="Ask me about investments..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
