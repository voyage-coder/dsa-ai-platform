import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="flex justify-between items-center px-6 md:px-12 py-5 bg-slate-900">

      <Link to="/" className="text-xl font-bold">
        DSA AI
      </Link>

      <div className="flex gap-4">

        <Link to="/login">
          <button className="border border-white px-4 py-2 rounded hover:bg-white hover:text-black transition">
            Login
          </button>
        </Link>

        <Link to="/signup">
          <button className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600 transition">
            Get Started
          </button>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;