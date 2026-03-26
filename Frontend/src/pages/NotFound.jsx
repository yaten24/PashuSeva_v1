import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="text-sm font-semibold text-emerald-700">404</div>
        <h1 className="mt-1 text-2xl font-extrabold text-gray-900">
          Page not found
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Ye page exist nahi karta. Home ya Marketplace pe wapas ja sakte ho.
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          <Link
            to="/"
            className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
          >
            Go Home
          </Link>
          <Link
            to="/marketplace"
            className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-50"
          >
            Marketplace
          </Link>
          <Link
            to="/login"
            className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
