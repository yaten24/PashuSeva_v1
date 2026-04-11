import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowRight, FaUserCheck } from "react-icons/fa";

const SellerHero = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
      style={{
        backgroundImage: "url('/images/cow.jpg')", // ✅ cow image
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔥 Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-green-900/60"></div>

      {/* 🔥 Glow Effects */}
      <div className="absolute w-[400px] h-[400px] bg-green-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] bg-blue-500/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      {/* 🔥 Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.2 },
          },
        }}
        className="relative z-10 max-w-4xl px-6"
      >
        {/* Heading */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Grow Your Livestock Business with{" "}
          <span className="text-green-400">PashuSeva</span>
        </motion.h1>

        {/* 🔥 Description (Improved) */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="mt-6 text-lg md:text-xl text-gray-200 leading-relaxed"
        >
          Join India’s digital livestock ecosystem where sellers, veterinarians,
          and service providers connect directly with farmers. Expand your reach,
          manage bookings efficiently, and grow your income with a trusted platform.
        </motion.p>

        {/* 🔥 Extra Line */}
        <motion.p
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="mt-3 text-gray-300 text-sm md:text-base"
        >
          Built for scalability, transparency, and real-time connectivity across rural India.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="mt-8 flex flex-col sm:flex-row justify-center gap-4"
        >
          <Link
            to="/seller/login"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-white text-black font-semibold hover:scale-105 transition shadow-lg"
          >
            Login <FaArrowRight />
          </Link>

          <Link
            to="/seller/register"
            className="flex items-center justify-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold hover:scale-105 transition shadow-lg"
          >
            Get Started <FaArrowRight />
          </Link>
        </motion.div>

        {/* 🔥 Trust Badge */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="mt-6 flex items-center justify-center gap-2 text-gray-300 text-sm"
        >
          <FaUserCheck className="text-green-400" />
          Trusted by 100+ livestock service providers across India
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SellerHero;