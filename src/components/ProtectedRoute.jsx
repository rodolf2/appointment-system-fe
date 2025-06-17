import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { useEffect } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();

  useEffect(() => {
    // Set axios authorization header if token exists
    const token = localStorage.getItem("token");
    if (token && !axios.defaults.headers.common["Authorization"]) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, []);

  // Simple check: if user and token exist, allow access immediately
  const token = localStorage.getItem("token");
  const isAuthenticated = user && token;

  // Redirect to signin if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Render protected component immediately - no verification needed
  return children;
};

export default ProtectedRoute;
