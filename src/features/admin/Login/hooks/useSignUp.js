import { auth, googleProvider } from "@/firebase"; // Ensure googleProvider is correctly configured in your firebase setup
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";

const useSignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Check if password is at least 8 characters
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/signin");
    } catch (error) {
      setError(`Invalid Format: ${error.message}`);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/registrarHome"); // Navigate to your desired page after successful sign-up
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };
  return {
    email,
    password,
    confirmPassword,
    error,
    handleEmail,
    handlePassword,
    handleConfirmPassword,
    handleSignUp,
    handleGoogleSignUp,
  };
};

export default useSignUp;
