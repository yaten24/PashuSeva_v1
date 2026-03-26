import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircle, Users, Briefcase, Shield } from "lucide-react";
import SellerHero from "../Components/Home_Page_Comp/SellerHero";

const SellerHome = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔥 HERO SECTION */}
      <SellerHero />

      {/* 🔥 ABOUT SECTION */}
      <div className="py-16 px-6 max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold text-center mb-8"
        >
          What is PashuSeva?
        </motion.h2>

        <p className="text-gray-600 text-center max-w-3xl mx-auto">
          PashuSeva is a digital platform that connects livestock service providers
          (like veterinarians, workers, and sellers) with farmers across India.
          It helps you find more customers, manage bookings, and grow your income
          easily through technology.
        </p>
      </div>

      {/* 🔥 WHY CHOOSE US */}
      <div className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Choose PashuSeva?
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">

          {[
            {
              icon: <Users />,
              title: "More Customers",
              desc: "Reach farmers across multiple cities and grow your business",
            },
            {
              icon: <Briefcase />,
              title: "Easy Management",
              desc: "Manage bookings, services and income from one dashboard",
            },
            {
              icon: <Shield />,
              title: "Secure Platform",
              desc: "Safe and reliable system for both sellers and users",
            },
            {
              icon: <CheckCircle />,
              title: "Trusted Network",
              desc: "Be part of India's growing livestock ecosystem",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 border bg-gray-50 shadow-sm text-center"
            >
              <div className="text-green-500 mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}

        </div>
      </div>

      {/* 🔥 HOW IT WORKS */}
      <div className="py-16 px-6 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">

          {[
            "Register as a Seller",
            "Add Your Services",
            "Start Getting Bookings",
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-6 bg-white shadow"
            >
              <h3 className="text-xl font-semibold mb-2">
                Step {i + 1}
              </h3>
              <p className="text-gray-600">{step}</p>
            </motion.div>
          ))}

        </div>
      </div>

      {/* 🔥 CTA SECTION */}
      <div className="py-16 text-center bg-gradient-to-r from-green-500 to-blue-600 text-white">
        <h2 className="text-3xl font-bold">
          Start Your Journey with PashuSeva
        </h2>
        <p className="mt-3">
          Join now and grow your livestock business faster than ever.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/seller/register"
            className="px-6 py-3 bg-white text-black font-semibold hover:scale-105 transition"
          >
            Get Started
          </Link>
          <Link
            to="/seller/login"
            className="px-6 py-3 border border-white hover:scale-105 transition"
          >
            Login
          </Link>
        </div>
      </div>

    </div>
  );
};

export default SellerHome;