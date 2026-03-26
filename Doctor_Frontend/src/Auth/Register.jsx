import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  Briefcase,
  DollarSign,
} from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const DoctorRegister = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    specialization: "",
    experience: "",
    consultationFee: "",
  });

  const [loading, setLoading] = useState(false);

  // 🔹 Input Change
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
        "http://localhost:5000/api/doctor/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            experience: Number(formData.experience),
            consultationFee: Number(formData.consultationFee),
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      toast.success("Doctor Registered Successfully 🚀");

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
          "url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5')",
      }}
    >
      {/* 🔹 Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      {/* 🔥 Animated Card */}
      <motion.div
        initial={{ opacity: 0, y: 60, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative w-full max-w-lg bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl p-8 text-white"
      >
        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-6">
          Doctor Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Input Style */}
          {[
            { name: "name", icon: <User size={18} />, placeholder: "Full Name", type: "text" },
            { name: "email", icon: <Mail size={18} />, placeholder: "Email", type: "email" },
            { name: "mobile", icon: <Phone size={18} />, placeholder: "Mobile Number", type: "text" },
            { name: "specialization", icon: <Briefcase size={18} />, placeholder: "Specialization", type: "text" },
            { name: "experience", icon: <Briefcase size={18} />, placeholder: "Experience (years)", type: "number" },
            { name: "consultationFee", icon: <DollarSign size={18} />, placeholder: "Consultation Fee (₹)", type: "number" },
          ].map((field, i) => (
            <motion.div
              key={i}
              whileFocus={{ scale: 1.02 }}
              className="flex items-center border border-white/30 px-3 py-2 bg-white/10 backdrop-blur-md"
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
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 py-2 font-semibold shadow-lg"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        {/* Footer */}
        <p className="text-sm text-center mt-4 text-white/80">
          Already have an account?{" "}
          <Link to="/doctor/login" className="text-blue-300 font-semibold">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default DoctorRegister;