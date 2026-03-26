import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { listProducts, listDoctors } from "../services/storage";
import QuickActions from "../components/QuickActions";
import PopularCategories from "../components/PopularCategories";
import WhyPashuSeva from "../components/WhyPashuSeva";
import { FaArrowRight, FaPhoneAlt, FaLock, FaUserMd } from "react-icons/fa";

const CATEGORIES = [
  { title: "Bhusa", key: "bhusa", desc: "Dry fodder listings near you" },
  { title: "Chara", key: "chara", desc: "Green fodder sellers & rates" },
  { title: "Feed", key: "feed", desc: "Animal feed & brands" },
  {
    title: "Supplements",
    key: "supplements",
    desc: "Minerals, vitamins, boosters",
  },
  { title: "Others", key: "others", desc: "Other animal commodities" },
];

const FEATURES = [
  {
    title: "Buy & sell nearby",
    desc: "Category-wise marketplace + location search + call button.",
    icon: "🛒",
  },
  {
    title: "Doctor consultation",
    desc: "Verified veterinarians list; consult by phone & keep history.",
    icon: "👨‍⚕️",
  },
  {
    title: "Premium subscription",
    desc: "Weekly/Monthly/Quarterly plans with auto-expiry tracking.",
    icon: "⭐",
  },
];

function roleLabel(role) {
  if (role === "buyer") return "Buyer / Farmer";
  if (role === "seller") return "Seller";
  if (role === "doctor") return "Animal Doctor";
  if (role === "admin") return "Admin";
  return "User";
}

function truncate(str, n = 90) {
  if (!str) return "";
  return str.length > n ? str.slice(0, n - 1) + "…" : str;
}

function safeArr(x) {
  return Array.isArray(x) ? x : [];
}

