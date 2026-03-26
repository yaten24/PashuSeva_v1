import { Link } from "react-router-dom";
import {
  FaShoppingCart,
  FaStore,
  FaUserMd,
  FaCrown,
  FaArrowRight,
} from "react-icons/fa";

export default function QuickActions() {
  const actions = [
    {
      icon: <FaShoppingCart />,
      title: "Buy Products",
      desc: "Browse & contact sellers",
      to: "/marketplace",
    },
    {
      icon: <FaStore />,
      title: "Sell Products",
      desc: "Add/manage listings",
      to: "/seller/products",
    },
    {
      icon: <FaUserMd />,
      title: "Find Doctors",
      desc: "Verified profiles",
      to: "/doctors",
    },
    {
      icon: <FaCrown />,
      title: "Premium",
      desc: "Unlock calls & consults",
      to: "/premium",
    },
  ];

  return (
    <section className="w-full px-4 md:px-10 lg:px-16 py-6">

      {/* 🔥 HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Quick Actions
        </h2>

        <div className="text-sm text-gray-500 font-medium">
          Fast access • One-click actions
        </div>
      </div>

      {/* 🔥 GRID */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

        {actions.map((item, i) => (
          <Link
            key={i}
            to={item.to}
            className="group border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
          >
            {/* 🔥 ICON */}
            <div className="flex items-center justify-center w-12 h-12 bg-emerald-100 text-emerald-700 text-xl group-hover:scale-110 transition">
              {item.icon}
            </div>

            {/* 🔥 CONTENT */}
            <div className="mt-4">
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition">
                {item.title}
              </h3>

              <p className="text-sm text-gray-600 mt-1">
                {item.desc}
              </p>
            </div>

            {/* 🔥 CTA */}
            <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-emerald-600 group-hover:gap-3 transition-all">
              <span>Explore</span>
              <FaArrowRight className="text-xs group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}

      </div>
    </section>
  );
}