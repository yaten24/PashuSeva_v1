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
  Home,
  Loader2,
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
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white border border-yellow-300 shadow-lg px-8 py-6 text-center w-full max-w-sm"
        >
          <Loader2 className="w-8 h-8 animate-spin text-yellow-500 mx-auto mb-3" />
          <p className="font-semibold text-gray-700">
            Loading Dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 pb-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-4 md:px-8 py-8 md:py-10 border-b-4 border-yellow-500">
        <motion.div
          initial={{ opacity: 0, y: -25 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-semibold">
            User Dashboard
          </p>

          <h1 className="text-2xl md:text-4xl font-black mt-2">
            My Account
          </h1>

          <p className="text-sm text-gray-300 mt-2">
            Manage profile, appointments & orders
          </p>
        </motion.div>
      </div>

      {!user ? (
        <div className="px-3 md:px-8 lg:px-10 -mt-5">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border border-yellow-300 shadow-lg p-6 text-center"
          >
            <div className="w-20 h-20 bg-yellow-100 text-yellow-600 mx-auto flex items-center justify-center rounded-full">
              <User size={34} />
            </div>

            <h2 className="text-2xl font-black text-gray-900 mt-4">
              Welcome Guest
            </h2>

            <p className="text-sm text-gray-500 mt-2">
              Login to access your dashboard.
            </p>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <Link
                to="/login"
                className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 font-bold text-sm text-center"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="border border-yellow-300 py-3 font-bold text-sm hover:bg-yellow-50 text-center"
              >
                Register
              </Link>
            </div>
          </motion.div>
        </div>
      ) : (
        <>
          {/* Profile Card */}
          <div className="px-3 md:px-8 lg:px-10 -mt-5">
            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-yellow-300 shadow-lg p-4 md:p-6 flex gap-4 items-center"
            >
              <img
                src={
                  user.image ||
                  "https://i.pravatar.cc/150?img=12"
                }
                alt="profile"
                className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-yellow-400"
              />

              <div className="flex-1 min-w-0">
                <h2 className="text-lg md:text-2xl font-black text-gray-900 truncate">
                  {user.name}
                </h2>

                <p className="text-sm text-gray-500 flex items-center gap-2 mt-1 truncate">
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

          {/* Menu Grid */}
          <div className="px-3 md:px-8 lg:px-10 mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
            <DashboardCard
              icon={<Edit size={20} />}
              title="Edit Profile"
              desc="Update personal details"
              color="text-yellow-600"
              onClick={() =>
                navigate("/edit-profile")
              }
            />

            <DashboardCard
              icon={<ShoppingBag size={20} />}
              title="My Orders"
              desc="Track your orders"
              color="text-blue-600"
              onClick={() => navigate("/orders")}
            />

            <DashboardCard
              icon={<ClipboardList size={20} />}
              title="My Appointments"
              desc="View booked appointments"
              color="text-purple-600"
              onClick={() =>
                navigate("/my-appointment")
              }
            />

            <DashboardCard
              icon={<MapPin size={20} />}
              title="My Address"
              desc="Manage saved addresses"
              color="text-green-600"
              onClick={() =>
                navigate("/your-address")
              }
            />
          </div>

          {/* Logout */}
          <div className="px-3 md:px-8 lg:px-10 mt-5">
            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ y: -2 }}
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white py-3 font-bold shadow-md flex items-center justify-center gap-2"
            >
              <LogOut size={18} />
              Logout
            </motion.button>
          </div>
        </>
      )}
    </div>
  );
}

function DashboardCard({
  icon,
  title,
  desc,
  color,
  onClick,
}) {
  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="bg-white border border-yellow-300 shadow-md p-4 text-left flex items-center gap-4 hover:bg-yellow-50 transition"
    >
      <div
        className={`w-12 h-12 bg-gray-50 border border-yellow-200 flex items-center justify-center ${color}`}
      >
        {icon}
      </div>

      <div className="flex-1">
        <h3 className="font-bold text-gray-900 text-sm md:text-base">
          {title}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          {desc}
        </p>
      </div>

      <ChevronRight className="text-gray-400" size={18} />
    </motion.button>
  );
}