export default function Home() {
  // const { isAuthenticated, user, isPremium } = useAuth();
  const navigate = useNavigate();

  const [loc, setLoc] = useState("");
  const [cat, setCat] = useState("bhusa");

  const allProducts = useMemo(() => safeArr(listProducts()), []);
  const allDoctors = useMemo(() => safeArr(listDoctors()), []);
  const isAuthenticated = false

  const latestProducts = useMemo(() => {
    return allProducts
      .filter((p) => p?.isActive)
      .sort((a, b) => (b?.createdAt || 0) - (a?.createdAt || 0))
      .slice(0, 6);
  }, [allProducts]);

  const verifiedDoctors = useMemo(() => {
    return allDoctors
      .filter((d) => d?.isVerified)
      .sort((a, b) => (b?.createdAt || 0) - (a?.createdAt || 0))
      .slice(0, 3);
  }, [allDoctors]);

  const stats = useMemo(() => {
    const activeListings = allProducts.filter((p) => p?.isActive).length;
    const verified = allDoctors.filter((d) => d?.isVerified).length;

    return [
      { label: "Active listings", value: String(activeListings) },
      { label: "Verified doctors", value: String(verified) },
      { label: "Premium unlocks", value: "Calls + Consults" },
    ];
  }, [allProducts, allDoctors]);

  const goSearch = () => {
    const q = new URLSearchParams();
    if (cat) q.set("cat", cat);
    if (loc.trim()) q.set("loc", loc.trim());
    navigate(`/marketplace?${q.toString()}`);
  };

  // const role = user?.role;

  const PrimaryCTA = () => {
    if (!isAuthenticated) {
      return (
        <div className="flex flex-wrap items-center gap-3 mt-6">
          {/* 🔥 REGISTER (PRIMARY CTA) */}
          <Link
            to="/register"
            className="px-6 py-3 cursor-pointer text-sm font-semibold text-emerald-900 bg-white shadow-md hover:shadow-lg hover:scale-[1.02] transition"
          >
            Get Started
          </Link>

          {/* 🔥 LOGIN (SECONDARY) */}
          <Link
            to="/login"
            className="px-6 py-3 cursor-pointer text-sm font-semibold text-white border border-white/30 bg-white/10 backdrop-blur hover:bg-white/20 transition"
          >
            Login
          </Link>
        </div>
      );
    }

    if (role === "seller") {
      return (
        <div className="flex flex-wrap gap-2">
          <Link
            to="/seller/products"
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
          >
            Manage products
          </Link>
          <Link
            to="/seller/products/new"
            className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-black"
          >
            Add new listing
          </Link>
        </div>
      );
    }

    if (role === "doctor") {
      return (
        <div className="flex flex-wrap gap-2">
          <Link
            to="/doctor/profile"
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
          >
            Complete profile
          </Link>
          <Link
            to="/doctors"
            className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-black"
          >
            View doctors list
          </Link>
        </div>
      );
    }

    if (role === "admin") {
      return (
        <div className="flex flex-wrap gap-2">
          <Link
            to="/admin"
            className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
          >
            Open admin panel
          </Link>
          <Link
            to="/admin/doctors"
            className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-black"
          >
            Verify doctors
          </Link>
        </div>
      );
    }

    return (
      <div className="flex flex-wrap gap-2">
        <Link
          to="/marketplace"
          className="rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-emerald-800 hover:bg-emerald-50"
        >
          Browse marketplace
        </Link>
        <Link
          to="/premium"
          className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-bold text-white hover:bg-black"
        >
          Upgrade premium
        </Link>
      </div>
    );
  };

  return (
    <div className="w-full">
      {/* HERO: full-bleed */}
      <section className="relative w-full bg-gradient-to-br from-emerald-900 via-emerald-700 to-green-600 overflow-hidden">
        {/* 🔥 Background Effects */}
        <div className="absolute -right-40 -top-40 h-[28rem] w-[28rem] bg-white/10 blur-3xl" />
        <div className="absolute -left-40 -bottom-40 h-[30rem] w-[30rem] bg-black/10 blur-3xl" />

        <div className="w-full px-6 md:px-10 lg:px-16 py-10 md:py-12">
          {/* 🔥 Pills */}
          <div className="flex flex-wrap gap-3">
            {["Marketplace", "Doctor Consultation", "Premium Plans"].map(
              (x) => (
                <span
                  key={x}
                  className="px-4 py-1.5 text-xs font-semibold text-white bg-white/10 border border-white/20"
                >
                  {x}
                </span>
              ),
            )}
          </div>

          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* 🔥 LEFT */}
            <div className="text-white">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                Smart Livestock Marketplace <br />
                <span className="text-emerald-200">
                  with Doctor Consultation
                </span>
              </h1>

              <p className="mt-4 text-sm md:text-base text-white/90 max-w-xl">
                Bhusa, Chara, Feed & Supplements easily browse karo. Verified
                doctors se consult karo aur apni livestock services ko smart
                banao.
              </p>

              {/* CTA */}
              <div className="mt-5">
                <PrimaryCTA />
              </div>

              {/* USER INFO */}
              {/* <div className="mt-4 text-xs md:text-sm text-white/90">
                {isAuthenticated ? (
                  <div>
                    Logged in as{" "}
                    <span className="font-bold">
                      {user?.name || user?.phone}
                    </span>{" "}
                    ({roleLabel(user?.role)}) •{" "}
                    <Link className="underline font-bold" to="/dashboard">
                      Dashboard
                    </Link>{" "}
                    • Premium:{" "}
                    <span className="font-bold">
                      {isPremium ? "ACTIVE" : "INACTIVE"}
                    </span>
                  </div>
                ) : (
                  <div className="text-white/80">
                    Register now and unlock marketplace + doctor services.
                  </div>
                )}
              </div> */}
            </div>

            {/* 🔥 RIGHT CARD */}
            <div className="w-full max-w-md lg:ml-auto">
              <div className="bg-white/10 backdrop-blur-lg border border-white/20 p-5">
                <h3 className="text-white font-bold text-base">Quick Search</h3>

                <div className="mt-4 space-y-3">
                  {/* Category */}
                  <select
                    value={cat}
                    onChange={(e) => setCat(e.target.value)}
                    className="w-full px-3 py-2.5 text-sm bg-white text-gray-900 border outline-none focus:ring-2 focus:ring-emerald-400"
                  >
                    <option value="bhusa">Bhusa</option>
                    <option value="chara">Chara</option>
                    <option value="feed">Feed</option>
                    <option value="supplements">Supplements</option>
                    <option value="others">Others</option>
                  </select>

                  {/* Location */}
                  <input
                    value={loc}
                    onChange={(e) => setLoc(e.target.value)}
                    placeholder="Enter location..."
                    className="w-full px-3 py-2.5 text-sm border outline-none focus:ring-2 focus:ring-emerald-400"
                  />

                  {/* Button */}
                  <button
                    onClick={goSearch}
                    className="w-full bg-gray-900 text-white py-2.5 text-sm font-bold hover:bg-black transition"
                  >
                    Search
                  </button>

                  {/* {!isAuthenticated && (
                    <div className="text-xs text-white/80">
                      Login required for contact
                    </div>
                  )} */}
                </div>
              </div>
            </div>
          </div>

          {/* 🔥 STATS */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="bg-white/10 border border-white/20 p-4"
              >
                <div className="text-lg font-bold text-white">{s.value}</div>
                <div className="text-xs text-white/80">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content wrapper */}
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick actions */}
        <QuickActions />

        {/* Categories */}
        <PopularCategories />

        <WhyPashuSeva />

        {/* Latest listings */}
        <section className="mt-10 px-6 md:px-10 lg:px-16">
          {/* 🔥 HEADER */}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Latest Listings
            </h2>

            <Link
              to="/marketplace"
              className="flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:gap-3 transition-all"
            >
              <span>Open marketplace</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>

          {/* 🔥 EMPTY STATE */}
          {latestProducts.length === 0 ? (
            <div className="mt-6 border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">
              No listings yet. Sellers can add products from{" "}
              <Link
                to="/seller/products"
                className="font-semibold text-emerald-600 hover:underline"
              >
                My Products
              </Link>
              .
            </div>
          ) : (
            /* 🔥 GRID */
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {latestProducts.map((p) => (
                <div
                  key={p.id}
                  className="group border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* 🔥 TOP */}
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition">
                      {p?.name || "Product"}
                    </h3>

                    <span className="text-[11px] font-semibold text-gray-700 bg-gray-100 px-2 py-0.5">
                      {String(p?.category || "").toUpperCase()}
                    </span>
                  </div>

                  {/* 🔥 PRICE + LOCATION */}
                  <div className="mt-2 text-sm text-gray-600">
                    {p?.location || "—"} •{" "}
                    <span className="font-bold text-emerald-600">
                      ₹{p?.price ?? "—"}
                    </span>
                  </div>

                  {/* 🔥 DESC */}
                  <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                    {truncate(p?.description || "No description.")}
                  </p>

                  {/* 🔥 ACTIONS */}
                  <div className="mt-5 flex flex-wrap gap-3">
                    {/* View */}
                    <Link
                      to={`/product/${p.id}`}
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gray-900 text-white hover:bg-black transition"
                    >
                      View
                      <FaArrowRight className="text-xs" />
                    </Link>

                    {/* Premium / Call */}
                    {/* {!isPremium ? (
                      <Link
                        to="/premium"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-sky-600 text-white hover:bg-sky-700 transition"
                      >
                        <FaLock className="text-xs" />
                        Unlock Call
                      </Link>
                    ) : (
                      <a
                        href={`tel:${p?.contactNumber || ""}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition"
                      >
                        <FaPhoneAlt className="text-xs" />
                        Call Seller
                      </a>
                    )} */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Verified doctors */}

        <section className="mt-10 px-6 md:px-10 lg:px-16">
          {/* 🔥 HEADER */}
          <div className="flex flex-wrap items-end justify-between gap-3">
            <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
              Verified Doctors
            </h2>

            <Link
              to="/doctors"
              className="flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:gap-3 transition-all"
            >
              <span>See all</span>
              <FaArrowRight className="text-xs" />
            </Link>
          </div>

          {/* 🔥 EMPTY STATE */}
          {verifiedDoctors.length === 0 ? (
            <div className="mt-6 border border-gray-200 bg-white p-6 text-sm text-gray-600 shadow-sm">
              No verified doctors yet. Doctors can submit profile from{" "}
              <Link
                to="/doctor/profile"
                className="font-semibold text-emerald-600 hover:underline"
              >
                Doctor Profile
              </Link>
              .
            </div>
          ) : (
            /* 🔥 GRID */
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {verifiedDoctors.map((d) => (
                <div
                  key={d.id}
                  className="group border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                >
                  {/* 🔥 TOP */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center bg-emerald-100 text-emerald-700 group-hover:scale-110 transition">
                        <FaUserMd />
                      </div>

                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition">
                        {d?.name || "Doctor"}
                      </h3>
                    </div>

                    <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5">
                      Verified
                    </span>
                  </div>

                  {/* 🔥 DETAILS */}
                  <div className="mt-3 text-sm text-gray-600">
                    {d?.qualification || "—"} • {d?.specialization || "—"} •{" "}
                    {d?.experienceYears ?? "—"} yrs
                  </div>

                  {/* 🔥 ACTIONS */}
                  <div className="mt-5 flex flex-wrap gap-3">
                    {/* {!isPremium ? (
                      <Link
                        to="/premium"
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-sky-600 text-white hover:bg-sky-700 transition"
                      >
                        <FaLock className="text-xs" />
                        Unlock Consult
                      </Link>
                    ) : (
                      <a
                        href={`tel:${d?.phone || ""}`}
                        className="flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition"
                      >
                        <FaPhoneAlt className="text-xs" />
                        Call Doctor
                      </a>
                    )} */}

                    <Link
                      to="/doctors"
                      className="flex items-center gap-2 px-4 py-2 text-sm font-semibold border border-gray-300 bg-white hover:bg-gray-50 transition"
                    >
                      View list
                      <FaArrowRight className="text-xs" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        {/* <section className="mt-10 rounded-3xl border border-gray-200 bg-gradient-to-r from-emerald-50 to-cyan-50 p-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="text-lg font-extrabold text-gray-900">
                Premium = Full access
              </div>
              <div className="mt-1 text-sm text-gray-600">
                Unlimited calls + consultations, with auto-expiry tracking.
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                to="/premium"
                className="rounded-xl bg-gray-900 px-4 py-2.5 text-sm font-extrabold text-white hover:bg-black"
              >
                View plans
              </Link>
              <Link
                to="/dashboard"
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-extrabold text-gray-900 hover:bg-gray-50"
              >
                My dashboard
              </Link>
            </div>
          </div>
        </section> */}
      </div>
    </div>
  );
}

function QuickAction({ icon, title, desc, to }) {
  return (
    <Link
      to={to}
      className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:bg-gray-50"
    >
      <div className="flex items-center gap-3">
        <div className="grid h-11 w-11 place-items-center rounded-2xl border border-gray-200 bg-gradient-to-br from-cyan-50 to-emerald-50 text-lg">
          {icon}
        </div>
        <div className="min-w-0">
          <div className="text-base font-extrabold text-gray-900">{title}</div>
          <div className="mt-1 text-sm text-gray-600">{desc}</div>
        </div>
      </div>
      <div className="mt-3 text-sm font-extrabold text-emerald-700">Open →</div>
    </Link>
  );
}
