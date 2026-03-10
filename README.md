# 🚀 DSA AI Platform

![React](https://img.shields.io/badge/Frontend-React-blue)
![Node](https://img.shields.io/badge/Backend-Node.js-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![AI](https://img.shields.io/badge/AI-Gemini-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

An **AI-powered learning platform** that helps users master **Data Structures and Algorithms** using personalized roadmaps, topic tracking, and an AI-powered doubt-solving chatbot.

Built with the **MERN Stack + Gemini AI**.

---

# 🌐 Live Demo

Frontend:
https://dsa-ai-platform.vercel.app/

Backend API:
https://dsa-ai-platform.onrender.com

---

# ✨ Features

## 🔐 Secure Authentication

* User signup and login
* JWT based authentication
* Protected dashboard routes

---

## 🧠 AI Roadmap Generator

Generate personalized DSA learning roadmaps using **Gemini AI**.

Users can select their learning level:

* Beginner
* Intermediate
* Advanced

Each roadmap contains structured phases and topic cards.

---

## 💾 Save & Manage Roadmaps

Users can:

* Save generated roadmaps
* View saved roadmaps
* Delete roadmaps
* Access them anytime

All data is stored in **MongoDB Atlas**.

---

## 📚 DSA Topic Tracker

Track learning progress across DSA topics.

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

Progress is stored automatically in the database.

---

## 🤖 AI Doubt Solver Chatbot

Ask any **DSA-related question**.

Features:

* Gemini AI powered answers
* Chat history storage
* Sidebar with previous conversations
* Markdown formatted responses
* Typing animation

---

## 📱 Responsive UI

Fully responsive interface designed for:

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

---

## Deployment

| Service  | Platform      |
| -------- | ------------- |
| Frontend | Vercel        |
| Backend  | Render        |
| Database | MongoDB Atlas |
| AI       | Gemini        |

---

# ⚙️ Environment Variables

## Backend `.env`

```id="ue47bb"
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
GEMINI_API_KEY=your_gemini_api_key
```

---

## Frontend `.env`

```id="vdxgyn"
VITE_API_URL=http://localhost:5000
```

Production:

```id="tuhp5n"
VITE_API_URL=https://your-backend-url.onrender.com
```

---

# 🖥 Running Locally

## Clone Repository

```id="ncy2pq"
git clone https://github.com/voyage-coder/dsa-ai-platform.git
cd dsa-ai-platform
```

---

## Start Backend

```id="ccsz02"
cd backend
npm install
node server.js
```

---

## Start Frontend

```id="77t20r"
cd frontend
npm install
npm run dev
```

Open in browser:

```id="9glrx0"
http://localhost:5173
```

---

# 🧪 API Routes

## Authentication

```id="z0pdpc"
POST /api/auth/signup
POST /api/auth/login
```

---

## Roadmaps

```id="qzhmje"
POST /api/roadmap/generate
POST /api/roadmap/store
GET /api/roadmap/my
GET /api/roadmap/:id
DELETE /api/roadmap/:id
```

---

## Topics Progress

```id="jyfb49"
GET /api/topics
POST /api/topics
```

---

## AI Chat

```id="0njqbv"
POST /api/ai/chat
GET /api/ai/history
```

---

# 📈 Future Improvements

* AI generated **DSA coding problems**
* Community discussion forum
* Daily coding challenges
* Learning analytics dashboard
* Dark/light theme toggle

---

# 👨‍💻 Author

**Navya Sree**

GitHub:
https://github.com/voyage-coder
