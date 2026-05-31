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
import { useSeller } from "../Context/authContext";

const SellerLogin = () => {
  const navigate = useNavigate();
  const { loginSeller } = useSeller();

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

    try {
      setLoading(true);

      const res = await loginSeller(formData);

      console.log(res);

      if (res?.success) {
        toast.success("Login Successful");

        navigate("/seller/dashboard");
      } else {
        toast.error(res?.message || "Login Failed");
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

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-3">
      {/* LOGIN BOX */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white border border-gray-200 shadow-sm p-6"
      >
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="w-14 h-14 bg-green-100 flex items-center justify-center mx-auto mb-4">
            <FaUserCheck className="text-green-600 text-xl" />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Seller Login
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Login to your seller account
          </p>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* EMAIL */}
          <div className="flex items-center border border-gray-300 px-3 py-3 focus-within:border-green-600 transition">
            <FaEnvelope className="mr-3 text-gray-400" />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full outline-none text-sm"
              required
            />
          </div>

          {/* PASSWORD */}
          <div className="flex items-center border border-gray-300 px-3 py-3 focus-within:border-green-600 transition">
            <FaLock className="mr-3 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none text-sm"
              required
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-gray-500"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {/* FORGOT PASSWORD */}
          <div className="flex justify-end">
            <Link
              to="/seller/forgot-password"
              className="text-sm text-green-600 hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 font-semibold transition disabled:opacity-60"
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-5 text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/seller/register"
            className="text-green-600 font-semibold hover:underline"
          >
            Register
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SellerLogin;