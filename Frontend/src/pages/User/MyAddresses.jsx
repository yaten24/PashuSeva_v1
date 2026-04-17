import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaHome,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPlus,
  FaStar,
  FaSpinner,
  FaMapPin,
  FaTrash,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MyAddresses() {
  const navigate = useNavigate();

  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteId, setDeleteId] = useState(null);
  const [deleteLoading, setDeleteLoading] =
    useState(false);

  const API =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/user/address/get`,
        { withCredentials: true }
      );

      if (data.success) {
        setAddresses(data.addresses || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      setDeleteLoading(true);

      await axios.delete(
        `${API}/api/user/address/delete/${deleteId}`,
        { withCredentials: true }
      );

      setAddresses((prev) =>
        prev.filter(
          (item) =>
            item._id !== deleteId
        )
      );

      setDeleteId(null);
    } catch (error) {
      alert("Delete failed");
    } finally {
      setDeleteLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-50 px-3 md:px-6 py-4 md:py-6">
      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: -25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-5 bg-white border-2 border-yellow-400 shadow-sm p-4"
      >
        <div className="flex items-center justify-between gap-3">
          <button
            onClick={() =>
              navigate(-1)
            }
            className="w-10 h-10 border-2 border-yellow-400 bg-yellow-50 flex items-center justify-center text-yellow-600 hover:bg-yellow-400 hover:text-white transition"
          >
            <FaArrowLeft />
          </button>

          <div className="flex-1">
            <h1 className="text-lg md:text-3xl font-black text-gray-900">
              My Addresses
            </h1>

            <p className="text-[11px] md:text-sm text-gray-500 mt-1">
              View & manage your saved locations
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/add-address")
            }
            className="w-10 h-10 bg-yellow-500 hover:bg-yellow-600 text-white flex items-center justify-center"
          >
            <FaPlus />
          </button>
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
        addresses.length ===
          0 && (
          <div className="bg-white border-2 border-yellow-300 p-6 text-center text-gray-500 font-medium">
            No addresses found
          </div>
        )}

      {/* Cards */}
      <div className="space-y-3 md:space-y-4">
        <AnimatePresence>
          {addresses.map(
            (item, index) => (
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
                  delay:
                    index * 0.05,
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
                      <FaHome className="text-yellow-500" />
                      {
                        item.fullName
                      }
                    </h2>

                    <p className="text-xs md:text-sm text-gray-500 mt-1 uppercase">
                      {
                        item.addressType
                      }
                    </p>
                  </div>

                  <div className="flex gap-2">
                    {item.isDefault && (
                      <span className="text-[10px] md:text-xs px-2 py-1 h-fit font-bold uppercase border bg-yellow-50 text-yellow-700 border-yellow-300 flex items-center gap-1">
                        <FaStar />
                        Default
                      </span>
                    )}

                    <button
                      onClick={() =>
                        setDeleteId(
                          item._id
                        )
                      }
                      className="w-8 h-8 bg-red-50 border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <Info
                    icon={
                      <FaPhoneAlt />
                    }
                    label="Mobile"
                    value={
                      item.mobile
                    }
                  />

                  <Info
                    icon={
                      <FaMapPin />
                    }
                    label="Pincode"
                    value={
                      item.pincode
                    }
                  />

                  <Info
                    icon={
                      <FaMapMarkerAlt />
                    }
                    label="City"
                    value={
                      item.city
                    }
                  />

                  <Info
                    icon={
                      <FaMapMarkerAlt />
                    }
                    label="State"
                    value={
                      item.state
                    }
                  />
                </div>

                {/* Full Address */}
                <div className="mt-3 border border-yellow-200 bg-yellow-50 p-2">
                  <p className="text-[10px] md:text-xs text-gray-500">
                    Full Address
                  </p>

                  <p className="text-xs md:text-sm font-semibold text-gray-800 mt-1 leading-5">
                    {
                      item.houseNo
                    }, {item.area}
                    {item.landmark
                      ? `, ${item.landmark}`
                      : ""}
                    , {
                      item.city
                    }, {
                      item.state
                    } -{" "}
                    {
                      item.pincode
                    }
                  </p>
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* Delete Popup */}
      <AnimatePresence>
        {deleteId && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center px-4"
          >
            <motion.div
              initial={{
                scale: 0.8,
                y: 40,
              }}
              animate={{
                scale: 1,
                y: 0,
              }}
              exit={{
                scale: 0.8,
                y: 40,
              }}
              className="bg-white w-full max-w-sm border-2 border-yellow-300 shadow-xl p-5"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-black text-lg text-gray-900">
                  Delete Address
                </h3>

                <button
                  onClick={() =>
                    setDeleteId(
                      null
                    )
                  }
                  className="text-gray-500"
                >
                  <FaTimes />
                </button>
              </div>

              <p className="text-sm text-gray-500 mt-3">
                Are you sure you
                want to delete
                this address?
              </p>

              <div className="grid grid-cols-2 gap-3 mt-5">
                <button
                  onClick={() =>
                    setDeleteId(
                      null
                    )
                  }
                  className="border border-gray-300 py-2 font-semibold"
                >
                  Cancel
                </button>

                <button
                  onClick={
                    handleDelete
                  }
                  disabled={
                    deleteLoading
                  }
                  className="bg-red-500 hover:bg-red-600 text-white py-2 font-bold flex items-center justify-center gap-2"
                >
                  {deleteLoading ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      Deleting
                    </>
                  ) : (
                    <>
                      <FaTrash />
                      Delete
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
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
      whileHover={{
        y: -2,
      }}
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