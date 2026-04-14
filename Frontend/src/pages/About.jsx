import { Link } from "react-router-dom";
import {
  FaUserMd,
  FaStore,
  FaCrown,
  FaShieldAlt,
  FaUsers,
  FaGlobe,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const modules = [
  {
    title: "Marketplace",
    icon: FaStore,
    desc: "Buy & sell Bhusa, Chara, Feed and livestock products easily.",
    to: "/marketplace",
  },
  {
    title: "Doctor Consultation",
    icon: FaUserMd,
    desc: "Connect with trusted veterinary doctors instantly.",
    to: "/doctors",
  },
  {
    title: "Premium Plans",
    icon: FaCrown,
    desc: "Unlock premium services and priority support.",
    to: "/premium",
  },
  {
    title: "Verified Platform",
    icon: FaShieldAlt,
    desc: "Secure ecosystem with verified sellers & doctors.",
    to: "/contact",
  },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-yellow-50 pb-8">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-4 md:px-10 py-14 md:py-20"
      >
        <div className="w-full">
          <p className="text-yellow-400 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase">
            Welcome to PashuSeva
          </p>

          <h1 className="text-3xl md:text-5xl font-black mt-3">
            India’s Smart Livestock Platform
          </h1>

          <p className="text-sm md:text-base text-gray-300 mt-4 max-w-3xl">
            PashuSeva connects farmers, doctors and sellers on one
            powerful platform for animal healthcare, marketplace and
            rural growth.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              to="/marketplace"
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 font-bold text-sm"
            >
              Explore Marketplace
            </Link>

            <Link
              to="/doctors"
              className="border border-white px-5 py-3 text-sm font-semibold hover:bg-white hover:text-black transition"
            >
              Find Doctors
            </Link>
          </div>
        </div>
      </motion.section>

      {/* ABOUT CONTENT */}
      <div className="px-3 md:px-8 lg:px-10 py-5 grid lg:grid-cols-3 gap-5">
        {/* LEFT BIG CARD */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white border border-gray-200 shadow-sm p-5 md:p-7"
        >
          <h2 className="text-2xl font-black text-gray-900">
            What is PashuSeva?
          </h2>

          <p className="text-sm md:text-base text-gray-600 mt-4 leading-7">
            PashuSeva is a modern digital platform built for farmers,
            livestock owners, veterinary doctors and sellers. It helps
            users buy products, consult doctors, grow business and
            improve animal care using technology.
          </p>

          <div className="grid md:grid-cols-3 gap-3 mt-6">
            <MiniCard
              icon={<FaUsers />}
              title="Multi Role"
              text="Farmers, Sellers, Doctors & Admins"
            />

            <MiniCard
              icon={<FaGlobe />}
              title="Pan India"
              text="Accessible across cities and villages"
            />

            <MiniCard
              icon={<FaShieldAlt />}
              title="Trusted"
              text="Verified ecosystem with safe support"
            />
          </div>
        </motion.div>

        {/* RIGHT SIDE CTA */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-5 shadow-sm"
        >
          <h3 className="text-2xl font-black">
            Join PashuSeva Today
          </h3>

          <p className="text-sm text-yellow-100 mt-3 leading-6">
            Start using marketplace, doctor consultation and premium
            services for your livestock needs.
          </p>

          <Link
            to="/register"
            className="inline-flex items-center gap-2 mt-5 bg-white text-yellow-600 px-5 py-3 font-bold text-sm"
          >
            Get Started
            <FaArrowRight />
          </Link>
        </motion.div>
      </div>

      {/* FEATURES */}
      <section className="px-3 md:px-8 lg:px-10 py-2">
        <h2 className="text-2xl font-black text-gray-900 mb-4">
          Core Features
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {modules.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-200 shadow-sm p-4"
            >
              <item.icon className="text-yellow-500 text-xl mb-3" />

              <h3 className="font-bold text-gray-900 text-sm md:text-base">
                {item.title}
              </h3>

              <p className="text-xs md:text-sm text-gray-500 mt-2 leading-6">
                {item.desc}
              </p>

              <Link
                to={item.to}
                className="inline-block mt-3 text-yellow-600 text-sm font-bold"
              >
                Explore →
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* USERS */}
      <section className="px-3 md:px-8 lg:px-10 py-6">
        <h2 className="text-2xl font-black text-gray-900 mb-4">
          Who Can Use?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "Farmers",
              desc: "Buy feed and consult doctors quickly.",
            },
            {
              title: "Sellers",
              desc: "Sell products and grow your reach.",
            },
            {
              title: "Doctors",
              desc: "Offer consultations and build trust.",
            },
            {
              title: "Businesses",
              desc: "Use premium tools and partnerships.",
            },
          ].map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.06 }}
              className="bg-white border border-gray-200 shadow-sm p-4"
            >
              <h3 className="font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500 mt-2">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="px-3 md:px-8 lg:px-10 pt-2">
        <div className="bg-gradient-to-r from-gray-900 to-black text-white p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-black">
            Ready to Grow with PashuSeva?
          </h2>

          <p className="text-sm text-gray-300 mt-3">
            Join thousands of users using smart animal services.
          </p>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              to="/register"
              className="bg-yellow-500 hover:bg-yellow-600 px-5 py-3 text-white font-bold text-sm"
            >
              Join Now
            </Link>

            <Link
              to="/contact"
              className="border border-white px-5 py-3 text-sm font-semibold hover:bg-white hover:text-black transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function MiniCard({ icon, title, text }) {
  return (
    <div className="border border-gray-200 bg-gray-50 p-4">
      <div className="text-yellow-500 text-lg">{icon}</div>

      <h4 className="font-bold text-gray-900 mt-2 text-sm">
        {title}
      </h4>

      <p className="text-xs text-gray-500 mt-1">
        {text}
      </p>
    </div>
  );
}