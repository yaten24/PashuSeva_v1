import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  Clock,
  User,
  LogOut,
  List,
  Stethoscope,
  CheckCircle,
  ClipboardList,
} from "lucide-react";
import axios from "axios";
import { useDoctorAuth } from "../Context/DoctorAuthContext";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const { doctor, logoutDoctor } = useDoctorAuth();
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loadingAppointments, setLoadingAppointments] =
    useState(true);

  const handleLogout = async () => {
    try {
      await logoutDoctor();
      navigate("/doctor/login");
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAppointments = async () => {
    try {
      setLoadingAppointments(true);

      const { data } = await axios.get(
        "http://localhost:5000/api/appointment/doctor-appointment",
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingAppointments(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const stats = useMemo(() => {
    return {
      total: appointments.length,

      pending: appointments.filter(
        (item) =>
          item.status?.toLowerCase() === "pending"
      ).length,

      confirmed: appointments.filter(
        (item) =>
          item.status?.toLowerCase() === "confirmed"
      ).length,

      completed: appointments.filter(
        (item) =>
          item.status?.toLowerCase() === "completed"
      ).length,
    };
  }, [appointments]);

  if (!doctor) {
    return (
      <div className="h-screen flex items-center justify-center bg-yellow-50">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-yellow-500 border-t-transparent animate-spin mx-auto mb-3"></div>

          <p className="text-sm text-gray-600">
            Loading Dashboard...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-yellow-50 p-3 md:p-5">
      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-yellow-300 shadow-sm p-4 mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
        >
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-yellow-100 flex items-center justify-center">
              <Stethoscope
                className="text-yellow-700"
                size={26}
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold text-yellow-700">
                Dr. {doctor.name}
              </h1>

              <p className="text-sm text-gray-500">
                Veterinary Dashboard
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 transition"
          >
            <LogOut size={16} />
            Logout
          </button>
        </motion.div>

        {/* PROFILE */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-yellow-300 shadow-sm p-4 mb-4"
        >
          <div className="flex flex-col lg:flex-row lg:justify-between gap-4">

            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-yellow-100 flex items-center justify-center text-2xl font-bold text-yellow-700">
                {doctor.name?.charAt(0)}
              </div>

              <div>
                <h2 className="font-bold text-xl">
                  Dr. {doctor.name}
                </h2>

                <p className="text-yellow-700">
                  {doctor.specialization ||
                    "Veterinary Specialist"}
                </p>

                <p className="text-sm text-gray-500">
                  {doctor.qualification ||
                    "Veterinary Doctor"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="border border-yellow-200 bg-yellow-50 px-4 py-3 text-center">
                <p className="text-xs text-gray-500">
                  Fee
                </p>

                <h3 className="font-bold text-yellow-700">
                  ₹{doctor.consultationFee || 0}
                </h3>
              </div>

              <div className="border border-green-200 bg-green-50 px-4 py-3 text-center">
                <p className="text-xs text-gray-500">
                  Status
                </p>

                <h3 className="font-bold text-green-700">
                  {doctor.status || "Active"}
                </h3>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ACTIONS + STATS */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-4">

        
          {/* Manage Appointments */}
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            onClick={() =>
              navigate("/doctor/appointments")
            }
            className="bg-yellow-500 hover:bg-yellow-600 text-white p-4 shadow-sm text-left col-span-2 lg:col-span-1"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs opacity-90">
                  Manage
                </p>

                <h3 className="font-bold mt-1">
                  Appointments
                </h3>
              </div>

              <List size={26} />
            </div>
          </motion.button>

          <StatCard
            icon={<ClipboardList size={18} />}
            label="Total"
            value={stats.total}
          />

          <StatCard
            icon={<Clock size={18} />}
            label="Pending"
            value={stats.pending}
          />

          <StatCard
            icon={<Calendar size={18} />}
            label="Confirmed"
            value={stats.confirmed}
          />

          <StatCard
            icon={<CheckCircle size={18} />}
            label="Completed"
            value={stats.completed}
          />

        </div>

        {/* RECENT APPOINTMENTS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border border-yellow-300 shadow-sm p-4"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800">
              Recent Appointments
            </h2>

            <button
              onClick={() =>
                navigate("/doctor/appointments")
              }
              className="text-sm text-yellow-700 hover:underline"
            >
              View All
            </button>
          </div>

          {loadingAppointments ? (
            <div className="space-y-3">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border border-yellow-100 p-3 animate-pulse"
                >
                  <div className="h-4 bg-gray-200 w-32 mb-2"></div>
                  <div className="h-3 bg-gray-200 w-24"></div>
                </div>
              ))}
            </div>
          ) : appointments.length === 0 ? (
            <div className="text-center py-8">
              <ClipboardList
                size={40}
                className="mx-auto text-yellow-500 mb-2"
              />

              <p className="text-gray-500">
                No appointments found
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {appointments
                .slice(0, 5)
                .map((item) => (
                  <div
                    key={item._id}
                    className="border border-yellow-100 p-3 hover:bg-yellow-50 transition"
                  >
                    <div className="flex items-center justify-between gap-3">

                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {item.user?.name}
                        </h3>

                        <p className="text-xs text-gray-500">
                          {new Date(
                            item.date
                          ).toLocaleDateString()}{" "}
                          • {item.time}
                        </p>

                        <p className="text-xs text-yellow-700 mt-1">
                          {item.animalType}
                        </p>
                      </div>

                      <span
                        className={`text-xs px-3 py-1 font-medium capitalize ${
                          item.status ===
                          "confirmed"
                            ? "bg-green-100 text-green-700"
                            : item.status ===
                              "completed"
                            ? "bg-blue-100 text-blue-700"
                            : item.status ===
                              "rejected"
                            ? "bg-red-100 text-red-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {item.status}
                      </span>

                    </div>
                  </div>
                ))}
            </div>
          )}
        </motion.div>

      </div>
    </div>
  );
};

/* STAT CARD */

const StatCard = ({
  icon,
  label,
  value,
}) => {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="bg-white border border-yellow-300 shadow-sm p-3 flex items-center gap-3"
    >
      <div className="w-10 h-10 bg-yellow-100 flex items-center justify-center text-yellow-700">
        {icon}
      </div>

      <div>
        <p className="text-[11px] text-gray-500">
          {label}
        </p>

        <h3 className="font-bold text-gray-800">
          {value}
        </h3>
      </div>
    </motion.div>
  );
};

export default DoctorDashboard;