import { useRef, useState } from "react";

const Attachment = ({ onNext, onBack }) => {
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
    <div className="h-screen flex flex-col bg-[#161f55]">
      {/* Top Half - Image with Text */}
      <div
        className="relative h-1/2 bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage:
            "url('/src/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
          opacity: "0.3",
        }}
      ></div>

      {/* Bottom Half - Solid Color */}
      <div className="h-1/2 relative bg-[#161f55] flex flex-col items-center justify-center">
        <h2 className="text-white relative bottom-60 font-LatoBold w-[450px] text-center flex justify-center text-[35px] tracking-widest z-10">
          APPLICATION FOR RECORDS
        </h2>
        {/* Content Card */}
        <div className="bottom-44 relative flex flex-col bg-white p-8 rounded-lg shadow-md w-[90%] max-w-md text-center z-10">
          <p className="text-[#161F55] font-LatoItalic mb-4">
            To proceed with your request, please upload the required
            requirements. Processing will not begin until all necessary
            requirements are submitted and approved by the administrator. The
            status of your request will be updated accordingly.
          </p>

          <h2 className="text-gray-800 font-bold text-lg mb-4">ATTACHMENT</h2>

          {/* File List */}
          <div className="mb-4">
            {files.length > 0 ? (
              files.map((file, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center bg-gray-100 p-2 rounded-lg shadow-sm mb-2"
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
              <p className="text-gray-500">No files added.</p>
            )}
          </div>

          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="my-2 justify-start flex text-[#161f55] border-2 py-2 px-2 w-[380px] rounded-[20px] border-[#161f55]"
            multiple // Allow multiple file selection
          />

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          {/* Add Another File Button */}
          <button
            type="button"
            className="border-2 border-[#161f55] font-LatoBold text-[#000] text-[16px] px-4 py-2 rounded-[20px] w-[170px] mb-4 hover:bg-[#161f55] hover:text-[#fefefe] transition-colors flex justify-start text-start bg-none"
            onClick={handleAddFile}
          >
            + Add Another File
          </button>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <button
              className="bg-[#161f55] text-white px-6 py-2 rounded-lg hover:bg-blue-800"
              onClick={(e) => {
                e.preventDefault();
                onBack();
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
  );
};

export default Attachment;
