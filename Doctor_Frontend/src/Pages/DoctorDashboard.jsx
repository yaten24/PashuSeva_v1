import React from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  IndianRupee,
  Users,
  Clock,
} from "lucide-react";

const DoctorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🔥 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-3xl font-bold text-gray-800">
          Doctor Dashboard 🩺
        </h1>
        <p className="text-gray-500 mt-1">
          Manage your appointments, patients and earnings
        </p>
      </motion.div>

      {/* 🔥 STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

        {[
          {
            title: "Total Appointments",
            value: "120",
            icon: <Calendar size={28} />,
            color: "bg-blue-500",
          },
          {
            title: "Total Patients",
            value: "85",
            icon: <Users size={28} />,
            color: "bg-green-500",
          },
          {
            title: "Earnings",
            value: "₹25,000",
            icon: <IndianRupee size={28} />,
            color: "bg-yellow-500",
          },
          {
            title: "Today Schedule",
            value: "5",
            icon: <Clock size={28} />,
            color: "bg-purple-500",
          },
        ].map((card, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white shadow-md p-5 border flex items-center gap-4"
          >
            <div className={`${card.color} text-white p-3`}>
              {card.icon}
            </div>
            <div>
              <h3 className="text-sm text-gray-500">{card.title}</h3>
              <p className="text-xl font-bold text-gray-800">
                {card.value}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* 🔥 APPOINTMENTS TABLE */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white shadow-md border p-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">
          Upcoming Appointments
        </h2>

        <div className="overflow-x-auto">
          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-600">
                <th className="py-2">Patient</th>
                <th>Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {[
                {
                  name: "Ramesh Kumar",
                  date: "22 Mar",
                  time: "10:00 AM",
                  status: "Confirmed",
                },
                {
                  name: "Suresh Yadav",
                  date: "22 Mar",
                  time: "1:00 PM",
                  status: "Pending",
                },
                {
                  name: "Amit Singh",
                  date: "23 Mar",
                  time: "4:00 PM",
                  status: "Confirmed",
                },
              ].map((item, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="py-2">{item.name}</td>
                  <td>{item.date}</td>
                  <td>{item.time}</td>
                  <td>
                    <span
                      className={`px-2 py-1 text-sm ${
                        item.status === "Confirmed"
                          ? "bg-green-100 text-green-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </motion.div>

      {/* 🔥 QUICK ACTION */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mt-8 bg-gradient-to-r from-blue-500 to-green-500 p-6 text-white text-center shadow-md"
      >
        <h2 className="text-2xl font-semibold">
          Manage Your Practice Efficiently 🚀
        </h2>
        <p className="mt-2">
          Update your availability and consultation fees anytime.
        </p>

        <button className="mt-4 bg-white text-black px-6 py-2 font-semibold hover:scale-105 transition">
          Update Profile
        </button>
      </motion.div>

    </div>
  );
};

export default DoctorDashboard;