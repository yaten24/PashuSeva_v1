import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SellerRegister from "./Auth/Register";
import { Toaster } from "react-hot-toast";
import SellerLogin from "./Auth/Login";
import SellerDashboard from "./Pages/SellerDashboard";
import SellerHome from "./Pages/SellerHome";
import AddProduct from "./Pages/AddProduct";
import SellerProfile from "./Pages/SellerProfilePage";
import ProtectedRoute from "./route/ProtectedRoute";
import PublicRoute from "./route/PublicRoute";
import ComingSoon from "./Pages/ComingSoon";

// 🔹 Seller Pages

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          {/* 🔹 Seller Routes */}
          <Route
            path="/"
            element={
              <PublicRoute>
                <SellerHome />
              </PublicRoute>
            }
          />
          <Route
            path="/seller/register"
            element={
              <PublicRoute>
                <SellerRegister />
              </PublicRoute>
            }
          />
          <Route
            path="/seller/login"
            element={
              <PublicRoute>
                <SellerLogin />
              </PublicRoute>
            }
          />
          <Route
            path="/seller/dashboard"
            element={
              <ProtectedRoute>
                <SellerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/products"
            element={
              <ProtectedRoute>
                <ComingSoon />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/orders"
            element={
              <ProtectedRoute>
                <ComingSoon />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/add-product"
            element={
              <ProtectedRoute>
                <AddProduct />
              </ProtectedRoute>
            }
          />
          <Route
            path="/seller/profile"
            element={
              <ProtectedRoute>
                <SellerProfile />
              </ProtectedRoute>
            }
          />

          {/* 🔹 Default Route */}
          <Route path="*" element={<h1>Page Not Found</h1>} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
