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
import { motion } from "framer-motion";
import { useSeller } from "../Context/authContext";

const SellerRegister = () => {
  const navigate = useNavigate();
  const { registerSeller } = useSeller();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

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

  // ================= FETCH STATES =================
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await fetch(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              country: "India",
            }),
          }
        );

        const data = await res.json();

        setStates(data?.data?.states || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStates();
  }, []);

  // ================= FETCH CITIES =================
  const fetchCities = async (state) => {
    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            country: "India",
            state,
          }),
        }
      );

      const data = await res.json();

      setCities(data?.data || []);
    } catch (error) {
      console.log(error);
    }
  };

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "state") {
      fetchCities(value);

      setFormData((prev) => ({
        ...prev,
        state: value,
        city: "",
      }));
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await registerSeller(formData);

      if (res?.success) {
        toast.success("Registered Successfully");

        navigate("/seller/dashboard");
      } else {
        toast.error(res?.message || "Registration Failed");
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
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-3 py-6">
      {/* REGISTER BOX */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl bg-white border border-gray-200 shadow-sm p-5"
      >
        {/* HEADER */}
        <div className="text-center mb-5">
          <h2 className="text-2xl font-bold text-gray-800">
            Seller Register
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Create your seller account
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {/* NAME */}
          <InputField
            icon={<FaUser />}
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />

          {/* MOBILE */}
          <InputField
            icon={<FaPhone />}
            name="mobile"
            placeholder="Mobile Number"
            value={formData.mobile}
            onChange={handleChange}
          />

          {/* EMAIL */}
          <InputField
            icon={<FaEnvelope />}
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />

          {/* BUSINESS */}
          <InputField
            icon={<FaBuilding />}
            name="businessName"
            placeholder="Business Name"
            value={formData.businessName}
            onChange={handleChange}
          />

          {/* AADHAR */}
          <InputField
            icon={<FaIdCard />}
            name="aadharNumber"
            placeholder="Aadhar Number"
            value={formData.aadharNumber}
            onChange={handleChange}
          />

          {/* STATE */}
          <div className="flex items-center border border-gray-300 px-3 py-3">
            <FaMapMarkerAlt className="mr-3 text-gray-400" />

            <select
              name="state"
              value={formData.state}
              onChange={handleChange}
              className="w-full outline-none text-sm bg-transparent"
              required
            >
              <option value="">Select State</option>

              {states.map((state, index) => (
                <option key={index} value={state.name}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>

          {/* CITY */}
          <div className="flex items-center border border-gray-300 px-3 py-3">
            <FaMapMarkerAlt className="mr-3 text-gray-400" />

            <select
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="w-full outline-none text-sm bg-transparent"
              required
            >
              <option value="">Select City</option>

              {cities.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>

          {/* PASSWORD */}
          <div className="sm:col-span-2 flex items-center border border-gray-300 px-3 py-3">
            <FaLock className="mr-3 text-gray-400" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
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

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="sm:col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 font-semibold transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* FOOTER */}
        <p className="text-sm text-center mt-5 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/seller/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

// ================= INPUT FIELD =================

const InputField = ({
  icon,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <div className="flex items-center border border-gray-300 px-3 py-3">
      <span className="mr-3 text-gray-400">
        {icon}
      </span>

      <input
        type="text"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full outline-none text-sm"
        required
      />
    </div>
  );
};

export default SellerRegister;