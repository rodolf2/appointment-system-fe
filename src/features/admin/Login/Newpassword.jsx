// import { useState } from "react";
// import { Link, useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";
// import Header from "./Header";
// import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// const API_BASE_URL = "http://localhost:5000/api";

// const NewPassword = () => {
//   const [password, setPassword] = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [error, setError] = useState(null);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   const navigate = useNavigate();
//   const location = useLocation();
//   const email = location.state?.email;

//   // Redirect to signin if no email is present
//   if (!email) {
//     navigate("/signin");
//     return null;
//   }

//   const handleResetPassword = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     setError(null);
//     setMessage(null);

//     // Password validation
//     if (password !== confirmPassword) {
//       setError("Passwords do not match");
//       setIsSubmitting(false);
//       return;
//     }

//     if (password.length < 8) {
//       setError("Password must be at least 8 characters long");
//       setIsSubmitting(false);
//       return;
//     }

//     // Password strength validation
//     const passwordRegex =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
//     if (!passwordRegex.test(password)) {
//       setError(
//         "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
//       );
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/forgot-password/reset`,
//         {
//           email,
//           newPassword: password,
//         }
//       );

//       if (response.data.success) {
//         setMessage("Password has been successfully reset");
//         // Redirect to signin page after 2 seconds
//         setTimeout(() => {
//           navigate("/signin");
//         }, 2000);
//       } else {
//         throw new Error(response.data.message || "Failed to reset password");
//       }
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//           "Failed to reset password. Please try again."
//       );
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const togglePasswordVisibility = (field) => {
//     if (field === "password") {
//       setShowPassword(!showPassword);
//     } else {
//       setShowConfirmPassword(!showConfirmPassword);
//     }
//   };

//   return (
//     <div
//       className="w-full min-h-screen bg-cover bg-center relative"
//       style={{
//         backgroundImage: 'url("/assets/image/SignIn.png")',
//         backgroundSize: "cover",
//         backgroundPosition: "bottom",
//       }}
//     >
//       <div
//         className="absolute inset-0"
//         style={{
//           background: `linear-gradient(to top, rgba(2, 17, 74, 0.5), rgba(3, 21, 125, 0.5), rgba(107, 123, 222, 0.4))`,
//         }}
//       />
//       <Header />
//       <section className="relative flex items-center justify-center pt-40 px-4">
//         <div className="bg-white bg-opacity-30 p-12 rounded-[20px] shadow-lg max-w-xl w-full">
//           <h2 className="text-3xl text-white text-center mb-6">
//             Create New Password
//           </h2>
//           <p className="text-white text-center mb-6">
//             Please enter your new password for {email}
//           </p>
//           <form
//             onSubmit={handleResetPassword}
//             className="bg-white p-6 rounded-lg space-y-6"
//           >
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 placeholder="Enter new password"
//               />
//               <button
//                 type="button"
//                 onClick={() => togglePasswordVisibility("password")}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2"
//               >
//                 {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
//               </button>
//             </div>

//             <div className="relative">
//               <input
//                 type={showConfirmPassword ? "text" : "password"}
//                 value={confirmPassword}
//                 onChange={(e) => setConfirmPassword(e.target.value)}
//                 required
//                 className="w-full px-4 py-2 border border-gray-300 rounded-md"
//                 placeholder="Confirm new password"
//               />
//               <button
//                 type="button"
//                 onClick={() => togglePasswordVisibility("confirm")}
//                 className="absolute right-3 top-1/2 transform -translate-y-1/2"
//               >
//                 {showConfirmPassword ? (
//                   <AiOutlineEyeInvisible />
//                 ) : (
//                   <AiOutlineEye />
//                 )}
//               </button>
//             </div>

//             <div className="text-sm text-gray-600">
//               Password must contain:
//               <ul className="list-disc pl-5 mt-1">
//                 <li>At least 8 characters</li>
//                 <li>One uppercase letter</li>
//                 <li>One lowercase letter</li>
//                 <li>One number</li>
//                 <li>One special character (@$!%*?&)</li>
//               </ul>
//             </div>

//             <button
//               type="submit"
//               disabled={isSubmitting}
//               className="w-full py-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
//             >
//               {isSubmitting ? "Resetting Password..." : "Reset Password"}
//             </button>

//             {message && (
//               <div className="p-4 bg-green-100 text-green-700 rounded-md text-center">
//                 {message}
//               </div>
//             )}
//             {error && (
//               <div className="p-4 bg-red-100 text-red-700 rounded-md text-center">
//                 {error}
//               </div>
//             )}

//             <div className="text-center pt-4">
//               <Link
//                 to="/signin"
//                 className="text-blue-900 hover:text-yellow-600 transition"
//               >
//                 Back to Sign In
//               </Link>
//             </div>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default NewPassword;

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const API_BASE_URL = "http://localhost:5000/api/forgot-password";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  // Check for email in state on component mount
  useEffect(() => {
    if (!email) {
      navigate("/signin");
    }
  }, [email, navigate]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    // Password validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsSubmitting(false);
      return;
    }

    // Password strength validation
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setError(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      setIsSubmitting(false);
      return;
    }

    try {
      // Updated endpoint to match the backend
      const response = await axios.post(`${API_BASE_URL}/reset-password`, {
        email,
        newPassword: password,
      });

      if (response.data.success) {
        setMessage(
          "Password has been successfully reset. Redirecting to login..."
        );
        // Clear any stored states if necessary
        setTimeout(() => {
          navigate("/signin", { replace: true });
        }, 2000);
      } else {
        throw new Error(response.data.message || "Failed to reset password");
      }
    } catch (err) {
      console.error("Reset password error:", err);
      setError(
        err.response?.data?.message ||
          "Failed to reset password. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  if (!email) {
    return null;
  }

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: 'url("/assets/image/SignIn.png")',
        backgroundSize: "cover",
        backgroundPosition: "bottom",
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(to top, rgba(2, 17, 74, 0.5), rgba(3, 21, 125, 0.5), rgba(107, 123, 222, 0.4))`,
        }}
      />
      <Header />
      <section className="relative flex items-center justify-center pt-40 px-4">
        <div className="bg-white bg-opacity-30 p-12 rounded-[20px] shadow-lg max-w-xl w-full">
          <h2 className="text-3xl text-white text-center mb-6">
            Create New Password
          </h2>
          <p className="text-white text-center mb-6">
            Please enter your new password for {email}
          </p>
          <form
            onSubmit={handleResetPassword}
            className="bg-white p-6 rounded-lg space-y-6"
          >
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("password")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
              </button>
            </div>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Confirm new password"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible />
                ) : (
                  <AiOutlineEye />
                )}
              </button>
            </div>

            <div className="text-sm text-gray-600">
              <p className="font-medium mb-2">Password requirements:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>At least 8 characters</li>
                <li>One uppercase letter (A-Z)</li>
                <li>One lowercase letter (a-z)</li>
                <li>One number (0-9)</li>
                <li>One special character (@$!%*?&)</li>
              </ul>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#161F55] text-white rounded-md hover:bg-[#252F6A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Resetting Password...
                </span>
              ) : (
                "Reset Password"
              )}
            </button>

            {message && (
              <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-center">
                <svg
                  className="w-5 h-5 inline mr-2 text-green-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                {message}
              </div>
            )}

            {error && (
              <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center">
                <svg
                  className="w-5 h-5 inline mr-2 text-red-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                {error}
              </div>
            )}

            <div className="text-center pt-4">
              <Link
                to="/signin"
                className="text-[#161F55] hover:text-[#F3BC62] transition-colors inline-flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default NewPassword;
