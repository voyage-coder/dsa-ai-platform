import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import dns from 'dns';
import authRoutes from "./routes/authRoutes.js";
import protectedRoutes from "./routes/protectedRoutes.js";
import roadmapRoutes from "./routes/roadmapRoutes.js";
import topicRoutes from "./routes/topicRoutes.js"
import aiRoutes from "./routes/aiRoutes.js";
import leetcodeRoutes from "./routes/leetcodeRoutes.js";
import cors from "cors";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", protectedRoutes);
app.use("/api/roadmap", roadmapRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api", leetcodeRoutes);



app.get("/", (req, res) => {
  res.send("Server running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});