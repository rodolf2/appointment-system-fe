import React from "react";
import { useNavigate } from "react-router-dom";

const ReturnHome = () => {
  const navigate = useNavigate();

  const handleReturnToHome = () => {
    navigate("/home"); // Replace "/" with the path of your home page if it's different
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#161f55]">
      <div
        className="relative h-screen w-screen bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/public/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
        }}
      >
        {/* Overlay for Background Shadow */}
        <div className="absolute inset-0 bg-[#161f55] bg-opacity-70"></div>

        <div className="relative bg-[#FFFFFF] p-6 rounded-lg font-LatoMedium shadow-lg text-center w-[600px]">
          <h3 className="text-lg font-bold mb-4 text-[#161F55]">
            Thank you for completing the form.
          </h3>
          <p className="text-[#161F55] mb-6">
            Please wait for the email notification regarding the status of your
            document request.
          </p>
          <div className="right-0">
            <button
              className="px-4 py-2 bg-[#C9C9C9] font-LatoSemiBold text-[#161F55] rounded hover:bg-gray-400 transition"
              onClick={handleReturnToHome}
            >
              Return to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnHome;
