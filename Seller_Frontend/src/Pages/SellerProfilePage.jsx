import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSeller } from "../Context/authContext";
import axios from "axios";
import {
  FaUser,
  FaMapMarkerAlt,
  FaStar,
  FaWallet,
  FaEdit,
  FaPhone,
  FaEnvelope,
  FaIdCard,
  FaCheckCircle,
  FaTimesCircle,
  FaCalendarAlt,
  FaStore,
  FaUniversity,
} from "react-icons/fa";

const SellerProfile = () => {
  const { seller, loading, fetchSeller } = useSeller();

  const [showModal, setShowModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);

  const [form, setForm] = useState({});
  const [bankForm, setBankForm] = useState({});

  if (loading) return <p className="text-white p-4">Loading...</p>;
  if (!seller) return <p className="text-white p-4">No Seller Found</p>;

  // 🔥 Edit Profile
  const handleEdit = () => {
    setForm(seller);
    setShowModal(true);
  };

  // 🔥 Edit Bank
  const handleBankEdit = () => {
    setBankForm(seller.bankDetails || {});
    setShowBankModal(true);
  };

  // 🔥 Update Profile
  const handleUpdate = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/seller/profile/update",
        form,
        { withCredentials: true }
      );
      await fetchSeller();
      setShowModal(false);
    } catch {
      alert("Update failed");
    }
  };

  // 🔥 Update Bank
  const handleBankUpdate = async () => {
    try {
      await axios.put(
        "http://localhost:5000/api/seller/bank/update",
        { bankDetails: bankForm },
        { withCredentials: true }
      );
      await fetchSeller();
      setShowBankModal(false);
    } catch {
      alert("Bank update failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 py-4 md:p-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2">
          <FaUser /> Seller Profile
        </h1>

        <div className="flex gap-2">
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-green-600 px-3 py-2 text-sm hover:bg-green-700"
          >
            <FaEdit /> Edit
          </button>

          <button
            onClick={handleBankEdit}
            className="flex items-center gap-2 bg-blue-600 px-3 py-2 text-sm hover:bg-blue-700"
          >
            <FaUniversity /> Bank
          </button>
        </div>
      </div>

      {/* 🔥 PROFILE CARD */}
      <div className="bg-white/10 border border-white/20 p-4 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="text-center">
          <img
            src={seller.profileImage || "https://via.placeholder.com/120"}
            className="w-24 h-24 mx-auto rounded-full border"
          />
          <h2 className="mt-3 text-lg font-semibold flex justify-center gap-2 items-center">
            <FaUser /> {seller.name}
          </h2>

          <p className="text-gray-400 text-sm flex justify-center gap-2 items-center">
            <FaEnvelope /> {seller.email}
          </p>

          <p className="text-gray-400 text-sm flex justify-center gap-2 items-center">
            <FaPhone /> {seller.mobile}
          </p>

          <p className="text-green-400 text-sm flex justify-center gap-2 items-center">
            <FaStore /> {seller.businessName}
          </p>
        </div>

        {/* MIDDLE */}
        <div className="space-y-3 text-sm">
          <p className="flex items-center gap-2">
            <FaMapMarkerAlt /> {seller.location?.city}, {seller.location?.state}
          </p>

          <p className="flex items-center gap-2">
            <FaStar className="text-yellow-400" />
            {seller.rating} ({seller.totalReviews})
          </p>

          <p className="flex items-center gap-2">
            <FaWallet className="text-green-400" />
            ₹{seller.walletBalance}
          </p>

          <p className="flex items-center gap-2">
            <FaIdCard /> {seller._id}
          </p>
        </div>

        {/* RIGHT */}
        <div className="space-y-3 text-sm">

          <p><strong>Status:</strong> {seller.adminApproval}</p>

          <p className="flex items-center gap-2">
            {seller.isVerified ? (
              <>
                <FaCheckCircle className="text-green-400" />
                Verified
              </>
            ) : (
              <>
                <FaTimesCircle className="text-red-400" />
                Not Verified
              </>
            )}
          </p>

          <p><strong>Role:</strong> {seller.role}</p>

          {seller.rejectionReason && (
            <p className="text-red-400">{seller.rejectionReason}</p>
          )}

          <p className="text-gray-400 text-xs flex items-center gap-2">
            <FaCalendarAlt />
            {new Date(seller.createdAt).toLocaleDateString()}
          </p>

          {/* 🔥 BANK DETAILS */}
          <div className="mt-3 border-t border-white/10 pt-2">
            <p className="text-gray-400 flex items-center gap-2">
              <FaUniversity /> Bank Details
            </p>

            {seller.bankDetails?.bankName ? (
              <div className="text-xs mt-1 space-y-1">
                <p>🏦 {seller.bankDetails.bankName}</p>
                <p>👤 {seller.bankDetails.accountHolderName || "-"}</p>
                <p>🔢 ****{seller.bankDetails.accountNumber?.slice(-4)}</p>
                <p>IFSC: {seller.bankDetails.ifsc}</p>
              </div>
            ) : (
              <p className="text-red-400 text-xs mt-1">
                Not Added
              </p>
            )}
          </div>

        </div>

      </div>

      {/* 🔥 PROFILE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-gray-800 p-6 w-full max-w-md">

            <h2 className="mb-4 font-semibold flex gap-2">
              <FaEdit /> Edit Profile
            </h2>

            <input
              value={form.name || ""}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full mb-3 p-2 bg-gray-700"
              placeholder="Name"
            />

            <input
              value={form.mobile || ""}
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              className="w-full mb-3 p-2 bg-gray-700"
              placeholder="Mobile"
            />

            <input
              value={form.businessName || ""}
              onChange={(e) => setForm({ ...form, businessName: e.target.value })}
              className="w-full mb-3 p-2 bg-gray-700"
              placeholder="Business Name"
            />

            <div className="flex justify-between mt-4">
              <button onClick={() => setShowModal(false)} className="bg-gray-600 px-4 py-2">
                Cancel
              </button>

              <button onClick={handleUpdate} className="bg-green-600 px-4 py-2">
                Save
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 🔥 BANK MODAL */}
      {showBankModal && (
        <div className="fixed inset-0 bg-black/70 flex justify-center items-center">
          <div className="bg-gray-800 p-6 w-full max-w-md">

            <h2 className="mb-4 font-semibold flex gap-2">
              <FaUniversity /> Bank Details
            </h2>

            <input
              placeholder="Account Holder Name"
              value={bankForm.accountHolderName || ""}
              onChange={(e) =>
                setBankForm({ ...bankForm, accountHolderName: e.target.value })
              }
              className="w-full mb-3 p-2 bg-gray-700"
            />

            <input
              placeholder="Bank Name"
              value={bankForm.bankName || ""}
              onChange={(e) =>
                setBankForm({ ...bankForm, bankName: e.target.value })
              }
              className="w-full mb-3 p-2 bg-gray-700"
            />

            <input
              placeholder="Account Number"
              value={bankForm.accountNumber || ""}
              onChange={(e) =>
                setBankForm({ ...bankForm, accountNumber: e.target.value })
              }
              className="w-full mb-3 p-2 bg-gray-700"
            />

            <input
              placeholder="IFSC Code"
              value={bankForm.ifsc || ""}
              onChange={(e) =>
                setBankForm({ ...bankForm, ifsc: e.target.value })
              }
              className="w-full mb-3 p-2 bg-gray-700"
            />

            <div className="flex justify-between mt-4">
              <button
                onClick={() => setShowBankModal(false)}
                className="bg-gray-600 px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={handleBankUpdate}
                className="bg-blue-600 px-4 py-2"
              >
                Save
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default SellerProfile;