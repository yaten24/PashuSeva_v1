import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";
import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaArrowLeft,
  FaHeart,
} from "react-icons/fa";

const Favorites = () => {
  const navigate =
    useNavigate();

  const [favorites, setFavorites] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://api.apnapashu.com";

  const fetchFavorites =
    async () => {
      try {
        const { data } =
          await axios.get(
            `${API_URL}/api/product/my-favorites`,
            {
              withCredentials: true,
            }
          );

        if (data.success) {
          setFavorites(
            data.favorites || []
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchFavorites();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex justify-center items-center">
        <div className="text-sm font-semibold">
          Loading Favorites...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-50">

      {/* HEADER */}

      <div className="sticky top-0 z-20 bg-white border-b">

        <div className="max-w-7xl mx-auto px-3 py-3 flex items-center gap-3">

          <button
            onClick={() =>
              navigate(-1)
            }
            className="w-9 h-9 border rounded-full flex items-center justify-center"
          >
            <FaArrowLeft />
          </button>

          <div>

            <h1 className="font-bold text-lg">
              My Favorites
            </h1>

            <p className="text-xs text-gray-500">
              {favorites.length}
              {" "}
              Products
            </p>

          </div>

        </div>

      </div>

      <div className="max-w-7xl mx-auto p-3">

        {favorites.length ===
        0 ? (
          <div className="bg-white border p-8 text-center mt-4">

            <FaHeart className="mx-auto text-3xl text-red-500 mb-3" />

            <h2 className="font-bold">
              No Favorites Yet
            </h2>

            <p className="text-sm text-gray-500 mt-1">
              Add products to your
              favorites list
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">

            {favorites.map(
              (item) => {
                const product =
                  item.product;

                const image =
                  product?.images?.[0]
                    ? `${API_URL}/${product.images[0]}`
                    : "https://via.placeholder.com/300";

                return (
                  <Link
                    key={item._id}
                    to={`/product/${product._id}`}
                    className="bg-white border overflow-hidden hover:shadow-md transition-all"
                  >
                    <div className="relative">

                      <img
                        src={image}
                        alt={
                          product.name
                        }
                        className="w-full h-28 md:h-40 object-cover"
                      />

                      <div className="absolute top-2 right-2 bg-white p-1 rounded-full shadow">

                        <FaHeart className="text-red-500 text-xs" />

                      </div>

                    </div>

                    <div className="p-2">

                      <h3 className="font-semibold text-xs md:text-sm line-clamp-2 min-h-[32px]">
                        {
                          product.name
                        }
                      </h3>

                      <p className="text-orange-600 font-bold text-sm mt-2">
                        ₹
                        {
                          product.price
                        }
                      </p>

                    </div>

                  </Link>
                );
              }
            )}

          </div>
        )}

      </div>

    </div>
  );
};

export default Favorites;