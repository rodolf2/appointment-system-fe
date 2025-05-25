import { useState } from "react";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase";
import Header from "./Header";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link has been sent to your email.");
      setEmail(""); // Clear email after successful submission
    } catch (err) {
      switch (err.code) {
        case "auth/invalid-email":
          setError("Please enter a valid email address.");
          break;
        case "auth/user-not-found":
          setError("No account found with this email address.");
          break;
        default:
          setError("Failed to send reset email. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

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
          background: `linear-gradient(to top, 
            rgba(2, 17, 74, 0.5) 0%, 
            rgba(3, 21, 125, 0.5) 50%, 
            rgba(107, 123, 222, 0.4) 100%
          )`,
        }}
      />

      {/* Logo and Title */}
      <Header />

      <section className="relative flex items-center justify-center pt-40 px-4">
        <div className="bg-[#FEFEFE] bg-opacity-30 p-12 rounded-[20px] shadow-lg max-w-xl  w-full">
          <h2 className=" flex justify-center text-3xl font-LatoBold text-white mb-2 tracking-wider">
            Reset your password
          </h2>

          <div className="w-80 h-1 bg-[#F3BC62] mb-6 mx-auto"></div>
          <p className="text-center text-[20px] text-[#fefefe] font-LatoRegular  mb-8">
            We&apos;ll send you reset instructions.
          </p>
          <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-[20px] font-LatoSemiBold text-[#161f55] "
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F3BC62] focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#161F55] text-white text-lg rounded-md hover:bg-[#252F6A] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mt-6"
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
                    Sending Reset Link...
                  </span>
                ) : (
                  "Reset Password"
                )}
              </button>

              {message && (
                <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded-md text-center text-sm animate-fadeIn">
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
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center text-sm animate-fadeIn">
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
                  className="inline-flex items-center text-[#161f55] hover:text-[#F3BC62] transition-all duration-200"
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
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
