import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  FaSearch,
  FaTimes,
  FaMoneyBillWave,
  FaCreditCard,
  FaBolt,
  FaUsers,
  FaRupeeSign,
  FaChartLine,
  FaTruck,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

export default function Marketplace() {
  const navigate = useNavigate();

  const API =
    import.meta.env.VITE_API_URL ||
    "https://api.apnapashu.com";

  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] =
    useState("");

  const [showBuyModal, setShowBuyModal] =
    useState(false);

  const [selectedProduct, setSelectedProduct] =
    useState(null);

  const [paymentMethod, setPaymentMethod] =
    useState("cod");

  const [placingOrder, setPlacingOrder] =
    useState(false);

  useEffect(() => {
    fetchProducts();
    fetchAddresses();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/product/get-products`
      );

      if (data.success) {
        setProducts(data.products || []);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get(
        `${API}/api/user/address/get`,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        setAddresses(data.addresses || []);

        if (data.addresses?.length > 0) {
          setSelectedAddress(
            data.addresses[0]._id
          );
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const filtered = useMemo(() => {
    return products.filter((item) =>
      item.name
        .toLowerCase()
        .includes(q.toLowerCase())
    );
  }, [q, products]);

  const getImage = (item) => {
    let imagePath = "";

    if (item?.images?.length > 0) {
      imagePath = item.images[0];
    } else if (item?.image) {
      imagePath = item.image;
    }

    if (!imagePath) {
      return "https://via.placeholder.com/300x300?text=No+Image";
    }

    imagePath = imagePath
      .replaceAll("\\", "/")
      .trim();

    if (!imagePath.startsWith("uploads")) {
      imagePath = `uploads/${imagePath}`;
    }

    return `${API}/${imagePath}`;
  };

  const handleBuyClick = (product) => {
    setSelectedProduct(product);
    setPaymentMethod("cod");
    setShowBuyModal(true);

    if (
      addresses.length > 0 &&
      !selectedAddress
    ) {
      setSelectedAddress(
        addresses[0]._id
      );
    }
  };

  const handlePlaceOrder = async () => {
    const price = Number(
      selectedProduct.price
    );

    const gst = Math.round(
      price * 0.05
    );

    const platformFee = 10;
    const delivery = 40;

    const total =
      price +
      gst +
      platformFee +
      delivery;

    if (!selectedAddress) {
      return alert(
        "Please select delivery address"
      );
    }

    if (paymentMethod === "online") {
      navigate("/online", {
        state: {
          product: selectedProduct,
          amount: total,
          addressId: selectedAddress,
        },
      });
      return;
    }

    try {
      setPlacingOrder(true);

      await axios.post(
        `${API}/api/order/buy-product`,
        {
          productId:
            selectedProduct._id,

          addressId:
            selectedAddress,

          paymentMethod: "cash",

          price,
          gst,
          platformFee,
          delivery,
          total,
        },
        {
          withCredentials: true,
        }
      );

      alert(
        "Order Placed Successfully"
      );

      setShowBuyModal(false);
    } catch (error) {
      alert("Order Failed");
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      {/* TOP BAR */}
      <div className="sticky top-0 z-40 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 shadow-md border-b border-orange-400">
        <div className="px-2 md:px-4 py-2.5">
          <div className="flex items-center gap-2 md:gap-3">
            <Link
              to="/"
              className="shrink-0 leading-none"
            >
              <h2 className="text-white font-black text-sm md:text-2xl tracking-tight">
                Apna
                <span className="text-yellow-100">
                  Pashu
                </span>
              </h2>

              <p className="hidden md:block text-[10px] text-orange-100 font-medium -mt-0.5">
                Farmer Marketplace
              </p>
            </Link>

            <div className="flex-1">
              <div className="h-10 md:h-11 bg-white border border-orange-200 shadow-sm flex items-center px-3">
                <FaSearch className="text-gray-400 text-xs md:text-sm" />

                <input
                  value={q}
                  onChange={(e) =>
                    setQ(
                      e.target.value
                    )
                  }
                  placeholder="Search products..."
                  className="w-full px-2 text-xs md:text-sm outline-none"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* HERO */}
      <div className="px-2 md:px-4 py-3">
        <div className="bg-gradient-to-r from-orange-50 via-amber-50 to-white border border-orange-300 shadow-sm p-3 md:p-5">
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div>
              <p className="text-[10px] md:text-xs font-bold text-orange-600 uppercase tracking-widest">
                Grow Your Business
              </p>

              <h2 className="text-lg md:text-3xl font-black text-gray-900 mt-1">
                Become Seller on
                ApnaPashu
              </h2>

              <p className="text-xs md:text-sm text-gray-600 mt-2">
                Sell feed, bhusa,
                chara & farm products
                to thousands of buyers.
              </p>

              <div className="grid grid-cols-2 gap-2 mt-4 text-[11px]">
                <div className="bg-white border border-orange-200 p-2 flex gap-2 items-center">
                  <FaUsers className="text-orange-500" />
                  Daily Buyers
                </div>

                <div className="bg-white border border-orange-200 p-2 flex gap-2 items-center">
                  <FaChartLine className="text-orange-500" />
                  More Sales
                </div>

                <div className="bg-white border border-orange-200 p-2 flex gap-2 items-center">
                  <FaTruck className="text-orange-500" />
                  Wider Reach
                </div>

                <div className="bg-white border border-orange-200 p-2 flex gap-2 items-center">
                  <FaRupeeSign className="text-orange-500" />
                  Better Profit
                </div>
              </div>

              <a
                href="https://seller.apnapashu.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex mt-4 bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 text-sm font-bold"
              >
                Join as Seller
              </a>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-3">
              <div className="bg-white border border-orange-200 p-3">
                <p className="text-xs text-gray-500">
                  Growth
                </p>
                <h3 className="text-2xl font-black text-orange-500">
                  +120%
                </h3>
              </div>

              <div className="bg-white border border-orange-200 p-3">
                <p className="text-xs text-gray-500">
                  Customers
                </p>
                <h3 className="text-2xl font-black text-orange-500">
                  10K+
                </h3>
              </div>

              <div className="bg-white border border-orange-200 p-3">
                <p className="text-xs text-gray-500">
                  Orders
                </p>
                <h3 className="text-2xl font-black text-orange-500">
                  50K+
                </h3>
              </div>

              <div className="bg-white border border-orange-200 p-3">
                <p className="text-xs text-gray-500">
                  Setup
                </p>
                <h3 className="text-2xl font-black text-orange-500">
                  0 Cost
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="px-2 md:px-4 pb-4">
        {loading ? (
          <div className="text-center py-10">
            Loading...
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-[6px]">
            {filtered.map((p) => (
              <motion.div
                key={p._id}
                whileHover={{
                  y: -2,
                }}
                className="bg-white border border-gray-200 overflow-hidden"
              >
                <Link
                  to={`/product/${p._id}`}
                >
                  <img
                    src={getImage(p)}
                    alt={p.name}
                    className="w-full h-24 md:h-28 object-cover"
                  />
                </Link>

                <div className="p-1.5">
                  <h3 className="text-[11px] font-semibold line-clamp-2 min-h-[28px]">
                    {p.name}
                  </h3>

                  <p className="text-[10px] text-gray-500 mt-1">
                    {p.category}
                  </p>

                  <p className="text-sm font-black text-orange-500 mt-1">
                    ₹{p.price}
                  </p>

                  <div className="grid grid-cols-2 gap-1 mt-2">
                    <Link
                      to={`/product/${p._id}`}
                      className="text-[10px] bg-gray-100 py-1.5 text-center font-semibold"
                    >
                      View
                    </Link>

                    <button
                      onClick={() =>
                        handleBuyClick(
                          p
                        )
                      }
                      className="text-[10px] bg-orange-500 text-white py-1.5 flex justify-center items-center gap-1 font-semibold"
                    >
                      <FaBolt size={9} />
                      Buy
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* BUY MODAL */}
      <AnimatePresence>
        {showBuyModal &&
          selectedProduct && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/60 flex justify-center items-end md:items-center px-2"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
            >
              <motion.div
                initial={{
                  opacity: 0,
                  y: 80,
                  scale: 0.92,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  y: 80,
                }}
                className="bg-white w-full md:max-w-md border border-orange-200 shadow-2xl"
              >
                {/* HEADER */}
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 px-4 py-3 flex justify-between items-center">
                  <div>
                    <h2 className="text-white font-black text-lg">
                      Buy Product
                    </h2>

                    <p className="text-orange-100 text-[11px]">
                      Fast Checkout
                    </p>
                  </div>

                  <button
                    onClick={() =>
                      setShowBuyModal(
                        false
                      )
                    }
                    className="text-white"
                  >
                    <FaTimes />
                  </button>
                </div>

                <div className="p-4">
                  <div className="bg-orange-50 border border-orange-100 p-3">
                    <p className="text-[11px] text-orange-600 font-bold uppercase">
                      Product
                    </p>

                    <h3 className="font-bold text-sm mt-1">
                      {
                        selectedProduct.name
                      }
                    </h3>
                  </div>

                  {(() => {
                    const price =
                      Number(
                        selectedProduct.price
                      );

                    const gst =
                      Math.round(
                        price *
                          0.05
                      );

                    const platformFee = 10;
                    const delivery = 40;

                    const total =
                      price +
                      gst +
                      platformFee +
                      delivery;

                    return (
                      <>
                        {/* PRICE */}
                        <div className="mt-4 border">
                          <div className="px-3 py-2 bg-gray-50 border-b font-bold text-sm">
                            Price
                            Details
                          </div>

                          <div className="p-3 text-sm space-y-2">
                            <Row
                              label="Price"
                              value={`₹${price}`}
                            />

                            <Row
                              label="GST"
                              value={`₹${gst}`}
                            />

                            <Row
                              label="Platform Fee"
                              value={`₹${platformFee}`}
                            />

                            <Row
                              label="Delivery"
                              value={`₹${delivery}`}
                            />

                            <div className="border-t pt-2">
                              <Row
                                label="Total"
                                value={`₹${total}`}
                                bold
                              />
                            </div>
                          </div>
                        </div>

                        {/* ADDRESS */}
                        <div className="mt-4">
                          <p className="font-bold text-sm mb-2">
                            Delivery
                            Address
                          </p>

                          <div className="relative">
                            <FaMapMarkerAlt className="absolute top-4 left-3 text-orange-500 text-sm" />

                            <select
                              value={
                                selectedAddress
                              }
                              onChange={(
                                e
                              ) =>
                                setSelectedAddress(
                                  e
                                    .target
                                    .value
                                )
                              }
                              className="w-full border border-gray-300 py-3 pl-10 pr-3 text-sm outline-none focus:border-orange-500"
                            >
                              {addresses.length ===
                                0 && (
                                <option value="">
                                  No
                                  Address
                                  Found
                                </option>
                              )}

                              {addresses.map(
                                (
                                  item
                                ) => (
                                  <option
                                    key={
                                      item._id
                                    }
                                    value={
                                      item._id
                                    }
                                  >
                                    {
                                      item.fullName
                                    }{" "}
                                    -{" "}
                                    {
                                      item.city
                                    }
                                    ,{" "}
                                    {
                                      item.state
                                    }
                                  </option>
                                )
                              )}
                            </select>
                          </div>
                        </div>

                        {/* PAYMENT */}
                        <div className="mt-4">
                          <p className="font-bold text-sm mb-2">
                            Payment
                            Method
                          </p>

                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() =>
                                setPaymentMethod(
                                  "cod"
                                )
                              }
                              className={`border py-3 text-sm font-semibold flex justify-center items-center gap-2 ${
                                paymentMethod ===
                                "cod"
                                  ? "border-orange-500 bg-orange-50 text-orange-600"
                                  : ""
                              }`}
                            >
                              <FaMoneyBillWave />
                              COD
                            </button>

                            <button
                              onClick={() =>
                                setPaymentMethod(
                                  "online"
                                )
                              }
                              className={`border py-3 text-sm font-semibold flex justify-center items-center gap-2 ${
                                paymentMethod ===
                                "online"
                                  ? "border-orange-500 bg-orange-50 text-orange-600"
                                  : ""
                              }`}
                            >
                              <FaCreditCard />
                              Online
                            </button>
                          </div>
                        </div>

                        {/* BUTTON */}
                        <button
                          onClick={
                            handlePlaceOrder
                          }
                          disabled={
                            placingOrder
                          }
                          className="w-full mt-5 bg-gradient-to-r from-orange-500 to-amber-500 text-white py-3 font-black"
                        >
                          {placingOrder
                            ? "Processing..."
                            : "Confirm Order"}
                        </button>
                      </>
                    );
                  })()}
                </div>
              </motion.div>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}

function Row({
  label,
  value,
  bold,
}) {
  return (
    <div className="flex justify-between text-sm">
      <span
        className={
          bold
            ? "font-bold"
            : "text-gray-600"
        }
      >
        {label}
      </span>

      <span
        className={
          bold
            ? "font-black text-orange-500"
            : "font-semibold"
        }
      >
        {value}
      </span>
    </div>
  );
}