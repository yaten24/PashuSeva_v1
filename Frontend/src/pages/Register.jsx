import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onChange = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (
      !form.name ||
      !form.email ||
      !form.mobile ||
      !form.password
    ) {
      return setError("All fields are required");
    }

    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setLoading(true);

      await axios.post(
        "https://api.apnapashu.com/api/user/register",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          mobile: form.mobile,
        },
        { withCredentials: true }
      );

      toast.success("Registration successful 🎉");

      setTimeout(() => navigate("/login"), 1200);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registration failed"
      );
      toast.error("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-gradient-to-b from-gray-50 to-yellow-50">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30"
          alt="animals"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 flex flex-col justify-center px-16 text-white"
        >
          <p className="text-yellow-400 tracking-[0.25em] text-sm font-semibold uppercase">
            Join PashuSeva
          </p>

          <h1 className="text-5xl font-black mt-3">
            Create Account
          </h1>

          <p className="mt-4 text-lg text-gray-200 leading-8 max-w-md">
            Start buying products, consulting doctors and
            accessing smart livestock services.
          </p>

          <div className="mt-8 flex gap-3">
            <span className="bg-white/10 px-4 py-2 text-sm">
              Trusted Platform
            </span>

            <span className="bg-white/10 px-4 py-2 text-sm">
              Fast Access
            </span>
          </div>
        </motion.div>
      </div>

      {/* RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-10 py-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-2xl bg-white border border-gray-200 shadow-sm p-5 md:p-8"
        >
          <p className="text-yellow-500 text-xs font-semibold tracking-[0.25em] uppercase text-center">
            New User
          </p>

          <h2 className="text-3xl font-black text-center text-gray-900 mt-2">
            Create Account
          </h2>

          <p className="text-sm text-gray-500 text-center mt-2 mb-6">
            Register to continue with PashuSeva
          </p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Full Name"
              value={form.name}
              onChange={onChange("name")}
            />

            <Input
              label="Email Address"
              value={form.email}
              onChange={onChange("email")}
            />

            <Input
              label="Mobile Number"
              value={form.mobile}
              onChange={onChange("mobile")}
            />

            <Password
              label="Password"
              value={form.password}
              show={showPass}
              toggle={() => setShowPass(!showPass)}
              onChange={onChange("password")}
            />

            <Password
              label="Confirm Password"
              value={form.confirmPassword}
              show={showConfirm}
              toggle={() => setShowConfirm(!showConfirm)}
              onChange={onChange("confirmPassword")}
            />

            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 font-bold text-sm"
            >
              {loading ? "Creating..." : "Register"}
            </motion.button>

            <button
              type="button"
              className="w-full border border-gray-200 py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition text-sm font-semibold"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5 h-5"
                alt="google"
              />
              Continue with Google
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have account?{" "}
              <Link
                to="/login"
                className="text-yellow-600 font-bold"
              >
                Login
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

/* INPUT */
const Input = ({ label, value, onChange }) => (
  <input
    className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-500 transition"
    placeholder={label}
    value={value}
    onChange={onChange}
  />
);

/* PASSWORD */
const Password = ({
  label,
  value,
  onChange,
  show,
  toggle,
}) => (
  <div className="relative">
    <input
      type={show ? "text" : "password"}
      className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-500 transition"
      placeholder={label}
      value={value}
      onChange={onChange}
    />

    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-3.5 text-gray-500"
    >
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
);