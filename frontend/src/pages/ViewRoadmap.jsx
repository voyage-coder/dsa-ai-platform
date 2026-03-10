import { useEffect, useState } from "react";
import API from "../api/axios";
import { useParams } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";
import { useNavigate } from "react-router-dom";

function ViewRoadmap() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [roadmap, setRoadmap] = useState(null);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRoadmap();
  }, []);

  const fetchRoadmap = async () => {

    try {

      const res = await API.get(
        `/roadmap/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setRoadmap(res.data.roadmap);

    } catch (error) {
      console.log(error);
    }

  };

  const deleteRoadmap = async () => {

    if (!window.confirm("Delete this roadmap?")) return;

    try {

      await API.delete(
        `/roadmap/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      navigate("/saved-roadmaps");

    } catch (error) {

      console.log(error);

    }

  };

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <div className="flex justify-between items-center mb-8">

          <h1 className="text-3xl font-bold">
            Saved Roadmap
          </h1>

          <button
            onClick={deleteRoadmap}
            className="bg-red-500 px-5 py-2 rounded-lg hover:bg-red-600 transition"
          >
            Delete Roadmap
          </button>

        </div>

        {roadmap?.phases?.map((phase, i) => (

          <div key={i} className="mb-10">

            <h2 className="text-xl sm:text-2xl font-semibold mb-6">
              {phase.title}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {phase.cards.map((card, j) => (

                <div
                  key={j}
                  className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-blue-500 hover:shadow-lg transition"
                >

                  <h3 className="text-xl font-semibold mb-4">
                    {card.topic}
                  </h3>

                  <ul className="text-gray-400 space-y-1">

                    {card.items.map((item, k) => (
                      <li key={k}>• {item}</li>
                    ))}

                  </ul>

                  {/* Recommended Problems */}

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

export default ViewRoadmap;