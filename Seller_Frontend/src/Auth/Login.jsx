import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserCheck,
} from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const SellerLogin = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://api.apnapashu.com/api/seller/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("sellerToken", data.token);

      toast.success("Login Successful 🚀");

      setTimeout(() => navigate("/seller/dashboard"), 1200);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">

      {/* 🔥 LEFT BRANDING */}
      <div
        className="hidden md:flex w-1/2 relative items-center justify-center text-white px-12"
        style={{
          backgroundImage: "url('/images/seller_home.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-black/80"></div>

        <div className="relative z-10 max-w-md">
          <h1 className="text-4xl font-bold mb-4 leading-tight">
            Welcome Back to <span className="text-green-400">PashuSeva</span>
          </h1>

          <p className="text-gray-300">
            Login to manage your services, track bookings, and grow your
            livestock business seamlessly.
          </p>

          <div className="mt-6 flex items-center gap-2 text-sm text-gray-300">
            <FaUserCheck className="text-green-400" />
            Trusted platform for livestock service providers
          </div>
        </div>
      </div>

      {/* 🔥 RIGHT FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-4 py-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white border border-gray-200 shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Seller Login
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Email */}
            <div className="flex items-center border border-gray-300 px-3 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600">
              <FaEnvelope className="mr-2 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full outline-none text-sm"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            {/* Password */}
            <div className="flex items-center border border-gray-300 px-3 py-2 focus-within:border-green-600">
              <FaLock className="mr-2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                className="w-full outline-none text-sm"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 font-semibold hover:bg-green-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link to="/seller/register" className="text-green-600 font-semibold">
              Register
            </Link>
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default SellerLogin;