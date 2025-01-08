import { auth, googleProvider } from "@/firebase"; // Ensure googleProvider is correctly configured in your firebase setup
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
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

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/signin");
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/students"); // Navigate to your desired page after successful sign-up
    } catch (error) {
      setError(`Error: ${error.message}`);
    }
  };

  return (
    <>
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
        <header className="absolute top-4 left-4 flex items-center">
          <img
            src="public/assets/image/LV_Logo.png"
            alt="LV logo"
            className="w-16 h-16 mr-4"
          />
          <h1 className="text-2xl text-white">
            <span className="font-regular">LVCC</span>{" "}
            <span className="font-semibold">AppointEase</span>
          </h1>
        </header>

        {/* Sign Up Form */}
        <section className="absolute inset-0 flex items-center justify-center">
          <div className="bg-[#FEFEFE] bg-opacity-30 p-10 rounded-lg shadow-lg h-[650px] mt-0 max-w-lg w-full">
            <h2 className="text-3xl font-bold text-[#161F55] mb-2 tracking-wide">
              SIGN UP
            </h2>
            <div className="w-40 h-1 bg-[#F3BC62] mb-6"></div>

            <div className="bg-white bg-opacity-60 p-8 rounded-lg shadow-lg h-[500px] max-w-lg w-full">
              <form>
                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <input
                      placeholder="Name"
                      type="text"
                      className="w-full px-4 py-2 border-[#6F6F6F] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-[#000]"
                    />
                  </div>

                  <div>
                    <input
                      placeholder="Email"
                      onChange={handleEmail}
                      type="email"
                      className="w-full px-4 py-2 border-[#6F6F6F] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-[#000]"
                    />
                  </div>
                  <div>
                    <input
                      onChange={handlePassword}
                      type="password"
                      placeholder="Password"
                      className="w-full px-4 py-2 border-[#6F6F6F] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-[#000]"
                    />
                  </div>
                  <div>
                    <input
                      placeholder="Confirm Password"
                      type="password"
                      className="w-full px-4 py-2 border-[#6F6F6F] border-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder-[#000]"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleSignUp}
                  className="w-full flex justify-center py-2 mt-6 bg-[#161F55] text-[20px] text-[#fefefe] font-LatoRegular rounded-md hover:bg-blue-700 focus:outline-none"
                >
                  Sign Up
                </button>

                <div className="mt-4 text-center">
                  <p className="text-[16px] mt-4 text-[#161f55] font-LatoRegular tracking-wider">
                    Already have an account?{" "}
                    <Link
                      to="/signin"
                      className="font-LatoSemiBold text-blue-500 hover:text-[#161f55]"
                    >
                      Sign In
                    </Link>
                  </p>
                </div>
              </form>

              <div className="mt-4  text-center">
                <p className="text-gray-600">or</p>
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="mt-4 w-full py-2 px-4 text-[#161f55] font-LatoRegular border-2 border-[#161f55] rounded-md flex items-center justify-center hover:bg-[#161f55] hover:text-white"
                >
                  <FcGoogle className="text-2xl mr-2" />
                  Sign Up with Google
                </button>{" "}
                {error && <p>{error}</p>}
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default SignUp;
