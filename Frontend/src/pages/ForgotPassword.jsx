import { useState } from "react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    const em = email.trim().toLowerCase();
    if (!em || !em.includes("@")) {
      setError("Enter a valid email");
      return;
    }

    setLoading(true);
    try {
      // TODO: call backend
      // POST /api/auth/forgot-password { email: em }
      await new Promise((r) => setTimeout(r, 900));

      // Always show generic success message (security best practice)
      setMsg("If an account exists, a reset link has been sent to your email.");
    } catch {
      setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 px-4">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md rounded-2xl border border-emerald-100 bg-white p-7 shadow-sm"
      >
        <h2 className="text-2xl font-extrabold text-gray-900">Forgot password</h2>
        <p className="mt-1 text-sm text-gray-600">
          Enter your email and a reset link will be sent.
        </p>

        {error && (
          <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-700">
            {error}
          </div>
        )}
        {msg && (
          <div className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-800">
            {msg}
          </div>
        )}

        <div className="mt-5">
          <label className="text-sm font-semibold text-gray-700">Email</label>
          <input
            type="email"
            autoComplete="email"
            placeholder="example@email.com"
            className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <button
          disabled={loading}
          className={`mt-5 w-full rounded-xl py-2.5 text-sm font-semibold text-white transition ${
            loading
              ? "bg-emerald-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {loading ? "Sending..." : "Send reset link"}
        </button>

        <p className="mt-4 text-sm text-gray-600">
          Back to{" "}
          <Link to="/login" className="font-semibold text-emerald-700 hover:underline">
            Login
          </Link>
        </p>

        {/* Dev helper */}
        <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-3 text-xs text-gray-600">
          Dev note: Backend token aane ke baad email me link aayega: <br />
          <span className="font-semibold">/reset-password/:token</span> [web:172]
        </div>
      </form>
    </div>
  );
}
