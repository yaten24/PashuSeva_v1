import { Link } from "react-router-dom";

const modules = [
  {
    title: "Marketplace",
    points: [
      "Category-wise listings: Bhusa, Chara, Feed, Supplements, Others",
      "Search by location",
      "Call seller (Premium unlocks full access)",
    ],
    to: "/marketplace",
  },
  {
    title: "Doctor module",
    points: [
      "Doctor profile: qualification, specialization, experience, fee",
      "Admin verification required before doctor becomes visible",
      "Phone consultation + consultation history",
    ],
    to: "/doctors",
  },
  {
    title: "Premium subscription",
    points: [
      "Plans: Weekly, Monthly, Quarterly",
      "Unlimited contact access + doctor consult benefits",
      "Validity auto-expiry tracking",
    ],
    to: "/premium",
  },
  {
    title: "Admin panel",
    points: [
      "Manage users",
      "Verify doctors",
      "Moderate products",
      "Manage subscriptions & view reports",
    ],
    to: "/admin",
  },
];

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      {/* Header */}
      <div className="mb-5">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          About PashuSeva
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-gray-600">
          PashuSeva is a marketplace + veterinary consultation platform connecting buyers/farmers,
          sellers, and animal doctors across India.
        </p>
      </div>

      {/* Hero card */}
      <div className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-emerald-50 to-cyan-50 p-5">
        <div className="absolute -right-24 -top-24 h-56 w-56 rounded-full bg-emerald-200/30 blur-2xl" />
        <div className="absolute -bottom-24 -left-24 h-56 w-56 rounded-full bg-cyan-200/30 blur-2xl" />

        <div className="relative">
          <div className="text-sm font-semibold text-emerald-800">
            One app • Multiple workflows
          </div>
          <p className="mt-2 max-w-3xl text-sm text-gray-700">
            Bhusa/Chara/Feed marketplace + verified doctor consultation, with premium subscription for
            full access.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <Link
              to="/marketplace"
              className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-semibold text-white"
            >
              Open Marketplace
            </Link>
            <Link
              to="/doctors"
              className="rounded-xl border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-900"
            >
              Find Doctors
            </Link>
            <Link
              to="/premium"
              className="rounded-xl bg-sky-600 px-4 py-2 text-sm font-semibold text-white"
            >
              Premium Plans
            </Link>
          </div>
        </div>
      </div>

      {/* Modules */}
      <div className="mt-6 flex items-end justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">Core modules</h2>
        <span className="text-xs text-gray-500">
          Simple UI • Large buttons • Minimal steps
        </span>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {modules.map((m) => (
          <div
            key={m.title}
            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="text-sm font-bold text-gray-900">{m.title}</div>

            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-gray-600">
              {m.points.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <Link
              to={m.to}
              className="mt-3 inline-flex text-sm font-semibold text-emerald-700 hover:underline"
            >
              Open →
            </Link>
          </div>
        ))}
      </div>

      {/* Roles */}
      <div className="mt-7 flex items-end justify-between gap-3">
        <h2 className="text-xl font-bold text-gray-900">Who is it for?</h2>
        <span className="text-xs text-gray-500">Role-based flows</span>
      </div>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { t: "Buyer / Farmer", d: "Browse listings, contact sellers, consult doctors." },
          { t: "Seller", d: "Add/edit/delete listings with price, location, contact." },
          { t: "Animal Doctor", d: "Submit profile; after verification, receive consultations." },
          { t: "Admin", d: "Moderation, verification, subscriptions control." },
        ].map((x) => (
          <div key={x.t} className="rounded-2xl border border-gray-200 bg-white p-4">
            <div className="text-sm font-bold text-gray-900">{x.t}</div>
            <div className="mt-2 text-sm text-gray-600">{x.d}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
