import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import robot4 from "../assets/robot4.png";

function Landing() {
  return (
    <div className="bg-slate-950 text-white min-h-screen">

      <Navbar />

      {/* HERO SECTION */}
      <section className="flex flex-col md:flex-row items-center justify-between px-8 md:px-16 mt-20 max-w-7xl mx-auto">

        {/* LEFT TEXT */}

        <div className="max-w-xl">

          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Master <span className="text-blue-500">DSA</span> with AI
          </h1>

          <p className="text-gray-400 mt-6 text-lg">
            Generate personalized DSA roadmaps, track topics, and solve coding
            doubts instantly using AI.
          </p>

          <Link to="/signup">
            <button className="mt-8 bg-blue-500 px-8 py-3 rounded-lg text-lg hover:bg-blue-600 transition">
              Get Started
            </button>
          </Link>

        </div>

        {/* RIGHT IMAGE */}

        <div className="relative flex justify-center md:justify-end items-center mt-10 md:mt-0">

            {/* Glow */}
            <div className="absolute w-32 h-32 md:w-56 md:h-56 lg:w-72 lg:h-72 bg-gradient-to-r from-blue-500 to-purple-500 blur-3xl opacity-30 rounded-full"></div>

            {/* Robot */}
            <img
                src={robot4}
                alt="AI Robot"
                className="relative w-36 md:w-52 lg:w-64 animate-float"
            />

        </div>

      </section>


      {/* FEATURES SECTION */}

      <section className="mt-32 px-6">

        <h2 className="text-3xl font-bold text-center mb-16">
          Powerful Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          <div className="bg-slate-900 p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-4">🧠 AI Roadmap</h3>
            <p className="text-gray-400">
              Generate a personalized DSA roadmap based on your current
              skill level.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-4">📚 Topic Checklist</h3>
            <p className="text-gray-400">
              Track your learning progress with structured DSA topic lists.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-xl hover:scale-105 transition">
            <h3 className="text-xl font-semibold mb-4">🤖 AI Doubt Solver</h3>
            <p className="text-gray-400">
              Ask any coding question and get clear explanations instantly.
            </p>
          </div>

        </div>

      </section>


      {/* HOW IT WORKS */}

      <section className="mt-32 px-6">

        <h2 className="text-3xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto text-center">

          <div>
            <h3 className="text-xl font-semibold mb-4">1️⃣ Sign Up</h3>
            <p className="text-gray-400">
              Create your account and access the learning dashboard.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">2️⃣ Generate Roadmap</h3>
            <p className="text-gray-400">
              Choose your level and get a structured DSA learning path.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">3️⃣ Learn & Practice</h3>
            <p className="text-gray-400">
              Track topics and solve doubts with AI assistance.
            </p>
          </div>

        </div>

      </section>


      {/* CTA SECTION */}

      <section className="mt-32 text-center px-6">

        <h2 className="text-3xl md:text-4xl font-bold">
          Start mastering DSA today
        </h2>

        <p className="text-gray-400 mt-4">
          Build strong problem solving skills with AI guidance.
        </p>

        <Link to="/signup">
          <button className="mt-8 bg-blue-500 px-8 py-3 rounded-lg text-lg hover:bg-blue-600 transition">
            Start Learning
          </button>
        </Link>

      </section>


      {/* FOOTER */}

      <footer className="mt-32 border-t border-gray-800 py-8 text-center text-gray-500">
        © 2026 DSA AI Platform
      </footer>

    </div>
  );
}

export default Landing;