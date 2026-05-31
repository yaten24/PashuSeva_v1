import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import {
  FaShoppingBag,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaCheck,
  FaTimes,
  FaSpinner,
  FaCheckCircle,
  FaRupeeSign,
} from "react-icons/fa";

const SellerOrders = () => {
  const API =
    "https://api.apnapashu.com";

  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [updating, setUpdating] =
    useState(null);

  const fetchOrders =
    async () => {
      try {
        setLoading(true);

        const { data } =
          await axios.get(
            `${API}/api/seller/seller-orders`,
            {
              withCredentials: true,
            }
          );

        if (data.success) {
          setOrders(
            data.orders || []
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const updateStatus =
    async (
      orderId,
      status
    ) => {
      try {
        setUpdating(orderId);

        const { data } =
          await axios.put(
            `${API}/api/seller/update-order-status/${orderId}`,
            {
              status,
            },
            {
              withCredentials: true,
            }
          );

        if (data.success) {
          setOrders((prev) =>
            prev.map((item) =>
              item._id === orderId
                ? {
                    ...item,
                    status,
                  }
                : item
            )
          );
        }
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Failed to update order"
        );
      } finally {
        setUpdating(null);
      }
    };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusColor = (
    status
  ) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "in_progress":
        return "bg-yellow-100 text-yellow-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-orange-100 text-orange-700";
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-5 px-3">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="bg-white border-2 border-orange-200 p-4 shadow-sm mb-5">

          <h1 className="text-2xl md:text-3xl font-bold text-orange-700 flex items-center gap-2">
            <FaShoppingBag />
            Seller Orders
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage customer orders
          </p>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">

          <div className="bg-white border-2 border-orange-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">
              Total Orders
            </p>

            <h3 className="text-2xl font-bold text-orange-700">
              {orders.length}
            </h3>
          </div>

          <div className="bg-white border-2 border-green-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">
              Accepted
            </p>

            <h3 className="text-2xl font-bold text-green-600">
              {
                orders.filter(
                  (o) =>
                    o.status ===
                    "accepted"
                ).length
              }
            </h3>
          </div>

          <div className="bg-white border-2 border-yellow-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">
              In Progress
            </p>

            <h3 className="text-2xl font-bold text-yellow-600">
              {
                orders.filter(
                  (o) =>
                    o.status ===
                    "in_progress"
                ).length
              }
            </h3>
          </div>

          <div className="bg-white border-2 border-blue-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">
              Completed
            </p>

            <h3 className="text-2xl font-bold text-blue-600">
              {
                orders.filter(
                  (o) =>
                    o.status ===
                    "completed"
                ).length
              }
            </h3>
          </div>

        </div>

        {loading ? (
          <div className="bg-white border-2 border-orange-200 p-10 text-center">
            Loading Orders...
          </div>
        ) : orders.length ===
          0 ? (
          <div className="bg-white border-2 border-orange-200 p-10 text-center">

            <FaShoppingBag
              size={50}
              className="mx-auto text-orange-500"
            />

            <h3 className="font-bold text-xl mt-3">
              No Orders Found
            </h3>

          </div>
        ) : (
          <div className="space-y-4">

            {orders.map(
              (order) => {
                const imageUrl =
                  order.product
                    ?.images?.[0]
                    ? `${API}/${order.product.images[0].replace(
                        /\\/g,
                        "/"
                      )}`
                    : "https://via.placeholder.com/300";

                return (
                                      <div
                    key={order._id}
                    className="bg-white border-2 border-orange-200 shadow-sm overflow-hidden"
                  >

                    <div className="p-4">

                      {/* TOP */}

                      <div className="flex flex-col md:flex-row gap-4">

                        {/* IMAGE */}

                        <div className="w-full md:w-32 h-32 bg-orange-50 border border-orange-100 overflow-hidden">

                          <img
                            src={imageUrl}
                            alt={
                              order.product?.name
                            }
                            className="w-full h-full object-cover"
                          />

                        </div>

                        {/* DETAILS */}

                        <div className="flex-1">

                          <div className="flex justify-between items-start gap-3">

                            <div>

                              <h3 className="font-bold text-lg text-gray-800">
                                {
                                  order
                                    .product
                                    ?.name
                                }
                              </h3>

                              <p className="text-sm text-gray-500">
                                Order ID:
                                {" "}
                                {order._id.slice(
                                  -8
                                )}
                              </p>

                            </div>

                            <span
                              className={`px-3 py-1 text-xs font-semibold ${getStatusColor(
                                order.status
                              )}`}
                            >
                              {
                                order.status
                              }
                            </span>

                          </div>

                          {/* CUSTOMER */}

                          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">

                            <div className="flex items-center gap-2 text-sm">
                              <FaUser className="text-orange-500" />
                              <span>
                                {
                                  order
                                    .user
                                    ?.name
                                }
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <FaPhone className="text-orange-500" />
                              <span>
                                {
                                  order
                                    .user
                                    ?.mobile
                                }
                              </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm">
                              <FaEnvelope className="text-orange-500" />
                              <span className="truncate">
                                {
                                  order
                                    .user
                                    ?.email
                                }
                              </span>
                            </div>

                          </div>

                          {/* PRICE DETAILS */}

                          <div className="mt-4 grid grid-cols-2 md:grid-cols-5 gap-3">

                            <div>
                              <p className="text-xs text-gray-500">
                                Quantity
                              </p>

                              <p className="font-semibold">
                                {
                                  order.quantity
                                }
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500">
                                Price
                              </p>

                              <p className="font-semibold">
                                ₹
                                {
                                  order.price
                                }
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500">
                                Payment
                              </p>

                              <p className="font-semibold capitalize">
                                {
                                  order
                                    .payment
                                    ?.method
                                }
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500">
                                Payment Status
                              </p>

                              <p className="font-semibold capitalize">
                                {
                                  order
                                    .payment
                                    ?.status
                                }
                              </p>
                            </div>

                            <div>
                              <p className="text-xs text-gray-500">
                                Total
                              </p>

                              <p className="font-bold text-green-600 flex items-center">
                                <FaRupeeSign />
                                {
                                  order.totalAmount
                                }
                              </p>
                            </div>

                          </div>

                          {/* DATE */}

                          <div className="mt-4 border-t border-orange-100 pt-3">

                            <p className="text-xs text-gray-500">
                              Ordered on{" "}
                              {new Date(
                                order.createdAt
                              ).toLocaleDateString()}
                            </p>

                          </div>

                          {/* ACTIONS */}

                          {order.status !==
                            "completed" &&
                            order.status !==
                              "rejected" && (
                              <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-2">

                                {order.status ===
                                  "pending" && (
                                  <>
                                    <button
                                      disabled={
                                        updating ===
                                        order._id
                                      }
                                      onClick={() =>
                                        updateStatus(
                                          order._id,
                                          "accepted"
                                        )
                                      }
                                      className="bg-green-500 hover:bg-green-600 text-white py-2 text-sm flex items-center justify-center gap-2"
                                    >
                                      <FaCheck />
                                      Accept
                                    </button>

                                    <button
                                      disabled={
                                        updating ===
                                        order._id
                                      }
                                      onClick={() =>
                                        updateStatus(
                                          order._id,
                                          "rejected"
                                        )
                                      }
                                      className="bg-red-500 hover:bg-red-600 text-white py-2 text-sm flex items-center justify-center gap-2"
                                    >
                                      <FaTimes />
                                      Reject
                                    </button>
                                  </>
                                )}

                                {order.status ===
                                  "accepted" && (
                                  <button
                                    disabled={
                                      updating ===
                                      order._id
                                    }
                                    onClick={() =>
                                      updateStatus(
                                        order._id,
                                        "in_progress"
                                      )
                                    }
                                    className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 text-sm flex items-center justify-center gap-2"
                                  >
                                    <FaSpinner />
                                    Start Work
                                  </button>
                                )}

                                {order.status ===
                                  "in_progress" && (
                                  <button
                                    disabled={
                                      updating ===
                                      order._id
                                    }
                                    onClick={() =>
                                      updateStatus(
                                        order._id,
                                        "completed"
                                      )
                                    }
                                    className="bg-blue-500 hover:bg-blue-600 text-white py-2 text-sm flex items-center justify-center gap-2"
                                  >
                                    <FaCheckCircle />
                                    Complete
                                  </button>
                                )}

                              </div>
                            )}

                        </div>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default SellerOrders;