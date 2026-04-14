import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useUser } from "../context/userContext";
import {
  Menu,
  X,
  Phone,
  Mail,
  PawPrint,
  User,
  ShoppingBag,
  Stethoscope,
  Crown,
  Handshake,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

  const menu = [
    { name: "Marketplace", path: "/marketplace", icon: ShoppingBag },
    { name: "Doctors", path: "/doctors", icon: Stethoscope },
    { name: "Premium", path: "/premium", icon: Crown },
    { name: "Contact", path: "/contact", icon: Phone },
    { name: "About", path: "/about", icon: PawPrint },
  ];

  return (
    <header className="sticky top-0 z-50">
      {/* TOP BAR */}
      <div className="hidden md:flex justify-between items-center bg-gray-900 text-white text-[11px] px-6 lg:px-12 py-1 border-b border-gray-800 overflow-hidden">
  {/* LEFT SIDE */}
  <div className="flex items-center gap-5">
    {/* TAGLINE */}
    <span className="text-gray-300 font-medium tracking-wide">
      India’s Trusted Platform for Animal Care & Services
    </span>

    {/* CALL */}
    <a
      href="tel:+919876543210"
      className="flex items-center gap-1.5 font-semibold hover:text-yellow-400 transition"
    >
      <span className="relative flex h-2.5 w-2.5">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-600"></span>
      </span>

      <Phone size={13} />
      +91 9876543210
    </a>

    {/* EMAIL */}
    <a
      href="mailto:support@apnapashu.com"
      className="flex items-center gap-1 hover:text-yellow-400 transition"
    >
      <Mail size={13} />
      support@apnapashu.com
    </a>
  </div>

  {/* RIGHT SIDE */}
  <a
    href="/partner-register"
    className="group relative px-4 py-1.5 bg-yellow-500 text-black font-bold text-[11px] flex items-center gap-2 hover:bg-yellow-400 transition-all duration-300 shadow-md"
  >
    <Handshake
      size={14}
      className="group-hover:rotate-12 transition-transform duration-300"
    />

    Become Partner

    <span className="absolute inset-0 bg-white/20 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500"></span>
  </a>
</div>

      {/* MAIN NAVBAR */}
      <div
        className={`bg-white border-b border-gray-200 transition-all duration-300 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-12 py-3">
          {/* LEFT */}
          <div className="flex items-center gap-10">
            <div
              onClick={() => navigate("/")}
              className="text-2xl font-black text-yellow-500 cursor-pointer"
            >
              Apna<span className="text-black">Pashu</span>
            </div>

            <nav className="hidden md:flex items-center gap-3">
              {menu.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className="px-4 py-2 text-sm font-semibold text-gray-700 border border-transparent hover:border-yellow-400 hover:bg-yellow-50 transition flex items-center gap-2"
                  >
                    <Icon size={16} />
                    {item.name}
                  </NavLink>
                );
              })}
            </nav>
          </div>

          {/* RIGHT */}
          <div className="hidden md:flex items-center gap-3">
            {loading ? (
              <span className="text-sm text-gray-400">Loading...</span>
            ) : isLoggedIn ? (
              <div
                onClick={() => navigate("/profile")}
                className="flex items-center gap-3 px-3 py-2 bg-yellow-50 cursor-pointer border border-yellow-200"
              >
                <div className="w-10 h-10 bg-yellow-500 text-white flex items-center justify-center font-bold">
                  {user?.name?.charAt(0)?.toUpperCase()}
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-800">
                    {user?.name}
                  </p>
                  <p className="text-xs text-gray-500">My Profile</p>
                </div>
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="px-5 py-2 border border-yellow-500 text-yellow-600 font-bold text-sm hover:bg-yellow-50 transition"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  className="px-5 py-2 bg-yellow-500 text-white font-bold text-sm hover:bg-yellow-600 transition"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden bg-yellow-500 text-white p-2"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>

      {/* MOBILE DRAWER */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[999] bg-white md:hidden flex flex-col"
          >
            {/* TOP */}
            <div className="flex justify-between items-center px-5 py-4">
              <div className="text-2xl font-black text-yellow-500">
                Apna<span className="text-black">Pashu</span>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="bg-gray-100 p-2"
              >
                <X size={22} />
              </button>
            </div>

            {/* USER / LOGIN */}
            <div className="px-5 pt-5">
              {isLoggedIn ? (
                <div
                  onClick={() => {
                    navigate("/profile");
                    setOpen(false);
                  }}
                  className="flex items-center gap-3 bg-yellow-50 p-4 border border-yellow-200"
                >
                  <div className="w-11 h-11 bg-yellow-500 text-white flex items-center justify-center font-bold">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </div>

                  <div>
                    <p className="font-bold">{user?.name}</p>
                    <p className="text-xs text-gray-500">View Profile</p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3">
                  <NavLink
                    to="/login"
                    onClick={() => setOpen(false)}
                    className="py-3 text-center border border-yellow-500 text-yellow-600 font-bold"
                  >
                    Login
                  </NavLink>

                  <NavLink
                    to="/register"
                    onClick={() => setOpen(false)}
                    className="py-3 text-center bg-yellow-500 text-white font-bold"
                  >
                    Sign Up
                  </NavLink>
                </div>
              )}
            </div>

            {/* MOBILE MENU */}
            <div className="flex-1 px-5 py-5 space-y-3 overflow-y-auto">
              {menu.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.06 }}
                  >
                    <NavLink
                      to={item.path}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-4 font-semibold border shadow-sm transition-all duration-200
            ${
              isActive
                ? "border-yellow-400 bg-yellow-50 text-yellow-700"
                : "border-gray-200 bg-white text-gray-800 hover:border-yellow-300 hover:bg-yellow-50"
            }`
                      }
                    >
                      <Icon size={18} className="text-yellow-500" />
                      {item.name}
                    </NavLink>
                  </motion.div>
                );
              })}

              {/* PARTNER BUTTON */}
              <button className="w-full mt-3 py-4 bg-yellow-500 text-white font-bold flex items-center justify-center gap-2 shadow-sm hover:bg-yellow-600 transition">
                <Handshake size={18} />
                Become Partner
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
