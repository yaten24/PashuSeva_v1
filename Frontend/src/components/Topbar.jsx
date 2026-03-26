import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Topbar({ onToggle }) {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="flex items-center justify-between bg-white shadow px-4 py-3 sticky top-0 z-40">
      {/* Left: Toggle */}
      <button
        onClick={onToggle}
        className="md:hidden text-green-700 font-bold"
      >
        ☰
      </button>

      <h1 className="text-lg font-semibold text-gray-700 hidden md:block">
        Admin Dashboard
      </h1>

      {/* Right: Profile */}
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-2 bg-green-100 px-3 py-1 rounded-full"
        >
          <span className="text-sm font-semibold text-green-700">
            {user?.name || "Admin"}
          </span>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow rounded">
            <button
              onClick={logout}
              className="w-full text-left px-4 py-2 hover:bg-red-100 text-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
