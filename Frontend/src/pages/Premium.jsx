import { useState } from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const plans = [
  { key: "weekly", title: "Weekly", days: 7, price: 49 },
  { key: "monthly", title: "Monthly", days: 30, price: 149 },
  { key: "quarterly", title: "Quarterly", days: 90, price: 399 },
];

export default function Premium() {
  // ✅ Demo user state (default NOT premium)
  const [user, setUser] = useState({
    name: "Yatendra Singh",
    premiumUntil: null,
  });

  const isPremium = !!user.premiumUntil;

  // ✅ Activate premium
  const activatePremium = (days) => {
    const expiry = new Date();
    expiry.setDate(expiry.getDate() + days);

    setUser({
      ...user,
      premiumUntil: expiry,
    });

    alert("Demo: Premium Activated ✅");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* 🔥 HEADER */}
      <h1 className="text-2xl font-bold text-gray-800">
        Premium Subscription
      </h1>

      <p className="text-sm text-gray-500 mt-2">
        Unlock unlimited seller contact + doctor consultations.
      </p>

      {/* 🔥 STATUS */}
      <div className="mt-4 bg-white border border-gray-200 p-4 shadow-sm flex items-center justify-between">

        <div>
          <p className="font-semibold text-gray-800">
            Status:
            <span className={`ml-2 ${isPremium ? "text-green-600" : "text-red-500"}`}>
              {isPremium ? "ACTIVE" : "INACTIVE"}
            </span>
          </p>

          <p className="text-xs text-gray-500 mt-1">
            Valid until:{" "}
            {user.premiumUntil
              ? new Date(user.premiumUntil).toLocaleString()
              : "Not active"}
          </p>
        </div>

        <div className="text-2xl">
          {isPremium ? (
            <FaCheckCircle className="text-green-600" />
          ) : (
            <FaTimesCircle className="text-red-500" />
          )}
        </div>
      </div>

      {/* 🔥 UPGRADE BANNER */}
      {!isPremium && (
        <div className="mt-6 bg-gradient-to-r from-green-600 to-green-700 text-white p-6 flex flex-col md:flex-row items-center justify-between gap-4">

          <div>
            <h2 className="text-lg font-bold">
              Upgrade to Premium 
            </h2>
            <p className="text-sm mt-1 text-white/90">
              Contact sellers directly & consult doctors without limits.
            </p>
          </div>

          <img
            src="https://source.unsplash.com/300x200/?farm,cattle"
            alt="premium"
            className="w-32 h-20 object-cover border border-white/20"
          />
        </div>
      )}

      {/* 🔥 PLANS */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {plans.map((p) => (
          <div
            key={p.key}
            className="bg-white border border-gray-200 p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 className="font-bold text-lg text-gray-800">
              {p.title}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {p.days} days access
            </p>

            <p className="text-green-600 font-bold text-xl mt-2">
              ₹{p.price}
            </p>

            <button
              onClick={() => activatePremium(p.days)}
              className="mt-4 w-full bg-green-600 text-white py-2 text-sm font-semibold hover:bg-green-700 transition"
            >
              Pay via UPI (Demo)
            </button>

            <p className="text-xs text-gray-400 mt-2">
              Demo mode: Payment simulation only
            </p>
          </div>
        ))}

      </div>
    </div>
  );
}