import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "@/firebase";

const useSignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState(null);

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

  const handleSignIn = async (e) => {
    e.preventDefault();

    const errorMessages = {
      "auth/invalid-email": "Invalid email format. Please enter a valid email.",
      "auth/user-not-found":
        "User does not exist. Please check your email or sign up.",
      "auth/invalid-password": "Password is incorrect. Please try again.",
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
      setError(
        errorMessages[error.code] ||
          "An unexpected error occurred. Please try again."
      );
    }
  };

  const handleGmail = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/registrarHome");
    } catch (error) {
      setError(error.message);
    }
  };
  return {
    email,
    password,
    remember,
    error,
    handleEmail,
    handlePassword,
    handleRemember,
    handleSignIn,
    handleGmail,
  };
};

export default useSignIn;
