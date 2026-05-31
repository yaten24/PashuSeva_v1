import React from "react";
import { useSeller } from "../Context/authContext";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaBoxOpen,
  FaShoppingCart,
  FaWallet,
  FaPlus,
  FaSignOutAlt,
} from "react-icons/fa";

const SellerDashboard = () => {
  const {
    seller,
    loading,
    logoutSeller,
  } = useSeller();

  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutSeller();
    navigate("/seller/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-orange-600 font-semibold">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-red-500 font-semibold">
          No Seller Found
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50 py-5 px-3">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <div className="mb-5 bg-white border-2 border-orange-200 p-4 shadow-sm flex justify-between items-center">

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-orange-700">
              Welcome, {seller.name}
            </h1>

            <p className="text-sm text-gray-500">
              {seller.businessName}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2"
          >
            <FaSignOutAlt />
            Logout
          </button>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-5">

          <div className="bg-white border-2 border-orange-200 p-4 shadow-sm">

            <div className="flex items-center gap-2 mb-2">
              <FaWallet className="text-green-600" />
              <h3 className="text-sm font-semibold text-gray-700">
                Wallet Balance
              </h3>
            </div>

            <p className="text-2xl font-bold text-gray-800">
              ₹{seller.walletBalance || 0}
            </p>

          </div>

          <div className="bg-white border-2 border-orange-200 p-4 shadow-sm">

            <div className="flex items-center gap-2 mb-2">
              <FaShoppingCart className="text-blue-600" />
              <h3 className="text-sm font-semibold text-gray-700">
                Orders
              </h3>
            </div>

            <p className="text-2xl font-bold text-gray-800">
              0
            </p>

          </div>

          <div className="bg-white border-2 border-orange-200 p-4 shadow-sm col-span-2 md:col-span-1">

            <div className="flex items-center gap-2 mb-2">
              <FaUser className="text-yellow-600" />
              <h3 className="text-sm font-semibold text-gray-700">
                Rating
              </h3>
            </div>

            <p className="text-2xl font-bold text-gray-800">
              {seller.rating || 0} ⭐
            </p>

          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="mb-5">

          <h2 className="text-lg font-bold text-orange-700 mb-3">
            Quick Actions
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            <button
              onClick={() =>
                navigate("/seller/add-product")
              }
              className="bg-green-500 hover:bg-green-600 text-white p-4 flex items-center justify-center gap-2 font-medium"
            >
              <FaPlus />
              Add Product
            </button>

            <button
              onClick={() =>
                navigate("/seller/products")
              }
              className="bg-blue-500 hover:bg-blue-600 text-white p-4 flex items-center justify-center gap-2 font-medium"
            >
              <FaBoxOpen />
              Products
            </button>

            <button
              onClick={() =>
                navigate("/seller/orders")
              }
              className="bg-purple-500 hover:bg-purple-600 text-white p-4 flex items-center justify-center gap-2 font-medium"
            >
              <FaShoppingCart />
              Orders
            </button>

            <button
              onClick={() =>
                navigate("/seller/withdraw")
              }
              className="bg-orange-500 hover:bg-orange-600 text-white p-4 flex items-center justify-center gap-2 font-medium"
            >
              <FaWallet />
              Withdraw
            </button>

          </div>

        </div>
                {/* SELLER INFORMATION */}

        <div className="bg-white border-2 border-orange-200 shadow-sm p-5">

          <div className="flex items-center justify-between mb-4">

            <h2 className="text-lg font-bold text-orange-700">
              Seller Information
            </h2>

            <span
              className={`px-3 py-1 text-xs font-semibold ${
                seller.isVerified
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {seller.isVerified
                ? "Verified Seller"
                : "Not Verified"}
            </span>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

            <div className="border border-orange-100 p-3 bg-orange-50">

              <p className="text-gray-500 text-xs mb-1">
                Seller Name
              </p>

              <p className="font-semibold text-gray-800">
                {seller.name}
              </p>

            </div>

            <div className="border border-orange-100 p-3 bg-orange-50">

              <p className="text-gray-500 text-xs mb-1">
                Business Name
              </p>

              <p className="font-semibold text-gray-800">
                {seller.businessName ||
                  "Not Available"}
              </p>

            </div>

            <div className="border border-orange-100 p-3 bg-orange-50">

              <p className="text-gray-500 text-xs mb-1">
                Email Address
              </p>

              <p className="font-semibold text-gray-800 break-all">
                {seller.email}
              </p>

            </div>

            <div className="border border-orange-100 p-3 bg-orange-50">

              <p className="text-gray-500 text-xs mb-1">
                Mobile Number
              </p>

              <p className="font-semibold text-gray-800">
                {seller.mobile}
              </p>

            </div>

            <div className="border border-orange-100 p-3 bg-orange-50">

              <p className="text-gray-500 text-xs mb-1">
                City
              </p>

              <p className="font-semibold text-gray-800">
                {seller.location?.city ||
                  "Not Available"}
              </p>

            </div>

            <div className="border border-orange-100 p-3 bg-orange-50">

              <p className="text-gray-500 text-xs mb-1">
                State
              </p>

              <p className="font-semibold text-gray-800">
                {seller.location?.state ||
                  "Not Available"}
              </p>

            </div>

            <div className="border border-orange-100 p-3 bg-orange-50">

              <p className="text-gray-500 text-xs mb-1">
                Approval Status
              </p>

              <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold">
                {seller.adminApproval ||
                  "Pending"}
              </span>

            </div>

            <div className="border border-orange-100 p-3 bg-orange-50">

              <p className="text-gray-500 text-xs mb-1">
                Wallet Balance
              </p>

              <p className="font-bold text-green-600">
                ₹
                {seller.walletBalance ||
                  0}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default SellerDashboard;