import React, { useState, useRef, useEffect } from 'react';
import './Chatbot.css';

const GEMINI_API_KEY = AIzaSyDyFUmT8OtZdJDHzc0R1Ro-pBdJrSjIkDc  ;

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isCapturingImage, setIsCapturingImage] = useState(false);
  
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const recognitionRef = useRef(null);
  const mediaStreamRef = useRef(null);
  
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      
      recognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        
        setInput(transcript);
      };
      
      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error', event.error);
        setIsListening(false);
      };
    } else {
      console.error('Speech recognition not supported in this browser');
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);
  
  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };
  
  const toggleCamera = async () => {
    if (isCapturingImage) {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsCapturingImage(false);
    } else {
      try {
        mediaStreamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStreamRef.current;
        }
        setIsCapturingImage(true);
      } catch (err) {
        console.error('Error accessing camera:', err);
        addMessage('System', 'Failed to access camera. Please check permissions.');
      }
    }
  };
  
  const sendMessageToGemini = async (text) => {
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDyFUmT8OtZdJDHzc0R1Ro-pBdJrSjIkDc`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text }]
            }
          ]
        })
      });
      
      const data = await response.json();
      
      if (data.error) {
        throw new Error(data.error.message || 'Unknown error from Gemini API');
      }
      
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Gemini API error:', error);
      return 'Error processing message: ' + error.message;
    }
  };
  
  const addMessage = (sender, text) => {
    setMessages(prevMessages => [...prevMessages, { sender, text, id: Date.now() }]);
  };
  
  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    addMessage('User', userMessage);
    setInput('');
    
    try {
      const response = await sendMessageToGemini(userMessage);
      addMessage('Gemini', response);
    } catch (error) {
      console.error('Error sending message:', error);
      addMessage('System', 'Failed to get response. Please try again.');
    }
  };
  
  return (
    <div className="app-container">
      <div className="chat-container">
        <div className="messages-container">
          {messages.map(message => (
            <div 
              key={message.id} 
              className={`message ${message.sender.toLowerCase()}-message`}
            >
              <div className="message-sender">{message.sender}</div>
              <div className="message-text">{message.text}</div>
            </div>
          ))}
        </div>
        
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="message-input"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <div className="controls">
            <button onClick={toggleListening} className={`control-button ${isListening ? 'active' : ''}`}>
              {isListening ? 'Stop Listening' : 'Start Listening'}
            </button>
            <button onClick={handleSendMessage} className="control-button">Send</button>
            <button onClick={toggleCamera} className={`control-button ${isCapturingImage ? 'active' : ''}`}>
              {isCapturingImage ? 'Stop Camera' : 'Start Camera'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;
