import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  LogOut,
  Edit,
  List,
} from "lucide-react";
import { useDoctorAuth } from "../Context/DoctorAuthContext";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const { doctor, logoutDoctor } = useDoctorAuth();
  const navigate = useNavigate();

  const [appointments] = useState([
    { id: 1, name: "Ramesh Kumar", date: "22 Mar", time: "10:00 AM", status: "Pending" },
    { id: 2, name: "Suresh Yadav", date: "22 Mar", time: "1:00 PM", status: "Confirmed" },
  ]);

  const handleLogout = async () => {
    await logoutDoctor();
    navigate("/doctor/login");
  };

  if (!doctor) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-yellow-50 p-6">

      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-yellow-700">
            Welcome, {doctor.name}
          </h1>
          <p className="text-sm text-gray-600">Manage your practice</p>
        </div>

        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-red-500 text-white px-3 py-2 text-xs"
        >
          <LogOut size={14} /> Logout
        </button>
      </div>

      {/* 🔥 PROFILE CARD */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-yellow-200 shadow-sm p-5 mb-6 flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-yellow-100 flex items-center justify-center text-xl font-bold text-yellow-700">
            {doctor.name?.charAt(0)}
          </div>

          <div>
            <h2 className="font-semibold text-lg">{doctor.name}</h2>
            <p className="text-sm text-gray-500">{doctor.specialization}</p>
            <p className="text-xs text-gray-400">
              {doctor.qualification} • {doctor.experience} yrs
            </p>
          </div>
        </div>

        <div className="text-right">
          <p className="text-xs text-gray-500">Fee</p>
          <p className="font-bold text-yellow-600">
            ₹{doctor.consultationFee}
          </p>
        </div>
      </motion.div>

      {/* 🔥 BIG CTA BUTTON */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="mb-6"
      >
        <button
          onClick={() => navigate("/doctor/appointments")}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-4 text-lg font-semibold flex items-center justify-center gap-3 shadow-md transition"
        >
          <List size={20} />
          Your Appointments
        </button>
      </motion.div>

      {/* 🔥 CENTER EDIT PROFILE */}
      <div className="flex justify-center mb-6">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/doctor/profile")}
          className="flex items-center gap-2 bg-white border border-yellow-400 text-yellow-700 px-5 py-2 text-sm font-semibold shadow-sm"
        >
          <Edit size={16} />
          Edit Profile
        </motion.button>
      </div>

      {/* 🔥 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

        <StatCard icon={<Calendar />} label="Appointments" value={appointments.length} />
        <StatCard icon={<Clock />} label="Experience" value={`${doctor.experience} yrs`} />
        <StatCard icon={<User />} label="Patients" value="--" />
        <StatCard icon={<User />} label="Status" value={doctor.status} />

      </div>

    </div>
  );
};

// 🔥 STAT CARD
const StatCard = ({ icon, label, value }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    className="bg-white border border-yellow-200 p-4 flex items-center gap-3 shadow-sm"
  >
    <div className="text-yellow-600">{icon}</div>
    <div>
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold">{value}</p>
    </div>
  </motion.div>
);

export default DoctorDashboard;