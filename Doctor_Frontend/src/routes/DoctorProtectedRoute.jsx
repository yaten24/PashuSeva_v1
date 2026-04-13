import { Navigate } from "react-router-dom";
import { useDoctorAuth } from "../Context/DoctorAuthContext";

const DoctorProtectedRoute = ({ children }) => {
  const { doctor, loading } = useDoctorAuth();

  // 🔥 Loading state
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  // 🔥 Not logged in
  if (!doctor) {
    return <Navigate to="/doctor/login" replace />;
  }

  return children;
};

export default DoctorProtectedRoute;