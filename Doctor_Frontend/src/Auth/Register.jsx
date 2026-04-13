import React, { useState, useEffect } from "react";
import { useDoctorAuth } from "../Context/DoctorAuthContext";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { FaUserMd, FaCalendarCheck, FaRupeeSign } from "react-icons/fa";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Phone,
  Briefcase,
  DollarSign,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

const DoctorRegister = () => {
  const { registerDoctor } = useDoctorAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    specialization: "",
    qualification: "",
    experience: "",
    consultationFee: "",
    state: "",
    city: "",
    aadhaar: "",
  });

  // 🔥 FETCH STATES
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      body: JSON.stringify({ country: "India" }),
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => setStates(data.data.states));
  }, []);

  // 🔥 FETCH CITIES
  const handleStateChange = async (e) => {
    const selectedState = e.target.value;

    setFormData({ ...formData, state: selectedState, city: "" });

    const res = await fetch(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      {
        method: "POST",
        body: JSON.stringify({ country: "India", state: selectedState }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await res.json();
    setCities(data.data);
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔥 SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await registerDoctor(formData);

    if (res.success) {
      toast.success(res.message || "Registered Successfully");
      navigate("/doctor/dashboard");
    } else {
      toast.error(res.message);
    }

    setLoading(false);
  };

  // 🔥 ANIMATION
  const container = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="h-screen flex bg-gray-100">

      {/* 🔥 LEFT SIDE */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="hidden md:flex w-1/2 relative text-white items-center justify-center px-10"
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
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-md text-center"
        >
          <h1 className="text-3xl font-bold">
            Join <span className="text-green-400">PashuSeva</span>
          </h1>

          <p className="mt-4 text-gray-200 text-sm">
            Build your digital veterinary practice and connect with farmers.
          </p>

          <div className="mt-6 space-y-3 text-left">
            <div className="flex items-center gap-3 bg-white/10 px-3 py-2 border border-white/20">
              <FaUserMd className="text-green-400" />
              <span>Verified Doctor Profile</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-3 py-2 border border-white/20">
              <FaCalendarCheck className="text-green-400" />
              <span>Easy Appointment Management</span>
            </div>
            <div className="flex items-center gap-3 bg-white/10 px-3 py-2 border border-white/20">
              <FaRupeeSign className="text-green-400" />
              <span>Increase Your Earnings</span>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 🔥 RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-3">

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="w-full max-w-md bg-white p-3 shadow-md border border-gray-300 rounded-lg"
        >
          <motion.h2
            variants={item}
            className="text-lg font-semibold mb-3 text-center"
          >
            Doctor Register
          </motion.h2>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-1.5">

            <Field item={item}>
              <Input icon={<User size={14} />} name="name" placeholder="Name" onChange={handleChange} />
            </Field>

            <Field item={item}>
              <Input icon={<Phone size={14} />} name="mobile" placeholder="Mobile" onChange={handleChange} />
            </Field>

            <Field item={item}>
              <Input icon={<Mail size={14} />} name="email" placeholder="Email" onChange={handleChange} />
            </Field>

            <Field item={item}>
              <Input icon={<User size={14} />} name="aadhaar" placeholder="Aadhaar" onChange={handleChange} />
            </Field>

            <Field item={item}>
              <Select icon={<Briefcase size={14} />} name="qualification"
                options={["B.V.Sc", "M.V.Sc", "PhD"]}
                onChange={handleChange} placeholder="Qualification"
              />
            </Field>

            <Field item={item}>
              <Select icon={<Briefcase size={14} />} name="specialization"
                options={["General", "Surgery", "Dairy"]}
                onChange={handleChange} placeholder="Specialization"
              />
            </Field>

            <Field item={item}>
              <Select icon={<MapPin size={14} />} name="state"
                options={states.map((s) => s.name)}
                onChange={handleStateChange} placeholder="State"
              />
            </Field>

            <Field item={item}>
              <Select icon={<MapPin size={14} />} name="city"
                options={cities}
                onChange={handleChange} placeholder="City"
              />
            </Field>

            <Field item={item}>
              <Input icon={<Briefcase size={14} />} name="experience" placeholder="Exp" onChange={handleChange} />
            </Field>

            <Field item={item}>
              <Input icon={<DollarSign size={14} />} name="consultationFee" placeholder="Fee" onChange={handleChange} />
            </Field>

            {/* PASSWORD */}
            <motion.div
              variants={item}
              className="col-span-2 flex items-center border border-gray-300 px-2 py-1.5 rounded-md focus-within:border-green-600"
            >
              <Lock size={14} className="mr-2 text-gray-500" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                className="w-full outline-none text-xs"
                onChange={handleChange}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </motion.div>

            {/* BUTTON */}
            <motion.button
              variants={item}
              type="submit"
              disabled={loading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="col-span-2 bg-green-600 hover:bg-green-700 text-white py-1.5 rounded-md text-xs font-semibold disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </motion.button>

          </form>
        </motion.div>
      </div>
    </div>
  );
};

// 🔥 WRAPPER FOR ANIMATION
const Field = ({ children, item }) => (
  <motion.div variants={item}>{children}</motion.div>
);

// 🔥 INPUT
const Input = ({ icon, ...props }) => (
  <div className="flex items-center border border-gray-300 px-2 py-1.5 rounded-md focus-within:border-green-600">
    <span className="mr-2 text-gray-500">{icon}</span>
    <input className="w-full outline-none text-xs" {...props} />
  </div>
);

// 🔥 SELECT
const Select = ({ icon, options, placeholder, ...props }) => (
  <div className="flex items-center border border-gray-300 px-2 py-1.5 rounded-md focus-within:border-green-600">
    <span className="mr-2 text-gray-500">{icon}</span>
    <select className="w-full outline-none text-xs bg-transparent" {...props}>
      <option value="">{placeholder}</option>
      {options.map((opt, i) => (
        <option key={i}>{opt}</option>
      ))}
    </select>
  </div>
);

export default DoctorRegister;