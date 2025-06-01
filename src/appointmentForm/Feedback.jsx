import { useState } from "react";
import PropTypes from "prop-types";

const Feedback = ({ onNext, transactionNumber, name }) => {
  const [ratings, setRatings] = useState({
    easyToUse: 0,
    features: 0,
    responsiveness: 0,
    reliability: 0,
  });

  const [error, setError] = useState(null);

  const handleRating = (category, value) => {
    setRatings({ ...ratings, [category]: value });
  };

  const handleSubmit = async () => {
    try {
      // Check if all ratings are provided
      const allRated = Object.values(ratings).every((rating) => rating > 0);
      if (!allRated) {
        setError("Please provide ratings for all categories");
        return;
      }

      console.log("Submitting feedback:", {
        name,
        transactionNumber,
        ratings,
      });

      const response = await fetch(
        "https://appointment-system-backend-n8dk.onrender.com/api/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            transactionNumber,
            ratings,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        let errorMessage = "Failed to submit feedback";
        if (data.message) {
          errorMessage = data.message;
          if (data.details) {
            errorMessage +=
              ": " +
              Object.entries(data.details)
                .map(([key, value]) => `${key}: ${value}`)
                .join(", ");
          }
        }
        throw new Error(errorMessage);
      }

      console.log("Feedback submitted successfully:", data);
      onNext();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      setError(error.message || "Failed to submit feedback. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#161f55]">
      {/* Background Layers */}
      <div className="absolute inset-0 flex flex-col">
        <div
          className="h-1/2 bg-cover bg-bottom"
          style={{
            backgroundImage:
              "url('/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
            opacity: "0.3",
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className="h-1/2 bg-[#161f55]"></div>
      </div>

      {/* Feedback Form */}
      <div className="relative mx-auto flex flex-col bg-white p-8 rounded-lg shadow-md w-[500px] max-w-[90%] text-center z-10">
        <h3 className="text-[16px] tracking-widest font-bold text-[#161f55] mb-4">
          ALMOST DONE!
        </h3>
        <p className="text-[18px] tracking-wide font-normal text-[#161f55] mb-6">
          How would you rate your experience with our <br /> LV AppointEase?
        </p>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Other Ratings */}
        <div className="space-y-4 font-LatoRegular">
          {[
            { label: "Is easy to use", category: "easyToUse" },
            { label: "Has the features I want", category: "features" },
            { label: "Feels fast and responsive", category: "responsiveness" },
            { label: "Is reliable", category: "reliability" },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-[16px] text-[#161f55]">{item.label}</span>
              <StarRating
                category={item.category}
                currentRating={ratings[item.category]}
                onRate={handleRating}
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <p className="text-sm text-gray-500 mt-6">
          We will really appreciate your feedback. Thank you!
        </p>
        <button
          className="px-6 py-2 bg-[#161f55] text-white rounded mt-6 hover:bg-blue-700"
          onClick={handleSubmit}
        >
          Done
        </button>
      </div>
    </div>
  );
};

const StarRating = ({ category, currentRating, onRate }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          className={`w-6 h-6 ${
            value <= currentRating ? "text-blue-500" : "text-gray-300"
          }`}
          onClick={() => onRate(category, value)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2.25l3.09 6.26 6.91 1.01-5 4.88 1.18 6.88L12 17.27l-6.18 3.25L7 14.4l-5-4.88 6.91-1.01L12 2.25z" />
          </svg>
        </button>
      ))}
    </div>
  );
};

StarRating.propTypes = {
  category: PropTypes.string,
  currentRating: PropTypes.number,
  onRate: PropTypes.func,
};

Feedback.propTypes = {
  onNext: PropTypes.func,
  transactionNumber: PropTypes.string,
  name: PropTypes.string,
};

export default Feedback;
