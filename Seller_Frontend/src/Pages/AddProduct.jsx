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

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const res = await axios.post(
          "https://countriesnow.space/api/v0.1/countries/states",
          {
            country: "India",
          }
        );

        setStates(res.data.data.states);
      } catch (error) {
        console.log(error);
      }
    };

    fetchStates();
  }, []);

  const fetchCities = async (
    stateName
  ) => {
    try {
      const res = await axios.post(
        "https://countriesnow.space/api/v0.1/countries/state/cities",
        {
          country: "India",
          state: stateName,
        }
      );

      setCities(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "state") {
      fetchCities(value);

      setFormData((prev) => ({
        ...prev,
        city: "",
        state: value,
      }));
    }
  };

  const handleImageChange = (
    e
  ) => {
    setImages(
      Array.from(e.target.files)
    );
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data =
        new FormData();

      Object.keys(
        formData
      ).forEach((key) => {
        data.append(
          key,
          formData[key]
        );
      });

      images.forEach((img) =>
        data.append(
          "images",
          img
        )
      );

      await axios.post(
        "https://api.apnapashu.com/api/seller/product/create",
        data,
        {
          withCredentials: true,
        }
      );

      alert(
        "✅ Product Added Successfully"
      );

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
    } catch (error) {
      alert(
        "❌ Failed To Add Product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-orange-50 py-5 px-3">

      <div className="max-w-5xl mx-auto">

        <div className="bg-white border-2 border-orange-200 p-4 shadow-sm mb-5">

          <h1 className="text-2xl md:text-3xl font-bold text-orange-700">
            Add Product
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Add new products to your marketplace
          </p>

        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white border-2 border-orange-200 shadow-sm p-4 md:p-5"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* PRODUCT NAME */}

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaBox />
                Product Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 border-2 border-orange-200 p-2 outline-none focus:border-orange-500"
              />
            </div>

            {/* CATEGORY */}

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaTag />
                Category
              </label>

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full mt-1 border-2 border-orange-200 p-2 outline-none focus:border-orange-500"
              >
                <option value="">
                  Select Category
                </option>

                {categories.map(
                  (c, i) => (
                    <option
                      key={i}
                    >
                      {c}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* PRICE */}

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaRupeeSign />
                Price
              </label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="w-full mt-1 border-2 border-orange-200 p-2 outline-none focus:border-orange-500"
              />
            </div>

            {/* STOCK */}

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaLayerGroup />
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                required
                className="w-full mt-1 border-2 border-orange-200 p-2 outline-none focus:border-orange-500"
              />
            </div>

            {/* STATE */}

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaMapMarkerAlt />
                State
              </label>

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
                className="w-full mt-1 border-2 border-orange-200 p-2 outline-none focus:border-orange-500"
              >
                <option value="">
                  Select State
                </option>

                {states.map(
                  (s, i) => (
                    <option
                      key={i}
                    >
                      {s.name}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* CITY */}

            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <FaMapMarkerAlt />
                City
              </label>

              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
                className="w-full mt-1 border-2 border-orange-200 p-2 outline-none focus:border-orange-500"
              >
                <option value="">
                  Select City
                </option>

                {cities.map(
                  (c, i) => (
                    <option
                      key={i}
                    >
                      {c}
                    </option>
                  )
                )}
              </select>
            </div>
                        {/* DESCRIPTION */}

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700">
                Product Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Write detailed product description..."
                className="w-full mt-1 border-2 border-orange-200 p-3 outline-none focus:border-orange-500 resize-none"
              />
            </div>

            {/* IMAGE UPLOAD */}

            <div className="md:col-span-2">

              <label className="text-sm font-medium text-gray-700 flex items-center gap-2 mb-2">
                <FaImage />
                Product Images
              </label>

              <label className="border-2 border-dashed border-orange-300 bg-orange-50 hover:bg-orange-100 transition cursor-pointer p-6 flex flex-col items-center justify-center">

                <FaImage
                  size={30}
                  className="text-orange-500 mb-2"
                />

                <p className="text-sm font-medium text-orange-700">
                  Click to Upload Images
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  Multiple images supported
                </p>

                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />

              </label>

              {/* IMAGE PREVIEW */}

              {images.length > 0 && (
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3 mt-4">

                  {images.map((img, index) => (
                    <div
                      key={index}
                      className="border-2 border-orange-200 bg-white p-1"
                    >
                      <img
                        src={URL.createObjectURL(img)}
                        alt="preview"
                        className="w-full h-20 object-cover"
                      />
                    </div>
                  ))}

                </div>
              )}

            </div>

          </div>

          {/* SUBMIT BUTTON */}

          <div className="mt-5">

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white py-3 font-semibold flex items-center justify-center gap-2 transition"
            >
              <FaPlus />

              {loading
                ? "Adding Product..."
                : "Add Product"}
            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default AddProduct;