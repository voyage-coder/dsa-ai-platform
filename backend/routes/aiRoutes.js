import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "../models/Chat.js";

const router = express.Router();

router.post("/chat", authMiddleware, async (req, res) => {

  try {

    const { message, chatId } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent(message);

    const reply = result.response.text();

    let chat;

    if (chatId) {

      chat = await Chat.findById(chatId);

      chat.messages.push({ role: "user", text: message });
      chat.messages.push({ role: "ai", text: reply });

      await chat.save();

    } else {

      chat = await Chat.create({
        userId: req.user.id,
        messages: [
          { role: "user", text: message },
          { role: "ai", text: reply }
        ]
      });

    }

    res.json({
      reply,
      chatId: chat._id
    });

  }catch (error) {

  console.log("AI CHAT ERROR:", error);

  // Gemini quota exceeded
  if (error.status === 429) {

    return res.status(429).json({
      message: "AI request limit reached. Please wait a minute."
    });

  }

  res.status(500).json({
    message: "AI service unavailable."
  });

}
});

router.get("/history", authMiddleware, async (req, res) => {

  const chats = await Chat.find({
    userId: req.user.id
  }).sort({ createdAt: -1 });

  res.json(chats);

});

export default router;