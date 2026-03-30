import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { User, MapPin, Star, Wallet } from "lucide-react";

const SellerProfile = () => {

  // 🔥 Demo Data
  const demoSeller = {
    name: "Ramesh Yadav",
    email: "ramesh@gmail.com",
    mobile: "9876543210",
    profileImage: "",
    location: {
      city: "Meerut",
      state: "Uttar Pradesh",
    },
    rating: 4.5,
    totalReviews: 12,
    walletBalance: 25000,
    status: "active",
    isVerified: true,
    role: "seller",
    reviews: [
      {
        rating: 5,
        comment: "Very good quality animals 👍",
      },
      {
        rating: 4,
        comment: "Fast response seller",
      },
    ],
  };

  const [seller, setSeller] = useState(demoSeller);

  // 🔥 Fetch real data (override demo)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/seller/profile",
          { withCredentials: true }
        );

        if (res.data?.seller) {
          setSeller(res.data.seller); // override demo
        }

      } catch (err) {
        console.log("Using demo data...");
      }
    };

    fetchProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <motion.h1 className="text-3xl font-bold mb-8">
        Seller Profile 👨‍🌾
      </motion.h1>

      {/* Profile Card */}
      <div className="bg-white/10 border border-white/20 p-6 grid md:grid-cols-3 gap-6">

        {/* Left */}
        <div className="flex flex-col items-center text-center">
          <img
            src={
              seller.profileImage ||
              "https://via.placeholder.com/120"
            }
            alt="profile"
            className="w-28 h-28 rounded-full object-cover border"
          />

          <h2 className="text-xl font-semibold mt-3">
            {seller.name}
          </h2>

          <p className="text-gray-400 text-sm">
            {seller.email}
          </p>

          <p className="text-gray-400 text-sm">
            📞 {seller.mobile}
          </p>
        </div>

        {/* Middle */}
        <div className="space-y-4">

          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>
              {seller.location?.city}, {seller.location?.state}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Star size={16} className="text-yellow-400" />
            <span>
              {seller.rating} ({seller.totalReviews} reviews)
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Wallet size={16} className="text-green-400" />
            <span>₹{seller.walletBalance}</span>
          </div>

        </div>

        {/* Right */}
        <div className="space-y-4">

          <div>
            <span className="text-gray-400 text-sm">Account Status:</span>
            <p className="font-semibold capitalize">
              {seller.status}
            </p>
          </div>

          <div>
            <span className="text-gray-400 text-sm">Verification:</span>
            <p
              className={`font-semibold ${
                seller.isVerified ? "text-green-400" : "text-yellow-400"
              }`}
            >
              {seller.isVerified ? "Verified ✅" : "Pending ⏳"}
            </p>
          </div>

          <div>
            <span className="text-gray-400 text-sm">Role:</span>
            <p className="font-semibold">{seller.role}</p>
          </div>

        </div>

      </div>

      {/* Reviews */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>

        {seller.reviews?.length === 0 ? (
          <p className="text-gray-400">No reviews yet</p>
        ) : (
          <div className="space-y-4">
            {seller.reviews?.map((rev, i) => (
              <div
                key={i}
                className="bg-white/10 p-4 border border-white/20"
              >
                <p className="text-yellow-400">
                  ⭐ {rev.rating}
                </p>
                <p className="text-sm text-gray-300">
                  {rev.comment}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default SellerProfile;