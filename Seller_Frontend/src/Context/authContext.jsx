import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// 🔥 create context
const SellerContext = createContext();

// 🔥 axios instance (best practice)
const api = axios.create({
  baseURL: "https://api.apnapashu.com" ,
  withCredentials: true, // cookie auto send
});

export const SellerProvider = ({ children }) => {
  const [seller, setSeller] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ fetch logged-in seller
  const fetchSeller = async () => {
    try {
      const res = await api.get("/api/seller/auth/me");
      setSeller(res.data.seller);
    } catch (error) {
      setSeller(null);
    } finally {
      setLoading(false);
    }
  };

  // ✅ login
  const loginSeller = async (formData) => {
    try {
      const res = await api.post("/api/seller/login", formData);
      await fetchSeller(); // 🔥 refresh state
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  // ✅ register
  const registerSeller = async (formData) => {
    try {
      const res = await api.post("/api/seller/register", formData);
      await fetchSeller(); // 🔥 auto login after register
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Register failed",
      };
    }
  };

  // ✅ logout
  const logoutSeller = async () => {
    try {
      await api.post("/api/seller/logout");
      setSeller(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  // ✅ auto run on app load
  useEffect(() => {
    fetchSeller();
  }, []);

  return (
    <SellerContext.Provider
      value={{
        seller,
        loading,
        loginSeller,
        registerSeller,
        logoutSeller,
        fetchSeller,
      }}
    >
      {children}
    </SellerContext.Provider>
  );
};

// 🔥 custom hook
export const useSeller = () => useContext(SellerContext);