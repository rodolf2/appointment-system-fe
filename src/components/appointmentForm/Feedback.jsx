import { useState } from "react";

const Feedback = ({ onNext }) => {
  const [ratings, setRatings] = useState({
    overall: 0,
    easyToUse: 0,
    features: 0,
    responsiveness: 0,
    reliability: 0,
  });

  const handleRating = (category, value) => {
    setRatings({ ...ratings, [category]: value });
  };

  return (
    <div className="h-full flex items-center justify-center bg-[#161f55]">
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
      <div className="relative mx-auto flex flex-col mt-20 bg-white p-8 rounded-lg shadow-md w-[500px] max-w-[90%] text-center z-10">
        <h3 className="text-[16px] tracking-widest font-bold text-[#161f55] mb-4">
          ALMOST DONE!
        </h3>
        <p className="text-[18px] tracking-wide font-normal text-[#161f55] mb-6">
          How would you rate your experience with our LV AppointEase?
        </p>

        {/* Overall Rating */}
        <div className="mb-6 flex justify-center">
          <StarRating
            category="overall"
            currentRating={ratings.overall}
            onRate={handleRating}
          />
        </div>

        {/* Other Ratings */}
        <div className="space-y-4">
          {[
            { label: "Is easy to use", category: "easyToUse" },
            { label: "Has the features I want", category: "features" },
            { label: "Feels fast and responsive", category: "responsiveness" },
            { label: "Is reliable", category: "reliability" },
          ].map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-sm text-gray-700">{item.label}</span>
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
          onClick={() => {
            onNext();
          }}
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

export default Feedback;
