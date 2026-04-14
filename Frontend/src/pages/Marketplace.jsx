import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  FaSearch,
  FaStore,
  FaArrowRight,
  FaShoppingCart,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Marketplace() {
  const [q, setQ] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔥 FETCH REAL API
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(
        "https://api.apnapashu.com/api/product/get-products",
      );

      if (data.success) {
        setProducts(data.products);
      }
    } catch (error) {
      console.log("Products Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 SEARCH FILTER
  const filtered = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(q.toLowerCase()),
    );
  }, [q, products]);

  // 🔥 IMAGE URL FIX
  const getImage = (item) => {
    let imagePath = "";

    if (item?.images?.length > 0) {
      imagePath = item.images[0];
    } else if (item?.image) {
      imagePath = item.image;
    }

    if (!imagePath) {
      return "https://via.placeholder.com/400x300?text=No+Image";
    }

    // windows path fix
    imagePath = imagePath.replaceAll("\\", "/").trim();

    // if uploads missing
    if (!imagePath.startsWith("uploads")) {
      imagePath = `uploads/${imagePath}`;
    }

    const finalUrl = `https://api.apnapashu.com/${imagePath}`;

    console.log("IMAGE URL:", finalUrl); // check browser console

    return finalUrl;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-yellow-50 px-4 md:px-8 py-5">
      {/* HERO */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-yellow-200 shadow-sm p-4 md:p-6 mb-5"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-xl md:text-3xl font-black text-gray-900">
              Pashu<span className="text-yellow-500">Seva</span> Marketplace
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Buy feed, bhusa, chara & more from trusted sellers.
            </p>
          </div>

          <a
            href="https://seller.apnapashu.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            <FaStore />
            Become Seller
          </a>
        </div>
      </motion.div>

      {/* SEARCH */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white border border-gray-200 shadow-sm p-3 md:p-4 mb-5"
      >
        <div className="flex items-center border border-yellow-300 bg-yellow-50 px-3">
          <FaSearch className="text-yellow-500 text-sm" />

          <input
            placeholder="Search products..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full px-3 py-3 text-sm outline-none bg-transparent"
          />
        </div>
      </motion.div>

      {/* LOADING */}
      {loading && (
        <div className="text-center py-10 text-gray-500">
          Loading products...
        </div>
      )}

      {/* PRODUCTS */}
      {!loading && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((p, index) => (
            <motion.div
              key={p._id}
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white border border-gray-200 shadow-sm overflow-hidden"
            >
              {/* IMAGE */}
              <img
                src={getImage(p)}
                alt={p.name}
                className="w-full h-40 object-cover bg-gray-100"
                onError={(e) => {
                  e.target.onerror = null; // prevent infinite loop
                  e.target.src = "/no-image.png";
                }}
              />

              {/* CONTENT */}
              <div className="p-3">
                <h3 className="text-sm md:text-base font-bold text-gray-800 truncate">
                  {p.name}
                </h3>

                <p className="text-xs text-gray-500 mt-1">{p.category}</p>

                <p className="text-yellow-600 font-black text-lg mt-2">
                  ₹{p.price}
                </p>

                <div className="grid grid-cols-2 gap-2 mt-3">
                  <Link
                    to={`/product/${p._id}`}
                    className="text-center text-xs bg-gray-900 text-white py-2 hover:bg-black transition"
                  >
                    View
                  </Link>

                  <button className="text-xs bg-yellow-500 text-white py-2 hover:bg-yellow-600 transition flex items-center justify-center gap-1">
                    <FaShoppingCart />
                    Buy
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* EMPTY */}
      {!loading && filtered.length === 0 && (
        <div className="bg-white border border-gray-200 text-center py-10 mt-5 shadow-sm">
          <p className="text-gray-500 text-sm">No products found</p>
        </div>
      )}

      {/* SELLER CTA */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-5 md:p-8 shadow-lg"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 className="text-xl md:text-3xl font-black">
              Sell Your Products on PashuSeva
            </h2>

            <p className="text-sm md:text-base text-yellow-100 mt-2">
              Reach thousands of farmers and grow your business online.
            </p>
          </div>

          <a
            href="https://seller.apnapashu.com"
            target="_blank"
            rel="noreferrer"
            className="bg-white text-yellow-600 px-5 py-3 font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-100 transition"
          >
            Become Seller
            <FaArrowRight />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
