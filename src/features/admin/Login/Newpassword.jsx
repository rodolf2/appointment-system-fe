import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api/forgot-password`;

// Success Modal Component
const SuccessModal = ({ onClose }) => (
  <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-8 max-w-sm w-full mx-4 relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
      <div className="text-center">
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full mb-4">
          <IoMdCheckmarkCircleOutline className="text-[#161F55] w-24 h-24" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Successful password reset!
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          You can now use your new password to login to your account.
        </p>
        <button
          onClick={onClose}
          className="w-full bg-[#161F55] text-white rounded-md py-2 hover:bg-[#252F6A] transition-colors"
        >
          Login
        </button>
      </div>
    </div>
  </div>
);

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const isLengthValid = password.length >= 8 && password.length <= 30;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
  const isAllValid =
    isLengthValid &&
    hasUppercase &&
    hasLowercase &&
    hasNumber &&
    hasSpecialChar;

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

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/reset-password`, {
        email,
        newPassword: password,
      });

      if (response.data.success) {
        setShowSuccessModal(true);
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

  const handleCloseModal = () => {
    setShowSuccessModal(false);
    navigate("/signin", { replace: true });
  };

  const togglePasswordVisibility = (field) => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  if (!email) return null;

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
      <div
        className={`${
          showSuccessModal ? "blur-sm" : ""
        } transition-all duration-300`}
      >
        <Header />
        <section className="relative flex items-center justify-center pt-28 px-4">
          <div className="bg-white bg-opacity-30 p-8 rounded-[20px] shadow-lg max-w-xl w-full">
            <h2 className="text-3xl text-white text-center mb-4">
              Set New Password
            </h2>
            <div className="w-[280px] h-1 bg-[#F3BC62] mb-4 mx-auto"></div>

            {/* Error Alert Box */}
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded text-sm text-center mb-4">
                {error}
              </div>
            )}

            <form
              onSubmit={handleResetPassword}
              className="bg-white p-6 rounded-lg space-y-6"
            >
              <div className="relative">
                <p className="text-[#161F55] font-LatoSemiBold ">
                  New Password
                </p>
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
                  className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </button>
              </div>

              <div className="relative">
                <p className="text-[#161F55] font-LatoSemiBold">
                  Confirm New Password
                </p>
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
                  className="absolute right-3 top-2/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? (
                    <AiOutlineEyeInvisible />
                  ) : (
                    <AiOutlineEye />
                  )}
                </button>
              </div>

              {/* Dynamic Password Requirements */}
              <div className="text-sm mt-4">
                <p className="font-medium mb-2 text-gray-700">
                  Password requirements:
                </p>
                <ul className="pl-5 space-y-1">
                  <li
                    className={`flex items-center ${
                      isLengthValid ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <span className="mr-2">
                      {isLengthValid ? (
                        <FaCheckCircle />
                      ) : (
                        <AiFillCloseCircle />
                      )}
                    </span>
                    Contain 8 to 30 characters
                  </li>
                  <li
                    className={`flex items-center ${
                      hasUppercase && hasLowercase
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    <span className="mr-2">
                      {hasUppercase && hasLowercase ? (
                        <FaCheckCircle />
                      ) : (
                        <AiFillCloseCircle />
                      )}
                    </span>
                    Contain both lower and uppercase letters
                  </li>
                  <li
                    className={`flex items-center ${
                      hasNumber ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <span className="mr-2">
                      {hasNumber ? <FaCheckCircle /> : <AiFillCloseCircle />}
                    </span>
                    Contain 1 number
                  </li>
                  <li
                    className={`flex items-center ${
                      hasSpecialChar ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    <span className="mr-2">
                      {hasSpecialChar ? (
                        <FaCheckCircle />
                      ) : (
                        <AiFillCloseCircle />
                      )}
                    </span>
                    Contain 1 special character <code>!@#$%^&*()+</code>
                  </li>
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

      {/* Success Modal */}
      {showSuccessModal && <SuccessModal onClose={handleCloseModal} />}
    </div>
  );
};

export default NewPassword;
