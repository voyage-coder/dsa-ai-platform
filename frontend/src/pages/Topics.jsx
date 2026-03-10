import { useState, useEffect } from "react";
import DashboardNavbar from "../components/DashboardNavbar";
import axios from "axios";

const topics = {
  beginner: [
    "Arrays",
    "Strings",
    "Hashing",
    "Recursion",
    "Sorting",
    "Binary Search"
  ],
  intermediate: [
    "Linked List",
    "Stack",
    "Queue",
    "Binary Tree",
    "Binary Search Tree",
    "Heap"
  ],
  advanced: [
    "Graph",
    "Dynamic Programming",
    "Trie",
    "Segment Tree",
    "Disjoint Set",
    "Backtracking"
  ]
};

function Topics() {

  const [completed, setCompleted] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {

  const fetchProgress = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/topics",
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    const saved = {};

    res.data.completedTopics.forEach(topic => {
      saved[topic] = true;
    });

    setCompleted(saved);

  };

  fetchProgress();

}, []);

  const toggleTopic = async (topic) => {

  const updated = {
    ...completed,
    [topic]: !completed[topic]
  };

  setCompleted(updated);

  const completedTopics = Object.keys(updated).filter(t => updated[t]);

  try {

    await axios.post(
      "http://localhost:5000/api/topics",
      { completedTopics },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

  } catch (error) {

    console.log("SAVE ERROR:", error);

  }

};
  const totalTopics = Object.values(topics).flat().length;

  const completedCount = Object.values(completed).filter(Boolean).length;

  const progress = Math.round((completedCount / totalTopics) * 100);

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <DashboardNavbar />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10">

        {/* Header */}

        <h1 className="text-3xl font-bold mb-6">
          DSA Topics Tracker
        </h1>

        {/* Progress Card */}

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 mb-10">

          <p className="text-gray-400 mb-3">
            Progress: {completedCount} / {totalTopics} topics completed
          </p>

          <div className="w-full bg-slate-800 rounded-full h-3">

            <div
              className="bg-blue-500 h-3 rounded-full transition-all"
              style={{ width: `${progress}%` }}
            ></div>

          </div>

        </div>

        {/* Topics */}

        {Object.entries(topics).map(([level, list]) => (

          <div key={level} className="mb-10">

            <h2 className="text-2xl font-semibold mb-5 capitalize">
              {level}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

              {list.map((topic) => (

                <div
                  key={topic}
                  className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center gap-3 hover:border-blue-500 transition"
                >

                  <input
                    type="checkbox"
                    checked={completed[topic] || false}
                    onChange={() => toggleTopic(topic)}
                    className="w-5 h-5"
                  />

                  <span
                    className={
                      completed[topic]
                        ? "line-through text-gray-400"
                        : ""
                    }
                  >
                    {topic}
                  </span>

                </div>

              ))}

            </div>

          </div>

        ))}

      </div>

    </div>

  );
}

export default Topics;