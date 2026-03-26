import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SellerHero = () => {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1601758064223-6e0e6c8d4f0')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* 🔥 Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-green-900/60 backdrop-blur-sm"></div>

      {/* 🔥 Floating Glow Effect */}
      <div className="absolute w-[400px] h-[400px] bg-green-500/20 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div className="absolute w-[300px] h-[300px] bg-blue-500/20 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      {/* 🔥 Content */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2,
            },
          },
        }}
        className="relative z-10 max-w-3xl px-6"
      >
        {/* Heading */}
        <motion.h1
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          className="text-4xl md:text-6xl font-extrabold leading-tight"
        >
          Grow Your Business with{" "}
          <span className="text-green-400">PashuSeva</span> 🐄
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 },
          }}
          className="mt-5 text-lg md:text-xl text-gray-200"
        >
          Join India's trusted livestock service platform. Offer your services,
          connect with farmers, and increase your income seamlessly.
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
            className="px-8 py-3 bg-white/90 text-black font-semibold shadow-lg hover:scale-105 hover:bg-white transition backdrop-blur-md"
          >
            Login
          </Link>

          <Link
            to="/seller/register"
            className="px-8 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold shadow-lg hover:scale-105 transition"
          >
            Get Started
          </Link>
        </motion.div>

        {/* 🔥 Extra Trust Line */}
        <motion.p
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1 },
          }}
          className="mt-6 text-sm text-gray-300"
        >
          Trusted by 1000+ livestock service providers across India 🇮🇳
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SellerHero;