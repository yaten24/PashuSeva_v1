import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AdminRoute({ children }) {
  const { isAuthenticated, user } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return <Navigate to="/dashboard" replace state={{ from: location.pathname }} />;
  if (user?.role !== "admin") return <Navigate to="/dashboard" replace />;

  return children;
}
