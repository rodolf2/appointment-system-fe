import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { googleProvider, auth } from "@/firebase"; // Correct your import path

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/students");
    } catch (error) {
      setError(error.message); // Display user-friendly error
    }
  };

  const handleGmail = async (e) => {
    e.preventDefault();
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/students");
    } catch (error) {
      setError(error.message); // Display user-friendly error
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: "url('/assets/image/SignIn.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#F3BC62]/50 to-[#252F6A]/50"></div>

      {/* Logo and Title */}
      <header className="flex items-center absolute p-5">
        <img
          src="public/assets/image/LV_Logo.png"
          alt="LV logo"
          className="w-16 h-16 mr-4"
        />
        <h1 className="text-2xl text-white">
          <span className="font-regular">LVCC</span>{" "}
          <span className=" font-LatoSemiBold">AppointEase</span>
        </h1>
      </header>

      {/* Sign In Form */}
      <section className="absolute inset-0 flex items-center justify-center mt-10">
        <div className="bg-[#FEFEFE] bg-opacity-30 p-10 rounded-lg shadow-lg max-w-lg h-[600px] w-full">
          <h2 className="text-[30px] font-bold text-[#fefefe] mb-2 tracking-wider mt-[-10px]">
            SIGN IN
          </h2>
          <div className="w-[200px] h-1 bg-[#F3BC62] mb-6"></div>
          <div className="bg-[#FEFEFE] bg-opacity-70 p-10 rounded-lg shadow-lg max-w-md h-[470px] w-full">
            <form>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#161f55] uppercase mb-2 tracking-wider">
                  Email
                </label>
                <input
                  onChange={handleEmail}
                  type="email"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-[#161f55] uppercase mb-2 tracking-wider">
                  Password
                </label>
                <input
                  onChange={handlePassword}
                  type="password"
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  placeholder="Enter your password"
                />
              </div>
              <div className="flex items-center justify-between mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="ml-2 text-sm text-gray-600">
                    Remember user
                  </span>
                </label>
                <a href="#" className="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>
              <button
                onClick={handleSignIn}
                className="w-full py-2 px-4 bg-[#161F55] font-LatoRegular text-white rounded-md hover:bg-blue-700 focus:outline-none"
              >
                Log In
              </button>
              <div className="mt-4 text-center text-gray-600">or  </div>
              <button
                onClick={handleGmail}
                className="mt-4 w-full py-2 px-4 bg-[#161F55] font-LatoRegular text-[#fefefe] rounded-md flex items-center justify-center hover:bg-blue-700"
              >
                <FcGoogle className="text-2xl mr-2" />
                Log in using Google
              </button>
            </form>
            <p className="mt-4 text-center text-[16px] font-LatoSemiBold tracking-wide text-[#161f55]">
              Don’t have an account?{" "}
              <Link to="/signup" className="text-blue-500 font-LatoSemiBold">
                Sign Up
              </Link>
            </p>
            {error && (
              <p className="mt-4 text-center text-red-500 font-semibold">
                {error}
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SignIn;
