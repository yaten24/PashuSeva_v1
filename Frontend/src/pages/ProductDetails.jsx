import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import {
  FaArrowLeft,
  FaShoppingCart,
  FaPhone,
  FaTag,
  FaBoxOpen,
  FaStar,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL =
    import.meta.env.VITE_API_URL || "https://api.apnapashu.com";

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(
        `${API_URL}/api/product/get-product/${id}`
      );

      if (data.success) setProduct(data.product);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getImage = () => {
    if (product?.images?.length > 0) {
      const imagePath = product.images[0]
        .replace(/\\/g, "/")
        .replace(/^\/+/, "");

      return `${API_URL}/${imagePath}`;
    }
    return "https://via.placeholder.com/800x500?text=No+Image";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-3">
        <div className="animate-pulse bg-white border border-gray-200 shadow-sm">
          <div className="h-52 bg-gray-200"></div>
          <div className="p-3 space-y-3">
            <div className="h-6 bg-gray-200 w-1/2"></div>
            <div className="h-8 bg-yellow-100 w-24"></div>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-12 bg-gray-100"></div>
              <div className="h-12 bg-gray-100"></div>
              <div className="h-12 bg-gray-100"></div>
              <div className="h-12 bg-gray-100"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Product not found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* TOP */}
      <div className="px-3 pt-3">
        <Link
          to="/marketplace"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-700"
        >
          <FaArrowLeft />
          Back
        </Link>
      </div>

      {/* CARD */}
      <div className="px-3 py-3">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 shadow-sm overflow-hidden"
        >
          {/* IMAGE */}
          <img
            src={getImage()}
            alt={product.name}
            className="w-full h-56 object-cover"
          />

          {/* BODY */}
          <div className="p-3">
            {/* NAME */}
            <div className="flex justify-between gap-2">
              <div>
                <h1 className="text-lg font-black text-gray-900 leading-tight">
                  {product.name}
                </h1>

                <p className="text-[11px] text-gray-500 mt-1">
                  Seller: {product.seller?.name}
                </p>
              </div>

              <div className="text-xl font-black text-yellow-600 whitespace-nowrap">
                ₹{product.price}
              </div>
            </div>

            {/* INFO */}
            <div className="grid grid-cols-2 gap-2 mt-4">
              <Info icon={<FaTag />} label="Category" value={product.category} />
              <Info icon={<FaBoxOpen />} label="Stock" value={product.stock} />
              <Info
                icon={<FaStar />}
                label="Rating"
                value={`${product.rating}/5`}
              />
              <Info
                icon={<FaMapMarkerAlt />}
                label="Location"
                value={product.location?.city}
              />
            </div>

            {/* DESC */}
            <div className="mt-4">
              <h3 className="text-sm font-bold text-gray-900 mb-1">
                Description
              </h3>

              <p className="text-xs text-gray-600 leading-6">
                {product.description}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* FIXED BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 px-3 py-2 shadow-[0_-4px_16px_rgba(0,0,0,0.08)]">
        <div className="grid grid-cols-2 gap-2">
          <button className="bg-yellow-500 text-white py-3 text-sm font-bold flex items-center justify-center gap-2">
            <FaShoppingCart />
            Buy
          </button>

          <a
            href={`tel:${product.seller?.mobile}`}
            className="bg-gray-900 text-white py-3 text-sm font-bold flex items-center justify-center gap-2"
          >
            <FaPhone />
            Call
          </a>
        </div>
      </div>
    </div>
  );
}

function Info({ icon, label, value }) {
  return (
    <div className="border border-gray-200 bg-gray-50 p-2">
      <div className="flex items-center gap-1 text-[10px] text-gray-500">
        <span className="text-yellow-500">{icon}</span>
        {label}
      </div>

      <div className="font-bold text-xs text-gray-800 mt-1 truncate">
        {value}
      </div>
    </div>
  );
}