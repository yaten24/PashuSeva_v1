import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
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

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ================= HANDLE SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await loginDoctor(formData);

      console.log(res);

      if (res?.success) {
        toast.success("Login Successful");

        navigate("/doctor/dashboard");
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (error) {
      console.log(error);

      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // ================= ANIMATION =================
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 15,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      {/* LOGIN BOX */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-white border border-gray-200 shadow-md p-6 sm:p-8"
      >
        {/* HEADER */}
        <motion.div
          variants={item}
          className="flex flex-col items-center mb-8"
        >
          <div className="w-14 h-14 bg-green-100 flex items-center justify-center mb-4">
            <Stethoscope className="text-green-600" size={28} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Doctor Login
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Access your dashboard
          </p>
        </motion.div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <motion.div variants={item}>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Email
            </label>

            <div className="flex items-center border border-gray-300 px-4 py-3 focus-within:border-green-600 transition">
              <Mail size={18} className="text-gray-400 mr-3" />

              <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                className="w-full outline-none text-sm bg-transparent"
                required
              />
            </div>
          </motion.div>

          {/* PASSWORD */}
          <motion.div variants={item}>
            <label className="text-sm font-medium text-gray-700 block mb-2">
              Password
            </label>

            <div className="flex items-center border border-gray-300 px-4 py-3 focus-within:border-green-600 transition">
              <Lock size={18} className="text-gray-400 mr-3" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                className="w-full outline-none text-sm bg-transparent"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500"
              >
                {showPassword ? (
                  <EyeOff size={18} />
                ) : (
                  <Eye size={18} />
                )}
              </button>
            </div>
          </motion.div>

          {/* FORGOT PASSWORD */}
          <motion.div
            variants={item}
            className="flex justify-end"
          >
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
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold transition disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </motion.button>
        </form>

        {/* FOOTER */}
        <motion.p
          variants={item}
          className="text-center text-sm text-gray-600 mt-6"
        >
          Don’t have an account?{" "}
          <Link
            to="/doctor/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

export default DoctorLogin;