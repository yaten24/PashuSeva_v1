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
    <footer className="relative w-full border-t border-gray-200 bg-gradient-to-b from-white to-yellow-50">
      {/* BACK TO TOP */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 flex items-center gap-2 px-4 py-3 bg-yellow-500 text-white text-sm font-semibold shadow-lg hover:bg-yellow-600 transition ${
          showTop ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <FaArrowUp /> Top
      </button>

      {/* MAIN */}
      <div className="w-full px-4 md:px-10 lg:px-16 py-10 md:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {/* BRAND */}
          <div>
            <h2 className="text-2xl md:text-3xl font-black text-gray-900">
              Apna<span className="text-yellow-500">Pashu</span>
            </h2>

            <p className="mt-3 text-sm text-gray-600 leading-relaxed">
              Marketplace + veterinary consultation platform for farmers &
              livestock owners across India.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Marketplace", "Doctors", "Premium"].map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-semibold text-yellow-700 bg-yellow-100 px-3 py-1 border border-yellow-200"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
              Quick Links
            </h3>

            <ul className="space-y-3 text-sm">
              <FooterLink to="/marketplace">Marketplace</FooterLink>
              <FooterLink to="/doctors">Doctors</FooterLink>
              <FooterLink to="/premium">Premium</FooterLink>
              <FooterLink to="/dashboard">Dashboard</FooterLink>
              <FooterLink to="/about">About</FooterLink>
            </ul>
          </div>

          {/* FEATURES */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
              Features
            </h3>

            <ul className="space-y-3 text-sm text-gray-600">
              <li>Location based search</li>
              <li>Verified doctor profiles</li>
              <li>Premium unlock tools</li>
              <li>Fast product discovery</li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4">
              Support
            </h3>

            <div className="space-y-2 text-sm text-gray-600">
              <p><strong>Language:</strong> Hindi / English</p>
              <p><strong>Payments:</strong> UPI Supported</p>
            </div>

            {/* CONNECT BOX */}
            <div className="mt-5 border border-yellow-200 bg-white p-4 shadow-sm">
              <p className="text-xs font-bold text-gray-900 mb-3">
                Connect with us
              </p>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold bg-yellow-500 text-white hover:bg-yellow-600 transition"
                >
                  <FaWhatsapp /> WhatsApp
                </a>

                <a
                  href={instagramLink}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-3 py-2 text-xs font-semibold border border-gray-300 hover:bg-gray-50 transition"
                >
                  <FaInstagram /> Instagram
                </a>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-3">
                <Link
                  to="/login"
                  className="px-3 py-2 text-center text-xs font-semibold bg-gray-900 text-white hover:bg-black transition"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  className="px-3 py-2 text-center text-xs font-semibold border border-gray-300 hover:bg-gray-50 transition"
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM */}
      <div className="border-t border-gray-200 bg-white">
        <div className="w-full px-4 md:px-10 lg:px-16 py-4 flex flex-col md:flex-row justify-between gap-3 text-xs text-gray-500">
          <span>© {year} ApnaPashu. All rights reserved.</span>

          <div className="flex gap-4 flex-wrap">
            <span>Made for farmers</span>

            <Link
              to="/about"
              className="text-yellow-600 font-semibold hover:underline"
            >
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
        className="text-gray-700 hover:text-yellow-600 transition font-medium"
      >
        {children}
      </Link>
    </li>
  );
}