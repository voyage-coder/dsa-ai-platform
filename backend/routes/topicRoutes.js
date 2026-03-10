import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import TopicProgress from "../models/TopicProgress.js";

const router = express.Router();


// GET USER PROGRESS
router.get("/", authMiddleware, async (req, res) => {

  try {

    const progress = await TopicProgress.findOne({
      userId: req.user.id
    });

    res.json(progress || { completedTopics: [] });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to fetch progress"
    });

  }

});


// SAVE PROGRESS
router.post("/", authMiddleware, async (req, res) => {

  try {

    const { completedTopics } = req.body;

    let progress = await TopicProgress.findOne({
      userId: req.user.id
    });

    if (!progress) {

      progress = await TopicProgress.create({
        userId: req.user.id,
        completedTopics
      });

    } else {

      progress.completedTopics = completedTopics;

      await progress.save();

    }

    res.json(progress);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Failed to save progress"
    });

  }

});

export default router;