import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "@/firebase";
import emailService from "../../../../services/emailServices";
import { useUser } from "../../../../context/UserContext";

const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { updateUser } = useUser();

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleRemember = (e) => setRemember(e.target.checked);

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    if (!email.trim() || !password.trim()) {
      setError("Please enter both email and password.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await emailService.signin({ email, password });
      console.log("Signin response:", response); // Debug log

      if (remember) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      // Store the token in localStorage
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      // Store user data directly from the response
      const userData = {
        email: response.user?.email || email.trim(),
        name: response.user?.name || response.name, // Try both possible locations
        id: response.user?.id || response.user?._id || response.id,
        role: response.user?.role,
      };

      console.log("User data being stored:", userData); // Debug log

      updateUser(userData);
      setIsLoading(false);
      navigate("/registrarHome");
    } catch (error) {
      console.error("Sign in error:", error);
      setError(error.message || "Invalid email or password");
      setIsLoading(false);
    }
  };

  const handleGmail = async (e) => {
    e.preventDefault();
    setError(null);
    setIsGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      console.log("Google auth result:", result); // Debug log

      const response = await emailService.signin({
        email: user.email,
        googleAuth: true,
        name: user.displayName,
        googleId: user.uid,
        picture: user.photoURL,
      });
      console.log("Google signin response:", response); // Debug log

      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      // Store user data with consistent structure
      const userData = {
        email: user.email,
        name: response.user?.name || user.displayName, // Prefer backend name if available
        id: response.user?.id || response.user?._id || response.id,
        picture: user.photoURL,
        role: response.user?.role,
      };
      console.log("Google user data being stored:", userData); // Debug log

      updateUser(userData);
      navigate("/registrarHome");
    } catch (error) {
      console.error("Google signin error:", error);
      setError(error.message || "Google sign-in failed");
      setIsGoogleLoading(false);
    }
  };

  return {
    email,
    password,
    remember,
    error,
    showPassword,
    isLoading,
    isGoogleLoading,
    handleEmail,
    handlePassword,
    handleRemember,
    handleSignIn,
    handleGmail,
    handleTogglePasswordVisibility,
  };
};

export default useSignIn;
