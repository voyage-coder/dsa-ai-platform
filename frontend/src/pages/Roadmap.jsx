import { useEffect, useState } from "react";
import API from "../api/axios";
import DashboardNavbar from "../components/DashboardNavbar";
import { useNavigate } from "react-router-dom";

function Roadmap() {

  const navigate = useNavigate();

  const [problems, setProblems] = useState([]);

  const [level, setLevel] = useState("");
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  /* ---------------- Fetch Problems (fallback list) ---------------- */

  useEffect(() => {

    const fetchProblems = async () => {

      try {

        const res = await API.get("/leetcode");

        setProblems(res.data);

      } catch (error) {

        console.log("Failed to fetch problems");

      }

    };

    fetchProblems();

  }, []);

  /* ---------------- Generate Roadmap ---------------- */

  const generateRoadmap = async () => {

    try {

      setLoading(true);

      const res = await API.post(
        "/roadmap/generate",
        { level },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("AI ROADMAP:", res.data);

      setRoadmap(res.data.roadmap);

      setLoading(false);

    } catch (error) {

      if (error.response?.status === 429) {

        alert("AI request limit reached. Please wait a few seconds and try again.");

      } else {

        alert("Failed to generate roadmap.");

      }

      setLoading(false);

    }

  };

  /* ---------------- Store Roadmap ---------------- */

  const storeRoadmap = async () => {

    try {

      await API.post(
        "/roadmap/store",
        { roadmap },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      alert("Roadmap stored successfully");

    } catch (error) {

      console.log(error);

    }

  };

  /* ---------------- View Roadmaps ---------------- */

  const viewRoadmaps = async () => {

    try {

      const res = await API.get(
        "/roadmap/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      console.log("Saved Roadmaps:", res.data);

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <h1 className="text-3xl font-bold mb-6">
          Generate Your DSA Roadmap
        </h1>

        {/* LEVEL BUTTONS */}

        <div className="flex flex-wrap gap-3 mb-6">

          <button
            onClick={() => setLevel("beginner")}
            className={`px-5 py-2 rounded-lg border text-sm sm:text-base transition ${
              level === "beginner"
                ? "bg-blue-500 border-blue-500"
                : "border-slate-700 hover:bg-slate-800"
            }`}
          >
            Beginner
          </button>

          <button
            onClick={() => setLevel("intermediate")}
            className={`px-5 py-2 rounded-lg border text-sm sm:text-base transition ${
              level === "intermediate"
                ? "bg-blue-500 border-blue-500"
                : "border-slate-700 hover:bg-slate-800"
            }`}
          >
            Intermediate
          </button>

          <button
            onClick={() => setLevel("advanced")}
            className={`px-5 py-2 rounded-lg border text-sm sm:text-base transition ${
              level === "advanced"
                ? "bg-blue-500 border-blue-500"
                : "border-slate-700 hover:bg-slate-800"
            }`}
          >
            Advanced
          </button>

        </div>

        <div className="flex flex-wrap gap-3 mb-10">

          <button
            onClick={generateRoadmap}
            className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            {loading ? "Generating..." : "Generate"}
          </button>

          <button
            onClick={storeRoadmap}
            className="bg-green-500 px-6 py-2 rounded-lg hover:bg-green-600 transition"
          >
            Store
          </button>

          <button
            onClick={() => navigate("/saved-roadmaps")}
            className="border border-slate-700 px-6 py-2 rounded-lg hover:bg-slate-800 transition"
          >
            View Saved
          </button>

        </div>

        {/* ROADMAP DISPLAY */}

        {roadmap && roadmap.phases && roadmap.phases.map((phase, i) => (

          <div key={i} className="mb-12">

            <h2 className="text-2xl font-bold mb-6">
              {phase.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {phase.cards && phase.cards.map((card, j) => (

                <div
                  key={j}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500 transition"
                >

                  <h3 className="text-xl font-semibold mb-4">
                    {card.topic}
                  </h3>

                  <ul className="text-gray-400 space-y-1">

                    {card.items && card.items.map((item, k) => (
                      <li key={k}>• {item}</li>
                    ))}

                  </ul>

                  {/* AI Recommended Problems */}

                  {card.problems && card.problems.length > 0 && (

                    <div className="mt-4">

                      <p className="text-sm text-gray-400 mb-2">
                        Recommended Problems
                      </p>

                      <div className="space-y-2">

                        {card.problems.map((p, index) => (

                          <a
                            key={index}
                            href={`https://leetcode.com/problems/${p.slug}`}
                            target="_blank"
                            rel="noreferrer"
                            className="block bg-slate-800 px-3 py-2 rounded hover:bg-slate-700 transition text-sm"
                          >

                            {p.title}

                            <span
                              className={`ml-2 text-xs ${
                                p.difficulty === "Easy"
                                  ? "text-green-400"
                                  : p.difficulty === "Medium"
                                  ? "text-yellow-400"
                                  : "text-red-400"
                              }`}
                            >
                              {p.difficulty}
                            </span>

                          </a>

                        ))}

                      </div>

                    </div>

                  )}

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>

  );

}

export default Roadmap;