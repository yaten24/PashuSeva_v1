import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Stethoscope, Users, Shield, IndianRupee } from "lucide-react";

const DoctorHome = () => {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* 🔥 HERO SECTION */}
      <div
        className="relative min-h-screen flex items-center justify-center text-center text-white"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1588776814546-1ffcf47267a5')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-blue-900/60"></div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 max-w-3xl px-6"
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            Join PashuSeva as a{" "}
            <span className="text-blue-400">Veterinary Doctor</span> 🩺
          </h1>

          <p className="mt-5 text-lg md:text-xl text-gray-200">
            Provide expert animal care, connect with farmers, and grow your
            medical practice across India.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/doctor/login"
              className="px-8 py-3 bg-white text-black font-semibold hover:scale-105 transition"
            >
              Doctor Login
            </Link>

            <Link
              to="/doctor/register"
              className="px-8 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold hover:scale-105 transition"
            >
              Register as Doctor
            </Link>
          </div>
        </motion.div>
      </div>

      {/* 🔥 ABOUT SECTION */}
      <div className="py-16 px-6 max-w-6xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-3xl font-bold mb-6"
        >
          What is PashuSeva for Doctors?
        </motion.h2>

        <p className="text-gray-600 max-w-3xl mx-auto">
          PashuSeva is a digital healthcare platform for livestock, helping
          veterinary doctors connect with farmers, provide consultations, and
          manage their practice digitally. It simplifies patient handling,
          booking management, and income tracking.
        </p>
      </div>

      {/* 🔥 WHY JOIN */}
      <div className="bg-white py-16 px-6">
        <h2 className="text-3xl font-bold text-center mb-10">
          Why Join as a Doctor?
        </h2>

        <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">

          {[
            {
              icon: <Users />,
              title: "More Patients",
              desc: "Connect with farmers and livestock owners across cities",
            },
            {
              icon: <IndianRupee />,
              title: "Increase Earnings",
              desc: "Earn more with online and offline consultations",
            },
            {
              icon: <Stethoscope />,
              title: "Digital Practice",
              desc: "Manage appointments and patient records easily",
            },
            {
              icon: <Shield />,
              title: "Trusted Platform",
              desc: "Secure and reliable healthcare ecosystem",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05 }}
              className="p-6 border bg-gray-50 shadow-sm text-center"
            >
              <div className="text-blue-500 mb-3">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}

        </div>
      </div>

      {/* 🔥 HOW IT WORKS */}
      <div className="py-16 px-6 bg-gray-100 text-center">
        <h2 className="text-3xl font-bold mb-10">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          {[
            "Register as a Doctor",
            "Set Your Availability & Fees",
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

      {/* 🔥 CTA */}
      <div className="py-16 text-center bg-gradient-to-r from-blue-500 to-green-500 text-white">
        <h2 className="text-3xl font-bold">
          Start Your Medical Journey with PashuSeva 🩺
        </h2>

        <p className="mt-3">
          Join today and provide better care to livestock across India.
        </p>

        <div className="mt-6 flex justify-center gap-4">
          <Link
            to="/doctor/register"
            className="px-6 py-3 bg-white text-black font-semibold hover:scale-105 transition"
          >
            Get Started
          </Link>

          <Link
            to="/doctor/login"
            className="px-6 py-3 border border-white hover:scale-105 transition"
          >
            Login
          </Link>
        </div>
      </div>

    </div>
  );
};

export default DoctorHome;