import mongoose from "mongoose";

const roadmapSchema = new mongoose.Schema({

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  roadmap: {

    phases: [
      {
        title: String,

        cards: [
          {
            topic: String,

            items: [String],

            problems: [
              {
                title: String,
                slug: String,
                difficulty: String
              }
            ]
          }
        ]
      }
    ]

  }

}, { timestamps: true });

export default mongoose.model("Roadmap", roadmapSchema);