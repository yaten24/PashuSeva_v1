import { Navigate } from "react-router-dom";
import { useSeller } from "../Context/authContext";

const ProtectedRoute = ({ children }) => {
  const { seller, loading } = useSeller();

  if (loading) return <p>Loading...</p>;

  return seller ? children : <Navigate to="/seller/login" />;
};

export default ProtectedRoute;