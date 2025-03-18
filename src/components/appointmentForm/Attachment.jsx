import { useRef, useState } from "react";
import CustomProgressBar from "/src/features/appointment/CustomProgressBar";
import { Navigate } from "react-router";

const Attachment = ({ onNext, onBack, currentStep }) => {
  const [files, setFiles] = useState([]); // To store selected files
  const fileInputRef = useRef(null); // Reference to the hidden file input
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]); // Add new files to the existing list
    setError(""); // Clear error when a file is added
  };

  const handleAddFile = () => {
    fileInputRef.current.click(); // Simulate a click on the hidden file input
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index)); // Remove the selected file
  };

  const handleNext = () => {
    if (files.length === 0) {
      setError("You need to upload at least one file to proceed");
    } else {
      setError("");
      onNext();
    }
  };

  return (
    <>
      <div className="{ `bg-Primary h-screen relative}">
        {/* fixed background */}
        <div className=" fixed inset-0 w-full h-full ">
          <div
            className="h-1/2 bg-cover bg-bottom relative"
            style={{
              backgroundImage:
                "url('/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="absolute inset-0 bg-Primary opacity-70"></div>
          </div>
          <div className="h-1/2 bg-[#161f55]"></div>
        </div>
        <div className="relative flex flex-col justify-center text-center">
          <h2 className="font-LatoBold text-[35px] text-Fwhite tracking-widest py-8">
            APPLICATION FOR RECORDS
          </h2>
          <div className="relative mx-auto bg-white p-5 rounded-lg shadow-md w-full max-w-[50%]  text-center z-10">
            {/* Progress Bar */}
            <div className="w-full max-w-[50%] place-self-center mt-4 ">
              <CustomProgressBar currentStep={currentStep} />
            </div>

            <p className="text-[#161F55] font-LatoItalic mt-20 mb-8 w-[540px] mx-auto">
              To proceed with your request, please upload the required
              requirements. Processing will not begin until all necessary
              requirements are submitted and approved by the administrator. The
              status of your request will be updated accordingly.
            </p>
            <h2 className="text-gray-800 font-bold text-lg mb-4">ATTACHMENT</h2>
            {/* File List */}
            <div className="mb-4 flex flex-col items-center">
              {files.length > 0 ? (
                files.map((file, index) => (
                  <div
                    key={index}
                    className="flex justify-between w-[500px] items-center bg-gray-100 p-2 rounded-lg shadow-sm mb-2"
                  >
                    <span className="text-gray-800">{file.name}</span>
                    <button
                      className="text-red-600 hover:text-red-800 text-sm"
                      onClick={() => handleRemoveFile(index)}
                    >
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 mt-2">No files added.</p>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className={`my-2 justify-center shadow-md text-[#161f55] border-2 py-2 px-2 w-[380px] rounded-[20px] 
    ${error ? "border-red-500" : "border-[#000] border-opacity-40"}`}
              multiple // Allow multiple file selection
            />

            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

            {/* Add Another File Button */}
            <div className="pr-[210px]">
              <button
                type="button"
                className="border-2 shadow-md border-[#425066] border-opacity-40 font-LatoBold text-[#000] text-[16px] px-4 py-2 rounded-[20px] w-[170px] mb-4 hover:bg-[#161f55] hover:text-[#fefefe] transition-colors  justify-center text-start bg-none"
                onClick={handleAddFile}
              >
                + Add Another File
              </button>
            </div>
            {/* Navigation Buttons */}
            <div className="flex justify-end gap-2 mt-4 ">
              <button
                className="bg-[#161f55] text-white px-6 py-2 rounded-lg hover:bg-blue-800"
                onClick={(e) => {
                  e.preventDefault();
                  onBack();
                  Navigate("/appointmentForm?step=3");
                }}
              >
                Back
              </button>
              <button
                className="bg-[#161f55] text-white px-6 py-2 rounded-lg hover:bg-blue-800"
                onClick={handleNext}
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

export default Attachment;
