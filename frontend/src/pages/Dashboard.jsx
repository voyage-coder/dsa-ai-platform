import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import {
  Brain,
  BookOpen,
  MessageCircle,
  ArrowRight,
  Sparkles
} from "lucide-react";

function Dashboard() {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const cards = [
    {
      title: "AI Roadmap Generator",
      description:
        "Generate a personalized Data Structures and Algorithms roadmap based on your learning level and goals. Perfect for structured interview preparation.",
      icon: <Brain size={40} />,
      button: "Generate Roadmap",
      path: "/roadmap"
    },
    {
      title: "DSA Topics Tracker",
      description:
        "Browse structured DSA topics organized by beginner, intermediate and advanced levels. Track your progress with checklists.",
      icon: <BookOpen size={40} />,
      button: "View Topics",
      path: "/topics"
    },
    {
      title: "AI Doubt Solver",
      description:
        "Ask any Data Structures or Algorithms question and receive clear explanations with examples from AI instantly.",
      icon: <MessageCircle size={40} />,
      button: "Ask AI",
      path: "/chatbot"
    }
  ];

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* HERO / INTRO SECTION */}

        <div className="mb-14">

          <div className="flex items-center gap-2 text-blue-400 mb-3">
            <Sparkles size={18} />
            <p className="text-sm">AI Powered Learning</p>
          </div>

          <h1 className="text-4xl font-bold mb-4">
            Welcome back, {user?.name}
          </h1>

          <p className="text-gray-400 max-w-2xl">
            Continue improving your problem solving skills with structured
            roadmaps, topic tracking and AI powered explanations designed
            for coding interview preparation.
          </p>

          {/* Quick action buttons */}

          <div className="flex gap-4 mt-6 flex-wrap">

            <button
              onClick={() => navigate("/roadmap")}
              className="bg-blue-500 px-6 py-3 rounded-lg hover:bg-blue-600 transition"
            >
              Generate Roadmap
            </button>

            <button
              onClick={() => navigate("/topics")}
              className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600"
            >
              Explore Topics
            </button>

            <button
              onClick={() => navigate("/chatbot")}
              className="border border-slate-700 px-6 py-3 rounded-lg hover:bg-slate-800 transition"
            >
              Ask AI Doubt
            </button>

          </div>

        </div>


        {/* FEATURE CARDS */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {cards.map((card, index) => (

            <div
              key={index}
              className="bg-slate-900 border border-slate-800 rounded-xl p-8 flex flex-col justify-between hover:border-blue-500 transition"
            >

              {/* Icon */}

              <div className="text-blue-400 mb-4">
                {card.icon}
              </div>

              {/* Title */}

              <h2 className="text-xl font-semibold mb-3">
                {card.title}
              </h2>

              {/* Description */}

              <p className="text-gray-400 text-sm mb-6">
                {card.description}
              </p>

              {/* Button */}

              <button
                onClick={() => navigate(card.path)}
                className="flex items-center justify-center gap-2 bg-blue-500 px-5 py-3 rounded-lg hover:bg-blue-600 transition"
              >
                {card.button}
                <ArrowRight size={18} />
              </button>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}

export default Dashboard;