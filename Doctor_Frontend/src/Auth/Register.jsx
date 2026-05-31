import React, { useState, useEffect } from "react";
import { useDoctorAuth } from "../Context/DoctorAuthContext";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
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
  Stethoscope,
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

  // ================= FETCH STATES =================
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/states", {
      method: "POST",
      body: JSON.stringify({ country: "India" }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setStates(data?.data?.states || []);
      })
      .catch((err) => console.log(err));
  }, []);

  // ================= HANDLE STATE =================
  const handleStateChange = async (e) => {
    const selectedState = e.target.value;

    setFormData((prev) => ({
      ...prev,
      state: selectedState,
      city: "",
    }));

    try {
      const res = await fetch(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          method: "POST",
          body: JSON.stringify({
            country: "India",
            state: selectedState,
          }),
          headers: {
            "Content-Type": "application/json",
          },
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
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await registerDoctor(formData);

      if (res?.success) {
        toast.success(res?.message || "Registered Successfully");

        navigate("/doctor/dashboard");
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

  // ================= ANIMATION =================
  const container = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const item = {
    hidden: {
      opacity: 0,
      y: 12,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-3 py-6">
      {/* REGISTER BOX */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="w-full max-w-3xl bg-white border border-gray-200 shadow-sm p-4 sm:p-6"
      >
        {/* HEADER */}
        <motion.div
          variants={item}
          className="flex flex-col items-center mb-6"
        >
          <div className="w-14 h-14 bg-green-100 flex items-center justify-center mb-3">
            <Stethoscope className="text-green-600" size={28} />
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Doctor Register
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Create your doctor account
          </p>
        </motion.div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {/* NAME */}
          <Field item={item}>
            <Input
              icon={<User size={16} />}
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />
          </Field>

          {/* MOBILE */}
          <Field item={item}>
            <Input
              icon={<Phone size={16} />}
              name="mobile"
              placeholder="Mobile Number"
              value={formData.mobile}
              onChange={handleChange}
            />
          </Field>

          {/* EMAIL */}
          <Field item={item}>
            <Input
              icon={<Mail size={16} />}
              name="email"
              type="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />
          </Field>

          {/* AADHAAR */}
          <Field item={item}>
            <Input
              icon={<User size={16} />}
              name="aadhaar"
              placeholder="Aadhaar Number"
              value={formData.aadhaar}
              onChange={handleChange}
            />
          </Field>

          {/* QUALIFICATION */}
          <Field item={item}>
            <Select
              icon={<Briefcase size={16} />}
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              placeholder="Qualification"
              options={["B.V.Sc", "M.V.Sc", "PhD"]}
            />
          </Field>

          {/* SPECIALIZATION */}
          <Field item={item}>
            <Select
              icon={<Briefcase size={16} />}
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Specialization"
              options={[
                "General",
                "Surgery",
                "Dairy",
                "Veterinary",
              ]}
            />
          </Field>

          {/* STATE */}
          <Field item={item}>
            <Select
              icon={<MapPin size={16} />}
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              placeholder="Select State"
              options={states.map((s) => s.name)}
            />
          </Field>

          {/* CITY */}
          <Field item={item}>
            <Select
              icon={<MapPin size={16} />}
              name="city"
              value={formData.city}
              onChange={handleChange}
              placeholder="Select City"
              options={cities}
            />
          </Field>

          {/* EXPERIENCE */}
          <Field item={item}>
            <Input
              icon={<Briefcase size={16} />}
              name="experience"
              placeholder="Experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </Field>

          {/* CONSULTATION FEE */}
          <Field item={item}>
            <Input
              icon={<DollarSign size={16} />}
              name="consultationFee"
              placeholder="Consultation Fee"
              value={formData.consultationFee}
              onChange={handleChange}
            />
          </Field>

          {/* PASSWORD */}
          <motion.div
            variants={item}
            className="sm:col-span-2 flex items-center border border-gray-300 px-4 py-3 focus-within:border-green-600 transition"
          >
            <Lock size={16} className="text-gray-400 mr-3" />

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full outline-none text-sm"
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
          </motion.div>

          {/* BUTTON */}
          <motion.button
            variants={item}
            type="submit"
            disabled={loading}
            whileTap={{ scale: 0.98 }}
            className="sm:col-span-2 bg-green-600 hover:bg-green-700 text-white py-3 font-semibold transition disabled:opacity-60"
          >
            {loading ? "Registering..." : "Register"}
          </motion.button>
        </form>

        {/* FOOTER */}
        <motion.p
          variants={item}
          className="text-center text-sm text-gray-600 mt-5"
        >
          Already have an account?{" "}
          <Link
            to="/doctor/login"
            className="text-green-600 font-semibold hover:underline"
          >
            Login
          </Link>
        </motion.p>
      </motion.div>
    </div>
  );
};

/* ================= FIELD ================= */

const Field = ({ children, item }) => {
  return <motion.div variants={item}>{children}</motion.div>;
};

/* ================= INPUT ================= */

const Input = ({ icon, ...props }) => {
  return (
    <div className="flex items-center border border-gray-300 px-4 py-3 focus-within:border-green-600 transition">
      <span className="mr-3 text-gray-400">
        {icon}
      </span>

      <input
        className="w-full outline-none text-sm bg-transparent"
        {...props}
      />
    </div>
  );
};

/* ================= SELECT ================= */

const Select = ({
  icon,
  options,
  placeholder,
  ...props
}) => {
  return (
    <div className="flex items-center border border-gray-300 px-4 py-3 focus-within:border-green-600 transition">
      <span className="mr-3 text-gray-400">
        {icon}
      </span>

      <select
        className="w-full outline-none text-sm bg-transparent"
        {...props}
      >
        <option value="">{placeholder}</option>

        {options.map((opt, index) => (
          <option key={index} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DoctorRegister;