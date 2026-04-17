import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaStar,
  FaTimes,
  FaSearch,
  FaCalendarAlt,
  FaClock,
  FaMoneyBillWave,
  FaPaw,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Doctors() {
  const navigate = useNavigate();

  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  const [form, setForm] = useState({
    animalType: "",
    problem: "",
    date: "",
    time: "",
    paymentMethod: "onsite",
  });

  const API_URL =
    import.meta.env.VITE_API_URL || "http://localhost:5000";

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/doctor/get-doctors`
      );

      if (data.success) {
        setDoctors(data.doctors || []);
      }
    } catch (error) {
      console.log("Doctors Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = doctors.filter((d) => {
    const q = search.toLowerCase();

    return (
      d.name?.toLowerCase().includes(q) ||
      d.specialization?.toLowerCase().includes(q) ||
      d.location?.city?.toLowerCase().includes(q) ||
      d.location?.state?.toLowerCase().includes(q)
    );
  });

  const handleBook = async () => {
    try {
      if (
        !form.animalType ||
        !form.problem ||
        !form.date ||
        !form.time
      ) {
        return alert("Please fill all fields");
      }

      if (form.paymentMethod === "online") {
        navigate("/online", {
          state: {
            doctorId: selected._id,
            doctor: selected,
            bookingData: form,
          },
        });
        return;
      }

      setBookingLoading(true);

      const { data } = await axios.post(
        `${API_URL}/api/appointment/book`,
        {
          doctorId: selected._id,
          animalType: form.animalType,
          problemDescription: form.problem,
          date: form.date,
          time: form.time,
          paymentMethod: form.paymentMethod,
        },
        { withCredentials: true }
      );

      if (data.success) {
        alert("Appointment Booked Successfully");
        setBookingOpen(false);

        setForm({
          animalType: "",
          problem: "",
          date: "",
          time: "",
          paymentMethod: "onsite",
        });
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Booking failed");
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-yellow-50 pb-8">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-200 px-4 md:px-8 py-4 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h1 className="text-xl md:text-3xl font-black text-gray-900">
              Apna<span className="text-yellow-500">Pashu</span> Doctors
            </h1>

            <p className="text-xs md:text-sm text-gray-500 mt-1">
              Find trusted veterinary doctors near you
            </p>
          </div>

          <div className="flex items-center bg-gray-50 border border-gray-200 px-3 py-2 w-full md:w-80">
            <FaSearch className="text-gray-400 text-sm" />

            <input
              type="text"
              placeholder="Search doctor, city..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-2 text-sm outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* LOADING */}
      {loading && (
        <div className="p-4 text-center font-semibold">
          Loading doctors...
        </div>
      )}

      {/* GRID */}
      {!loading && (
        <div className="p-3 md:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {filtered.map((d, index) => (
            <motion.div
              key={d._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white border border-gray-200 shadow-sm p-3"
            >
              <h3 className="font-bold text-sm md:text-base">
                {d.name}
              </h3>

              <p className="text-xs text-gray-500">
                {d.specialization}
              </p>

              <div className="mt-2 text-xs text-gray-600 space-y-1">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-yellow-500" />
                  {d.location?.city}, {d.location?.state}
                </div>

                <div>{d.experience} Years Exp.</div>

                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar />
                  {d.rating || 0}
                </div>
              </div>

              <div className="mt-3 text-yellow-600 font-black text-lg">
                ₹{d.consultationFee}
              </div>

              <div className="grid grid-cols-2 gap-2 mt-3">
                <a
                  href={`tel:${d.mobile}`}
                  className="bg-yellow-500 text-white text-xs py-2 font-bold flex justify-center items-center gap-1"
                >
                  <FaPhoneAlt />
                  Call
                </a>

                <button
                  onClick={() => setSelected(d)}
                  className="border border-gray-300 text-xs py-2 font-semibold"
                >
                  View
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* DOCTOR DETAIL DRAWER */}
      <AnimatePresence>
        {selected && (
          <motion.div
            className="fixed inset-0 bg-black/40 z-50 flex justify-end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="bg-white w-full sm:w-96 h-full overflow-y-auto"
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="font-black text-lg">
                  Doctor Details
                </h2>

                <button onClick={() => setSelected(null)}>
                  <FaTimes />
                </button>
              </div>

              <div className="p-4">
                <div className="w-20 h-20 mx-auto bg-yellow-100 flex items-center justify-center text-3xl text-yellow-600">
                  <FaUserMd />
                </div>

                <h3 className="text-center font-black text-xl mt-3">
                  {selected.name}
                </h3>

                <p className="text-center text-sm text-gray-500">
                  {selected.specialization}
                </p>

                <div className="mt-5 space-y-3">
                  <Info
                    label="Location"
                    value={`${selected.location?.city}, ${selected.location?.state}`}
                  />
                  <Info
                    label="Experience"
                    value={`${selected.experience} Years`}
                  />
                  <Info
                    label="Fee"
                    value={`₹${selected.consultationFee}`}
                  />
                  <Info
                    label="Phone"
                    value={selected.mobile}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <a
                    href={`tel:${selected.mobile}`}
                    className="bg-yellow-500 text-white py-3 text-sm font-bold text-center flex justify-center items-center gap-2"
                  >
                    <FaPhoneAlt />
                    Call
                  </a>

                  <button
                    onClick={() => setBookingOpen(true)}
                    className="bg-gray-900 text-white py-3 text-sm font-bold"
                  >
                    Book Appointment
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* BOOKING POPUP */}
      <AnimatePresence>
        {bookingOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              className="bg-white w-full max-w-md p-5"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-black text-lg">
                  Book Appointment
                </h2>

                <button
                  onClick={() => setBookingOpen(false)}
                >
                  <FaTimes />
                </button>
              </div>

              <div className="space-y-3">
                <Input
                  icon={<FaPaw />}
                  placeholder="Animal Type"
                  value={form.animalType}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      animalType: e.target.value,
                    })
                  }
                />

                <textarea
                  placeholder="Problem Description"
                  rows="3"
                  value={form.problem}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      problem: e.target.value,
                    })
                  }
                  className="w-full border px-3 py-2 outline-none"
                />

                <Input
                  type="date"
                  icon={<FaCalendarAlt />}
                  value={form.date}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      date: e.target.value,
                    })
                  }
                />

                <Input
                  type="time"
                  icon={<FaClock />}
                  value={form.time}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      time: e.target.value,
                    })
                  }
                />

                <div className="border px-3 py-2 flex items-center gap-2">
                  <FaMoneyBillWave className="text-yellow-500" />

                  <select
                    value={form.paymentMethod}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        paymentMethod: e.target.value,
                      })
                    }
                    className="w-full outline-none bg-transparent"
                  >
                    <option value="onsite">
                      On Site Payment
                    </option>
                    <option value="online">
                      Online Payment
                    </option>
                  </select>
                </div>

                <button
                  onClick={handleBook}
                  disabled={bookingLoading}
                  className="w-full bg-yellow-500 text-white py-3 font-bold mt-2"
                >
                  {bookingLoading
                    ? "Booking..."
                    : "Confirm Booking"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Input({
  icon,
  type = "text",
  value,
  onChange,
  placeholder,
}) {
  return (
    <div className="border px-3 py-2 flex items-center gap-2">
      <span className="text-yellow-500">{icon}</span>

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full outline-none"
      />
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="border border-gray-200 p-3 bg-gray-50">
      <p className="text-xs text-gray-500">{label}</p>
      <p className="font-semibold mt-1">{value}</p>
    </div>
  );
}