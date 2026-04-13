import { Navigate } from "react-router-dom";
import { useDoctorAuth } from "../Context/DoctorAuthContext";

const DoctorPublicRoute = ({ children }) => {
  const { doctor, loading } = useDoctorAuth();

  // 🔥 Loading
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // 🔥 Already logged in → redirect dashboard
  if (doctor) {
    return <Navigate to="/doctor/dashboard" replace />;
  }

  return children;
};

export default DoctorPublicRoute;