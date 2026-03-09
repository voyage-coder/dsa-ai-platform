import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router = express.Router();

router.post("/ai/chat", authMiddleware, async (req, res) => {
  try {

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const { question } = req.body;

    const result = await model.generateContent({
      contents: [
        {
          role: "user",
          parts: [
            {
              text: `You are a DSA tutor. Explain clearly with examples: ${question}`
            }
          ]
        }
      ]
    });

    const answer = result.response.text();

    res.json({ answer });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;