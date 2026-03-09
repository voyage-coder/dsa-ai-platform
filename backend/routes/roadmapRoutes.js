import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/roadmap", authMiddleware, (req, res) => {
  res.json({
    message: "DSA Roadmap",
    roadmap: [
      "Arrays",
      "Strings",
      "Recursion",
      "Linked List",
      "Stack",
      "Queue",
      "Trees",
      "Graphs"
    ]
  });
});


router.post("/roadmap/generate", authMiddleware, (req, res) => {

  const { level } = req.body;

  let roadmap = [];

  if (level === "beginner") {
    roadmap = ["Arrays", "Strings", "Recursion", "Hashing"];
  } 
  else if (level === "intermediate") {
    roadmap = ["Linked List", "Stack", "Queue", "Binary Search", "Trees"];
  } 
  else if (level === "advanced") {
    roadmap = ["Graphs", "Dynamic Programming", "Segment Tree", "Trie"];
  }

  res.json({
    level,
    roadmap
  });

});

export default router;