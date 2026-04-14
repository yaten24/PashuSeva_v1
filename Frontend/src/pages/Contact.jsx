import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
  FaPaperPlane,
} from "react-icons/fa";
import { motion } from "framer-motion";

export default function Contact() {
  const contactItems = [
    {
      icon: FaPhoneAlt,
      title: "Phone Support",
      value: "+91 9876543210",
    },
    {
      icon: FaEnvelope,
      title: "Email Address",
      value: "support@pashuseva.com",
    },
    {
      icon: FaMapMarkerAlt,
      title: "Head Office",
      value: "Meerut, Uttar Pradesh, India",
    },
    {
      icon: FaClock,
      title: "Working Hours",
      value: "24×7 Customer Support",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-yellow-50 pb-8">
      {/* HERO FULL WIDTH */}
      <motion.div
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full bg-gradient-to-r from-gray-900 via-black to-gray-900 text-white px-4 md:px-10 py-14 md:py-20"
      >
        <div className="w-full">
          <p className="text-yellow-400 text-xs md:text-sm font-semibold tracking-[0.25em] uppercase">
            PashuSeva Help Center
          </p>

          <h1 className="text-3xl md:text-5xl font-black mt-3">
            Contact Us
          </h1>

          <p className="text-sm md:text-base text-gray-300 mt-3 max-w-3xl">
            Need support regarding doctors, products, orders or partner
            services? Our support team is available to help you quickly.
          </p>
        </div>
      </motion.div>

      {/* FULL PAGE CONTENT */}
      <div className="px-3 md:px-8 lg:px-10 py-5 grid lg:grid-cols-3 gap-5">
        {/* FORM */}
        <motion.div
          initial={{ opacity: 0, x: -25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="lg:col-span-2 bg-white border border-gray-200 shadow-sm p-4 md:p-6"
        >
          <div className="flex items-center gap-2 mb-5">
            <FaPaperPlane className="text-yellow-500" />
            <h2 className="text-lg md:text-2xl font-black text-gray-900">
              Send Your Message
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Full Name"
              className="border border-gray-200 px-3 py-3 text-sm outline-none focus:border-yellow-500"
            />

            <input
              type="text"
              placeholder="Phone Number"
              className="border border-gray-200 px-3 py-3 text-sm outline-none focus:border-yellow-500"
            />

            <input
              type="email"
              placeholder="Email Address"
              className="md:col-span-2 border border-gray-200 px-3 py-3 text-sm outline-none focus:border-yellow-500"
            />

            <input
              type="text"
              placeholder="Subject"
              className="md:col-span-2 border border-gray-200 px-3 py-3 text-sm outline-none focus:border-yellow-500"
            />

            <textarea
              rows="6"
              placeholder="Write your message..."
              className="md:col-span-2 border border-gray-200 px-3 py-3 text-sm outline-none focus:border-yellow-500 resize-none"
            ></textarea>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            whileHover={{ scale: 1.01 }}
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 font-bold text-sm flex items-center gap-2"
          >
            <FaPaperPlane />
            Submit Message
          </motion.button>
        </motion.div>

        {/* RIGHT SIDE */}
        <div className="space-y-4">
          {contactItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.08 }}
              whileHover={{ y: -3 }}
              className="bg-white border border-gray-200 shadow-sm p-4 flex items-center gap-4"
            >
              <div className="w-12 h-12 bg-yellow-100 text-yellow-600 flex items-center justify-center text-lg shrink-0">
                <item.icon />
              </div>

              <div>
                <p className="text-sm font-bold text-gray-900">
                  {item.title}
                </p>

                <p className="text-xs md:text-sm text-gray-500 mt-1">
                  {item.value}
                </p>
              </div>
            </motion.div>
          ))}

          {/* SUPPORT CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white p-5 shadow-sm"
          >
            <h3 className="text-xl font-black">
              Instant Assistance
            </h3>

            <p className="text-sm text-yellow-100 mt-2">
              For urgent help regarding appointments, doctors,
              products or technical support.
            </p>

            <a
              href="tel:+919876543210"
              className="inline-block mt-4 bg-white text-yellow-600 px-5 py-2 font-bold text-sm"
            >
              Call Now
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}