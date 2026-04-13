import { Navigate } from "react-router-dom";
import { useSeller } from "../Context/authContext";

const PublicRoute = ({ children }) => {
  const { seller, loading } = useSeller();

  if (loading) return <p>Loading...</p>;

  return seller ? <Navigate to="/seller/dashboard" /> : children;
};

export default PublicRoute;