import React from "react";
import { motion } from "framer-motion";
import { User, Briefcase, IndianRupee } from "lucide-react";

const SellerDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">

      {/* 🔥 Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold">
          Welcome Back 👋
        </h1>
        <p className="text-gray-300 mt-2">
          Manage your services, bookings and earnings easily.
        </p>
      </motion.div>

      {/* 🔥 Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* Profile Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 shadow-lg"
        >
          <User size={32} className="mb-3 text-blue-400" />
          <h2 className="text-xl font-semibold">Profile</h2>
          <p className="text-gray-300 text-sm mt-1">
            View and update your profile details
          </p>
        </motion.div>

        {/* Services Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 shadow-lg"
        >
          <Briefcase size={32} className="mb-3 text-green-400" />
          <h2 className="text-xl font-semibold">Your Services</h2>
          <p className="text-gray-300 text-sm mt-1">
            Add and manage your services
          </p>
        </motion.div>

        {/* Earnings Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 backdrop-blur-lg p-6 border border-white/20 shadow-lg"
        >
          <IndianRupee size={32} className="mb-3 text-yellow-400" />
          <h2 className="text-xl font-semibold">Earnings</h2>
          <p className="text-gray-300 text-sm mt-1">
            Track your income and payments
          </p>
        </motion.div>

      </div>

      {/* 🔥 Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-10 bg-gradient-to-r from-green-500 to-blue-600 p-6 text-center shadow-lg"
      >
        <h2 className="text-2xl font-semibold">
          Start Growing Your Business 🚀
        </h2>
        <p className="mt-2 text-white/90">
          Add your services and start getting bookings from customers.
        </p>

        <button className="mt-4 bg-white text-black px-6 py-2 font-semibold hover:scale-105 transition">
          Add Service
        </button>
      </motion.div>

    </div>
  );
};

export default SellerDashboard;