import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "@/firebase";
import axios from "axios";
import emailService from "../../../../services/emailServices";
import { useUser } from "../../../../context/UserContext.jsx";

const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { updateUser } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const savedEmail = localStorage.getItem("savedEmail");
    const savedPassword = localStorage.getItem("savedPassword");
    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError(null);
    setError(null);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError(null);
    setError(null);
  };

  const handleRemember = (e) => {
    const checked = e.target.checked;
    setRemember(checked);
    if (!checked) {
      localStorage.removeItem("savedEmail");
      localStorage.removeItem("savedPassword");
    }
  };

  const handleTogglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const clearSavedCredentials = () => {
    localStorage.removeItem("savedEmail");
    localStorage.removeItem("savedPassword");
    setEmail("");
    setPassword("");
    setRemember(false);
  };

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setError(null);
    setEmailError(null);
    setPasswordError(null);
    setIsLoading(true);

    // Basic validation
    if (!email.trim()) {
      setEmailError("Email is required.");
      setIsLoading(false);
      return;
    }
    if (!validateEmail(email.trim())) {
      setEmailError("Invalid email format.");
      setIsLoading(false);
      return;
    }
    if (!password.trim()) {
      setPasswordError("Password is required.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await emailService.signin({ email, password });

      if (remember) {
        localStorage.setItem("savedEmail", email);
        localStorage.setItem("savedPassword", password);
      } else {
        localStorage.removeItem("savedEmail");
        localStorage.removeItem("savedPassword");
      }

      if (response.token) {
        localStorage.setItem("token", response.token);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${response.token}`;
      }

      const userResponse = response.user || response;

      const userData = {
        email: userResponse.email || email.trim(),
        name: userResponse.name || response.name,
        id: userResponse.id || userResponse._id || response.id,
        picture:
          userResponse.picture ||
          userResponse.profilePicture ||
          response.picture ||
          response.profilePicture ||
          null,
        profilePicture:
          userResponse.profilePicture ||
          userResponse.picture ||
          response.profilePicture ||
          response.picture ||
          null,
        role: userResponse.role,
      };

      updateUser(userData);
      localStorage.setItem("user", JSON.stringify(userData));
      setIsLoading(false);
      console.log("Navigating to registrarHome");

      // Redirect to the originally requested page or default to registrarHome
      const from = location.state?.from?.pathname || "/registrarHome";
      navigate(from, { replace: true });
    } catch (error) {
      console.error("Sign in error:", error);
      setError(
        error.response?.data?.message ||
          error.message ||
          "Invalid email or password"
      );
      setIsLoading(false);
    }
  };

  const handleGmail = async () => {
    setError(null);
    setIsGoogleLoading(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);

      // Only proceed if the sign in was successful
      if (result.user) {
        const user = result.user;
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/signin`,
          {
            email: user.email,
            name: user.displayName,
            googleAuth: true,
            googleId: user.uid,
            picture: user.photoURL,
          }
        );

        if (response.data) {
          const { token, user: userData } = response.data;
          localStorage.setItem("token", token);
          axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

          // Store user data with consistent picture handling
          const enhancedUserData = {
            ...userData,
            picture: userData.picture || user.photoURL || null,
            profilePicture:
              userData.profilePicture ||
              userData.picture ||
              user.photoURL ||
              null,
          };

          updateUser(enhancedUserData);
          localStorage.setItem("user", JSON.stringify(enhancedUserData));
          setIsGoogleLoading(false);

          // Redirect to the originally requested page or default to registrarHome
          const from = location.state?.from?.pathname || "/registrarHome";
          navigate(from, { replace: true });
        }
      }
    } catch (error) {
      console.error("Google signin error:", error);
      // Don't show error message if user just closed the popup
      if (error.code !== "auth/popup-closed-by-user") {
        setError(error.message || "Google sign-in failed");
      }
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return {
    email,
    password,
    remember,
    error,
    emailError,
    passwordError,
    showPassword,
    isLoading,
    isGoogleLoading,
    handleEmail,
    handlePassword,
    handleRemember,
    handleSignIn,
    handleGmail,
    handleTogglePasswordVisibility,
    clearSavedCredentials,
  };
};

export default useSignIn;
