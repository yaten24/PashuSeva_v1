import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* 🔥 DEMO DATA */
const demoProducts = [
  {
    id: "1",
    name: "Premium Bhusa",
    category: "bhusa",
    price: 450,
    location: "Bulandshahr",
    description: "High quality bhusa",
    isActive: true,
  },
  {
    id: "2",
    name: "Green Chara",
    category: "chara",
    price: 300,
    location: "Aligarh",
    description: "Fresh chara",
    isActive: true,
  },
  {
    id: "3",
    name: "Cattle Feed",
    category: "feed",
    price: 1200,
    location: "Delhi",
    description: "Protein feed",
    isActive: true,
  },
];

const cats = [
  { key: "all", label: "All" },
  { key: "bhusa", label: "Bhusa" },
  { key: "chara", label: "Chara" },
  { key: "feed", label: "Feed" },
];

export default function Marketplace() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [loc, setLoc] = useState("");

  const filtered = useMemo(() => {
    let data = demoProducts;

    if (cat !== "all") data = data.filter((p) => p.category === cat);

    if (loc)
      data = data.filter((p) =>
        p.location.toLowerCase().includes(loc.toLowerCase())
      );

    if (q)
      data = data.filter((p) =>
        p.name.toLowerCase().includes(q.toLowerCase())
      );

    return data;
  }, [q, cat, loc]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-4">

      {/* 🔥 TOP BAR */}
      <div className="flex flex-wrap gap-2 items-center justify-between mb-4 pb-2">
        <h1 className="text-lg font-semibold text-gray-800">
          PashuSeva Marketplace
        </h1>

        <div className="flex gap-2 w-full md:w-auto">
          <input
            placeholder="Search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="border border-gray-300 px-3 py-1.5 text-sm w-full md:w-44 focus:border-green-600 outline-none"
          />
          <input
            placeholder="Location"
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            className="border border-gray-300 px-3 py-1.5 text-sm w-full md:w-36 focus:border-green-600 outline-none"
          />
        </div>
      </div>

      {/* 🔥 CATEGORY */}
      <div className="flex gap-2 mb-4 flex-wrap">
        {cats.map((c) => (
          <button
            key={c.key}
            onClick={() => setCat(c.key)}
            className={`px-3 py-1 text-xs border border-gray-300 transition
            ${
              cat === c.key
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-gray-700 hover:border-green-500"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* 🔥 PRODUCTS GRID (4 per row) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {filtered.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-gray-200 p-3 flex flex-col hover:border-green-500 transition"
          >
            {/* IMAGE */}
            <div className="h-24 bg-gray-100 flex items-center justify-center text-xs text-gray-400 border">
              Image
            </div>

            {/* CONTENT */}
            <div className="mt-2 flex-1">
              <div className="text-sm font-semibold text-gray-800 truncate">
                {p.name}
              </div>

              <div className="text-xs text-gray-500">
                {p.location}
              </div>

              <div className="text-green-600 text-sm font-bold mt-1">
                ₹{p.price}
              </div>
            </div>

            {/* BUTTONS */}
            <div className="flex gap-2 mt-2">
              <Link
                to={`/product/${p.id}`}
                className="flex-1 text-center text-xs bg-gray-800 text-white py-1.5 hover:bg-black transition"
              >
                View
              </Link>

              <button
                className="flex-1 text-xs bg-green-600 text-white py-1.5 hover:bg-green-700 transition"
                onClick={() => alert(`Buy ${p.name}`)}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* EMPTY */}
      {filtered.length === 0 && (
        <div className="text-center text-gray-500 mt-6 text-sm">
          No products found
        </div>
      )}
    </div>
  );
}