import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    emailOrMobile: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (key) => (e) =>
    setForm({ ...form, [key]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.emailOrMobile || !form.password) {
      return toast.error("Enter email/mobile & password");
    }

    try {
      setLoading(true);

      const isEmail = form.emailOrMobile.includes("@");

      const payload = isEmail
        ? { email: form.emailOrMobile, password: form.password }
        : { mobile: form.emailOrMobile, password: form.password };

      const { data } = await axios.post(
        "https://api.apnapashu.com/api/user/login",
        payload,
        { withCredentials: true }
      );

      toast.success("Login successful 🚀");
      localStorage.setItem("user", JSON.stringify(data.user));

      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex overflow-hidden bg-gradient-to-b from-gray-50 to-yellow-50">
      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
          className="absolute w-full h-full object-cover"
          alt="hero"
        />

        <div className="absolute inset-0 bg-black/70" />

        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          className="relative z-10 flex flex-col justify-center px-16 text-white"
        >
          <p className="text-yellow-400 tracking-[0.25em] text-sm font-semibold uppercase">
            Welcome Back
          </p>

          <h1 className="text-5xl font-black mt-3">
            PashuSeva
          </h1>

          <p className="mt-4 text-lg text-gray-200 leading-8 max-w-md">
            Smart livestock marketplace, doctor consultation
            and premium rural services platform.
          </p>

          <div className="mt-8 flex gap-3">
            <span className="bg-white/10 px-4 py-2 text-sm">
              Trusted Platform
            </span>
            <span className="bg-white/10 px-4 py-2 text-sm">
              Fast Support
            </span>
          </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center px-4 md:px-10 py-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl bg-white border border-gray-200 shadow-sm p-5 md:p-8"
        >
          <p className="text-yellow-500 text-xs font-semibold tracking-[0.25em] uppercase text-center">
            Account Access
          </p>

          <h2 className="text-3xl font-black text-center text-gray-900 mt-2">
            Login Account
          </h2>

          <p className="text-sm text-gray-500 text-center mt-2 mb-6">
            Continue to your dashboard securely
          </p>

          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              placeholder="Email or Mobile"
              value={form.emailOrMobile}
              onChange={onChange("emailOrMobile")}
            />

            <Password
              placeholder="Password"
              value={form.password}
              show={showPassword}
              toggle={() => setShowPassword(!showPassword)}
              onChange={onChange("password")}
            />

            <motion.button
              whileTap={{ scale: 0.98 }}
              whileHover={{ scale: 1.01 }}
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 font-bold text-sm"
            >
              {loading ? "Logging in..." : "Login"}
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

            <div className="flex justify-between text-sm pt-1">
              <Link
                to="/register"
                className="text-yellow-600 font-bold"
              >
                Create account
              </Link>

              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-gray-500 hover:text-black"
              >
                Forgot password?
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

/* INPUT */
const Input = ({ placeholder, value, onChange }) => (
  <input
    className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-500 transition"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

/* PASSWORD */
const Password = ({
  placeholder,
  value,
  onChange,
  show,
  toggle,
}) => (
  <div className="relative">
    <input
      type={show ? "text" : "password"}
      className="w-full border border-gray-200 px-4 py-3 text-sm outline-none focus:border-yellow-500 transition"
      placeholder={placeholder}
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