import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLoggedIn = !!user;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white ${scrolled ? "shadow-sm" : ""}`}>

      <div className="w-full flex items-center justify-between px-6 lg:px-12 py-3">

        {/* 🔥 LEFT SIDE */}
        <div className="flex items-center gap-8">

          {/* LOGO */}
          <div
            onClick={() => navigate("/")}
            className="text-xl font-bold text-emerald-600 cursor-pointer"
          >
            ApnaPashu
          </div>

          {/* NAV LINKS */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-gray-700">
            <NavLink to="/marketplace" className="hover:text-emerald-600">
              Marketplace
            </NavLink>
            <NavLink to="/doctors" className="hover:text-emerald-600">
              Doctors
            </NavLink>
            <NavLink to="/premium" className="hover:text-emerald-600">
              Premium
            </NavLink>
            <NavLink to="/contact" className="hover:text-emerald-600">
              Contact
            </NavLink>
            <NavLink to="/about" className="hover:text-emerald-600">
              About
            </NavLink>
          </nav>
        </div>

        {/* 🔥 RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-4">

          {loading ? (
            <span className="text-xs text-gray-400">Loading...</span>
          ) : isLoggedIn ? (
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className="w-9 h-9 bg-emerald-600 text-white flex items-center justify-center font-bold">
                {user?.name?.charAt(0)?.toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-gray-700">
                {user?.name}
              </span>
            </div>
          ) : (
            <>
              {/* LOGIN */}
              <NavLink
                to="/login"
                className="text-sm font-semibold text-gray-700 hover:text-emerald-600"
              >
                Log in
              </NavLink>

              {/* SIGNUP BUTTON */}
              <NavLink
                to="/register"
                className="bg-black text-white px-4 py-1.5 text-sm font-semibold hover:bg-gray-900 transition"
              >
                Sign up
              </NavLink>
            </>
          )}

        </div>

        {/* 🔥 MOBILE */}
        <button onClick={() => setOpen(true)} className="md:hidden">
          <Menu size={26} />
        </button>

      </div>

      {/* 🔥 MOBILE DRAWER */}
      {open && (
        <div className="fixed inset-0 z-50 flex">

          <div
            className="flex-1 bg-black/40"
            onClick={() => setOpen(false)}
          />

          <div className="w-72 bg-white h-full p-6 border-l">

            <div className="flex justify-between mb-6">
              <h2 className="font-semibold">Menu</h2>
              <button onClick={() => setOpen(false)}>
                <X size={22} />
              </button>
            </div>

            <div className="flex flex-col gap-4 text-sm font-semibold">
              <NavLink to="/marketplace">Marketplace</NavLink>
              <NavLink to="/doctors">Doctors</NavLink>
              <NavLink to="/premium">Premium</NavLink>
              <NavLink to="/contact">Contact</NavLink>
              <NavLink to="/about">About</NavLink>

              <hr />

              {!isLoggedIn && (
                <>
                  <NavLink to="/login">Log in</NavLink>
                  <NavLink to="/register">Sign up</NavLink>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}