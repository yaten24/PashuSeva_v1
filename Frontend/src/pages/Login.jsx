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

      // 🔥 Detect email or mobile
      const isEmail = form.emailOrMobile.includes("@");

      const payload = isEmail
        ? { email: form.emailOrMobile, password: form.password }
        : { mobile: form.emailOrMobile, password: form.password };

      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        payload,
        { withCredentials: true }
      );

      // ✅ SUCCESS
      toast.success("Login successful 🚀");

      // Optional: save user in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));

      // ✅ REDIRECT HOME
      setTimeout(() => {
        navigate("/");
      }, 1000);

    } catch (err) {
      toast.error(err?.response?.data?.message || "Login failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden">

      {/* 🔥 LEFT IMAGE */}
      <div className="hidden md:flex w-1/2 h-full relative">
        <img
          src="https://images.unsplash.com/photo-1517849845537-4d257902454a"
          className="absolute w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-emerald-900/80" />

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <h1 className="text-5xl font-bold">PashuSeva</h1>
          <p className="mt-4 text-lg opacity-90">
            Smart livestock & service platform
          </p>
        </div>
      </div>

      {/* 🔥 RIGHT FORM */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-white to-emerald-50 px-10">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-xl"
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            Login Account
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">

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

            <button
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-3 font-semibold hover:bg-emerald-700 transition"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

            <button
              type="button"
              className="w-full border py-3 flex items-center justify-center gap-2 hover:bg-gray-50"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
              />
              Continue with Google
            </button>

            <div className="flex justify-between text-sm">
              <Link to="/register" className="text-emerald-600 font-semibold">
                Create account
              </Link>

              <button
                type="button"
                onClick={() => navigate("/forgot-password")}
                className="text-gray-600"
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

/* 🔥 INPUT */
const Input = ({ placeholder, value, onChange }) => (
  <input
    className="w-full border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

/* 🔥 PASSWORD */
const Password = ({ placeholder, value, onChange, show, toggle }) => (
  <div className="relative">
    <input
      type={show ? "text" : "password"}
      className="w-full border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
    <button
      type="button"
      onClick={toggle}
      className="absolute right-3 top-3"
    >
      {show ? <EyeOff size={18} /> : <Eye size={18} />}
    </button>
  </div>
);