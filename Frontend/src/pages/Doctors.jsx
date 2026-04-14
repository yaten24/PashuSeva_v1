import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaUserMd,
  FaStar,
  FaTimes,
  FaSearch,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Doctors() {
  const [selected, setSelected] = useState(null);
  const [search, setSearch] = useState("");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_API_URL || "https://api.apnapashu.com";

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

  // 🔥 SEARCH FIXED FOR location.city / state
  const filtered = doctors.filter((d) => {
    const query = search.toLowerCase();

    const name = d.name?.toLowerCase() || "";
    const city = d.location?.city?.toLowerCase() || "";
    const state = d.location?.state?.toLowerCase() || "";
    const spec = d.specialization?.toLowerCase() || "";

    return (
      name.includes(query) ||
      city.includes(query) ||
      state.includes(query) ||
      spec.includes(query)
    );
  });

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
        <div className="p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 p-3 animate-pulse"
            >
              <div className="h-5 bg-gray-200 w-2/3 mb-3"></div>
              <div className="h-3 bg-gray-100 w-full mb-2"></div>
              <div className="h-3 bg-gray-100 w-1/2 mb-2"></div>
              <div className="h-8 bg-yellow-100 w-20 mt-3"></div>
            </div>
          ))}
        </div>
      )}

      {/* GRID */}
      {!loading && (
        <div className="p-3 md:p-6 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
          {filtered.map((d, index) => (
            <motion.div
              key={d._id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.04 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-200 shadow-sm p-3"
            >
              {/* TOP */}
              <div className="flex justify-between items-start gap-2">
                <div>
                  <h3 className="text-sm md:text-base font-bold text-gray-900">
                    {d.name}
                  </h3>

                  <p className="text-[11px] text-gray-500">
                    {d.specialization}
                  </p>
                </div>

                {/* <span
                  className={`text-[10px] px-2 py-1 font-semibold ${
                    d.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {d.status}
                </span> */}
              </div>

              {/* INFO */}
              <div className="mt-3 space-y-1 text-[11px] text-gray-600">
                <div className="flex items-center gap-1">
                  <FaMapMarkerAlt className="text-yellow-500" />
                  {d.location?.city}, {d.location?.state}
                </div>

                <div>{d.experience} Years Experience</div>

                <div className="flex items-center gap-1 text-yellow-500">
                  <FaStar />
                  {d.rating || 0}
                </div>
              </div>

              {/* FEE */}
              <div className="mt-3 text-lg font-black text-yellow-600">
                ₹{d.consultationFee}
              </div>

              {/* BUTTONS */}
              <div className="grid grid-cols-2 gap-2 mt-3">
                <a
                  href={`tel:${d.mobile}`}
                  className="bg-yellow-500 text-white text-xs py-2 font-bold text-center flex items-center justify-center gap-1"
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

      {/* EMPTY */}
      {!loading && filtered.length === 0 && (
        <div className="text-center py-10 text-gray-500">
          No doctors found
        </div>
      )}

      {/* DRAWER */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-50 flex justify-end"
          >
            <motion.div
              initial={{ x: 350 }}
              animate={{ x: 0 }}
              exit={{ x: 350 }}
              className="bg-white w-full sm:w-96 h-full shadow-xl overflow-y-auto"
            >
              {/* HEADER */}
              <div className="flex justify-between items-center px-4 py-4">
                <h2 className="font-black text-lg">
                  Doctor Details
                </h2>

                <button onClick={() => setSelected(null)}>
                  <FaTimes />
                </button>
              </div>

              {/* BODY */}
              <div className="p-4">
                <div className="w-20 h-20 bg-yellow-100 flex items-center justify-center text-yellow-600 text-3xl mx-auto">
                  <FaUserMd />
                </div>

                <h3 className="text-center text-xl font-black mt-3">
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
                    label="Consultation Fee"
                    value={`₹${selected.consultationFee}`}
                  />

                  <Info
                    label="Phone"
                    value={selected.mobile}
                  />

                  <Info
                    label="Rating"
                    value={selected.rating || 0}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <a
                    href={`tel:${selected.mobile}`}
                    className="bg-yellow-500 text-white py-3 text-sm font-bold text-center flex items-center justify-center gap-2"
                  >
                    <FaPhoneAlt />
                    Call
                  </a>

                  <button
                    onClick={() => setSelected(null)}
                    className="border border-gray-300 py-3 text-sm font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div className="border border-gray-200 p-3 bg-gray-50">
      <p className="text-[11px] text-gray-500">{label}</p>
      <p className="font-semibold text-gray-900 mt-1">{value}</p>
    </div>
  );
}