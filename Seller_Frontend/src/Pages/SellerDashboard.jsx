import React from "react";
import { useSeller } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBoxOpen,
  FaShoppingCart,
  FaWallet,
  FaPlus,
  FaEdit,
  FaSignOutAlt, // 🔥 logout icon
} from "react-icons/fa";

const SellerDashboard = () => {
  const { seller, loading, logoutSeller } = useSeller(); // 🔥 logout function
  const navigate = useNavigate();

  // 🔥 logout handler
  const handleLogout = async () => {
    await logoutSeller();
    navigate("/seller/login");
  };

  if (loading)
    return <p className="text-white p-4">Loading...</p>;

  if (!seller)
    return <p className="text-white p-4">No Seller Found</p>;

  return (
    <div className="min-h-screen bg-gray-950 text-white px-4 py-4 md:px-6">

      {/* 🔥 HEADER + LOGOUT */}
      <div className="mb-6 md:mb-8 flex justify-between items-center">
        <div>
          <h1 className="text-xl md:text-3xl font-bold">
            Welcome, {seller.name}
          </h1>
          <p className="text-gray-400 text-sm md:text-base">
            {seller.businessName}
          </p>
        </div>

        {/* 🔥 Logout Button */}
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-3 py-2 text-xs md:text-sm"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>

      {/* 🔥 INFO CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-8">

        <div className="p-4 md:p-6 bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <FaWallet className="text-green-400 text-sm md:text-lg" />
            <h3 className="text-xs md:text-lg">Wallet</h3>
          </div>
          <p className="text-lg md:text-2xl font-bold">
            ₹{seller.walletBalance}
          </p>
        </div>

        <div className="p-4 md:p-6 bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <FaShoppingCart className="text-blue-400 text-sm md:text-lg" />
            <h3 className="text-xs md:text-lg">Orders</h3>
          </div>
          <p className="text-lg md:text-2xl font-bold">0</p>
        </div>

        <div className="p-4 md:p-6 bg-white/5 border border-white/10 col-span-2 md:col-span-1">
          <div className="flex items-center gap-2 mb-1">
            <FaUser className="text-yellow-400 text-sm md:text-lg" />
            <h3 className="text-xs md:text-lg">Rating</h3>
          </div>
          <p className="text-lg md:text-2xl font-bold">
            {seller.rating} ⭐
          </p>
        </div>
      </div>

      {/* 🔥 QUICK ACTIONS */}
      <div className="mb-8">
        <h2 className="text-base md:text-xl font-semibold mb-3">
          Quick Actions
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">

          <button
            onClick={() => navigate("/seller/add-product")}
            className="p-3 md:p-5 bg-green-600 hover:bg-green-700 flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <FaPlus />
            Add
          </button>

          <button
            onClick={() => navigate("/seller/products")}
            className="p-3 md:p-5 bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <FaBoxOpen />
            Products
          </button>

          <button
            onClick={() => navigate("/seller/orders")}
            className="p-3 md:p-5 bg-purple-600 hover:bg-purple-700 flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <FaShoppingCart />
            Orders
          </button>

          <button
            onClick={() => navigate("/seller/profile")}
            className="p-3 md:p-5 bg-gray-700 hover:bg-gray-800 flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <FaEdit />
            Profile
          </button>

        </div>
      </div>

      {/* 🔥 SELLER DETAILS */}
      <div className="bg-white/5 border border-white/10 p-4 md:p-6">
        <h2 className="text-base md:text-xl font-semibold mb-4">
          Seller Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm md:text-base text-gray-300">

          <p><strong>Name:</strong> {seller.name}</p>
          <p><strong>Email:</strong> {seller.email}</p>
          <p><strong>Mobile:</strong> {seller.mobile}</p>

          <p>
            <strong>Location:</strong>{" "}
            {seller.location?.city}, {seller.location?.state}
          </p>

          <p>
            <strong>Status:</strong>{" "}
            <span className="px-2 py-1 bg-yellow-500/20 text-yellow-400 text-xs">
              {seller.adminApproval}
            </span>
          </p>

          <p>
            <strong>Verified:</strong>{" "}
            <span
              className={`px-2 py-1 text-xs ${
                seller.isVerified
                  ? "bg-green-500/20 text-green-400"
                  : "bg-red-500/20 text-red-400"
              }`}
            >
              {seller.isVerified ? "Verified" : "Not Verified"}
            </span>
          </p>

        </div>
      </div>

    </div>
  );
};

export default SellerDashboard;