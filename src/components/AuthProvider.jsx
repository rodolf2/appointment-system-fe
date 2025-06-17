import { useEffect } from "react";
import useAuth from "../hooks/useAuth.js";

const AuthProvider = ({ children }) => {
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    // Authentication initialization is handled in useAuth hook
    // This component serves as a wrapper to ensure useAuth is called
    // at the top level of the application
  }, []);

  return children;
};

export default AuthProvider;
