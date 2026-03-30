import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { Toaster } from "react-hot-toast";
// Public pages
import Home from "./pages/Home";
import About from "./pages/About";

// Auth (OUTSIDE layout)
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Core modules
import Marketplace from "./pages/Marketplace";
import ProductDetails from "./pages/ProductDetails";
import Doctors from "./pages/Doctors";
import Premium from "./pages/Premium";
import Dashboard from "./pages/Dashboard";
import Consultations from "./pages/Consultations";

// Seller module
import SellerProducts from "./pages/seller/SellerProducts";
import ProductForm from "./pages/seller/ProductForm";

// Doctor module
import DoctorProfile from "./pages/doctor/DoctorProfile";

// Admin module
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminVerifyDoctors from "./pages/admin/AdminVerifyDoctors";
import AdminModerateProducts from "./pages/admin/AdminModerateProducts";
import AdminSubscriptions from "./pages/admin/AdminSubscriptions";

// Guards
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleRoute from "./routes/RoleRoute";
import AdminRoute from "./routes/AdminRoute";

// 404
import NotFound from "./pages/NotFound";

export default function App() {
  return (
    <>
    <Toaster position="top-right" />
    <BrowserRouter>
      <Routes>

        {/* 🔥 AUTH PAGES (NO LAYOUT) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* 🔥 MAIN APP (WITH LAYOUT) */}
        <Route path="/" element={<Layout />}>

          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />

          {/* Marketplace */}
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/product/:id" element={<ProductDetails />} />

          {/* Doctors */}
          <Route path="/doctors" element={<Doctors />} />

          {/* Protected */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/premium"
            element={
              <ProtectedRoute>
                <Premium />
              </ProtectedRoute>
            }
          />

          <Route
            path="/consultations"
            element={
              <ProtectedRoute>
                <Consultations />
              </ProtectedRoute>
            }
          />

          {/* Seller */}
          <Route
            path="/seller/products"
            element={
              <RoleRoute allow={["seller"]}>
                <SellerProducts />
              </RoleRoute>
            }
          />

          <Route
            path="/seller/products/new"
            element={
              <RoleRoute allow={["seller"]}>
                <ProductForm mode="create" />
              </RoleRoute>
            }
          />

          <Route
            path="/seller/products/:id/edit"
            element={
              <RoleRoute allow={["seller"]}>
                <ProductForm mode="edit" />
              </RoleRoute>
            }
          />

          {/* Doctor */}
          <Route
            path="/doctor/profile"
            element={
              <RoleRoute allow={["doctor"]}>
                <DoctorProfile />
              </RoleRoute>
            }
          />

          {/* Admin */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/doctors"
            element={
              <AdminRoute>
                <AdminVerifyDoctors />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/products"
            element={
              <AdminRoute>
                <AdminModerateProducts />
              </AdminRoute>
            }
          />

          <Route
            path="/admin/subscriptions"
            element={
              <AdminRoute>
                <AdminSubscriptions />
              </AdminRoute>
            }
          />

          {/* 404 inside layout */}
          <Route path="*" element={<NotFound />} />
        </Route>

        {/* global 404 */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
    </>
  );
}