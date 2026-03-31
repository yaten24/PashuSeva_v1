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

    if (!form.name || !form.email || !form.mobile || !form.password) {
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

      // ✅ SUCCESS TOAST
      toast.success("Registration successful 🎉");

      // ✅ REDIRECT
      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      setError(err?.response?.data?.message || "Registration failed");
      toast.error("Registration failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex overflow-hidden">

      {/* 🔥 LEFT SIDE IMAGE */}
      <div className="hidden md:flex w-1/2 h-full relative">

        <img
          src="https://images.unsplash.com/photo-1500595046743-cd271d694d30"
          alt="animals"
          className="absolute w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 to-black/70" />

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl font-bold"
          >
            PashuSeva
          </motion.h1>

          <p className="mt-4 text-lg opacity-90">
            Smart livestock & service platform
          </p>
        </div>
      </div>

      {/* 🔥 RIGHT SIDE FORM */}
      <div className="w-full md:w-1/2 h-full flex items-center justify-center bg-gradient-to-br from-white to-emerald-50 px-10">

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="w-full max-w-2xl"
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            Create Account
          </h2>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm p-2 mb-4 text-center">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            <Input label="Full Name" value={form.name} onChange={onChange("name")} />
            <Input label="Email" value={form.email} onChange={onChange("email")} />
            <Input label="Mobile" value={form.mobile} onChange={onChange("mobile")} />

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

            <button
              className="w-full bg-emerald-600 text-white py-3 font-semibold hover:bg-emerald-700 transition"
              disabled={loading}
            >
              {loading ? "Creating..." : "Register"}
            </button>

            <button
              type="button"
              className="w-full border py-3 flex items-center justify-center gap-2 hover:bg-gray-50 transition"
            >
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                className="w-5"
              />
              Continue with Google
            </button>

            <p className="text-center text-sm">
              Already have account?{" "}
              <Link to="/login" className="text-emerald-600 font-semibold">
                Login
              </Link>
            </p>

          </form>
        </motion.div>
      </div>
    </div>
  );
}

/* 🔥 INPUT */
const Input = ({ label, value, onChange }) => (
  <div>
    <input
      className="w-full border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
      placeholder={label}
      value={value}
      onChange={onChange}
    />
  </div>
);

/* 🔥 PASSWORD */
const Password = ({ label, value, onChange, show, toggle }) => (
  <div className="relative">
    <input
      type={show ? "text" : "password"}
      className="w-full border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-400"
      placeholder={label}
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