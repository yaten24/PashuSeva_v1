import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  User,
} from "lucide-react";

const DoctorDashboard = () => {

  const doctor = {
    name: "Dr. Amit Sharma",
    specialization: "Veterinary Doctor",
    experience: "5 Years",
    image: "https://via.placeholder.com/100",
  };

  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "Ramesh Kumar",
      date: "22 Mar",
      time: "10:00 AM",
      status: "Pending",
    },
    {
      id: 2,
      name: "Suresh Yadav",
      date: "22 Mar",
      time: "1:00 PM",
      status: "Confirmed",
    },
    {
      id: 3,
      name: "Amit Singh",
      date: "23 Mar",
      time: "4:00 PM",
      status: "Pending",
    },
  ]);

  const updateStatus = (id, status) => {
    setAppointments((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* 🔥 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-gray-800">
          Doctor Dashboard
        </h1>
        <p className="text-gray-500 text-sm">
          Manage appointments efficiently
        </p>
      </motion.div>

      {/* 🔥 PROFILE STRIP */}
      <div className="bg-white border shadow-sm p-4 flex items-center justify-between mb-6">

        <div className="flex items-center gap-4">
          <img
            src={doctor.image}
            className="w-14 h-14 rounded-full"
            alt=""
          />
          <div>
            <h2 className="font-semibold text-gray-800">
              {doctor.name}
            </h2>
            <p className="text-sm text-gray-500">
              {doctor.specialization}
            </p>
          </div>
        </div>

        <button className="bg-blue-500 text-white px-4 py-1 text-sm">
          Edit Profile
        </button>
      </div>

      {/* 🔥 QUICK STATS (NO EARNINGS) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">

        <div className="bg-white border p-4 flex items-center gap-3">
          <Calendar className="text-blue-500" />
          <div>
            <p className="text-xs text-gray-500">Appointments</p>
            <p className="font-semibold">
              {appointments.length}
            </p>
          </div>
        </div>

        <div className="bg-white border p-4 flex items-center gap-3">
          <Clock className="text-purple-500" />
          <div>
            <p className="text-xs text-gray-500">Today</p>
            <p className="font-semibold">2</p>
          </div>
        </div>

        <div className="bg-white border p-4 flex items-center gap-3">
          <User className="text-green-500" />
          <div>
            <p className="text-xs text-gray-500">Patients</p>
            <p className="font-semibold">85</p>
          </div>
        </div>

      </div>

      {/* 🔥 APPOINTMENTS LIST (MODERN UI) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <h2 className="text-lg font-semibold text-gray-800">
          Appointments
        </h2>

        {appointments.map((item) => (
          <div
            key={item.id}
            className="bg-white border p-4 flex flex-col md:flex-row md:items-center md:justify-between"
          >

            {/* Left Info */}
            <div>
              <h3 className="font-semibold text-gray-800">
                {item.name}
              </h3>
              <p className="text-sm text-gray-500">
                {item.date} • {item.time}
              </p>
            </div>

            {/* Status */}
            <div className="mt-2 md:mt-0">
              <span
                className={`text-xs px-2 py-1 ${
                  item.status === "Confirmed"
                    ? "bg-green-100 text-green-600"
                    : item.status === "Rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {item.status}
              </span>
            </div>

            {/* Actions */}
            {item.status === "Pending" && (
              <div className="flex gap-2 mt-3 md:mt-0">

                <button
                  onClick={() =>
                    updateStatus(item.id, "Confirmed")
                  }
                  className="bg-green-500 text-white px-3 py-1 text-xs flex items-center gap-1"
                >
                  <CheckCircle size={14} /> Accept
                </button>

                <button
                  onClick={() =>
                    updateStatus(item.id, "Rejected")
                  }
                  className="bg-red-500 text-white px-3 py-1 text-xs flex items-center gap-1"
                >
                  <XCircle size={14} /> Reject
                </button>

              </div>
            )}

          </div>
        ))}
      </motion.div>

    </div>
  );
};

export default DoctorDashboard;