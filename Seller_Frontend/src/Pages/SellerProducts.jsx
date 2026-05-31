import React, {
  useEffect,
  useState,
} from "react";
import axios from "axios";
import {
  FaBoxOpen,
  FaRupeeSign,
  FaMapMarkerAlt,
  FaStar,
  FaTrash,
  FaEdit,
  FaSave,
  FaTimes,
} from "react-icons/fa";

const SellerProducts = () => {
  const [products, setProducts] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [stockModal, setStockModal] =
    useState(false);

  const [
    selectedProduct,
    setSelectedProduct,
  ] = useState(null);

  const [stockValue, setStockValue] =
    useState("");

  const API =
    "https://api.apnapashu.com";

  const fetchProducts =
    async () => {
      try {
        setLoading(true);

        const { data } =
          await axios.get(
            `${API}/api/product/seller-products`,
            {
              withCredentials: true,
            }
          );

        if (data.success) {
          setProducts(
            data.products || []
          );
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  const handleDeleteProduct =
    async (productId) => {
      const confirmDelete =
        window.confirm(
          "Are you sure you want to delete this product?"
        );

      if (!confirmDelete) return;

      try {
        await axios.delete(
          `${API}/api/product/delete/${productId}`,
          {
            withCredentials: true,
          }
        );

        setProducts((prev) =>
          prev.filter(
            (item) =>
              item._id !==
              productId
          )
        );

        alert(
          "Product deleted successfully"
        );
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Delete failed"
        );
      }
    };

  const handleUpdateStock =
    async () => {
      try {
        const { data } =
          await axios.put(
            `${API}/api/product/update-stock/${selectedProduct._id}`,
            {
              stock: Number(
                stockValue
              ),
            },
            {
              withCredentials: true,
            }
          );

        if (data.success) {
          setProducts((prev) =>
            prev.map((item) =>
              item._id ===
              selectedProduct._id
                ? {
                    ...item,
                    stock:
                      Number(
                        stockValue
                      ),
                  }
                : item
            )
          );

          setStockModal(false);
          setSelectedProduct(null);
          setStockValue("");

          alert(
            "Stock updated successfully"
          );
        }
      } catch (error) {
        alert(
          error?.response?.data
            ?.message ||
            "Stock update failed"
        );
      }
    };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-orange-50 py-5 px-3">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}

        <div className="bg-white border-2 border-orange-200 p-4 shadow-sm mb-5">

          <div className="flex justify-between items-center">

            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-orange-700 flex items-center gap-2">
                <FaBoxOpen />
                My Products
              </h1>

              <p className="text-sm text-gray-500 mt-1">
                Manage all your listed products
              </p>
            </div>

          </div>

        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">

          <div className="bg-white border-2 border-orange-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">
              Total Products
            </p>

            <h3 className="text-2xl font-bold text-orange-700">
              {products.length}
            </h3>
          </div>

          <div className="bg-white border-2 border-green-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">
              Active
            </p>

            <h3 className="text-2xl font-bold text-green-600">
              {
                products.filter(
                  (p) => p.isActive
                ).length
              }
            </h3>
          </div>

          <div className="bg-white border-2 border-blue-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">
              Total Stock
            </p>

            <h3 className="text-2xl font-bold text-blue-600">
              {products.reduce(
                (acc, item) =>
                  acc +
                  (item.stock || 0),
                0
              )}
            </h3>
          </div>

          <div className="bg-white border-2 border-yellow-200 p-4 shadow-sm">
            <p className="text-xs text-gray-500">
              Categories
            </p>

            <h3 className="text-2xl font-bold text-yellow-600">
              {
                new Set(
                  products.map(
                    (p) =>
                      p.category
                  )
                ).size
              }
            </h3>
          </div>

        </div>

        {loading ? (
          <div className="bg-white border-2 border-orange-200 p-10 text-center">

            <div className="animate-pulse text-orange-600 font-semibold">
              Loading Products...
            </div>

          </div>
        ) : products.length ===
          0 ? (
          <div className="bg-white border-2 border-orange-200 p-10 text-center">

            <FaBoxOpen
              size={50}
              className="mx-auto text-orange-500"
            />

            <h3 className="font-bold text-xl mt-3">
              No Products Found
            </h3>

            <p className="text-gray-500 mt-1">
              Add your first product
              to start selling
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {products.map(
              (product) => {
                const imageUrl =
                  product.images &&
                  product.images.length >
                    0
                    ? `${API}/${product.images[0].replace(
                        /\\/g,
                        "/"
                      )}`
                    : "https://via.placeholder.com/400x300?text=No+Image";
                                    return (
                  <div
                    key={product._id}
                    className="bg-white border-2 border-orange-200 shadow-sm overflow-hidden hover:shadow-lg transition-all duration-300"
                  >

                    {/* PRODUCT IMAGE */}

                    <div className="h-44 bg-orange-50 overflow-hidden">

                      <img
                        src={imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />

                    </div>

                    {/* PRODUCT CONTENT */}

                    <div className="p-4">

                      <div className="flex justify-between items-start gap-2">

                        <h3 className="font-bold text-gray-800 line-clamp-1">
                          {product.name}
                        </h3>

                        <span
                          className={`text-xs px-2 py-1 font-medium ${
                            product.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {product.isActive
                            ? "Active"
                            : "Inactive"}
                        </span>

                      </div>

                      <p className="text-xs text-gray-500 mt-1">
                        {product.category}
                      </p>

                      <p className="text-sm text-gray-600 mt-3 line-clamp-2 min-h-[40px]">
                        {product.description}
                      </p>

                      {/* PRICE + STOCK */}

                      <div className="mt-4 flex justify-between items-center">

                        <div>

                          <p className="text-xs text-gray-500">
                            Price
                          </p>

                          <h3 className="text-xl font-bold text-orange-600 flex items-center">
                            <FaRupeeSign />
                            {product.price}
                          </h3>

                        </div>

                        <div className="text-right">

                          <p className="text-xs text-gray-500">
                            Stock
                          </p>

                          <span
                            className={`text-sm font-semibold ${
                              product.stock > 10
                                ? "text-green-600"
                                : product.stock > 0
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {product.stock}
                          </span>

                        </div>

                      </div>

                      {/* LOCATION */}

                      <div className="mt-4 flex items-center gap-2 text-sm text-gray-600">

                        <FaMapMarkerAlt className="text-orange-500" />

                        <span>
                          {product.location?.city},{" "}
                          {product.location?.state}
                        </span>

                      </div>

                      {/* RATING */}

                      <div className="mt-3 flex items-center justify-between">

                        <div className="flex items-center gap-1 text-yellow-500">
                          <FaStar />
                          <span className="font-medium text-gray-700">
                            {product.rating || 0}
                          </span>
                        </div>

                        <span className="text-xs text-gray-500">
                          {product.totalReviews || 0} Reviews
                        </span>

                      </div>

                      {/* ACTION BUTTONS */}

                      <div className="mt-4 grid grid-cols-2 gap-2">

                        <button
                          onClick={() => {
                            setSelectedProduct(
                              product
                            );

                            setStockValue(
                              product.stock
                            );

                            setStockModal(
                              true
                            );
                          }}
                          className="bg-orange-500 hover:bg-orange-600 text-white py-2 text-sm flex items-center justify-center gap-2"
                        >
                          <FaEdit />
                          Stock
                        </button>

                        <button
                          onClick={() =>
                            handleDeleteProduct(
                              product._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-600 text-white py-2 text-sm flex items-center justify-center gap-2"
                        >
                          <FaTrash />
                          Delete
                        </button>

                      </div>

                      {/* DATE */}

                      <div className="mt-4 pt-3 border-t border-orange-100">

                        <p className="text-xs text-gray-500">
                          Added on{" "}
                          {new Date(
                            product.createdAt
                          ).toLocaleDateString()}
                        </p>

                      </div>

                    </div>

                  </div>
                );
              }
            )}

          </div>
        )}

      </div>

      {/* STOCK UPDATE MODAL */}

      {stockModal && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center px-4">

          <div className="bg-white border-2 border-orange-300 w-full max-w-sm p-4 shadow-xl">

            <div className="flex justify-between items-center mb-4">

              <h3 className="font-bold text-orange-700">
                Update Stock
              </h3>

              <button
                onClick={() => {
                  setStockModal(false);
                  setSelectedProduct(
                    null
                  );
                  setStockValue("");
                }}
              >
                <FaTimes />
              </button>

            </div>

            <input
              type="number"
              value={stockValue}
              onChange={(e) =>
                setStockValue(
                  e.target.value
                )
              }
              className="w-full border-2 border-orange-200 p-2 outline-none focus:border-orange-500"
              placeholder="Enter stock quantity"
            />

            <button
              onClick={
                handleUpdateStock
              }
              className="w-full mt-3 bg-orange-500 hover:bg-orange-600 text-white py-2 flex justify-center items-center gap-2"
            >
              <FaSave />
              Save Stock
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default SellerProducts;