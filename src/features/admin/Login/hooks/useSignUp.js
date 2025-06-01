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
  const [error, setError] = useState(null);
  const { updateUser } = useUser();

  const navigate = useNavigate();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      // Call our email service to register the user
      const response = await emailService.signup({
        name: name.trim(),
        email: email.trim(),
        password,
        confirmPassword,
      });

      // Store user data immediately after successful registration
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

        // Store the token if provided
        if (response.token) {
          localStorage.setItem("token", response.token);
        }

        updateUser(userData);
        navigate("/registrarHome");
      } else {
        // If registration successful but no success flag, go to sign in
        navigate("/signin");
      }
    } catch (error) {
      setError(error.message || "An error occurred during sign up");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // After Google sign up, register the user in our backend
      const response = await emailService.signup({
        name: result.user.displayName,
        email: result.user.email,
        password: null, // Google auth doesn't provide password
        confirmPassword: null,
        googleAuth: true,
      });

      // Store user data with consistent picture handling
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
      updateUser(userData);
      navigate("/registrarHome");
    } catch (error) {
      setError(error.message);
    }
  };

  return {
    name,
    email,
    password,
    confirmPassword,
    error,
    handleName,
    handleEmail,
    handlePassword,
    handleConfirmPassword,
    handleSignUp,
    handleGoogleSignUp,
  };
};

export default useSignUp;
