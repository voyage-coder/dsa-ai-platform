import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Roadmap from "../models/Roadmap.js";

const router = express.Router();

router.post("/generate", authMiddleware, async (req, res) => {

  try {

    const { level } = req.body;

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash"
    });

    const prompt = `
Create a Data Structures and Algorithms learning roadmap for a ${level} learner.

Return ONLY JSON in this format:

{
 "phases":[
  {
   "title":"Phase name",
   "cards":[
     {
       "topic":"Topic name",
       "items":["subtopic1","subtopic2","subtopic3"]
     }
   ]
  }
 ]
}

Rules:
- Generate 3 to 5 phases
- Each phase should contain 3 to 6 topic cards
- Each topic card should contain 3 to 5 learning items
- Do NOT include explanations
- Return ONLY JSON
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    console.log("AI RAW:", text);

    // extract JSON safely
    const jsonMatch = text.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
      return res.status(500).json({
        message: "AI returned invalid format"
      });
    }

    const roadmap = JSON.parse(jsonMatch[0]);

    res.json({ roadmap });

  } catch (error) {

  console.error("ROADMAP ERROR:", error);

  if (error.status === 429) {
    return res.status(429).json({
      message: "AI request limit reached. Please wait a few seconds."
    });
  }

  res.status(500).json({
    message: "Failed to generate roadmap"
  });

}

});

router.post("/store", authMiddleware, async (req, res) => {

  try {

    const { roadmap } = req.body;

    const savedRoadmap = await Roadmap.create({
      userId: req.user.id,
      roadmap
    });

    res.json({
      message: "Roadmap stored successfully",
      savedRoadmap
    });

  } catch (error) {

    console.log("STORE ERROR:", error);

    res.status(500).json({
      message: "Failed to store roadmap"
    });

  }

});

router.get("/my", authMiddleware, async (req, res) => {

  console.log("MY ROADMAP ROUTE HIT");

  const roadmaps = await Roadmap.find({
    userId: req.user.id
  }).sort({ createdAt: -1 });

  res.json(roadmaps);
});

router.get("/:id", authMiddleware, async (req, res) => {

  const roadmap = await Roadmap.findById(req.params.id);

  res.json(roadmap);

});

router.delete("/:id", authMiddleware, async (req, res) => {

  try {

    const roadmap = await Roadmap.findById(req.params.id);

    if (!roadmap) {
      return res.status(404).json({
        message: "Roadmap not found"
      });
    }

    // only owner can delete
    if (roadmap.userId.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Unauthorized"
      });
    }

    await roadmap.deleteOne();

    res.json({
      message: "Roadmap deleted successfully"
    });

  } catch (error) {

    console.log("DELETE ERROR:", error);

    res.status(500).json({
      message: "Failed to delete roadmap"
    });

  }

});

export default router;