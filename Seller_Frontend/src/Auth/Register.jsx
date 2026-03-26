import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  MapPin,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const SellerRegister = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    city: "",
    state: "",
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
        "http://localhost:5000/api/seller/register",
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
        throw new Error(data.message || "Registration failed");
      }

      // ✅ Toast
      toast.success("Seller Registered Successfully 🚀");

      // 🔄 Redirect
      setTimeout(() => {
        navigate("/seller/login");
      }, 1500);
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
          "url('https://images.unsplash.com/photo-1556740749-887f6717d7e4')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 text-white"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          Seller Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Inputs */}
          {[
            { name: "name", icon: <User size={18} />, placeholder: "Full Name", type: "text" },
            { name: "email", icon: <Mail size={18} />, placeholder: "Email", type: "email" },
            { name: "mobile", icon: <Phone size={18} />, placeholder: "Mobile Number", type: "text" },
            { name: "city", icon: <MapPin size={18} />, placeholder: "City", type: "text" },
            { name: "state", icon: <MapPin size={18} />, placeholder: "State", type: "text" },
          ].map((field, i) => (
            <motion.div
              key={i}
              whileFocus={{ scale: 1.03 }}
              className="flex items-center border border-white/30 px-3 py-2 bg-white/10"
            >
              <span className="mr-2 text-white/80">{field.icon}</span>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full outline-none bg-transparent text-white placeholder-white/70"
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </motion.div>
          ))}

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
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
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
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-white/80">
          Already have an account?{" "}
          <Link to="/seller/login" className="text-blue-300 font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SellerRegister;