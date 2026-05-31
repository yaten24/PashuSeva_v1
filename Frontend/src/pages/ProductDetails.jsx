import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";

import {
  FaArrowLeft,
  FaHeart,
  FaStore,
  FaMinus,
  FaPlus,
  FaShoppingCart,
  FaPhone,
  FaMapMarkerAlt,
  FaTag,
  FaBoxOpen,
  FaStar,
} from "react-icons/fa";

import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams();

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://api.apnapashu.com";

  const [product, setProduct] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [quantity, setQuantity] =
    useState(1);

  const [showBuyModal, setShowBuyModal] =
    useState(false);

  const [buyLoading, setBuyLoading] =
    useState(false);

  const [favoriteLoading, setFavoriteLoading] =
    useState(false);

  const [isFavorite, setIsFavorite] =
    useState(false);

  const [addresses, setAddresses] =
    useState([]);

  const [
    selectedAddress,
    setSelectedAddress,
  ] = useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("cash");

  // =========================
  // CALCULATIONS
  // =========================

  const basePrice =
    quantity *
    Number(product?.price || 0);

  const gst = Number(
    (basePrice * 0.18).toFixed(2)
  );

  const platformFee = 10;

  const delivery = 50;

  const total =
    basePrice +
    gst +
    platformFee +
    delivery;

  const transactionId =
    paymentMethod === "online"
      ? `TXN-${Date.now()}`
      : `COD-${Date.now()}`;

  // =========================
  // FETCH PRODUCT
  // =========================

  const fetchProduct =
    async () => {
      try {
        setLoading(true);

        const { data } =
          await axios.get(
            `${API_URL}/api/product/get-product/${id}`
          );

        if (data.success) {
          setProduct(
            data.product
          );
        }
      } catch (error) {
        console.log(
          "PRODUCT ERROR",
          error
        );
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // FETCH ADDRESS
  // =========================

  const fetchAddresses =
    async () => {
      try {
        const { data } =
          await axios.get(
            `${API_URL}/api/user/address/get`,
            {
              withCredentials: true,
            }
          );

        if (data.success) {
          setAddresses(
            data.addresses || []
          );

          if (
            data.addresses?.length
          ) {
            setSelectedAddress(
              data.addresses[0]._id
            );
          }
        }
      } catch (error) {
        console.log(
          "ADDRESS ERROR",
          error
        );
      }
    };

  // =========================
  // CHECK FAVORITE
  // =========================

  const checkFavorite =
    async () => {
      try {
        const { data } =
          await axios.get(
            `${API_URL}/api/product/check/${id}`,
            {
              withCredentials: true,
            }
          );

        if (data.success) {
          setIsFavorite(
            data.isFavorite
          );
        }
      } catch (error) {
        console.log(error);
      }
    };

  // =========================
  // TOGGLE FAVORITE
  // =========================

  const toggleFavorite =
    async () => {
      try {
        setFavoriteLoading(true);

        const { data } =
          await axios.post(
            `${API_URL}/api/product/toggle/${product._id}`,
            {},
            {
              withCredentials: true,
            }
          );

        if (data.success) {
          setIsFavorite(
            data.isFavorite
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setFavoriteLoading(false);
      }
    };

  // =========================
  // IMAGE
  // =========================

  const getImage = () => {
    if (
      product?.images?.length
    ) {
      const imagePath =
        product.images[0]
          .replace(
            /\\/g,
            "/"
          )
          .replace(
            /^\/+/,
            ""
          );

      return `${API_URL}/${imagePath}`;
    }

    return "https://via.placeholder.com/800x600?text=No+Image";
  };

  // =========================
  // QUANTITY
  // =========================

  const increaseQty = () => {
    if (
      quantity <
      Number(
        product?.stock || 1
      )
    ) {
      setQuantity(
        (prev) => prev + 1
      );
    }
  };

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(
        (prev) => prev - 1
      );
    }
  };

  useEffect(() => {
    fetchProduct();
    fetchAddresses();
    checkFavorite();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex justify-center items-center">
        <div className="text-xl font-bold">
          Loading Product...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Product Not Found
      </div>
    );
  }
    return (
    <div className="min-h-screen bg-orange-50 pb-24">

      {/* HEADER */}

      <div className="max-w-7xl mx-auto px-4 pt-5">

        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-gray-700 font-semibold hover:text-orange-600"
        >
          <FaArrowLeft />
          Back To Marketplace
        </Link>

      </div>

      {/* PRODUCT SECTION */}

      <div className="max-w-7xl mx-auto px-4 py-6">

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="bg-white border border-orange-200 shadow-sm overflow-hidden"
        >

          <div className="grid lg:grid-cols-2">

            {/* IMAGE SECTION */}

            <div className="relative bg-white">

              <img
                src={getImage()}
                alt={product.name}
                className="w-full h-[350px] md:h-[600px] object-cover"
              />

              <div className="absolute top-4 left-4 bg-orange-500 text-white px-4 py-2 text-xs font-bold">
                {product.category}
              </div>

              {Number(product.stock) <= 0 && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 text-xs font-bold">
                  OUT OF STOCK
                </div>
              )}

            </div>

            {/* DETAILS */}

            <div className="p-5 md:p-8">

              <div className="flex justify-between items-start gap-4">

                <div>

                  <h1 className="text-3xl md:text-5xl font-black text-gray-900">
                    {product.name}
                  </h1>

                  <div className="flex items-center gap-2 mt-3 text-gray-500">

                    <FaStore />

                    <span>
                      Seller :
                      {" "}
                      {product?.seller?.name}
                    </span>

                  </div>

                </div>

                <button
                  onClick={toggleFavorite}
                  disabled={favoriteLoading}
                  className={`w-12 h-12 border flex items-center justify-center transition-all ${
                    isFavorite
                      ? "bg-red-500 text-white border-red-500"
                      : "bg-white border-orange-300 text-gray-500 hover:text-orange-500 hover:border-orange-500"
                  }`}
                >
                  <FaHeart />
                </button>

              </div>

              {/* PRICE */}

              <div className="mt-6">

                <div className="text-5xl font-black text-orange-600">
                  ₹{product.price}
                </div>

                <p className="text-sm text-gray-500 mt-2">
                  Inclusive of taxes
                </p>

              </div>

              {/* INFO CARDS */}

              <div className="grid grid-cols-2 gap-3 mt-8">

                <Info
                  icon={<FaTag />}
                  label="Category"
                  value={product.category}
                />

                <Info
                  icon={<FaBoxOpen />}
                  label="Stock"
                  value={product.stock}
                />

                <Info
                  icon={<FaStar />}
                  label="Rating"
                  value={`${product.rating || 0}/5`}
                />

                <Info
                  icon={<FaMapMarkerAlt />}
                  label="Location"
                  value={
                    product?.location
                      ?.city || "India"
                  }
                />

              </div>

              {/* QUANTITY */}

              <div className="mt-8">

                <h3 className="font-bold text-lg mb-3">
                  Select Quantity
                </h3>

                <div className="flex items-center gap-3">

                  <button
                    onClick={decreaseQty}
                    className="w-12 h-12 border border-orange-300 flex items-center justify-center hover:bg-orange-50"
                  >
                    <FaMinus />
                  </button>

                  <div className="w-16 h-12 border border-orange-300 flex items-center justify-center text-lg font-bold">
                    {quantity}
                  </div>

                  <button
                    onClick={increaseQty}
                    className="w-12 h-12 border border-orange-300 flex items-center justify-center hover:bg-orange-50"
                  >
                    <FaPlus />
                  </button>

                </div>

              </div>

              {/* PRICE BREAKDOWN */}

              <div className="mt-8 border border-green-200 bg-green-50 p-4">

                <div className="flex justify-between mb-2">
                  <span>Price</span>
                  <span>₹{basePrice}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>GST</span>
                  <span>₹{gst}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Delivery</span>
                  <span>₹{delivery}</span>
                </div>

                <div className="border-t border-green-300 pt-3 flex justify-between">

                  <span className="font-bold">
                    Total
                  </span>

                  <span className="text-2xl font-black text-green-600">
                    ₹{total}
                  </span>

                </div>

              </div>

              {/* DESCRIPTION */}

              <div className="mt-8">

                <h3 className="font-bold text-xl mb-3">
                  Product Description
                </h3>

                <p className="text-gray-600 leading-7">
                  {product.description}
                </p>

              </div>

              {/* SELLER */}

              <div className="mt-8 border border-orange-200 bg-orange-50 p-5">

                <div className="flex justify-between items-center">

                  <div>

                    <h3 className="font-bold text-lg">
                      Seller Information
                    </h3>

                    <p className="text-gray-600 mt-1">
                      {product?.seller?.name}
                    </p>

                  </div>

                  <a
                    href={`tel:${product?.seller?.mobile}`}
                    className="bg-gray-900 text-white px-5 py-3 flex items-center gap-2 font-semibold"
                  >
                    <FaPhone />
                    Call Seller
                  </a>

                </div>

              </div>

            </div>

          </div>

        </motion.div>

      </div>
            {/* BUY MODAL */}

      {showBuyModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-center items-end md:items-center p-4">

          <motion.div
            initial={{
              opacity: 0,
              y: 20,
              scale: 0.95,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            className="bg-white w-full max-w-lg border border-orange-200 shadow-2xl"
          >

            <div className="p-5">

              <div className="flex justify-between items-center mb-5">

                <h3 className="text-2xl font-bold">
                  Confirm Order
                </h3>

                <button
                  onClick={() =>
                    setShowBuyModal(false)
                  }
                  className="text-2xl text-gray-500"
                >
                  ×
                </button>

              </div>

              {/* ADDRESS */}

              <div>

                <label className="font-semibold">
                  Delivery Address
                </label>

                <select
                  value={selectedAddress}
                  onChange={(e) =>
                    setSelectedAddress(
                      e.target.value
                    )
                  }
                  className="w-full mt-2 border border-orange-300 px-3 py-3 outline-none"
                >
                  {addresses.map(
                    (address) => (
                      <option
                        key={address._id}
                        value={address._id}
                      >
                        {address.fullName}
                        {" - "}
                        {address.city}
                      </option>
                    )
                  )}
                </select>

              </div>

              {/* PAYMENT */}

              <div className="mt-5">

                <label className="font-semibold">
                  Payment Method
                </label>

                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(
                      e.target.value
                    )
                  }
                  className="w-full mt-2 border border-orange-300 px-3 py-3 outline-none"
                >
                  <option value="cash">
                    Cash On Delivery
                  </option>

                  <option value="online">
                    Online Payment
                  </option>
                </select>

              </div>

              {/* SUMMARY */}

              <div className="mt-5 border border-orange-200 bg-orange-50 p-4">

                <div className="flex justify-between mb-2">
                  <span>Product</span>
                  <span>{product.name}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Quantity</span>
                  <span>{quantity}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Price</span>
                  <span>₹{basePrice}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>GST</span>
                  <span>₹{gst}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Platform Fee</span>
                  <span>₹{platformFee}</span>
                </div>

                <div className="flex justify-between mb-2">
                  <span>Delivery Fee</span>
                  <span>₹{delivery}</span>
                </div>

                <div className="border-t pt-3 flex justify-between text-xl font-bold text-green-600">

                  <span>Total</span>

                  <span>
                    ₹{total}
                  </span>

                </div>

              </div>

              {/* PLACE ORDER */}

              <button
                disabled={
                  buyLoading ||
                  !selectedAddress
                }
                onClick={async () => {
                  try {

                    if (
                      !selectedAddress
                    ) {
                      alert(
                        "Please select address"
                      );
                      return;
                    }

                    setBuyLoading(true);

                    const {
                      data,
                    } =
                      await axios.post(
                        `${API_URL}/api/order/buy-product`,
                        {
                          productId:
                            product._id,

                          quantity,

                          addressId:
                            selectedAddress,

                          paymentMethod,

                          price:
                            basePrice,

                          gst,

                          platformFee,

                          delivery,

                          total,

                          transactionId,
                        },
                        {
                          withCredentials: true,
                        }
                      );

                    if (
                      data.success
                    ) {
                      alert(
                        "Order placed successfully"
                      );

                      setShowBuyModal(
                        false
                      );

                      fetchProduct();
                    }

                  } catch (error) {

                    console.log(
                      error
                    );

                    alert(
                      error
                        ?.response
                        ?.data
                        ?.message ||
                        "Failed to place order"
                    );

                  } finally {

                    setBuyLoading(
                      false
                    );

                  }
                }}
                className="w-full mt-5 bg-orange-500 hover:bg-orange-600 text-white py-3 font-bold disabled:opacity-50"
              >
                {buyLoading
                  ? "Processing..."
                  : "Place Order"}
              </button>

            </div>

          </motion.div>

        </div>
      )}

      {/* FIXED ACTION BAR */}

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-orange-200 shadow-lg z-40">

        <div className="max-w-7xl mx-auto p-3">

          <div className="grid grid-cols-2 gap-3">

            <button
              disabled={
                Number(
                  product.stock
                ) <= 0
              }
              onClick={() =>
                setShowBuyModal(true)
              }
              className="bg-orange-500 hover:bg-orange-600 disabled:bg-gray-400 text-white py-3 font-bold flex items-center justify-center gap-2"
            >
              <FaShoppingCart />

              {Number(
                product.stock
              ) <= 0
                ? "Out Of Stock"
                : `Buy ₹${total}`}
            </button>

            <a
              href={`tel:${product?.seller?.mobile}`}
              className="bg-gray-900 text-white py-3 font-bold flex items-center justify-center gap-2"
            >
              <FaPhone />
              Call Seller
            </a>

          </div>

        </div>

      </div>

    </div>
  );
}

/* INFO CARD */

function Info({
  icon,
  label,
  value,
}) {
  return (
    <div className="border border-orange-200 bg-orange-50 p-3">

      <div className="flex items-center gap-2 text-xs text-gray-500">

        <span className="text-orange-500">
          {icon}
        </span>

        {label}

      </div>

      <div className="font-bold text-sm text-gray-900 mt-1 truncate">
        {value}
      </div>

    </div>
  );
}