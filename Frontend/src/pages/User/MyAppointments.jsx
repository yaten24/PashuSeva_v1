import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaUserMd,
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaTimesCircle,
  FaSpinner,
  FaArrowLeft,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MyAppointments() {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancelLoading, setCancelLoading] = useState("");

  const API =
    import.meta.env.VITE_API_URL ||
    "https://api.apnapashu.com";

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/appointment/my`,
        { withCredentials: true }
      );

      if (data.success) {
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const cancelAppointment = async (id) => {
    try {
      setCancelLoading(id);

      await axios.put(
        `${API}/api/appointment/cancel/${id}`,
        {},
        { withCredentials: true }
      );

      setAppointments((prev) =>
        prev.map((item) =>
          item._id === id
            ? { ...item, status: "cancelled" }
            : item
        )
      );
    } catch (error) {
      alert("Cancel failed");
    } finally {
      setCancelLoading("");
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-50 px-3 md:px-6 py-4 md:py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 bg-white border-2 border-yellow-400 shadow-sm p-4"
      >
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() => navigate(-1)}
            className="w-10 h-10 border-2 border-yellow-400 bg-yellow-50 flex items-center justify-center text-yellow-600 hover:bg-yellow-400 hover:text-white transition"
          >
            <FaArrowLeft />
          </button>

          <div className="flex-1">
            <h1 className="text-lg md:text-3xl font-black text-gray-900">
              My Appointments
            </h1>

            <p className="text-[11px] md:text-sm text-gray-500 mt-1">
              View & manage your bookings
            </p>
          </div>
        </div>
      </motion.div>

      {/* Loading */}
      {loading && (
        <div className="flex justify-center py-16">
          <FaSpinner className="animate-spin text-3xl text-yellow-500" />
        </div>
      )}

      {/* Empty */}
      {!loading &&
        appointments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white border-2 border-yellow-300 p-6 text-center text-gray-500 font-medium"
          >
            No appointments found
          </motion.div>
        )}

      {/* Cards */}
      <div className="space-y-3 md:space-y-4">
        <AnimatePresence>
          {appointments.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{
                opacity: 0,
                y: 35,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                x: 120,
              }}
              transition={{
                duration: 0.35,
                delay: index * 0.05,
              }}
              whileHover={{
                y: -3,
              }}
              className="bg-white border-2 border-yellow-300 shadow-sm p-3 md:p-5"
            >
              {/* Top */}
              <div className="flex justify-between gap-3">
                <div>
                  <h2 className="font-bold text-sm md:text-lg text-gray-900 flex items-center gap-2">
                    <FaUserMd className="text-yellow-500" />
                    {item.doctor?.name}
                  </h2>

                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    {item.doctor?.specialization}
                  </p>
                </div>

                <span
                  className={`text-[10px] md:text-xs px-2 py-1 h-fit font-bold uppercase border ${
                    item.status === "cancelled"
                      ? "bg-red-50 text-red-600 border-red-200"
                      : item.status === "pending"
                      ? "bg-yellow-50 text-yellow-700 border-yellow-300"
                      : "bg-green-50 text-green-700 border-green-200"
                  }`}
                >
                  {item.status}
                </span>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Info
                  icon={<FaCalendarAlt />}
                  label="Date"
                  value={formatDate(item.date)}
                />

                <Info
                  icon={<FaClock />}
                  label="Time"
                  value={item.time}
                />

                <Info
                  icon={<FaMapMarkerAlt />}
                  label="Location"
                  value={`${item.doctor?.location?.city}, ${item.doctor?.location?.state}`}
                />

                <Info
                  icon={<FaMoneyBillWave />}
                  label="Fee"
                  value={`₹${item.fee}`}
                />
              </div>

              {/* Problem */}
              <div className="mt-3 border border-yellow-200 bg-yellow-50 p-2">
                <p className="text-[10px] md:text-xs text-gray-500">
                  Problem
                </p>

                <p className="text-xs md:text-sm font-semibold text-gray-800 mt-1 line-clamp-2">
                  {item.problemDescription}
                </p>
              </div>

              {/* Button */}
              {item.status !== "cancelled" && (
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() =>
                    cancelAppointment(item._id)
                  }
                  disabled={
                    cancelLoading === item._id
                  }
                  className="w-full mt-3 bg-red-500 hover:bg-red-600 text-white py-2 text-xs md:text-sm font-bold flex items-center justify-center gap-2"
                >
                  {cancelLoading === item._id ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Cancelling...
                    </>
                  ) : (
                    <>
                      <FaTimesCircle />
                      Cancel Appointment
                    </>
                  )}
                </motion.button>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

function Info({
  icon,
  label,
  value,
}) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      className="border border-yellow-200 bg-yellow-50 px-2 py-2"
    >
      <p className="text-yellow-600 text-xs mb-1">
        {icon}
      </p>

      <p className="text-[10px] text-gray-500">
        {label}
      </p>

      <p className="font-semibold text-gray-800 text-xs md:text-sm mt-1 truncate">
        {value}
      </p>
    </motion.div>
  );
}