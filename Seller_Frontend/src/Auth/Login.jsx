import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
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

  // 🔹 Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/seller/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Token Save
      localStorage.setItem("sellerToken", data.token);

      toast.success("Login Successful 🎉");

      // 🔄 Redirect
      setTimeout(() => {
        navigate("/seller/dashboard");
      }, 1200);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1526256262350-7da7584cf5eb')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* 🔥 Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 text-white"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Seller Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Email */}
          <div className="flex items-center border border-white/30 px-3 py-2 bg-white/10">
            <Mail size={18} className="mr-2 text-white/80" />
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full outline-none bg-transparent text-white placeholder-white/70"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {/* Password */}
          <div className="flex items-center border border-white/30 px-3 py-2 bg-white/10">
            <Lock size={18} className="mr-2 text-white/80" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent text-white placeholder-white/70"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 py-2 font-semibold shadow-lg"
          >
            {loading ? "Logging in..." : "Login"}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-white/80">
          Don't have an account?{" "}
          <Link to="/seller/register" className="text-blue-300 font-semibold">
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SellerLogin;