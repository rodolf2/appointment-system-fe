import { useState } from "react";

const Claiming = ({ onNext, onBack }) => {
  const [selectedOption, setSelectedOption] = useState(""); // Track selected option
  const [error, setError] = useState(false); // Error handling state

  // Handle change when user selects an option
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setError(false); // Reset error when an option is selected
  };

  // Handle the "Next" button click
  const handleNext = () => {
    if (selectedOption) {
      onNext(selectedOption); // Pass the selected option to the parent (AppointmentForm)
    } else {
      setError(true); // Show error if no option is selected
    }
  };

  return (
    <>
      <div className="h-full flex items-center justify-center bg-[#161f55]">
        {/* Background Layers */}
        <div className="absolute inset-0 flex flex-col">
          <div
            className=" h-1/2 bg-cover bg-bottom "
            style={{
              backgroundImage:
                "url('/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
              opacity: "0.3",
              backgroundAttachment: "fixed",
            }}
          ></div>
          <div className=" h-1/2 bg-[#161f55]"></div>
        </div>

        {/* INFORMATION */}
        <div className="flex flex-col justify-center text-center m-8">
          <h2 className="mx-auto relative inset-0 font-LatoBold text-[35px] text-Fwhite w-[450px] tracking-widest mt-6 mb-8">
            APPLICATION FOR RECORDS
          </h2>
          <div className="relative mx-auto flex flex-col bg-white p-8 rounded-lg shadow-md w-[500px] max-w-[90%] text-center z-10">
            {/* Content Card */}
            <h2 className="text-lg font-semibold mb-4">
              UPON CLAIMING THE DOCUMENT:
            </h2>

            {/* Options */}
            <div className="text-left">
              <label className="block mb-4 text-[#000] text-[18px]">
                <input
                  type="radio"
                  name="claimOption"
                  value="self" // Option 1: Claim personally
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                I will claim my document personally.
              </label>

              <label className="block mb-4 text-[#000] text-[18px]">
                <input
                  type="radio"
                  name="claimOption"
                  value="authorized" // Option 2: Authorize someone else
                  onChange={handleOptionChange}
                  className="mr-2"
                />
                I cannot claim my document personally. I will authorize someone
                else to claim it on my behalf.
              </label>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm mb-4">
                Please select an option before proceeding.
              </p>
            )}

            {/* Instructions */}
            <p className="text-[16px] font-LatoItalic text-[#161F55] text-left mb-6">
              Please note that if you authorize someone to claim your documents,
              the following must be provided:
              <ul className="list-disc pl-6 mt-2">
                <li className="mb-2">
                  Authorization Letter indicating the name of the person
                  authorized.
                </li>
                <li className="mb-2">
                  Photocopy of Valid ID (front and back) of both the
                  student/alumnus, with 3 signatures.
                </li>
                <li className="mb-2">
                  Photocopy of Valid ID (front and back) of the authorized
                  person processing the request, with 3 signatures.
                </li>
              </ul>
            </p>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <button
                className="px-6 py-2 bg-[#161f55] text-white rounded-md hover:bg-[#1b2a6b]"
                onClick={(e) => {
                  e.preventDefault();
                  onBack(); // Go back to previous step
                }}
              >
                Back
              </button>
              <button
                className={`px-6 py-2 rounded-md text-white ${
                  selectedOption
                    ? "bg-[#161f55] hover:bg-[#1b2a6b]"
                    : "bg-[#161f55]"
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNext(); // Proceed to next step
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Claiming;
