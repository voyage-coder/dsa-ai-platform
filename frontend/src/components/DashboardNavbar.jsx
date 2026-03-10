import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, LogOut } from "lucide-react";

function DashboardNavbar() {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const dropdownRef = useRef();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }

    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };

  }, []);

  return (

    <nav className="flex justify-between items-center px-8 py-4 bg-slate-900 border-b border-slate-800">

      <h1
        className="text-xl font-bold cursor-pointer"
        onClick={() => navigate("/dashboard")}
      >
        DSA AI
      </h1>

      <div className="relative" ref={dropdownRef}>

        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen(!open)}
        >

          <User size={20} />

          <span>{user?.name}</span>

        </div>

        {open && (

          <div className="absolute right-0 mt-3 w-60 bg-slate-900 border border-slate-700 rounded-lg shadow-lg">

            <div className="p-4 border-b border-slate-700">

              <p className="font-semibold">{user?.name}</p>

              <p className="text-sm text-gray-400 break-words">
                {user?.email}
              </p>

            </div>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 w-full p-3 hover:bg-slate-800"
            >
              <LogOut size={18} />
              Sign Out
            </button>

          </div>

        )}

      </div>

    </nav>
  );
}

export default DashboardNavbar;