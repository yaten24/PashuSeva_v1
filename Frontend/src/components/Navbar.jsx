import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useUser } from "../context/userContext";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, loading } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const isLoggedIn = !!user;

  const linkClass = ({ isActive }) =>
    `text-base font-semibold tracking-wide transition ${
      isActive
        ? "text-emerald-600"
        : "text-gray-700 hover:text-emerald-600"
    }`;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">

      <div className="w-full flex items-center justify-between px-10 py-4">

        {/* 🔥 LOGO */}
        <NavLink to="/" className="text-2xl font-extrabold text-emerald-600">
          PashuSeva
        </NavLink>

        {/* 🔥 NAV LINKS */}
        <nav className="hidden md:flex items-center gap-8">
          <NavLink to="/marketplace" className={linkClass}>
            Marketplace
          </NavLink>
          <NavLink to="/doctors" className={linkClass}>
            Doctors
          </NavLink>
          <NavLink to="/premium" className={linkClass}>
            Premium
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            About
          </NavLink>
          <NavLink to="/contact" className={linkClass}>
            Contact
          </NavLink>

          {isLoggedIn && (
            <NavLink to="/dashboard" className={linkClass}>
              Dashboard
            </NavLink>
          )}
        </nav>

        {/* 🔥 RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-5">

          {loading ? (
            <div className="text-sm text-gray-400">Loading...</div>
          ) : isLoggedIn ? (
            <>
              {/* 🔥 AVATAR */}
              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-9 h-9 bg-emerald-600 text-white flex items-center justify-center font-bold">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>

                <span className="text-sm font-semibold text-gray-700 group-hover:text-emerald-600 transition">
                  {user?.name}
                </span>
              </div>
            </>
          ) : (
            <>
              {/* LOGIN */}
              <NavLink
                to="/login"
                className="px-6 py-2.5 text-sm font-semibold text-emerald-600 border border-emerald-500 hover:bg-emerald-50 transition"
              >
                Login
              </NavLink>

              {/* REGISTER */}
              <NavLink
                to="/register"
                className="px-6 py-2.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-700 transition"
              >
                Get Started
              </NavLink>
            </>
          )}

        </div>

        {/* 🔥 MOBILE MENU BUTTON */}
        <button onClick={() => setOpen(true)} className="md:hidden">
          <Menu size={26} />
        </button>

      </div>

      {/* 🔥 MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            className="fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 p-6"
          >

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold">Menu</h2>
              <button onClick={() => setOpen(false)}>
                <X size={24} />
              </button>
            </div>

            <div className="flex flex-col gap-5 text-base font-semibold">

              <NavLink to="/marketplace">Marketplace</NavLink>
              <NavLink to="/doctors">Doctors</NavLink>
              <NavLink to="/premium">Premium</NavLink>
              <NavLink to="/about">About</NavLink>
              <NavLink to="/contact">Contact</NavLink>

              {isLoggedIn && <NavLink to="/dashboard">Dashboard</NavLink>}

              <hr />

              {isLoggedIn ? (
                <div
                  onClick={() => navigate("/profile")}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <div className="w-9 h-9 bg-emerald-600 text-white flex items-center justify-center font-bold">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>
                  <span>{user?.name}</span>
                </div>
              ) : (
                <>
                  <NavLink to="/login">Login</NavLink>
                  <NavLink to="/register">Register</NavLink>
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}