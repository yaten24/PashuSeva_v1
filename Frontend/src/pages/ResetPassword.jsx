import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [show, setShow] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  const tokenOk = useMemo(() => Boolean(token && token.length >= 6), [token]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMsg("");

    if (!tokenOk) {
      setError("Invalid or missing token.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // TODO: call backend
      // POST /api/auth/reset-password { token, password }
      await new Promise((r) => setTimeout(r, 900));

      setMsg("Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate("/login", { replace: true }), 900);
    } catch {
      setError("Reset failed. Try again.");
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
        <h2 className="text-2xl font-extrabold text-gray-900">Reset password</h2>
        <p className="mt-1 text-sm text-gray-600">
          Create a new password for your account.
        </p>

        {!tokenOk && (
          <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-800">
            Invalid reset link. Please request a new one.{" "}
            <Link className="underline" to="/forgot-password">
              Forgot password
            </Link>
          </div>
        )}

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
          <label className="text-sm font-semibold text-gray-700">New password</label>
          <div className="relative mt-2">
            <input
              type={show ? "text" : "password"}
              autoComplete="new-password"
              className="w-full rounded-xl border border-gray-300 px-3 py-2 pr-20 outline-none focus:ring-2 focus:ring-emerald-400"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading || !tokenOk}
              placeholder="Minimum 6 characters"
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg px-3 py-1 text-sm font-semibold text-emerald-700 hover:bg-emerald-50"
              disabled={loading || !tokenOk}
            >
              {show ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        <div className="mt-4">
          <label className="text-sm font-semibold text-gray-700">Confirm password</label>
          <input
            type={show ? "text" : "password"}
            autoComplete="new-password"
            className="mt-2 w-full rounded-xl border border-gray-300 px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-400"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            disabled={loading || !tokenOk}
            placeholder="Re-enter new password"
          />
        </div>

        <button
          disabled={loading || !tokenOk}
          className={`mt-5 w-full rounded-xl py-2.5 text-sm font-semibold text-white transition ${
            loading || !tokenOk
              ? "bg-emerald-400 cursor-not-allowed"
              : "bg-emerald-600 hover:bg-emerald-700"
          }`}
        >
          {loading ? "Updating..." : "Update password"}
        </button>

        <p className="mt-4 text-sm text-gray-600">
          Back to{" "}
          <Link to="/login" className="font-semibold text-emerald-700 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}
