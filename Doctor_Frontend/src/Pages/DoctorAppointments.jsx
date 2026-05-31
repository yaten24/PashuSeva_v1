import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import {
  CheckCircle,
  XCircle,
  Calendar,
  Clock,
  User,
  RefreshCw,
  PawPrint,
  IndianRupee,
  BadgeCheck,
  ClipboardList,
} from "lucide-react";

const DoctorAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState(null);

  const fetchAppointments = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        "https://api.apnapashu.com/api/appointment/doctor-appointment",
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setAppointments(data.appointments || []);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load appointments");
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const updateStatus = async (appointmentId, status) => {
    try {
      setActionLoading(appointmentId);

      const { data } = await axios.put(
        `https://api.apnapashu.com/api/appointment/update-status/${appointmentId}`,
        { status },
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        toast.success(data.message);
        await fetchAppointments();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update appointment"
      );
    } finally {
      setActionLoading(null);
    }
  };

  const stats = useMemo(() => {
    return {
      pending: appointments.filter(
        (a) => a.status?.toLowerCase() === "pending"
      ).length,

      confirmed: appointments.filter(
        (a) => a.status?.toLowerCase() === "confirmed"
      ).length,

      completed: appointments.filter(
        (a) => a.status?.toLowerCase() === "completed"
      ).length,

      rejected: appointments.filter(
        (a) => a.status?.toLowerCase() === "rejected"
      ).length,
    };
  }, [appointments]);

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case "confirmed":
        return "bg-green-100 text-green-700 border border-green-300";

      case "completed":
        return "bg-blue-100 text-blue-700 border border-blue-300";

      case "rejected":
        return "bg-red-100 text-red-700 border border-red-300";

      default:
        return "bg-yellow-100 text-yellow-700 border border-yellow-300";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-yellow-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6"
        >
          <div>
            <h1 className="text-3xl font-bold text-yellow-700 flex items-center gap-2">
              <ClipboardList />
              Doctor Appointments
            </h1>

            <p className="text-gray-600 mt-1">
              Manage veterinary appointments efficiently
            </p>
          </div>

          <button
            onClick={fetchAppointments}
            className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-none hover:bg-yellow-600 transition"
          >
            <RefreshCw size={16} />
            Refresh
          </button>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

          <div className="bg-white border border-yellow-200 shadow-sm p-5 rounded-none">
            <p className="text-sm text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold text-yellow-600">
              {stats.pending}
            </h2>
          </div>

          <div className="bg-white border border-green-200 shadow-sm p-5 rounded-none">
            <p className="text-sm text-gray-500">Confirmed</p>
            <h2 className="text-3xl font-bold text-green-600">
              {stats.confirmed}
            </h2>
          </div>

          <div className="bg-white border border-blue-200 shadow-sm p-5 rounded-none">
            <p className="text-sm text-gray-500">Completed</p>
            <h2 className="text-3xl font-bold text-blue-600">
              {stats.completed}
            </h2>
          </div>

          <div className="bg-white border border-red-200 shadow-sm p-5 rounded-none">
            <p className="text-sm text-gray-500">Rejected</p>
            <h2 className="text-3xl font-bold text-red-600">
              {stats.rejected}
            </h2>
          </div>

        </div>
        {loading ? (
          <div className="grid gap-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white border border-yellow-200 p-5 animate-pulse rounded-none"
              >
                <div className="h-5 w-40 bg-gray-200 mb-3"></div>
                <div className="h-4 w-60 bg-gray-200 mb-2"></div>
                <div className="h-4 w-32 bg-gray-200"></div>
              </div>
            ))}
          </div>
        ) : appointments.length === 0 ? (
          <div className="bg-white border border-yellow-200 p-10 text-center rounded-none">
            <ClipboardList
              size={50}
              className="mx-auto text-yellow-500 mb-3"
            />

            <h2 className="text-xl font-semibold text-gray-700">
              No Appointments Found
            </h2>

            <p className="text-gray-500 mt-2">
              No patients have booked appointments yet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {appointments.map((item) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
                className="bg-white border border-yellow-200 shadow-sm rounded-none"
              >
                <div className="p-5">

                  <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                    {/* LEFT SECTION */}
                    <div className="flex-1">

                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 bg-yellow-100 border border-yellow-200 flex items-center justify-center rounded-none">
                          <User
                            size={22}
                            className="text-yellow-700"
                          />
                        </div>

                        <div>
                          <h2 className="font-semibold text-lg text-gray-800">
                            {item.user?.name}
                          </h2>

                          <p className="text-sm text-gray-500">
                            {item.user?.email}
                          </p>

                          <p className="text-sm text-gray-500">
                            {item.user?.mobile}
                          </p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-4">

                        <div className="flex items-center gap-2 text-gray-700">
                          <PawPrint
                            size={18}
                            className="text-yellow-600"
                          />

                          <span>
                            {item.animalType}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <Calendar
                            size={18}
                            className="text-blue-600"
                          />

                          <span>
                            {new Date(item.date).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <Clock
                            size={18}
                            className="text-purple-600"
                          />

                          <span>
                            {item.time}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                          <IndianRupee
                            size={18}
                            className="text-green-600"
                          />

                          <span>
                            ₹{item.fee}
                          </span>
                        </div>

                      </div>

                      <div className="mt-4">
                        <p className="font-semibold text-gray-700 text-sm">
                          Problem Description
                        </p>

                        <p className="text-sm text-gray-600 mt-1">
                          {item.problemDescription}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center gap-2 text-sm">
                        <BadgeCheck
                          size={16}
                          className="text-green-600"
                        />

                        <span className="capitalize">
                          Payment: {item.paymentStatus}
                        </span>
                      </div>

                    </div>

                    {/* RIGHT SECTION */}
                    <div className="lg:min-w-[250px] flex flex-col gap-3">

                      <span
                        className={`px-4 py-2 text-sm font-medium text-center capitalize rounded-none ${getStatusClass(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>

                      {/* Pending Actions */}
                      {item.status?.toLowerCase() === "pending" && (
                        <div className="flex flex-col gap-2">

                          <button
                            disabled={actionLoading === item._id}
                            onClick={() =>
                              updateStatus(
                                item._id,
                                "confirmed"
                              )
                            }
                            className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 hover:bg-green-600 transition disabled:opacity-50 rounded-none"
                          >
                            {actionLoading === item._id ? (
                              <RefreshCw
                                size={16}
                                className="animate-spin"
                              />
                            ) : (
                              <CheckCircle size={16} />
                            )}

                            Accept Appointment
                          </button>

                          <button
                            disabled={actionLoading === item._id}
                            onClick={() =>
                              updateStatus(
                                item._id,
                                "rejected"
                              )
                            }
                            className="flex items-center justify-center gap-2 bg-red-500 text-white px-4 py-2 hover:bg-red-600 transition disabled:opacity-50 rounded-none"
                          >
                            <XCircle size={16} />
                            Reject Appointment
                          </button>

                        </div>
                      )}

                      {/* Confirmed Actions */}
                      {item.status?.toLowerCase() === "confirmed" && (
                        <button
                          disabled={actionLoading === item._id}
                          onClick={() =>
                            updateStatus(
                              item._id,
                              "completed"
                            )
                          }
                          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 transition disabled:opacity-50 rounded-none"
                        >
                          {actionLoading === item._id ? (
                            <RefreshCw
                              size={16}
                              className="animate-spin"
                            />
                          ) : (
                            <CheckCircle size={16} />
                          )}

                          Complete Treatment
                        </button>
                      )}

                    </div>

                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default DoctorAppointments;