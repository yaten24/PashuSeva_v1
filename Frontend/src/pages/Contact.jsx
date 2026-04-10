import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  return (
    <div className="bg-gray-50 min-h-screen py-5">

      {/* 🔥 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-green-600 text-white px-4 py-14 text-center"
      >
        <h1 className="text-3xl md:text-4xl font-bold">
          Contact Us
        </h1>
        <p className="text-sm mt-2 opacity-90">
          We're here to help you with any queries or support
        </p>
      </motion.div>

      {/* 🔥 MAIN */}
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-6">

        {/* 📩 FORM */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-gray-200 p-6 shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-lg font-semibold mb-5 text-gray-800">
            Send a Message
          </h2>

          <form className="space-y-4">

            <input
              type="text"
              placeholder="Your Name"
              className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600 transition"
            />

            <input
              type="email"
              placeholder="Your Email"
              className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600 transition"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600 transition"
            />

            <textarea
              rows="4"
              placeholder="Your Message"
              className="w-full border border-gray-200 px-3 py-2 text-sm outline-none focus:border-green-600 transition"
            ></textarea>

            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 text-sm font-medium w-full hover:bg-green-700 transition transform hover:scale-[1.02]"
            >
              Send Message
            </button>

          </form>
        </motion.div>

        {/* 📞 CONTACT INFO */}
        <div className="space-y-4">

          {[
            {
              icon: FaPhoneAlt,
              title: "Phone",
              value: "+91 9876543210",
            },
            {
              icon: FaEnvelope,
              title: "Email",
              value: "support@pashuseva.com",
            },
            {
              icon: FaMapMarkerAlt,
              title: "Location",
              value: "Meerut, Uttar Pradesh, India",
            },
            {
              icon: FaClock,
              title: "Working Hours",
              value: "24×7 Support Available",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.15 }}
              className="bg-white border border-gray-200 p-4 flex items-center gap-3 shadow-sm hover:shadow-md transition hover:scale-[1.02]"
            >
              <item.icon className="text-green-600 text-lg" />

              <div>
                <p className="text-sm font-medium">{item.title}</p>
                <p className="text-xs text-gray-500">{item.value}</p>
              </div>
            </motion.div>
          ))}

        </div>

      </div>
    </div>
  );
}