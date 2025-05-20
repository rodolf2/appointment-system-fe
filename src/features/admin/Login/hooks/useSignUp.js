import { auth, googleProvider } from "@/firebase";
import { signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router";
import emailService from "../../../../services/emailServices";

const useSignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

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
      await emailService.signup({
        name,
        email,
        password,
        confirmPassword,
      });

      // Navigate to sign in page after successful registration
      navigate("/signin");
    } catch (error) {
      setError(error.message || "An error occurred during sign up");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      // After Google sign up, register the user in our backend
      await emailService.signup({
        name: result.user.displayName,
        email: result.user.email,
        password: null, // Google auth doesn't provide password
        confirmPassword: null,
        googleAuth: true,
      });
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
