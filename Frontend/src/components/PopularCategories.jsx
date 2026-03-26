import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaLeaf,
  FaBox,
  FaCapsules,
  FaLayerGroup,
} from "react-icons/fa";

export default function PopularCategories() {
  const categories = [
    {
      title: "Bhusa",
      key: "bhusa",
      desc: "Dry fodder listings near you",
      icon: <FaLeaf />,
    },
    {
      title: "Chara",
      key: "chara",
      desc: "Green fodder sellers & rates",
      icon: <FaBox />,
    },
    {
      title: "Feed",
      key: "feed",
      desc: "Animal feed & brands",
      icon: <FaLayerGroup />,
    },
    {
      title: "Supplements",
      key: "supplements",
      desc: "Minerals, vitamins, boosters",
      icon: <FaCapsules />,
    },
    {
      title: "Others",
      key: "others",
      desc: "Other animal commodities",
      icon: <FaBox />,
    },
  ];

  return (
    <section className="mt-10 px-6 md:px-10 lg:px-16">

      {/* 🔥 HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Popular Categories
        </h2>

        <Link
          to="/marketplace"
          className="flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:gap-3 transition-all"
        >
          <span>View all</span>
          <FaArrowRight className="text-xs" />
        </Link>
      </div>

      {/* 🔥 GRID */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">

        {categories.map((c, i) => (
          <Link
            key={i}
            to={`/marketplace?cat=${c.key}`}
            className="group border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >

            {/* 🔥 TOP */}
            <div className="flex items-start justify-between gap-2">

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 flex items-center justify-center bg-emerald-100 text-emerald-700 text-lg group-hover:scale-110 transition">
                  {c.icon}
                </div>

                <div className="font-bold text-gray-900 text-base">
                  {c.title}
                </div>
              </div>

              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5">
                {c.key}
              </span>
            </div>

            {/* 🔥 DESC */}
            <div className="mt-3 text-sm text-gray-600">
              {c.desc}
            </div>

            {/* 🔥 CTA */}
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600 group-hover:gap-3 transition-all">
              <span>Explore</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition" />
            </div>

          </Link>
        ))}

      </div>
    </section>
  );
}