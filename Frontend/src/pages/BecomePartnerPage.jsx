import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaHandshake,
  FaUserMd,
  FaStore,
  FaArrowRight,
  FaCheckCircle,
  FaMoneyBillWave,
  FaUsers,
  FaBullhorn,
  FaClock,
  FaShieldAlt,
} from "react-icons/fa";

const sellerBenefits = [
  "Reach thousands of farmers daily",
  "Sell products across multiple cities",
  "Get verified seller badge",
  "Increase trust & repeat customers",
  "Easy order management dashboard",
  "Low setup cost, high growth potential",
];

const doctorBenefits = [
  "Get online consultations daily",
  "Build your digital veterinary brand",
  "Connect with livestock owners directly",
  "Flexible appointment timings",
  "Higher income opportunities",
  "Verified doctor profile visibility",
];

export default function BecomePartnerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-yellow-50">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gray-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />

        <div className="relative z-10 px-4 md:px-10 lg:px-16 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 bg-yellow-500 text-black px-4 py-2 font-bold text-sm mb-5">
              <FaHandshake />
              Become a Partner
            </div>

            <h1 className="text-3xl md:text-6xl font-black leading-tight">
              Grow With <span className="text-yellow-400">PashuSeva</span>
            </h1>

            <p className="mt-4 text-gray-200 text-sm md:text-lg max-w-2xl">
              Join India’s fast-growing animal care platform as a Seller or
              Veterinary Doctor and unlock new earning opportunities.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-7">
              <a
  href="https://seller.apnapashu.com"
  target="_blank"
  rel="noopener noreferrer"
  className="px-6 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold flex items-center justify-center gap-2"
>
  <FaStore />
  Register as Seller
</a>

<a
  href="https://doctor.apnapashu.com"
  target="_blank"
  rel="noopener noreferrer"
  className="px-6 py-4 border border-white hover:bg-white hover:text-black font-bold flex items-center justify-center gap-2 transition"
>
  <FaUserMd />
  Register as Doctor
</a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* WHY JOIN */}
      <section className="px-4 md:px-10 lg:px-16 py-10 md:py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              icon: <FaUsers />,
              title: "Large Audience",
              desc: "Thousands of active users",
            },
            {
              icon: <FaMoneyBillWave />,
              title: "More Income",
              desc: "New earning channels",
            },
            {
              icon: <FaBullhorn />,
              title: "Brand Growth",
              desc: "Increase visibility online",
            },
            {
              icon: <FaShieldAlt />,
              title: "Trusted Platform",
              desc: "Verified ecosystem",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white border border-gray-200 p-4 md:p-6 shadow-sm"
            >
              <div className="text-yellow-500 text-2xl">{item.icon}</div>
              <h3 className="font-bold mt-3 text-sm md:text-lg">
                {item.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TWO CARDS */}
      <section className="px-4 md:px-10 lg:px-16 pb-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* SELLER */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 shadow-sm p-5 md:p-7"
          >
            <div className="flex items-center gap-3 text-yellow-500 text-2xl">
              <FaStore />
              <h2 className="text-xl md:text-3xl font-black text-gray-900">
                Seller Benefits
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {sellerBenefits.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <FaCheckCircle className="text-yellow-500 mt-1" />
                  <span className="text-sm md:text-base text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

           <a
  href="https://seller.apnapashu.com"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 font-bold flex items-center justify-center gap-2"
>
  Register as Seller
  <FaArrowRight />
</a>
          </motion.div>

          {/* DOCTOR */}
          <motion.div
            initial={{ opacity: 0, x: 35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white border border-gray-200 shadow-sm p-5 md:p-7"
          >
            <div className="flex items-center gap-3 text-yellow-500 text-2xl">
              <FaUserMd />
              <h2 className="text-xl md:text-3xl font-black text-gray-900">
                Doctor Benefits
              </h2>
            </div>

            <div className="mt-5 space-y-3">
              {doctorBenefits.map((item, i) => (
                <div key={i} className="flex gap-3 items-start">
                  <FaCheckCircle className="text-yellow-500 mt-1" />
                  <span className="text-sm md:text-base text-gray-700">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            <a
  href="https://doctor.apnapashu.com"
  target="_blank"
  rel="noopener noreferrer"
  className="mt-6 bg-gray-900 hover:bg-black text-white px-5 py-3 font-bold flex items-center justify-center gap-2"
>
  Register as Doctor
  <FaArrowRight />
</a>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 md:px-10 lg:px-16 pb-14">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-6 md:p-10 shadow-lg text-center">
          <h2 className="text-2xl md:text-4xl font-black">
            Start Growing With PashuSeva Today
          </h2>

          <p className="mt-3 text-sm md:text-base text-yellow-100">
            Join as a trusted partner and unlock your next level business growth.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <a
  href="https://seller.apnapashu.com"
  target="_blank"
  rel="noopener noreferrer"
  className="bg-white text-yellow-600 px-6 py-3 font-bold"
>
  Seller Join Now
</a>

<a
  href="https://doctor.apnapashu.com"
  target="_blank"
  rel="noopener noreferrer"
  className="border border-white px-6 py-3 font-bold hover:bg-white hover:text-yellow-600 transition"
>
  Doctor Join Now
</a>
          </div>
        </div>
      </section>
    </div>
  );
}