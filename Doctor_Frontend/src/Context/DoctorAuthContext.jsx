import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const DoctorAuthContext = createContext();

export const DoctorAuthProvider = ({ children }) => {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL || "https://api.apnapashu.com";

  // 🔥 FETCH LOGGED-IN DOCTOR
  const fetchDoctor = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/doctor/auth/me`, {
        withCredentials: true,
      });

      if (res.data.success) {
        setDoctor(res.data.doctor);
      }
    } catch (err) {
      setDoctor(null);
    } finally {
      setLoading(false);
    }
  };

  // 🔥 REGISTER FUNCTION
  const registerDoctor = async (formData) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/doctor/register`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        // 🔥 OPTION 1: Auto login after register
        // setDoctor(res.data.doctor);

        // 🔥 OPTION 2 (Recommended): No login until approval
        return {
          success: true,
          message: res.data.message || "Registered successfully",
        };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Registration failed",
      };
    }
  };

  // 🔥 LOGIN FUNCTION
  const loginDoctor = async (formData) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/doctor/login`,
        formData,
        { withCredentials: true }
      );

      if (res.data.success) {
        setDoctor(res.data.doctor);
        return { success: true };
      }
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // 🔥 LOGOUT FUNCTION
  const logoutDoctor = async () => {
    try {
      await axios.post(
        `${API_URL}/api/doctor/logout`,
        {},
        { withCredentials: true }
      );
      setDoctor(null);
    } catch (err) {
      console.error("Logout error", err);
    }
  };

  // 🔥 AUTO LOAD USER
  useEffect(() => {
    fetchDoctor();
  }, []);

  return (
    <DoctorAuthContext.Provider
      value={{
        doctor,
        setDoctor,
        registerDoctor, // ✅ added
        loginDoctor,
        logoutDoctor,
        loading,
      }}
    >
      {children}
    </DoctorAuthContext.Provider>
  );
};

// 🔥 CUSTOM HOOK
export const useDoctorAuth = () => useContext(DoctorAuthContext);