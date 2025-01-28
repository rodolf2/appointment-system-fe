import { useState } from "react"; // Importing useState hook to manage state within the component.

const Claiming = ({ onNext, onBack }) => {
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option (radio button value).
  const [error, setError] = useState(false); // State to handle error when no option is selected.

  // Function to handle when a radio button option is selected.
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value); // Update the selectedOption state with the selected value.
    setError(false); // Clear any error message if an option is selected.
  };

  // Function to handle when the "Next" button is clicked.
  const handleNext = () => {
    if (selectedOption) {
      onNext(selectedOption); // If an option is selected, pass it to the parent component.
    } else {
      setError(true); // If no option is selected, set the error state to true.
    }
  };

  return (
    <>
      {/* Main container with a background color and centering elements */}
      <div className="h-full flex items-center justify-center bg-[#161f55]">
        
        {/* Background Layers for visual effect */}
        <div className="absolute inset-0 flex flex-col">
          <div
            className=" h-1/2 bg-cover bg-bottom"
            style={{
              backgroundImage:
                "url('/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')", // Background image URL.
              opacity: "0.3", // Transparency for the image.
              backgroundAttachment: "fixed", // Fix background during scrolling.
            }}
          ></div>
          <div className="h-1/2 bg-[#161f55]"></div> {/* Second layer for solid color background */}
        </div>

        {/* Information Container */}
        <div className="flex flex-col justify-center text-center m-8">
          {/* Title of the Form */}
          <h2 className="mx-auto relative inset-0 font-LatoBold text-[35px] text-Fwhite w-[450px] tracking-widest mt-6 mb-8">
            APPLICATION FOR RECORDS
          </h2>

          {/* Form Content Card */}
          <div className="relative mx-auto flex flex-col bg-white p-8 rounded-lg shadow-md w-[500px] max-w-[90%] text-center z-10">
            {/* Section Header */}
            <h2 className="text-lg font-semibold mb-4">
              UPON CLAIMING THE DOCUMENT:
            </h2>

            {/* Options Section */}
            <div className="text-left">
              {/* Option 1: Claim personally */}
              <label className="block mb-4 text-[#000] text-[18px]">
                <input
                  type="radio" // Radio input for exclusive selection.
                  name="claimOption" // Group name for radio inputs.
                  value="self" // Value for the "claim personally" option.
                  onChange={handleOptionChange} // Event handler when option is selected.
                  className="mr-2" // Spacing for better alignment.
                />
                I will claim my document personally.
              </label>

              {/* Option 2: Authorize someone else */}
              <label className="block mb-4 text-[#000] text-[18px]">
                <input
                  type="radio" // Radio input for exclusive selection.
                  name="claimOption" // Group name for radio inputs.
                  value="authorized" // Value for the "authorize someone" option.
                  onChange={handleOptionChange} // Event handler when option is selected.
                  className="mr-2" // Spacing for better alignment.
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

            {/* Instructions Section */}
            <p className="text-[16px] font-LatoItalic text-[#161F55] text-left mb-6">
              Please note that if you authorize someone to claim your documents,
              the following must be provided:
              <ul className="list-disc pl-6 mt-2">
                <li className="mb-2">
                  Authorization Letter indicating the name of the person
                  authorized. {/* Authorization letter requirement */}
                </li>
                <li className="mb-2">
                  Photocopy of Valid ID (front and back) of both the
                  student/alumnus, with 3 signatures. {/* ID requirement for student */}
                </li>
                <li className="mb-2">
                  Photocopy of Valid ID (front and back) of the authorized
                  person processing the request, with 3 signatures. {/* ID requirement for authorized person */}
                </li>
              </ul>
            </p>

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              {/* Back Button */}
              <button
                className="px-6 py-2 bg-[#161f55] text-white rounded-md hover:bg-[#1b2a6b]"
                onClick={(e) => {
                  e.preventDefault(); // Prevent default form submission.
                  onBack(); // Trigger the parent component's "Back" function.
                }}
              >
                Back
              </button>

              {/* Next Button */}
              <button
                className={`px-6 py-2 rounded-md text-white ${
                  selectedOption
                    ? "bg-[#161f55] hover:bg-[#1b2a6b]" // Active style if an option is selected.
                    : "bg-[#161f55]" // Default style.
                }`}
                onClick={(e) => {
                  e.preventDefault(); // Prevent default form submission.
                  handleNext(); // Trigger the handleNext function to validate and proceed.
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

export default Claiming; // Exporting the component for use in other parts of the application.
