import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaBuilding,
  FaIdCard,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import toast from "react-hot-toast";

      {/* 🔥 LEFT BRANDING */}
      import { FaUsers, FaTools, FaShieldAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const SellerRegister = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    businessName: "",
    aadharNumber: "",
    city: "",
    state: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ country: "India" }),
          }
        );
        const data = await res.json();
        setStates(data.data.states);
      } catch (err) {
        console.log(err);
      }
    };
    fetchStates();
  }, []);

  const fetchCities = async (state) => {
    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ country: "India", state }),
        }
      );
      const data = await res.json();
      setCities(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "state") {
      fetchCities(value);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "http://localhost:5000/api/seller/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      toast.success("Seller Registered Successfully 🚀");

      setTimeout(() => navigate("/seller/login"), 1500);
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">


<div
  className="hidden md:flex w-1/2 relative items-center justify-center text-white px-12"
  style={{
    backgroundImage: "url('/images/seller_home.jpg')", // ✅ FIXED PATH
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-green-900/80 to-black/80"></div>

  <div className="relative z-10 max-w-md">

    {/* Heading */}
    <h1 className="text-4xl font-bold mb-4 leading-tight">
      Grow with <span className="text-green-400">PashuSeva</span>
    </h1>

    {/* Description */}
    <p className="text-gray-300 text-base leading-relaxed">
      Join India’s fast-growing livestock platform designed to empower sellers,
      veterinarians, and service providers. Expand your reach, manage your
      services efficiently, and build a trusted digital presence.
    </p>

    {/* Features */}
    <div className="mt-8 space-y-4">

      <div className="flex items-start gap-3">
        <FaUsers className="text-green-400 mt-1" />
        <div>
          <p className="font-semibold">Reach More Customers</p>
          <p className="text-sm text-gray-400">
            Connect with farmers across multiple cities and grow your network.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <FaTools className="text-green-400 mt-1" />
        <div>
          <p className="font-semibold">Easy Service Management</p>
          <p className="text-sm text-gray-400">
            Manage bookings, services, and operations from one dashboard.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <FaShieldAlt className="text-green-400 mt-1" />
        <div>
          <p className="font-semibold">Secure & Trusted Platform</p>
          <p className="text-sm text-gray-400">
            Verified system ensuring safety and reliability for sellers.
          </p>
        </div>
      </div>

    </div>
  </div>
</div>

      {/* 🔥 FORM */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50 px-4 py-10">

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white border border-gray-200 shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
            Seller Register
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* INPUTS */}
            {[
              { name: "name", icon: <FaUser />, placeholder: "Full Name" },
              { name: "email", icon: <FaEnvelope />, placeholder: "Email" },
              { name: "mobile", icon: <FaPhone />, placeholder: "Mobile Number" },
              { name: "businessName", icon: <FaBuilding />, placeholder: "Business Name" },
              { name: "aadharNumber", icon: <FaIdCard />, placeholder: "Aadhar Number" },
            ].map((field, i) => (
              <div
                key={i}
                className="flex items-center border border-gray-300 px-3 py-2 focus-within:border-green-600 focus-within:ring-1 focus-within:ring-green-600"
              >
                <span className="mr-2 text-gray-500">{field.icon}</span>
                <input
                  type="text"
                  name={field.name}
                  placeholder={field.placeholder}
                  className="w-full outline-none text-sm"
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                />
              </div>
            ))}

            {/* STATE */}
            <div className="flex items-center border border-gray-300 px-3 py-2 focus-within:border-green-600">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full outline-none text-sm"
                required
              >
                <option value="">Select State</option>
                {states.map((s, i) => (
                  <option key={i} value={s.name}>{s.name}</option>
                ))}
              </select>
            </div>

            {/* CITY */}
            <div className="flex items-center border border-gray-300 px-3 py-2 focus-within:border-green-600">
              <FaMapMarkerAlt className="mr-2 text-gray-500" />
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full outline-none text-sm"
                required
              >
                <option value="">Select City</option>
                {cities.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* PASSWORD */}
            <div className="flex items-center border border-gray-300 px-3 py-2 focus-within:border-green-600">
              <FaLock className="mr-2 text-gray-500" />
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
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white py-2 font-semibold hover:bg-green-700 transition"
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>

          <p className="text-sm text-center mt-4">
            Already have an account?{" "}
            <Link to="/seller/login" className="text-green-600 font-semibold">
              Login
            </Link>
          </p>
        </motion.div>

      </div>
    </div>
  );
};

export default SellerRegister;