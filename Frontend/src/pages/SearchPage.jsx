import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import {
  FaSearch,
  FaMapMarkerAlt,
  FaArrowRight,
} from "react-icons/fa";

import {
  motion,
} from "framer-motion";

export default function SearchPage() {
  const location =
    useLocation();

  const navigate =
    useNavigate();

  const API =
    "https://api.apnapashu.com";

  const [query, setQuery] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const params =
      new URLSearchParams(
        location.search
      );

    const q =
      params.get("q") || "";

    const cat =
      params.get(
        "category"
      ) || "";

    setQuery(q);
    setCategory(cat);
  }, [location.search]);

  useEffect(() => {
    const fetchProducts =
      async () => {
        try {
          setLoading(true);

          const { data } =
            await axios.get(
              `${API}/api/product/search`,
              {
                params: {
                  q: query,
                  category,
                },
              }
            );

          if (
            data.success
          ) {
            setProducts(
              data.products ||
                []
            );
          }
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchProducts();
  }, [
    query,
    category,
  ]);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}

      <div className="bg-white border-b border-gray-200 sticky top-0 z-20">

        <div className="max-w-7xl mx-auto p-4">

          <div className="flex flex-col md:flex-row gap-3">

            <div className="flex-1 flex items-center border border-yellow-300 bg-white">

              <FaSearch className="ml-3 text-gray-400" />

              <input
                type="text"
                value={query}
                onChange={(e) =>
                  setQuery(
                    e.target.value
                  )
                }
                placeholder="Search products..."
                className="flex-1 px-3 py-3 outline-none"
              />

            </div>

            <select
              value={category}
              onChange={(e) =>
                setCategory(
                  e.target.value
                )
              }
              className="border border-yellow-300 px-4 py-3 bg-white"
            >
              <option value="">
                All Categories
              </option>

              <option value="Animal">
                Animal
              </option>

              <option value="Feed">
                Feed
              </option>

              <option value="Medicine">
                Medicine
              </option>

            </select>

          </div>

        </div>

      </div>
            {/* RESULTS */}

      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="flex justify-between items-center mb-5">

          <h2 className="text-sm md:text-base text-gray-500">

            {loading
              ? "Searching..."
              : `${products.length} products found`}

            {query &&
              ` for "${query}"`}

            {category &&
              ` in ${category}`}

          </h2>

        </div>

        {loading ? (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {[1, 2, 3, 4, 5, 6].map(
              (item) => (
                <div
                  key={item}
                  className="bg-white border border-gray-200 animate-pulse"
                >
                  <div className="h-40 bg-gray-200" />

                  <div className="p-3">

                    <div className="h-4 bg-gray-200 mb-2" />

                    <div className="h-4 bg-gray-200 w-2/3" />

                  </div>

                </div>
              )
            )}

          </div>

        ) : products.length === 0 ? (

          <div className="bg-white border border-yellow-200 p-10 text-center">

            <img
              src="https://cdn-icons-png.flaticon.com/512/7486/7486740.png"
              alt="No Results"
              className="w-24 mx-auto mb-4 opacity-70"
            />

            <h3 className="text-xl font-bold text-gray-800">
              No Products Found
            </h3>

            <p className="text-gray-500 mt-2">
              Try changing your search keyword or category.
            </p>

          </div>

        ) : (

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {products.map(
              (
                product,
                index
              ) => {

                const imageUrl =
                  product.images
                    ?.length
                    ? `${API}/${product.images[0].replace(
                        /\\/g,
                        "/"
                      )}`
                    : "https://via.placeholder.com/400";

                return (
                  <motion.div
                    key={
                      product._id
                    }
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index *
                        0.05,
                    }}
                    whileHover={{
                      y: -5,
                    }}
                    className="bg-white border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden"
                  >

                    {/* IMAGE */}

                    <div className="relative">

                      <img
                        src={
                          imageUrl
                        }
                        alt={
                          product.name
                        }
                        className="w-full h-40 md:h-52 object-cover"
                      />

                      <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 font-semibold">
                        {
                          product.category
                        }
                      </div>

                    </div>

                    {/* CONTENT */}

                    <div className="p-3">

                      <h3 className="font-semibold text-sm md:text-base text-gray-800 line-clamp-1">
                        {
                          product.name
                        }
                      </h3>

                      <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                        {
                          product.description
                        }
                      </p>

                      <div className="mt-3 flex items-center justify-between">

                        <span className="text-green-600 font-bold text-sm md:text-lg">
                          ₹
                          {
                            product.price
                          }
                        </span>

                        <span className="text-xs text-gray-500">
                          Stock:
                          {" "}
                          {
                            product.stock
                          }
                        </span>

                      </div>

                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">

                        <FaMapMarkerAlt />

                        {product.location
                          ?.city ||
                          "India"}

                      </div>

                      <button
                        onClick={() =>
                          navigate(
                            `/product/${product._id}`
                          )
                        }
                        className="mt-3 w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 text-sm font-semibold flex justify-center items-center gap-2 transition-all"
                      >
                        View Details
                        <FaArrowRight />
                      </button>

                    </div>

                  </motion.div>
                );
              }
            )}

          </div>

        )}

      </div>

    </div>
  );
}