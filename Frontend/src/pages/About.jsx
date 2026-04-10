import { Link } from "react-router-dom";
import {
  FaUserMd,
  FaStore,
  FaCrown,
  FaShieldAlt,
  FaUsers,
  FaGlobe,
} from "react-icons/fa";

const modules = [
  {
    title: "Marketplace",
    icon: FaStore,
    desc: "Buy & sell Bhusa, Chara, Feed and more with location-based search.",
    to: "/marketplace",
  },
  {
    title: "Doctor Consultation",
    icon: FaUserMd,
    desc: "Connect with verified Pashu Chikitsak for expert guidance.",
    to: "/doctors",
  },
  {
    title: "Premium Plans",
    icon: FaCrown,
    desc: "Unlock unlimited access, direct contact & priority services.",
    to: "/premium",
  },
  {
    title: "Admin Control",
    icon: FaShieldAlt,
    desc: "Platform moderation and verification control.",
    to: "/admin",
  },
];

export default function About() {
  return (
    <div className="bg-white py-10">

      {/* 🔥 HERO */}
      <section className="bg-green-600 text-white px-4 py-4">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-3xl md:text-5xl font-bold">
            PashuSeva Platform
          </h1>

          <p className="mt-3 text-sm md:text-base opacity-90 max-w-xl mx-auto">
            A complete digital ecosystem connecting farmers, sellers and veterinary doctors across India.
          </p>

          <div className="mt-5 flex justify-center gap-2 flex-wrap">
            <Link
              to="/marketplace"
              className="bg-white text-green-700 px-4 py-2 text-sm font-medium"
            >
              Explore Marketplace
            </Link>

            <Link
              to="/doctors"
              className="border border-white px-4 py-2 text-sm"
            >
              Find Doctors
            </Link>
          </div>
        </div>
      </section>

      {/* 🔥 ABOUT */}
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-6 items-center">

          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              What is PashuSeva?
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              PashuSeva is a modern agri-tech platform designed to empower farmers and livestock owners by providing marketplace and veterinary consultation services.
            </p>
          </div>

          <div className="bg-gray-50 p-4 border border-gray-200">
            <div className="flex items-center gap-2 mb-2">
              <FaUsers className="text-green-600" />
              <span className="text-sm font-medium">Multi-role platform</span>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <FaGlobe className="text-green-600" />
              <span className="text-sm font-medium">Available across India</span>
            </div>

            <div className="flex items-center gap-2">
              <FaShieldAlt className="text-green-600" />
              <span className="text-sm font-medium">Verified ecosystem</span>
            </div>
          </div>

        </div>
      </section>

      {/* 🔥 MODULES */}
      <section className="bg-gray-50 py-10 px-4">
        <div className="max-w-6xl mx-auto">

          <h2 className="text-xl font-bold text-gray-800 mb-5">
            Core Features
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {modules.map((m) => (
              <div
                key={m.title}
                className="bg-white p-4 border border-gray-200 shadow-sm hover:shadow-md transition"
              >
                <m.icon className="text-green-600 mb-2 text-lg" />

                <h3 className="text-sm font-semibold text-gray-800">
                  {m.title}
                </h3>

                <p className="text-xs text-gray-500 mt-1">
                  {m.desc}
                </p>

                <Link
                  to={m.to}
                  className="inline-block mt-2 text-green-600 text-xs font-medium"
                >
                  Explore →
                </Link>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 🔥 USERS */}
      <section className="max-w-6xl mx-auto px-4 py-10">

        <h2 className="text-xl font-bold text-gray-800 mb-5">
          Who Can Use?
        </h2>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { title: "Farmers", desc: "Find feed & consult doctors." },
            { title: "Sellers", desc: "List and manage products." },
            { title: "Doctors", desc: "Provide consultations." },
            { title: "Admins", desc: "Manage system." },
          ].map((item) => (
            <div
              key={item.title}
              className="bg-gray-50 p-4 border border-gray-200"
            >
              <h3 className="text-sm font-semibold">{item.title}</h3>
              <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

      </section>

      {/* 🔥 CTA */}
      <section className="bg-green-600 text-white py-10 px-4 text-center">

        <h2 className="text-xl font-bold">
          Start Using PashuSeva
        </h2>

        <p className="text-xs mt-1 opacity-90">
          Join farmers and professionals across India
        </p>

        <div className="mt-4 flex justify-center gap-2 flex-wrap">
          <Link
            to="/register"
            className="bg-white text-green-700 px-4 py-2 text-sm"
          >
            Get Started
          </Link>

          <Link
            to="/marketplace"
            className="border border-white px-4 py-2 text-sm"
          >
            Browse
          </Link>
        </div>

      </section>

    </div>
  );
}