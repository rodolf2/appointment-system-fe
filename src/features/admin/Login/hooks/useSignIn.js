import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "@/firebase";
import emailService from "../../../../services/emailServices";

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

    try {
      const response = await emailService.signin({ email, password });

      if (remember) {
        localStorage.setItem("savedEmail", email);
      } else {
        localStorage.removeItem("savedEmail");
      }

      // Store the token in localStorage
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      navigate("/registrarHome");
    } catch (error) {
      setError(error.message || "Invalid email or password");
    }
  };

  const handleGmail = async (e) => {
    e.preventDefault();
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const response = await emailService.signin({
        email: user.email,
        googleAuth: true,
        name: user.displayName,
        googleId: user.uid,
        picture: user.photoURL,
      });

      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      navigate("/registrarHome");
    } catch (error) {
      setError(error.message || "Google sign-in failed");
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
