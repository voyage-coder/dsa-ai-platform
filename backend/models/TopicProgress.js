import mongoose from "mongoose";

const topicProgressSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  completedTopics: {
    type: [String],
    default: []
  }

}, { timestamps: true });

export default mongoose.model("TopicProgress", topicProgressSchema);