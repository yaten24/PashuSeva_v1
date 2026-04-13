import React, { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Calendar, Clock, User } from "lucide-react";

const DoctorAppointments = () => {

  // 🔥 DEMO DATA
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      patientName: "Ramesh Kumar",
      animal: "Cow",
      issue: "Fever & Weakness",
      date: "22 April",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      patientName: "Suresh Yadav",
      animal: "Buffalo",
      issue: "Milk reduction",
      date: "22 April",
      time: "1:00 PM",
      status: "Confirmed",
    },
    {
      id: 3,
      patientName: "Amit Singh",
      animal: "Dog",
      issue: "Infection",
      date: "23 April",
      time: "4:00 PM",
      status: "Pending",
    },
  ]);

  // 🔥 UPDATE STATUS
  const updateStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-yellow-50 p-6">

      {/* 🔥 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-yellow-700">
          📅 Your Appointments
        </h1>
        <p className="text-sm text-gray-600">
          Manage and respond to patient bookings
        </p>
      </motion.div>

      {/* 🔥 APPOINTMENTS LIST */}
      <div className="space-y-4">

        {appointments.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white border border-yellow-200 p-4 shadow-sm"
          >

            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">

              {/* LEFT */}
              <div>
                <h2 className="font-semibold text-gray-800">
                  {item.patientName}
                </h2>

                <p className="text-sm text-gray-600">
                  🐄 {item.animal} • {item.issue}
                </p>

                <div className="flex gap-3 text-xs text-gray-500 mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} /> {item.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {item.time}
                  </span>
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-3">

                {/* STATUS */}
                <span
                  className={`text-xs px-3 py-1 font-medium ${
                    item.status === "Confirmed"
                      ? "bg-green-100 text-green-600"
                      : item.status === "Rejected"
                      ? "bg-red-100 text-red-600"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {item.status}
                </span>

                {/* ACTIONS */}
                {item.status === "Pending" && (
                  <>
                    <button
                      onClick={() =>
                        updateStatus(item.id, "Confirmed")
                      }
                      className="flex items-center gap-1 bg-green-500 text-white px-2 py-1 text-xs hover:scale-105"
                    >
                      <CheckCircle size={14} /> Accept
                    </button>

                    <button
                      onClick={() =>
                        updateStatus(item.id, "Rejected")
                      }
                      className="flex items-center gap-1 bg-red-500 text-white px-2 py-1 text-xs hover:scale-105"
                    >
                      <XCircle size={14} /> Reject
                    </button>
                  </>
                )}

              </div>

            </div>
          </motion.div>
        ))}

      </div>
    </div>
  );
};

export default DoctorAppointments;