require("dotenv").config();
console.log("MONGO_URI:", process.env.MONGO_URI);
console.log("GEMINI_API_KEY:", process.env.GEMINI_API_KEY);
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB Connection Error:", err));

// Define Chat Schema & Model
const chatSchema = new mongoose.Schema({
    user: String,
    bot: String,
    timestamp: { type: Date, default: Date.now }
});

const Chat = mongoose.model("Chat", chatSchema);

// API to Handle Chat Requests
app.post("/chat", async (req, res) => {
    try {
        const { userMessage } = req.body;

        // Call Google Gemini API
        const response = await axios.post(
            `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateText?key=${process.env.GEMINI_API_KEY}`,
            { prompt: { text: userMessage }, temperature: 0.7 }
        );

        const aiResponse = response.data?.candidates?.[0]?.output || "Sorry, I couldn't process that.";

        // Save to MongoDB
        const chatEntry = new Chat({ user: userMessage, bot: aiResponse });
        const savedChat = await chatEntry.save();

        res.json({ message: aiResponse, timestamp: savedChat.timestamp });
    } catch (error) {
        console.error("Error in AI API:", error);
        res.status(500).json({ error: "Something went wrong" });
    }
});
 

// API to Fetch Chat History
app.get("/chat-history", async (req, res) => {
    try {
        const history = await Chat.find().sort({ timestamp: -1 }).limit(50); // Fetch last 50 messages
        res.json({ history });
    } catch (error) {
        console.error("Error fetching history:", error);
        res.status(500).json({ error: "Failed to fetch chat history" });
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


