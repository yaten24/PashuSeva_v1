import React from "react";
import { motion } from "framer-motion";
import {
  User,
  IndianRupee,
  ClipboardList,
  PlusCircle,
  TrendingUp,
  Package,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SellerDashboard = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white p-6">
      {/* 🔥 Header */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col md:flex-row md:items-center md:justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold">Seller Dashboard 🐄</h1>
          <p className="text-gray-300 mt-1">
            Manage your products, orders & earnings
          </p>
        </div>

        {/* 🔥 Buttons Group */}
        <div className="flex gap-3 mt-4 md:mt-0">
          {/* Profile Button */}
          <button 
          onClick={() => navigate("/seller/profile")}
          className="flex items-center gap-2 bg-blue-500 px-5 py-2 font-semibold hover:scale-105 transition">
            <User size={18} /> Profile
          </button>

          {/* Add Product Button */}
          <button
            onClick={() => navigate("/seller/add-product")}
            className="flex items-center gap-2 bg-green-500 px-5 py-2 font-semibold hover:scale-105 transition"
          >
            <PlusCircle size={18} /> Add Product
          </button>
        </div>
      </motion.div>

      {/* 🔥 Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 p-5 border border-white/20"
        >
          <Package className="text-green-400 mb-2" />
          <h2 className="text-xl font-bold">8</h2>
          <p className="text-gray-400 text-sm">Total Products</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 p-5 border border-white/20"
        >
          <ClipboardList className="text-blue-400 mb-2" />
          <h2 className="text-xl font-bold">23</h2>
          <p className="text-gray-400 text-sm">Total Orders</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 p-5 border border-white/20"
        >
          <ClipboardList className="text-yellow-400 mb-2" />
          <h2 className="text-xl font-bold">5</h2>
          <p className="text-gray-400 text-sm">Pending Orders</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white/10 p-5 border border-white/20"
        >
          <IndianRupee className="text-green-300 mb-2" />
          <h2 className="text-xl font-bold">₹52,000</h2>
          <p className="text-gray-400 text-sm">Total Earnings</p>
        </motion.div>
      </div>

      {/* 🔥 Products Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Your Products</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 p-4 border border-white/20">
            <h3 className="font-semibold">Desi Cow 🐄</h3>
            <p className="text-sm text-gray-400">₹45,000</p>
            <p className="text-green-400 text-xs mt-1">In Stock</p>

            <div className="mt-3 flex gap-2">
              <button className="bg-blue-500 px-3 py-1 text-xs">Edit</button>
              <button className="bg-red-500 px-3 py-1 text-xs">Delete</button>
            </div>
          </div>

          <div className="bg-white/10 p-4 border border-white/20">
            <h3 className="font-semibold">Goat 🐐</h3>
            <p className="text-sm text-gray-400">₹12,000</p>
            <p className="text-yellow-400 text-xs mt-1">Low Stock</p>

            <div className="mt-3 flex gap-2">
              <button className="bg-blue-500 px-3 py-1 text-xs">Edit</button>
              <button className="bg-red-500 px-3 py-1 text-xs">Delete</button>
            </div>
          </div>
        </div>
      </div>

      {/* 🔥 Orders Section */}
      <div className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <div className="bg-white/10 border border-white/20 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-white/20">
              <tr>
                <th className="p-3 text-sm">Customer</th>
                <th className="p-3 text-sm">Product</th>
                <th className="p-3 text-sm">Price</th>
                <th className="p-3 text-sm">Status</th>
                <th className="p-3 text-sm">Action</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-t border-white/10">
                <td className="p-3">Rahul Sharma</td>
                <td className="p-3">Desi Cow</td>
                <td className="p-3">₹45,000</td>
                <td className="p-3 text-yellow-400">Pending</td>
                <td className="p-3">
                  <button className="bg-green-500 px-2 py-1 text-xs">
                    Accept
                  </button>
                  <button className="bg-red-500 px-2 py-1 text-xs ml-2">
                    Reject
                  </button>
                </td>
              </tr>

              <tr className="border-t border-white/10">
                <td className="p-3">Amit Verma</td>
                <td className="p-3">Goat</td>
                <td className="p-3">₹12,000</td>
                <td className="p-3 text-green-400">Accepted</td>
                <td className="p-3">—</td>
              </tr>

              <tr className="border-t border-white/10">
                <td className="p-3">Suresh Kumar</td>
                <td className="p-3">Buffalo</td>
                <td className="p-3">₹60,000</td>
                <td className="p-3 text-blue-400">Delivered</td>
                <td className="p-3">—</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* 🔥 Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mt-12 bg-gradient-to-r from-green-500 to-blue-600 p-6 text-center"
      >
        <h2 className="text-2xl font-semibold">Grow Your Animal Business 🚀</h2>

        <p className="mt-2 text-white/90">
          Add more animals/products & increase your sales
        </p>

        <button className="mt-4 bg-white text-black px-6 py-2 font-semibold hover:scale-105 transition">
          Add New Product
        </button>
      </motion.div>
    </div>
  );
};

export default SellerDashboard;
