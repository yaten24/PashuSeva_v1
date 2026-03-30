import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, MapPin } from "lucide-react";
import axios from "axios";

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
      {
        country: "India",
        state: stateName,
      }
    );
    setCities(res.data.data);
  };

  // Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "state") {
      fetchCities(value);
      setFormData((prev) => ({ ...prev, city: "" }));
    }
  };

  // Images
  const handleImageChange = (e) => {
    setImages(Array.from(e.target.files));
  };

  // 🔥 Submit to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      // append fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // append images
      images.forEach((img) => {
        data.append("images", img);
      });

      const token = localStorage.getItem("token"); // JWT

      const res = await axios.post(
        "http://localhost:5000/api/seller/product/create",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(res.data);

      alert("✅ Product Added Successfully");

      // reset form
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

    } catch (err) {
      console.error(err);
      alert("❌ Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">

      <motion.h1 className="text-3xl font-bold mb-6">
        Add New Product 🐄
      </motion.h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white/10 p-6 border border-white/20"
      >

        {/* Name */}
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-transparent border"
          />
        </div>

        {/* Category */}
        <div>
          <label>Category</label>
          <select
            name="category"
            required
            value={formData.category}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-gray-800 border"
          >
            <option value="">Select Category</option>
            {categories.map((cat, i) => (
              <option key={i}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label>Price</label>
          <input
            type="number"
            name="price"
            required
            value={formData.price}
            onChange={handleChange}
            className="w-full mt-1 p-2 border"
          />
        </div>

        {/* Stock */}
        <div>
          <label>Stock</label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full mt-1 p-2 border"
          />
        </div>

        {/* State */}
        <div>
          <label>State</label>
          <select
            name="state"
            required
            value={formData.state}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-gray-800 border"
          >
            <option value="">Select State</option>
            {states.map((s, i) => (
              <option key={i} value={s.name}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* City */}
        <div>
          <label>City</label>
          <select
            name="city"
            required
            value={formData.city}
            onChange={handleChange}
            className="w-full mt-1 p-2 bg-gray-800 border"
          >
            <option value="">Select City</option>
            {cities.map((c, i) => (
              <option key={i}>{c}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div className="md:col-span-2">
          <label>Description</label>
          <textarea
            name="description"
            rows="4"
            value={formData.description}
            onChange={handleChange}
            className="w-full mt-1 p-2 border"
          />
        </div>

        {/* Images */}
        <div className="md:col-span-2">
          <label>Upload Images</label>
          <input type="file" multiple onChange={handleImageChange} />

          <div className="flex gap-2 mt-2">
            {images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                className="w-20 h-20 object-cover"
              />
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="md:col-span-2 text-center">
          <button
            disabled={loading}
            className="bg-green-500 px-8 py-2 font-semibold"
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
        </div>

      </form>
    </div>
  );
};

export default AddProduct;