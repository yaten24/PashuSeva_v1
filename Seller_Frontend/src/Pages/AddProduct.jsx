import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaBox,
  FaTag,
  FaRupeeSign,
  FaLayerGroup,
  FaMapMarkerAlt,
  FaImage,
  FaPlus,
} from "react-icons/fa";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    city: "",
    state: "",
  });

  const [images, setImages] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);

  const categories = [
    "Animal",
    "Feed",
    "Bhusa",
    "Chara",
    "Medicine",
    "Equipment",
  ];

  // 🔥 Fetch States
  useEffect(() => {
    const fetchStates = async () => {
      const res = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/states",
        { country: "India" }
      );
      setStates(res.data.data.states);
    };
    fetchStates();
  }, []);

  // 🔥 Fetch Cities
  const fetchCities = async (stateName) => {
    const res = await axios.post(
      "https://countriesnow.space/api/v0.1/countries/state/cities",
      { country: "India", state: stateName }
    );
    setCities(res.data.data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    if (name === "state") {
      fetchCities(value);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  };

  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      images.forEach((img) => data.append("images", img));

      await axios.post(
        "http://localhost:5000/api/seller/product/create",
        data,
        {
          withCredentials: true, // 🔥 FIX (cookie based)
        }
      );

      alert("✅ Product Added");

      setFormData({
        name: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        city: "",
        state: "",
      });

      setImages([]);
    } catch {
      alert("❌ Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-3 py-4 md:px-6">

      {/* 🔥 HEADER */}
      <h1 className="text-xl md:text-3xl font-bold mb-5 flex items-center gap-2">
        Add Product
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 bg-white/5 p-4 md:p-6 border border-white/10"
      >

        {/* Name */}
        <div>
          <label className="text-sm flex items-center gap-2">
            <FaBox /> Product Name
          </label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 bg-gray-800 border border-gray-700 text-sm"
          />
        </div>

        {/* Category */}
        <div>
          <label className="text-sm flex items-center gap-2">
            <FaTag /> Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 bg-gray-800 border text-sm"
          >
            <option value="">Select</option>
            {categories.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label className="text-sm flex items-center gap-2">
            <FaRupeeSign /> Price
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 bg-gray-800 border text-sm"
          />
        </div>

        {/* Stock */}
        <div>
          <label className="text-sm flex items-center gap-2">
            <FaLayerGroup /> Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-gray-800 border text-sm"
          />
        </div>

        {/* State */}
        <div>
          <label className="text-sm flex items-center gap-2">
            <FaMapMarkerAlt /> State
          </label>
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 bg-gray-800 border text-sm"
          >
            <option value="">Select</option>
            {states.map((s, i) => (
              <option key={i}>{s.name}</option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label className="text-sm flex items-center gap-2">
            <FaMapMarkerAlt /> City
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 bg-gray-800 border text-sm"
          >
            <option value="">Select</option>
            {cities.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label className="text-sm">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full mt-1 p-2 bg-gray-800 border text-sm"
          />
        </div>

        {/* Images */}
        <div className="md:col-span-2">
          <label className="text-sm flex items-center gap-2">
            <FaImage /> Upload Images
          </label>
          <input
            type="file"
            multiple
            onChange={handleImageChange}
            className="mt-1 text-sm"
          />

          <div className="flex gap-2 mt-2 flex-wrap">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="w-16 h-16 md:w-20 md:h-20 object-cover border"
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <button
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 py-2 text-sm md:text-base flex justify-center items-center gap-2"
          >
            <FaPlus />
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;