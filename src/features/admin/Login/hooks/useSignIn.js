import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "@/firebase";

const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
    setShowPassword(prev => !prev);
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

    const errorMessages = {
      "auth/invalid-email": "Invalid email format",
      "auth/user-not-found": "No account found with this email",
      "auth/wrong-password": "Incorrect password",
      "auth/user-disabled": "Account disabled",
      "auth/too-many-requests": "Too many attempts. Try again later",
      "auth/network-request-failed": "Network error. Check your connection",
    };

    try {
      await signInWithEmailAndPassword(auth, email, password);

      if (remember) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      navigate("/registrarHome");
    } catch (error) {
      console.error("Sign-in error:", error);
      setError(errorMessages[error.code] || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGmail = async (e) => {
    e.preventDefault();
    setError(null);
    setIsGoogleLoading(true);

    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/registrarHome");
    } catch (error) {
      console.error("Google sign-in error:", error);

      const gmailErrors = {
        "auth/popup-closed-by-user": "Sign-in cancelled",
        "auth/account-exists-with-different-credential":
          "Account exists with different login method",
        "auth/cancelled-popup-request": "Popup request cancelled",
      };

      setError(gmailErrors[error.code] || "Google sign-in failed. Try again.");
    } finally {
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