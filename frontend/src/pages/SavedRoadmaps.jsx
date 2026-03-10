import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../components/DashboardNavbar";

function SavedRoadmaps() {

  const [roadmaps, setRoadmaps] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchRoadmaps();
  }, []);

  const fetchRoadmaps = async () => {

    try {

      const res = await API.get(
        "/roadmap/my",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setRoadmaps(res.data);

    } catch (error) {
      console.log(error);
    }

  };

  const deleteRoadmap = async (id) => {

  try {

    await API.delete(
      `/roadmap/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    // remove from UI
    setRoadmaps(roadmaps.filter(r => r._id !== id));

  } catch (error) {

    console.log(error);

  }

};

  return (

    <div className="min-h-screen bg-slate-950 text-white">

      <DashboardNavbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <h1 className="text-3xl font-bold mb-10">
          My Saved Roadmaps
        </h1>

        {roadmaps.length === 0 && (
          <p className="text-gray-400">
            No roadmaps saved yet.
          </p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {roadmaps.map((rm, index) => (

            <div
  key={rm._id}
  className="bg-slate-900 border border-slate-800 rounded-xl p-6"
>

  <h2 className="text-xl font-semibold mb-3">
    Roadmap #{index + 1}
  </h2>

  <p className="text-gray-400 text-sm mb-4">
    Created: {new Date(rm.createdAt).toLocaleDateString()}
  </p>

  <div className="flex gap-3">

    <button
      onClick={() => navigate(`/roadmap/${rm._id}`)}
      className="bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600 transition"
    >
      View
    </button>

    <button
      onClick={() => deleteRoadmap(rm._id)}
      className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
    >
      Delete
    </button>

  </div>

</div>
          ))}

        </div>

      </div>

    </div>

  );
}

export default SavedRoadmaps;