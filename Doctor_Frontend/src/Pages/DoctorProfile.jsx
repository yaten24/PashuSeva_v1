import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Briefcase, DollarSign } from "lucide-react";
import { useDoctorAuth } from "../Context/DoctorAuthContext";
import toast from "react-hot-toast";

const DoctorProfile = () => {
  const { doctor, setDoctor } = useDoctorAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    specialization: "",
    qualification: "",
    experience: "",
    consultationFee: "",
    state: "",
    city: "",
  });

  // 🔥 SET DATA FROM CONTEXT
  useEffect(() => {
    if (doctor) {
      setFormData({
        name: doctor.name || "",
        email: doctor.email || "",
        mobile: doctor.mobile || "",
        specialization: doctor.specialization || "",
        qualification: doctor.qualification || "",
        experience: doctor.experience || "",
        consultationFee: doctor.consultationFee || "",
        state: doctor.state || "",
        city: doctor.city || "",
      });
    }
  }, [doctor]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // 🔥 SUBMIT (DEMO)
  const handleSubmit = (e) => {
    e.preventDefault();

    // 👉 Abhi demo (later API call)
    setDoctor({ ...doctor, ...formData });

    toast.success("Profile Updated Successfully");
  };

  if (!doctor) return <div className="h-screen flex items-center justify-center">Loading...</div>;

  return (
    <div className="min-h-screen bg-yellow-50 p-6">

      {/* 🔥 HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <h1 className="text-2xl font-bold text-yellow-700">
          ✏️ Edit Profile
        </h1>
        <p className="text-sm text-gray-600">
          Update your professional details
        </p>
      </motion.div>

      {/* 🔥 FORM */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border border-yellow-200 p-6 shadow-sm grid grid-cols-2 gap-3"
      >

        <Input icon={<User />} name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
        <Input icon={<Phone />} name="mobile" value={formData.mobile} onChange={handleChange} placeholder="Mobile" />

        <Input icon={<Mail />} name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
        <Input icon={<Briefcase />} name="qualification" value={formData.qualification} onChange={handleChange} placeholder="Qualification" />

        <Input icon={<Briefcase />} name="specialization" value={formData.specialization} onChange={handleChange} placeholder="Specialization" />
        <Input icon={<Briefcase />} name="experience" value={formData.experience} onChange={handleChange} placeholder="Experience" />

        <Input icon={<DollarSign />} name="consultationFee" value={formData.consultationFee} onChange={handleChange} placeholder="Fee" />
        <Input icon={<MapPin />} name="state" value={formData.state} onChange={handleChange} placeholder="State" />

        <div className="col-span-2">
          <Input icon={<MapPin />} name="city" value={formData.city} onChange={handleChange} placeholder="City" />
        </div>

        {/* BUTTON */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="col-span-2 bg-yellow-500 hover:bg-yellow-600 text-white py-2 font-semibold mt-2"
        >
          Save Changes
        </motion.button>

      </motion.form>
    </div>
  );
};

// 🔥 INPUT COMPONENT
const Input = ({ icon, ...props }) => (
  <div className="flex items-center border border-yellow-200 px-3 py-2 focus-within:border-yellow-500">
    <span className="mr-2 text-yellow-600">{icon}</span>
    <input className="w-full outline-none text-sm bg-transparent" {...props} />
  </div>
);

export default DoctorProfile;