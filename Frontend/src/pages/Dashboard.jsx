import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Edit,
  ClipboardList,
  ShoppingBag,
  LogOut,
  ChevronRight,
} from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useUser } from "../context/userContext";

export default function Profile() {
  const navigate = useNavigate();
  const { user, setUser, loading } = useUser();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://api.apnapashu.com/api/user/logout",
        {},
        { withCredentials: true }
      );
    } catch (error) {}

    setUser(null);
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-yellow-50 flex items-center justify-center">
        <div className="bg-white border border-gray-200 px-6 py-4 shadow-sm font-semibold text-gray-700">
          Loading Profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-yellow-50 pb-8">
      {/* HEADER */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-4 md:px-8 py-10">
        <motion.div
          initial={{ opacity: 0, y: -18 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-yellow-400 text-xs tracking-[0.25em] uppercase font-semibold">
            My Account
          </p>

          <h1 className="text-3xl md:text-4xl font-black mt-2">
            Profile
          </h1>

          <p className="text-sm text-gray-300 mt-2">
            Manage your account, orders and services
          </p>
        </motion.div>
      </div>

      {/* GUEST USER */}
      {!user ? (
        <div className="px-3 md:px-8 lg:px-10 -mt-6">
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-gray-200 shadow-sm p-6 text-center"
          >
            <div className="w-20 h-20 bg-yellow-100 text-yellow-600 mx-auto flex items-center justify-center">
              <User size={34} />
            </div>

            <h2 className="text-2xl font-black text-gray-900 mt-4">
              Welcome Guest
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Login or create an account to access orders,
              consultations and profile features.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Link
                to="/login"
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 font-bold text-sm"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="border border-gray-300 py-3 font-bold text-sm hover:bg-gray-50"
              >
                Register
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        <>
          {/* PROFILE CARD */}
          <div className="px-3 md:px-8 lg:px-10 -mt-6">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-gray-200 shadow-sm p-4 md:p-6 flex gap-4 items-center"
            >
              <img
                src={
                  user.image ||
                  "https://i.pravatar.cc/150?img=12"
                }
                alt="profile"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border"
              />

              <div className="flex-1">
                <h2 className="text-lg md:text-2xl font-black text-gray-900">
                  {user.name}
                </h2>

                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <Mail size={14} />
                  {user.email || "No Email"}
                </p>

                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                  <Phone size={14} />
                  {user.mobile}
                </p>
              </div>
            </motion.div>
          </div>

          {/* MENU */}
          <div className="px-3 md:px-8 lg:px-10 mt-5">
            <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">
              <MenuItem
                icon={<Edit size={18} />}
                title="Edit Profile"
                color="text-yellow-600"
                onClick={() => navigate("/edit-profile")}
              />

              <MenuItem
                icon={<ShoppingBag size={18} />}
                title="My Orders"
                color="text-blue-600"
                onClick={() => navigate("/orders")}
              />

              <MenuItem
                icon={<ClipboardList size={18} />}
                title="My Consultations"
                color="text-purple-600"
                onClick={() =>
                  navigate("/consultations")
                }
              />
              
              <MapPin
                icon={<ClipboardList size={18} />}
                title="Your Adderess"
                color="text-purple-600"
                onClick={() =>
                  navigate("/your-address")
                }
              />

              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-between px-4 py-4 hover:bg-red-50 transition"
              >
                <div className="flex items-center gap-3">
                  <LogOut
                    className="text-red-600"
                    size={18}
                  />

                  <span className="text-red-600 font-semibold text-sm">
                    Logout
                  </span>
                </div>

                <ChevronRight
                  size={16}
                  className="text-red-400"
                />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function MenuItem({
  icon,
  title,
  onClick,
  color = "text-gray-700",
}) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-4 py-4 border-b hover:bg-gray-50 transition"
    >
      <div className="flex items-center gap-3">
        <span className={color}>{icon}</span>

        <span className="text-sm font-semibold text-gray-800">
          {title}
        </span>
      </div>

      <ChevronRight
        size={16}
        className="text-gray-400"
      />
    </button>
  );
}