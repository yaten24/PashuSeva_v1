import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUsers,
  FaBriefcase,
  FaShieldAlt,
  FaCheckCircle,
} from "react-icons/fa";

      import {  FaHandshake, FaChartLine } from "react-icons/fa";
import SellerHero from "../Components/Home_Page_Comp/SellerHero";

const SellerHome = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white overflow-hidden">

      {/* 🔥 HERO */}
      <SellerHero />

      {/* 🔥 ABOUT SECTION */}

<div className="py-24 px-6 bg-gray-900 text-white">
  <div className="max-w-6xl mx-auto">

    {/* 🔥 Heading */}
    <div className="text-center mb-12">
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="text-4xl md:text-5xl font-bold"
      >
        About <span className="text-green-400">PashuSeva</span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="mt-6 text-gray-300 max-w-3xl mx-auto text-lg leading-relaxed"
      >
        PashuSeva is a modern digital platform designed to connect livestock
        service providers such as veterinarians, sellers, and workers with
        farmers across India. Our mission is to simplify the livestock ecosystem
        by providing seamless access to services, improving efficiency, and
        enabling business growth through technology.
      </motion.p>
    </div>

    {/* 🔥 Features */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

      {/* Feature 1 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="p-6 bg-white/5 border border-white/10 text-center"
      >
        <div className="text-green-400 text-3xl mb-4 flex justify-center">
          <FaUsers />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Wide Network Access
        </h3>
        <p className="text-gray-400 text-sm">
          Connect with farmers and customers across multiple cities and expand your reach effortlessly.
        </p>
      </motion.div>

      {/* Feature 2 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="p-6 bg-white/5 border border-white/10 text-center"
      >
        <div className="text-green-400 text-3xl mb-4 flex justify-center">
          <FaHandshake />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Trusted Platform
        </h3>
        <p className="text-gray-400 text-sm">
          A secure and verified ecosystem ensuring trust between service providers and farmers.
        </p>
      </motion.div>

      {/* Feature 3 */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="p-6 bg-white/5 border border-white/10 text-center"
      >
        <div className="text-green-400 text-3xl mb-4 flex justify-center">
          <FaChartLine />
        </div>
        <h3 className="text-xl font-semibold mb-2">
          Business Growth
        </h3>
        <p className="text-gray-400 text-sm">
          Manage services, bookings, and earnings efficiently while growing your livestock business digitally.
        </p>
      </motion.div>

    </div>

  </div>
</div>

      {/* 🔥 WHY CHOOSE US */}
      <div className="py-20 px-6 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose PashuSeva?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">

          {[
            {
              icon: <FaUsers />,
              title: "More Customers",
              desc: "Reach farmers across multiple cities",
            },
            {
              icon: <FaBriefcase />,
              title: "Easy Management",
              desc: "Manage bookings & services easily",
            },
            {
              icon: <FaShieldAlt />,
              title: "Secure Platform",
              desc: "Safe & verified ecosystem",
            },
            {
              icon: <FaCheckCircle />,
              title: "Trusted Network",
              desc: "Growing livestock ecosystem",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-white/5 border border-white/10 backdrop-blur-md text-center"
            >
              <div className="text-green-400 text-2xl mb-4 flex justify-center">
                {item.icon}
              </div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-400 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}

        </div>
      </div>

      {/* 🔥 HOW IT WORKS */}
      <div className="py-20 px-6 bg-gray-950">
        <h2 className="text-4xl font-bold text-center mb-14">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {[
            {
              title: "Register",
              desc: "Create your seller account in minutes",
            },
            {
              title: "Add Services",
              desc: "List your services & pricing",
            },
            {
              title: "Get Bookings",
              desc: "Start receiving customer requests",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ delay: i * 0.2 }}
              className="p-8 bg-gradient-to-br from-green-500/10 to-blue-500/10 border border-white/10 text-center"
            >
              <div className="text-3xl font-bold text-green-400 mb-2">
                {i + 1}
              </div>
              <h3 className="text-xl font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-gray-400">{step.desc}</p>
            </motion.div>
          ))}

        </div>
      </div>

      {/* 🔥 CTA */}
      <div className="py-20 text-center bg-gradient-to-r from-green-600 to-green-800">

        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold"
        >
          Start Your Journey Today 🚀
        </motion.h2>

        <p className="mt-4 text-gray-200">
          Join PashuSeva and grow your livestock business faster.
        </p>

        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/seller/register"
            className="px-8 py-3 bg-white text-black font-semibold hover:scale-105 transition"
          >
            Get Started
          </Link>
          <Link
            to="/seller/login"
            className="px-8 py-3 border border-white hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
        </div>

      </div>

    </div>
  );
};

export default SellerHome;