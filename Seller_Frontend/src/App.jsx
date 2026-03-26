import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SellerRegister from "./Auth/Register";
import { Toaster } from "react-hot-toast";
import SellerLogin from "./Auth/Login";
import SellerDashboard from "./Pages/SellerDashboard";
import SellerHome from "./Pages/SellerHome";

// 🔹 Seller Pages


const App = () => {
  return (
    <>
    <Toaster position="top-right" />
    <Router>
      <Routes>
        {/* 🔹 Seller Routes */}
        <Route path="/" element={<SellerHome />} />
        <Route path="/seller/register" element={<SellerRegister />} />
        <Route path="/seller/login" element={<SellerLogin />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />

        {/* 🔹 Default Route */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
    </>
  );
};

export default App;