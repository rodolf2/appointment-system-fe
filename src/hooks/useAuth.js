import { useEffect } from "react";
import { useUser } from "../context/UserContext.jsx";
import axios from "axios";

const useAuth = () => {
  const { user, updateUser, logout } = useUser();

  // Initialize authentication on app startup
  useEffect(() => {
    const initializeAuth = () => {
      try {
        // Get token from localStorage
        const token = localStorage.getItem("token");
        
        if (token) {
          // Set axios default authorization header
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
          
          // If user context is empty but token exists, try to restore user data
          if (!user) {
            const userData = localStorage.getItem("userData");
            const userDataAlt = localStorage.getItem("user"); // Alternative storage key
            
            if (userData) {
              try {
                const parsedUserData = JSON.parse(userData);
                updateUser(parsedUserData);
              } catch (error) {
                console.error("Error parsing userData:", error);
              }
            } else if (userDataAlt) {
              try {
                const parsedUserData = JSON.parse(userDataAlt);
                updateUser(parsedUserData);
              } catch (error) {
                console.error("Error parsing user data (alt):", error);
              }
            }
          }
        } else {
          // No token found, clear any existing auth headers
          delete axios.defaults.headers.common["Authorization"];
        }
      } catch (error) {
        console.error("Error initializing authentication:", error);
      }
    };

    initializeAuth();
  }, []); // Run only once on mount

  // Check if user is authenticated
  const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!(user && token);
  };

  // Check if token exists (regardless of user context)
  const hasToken = () => {
    return !!localStorage.getItem("token");
  };

  // Clear all authentication data
  const clearAuth = () => {
    try {
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      localStorage.removeItem("user");
      
      // Clear axios headers
      delete axios.defaults.headers.common["Authorization"];
      
      // Clear user context
      logout();
    } catch (error) {
      console.error("Error clearing authentication:", error);
    }
  };

  // Validate token with server
  const validateToken = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token || !user?.id) {
        return false;
      }

      // Make a test API call to validate token
      await axios.get(`${import.meta.env.VITE_API_URL}/api/profile/${user.id}`);
      return true;
    } catch (error) {
      console.error("Token validation failed:", error);
      // Clear invalid authentication data
      clearAuth();
      return false;
    }
  };

  return {
    user,
    isAuthenticated,
    hasToken,
    clearAuth,
    validateToken,
  };
};

export default useAuth;
