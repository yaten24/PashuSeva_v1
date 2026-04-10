import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt } from "react-icons/fa";
import { motion } from "framer-motion";

export default function SearchPage() {
  const location = useLocation();

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");

  // ✅ Demo Data
  const items = [
    {
      id: 1,
      name: "Cow Feed Premium",
      category: "feed",
      price: "₹1200",
      location: "Meerut",
      image: "https://source.unsplash.com/400x300/?cattle",
    },
    {
      id: 2,
      name: "Green Fodder (Chara)",
      category: "chara",
      price: "₹800",
      location: "Delhi",
      image: "https://source.unsplash.com/400x300/?grass",
    },
    {
      id: 3,
      name: "Dry Bhusa",
      category: "bhusa",
      price: "₹600",
      location: "Agra",
      image: "https://source.unsplash.com/400x300/?hay",
    },
    {
      id: 4,
      name: "Goat Feed Special",
      category: "feed",
      price: "₹950",
      location: "Lucknow",
      image: "https://source.unsplash.com/400x300/?goat",
    },
  ];

  // 🔥 GET QUERY FROM URL
  useEffect(() => {
    const params = new URLSearchParams(location.search);

    const q = params.get("q") || "";
    const cat = params.get("category") || "";

    setQuery(q);
    setCategory(cat);
  }, [location.search]);

  // 🔍 FILTER LOGIC (QUERY + CATEGORY)
  const filteredItems = items.filter((item) => {
    const matchQuery = item.name
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchCategory = category
      ? item.category === category
      : true;

    return matchQuery && matchCategory;
  });

  return (
    <div className="bg-gray-50 min-h-screen pb-20">

      {/* 🔥 SEARCH BAR */}
      <div className="bg-white p-4 sticky top-0 z-10">
        <div className="max-w-3xl mx-auto flex items-center border border-gray-200 px-3 py-2">
          <FaSearch className="text-gray-400 mr-2" />
          <input
            type="text"
            placeholder="Search for feed, bhusa, chara..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full outline-none text-sm"
          />
        </div>
      </div>

      {/* 🔥 RESULTS */}
      <div className="max-w-6xl mx-auto px-4 py-6">

        <h2 className="text-sm text-gray-500 mb-4">
          {filteredItems.length} results found
          {query && ` for "${query}"`}
          {category && ` in ${category}`}
        </h2>

        {filteredItems.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No items found
          </p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-32 object-cover"
                />

                {/* Content */}
                <div className="p-3">
                  <h3 className="text-sm font-semibold text-gray-800">
                    {item.name}
                  </h3>

                  <p className="text-green-600 font-medium text-sm mt-1">
                    {item.price}
                  </p>

                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                    <FaMapMarkerAlt />
                    {item.location}
                  </div>

                  <button className="mt-2 w-full bg-green-600 text-white text-xs py-1 hover:bg-green-700">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}