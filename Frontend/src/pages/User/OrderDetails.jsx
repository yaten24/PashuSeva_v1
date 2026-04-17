import { useEffect, useState } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaRupeeSign,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
  FaTruck,
  FaSpinner,
  FaCreditCard,
  FaMoneyBillWave,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaBan,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { orderId } = useParams();

  const API =
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000";

  const [loading, setLoading] =
    useState(true);

  const [cancelLoading, setCancelLoading] =
    useState(false);

  const [order, setOrder] =
    useState(null);

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const fetchOrderDetails =
    async () => {
      try {
        const { data } =
          await axios.get(
            `${API}/api/order/${orderId}`,
            {
              withCredentials: true,
            }
          );

        if (data.success) {
          setOrder(data.order);
        }
      } catch (error) {
        toast.error(
          "Failed to load order"
        );
      } finally {
        setLoading(false);
      }
    };

  const cancelOrder =
    async () => {
      try {
        setCancelLoading(true);

        const { data } =
          await axios.put(
            `${API}/api/order/cancel/${orderId}`,
            {},
            {
              withCredentials: true,
            }
          );

        if (data.success) {
          toast.success(
            "Order cancelled successfully"
          );

          setOrder(
            data.order
          );
        } else {
          toast.error(
            data.message
          );
        }
      } catch (error) {
        toast.error(
          "Cancel failed"
        );
      } finally {
        setCancelLoading(false);
      }
    };

  const getStatus = (
    status
  ) => {
    switch (status) {
      case "pending":
        return {
          icon: <FaClock />,
          text: "Pending",
          style:
            "bg-yellow-50 text-yellow-700 border-yellow-300",
        };

      case "accepted":
        return {
          icon: (
            <FaCheckCircle />
          ),
          text: "Accepted",
          style:
            "bg-blue-50 text-blue-700 border-blue-300",
        };

      case "in_progress":
        return {
          icon: <FaTruck />,
          text: "In Progress",
          style:
            "bg-purple-50 text-purple-700 border-purple-300",
        };

      case "completed":
        return {
          icon: (
            <FaCheckCircle />
          ),
          text: "Completed",
          style:
            "bg-green-50 text-green-700 border-green-300",
        };

      case "cancelled":
        return {
          icon: (
            <FaTimesCircle />
          ),
          text: "Cancelled",
          style:
            "bg-red-50 text-red-700 border-red-300",
        };

      default:
        return {
          icon: (
            <FaSpinner />
          ),
          text: status,
          style:
            "bg-gray-50 text-gray-700 border-gray-300",
        };
    }
  };

  const formatDate = (
    date
  ) =>
    new Date(
      date
    ).toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <FaSpinner className="animate-spin text-3xl text-yellow-500" />
      </div>
    );
  }

  const status =
    getStatus(
      order.status
    );

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-50 px-3 md:px-6 py-4">
      {/* HEADER */}
      <div className="bg-white border-2 border-yellow-400 p-4 shadow-sm mb-4 flex items-center gap-3">
        <button
          onClick={() =>
            navigate(-1)
          }
          className="w-10 h-10 border-2 border-yellow-400 bg-yellow-50 text-yellow-600 flex items-center justify-center"
        >
          <FaArrowLeft />
        </button>

        <div>
          <h1 className="text-lg md:text-3xl font-black">
            Order Details
          </h1>

          <p className="text-xs text-gray-500">
            {order._id}
          </p>
        </div>
      </div>

      {/* PRODUCT CARD */}
      <motion.div
        initial={{
          opacity: 0,
          y: 20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-white border-2 border-yellow-300 p-4"
      >
        <div className="flex justify-between items-start gap-3">
          <div>
            <span
              className={`inline-flex px-3 py-1 text-xs font-bold border mb-3 ${status.style}`}
            >
              {status.icon}
              <span className="ml-2">
                {
                  status.text
                }
              </span>
            </span>

            <h2 className="text-xl font-black">
              {
                order.product
                  ?.name
              }
            </h2>

            <p className="text-xs text-gray-500 mt-1">
              Ordered on{" "}
              {formatDate(
                order.createdAt
              )}
            </p>

            <p className="text-2xl font-black text-yellow-600 mt-3 flex items-center gap-1">
              <FaRupeeSign />
              {
                order.totalAmount
              }
            </p>
          </div>

          {/* CANCEL BUTTON */}
          {order.status ===
            "pending" && (
            <button
              onClick={
                cancelOrder
              }
              disabled={
                cancelLoading
              }
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 text-sm font-bold flex items-center gap-2"
            >
              {cancelLoading ? (
                <FaSpinner className="animate-spin" />
              ) : (
                <FaBan />
              )}

              {cancelLoading
                ? "Cancelling..."
                : "Cancel Order"}
            </button>
          )}
        </div>
      </motion.div>

      {/* INFO GRID */}
      <div className="grid md:grid-cols-2 gap-4 mt-4">
        <div className="bg-white border-2 border-yellow-300 p-4">
          <h3 className="font-black mb-3">
            Payment Info
          </h3>

          <Info
            icon={
              order.payment
                ?.method ===
              "online" ? (
                <FaCreditCard />
              ) : (
                <FaMoneyBillWave />
              )
            }
            label="Method"
            value={
              order.payment
                ?.method
            }
          />

          <Info
            icon={
              <FaCheckCircle />
            }
            label="Status"
            value={
              order.payment
                ?.status
            }
          />

          <Info
            icon={
              <FaCalendarAlt />
            }
            label="Date"
            value={formatDate(
              order.createdAt
            )}
          />
        </div>

        <div className="bg-white border-2 border-yellow-300 p-4">
          <h3 className="font-black mb-3">
            Delivery Address
          </h3>

          <Info
            icon={<FaUser />}
            label="Name"
            value={
              order.address
                ?.fullName
            }
          />

          <Info
            icon={
              <FaPhoneAlt />
            }
            label="Mobile"
            value={
              order.address
                ?.mobile
            }
          />

          <Info
            icon={
              <FaMapMarkerAlt />
            }
            label="Address"
            value={`${order.address?.houseNo}, ${order.address?.area}, ${order.address?.city}, ${order.address?.state}`}
          />
        </div>
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
    <div className="flex gap-3 mb-3">
      <div className="text-yellow-600 mt-1">
        {icon}
      </div>

      <div>
        <p className="text-xs text-gray-500">
          {label}
        </p>

        <p className="text-sm font-semibold">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}