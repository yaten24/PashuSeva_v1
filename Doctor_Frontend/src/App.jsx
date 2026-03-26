import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DoctorHome from "./Pages/DoctorHome";
import DoctorRegister from "./Auth/Register";
import DoctorLogin from "./Auth/DoctorLogin";
import DoctorDashboard from "./Pages/DoctorDashboard";

// 🔹 Seller Pages


const App = () => {
  return (
    <>
    <Toaster position="top-right" />
    <Router>
      <Routes>
        {/* 🔹 Doctor Routes */}
        <Route path="/" element={<DoctorHome />} />
        <Route path="/doctor/register" element={<DoctorRegister />} />
        <Route path="/doctor/login" element={<DoctorLogin />} />
        <Route path="/doctor/dashboard" element={<DoctorDashboard />} />

        {/* 🔹 Default Route */}
        <Route path="*" element={<h1>Page Not Found</h1>} />
      </Routes>
    </Router>
    </>
  );
};

export default App;