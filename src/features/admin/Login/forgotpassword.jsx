import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Otp from "./Otp";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [showOtpVerification, setShowOtpVerification] = useState(false);

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/forgot-password/request-otp",
        {
          email,
        }
      );

      setMessage(`OTP has been sent to ${email}`);
      setShowOtpVerification(true);
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to send OTP. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (showOtpVerification) {
    return <Otp email={email} />;
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
            Reset your password
          </h2>
          <p className="text-white text-center mb-6">
            We'll send you an OTP to verify your email.
          </p>
          <form
            onSubmit={handleSendOtp}
            className="bg-white p-6 rounded-lg space-y-6"
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 bg-blue-700 text-white rounded-md"
            >
              {isSubmitting ? "Sending OTP..." : "Send OTP"}
            </button>
            {message && <p className="text-green-600 text-center">{message}</p>}
            {error && <p className="text-red-600 text-center">{error}</p>}
            <div className="text-center pt-4">
              <Link
                to="/signin"
                className="text-blue-900 hover:text-yellow-600 transition"
              >
                Back to Sign In
              </Link>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ForgotPassword;
