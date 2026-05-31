import { Link, useNavigate } from "react-router-dom";
import {
  User,
  Phone,
  Mail,
  MapPin,
  ClipboardList,
  ShoppingBag,
  LogOut,
  Heart,
  Loader2,
  ChevronRight,
  ShieldCheck,
  CalendarDays,
} from "lucide-react";

import { motion } from "framer-motion";
import axios from "axios";
import { useUser } from "../context/userContext";

export default function Profile() {
  const navigate = useNavigate();

  const { user, setUser, loading } =
    useUser();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://api.apnapashu.com/api/user/logout",
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    }

    setUser(null);
    localStorage.removeItem("user");

    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 flex items-center justify-center">
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="bg-white shadow-xl p-10 text-center"
        >
          <Loader2 className="w-10 h-10 animate-spin text-yellow-500 mx-auto mb-4" />

          <h2 className="font-bold text-lg">
            Loading Dashboard...
          </h2>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">

        <div className="bg-white shadow-xl p-8 w-full max-w-md text-center">

          <div className="w-24 h-24 bg-yellow-100 flex items-center justify-center mx-auto">

            <User
              size={42}
              className="text-yellow-600"
            />

          </div>

          <h2 className="text-3xl font-black mt-5">
            Welcome Guest
          </h2>

          <p className="text-gray-500 mt-2">
            Login to access your account dashboard
          </p>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <Link
              to="/login"
              className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 font-bold"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="border border-gray-300 py-3 font-bold hover:bg-gray-50"
            >
              Register
            </Link>

          </div>

        </div>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">

      {/* =======================
          MOBILE UI (OLD STYLE)
      ======================== */}

      <div className="lg:hidden">

        <div className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-4 py-8 border-yellow-500">

          <motion.div
            initial={{
              opacity: 0,
              y: -25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <p className="text-yellow-400 text-xs tracking-[0.3em] uppercase font-semibold">
              User Dashboard
            </p>

            <h1 className="text-2xl font-black mt-2">
              My Account
            </h1>

            <p className="text-sm text-gray-300 mt-2">
              Manage profile, appointments & orders
            </p>

          </motion.div>

        </div>

        <div className="px-3 -mt-5">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="bg-white border border-yellow-300 shadow-lg p-4 flex gap-4 items-center"
          >
            <img
              src={
                user.image ||
                "https://i.pravatar.cc/150?img=12"
              }
              alt="profile"
              className="w-16 h-16 object-cover border-2 border-yellow-400"
            />

            <div className="flex-1 min-w-0">

              <h2 className="text-lg font-black text-gray-900 truncate">
                {user.name}
              </h2>

              <p className="text-sm text-gray-500 truncate">
                {user.email ||
                  "No Email"}
              </p>

              <p className="text-sm text-gray-500">
                {user.mobile}
              </p>

            </div>

          </motion.div>

        </div>

        <div className="px-3 mt-5 grid grid-cols-1 gap-4">
                    <DashboardCard
            icon={<Heart size={20} />}
            title="Favorites"
            desc="View your favorite products"
            color="bg-red-50 text-red-600"
            onClick={() =>
              navigate("/favorites")
            }
          />

          <DashboardCard
            icon={<ShoppingBag size={20} />}
            title="My Orders"
            desc="Track your orders"
            color="bg-blue-50 text-blue-600"
            onClick={() =>
              navigate("/orders")
            }
          />

          <DashboardCard
            icon={<ClipboardList size={20} />}
            title="My Appointments"
            desc="View booked appointments"
            color="bg-purple-50 text-purple-600"
            onClick={() =>
              navigate("/my-appointment")
            }
          />

          <DashboardCard
            icon={<MapPin size={20} />}
            title="My Address"
            desc="Manage saved addresses"
            color="bg-green-50 text-green-600"
            onClick={() =>
              navigate("/your-address")
            }
          />

        </div>

        <div className="px-3 mt-5">

          <motion.button
            whileTap={{
              scale: 0.98,
            }}
            whileHover={{
              y: -2,
            }}
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 font-bold shadow-md flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            Logout
          </motion.button>

        </div>

      </div>

      {/* =======================
          DESKTOP UI
      ======================== */}

      <div className="hidden lg:block">

        <div className="max-w-7xl mx-auto px-8 py-8">

          <div className="grid lg:grid-cols-[340px_1fr] gap-8">

            {/* SIDEBAR */}

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="bg-white shadow-xl overflow-hidden h-fit sticky top-6"
            >

              <div className="bg-gradient-to-br from-yellow-500 via-orange-500 to-red-500 p-8 text-center text-white">

                <img
                  src={
                    user.image ||
                    "https://i.pravatar.cc/200?img=12"
                  }
                  alt="profile"
                  className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-white shadow-lg"
                />

                <h2 className="text-2xl font-black mt-4">
                  {user.name}
                </h2>

                <p className="text-white/90 text-sm mt-1">
                  Customer Account
                </p>

              </div>

              <div className="p-6 space-y-4">

                <div className="flex items-center gap-3 text-gray-700">
                  <Mail
                    size={18}
                    className="text-yellow-600"
                  />
                  <span className="text-sm truncate">
                    {user.email ||
                      "No Email"}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Phone
                    size={18}
                    className="text-yellow-600"
                  />
                  <span className="text-sm">
                    {user.mobile}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <ShieldCheck
                    size={18}
                    className="text-green-600"
                  />
                  <span className="text-sm">
                    Verified Account
                  </span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <CalendarDays
                    size={18}
                    className="text-blue-600"
                  />
                  <span className="text-sm">
                    Active Member
                  </span>
                </div>

              </div>

            </motion.div>

            {/* RIGHT CONTENT */}

            <div>

              <motion.div
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                className="bg-gradient-to-r from-slate-900 via-black to-slate-900 p-10 text-white shadow-2xl"
              >

                <p className="uppercase tracking-[0.3em] text-yellow-400 text-xs font-bold">
                  Dashboard Overview
                </p>

                <h1 className="text-5xl font-black mt-3">
                  Welcome Back,
                  <br />
                  {user.name}
                </h1>

                <p className="text-gray-300 mt-4">
                  Manage your orders,
                  appointments,
                  favorite products and
                  saved addresses from one place.
                </p>

              </motion.div>

              <div className="grid md:grid-cols-3 gap-4 mt-6">

                <StatCard
                  title="Favorites"
                  value="12"
                  color="from-red-500 to-pink-500"
                />

                <StatCard
                  title="Orders"
                  value="08"
                  color="from-blue-500 to-cyan-500"
                />

                <StatCard
                  title="Appointments"
                  value="03"
                  color="from-purple-500 to-indigo-500"
                />

              </div>

              <div className="grid md:grid-cols-2 gap-4 mt-6">

                <DashboardCard
                  icon={<Heart size={24} />}
                  title="Favorites"
                  desc="View your favorite products"
                  color="bg-red-50 text-red-600"
                  onClick={() =>
                    navigate("/favorites")
                  }
                />

                <DashboardCard
                  icon={<ShoppingBag size={24} />}
                  title="My Orders"
                  desc="Track and manage orders"
                  color="bg-blue-50 text-blue-600"
                  onClick={() =>
                    navigate("/orders")
                  }
                />

                <DashboardCard
                  icon={<ClipboardList size={24} />}
                  title="Appointments"
                  desc="Manage booked appointments"
                  color="bg-purple-50 text-purple-600"
                  onClick={() =>
                    navigate("/my-appointment")
                  }
                />

                <DashboardCard
                  icon={<MapPin size={24} />}
                  title="My Address"
                  desc="Manage delivery addresses"
                  color="bg-green-50 text-green-600"
                  onClick={() =>
                    navigate("/your-address")
                  }
                />

              </div>

              <motion.button
                whileHover={{
                  scale: 1.01,
                }}
                whileTap={{
                  scale: 0.98,
                }}
                onClick={handleLogout}
                className="w-full mt-6 bg-red-500 hover:bg-red-600 text-white py-4 font-bold shadow-xl flex items-center justify-center gap-3"
              >
                <LogOut size={20} />
                Logout Account
              </motion.button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
      }}
      className={`bg-gradient-to-r ${color} shadow-xl p-6 text-white`}
    >
      <p className="text-white/80 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-black mt-2">
        {value}
      </h2>

    </motion.div>
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
      whileHover={{
        y: -8,
        scale: 1.02,
      }}
      whileTap={{
        scale: 0.98,
      }}
      onClick={onClick}
      className="bg-white shadow-xl p-2 text-left flex items-center gap-2 hover:shadow-2xl transition-all"
    >
      <div
        className={`w-16 h-16 flex items-center justify-center ${color}`}
      >
        {icon}
      </div>

      <div className="flex-1">

        <h3 className="font-black text-lg text-gray-900">
          {title}
        </h3>

        <p className="text-sm text-gray-500 mt-1">
          {desc}
        </p>

      </div>

      <ChevronRight
        size={22}
        className="text-gray-400"
      />
    </motion.button>
  );
}