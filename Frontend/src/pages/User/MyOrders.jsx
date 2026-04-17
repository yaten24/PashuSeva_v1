import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaBoxOpen,
  FaRupeeSign,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaSpinner,
  FaArrowLeft,
  FaEye,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function MyOrders() {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const API =
    import.meta.env.VITE_API_URL ||
    "https://api.apnapashu.com";

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/order/my-orders`,
        { withCredentials: true }
      );

      if (data.success) {
        setOrders(data.orders || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatus = (status) => {
    switch (status) {
      case "pending":
        return {
          icon: <FaClock />,
          text: "Pending",
          className:
            "bg-yellow-50 text-yellow-700 border-yellow-300",
        };

      case "accepted":
        return {
          icon: <FaCheckCircle />,
          text: "Accepted",
          className:
            "bg-blue-50 text-blue-700 border-blue-300",
        };

      case "in_progress":
        return {
          icon: <FaTruck />,
          text: "In Progress",
          className:
            "bg-purple-50 text-purple-700 border-purple-300",
        };

      case "completed":
        return {
          icon: <FaCheckCircle />,
          text: "Completed",
          className:
            "bg-green-50 text-green-700 border-green-300",
        };

      case "cancelled":
        return {
          icon: <FaTimesCircle />,
          text: "Cancelled",
          className:
            "bg-red-50 text-red-700 border-red-300",
        };

      default:
        return {
          icon: <FaSpinner />,
          text: status,
          className:
            "bg-gray-50 text-gray-700 border-gray-300",
        };
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-50 px-3 md:px-6 py-4 md:py-6">
      {/* HEADER */}
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
              My Orders
            </h1>

            <p className="text-[11px] md:text-sm text-gray-500 mt-1">
              View & manage your product orders
            </p>
          </div>
        </div>
      </motion.div>

      {/* LOADING */}
      {loading && (
        <div className="flex justify-center py-16">
          <FaSpinner className="animate-spin text-3xl text-yellow-500" />
        </div>
      )}

      {/* EMPTY */}
      {!loading && orders.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white border-2 border-yellow-300 p-6 text-center text-gray-500 font-medium"
        >
          <FaBoxOpen className="mx-auto text-4xl text-yellow-400 mb-3" />
          No orders found
        </motion.div>
      )}

      {/* CARDS */}
      <div className="space-y-3 md:space-y-4">
        <AnimatePresence>
          {orders.map((item, index) => {
            const status = getStatus(item.status);

            return (
              <motion.div
                key={item.orderId}
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
                {/* TOP */}
                <div className="flex justify-between gap-3">
                  <div>
                    <h2 className="font-bold text-sm md:text-lg text-gray-900 flex items-center gap-2">
                      <FaBoxOpen className="text-yellow-500" />
                      {item.productName}
                    </h2>

                    <p className="text-xs md:text-sm text-gray-500 mt-1 break-all">
                      Order ID: {item.orderId}
                    </p>
                  </div>

                  <span
                    className={`text-[10px] md:text-xs px-2 py-1 h-fit font-bold uppercase border flex items-center gap-1 ${status.className}`}
                  >
                    {status.icon}
                    {status.text}
                  </span>
                </div>

                {/* PRICE BOX */}
                <div className="mt-4 border border-yellow-200 bg-yellow-50 p-3">
                  <p className="text-[10px] md:text-xs text-gray-500">
                    Total Amount
                  </p>

                  <p className="text-lg md:text-2xl font-black text-yellow-600 flex items-center gap-1 mt-1">
                    <FaRupeeSign className="text-sm" />
                    {item.totalAmount}
                  </p>
                </div>

                {/* BUTTON */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  whileHover={{ scale: 1.01 }}
                  onClick={() =>
                    navigate(
                      `/order/${item.orderId}`
                    )
                  }
                  className="w-full mt-3 bg-yellow-500 hover:bg-yellow-600 text-white py-2 text-xs md:text-sm font-bold flex items-center justify-center gap-2"
                >
                  <FaEye />
                  View Order
                </motion.button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}