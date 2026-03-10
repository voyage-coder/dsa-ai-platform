import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  messages: [
    {
      role: String,
      text: String
    }
  ]

}, { timestamps: true });

export default mongoose.model("Chat", chatSchema);