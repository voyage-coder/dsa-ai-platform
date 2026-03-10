# 🚀 DSA AI Platform

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![AI](https://img.shields.io/badge/AI-Gemini-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

An **AI-powered learning platform** designed to help users master **Data Structures and Algorithms (DSA)** through personalized roadmaps, topic tracking, LeetCode practice integration, and an AI-based doubt-solving chatbot.

Built using the **MERN Stack + Google Gemini AI**.

---

# 🌐 Live Demo

Frontend
https://dsa-ai-platform.vercel.app/

Backend API
https://dsa-ai-platform.onrender.com

---

# ✨ Features

## 🔐 Secure Authentication

* User signup and login
* JWT based authentication
* Protected dashboard routes
* Secure API access using authentication middleware

---

## 🧠 AI Roadmap Generator

Generate **personalized DSA learning roadmaps** using **Gemini AI**.

Users can choose learning level:

* Beginner
* Intermediate
* Advanced

Each roadmap contains:

* Structured learning phases
* Topic cards
* Concepts to learn
* AI-recommended practice problems

---

## 🧩 AI Recommended LeetCode Problems

Each roadmap topic includes **AI-selected LeetCode problems** to practice.

Example:

Arrays

* Two Sum (Easy)
* Maximum Subarray (Medium)
* Container With Most Water (Medium)

Users can click the problem to open it directly on **LeetCode**.

---

## 💾 Save & Manage Roadmaps

Users can:

* Save generated roadmaps
* View saved roadmaps
* Delete saved roadmaps
* Access roadmaps anytime

All roadmaps are stored in **MongoDB Atlas**.

---

## 📚 DSA Topic Tracker

Track progress across key DSA topics.

### Beginner

* Arrays
* Strings
* Hashing
* Recursion
* Sorting
* Binary Search

### Intermediate

* Linked List
* Stack
* Queue
* Binary Tree
* Binary Search Tree
* Heap

### Advanced

* Graph
* Dynamic Programming
* Trie
* Segment Tree
* Disjoint Set
* Backtracking

User progress is saved in the database.

---

## 🤖 AI Doubt Solver Chatbot

Ask any **DSA-related question** and get explanations instantly.

Features:

* Powered by **Google Gemini AI**
* DSA-specific responses only
* Chat history saved in database
* Previous conversations visible in sidebar
* Markdown formatted responses
* Real-time chat interface

The chatbot only answers questions related to:

* Data Structures
* Algorithms
* Coding interview preparation
* Competitive programming

---

## 📱 Responsive UI

Fully responsive design built with **Tailwind CSS**.

Works smoothly on:

* Mobile
* Tablet
* Desktop

---

# 🛠 Tech Stack

## Frontend

* React (Vite)
* Tailwind CSS
* Axios
* React Markdown
* React Router

---

## Backend

* Node.js
* Express.js
* MongoDB Atlas
* Mongoose
* JWT Authentication

---

## AI Integration

* Google Gemini API

Used for:

* Roadmap generation
* Chatbot responses
* AI-recommended problem suggestions

---

# 🚀 Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |
| AI       | Gemini        |

---

# ⚙️ Environment Variables

## Backend `.env`

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## Frontend `.env`

```
VITE_API_URL=http://localhost:5000
```

Production:

```
VITE_API_URL=https://dsa-ai-platform.onrender.com
```

---

# 🖥 Running Locally

## Clone Repository

```
git clone https://github.com/voyage-coder/dsa-ai-platform.git
cd dsa-ai-platform
```

---

## Start Backend

```
cd backend
npm install
node server.js
```

---

## Start Frontend

```
cd frontend
npm install
npm run dev
```

Open in browser:

```
http://localhost:5173
```

---

# 🧪 API Routes

## Authentication

```
POST /api/auth/signup
POST /api/auth/login
```

---

## Roadmaps

```
POST /api/roadmap/generate
POST /api/roadmap/store
GET /api/roadmap/my
GET /api/roadmap/:id
DELETE /api/roadmap/:id
```

---

## Topics Progress

```
GET /api/topics
POST /api/topics
```

---

## AI Chat

```
POST /api/ai/chat
GET /api/ai/history
```

---

# 📈 Future Improvements

* AI generated **DSA coding problems**
* Daily coding practice generator
* Learning analytics dashboard
* Community discussion forum
* Dark / Light theme
* Interactive roadmap visualization

---

# 👨‍💻 Author

**Navya Sree**

GitHub
https://github.com/voyage-coder
