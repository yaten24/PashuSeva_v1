import {
  FaShoppingCart,
  FaUserMd,
  FaCrown,
} from "react-icons/fa";

export default function WhyPashuSeva() {
  const features = [
    {
      title: "Buy & Sell Nearby",
      desc: "Category-wise marketplace with location-based search & direct contact.",
      icon: <FaShoppingCart />,
    },
    {
      title: "Doctor Consultation",
      desc: "Verified veterinarians available for consultation after approval.",
      icon: <FaUserMd />,
    },
    {
      title: "Premium Benefits",
      desc: "Unlock calls, consultations, and exclusive platform features.",
      icon: <FaCrown />,
    },
  ];

  return (
    <section className="mt-10 px-6 md:px-10 lg:px-16">

      {/* 🔥 HEADER */}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
          Why PashuSeva
        </h2>

        <div className="text-sm text-gray-500 font-medium">
          Verified doctors • Trusted marketplace
        </div>
      </div>

      {/* 🔥 GRID */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

        {features.map((f, i) => (
          <div
            key={i}
            className="group border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >

            {/* 🔥 ICON */}
            <div className="flex items-center gap-4">

              <div className="w-12 h-12 flex items-center justify-center bg-emerald-100 text-emerald-700 text-xl group-hover:scale-110 transition">
                {f.icon}
              </div>

              <div>
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition">
                  {f.title}
                </h3>
              </div>

            </div>

            {/* 🔥 DESC */}
            <p className="mt-4 text-sm text-gray-600 leading-relaxed">
              {f.desc}
            </p>

          </div>
        ))}

      </div>
    </section>
  );
}