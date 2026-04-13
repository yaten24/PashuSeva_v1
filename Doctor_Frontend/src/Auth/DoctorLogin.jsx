import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import { FaUserMd, FaCalendarCheck, FaRupeeSign } from "react-icons/fa";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useDoctorAuth } from "../Context/DoctorAuthContext";

const DoctorLogin = () => {
  const navigate = useNavigate();
  const { loginDoctor } = useDoctorAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await loginDoctor(formData);

    if (res.success) {
      toast.success("Doctor Login Successful 🩺");
      navigate("/doctor/dashboard");
    } else {
      toast.error(res.message);
    }

    setLoading(false);
  };

  // 🔥 Animation configs
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100">

      {/* 🔥 LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden md:flex md:w-1/2 relative text-white items-center justify-center px-10"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/70"></div>

        <motion.div
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-10 max-w-md"
        >
          <h1 className="text-4xl font-bold">
            Welcome Back{" "}
            <span className="text-green-400">Doctor</span>
          </h1>

          <p className="mt-4 text-gray-200">
            Login to manage your patients and grow your practice.
          </p>

          <div className="mt-6 space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <FaUserMd className="text-green-400" />
              <span>Manage Your Profile</span>
            </div>
            <div className="flex items-center gap-3">
              <FaCalendarCheck className="text-green-400" />
              <span>Track Appointments</span>
            </div>
            <div className="flex items-center gap-3">
              <FaRupeeSign className="text-green-400" />
              <span>Monitor Earnings</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 🔥 RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10">

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-md bg-white p-6 shadow-lg border border-gray-300 rounded-lg"
        >
          <motion.h2
            variants={item}
            className="text-2xl font-bold mb-6 text-gray-800 text-center"
          >
            Doctor Login
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* EMAIL */}
            <motion.div
              variants={item}
              className="flex items-center border border-gray-300 px-3 py-2 rounded-md focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-200"
            >
              <Mail size={18} className="mr-2 text-gray-500" />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="w-full outline-none text-sm"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </motion.div>

            {/* PASSWORD */}
            <motion.div
              variants={item}
              className="flex items-center border border-gray-300 px-3 py-2 rounded-md focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-200"
            >
              <Lock size={18} className="mr-2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full outline-none text-sm"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </motion.div>

            {/* 🔥 FORGOT PASSWORD */}
            <motion.div variants={item} className="text-right">
              <Link
                to="/doctor/forgot-password"
                className="text-sm text-green-600 hover:underline"
              >
                Forgot Password?
              </Link>
            </motion.div>

            {/* BUTTON */}
            <motion.button
              variants={item}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </motion.button>
          </form>

          {/* FOOTER */}
          <motion.p
            variants={item}
            className="text-sm text-center mt-4 text-gray-600"
          >
            Don’t have an account?{" "}
            <Link to="/doctor/register" className="text-green-600 font-semibold">
              Register
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default DoctorLogin;