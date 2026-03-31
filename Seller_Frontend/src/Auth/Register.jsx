import React, { useState, useEffect } from "react";
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

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [loading, setLoading] = useState(false);

  // 🔥 Load States
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

  // 🔥 Load Cities based on State
  const fetchCities = async (state) => {
    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            country: "India",
            state: state,
          }),
        }
      );

      const data = await res.json();
      setCities(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🔹 Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    // 🔥 When state changes → fetch cities
    if (name === "state") {
      fetchCities(value);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  };

  // 🔹 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(
        "https://api.apnapashu.com/api/seller/register",
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

      toast.success("Seller Registered Successfully 🚀");

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
    <div className="min-h-screen flex items-center justify-center px-4 bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556740749-887f6717d7e4')",
      }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

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

          {/* Basic Inputs */}
          {[
            { name: "name", icon: <User size={18} />, placeholder: "Full Name", type: "text" },
            { name: "email", icon: <Mail size={18} />, placeholder: "Email", type: "email" },
            { name: "mobile", icon: <Phone size={18} />, placeholder: "Mobile Number", type: "text" },
          ].map((field, i) => (
            <div key={i} className="flex items-center border border-white/30 px-3 py-2 bg-white/10">
              <span className="mr-2">{field.icon}</span>
              <input
                type={field.type}
                name={field.name}
                placeholder={field.placeholder}
                className="w-full outline-none bg-transparent text-white"
                value={formData[field.name]}
                onChange={handleChange}
                required
              />
            </div>
          ))}

          {/* 🔥 State Dropdown */}
          <div className="flex items-center border border-white/30 px-3 py-2 bg-white/10">
            <MapPin size={18} className="mr-2" />
            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full bg-transparent text-white outline-none"
              required
            >
              <option value="">Select State</option>
              {states.map((s, i) => (
                <option key={i} value={s.name} className="text-black">
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          {/* 🔥 City Dropdown */}
          <div className="flex items-center border border-white/30 px-3 py-2 bg-white/10">
            <MapPin size={18} className="mr-2" />
            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full bg-transparent text-white outline-none"
              required
              disabled={!formData.state}
            >
              <option value="">Select City</option>
              {cities.map((city, i) => (
                <option key={i} value={city} className="text-black">
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="flex items-center border border-white/30 px-3 py-2 bg-white/10">
            <Lock size={18} className="mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="w-full outline-none bg-transparent text-white"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-500 to-blue-600 py-2 font-semibold"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/seller/login" className="text-blue-300">
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default SellerRegister;