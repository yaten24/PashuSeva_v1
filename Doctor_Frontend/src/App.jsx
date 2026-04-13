import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DoctorHome from "./Pages/DoctorHome";
import DoctorRegister from "./Auth/Register";
import DoctorLogin from "./Auth/DoctorLogin";
import DoctorDashboard from "./Pages/DoctorDashboard";
import DoctorPublicRoute from "./routes/DoctorPublicRoute";
import DoctorProtectedRoute from "./routes/DoctorProtectedRoute";
import DoctorAppointments from "./Pages/DoctorAppointments";
import DoctorProfile from "./Pages/DoctorProfile";

// 🔹 Seller Pages

const App = () => {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          {/* 🔹 Doctor Routes */}

          {/* 🔥 PUBLIC ROUTES */}
          <Route
            path="/"
            element={
              <DoctorPublicRoute>
                <DoctorHome />
              </DoctorPublicRoute>
            }
          />
          <Route
            path="/doctor/register"
            element={
              <DoctorPublicRoute>
                <DoctorRegister />
              </DoctorPublicRoute>
            }
          />

          <Route
            path="/doctor/login"
            element={
              <DoctorPublicRoute>
                <DoctorLogin />
              </DoctorPublicRoute>
            }
          />

          {/* 🔥 PROTECTED ROUTES */}
          <Route
            path="/doctor/dashboard"
            element={
              <DoctorProtectedRoute>
                <DoctorDashboard />
              </DoctorProtectedRoute>
            }
          />
          <Route
            path="/doctor/appointments"
            element={
              <DoctorProtectedRoute>
                <DoctorAppointments />
              </DoctorProtectedRoute>
            }
          />
          <Route
            path="/doctor/profile"
            element={
              <DoctorProtectedRoute>
                <DoctorProfile />
              </DoctorProtectedRoute>
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
