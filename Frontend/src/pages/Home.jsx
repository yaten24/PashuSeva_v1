import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import axios from "axios";

import {
  Link,
  useNavigate,
} from "react-router-dom";

import {
  FaArrowRight,
  FaSearch,
  FaBoxOpen,
  FaUserMd,
  FaShieldAlt,
  FaTruck,
} from "react-icons/fa";

const categories = [
  {
    title: "Animal",
    value: "Animal",
  },
  {
    title: "Feed",
    value: "Feed",
  },
  {
    title: "Bhusa",
    value: "Bhusa",
  },
  {
    title: "Chara",
    value: "Chara",
  },
  {
    title: "Medicine",
    value: "Medicine",
  },
  {
    title: "Equipment",
    value: "Equipment",
  },
];

function truncate(
  text,
  length = 80
) {
  if (!text) return "";

  return text.length > length
    ? text.substring(
        0,
        length
      ) + "..."
    : text;
}

const Home = () => {
  const navigate =
    useNavigate();

  const API =
    "https://api.apnapashu.com";

  const [loading, setLoading] =
    useState(true);

  const [products, setProducts] =
    useState([]);

  const [doctors, setDoctors] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [category, setCategory] =
    useState("");

  const fetchHomeData =
    async () => {
      try {
        setLoading(true);

        const [
          productRes,
          doctorRes,
        ] =
          await Promise.all([
            axios.get(
              `${API}/api/product/home-products`
            ),

            axios.get(
              `${API}/api/doctor/home-doctors`
            ),
          ]);

        if (
          productRes.data.success
        ) {
          setProducts(
            productRes.data
              .products || []
          );
        }

        if (
          doctorRes.data.success
        ) {
          setDoctors(
            doctorRes.data
              .doctors || []
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  useEffect(() => {
    fetchHomeData();
  }, []);

  const stats = useMemo(
    () => [
      {
        title:
          "Products",
        value:
          products.length,
      },
      {
        title:
          "Doctors",
        value:
          doctors.length,
      },
      {
        title:
          "Trusted Platform",
        value: "100%",
      },
      {
        title:
          "Support",
        value: "24/7",
      },
    ],
    [products, doctors]
  );

  const handleSearch =
    () => {
      const params =
        new URLSearchParams();

      if (
        search.trim()
      ) {
        params.append(
          "q",
          search
        );
      }

      if (category) {
        params.append(
          "category",
          category
        );
      }

      navigate(
        `/marketplace?${params.toString()}`
      );
    };

  return (
    <div className="min-h-screen bg-orange-50">

      {/* HERO SECTION */}

      <section className="bg-gradient-to-r from-orange-700 via-orange-600 to-amber-500">

        <div className="max-w-7xl mx-auto px-4 py-14">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            {/* LEFT */}

            <div>

              <span className="inline-block px-4 py-1 text-xs font-semibold bg-white/20 text-white">
                PashuSeva Marketplace
              </span>

              <h1 className="mt-5 text-4xl md:text-5xl font-extrabold text-white leading-tight">

                Buy Products,
                Consult Doctors &
                Grow Your Livestock Business

              </h1>

              <p className="mt-4 text-orange-100 max-w-xl">

                India's modern
                livestock marketplace
                for farmers,
                sellers and
                veterinary doctors.

              </p>

              <div className="flex flex-wrap gap-3 mt-6">

                <Link
                  to="/marketplace"
                  className="bg-white text-orange-700 px-6 py-3 font-semibold"
                >
                  Explore Marketplace
                </Link>

                <Link
                  to="/doctors"
                  className="border border-white text-white px-6 py-3 font-semibold"
                >
                  Find Doctors
                </Link>

              </div>

            </div>

            {/* SEARCH CARD */}

            <div className="bg-white border-2 border-orange-200 p-5 shadow-xl">

              <h3 className="text-xl font-bold text-gray-800">
                Quick Search
              </h3>

              <div className="mt-4 space-y-3">

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search products..."
                  className="w-full border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
                />

                <select
                  value={category}
                  onChange={(e) =>
                    setCategory(
                      e.target.value
                    )
                  }
                  className="w-full border border-orange-200 px-4 py-3 outline-none focus:border-orange-500"
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map(
                    (item) => (
                      <option
                        key={
                          item.value
                        }
                        value={
                          item.value
                        }
                      >
                        {
                          item.title
                        }
                      </option>
                    )
                  )}
                </select>

                <button
                  onClick={
                    handleSearch
                  }
                  className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 font-semibold flex items-center justify-center gap-2"
                >
                  <FaSearch />
                  Search Now
                </button>

              </div>

            </div>

          </div>
                    {/* STATS */}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-10">

            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white/10 border border-white/20 p-4"
              >
                <h3 className="text-2xl font-bold text-white">
                  {item.value}
                </h3>

                <p className="text-orange-100 text-sm">
                  {item.title}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

      {/* CATEGORIES */}

      <section className="max-w-7xl mx-auto px-4 py-10">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Popular Categories
          </h2>

        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">

          {categories.map((item) => (
            <div
              key={item.value}
              onClick={() =>
                navigate(
                  `/marketplace?category=${item.value}`
                )
              }
              className="cursor-pointer bg-white border-2 border-orange-200 p-5 text-center hover:border-orange-500 hover:shadow-md transition"
            >

              <FaBoxOpen
                className="mx-auto text-orange-600"
                size={30}
              />

              <h3 className="mt-3 font-semibold text-gray-800">
                {item.title}
              </h3>

            </div>
          ))}

        </div>

      </section>

      {/* LATEST PRODUCTS */}

      <section className="max-w-7xl mx-auto px-4 py-4">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Latest Products
          </h2>

          <Link
            to="/marketplace"
            className="text-orange-600 font-semibold flex items-center gap-2"
          >
            View All
            <FaArrowRight />
          </Link>

        </div>

        {loading ? (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="bg-white border-2 border-orange-100 p-4 animate-pulse"
              >
                <div className="h-48 bg-orange-100" />

                <div className="h-4 bg-orange-100 mt-3" />

                <div className="h-4 bg-orange-100 mt-2 w-2/3" />

              </div>
            ))}

          </div>

        ) : products.length === 0 ? (

          <div className="bg-white border-2 border-orange-200 p-8 text-center">

            <h3 className="font-bold text-lg">
              No Products Found
            </h3>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">

            {products.map((product) => {

              const imageUrl =
                product.images?.length > 0
                  ? `${API}/${product.images[0].replace(
                      /\\/g,
                      "/"
                    )}`
                  : "https://via.placeholder.com/400";

              return (
                <div
                  key={product._id}
                  className="bg-white border-2 border-orange-200 shadow-sm hover:shadow-lg transition"
                >

                  <div className="h-52 overflow-hidden">

                    <img
                      src={imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />

                  </div>

                  <div className="p-4">

                    <div className="flex justify-between items-start gap-2">

                      <h3 className="font-bold text-gray-800">
                        {product.name}
                      </h3>

                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1">
                        {product.category}
                      </span>

                    </div>

                    <p className="text-sm text-gray-500 mt-2 line-clamp-2">

                      {truncate(
                        product.description,
                        70
                      )}

                    </p>

                    <div className="flex justify-between items-center mt-4">

                      <h3 className="text-xl font-bold text-green-600">
                        ₹{product.price}
                      </h3>

                      <span className="text-xs text-gray-500">
                        {product.location?.city}
                      </span>

                    </div>

                    <Link
                      to={`/product/${product._id}`}
                      className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 flex justify-center items-center gap-2"
                    >
                      View Product
                      <FaArrowRight />
                    </Link>

                  </div>

                </div>
              );
            })}

          </div>

        )}
      </section>
            {/* VERIFIED DOCTORS */}

      <section className="max-w-7xl mx-auto px-4 py-10">

        <div className="flex items-center justify-between mb-6">

          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Verified Doctors
          </h2>

          <Link
            to="/doctors"
            className="text-orange-600 font-semibold flex items-center gap-2"
          >
            View All
            <FaArrowRight />
          </Link>

        </div>

        {loading ? (

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="bg-white border-2 border-orange-100 p-5 animate-pulse"
              >
                <div className="w-20 h-20 bg-orange-100 mx-auto" />

                <div className="h-4 bg-orange-100 mt-4" />

                <div className="h-4 bg-orange-100 mt-2 w-2/3 mx-auto" />

              </div>
            ))}

          </div>

        ) : doctors.length === 0 ? (

          <div className="bg-white border-2 border-orange-200 p-8 text-center">

            <h3 className="font-bold text-lg">
              No Verified Doctors Found
            </h3>

          </div>

        ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {doctors.map((doctor) => {

              const imageUrl =
                doctor.profileImage
                  ? `${API}/${doctor.profileImage.replace(
                      /\\/g,
                      "/"
                    )}`
                  : null;

              return (
                <div
                  key={doctor._id}
                  className="bg-white border-2 border-orange-200 p-5 shadow-sm hover:shadow-lg transition"
                >

                  <div className="text-center">

                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt={doctor.name}
                        className="w-24 h-24 object-cover mx-auto border-2 border-orange-200"
                      />
                    ) : (
                      <div className="w-24 h-24 mx-auto bg-orange-100 flex items-center justify-center">
                        <FaUserMd
                          size={36}
                          className="text-orange-600"
                        />
                      </div>
                    )}

                    <h3 className="font-bold text-lg mt-4 text-gray-800">
                      {doctor.name}
                    </h3>

                    <p className="text-sm text-gray-500 mt-1">
                      {doctor.specialization ||
                        "Veterinary Doctor"}
                    </p>

                    <p className="text-sm text-gray-500 mt-1">
                      Experience:
                      {" "}
                      {doctor.experienceYears || 0}
                      {" "}
                      Years
                    </p>

                    <span className="inline-block mt-3 bg-green-100 text-green-700 text-xs px-3 py-1">
                      Verified Doctor
                    </span>

                    <Link
                      to={`/doctor/${doctor._id}`}
                      className="mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 flex justify-center items-center gap-2"
                    >
                      Book Appointment
                    </Link>

                  </div>

                </div>
              );
            })}

          </div>

        )}

      </section>

      {/* WHY PASHUSEVA */}

      <section className="max-w-7xl mx-auto px-4 py-10">

        <div className="text-center mb-8">

          <h2 className="text-3xl font-bold text-gray-800">
            Why Choose PashuSeva?
          </h2>

          <p className="text-gray-500 mt-2">
            Everything you need for your livestock business in one platform.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

          <div className="bg-white border-2 border-orange-200 p-6 text-center">

            <FaShieldAlt
              size={40}
              className="mx-auto text-orange-600"
            />

            <h3 className="font-bold mt-4">
              Trusted Platform
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Verified sellers and doctors for secure transactions.
            </p>

          </div>

          <div className="bg-white border-2 border-orange-200 p-6 text-center">

            <FaUserMd
              size={40}
              className="mx-auto text-orange-600"
            />

            <h3 className="font-bold mt-4">
              Verified Doctors
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Book appointments with experienced veterinary doctors.
            </p>

          </div>

          <div className="bg-white border-2 border-orange-200 p-6 text-center">

            <FaTruck
              size={40}
              className="mx-auto text-orange-600"
            />

            <h3 className="font-bold mt-4">
              Easy Marketplace
            </h3>

            <p className="text-sm text-gray-500 mt-2">
              Buy and sell livestock products easily across India.
            </p>

          </div>

        </div>

      </section>

      {/* CTA */}

      <section className="max-w-7xl mx-auto px-4 pb-12">

        <div className="bg-gradient-to-r from-orange-600 to-orange-500 p-8 text-center">

          <h2 className="text-3xl font-bold text-white">
            Ready to Grow Your Livestock Business?
          </h2>

          <p className="text-orange-100 mt-3">
            Join thousands of farmers, sellers and doctors on PashuSeva.
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-6">

            <Link
              to="/register"
              className="bg-white text-orange-700 px-6 py-3 font-semibold"
            >
              Get Started
            </Link>

            <Link
              to="/marketplace"
              className="border border-white text-white px-6 py-3 font-semibold"
            >
              Browse Marketplace
            </Link>

          </div>

        </div>

      </section>

    </div>
  );
};

export default Home;