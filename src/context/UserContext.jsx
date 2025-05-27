import { createContext, useContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create the context with a default value
export const UserContext = createContext({
  user: null,
  updateUser: () => {},
  logout: () => {},
});

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Try to get user data from localStorage on initial load
    const userData = localStorage.getItem("userData");
    if (userData) {
      try {
        return JSON.parse(userData);
      } catch (error) {
        console.error("Error parsing user data:", error);
        return null;
      }
    }
    return null;
  });

  // Update localStorage whenever user state changes
  useEffect(() => {
    if (user) {
      try {
        localStorage.setItem("userData", JSON.stringify(user));
      } catch (error) {
        console.error("Error storing user data:", error);
      }
    } else {
      // Clear user data on logout
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
    }
  }, [user]);

  const updateUser = (userData) => {
    if (userData) {
      try {
        setUser(userData);
      } catch (error) {
        console.error("Error updating user:", error);
      }
    } else {
      setUser(null);
    }
  };

  const logout = () => {
    try {
      setUser(null);
      // Clear all user-related data from localStorage
      localStorage.removeItem("userData");
      localStorage.removeItem("token");
      localStorage.removeItem("savedEmail");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  const value = {
    user,
    updateUser,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook for using the user context
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
