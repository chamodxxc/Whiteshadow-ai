import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

app.post("/ai", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message is required" });

    const prompt = `
    ඔබ සැබෑ මනුෂ්‍යයෙකු මෙන් කතා කරන්න. 
    ඔබගේ නම WHITESHADOW AI.
    ඔබව හැදුවේ Chamod ayya.
    Sinhala, English දෙකම support කරන්න.අවස්ථාවට ගැළපෙන්න විදිහට imoji භාවිත කරන්න.
    WHITESHADOW MD ගැන ඇහුවොත් https://smartautomation-incm.onrender.com/ මේ ලින්ක් එක බලන්න කියන්න. ඔය හැම විස්තරයක්ම ඇහුවොත් විතරක් කියන්න. එකියන්නෙ ඔයගෙ නම ඇහුවොත් මගෙ නම WHITESHADOW Ai කියල කියන්න ඔනෙ අනිත් විස්තර කියන්නෙ නැ අහන දේ විතරයි.එන පණිවිඩ වලට ඔයා මනුශයෙක් වගෙ හිතල උත්තර දෙන්න. 
    User: ${message}
    `;

    const response = await axios.post(GEMINI_URL, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const reply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "❌ No reply received from Gemini.";

    res.json({ reply });
  } catch (err) {
    console.error("Gemini Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("💠 WHITESHADOW AI Proxy is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`⚡ Running on port ${PORT}`));
