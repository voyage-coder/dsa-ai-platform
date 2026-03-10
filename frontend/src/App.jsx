import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Roadmap from "./pages/Roadmap";
import SavedRoadmaps from "./pages/SavedRoadmaps";
import ViewRoadmap from "./pages/ViewRoadmap";
import Topics from "./pages/Topics";
import Chatbot from "./pages/Chatbot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/roadmap" element={<Roadmap />} />
        <Route path="/saved-roadmaps" element={<SavedRoadmaps />} />
        <Route path="/roadmap/:id" element={<ViewRoadmap />} />
        <Route path="/topics" element={<Topics/>} />
        <Route path="/chatbot" element={<Chatbot />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;