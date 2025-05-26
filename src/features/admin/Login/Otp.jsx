import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

// API endpoints configuration
const API_BASE_URL = "http://localhost:5000/api/forgot-password";
const ENDPOINTS = {
  REQUEST_OTP: `${API_BASE_URL}/request-otp`,
  VERIFY_OTP: `${API_BASE_URL}/verify-otp`,
};

const Otp = ({ email, onVerifyOtp }) => {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const inputRefs = [
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
    useRef(),
  ];
  const navigate = useNavigate();

  // Start countdown timer for resend button
  const startResendTimer = () => {
    setResendDisabled(true);
    setCountdown(30);
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setResendDisabled(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  // Handle resend OTP request
  const handleResendOtp = async () => {
    try {
      const response = await axios.post(ENDPOINTS.REQUEST_OTP, { email });
      if (response.data.success) {
        setError(null);
        startResendTimer();
      } else {
        throw new Error(response.data.message);
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to resend verification code"
      );
    }
  };

  // Handle input change for OTP digits
  const handleChange = (index, value) => {
    // Validate input
    if (value.length > 1) return;
    if (value && !/^\d+$/.test(value)) return;

    // Update OTP array
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs[index + 1].current.focus();
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const otpString = otp.join("");
    if (otpString.length !== 6) {
      setError("Please enter all 6 digits");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(ENDPOINTS.VERIFY_OTP, {
        email,
        otp: otpString,
      });

      if (response.data.success) {
        await onVerifyOtp(response.data.email);
        navigate("/new-password", { state: { email: response.data.email } });
      } else {
        throw new Error(response.data.message || "Verification failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Invalid verification code. Please try again."
      );
      // Clear OTP fields on error
      setOtp(["", "", "", "", "", ""]);
      // Focus first input
      inputRefs[0].current.focus();
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
      <section className="relative flex items-center justify-center pt-40 px-4">
        <div className="bg-[#FEFEFE] bg-opacity-30 p-12 rounded-[20px] shadow-lg max-w-xl w-full">
          <h2 className="flex justify-center text-3xl font-LatoBold text-white mb-2 tracking-wider">
            Enter Verification Code
          </h2>

          <div className="w-80 h-1 bg-[#F3BC62] mb-6 mx-auto"></div>
          <p className="text-center text-[20px] text-[#fefefe] font-LatoRegular mb-8">
            We sent a code to {email}
          </p>

          <div className="bg-white bg-opacity-70 p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-center space-x-4 flex-wrap gap-y-4">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    maxLength="1"
                    ref={inputRefs[index]}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-xl border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#F3BC62] focus:border-transparent"
                    required
                    autoComplete="off"
                  />
                ))}
              </div>

              {error && (
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md text-center text-sm">
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

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-[#161F55] text-white text-lg rounded-md hover:bg-[#252F6A] disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
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
                    Verifying...
                  </span>
                ) : (
                  "Verify Code"
                )}
              </button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={handleResendOtp}
                  disabled={resendDisabled}
                  className="text-[#161f55] hover:text-[#F3BC62] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {resendDisabled
                    ? `Resend code in ${countdown}s`
                    : "Didn't receive the code? Resend"}
                </button>
              </div>

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
        </div>
      </section>
    </div>
  );
};

Otp.propTypes = {
  email: PropTypes.string.isRequired,
  onVerifyOtp: PropTypes.func.isRequired,
};

export default Otp;