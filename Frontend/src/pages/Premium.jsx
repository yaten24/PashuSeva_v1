import { useState } from "react";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaCrown,
  FaBolt,
  FaUserMd,
  FaStore,
} from "react-icons/fa";
import { motion } from "framer-motion";

const plans = [
  { key: "weekly", title: "Weekly", days: 7, price: 49 },
  { key: "monthly", title: "Monthly", days: 30, price: 149, popular: true },
  { key: "quarterly", title: "Quarterly", days: 90, price: 399 },
];

export default function Premium() {
  const [user, setUser] = useState({
    name: "Yatendra Singh",
    premiumUntil: null,
  });

  const isPremium = !!user.premiumUntil;

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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-yellow-50 pb-8">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-4 md:px-10 py-14 md:py-20"
      >
        <div className="w-full">
          <p className="text-yellow-400 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase">
            PashuSeva Premium
          </p>

          <h1 className="text-3xl md:text-5xl font-black mt-3">
            Unlock Premium Benefits
          </h1>

          <p className="text-sm md:text-base text-gray-300 mt-4 max-w-3xl">
            Get unlimited doctor consultations, direct seller contact,
            priority support and faster access to premium tools.
          </p>
        </div>
      </motion.div>

      {/* STATUS */}
      <div className="px-3 md:px-8 lg:px-10 py-5">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 shadow-sm p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
        >
          <div>
            <p className="text-lg font-black text-gray-900">
              Hello, {user.name}
            </p>

            <p className="mt-2 text-sm font-semibold">
              Status:
              <span
                className={`ml-2 ${
                  isPremium
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {isPremium ? "ACTIVE" : "INACTIVE"}
              </span>
            </p>

            <p className="text-xs text-gray-500 mt-2">
              Valid Until:{" "}
              {user.premiumUntil
                ? new Date(
                    user.premiumUntil
                  ).toLocaleString()
                : "No active plan"}
            </p>
          </div>

          <div className="text-5xl">
            {isPremium ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-400" />
            )}
          </div>
        </motion.div>
      </div>

      {/* BENEFITS BANNER */}
      {!isPremium && (
        <div className="px-3 md:px-8 lg:px-10">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-5 md:p-7 shadow-sm"
          >
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <p className="text-xs tracking-[0.25em] uppercase text-yellow-100 font-semibold">
                  Upgrade Today
                </p>

                <h2 className="text-2xl md:text-4xl font-black mt-2">
                  Become Premium Member
                </h2>

                <p className="text-sm text-yellow-100 mt-3">
                  Access exclusive benefits for farmers,
                  doctors and marketplace buyers.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <Benefit icon={<FaStore />} text="Direct Seller Contact" />
                <Benefit icon={<FaUserMd />} text="Unlimited Doctors" />
                <Benefit icon={<FaBolt />} text="Priority Support" />
                <Benefit icon={<FaCrown />} text="Premium Badge" />
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* PLANS */}
      <section className="px-3 md:px-8 lg:px-10 py-6">
        <h2 className="text-2xl font-black text-gray-900 mb-4">
          Choose Your Plan
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.key}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className={`bg-white border shadow-sm p-5 relative ${
                plan.popular
                  ? "border-yellow-500"
                  : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-0 bg-yellow-500 text-white text-[10px] px-3 py-1 font-bold">
                  POPULAR
                </span>
              )}

              <h3 className="text-xl font-black text-gray-900">
                {plan.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {plan.days} Days Premium Access
              </p>

              <div className="mt-4 text-4xl font-black text-yellow-600">
                ₹{plan.price}
              </div>

              <ul className="mt-4 space-y-2 text-sm text-gray-600">
                <li>✔ Unlimited Calls</li>
                <li>✔ Premium Visibility</li>
                <li>✔ Faster Support</li>
              </ul>

              <button
                onClick={() => activatePremium(plan.days)}
                className="mt-5 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 font-bold text-sm"
              >
                Pay via UPI (Demo)
              </button>

              <p className="text-xs text-gray-400 mt-2">
                Demo mode payment simulation
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-3 md:px-8 lg:px-10 pt-2">
        <div className="bg-gradient-to-r from-gray-900 to-black text-white p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black">
            Go Premium Today
          </h2>

          <p className="text-sm text-gray-300 mt-3">
            Unlock premium access and grow faster with PashuSeva.
          </p>

          <button
            onClick={() => activatePremium(30)}
            className="mt-5 bg-yellow-500 hover:bg-yellow-600 px-5 py-3 text-white font-bold text-sm"
          >
            Activate Monthly Plan
          </button>
        </div>
      </section>
    </div>
  );
}

function Benefit({ icon, text }) {
  return (
    <div className="bg-white/10 border border-white/10 p-3 flex items-center gap-3">
      <span className="text-white">{icon}</span>
      <span>{text}</span>
    </div>
  );
}