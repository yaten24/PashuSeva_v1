import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

import {
  FaSearch,
  FaShoppingCart,
  FaStar,
  FaArrowRight,
  FaUserMd,
} from "react-icons/fa";

import {
  motion,
  AnimatePresence,
} from "framer-motion";

const heroSlides = [
  "https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=1600",
  "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=1600",
  "https://images.unsplash.com/photo-1507146426996-ef05306b995a?w=1600",
];

export default function LoginHomePage() {
  const navigate =
    useNavigate();

  const API =
    "https://api.apnapashu.com";

  const [slide, setSlide] =
    useState(0);

  const [keyword, setKeyword] =
    useState("");

  const [type, setType] =
    useState("all");

  const [loading, setLoading] =
    useState(true);

  const [products, setProducts] =
    useState([]);

  const [doctors, setDoctors] =
    useState([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSlide(
        (prev) =>
          (prev + 1) %
          heroSlides.length
      );
    }, 3500);

    return () =>
      clearInterval(timer);
  }, []);

  useEffect(() => {
    const fetchHomeData =
      async () => {
        try {
          setLoading(true);

          const [
            productRes,
            doctorRes,
          ] =
            await Promise.all([
              axios.get(
                `${API}/api/product/home-products`
              ),

              axios.get(
                `${API}/api/doctor/home-doctors`
              ),
            ]);

          if (
            productRes.data.success
          ) {
            setProducts(
              productRes.data
                .products || []
            );
          }

          if (
            doctorRes.data.success
          ) {
            setDoctors(
              doctorRes.data
                .doctors || []
            );
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchHomeData();
  }, []);

  const handleSearch = () => {
    const query =
      new URLSearchParams();

    if (
      keyword.trim()
    ) {
      query.append(
        "q",
        keyword
      );
    }

    if (type) {
      query.append(
        "type",
        type
      );
    }

    navigate(
      `/search?${query.toString()}`
    );
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen text-gray-900 overflow-hidden">

      {/* HERO */}

      <section className="relative h-[55vh] md:h-[75vh]">

        <AnimatePresence mode="wait">

          <motion.img
            key={slide}
            src={
              heroSlides[slide]
            }
            initial={{
              opacity: 0,
              scale: 1.08,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
            }}
            transition={{
              duration: 1,
            }}
            className="absolute inset-0 w-full h-full object-cover"
          />

        </AnimatePresence>

        <div className="absolute inset-0 bg-black/55" />

        <div className="relative z-10 h-full flex flex-col justify-center px-4 md:px-16">

          <motion.h1
            initial={{
              y: 40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            className="text-white text-2xl md:text-5xl font-bold max-w-3xl leading-tight"
          >
            India’s Trusted Animal Care Platform
          </motion.h1>

          <p className="text-gray-200 mt-2 text-sm md:text-lg max-w-xl">
            Buy products &
            consult top veterinary
            doctors instantly.
          </p>

          {/* SEARCH */}

          <motion.div
            initial={{
              y: 30,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              delay: 0.3,
            }}
            className="mt-5 bg-white shadow-xl max-w-3xl border border-gray-200 overflow-hidden"
          >

            <div className="flex flex-col md:flex-row items-stretch">

              <div className="hidden md:flex items-center px-4 text-gray-400 border-r border-gray-200">
                <FaSearch className="text-sm" />
              </div>

              <select
                value={type}
                onChange={(e) =>
                  setType(
                    e.target.value
                  )
                }
                className="px-4 py-3 md:py-4 text-sm font-medium bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200 outline-none"
              >
                <option value="all">
                  All
                </option>

                <option value="products">
                  Products
                </option>

                <option value="doctors">
                  Doctors
                </option>

                <option value="medicines">
                  Medicines
                </option>

                <option value="services">
                  Services
                </option>

              </select>

              <input
                type="text"
                value={keyword}
                onChange={(e) =>
                  setKeyword(
                    e.target.value
                  )
                }
                onKeyDown={
                  handleEnter
                }
                placeholder="Search products, doctors..."
                className="flex-1 px-4 py-3 md:py-4 text-sm outline-none"
              />

              <button
                onClick={
                  handleSearch
                }
                className="bg-yellow-500 hover:bg-yellow-600 px-5 md:px-8 py-3 md:py-4 text-sm font-bold text-white transition"
              >
                Search
              </button>

            </div>

          </motion.div>

        </div>

      </section>

      {/* PRODUCTS */}

      <section className="px-3 md:px-12 py-8">

        <div className="flex justify-between items-center mb-4">

          <h2 className="text-lg md:text-3xl font-bold">
            Top Products
          </h2>

          <button
            onClick={() =>
              navigate(
                "/marketplace"
              )
            }
            className="text-sm flex items-center gap-2 text-yellow-600 font-semibold"
          >
            View All
            <FaArrowRight />
          </button>

        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

            {[1, 2, 3, 4].map(
              (item) => (
                <div
                  key={item}
                  className="bg-white h-60 animate-pulse"
                />
              )
            )}

          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">

            {products.map(
              (item) => {
                const imageUrl =
                  item.images
                    ?.length
                    ? `${API}/${item.images[0].replace(
                        /\\/g,
                        "/"
                      )}`
                    : "https://via.placeholder.com/400";

                return (
                  <motion.div
                    whileHover={{
                      y: -4,
                    }}
                    key={
                      item._id
                    }
                    className="bg-white shadow-sm border border-gray-200"
                  >

                    <img
                      src={
                        imageUrl
                      }
                      alt={
                        item.name
                      }
                      className="h-28 md:h-52 w-full object-cover"
                    />

                    <div className="p-2 md:p-4">

                      <h3 className="font-semibold text-sm md:text-lg line-clamp-1">
                        {
                          item.name
                        }
                      </h3>

                      <p className="text-yellow-600 font-bold text-sm md:text-base mt-1">
                        ₹
                        {
                          item.price
                        }
                      </p>

                      <button
                        onClick={() =>
                          navigate(
                            `/product/${item._id}`
                          )
                        }
                        className="mt-2 md:mt-3 w-full bg-yellow-500 py-2 text-xs md:text-sm font-semibold flex justify-center gap-2 items-center text-white"
                      >
                        <FaShoppingCart />
                        View
                      </button>

                    </div>

                  </motion.div>
                );
              }
            )}

          </div>
        )}
      </section>
            {/* DOCTORS */}

      {/* DOCTORS */}

<section className="px-4 md:px-12 py-10 bg-gradient-to-b from-white to-yellow-50">

  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-8">

    <div>

      <span className="text-yellow-600 font-semibold text-sm uppercase tracking-wider">
        Expert Veterinarians
      </span>

      <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mt-1">
        Trusted Animal Doctors
      </h2>

      <p className="text-gray-500 mt-2 text-sm md:text-base">
        Consult experienced and verified veterinary doctors for your animals.
      </p>

    </div>

    <button
      onClick={() =>
        navigate("/doctors")
      }
      className="bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-3 font-semibold flex items-center gap-2 transition-all shadow-md"
    >
      View All Doctors
      <FaArrowRight />
    </button>

  </div>

  {loading ? (

    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

      {[1, 2, 3].map((item) => (
        <div
          key={item}
          className="bg-white h-72 animate-pulse border border-yellow-100"
        />
      ))}

    </div>

  ) : (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {doctors.map((doc) => {

        const imageUrl =
          doc.profileImage
            ? `${API}/${doc.profileImage.replace(
                /\\/g,
                "/"
              )}`
            : null;

        return (
          <motion.div
            key={doc._id}
            whileHover={{
              y: -6,
            }}
            transition={{
              duration: 0.2,
            }}
            className="bg-white border border-yellow-200 shadow-sm hover:shadow-xl overflow-hidden"
          >
                        <div className="relative">

              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt={doc.name}
                  className="w-full h-56 object-cover"
                />
              ) : (
                <div className="h-56 bg-yellow-100 flex items-center justify-center">
                  <FaUserMd
                    size={60}
                    className="text-yellow-600"
                  />
                </div>
              )}

              <div className="absolute top-3 right-3 bg-green-500 text-white text-xs px-3 py-1 font-semibold shadow">
                Verified
              </div>

            </div>

            <div className="p-5">

              <h3 className="text-xl font-bold text-gray-800">
                {doc.name}
              </h3>

              <p className="text-sm text-yellow-600 font-medium mt-1">
                {doc.specialization ||
                  "Veterinary Doctor"}
              </p>

              <div className="mt-4 space-y-2">

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Experience
                  </span>

                  <span className="font-semibold text-gray-800">
                    {doc.experienceYears || 0}
                    {" "}
                    Years
                  </span>

                </div>

                <div className="flex justify-between text-sm">

                  <span className="text-gray-500">
                    Qualification
                  </span>

                  <span className="font-semibold text-gray-800">
                    {doc.qualification ||
                      "Veterinary"}
                  </span>

                </div>

              </div>

              <div className="flex items-center gap-1 text-yellow-500 mt-4">

                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />

                <span className="text-gray-500 text-xs ml-2">
                  Trusted Doctor
                </span>

              </div>

              <button
                onClick={() =>
                  navigate("/doctors")
                }
                className="mt-5 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 font-semibold flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <FaUserMd />
                View Doctor
                <FaArrowRight />
              </button>

            </div>

          </motion.div>
        );
      })}

    </div>

  )}

</section>

      {/* CTA SECTION */}

      <section className="px-3 md:px-12 pb-12">

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-6 md:p-10 text-center">

          <h2 className="text-2xl md:text-4xl font-bold text-white">
            Join PashuSeva Today
          </h2>

          <p className="text-yellow-100 mt-3 max-w-2xl mx-auto">
            Buy livestock products, consult
            veterinary doctors and grow your
            animal business on one trusted
            platform.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">

            <button
              onClick={() =>
                navigate(
                  "/register"
                )
              }
              className="bg-white text-yellow-700 px-6 py-3 font-semibold"
            >
              Get Started
            </button>

            <button
              onClick={() =>
                navigate(
                  "/marketplace"
                )
              }
              className="border border-white text-white px-6 py-3 font-semibold"
            >
              Explore Marketplace
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}