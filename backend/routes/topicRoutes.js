import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/topics", authMiddleware, (req, res) => {
  const topics = {
    beginner: [
      "Arrays",
      "Strings",
      "Recursion",
      "Hashing"
    ],
    intermediate: [
      "Linked List",
      "Stack",
      "Queue",
      "Binary Search"
    ],
    advanced: [
      "Trees",
      "Graphs",
      "Dynamic Programming",
      "Segment Tree"
    ]
  };

  res.json(topics);
});

export default router;