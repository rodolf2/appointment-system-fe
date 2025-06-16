import { Navigate, useLocation } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";
import { useEffect, useState } from "react";
import axios from "axios";

const ProtectedRoute = ({ children }) => {
  const { user } = useUser();
  const location = useLocation();
  const [isValidating, setIsValidating] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const validateAuthentication = async () => {
      try {
        // Check if user data exists in context
        if (!user) {
          setIsAuthenticated(false);
          setIsValidating(false);
          return;
        }

        // Check if token exists in localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          setIsAuthenticated(false);
          setIsValidating(false);
          return;
        }

        // Set axios authorization header if not already set
        if (!axios.defaults.headers.common["Authorization"]) {
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        }

        // Validate token by making a test API call
        try {
          // Use a lightweight endpoint to validate token
          const response = await axios.get(
            `${import.meta.env.VITE_API_URL}/api/profile/${user.id}`
          );

          if (response.status === 200) {
            setIsAuthenticated(true);
          } else {
            throw new Error("Invalid response status");
          }
        } catch (error) {
          // Token is invalid or expired
          console.error("Token validation failed:", error);

          // Clear invalid authentication data
          localStorage.removeItem("token");
          localStorage.removeItem("userData");
          localStorage.removeItem("user");
          delete axios.defaults.headers.common["Authorization"];

          // Also clear user context
          if (typeof window !== "undefined") {
            // Trigger a context update by dispatching a custom event
            window.dispatchEvent(new CustomEvent("auth-expired"));
          }

          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication validation error:", error);
        setIsAuthenticated(false);
      } finally {
        setIsValidating(false);
      }
    };

    validateAuthentication();
  }, [user]);

  // Show loading state while validating
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#161f55] mx-auto"></div>
          <p className="mt-4 text-gray-600">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to signin if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/signin" state={{ from: location }} replace />;
  }

  // Render protected component if authenticated
  return children;
};

export default ProtectedRoute;
