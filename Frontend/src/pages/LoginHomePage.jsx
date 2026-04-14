import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaStar,
  FaArrowRight,
  FaUserMd,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const heroSlides = [
  "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600",
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1600",
  "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1600",
];

const products = [
  {
    id: 1,
    name: "Premium Feed",
    price: "₹799",
    image:
      "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=600",
  },
  {
    id: 2,
    name: "Milk Booster",
    price: "₹499",
    image:
      "https://images.unsplash.com/photo-1589927986089-35812388d1f4?w=600",
  },
  {
    id: 3,
    name: "Vitamin Pack",
    price: "₹299",
    image:
      "https://images.unsplash.com/photo-1611078489935-0cb964de46d6?w=600",
  },
  {
    id: 4,
    name: "Organic Feed",
    price: "₹699",
    image:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=600",
  },
];

const doctors = [
  {
    id: 1,
    name: "Dr. Sharma",
    exp: "8+ Years",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=600",
  },
  {
    id: 2,
    name: "Dr. Khan",
    exp: "10+ Years",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600",
  },
  {
    id: 3,
    name: "Dr. Mehta",
    exp: "7+ Years",
    image:
      "https://images.unsplash.com/photo-1594824475317-8c0b5d0dcb31?w=600",
  },
];

export default function LoginHomePage() {
  const navigate = useNavigate();

  const [slide, setSlide] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [type, setType] = useState("all");

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((prev) => (prev + 1) % heroSlides.length);
    }, 3500);

    return () => clearInterval(timer);
  }, []);

  const handleSearch = () => {
    const query = new URLSearchParams();

    if (keyword.trim()) query.append("q", keyword);
    if (type) query.append("type", type);

    navigate(`/search?${query.toString()}`);
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 overflow-hidden">
      {/* HERO */}
      <section className="relative h-[55vh] md:h-[75vh]">
        <AnimatePresence mode="wait">
          <motion.img
            key={slide}
            src={heroSlides[slide]}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-16">
          <motion.h1
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-white text-2xl md:text-5xl font-bold max-w-3xl leading-tight"
          >
            India’s Trusted Animal Care Platform
          </motion.h1>

          <p className="text-gray-200 mt-2 text-sm md:text-lg max-w-xl">
            Buy products & consult top veterinary doctors instantly.
          </p>

          {/* SEARCH */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 bg-white shadow-xl max-w-3xl border border-gray-200 overflow-hidden"
          >
            <div className="flex flex-col md:flex-row items-stretch">
              {/* ICON */}
              <div className="hidden md:flex items-center px-4 text-gray-400 border-r border-gray-200">
                <FaSearch className="text-sm" />
              </div>

              {/* DROPDOWN */}
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="px-4 py-3 md:py-4 text-sm font-medium bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 outline-none"
              >
                <option value="all">All</option>
                <option value="products">Products</option>
                <option value="doctors">Doctors</option>
                <option value="medicines">Medicines</option>
                <option value="services">Services</option>
              </select>

              {/* INPUT */}
              <input
                type="text"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleEnter}
                placeholder="Search products, doctors..."
                className="flex-1 px-4 py-3 md:py-4 text-sm outline-none"
              />

              {/* BUTTON */}
              <button
                onClick={handleSearch}
                className="bg-yellow-500 hover:bg-yellow-600 px-5 md:px-8 py-3 md:py-4 text-sm font-bold text-white transition"
              >
                Search
              </button>
            </div>
          </motion.div>

          {/* DOTS */}
          <div className="flex gap-2 mt-4">
            {heroSlides.map((_, i) => (
              <div
                key={i}
                className={`h-1.5 w-6 ${
                  i === slide ? "bg-yellow-400" : "bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="px-3 md:px-12 py-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-3xl font-bold">Top Products</h2>

          <button className="text-sm flex items-center gap-2 text-yellow-600 font-semibold">
            View All <FaArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {products.map((item) => (
            <motion.div
              whileHover={{ y: -4 }}
              key={item.id}
              className="bg-white shadow-sm border border-gray-200"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-28 md:h-52 w-full object-cover"
              />

              <div className="p-2 md:p-4">
                <h3 className="font-semibold text-sm md:text-lg line-clamp-1">
                  {item.name}
                </h3>

                <p className="text-yellow-600 font-bold text-sm md:text-base mt-1">
                  {item.price}
                </p>

                <button className="mt-2 md:mt-3 w-full bg-yellow-500 py-2 text-xs md:text-sm font-semibold flex justify-center gap-2 items-center text-white">
                  <FaShoppingCart />
                  Buy
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* DOCTORS */}
      <section className="px-3 md:px-12 pb-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg md:text-3xl font-bold">Top Doctors</h2>

          <button className="text-sm flex items-center gap-2 text-yellow-600 font-semibold">
            View All <FaArrowRight />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-5">
          {doctors.map((doc) => (
            <motion.div
              whileHover={{ y: -3 }}
              key={doc.id}
              className="bg-white border border-gray-200 shadow-sm p-3 flex items-center gap-3"
            >
              <img
                src={doc.image}
                alt={doc.name}
                className="w-14 h-14 md:w-20 md:h-20 object-cover"
              />

              <div className="flex-1">
                <h3 className="font-semibold text-sm md:text-lg">
                  {doc.name}
                </h3>

                <p className="text-xs text-gray-500">{doc.exp}</p>

                <div className="flex gap-1 text-yellow-500 text-xs mt-1">
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                  <FaStar />
                </div>
              </div>

              <button className="bg-yellow-500 px-3 py-2 text-xs font-semibold flex items-center gap-2 text-white">
                <FaUserMd />
                Book
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}