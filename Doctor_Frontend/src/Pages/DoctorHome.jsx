import React from "react";
 import { FaUserMd, FaCalendarCheck, FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Users,
  Shield,
  IndianRupee,
} from "lucide-react";

const DoctorHome = () => {
  return (
    <div className="w-full bg-gray-50 overflow-x-hidden">

      {/* 🔥 HERO */}
     

<section
  className="relative min-h-screen flex items-center justify-center px-6 md:px-16 text-white"
  style={{
    backgroundImage: "url('/images/doctor.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }}
>
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-green-900/70 to-black/80"></div>

  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    className="relative z-10 text-center max-w-4xl"
  >
    {/* 🔥 HEADING */}
    <h1 className="text-4xl md:text-6xl font-bold leading-tight">
      Grow Your{" "}
      <span className="text-green-400">
        Veterinary Practice
      </span>
    </h1>

    {/* 🔥 SUBTEXT */}
    <p className="mt-6 text-gray-200 text-lg md:text-xl">
      Join India’s fast-growing livestock healthcare platform and
      connect with thousands of farmers in need of expert care.
    </p>

    {/* 🔥 EXTRA DESCRIPTION */}
    <p className="mt-3 text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
      Manage appointments, track patient history, and increase your
      earnings with a smart digital system designed for modern
      veterinary professionals.
    </p>

    {/* 🔥 ICON FEATURES */}
    <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">

      <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20">
        <FaUserMd className="text-green-400" />
        <span>Verified Doctor Profile</span>
      </div>

      <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20">
        <FaCalendarCheck className="text-green-400" />
        <span>Easy Appointment Management</span>
      </div>

      <div className="flex items-center justify-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20">
        <FaRupeeSign className="text-green-400" />
        <span>Increase Your Earnings</span>
      </div>

    </div>

    {/* 🔥 CTA */}
    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
      <Link
        to="/doctor/register"
        className="px-8 py-3 bg-green-600 hover:bg-green-700 font-semibold shadow-lg transition"
      >
        Get Started
      </Link>

      <Link
        to="/doctor/login"
        className="px-8 py-3 border border-white/40 hover:bg-white/10 transition"
      >
        Doctor Login
      </Link>
    </div>
  </motion.div>
</section>

      {/* 🔥 TRUST STRIP */}
      <section className="px-6 md:px-16 py-5 bg-white text-center">
        <p className="text-gray-600">
          Trusted by veterinary doctors across India • Secure • Fast • Reliable
        </p>
      </section>

      {/* 🔥 FEATURES */}
      <section className="px-6 md:px-16 py-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
          Why Join PashuSeva
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              icon: <Users />,
              title: "More Patients",
              desc: "Reach farmers across multiple regions",
            },
            {
              icon: <IndianRupee />,
              title: "Higher Earnings",
              desc: "Maximize income from consultations",
            },
            {
              icon: <Stethoscope />,
              title: "Smart Practice",
              desc: "Manage bookings & records easily",
            },
            {
              icon: <Shield />,
              title: "Secure System",
              desc: "Safe & reliable platform",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="bg-white p-6 border border-green-100 hover:border-green-500 shadow-sm hover:shadow-xl transition rounded-lg text-center"
            >
              <div className="w-12 h-12 mx-auto flex items-center justify-center bg-green-600 text-white rounded-md mb-4">
                {item.icon}
              </div>

              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔥 HOW IT WORKS */}
      <section className="px-4 md:px-16 py-16 md:py-20 bg-gray-100 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-12">
          How It Works
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              title: "Register",
              desc: "Create your doctor account",
            },
            {
              title: "Set Availability",
              desc: "Add timing & consultation fees",
            },
            {
              title: "Start Earning",
              desc: "Receive bookings instantly",
            },
          ].map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
              whileHover={{ scale: 1.03 }}
              className="bg-white p-5 md:p-8 border border-green-100 hover:border-green-500 rounded-lg shadow-sm hover:shadow-xl transition"
            >
              <div className="w-12 h-12 mx-auto flex items-center justify-center bg-green-600 text-white rounded-full font-bold mb-3">
                {i + 1}
              </div>

              <h3 className="font-semibold">{step.title}</h3>
              <p className="text-gray-500 text-sm mt-2">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🔥 FINAL CTA */}
      <section className="px-6 md:px-16 py-20 text-center bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <h2 className="text-3xl md:text-4xl font-bold">
          Start Your Journey Today 🚀
        </h2>

        <p className="mt-4">
          Join PashuSeva and grow your veterinary career faster.
        </p>

        <div className="mt-8 flex justify-center gap-4 flex-wrap">
          <Link className="px-8 py-3 bg-white text-black font-semibold shadow hover:scale-105 transition">
            Register Now
          </Link>

          <Link className="px-8 py-3 border border-white hover:bg-white/10 transition">
            Login
          </Link>
        </div>
      </section>
    </div>
  );
};

export default DoctorHome;