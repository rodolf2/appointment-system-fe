import { auth, googleProvider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import emailService from "../../../../services/emailServices";
import { useUser } from "../../../../context/UserContext.jsx";

const useSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [apiError, setApiError] = useState(null);
  const { updateUser } = useUser();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
    // Clear error when user starts typing
    if (errors.name) {
      setErrors((prev) => ({ ...prev, name: "" }));
    }
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: "" }));
    }
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    if (errors.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
    }
    // Clear confirm password error if passwords now match
    if (
      confirmPassword &&
      e.target.value === confirmPassword &&
      errors.confirmPassword
    ) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
    // Clear error if passwords now match
    if (password && e.target.value === password && errors.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
    }
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!name.trim()) {
      newErrors.name = "Name is required";
      isValid = false;
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      isValid = false;
    }

    if (!confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setApiError(null); // Clear previous API errors

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const response = await emailService.signup({
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword,
      });

      if (response.success) {
        const userData = {
          email: email.trim(),
          name: name.trim(),
          picture:
            response.user?.picture || response.user?.profilePicture || null,
          profilePicture:
            response.user?.profilePicture || response.user?.picture || null,
          id: response.userId,
          role: response.user?.role,
        };

        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        updateUser(userData);
        navigate("/registrarHome");
      } else {
        // Handle specific backend errors
        if (response.error) {
          if (response.error.includes("email")) {
            setErrors((prev) => ({ ...prev, email: response.error }));
          } else if (response.error.includes("password")) {
            setErrors((prev) => ({ ...prev, password: response.error }));
          } else {
            setApiError(response.error);
          }
        } else {
          navigate("/signin");
        }
      }
    } catch (error) {
      console.error("Signup error:", error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An unexpected error occurred. Please try again.";
      setApiError(errorMessage);

      // Handle specific error cases
      if (error.response?.status === 409) {
        setErrors((prev) => ({
          ...prev,
          email: "This email is already registered",
        }));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setApiError(null);
    setIsSubmitting(true);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const response = await emailService.signup({
        name: result.user.displayName,
        email: result.user.email,
        password: null,
        confirmPassword: null,
        googleAuth: true,
      });

      const userData = {
        email: result.user.email,
        name: result.user.displayName,
        picture:
          response.user?.picture ||
          response.user?.profilePicture ||
          result.user.photoURL ||
          null,
        profilePicture:
          response.user?.profilePicture ||
          response.user?.picture ||
          result.user.photoURL ||
          null,
        id: response.userId || result.user.uid,
        role: response.user?.role,
      };

      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      updateUser(userData);
      navigate("/registrarHome");
    } catch (error) {
      console.error("Google signup error:", error);
      let errorMessage = error.message;

      // Handle specific Firebase errors
      if (error.code) {
        switch (error.code) {
          case "auth/account-exists-with-different-credential":
            errorMessage =
              "This email is already registered with a different method";
            break;
          case "auth/popup-closed-by-user":
            errorMessage = "Sign up process was cancelled";
            break;
          default:
            errorMessage = "Failed to sign up with Google";
        }
      }

      setApiError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    handleName,
    handleEmail,
    handlePassword,
    handleConfirmPassword,
    handleSignUp,
    handleGoogleSignUp,
    showPassword,
    showConfirmPassword,
    togglePasswordVisibility,
    toggleConfirmPasswordVisibility,
    errors,
    apiError,
    isSubmitting,
  };
};

export default useSignUp;
