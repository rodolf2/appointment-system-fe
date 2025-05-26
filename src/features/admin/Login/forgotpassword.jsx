import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Otp from "./Otp";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const navigate = useNavigate();

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgot-password/request-otp",
        { email }
      );

      if (response.data.success) {
        setMessage(`Verification code has been sent to ${email}`);
        setShowOtpVerification(true);
      } else {
        setError(response.data.message || "Failed to send verification code");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Failed to send verification code. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVerifyOtp = async (verifiedEmail) => {
    // This will be called after successful OTP verification
    setMessage("Email verified successfully!");
  };

  if (showOtpVerification) {
    return <Otp email={email} onVerifyOtp={handleVerifyOtp} />;
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
        <div className="bg-[#FEFEFE] bg-opacity-30 p-12 rounded-[20px] shadow-lg max-w-xl w-full">
          <h2 className="text-3xl font-LatoBold tracking-wider text-white text-center mb-2">
            Forgot password?
          </h2>
          <div className="w-[260px] h-1 bg-[#F3BC62] mb-4 mx-auto"></div>
          <p className="text-white text-[16px] font-LatoRegular text-center mb-6">
            We’ll send you reset instructions.{" "}
          </p>
          <form
            onSubmit={handleSendOtp}
            className="bg-white p-6 rounded-lg space-y-6"
          >
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="block text-[#161F55] font-LatoSemiBold text-[16px] tracking-wider"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-[#161F55] text-white rounded-md hover:bg-[#252F6A] transition-colors disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Verification Code"}
            </button>
            {message && (
              <div className="p-3 bg-green-100 text-green-700 rounded-md text-center">
                {message}
              </div>
            )}
            {error && (
              <div className="p-3 bg-red-100 text-red-700 rounded-md text-center">
                {error}
              </div>
            )}
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/signin")}
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
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
