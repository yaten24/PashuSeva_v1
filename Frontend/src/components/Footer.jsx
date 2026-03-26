import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  FaWhatsapp,
  FaInstagram,
  FaArrowUp,
} from "react-icons/fa";

export default function Footer() {
  const year = new Date().getFullYear();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 250);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  const whatsappLink = `https://wa.me/919999999999?text=Hi`;
  const instagramLink = `https://instagram.com/pashuseva`;

  return (
    <footer className="relative w-full border-t border-gray-200 bg-gradient-to-b from-white to-gray-50">

      {/* 🔥 BACK TO TOP */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-3 bg-emerald-600 text-white text-sm font-semibold shadow-lg hover:bg-emerald-700 transition ${
          showTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <FaArrowUp /> Top
      </button>

      {/* 🔥 MAIN */}
      <div className="w-full px-6 md:px-10 lg:px-16 py-12">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* 🔥 BRAND */}
          <div>
            <h2 className="text-2xl font-extrabold text-gray-900">
              PashuSeva
            </h2>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Marketplace + veterinary consultation platform designed for farmers & livestock owners.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Marketplace", "Doctors", "Premium"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 🔥 QUICK LINKS */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Quick Links
            </h3>

            <ul className="mt-4 space-y-2 text-sm">
              <FooterLink to="/marketplace">Marketplace</FooterLink>
              <FooterLink to="/doctors">Doctors</FooterLink>
              <FooterLink to="/premium">Premium</FooterLink>
              <FooterLink to="/dashboard">Dashboard</FooterLink>
              <FooterLink to="/about">About</FooterLink>
            </ul>
          </div>

          {/* 🔥 FEATURES */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Features
            </h3>

            <ul className="mt-4 space-y-2 text-sm text-gray-600">
              <li>Category-wise listings</li>
              <li>Location-based search</li>
              <li>Premium unlock features</li>
              <li>Verified doctor profiles</li>
            </ul>
          </div>

          {/* 🔥 SUPPORT */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">
              Support
            </h3>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p><strong>Language:</strong> Hindi / English</p>
              <p><strong>Payments:</strong> UPI supported</p>
            </div>

            {/* 🔥 CONNECT */}
            <div className="mt-5 border border-gray-200 bg-white p-4 shadow-sm">

              <p className="text-xs font-bold text-gray-900 mb-2">
                Connect with us
              </p>

              <div className="flex gap-3">

                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700 transition"
                >
                  <FaWhatsapp /> WhatsApp
                </a>

                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-xs font-semibold border border-gray-300 hover:bg-gray-50 transition"
                >
                  <FaInstagram /> Instagram
                </a>

              </div>

              <div className="mt-3 flex gap-3">

                <Link
                  to="/login"
                  className="px-3 py-2 text-xs font-semibold bg-gray-900 text-white hover:bg-black transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-3 py-2 text-xs font-semibold border border-gray-300 hover:bg-gray-50 transition"
                >
                  Register
                </Link>

              </div>

            </div>
          </div>

        </div>
      </div>

      {/* 🔥 BOTTOM */}
      <div className="border-t border-gray-200">
        <div className="w-full px-6 md:px-10 lg:px-16 py-4 flex flex-col sm:flex-row justify-between gap-3 text-xs text-gray-500">
          <span>© {year} PashuSeva. All rights reserved.</span>

          <div className="flex gap-4">
            <span>Made for farmers</span>
            <Link to="/about" className="text-emerald-600 font-semibold hover:underline">
              Privacy / Terms
            </Link>
          </div>
        </div>
      </div>

    </footer>
  );
}

function FooterLink({ to, children }) {
  return (
    <li>
      <Link
        to={to}
        className="text-gray-700 hover:text-emerald-600 transition font-medium"
      >
        {children}
      </Link>
    </li>
  );
}