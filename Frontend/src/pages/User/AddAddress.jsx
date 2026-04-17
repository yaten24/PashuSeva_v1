import { useState } from "react";
import axios from "axios";
import {
  FaArrowLeft,
  FaHome,
  FaBriefcase,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
  FaSpinner,
  FaCheckCircle,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function AddAddress() {
  const navigate = useNavigate();

  const API =
    import.meta.env.VITE_API_URL ||
    "https://api.apnapashu.com";

  const [loading, setLoading] =
    useState(false);

  const [toast, setToast] =
    useState({
      show: false,
      message: "",
      type: "success",
    });

  const [form, setForm] = useState({
    fullName: "",
    mobile: "",
    alternateMobile: "",
    pincode: "",
    state: "",
    city: "",
    area: "",
    landmark: "",
    houseNo: "",
    addressType: "home",
    isDefault: true,
  });

  const showToast = (
    message,
    type = "success"
  ) => {
    setToast({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setToast({
        show: false,
        message: "",
        type: "success",
      });
    }, 2200);
  };

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setForm({
      ...form,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    if (
      !form.fullName ||
      !form.mobile ||
      !form.pincode ||
      !form.state ||
      !form.city ||
      !form.area ||
      !form.houseNo
    ) {
      return showToast(
        "Please fill all required fields",
        "error"
      );
    }

    try {
      setLoading(true);

      const payload = {
        ...form,
        alternateMobile:
          form.alternateMobile ||
          "",
        landmark:
          form.landmark || "",
      };

      const { data } =
        await axios.post(
          `${API}/api/user/address/add`,
          payload,
          {
            withCredentials: true,
          }
        );

      if (data.success) {
        showToast(
          "Address added successfully"
        );

        setTimeout(() => {
          navigate(
            "/your-address"
          );
        }, 1300);
      }
    } catch (error) {
      showToast(
        error?.response?.data
          ?.message ||
          "Failed to add address",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 via-white to-yellow-50 px-3 md:px-6 py-4 md:py-6">
      {/* Toast */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{
              y: -40,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -40,
              opacity: 0,
            }}
            className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-3 shadow-lg font-semibold text-sm ${
              toast.type ===
              "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
          >
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <motion.div
        initial={{
          opacity: 0,
          y: -25,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="mb-5 bg-white border-2 border-yellow-400 shadow-sm p-4"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() =>
              navigate(-1)
            }
            className="w-10 h-10 border-2 border-yellow-400 bg-yellow-50 flex items-center justify-center text-yellow-600 hover:bg-yellow-400 hover:text-white transition"
          >
            <FaArrowLeft />
          </button>

          <div>
            <h1 className="text-lg md:text-3xl font-black text-gray-900">
              Add Address
            </h1>

            <p className="text-[11px] md:text-sm text-gray-500 mt-1">
              Save delivery address
            </p>
          </div>
        </div>
      </motion.div>

      {/* Form */}
      <motion.form
        onSubmit={
          handleSubmit
        }
        initial={{
          opacity: 0,
          y: 35,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        className="bg-white border-2 border-yellow-300 shadow-sm p-4 md:p-5 space-y-4"
      >
        <Input
          required
          icon={<FaUser />}
          placeholder="Full Name *"
          name="fullName"
          value={form.fullName}
          onChange={
            handleChange
          }
        />

        <Input
          required
          icon={
            <FaPhoneAlt />
          }
          placeholder="Mobile Number *"
          name="mobile"
          value={form.mobile}
          onChange={
            handleChange
          }
        />

        <Input
          icon={
            <FaPhoneAlt />
          }
          placeholder="Alternate Mobile (Optional)"
          name="alternateMobile"
          value={
            form.alternateMobile
          }
          onChange={
            handleChange
          }
        />

        <div className="grid grid-cols-2 gap-3">
          <Input
            required
            icon={
              <FaMapMarkerAlt />
            }
            placeholder="Pincode *"
            name="pincode"
            value={
              form.pincode
            }
            onChange={
              handleChange
            }
          />

          <Input
            required
            icon={
              <FaMapMarkerAlt />
            }
            placeholder="State *"
            name="state"
            value={
              form.state
            }
            onChange={
              handleChange
            }
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Input
            required
            icon={
              <FaMapMarkerAlt />
            }
            placeholder="City *"
            name="city"
            value={form.city}
            onChange={
              handleChange
            }
          />

          <Input
            required
            icon={
              <FaMapMarkerAlt />
            }
            placeholder="Area *"
            name="area"
            value={form.area}
            onChange={
              handleChange
            }
          />
        </div>

        <Input
          required
          icon={<FaHome />}
          placeholder="House No / Flat / Street *"
          name="houseNo"
          value={
            form.houseNo
          }
          onChange={
            handleChange
          }
        />

        <Input
          icon={
            <FaMapMarkerAlt />
          }
          placeholder="Landmark (Optional)"
          name="landmark"
          value={
            form.landmark
          }
          onChange={
            handleChange
          }
        />

        {/* Type */}
        <div>
          <p className="text-sm font-bold text-gray-700 mb-2">
            Address Type
          </p>

          <div className="grid grid-cols-2 gap-3">
            <TypeBtn
              active={
                form.addressType ===
                "home"
              }
              icon={
                <FaHome />
              }
              title="Home"
              onClick={() =>
                setForm({
                  ...form,
                  addressType:
                    "home",
                })
              }
            />

            <TypeBtn
              active={
                form.addressType ===
                "work"
              }
              icon={
                <FaBriefcase />
              }
              title="Work"
              onClick={() =>
                setForm({
                  ...form,
                  addressType:
                    "work",
                })
              }
            />
          </div>
        </div>

        {/* Default */}
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <input
            type="checkbox"
            name="isDefault"
            checked={
              form.isDefault
            }
            onChange={
              handleChange
            }
          />
          Set as default address
        </label>

        {/* Submit */}
        <motion.button
          whileTap={{
            scale: 0.97,
          }}
          whileHover={{
            scale: 1.01,
          }}
          type="submit"
          disabled={loading}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-3 font-bold flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <FaSpinner className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <FaCheckCircle />
              Save Address
            </>
          )}
        </motion.button>
      </motion.form>
    </div>
  );
}

function Input({
  icon,
  ...props
}) {
  return (
    <div className="border-2 border-yellow-200 bg-yellow-50 px-3 py-3 flex items-center gap-2">
      <span className="text-yellow-600">
        {icon}
      </span>

      <input
        {...props}
        className="w-full bg-transparent outline-none text-sm font-medium text-gray-800 placeholder:text-gray-400"
      />
    </div>
  );
}

function TypeBtn({
  icon,
  title,
  active,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`border-2 px-4 py-3 flex items-center justify-center gap-2 font-bold text-sm transition ${
        active
          ? "border-yellow-500 bg-yellow-500 text-white"
          : "border-yellow-200 bg-yellow-50 text-gray-700"
      }`}
    >
      {icon}
      {title}
    </button>
  );
}