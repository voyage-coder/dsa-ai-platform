import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "../models/Chat.js";

const router = express.Router();

const dsaKeywords = [
  "array",
  "string",
  "linked list",
  "stack",
  "queue",
  "tree",
  "binary tree",
  "graph",
  "dynamic programming",
  "dp",
  "recursion",
  "sorting",
  "binary search",
  "algorithm",
  "data structure",
  "time complexity",
  "space complexity",
  "hashing",
  "heap",
  "trie",
  "segment tree",
  "backtracking",
  "dfs",
  "bfs",
  "leetcode",
  "coding",
  "programming"
];

router.post("/chat", authMiddleware, async (req, res) => {

  try {

    const { message, chatId } = req.body;

    const lowerMessage = message.toLowerCase();

    const isDSAQuestion = dsaKeywords.some(keyword =>
      lowerMessage.includes(keyword)
    );

    if (!isDSAQuestion) {

      return res.json({
        reply:
          "⚠️ This chatbot only answers questions related to Data Structures and Algorithms.",
        chatId
      });

    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const result = await model.generateContent({
  contents: [
    {
      role: "user",
      parts: [
        {
          text: `
You are an expert Data Structures and Algorithms tutor.

You ONLY answer questions related to:
- Data Structures
- Algorithms
- Competitive programming
- Coding interview preparation
- LeetCode problems
- Time complexity
- Space complexity

If the user asks something unrelated to DSA, programming, or algorithms,
reply ONLY with this message:

"⚠️ This chatbot is designed only for Data Structures and Algorithms questions. Please ask something related to coding, algorithms, or DSA topics."

User Question:
${message}
`
        }
      ]
    }
  ]
});

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