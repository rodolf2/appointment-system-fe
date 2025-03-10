import { useState } from "react";
import CustomProgressBar from "/src/features/appointment/CustomProgressBar";

const SelectDocuments = ({ onBack, currentStep }) => {
  const [showModal, setShowModal] = useState(false); // Control modal visibility

  return (
    <>
      <div
        className={`bg-Primary h-screen relative ${showModal ? "blur-sm" : ""}`}
      >
        {/* Fixed Background */}
        <div className="fixed inset-0 w-full h-full">
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

        {/* Foreground Content */}
        <div className="relative flex flex-col justify-center text-center m-8 overflow-x-hidden">
          <h2 className="mx-auto font-LatoBold text-[35px] text-Fwhite tracking-widest mt-6 mb-8">
            APPLICATION FOR RECORDS
          </h2>

          <div className="relative mx-auto flex flex-col bg-white p-8 rounded-lg shadow-md w-full max-w-[60%] text-center z-10">
            {/* Progress Bar */}
            <div className="w-full max-w-[50%]">
              <CustomProgressBar currentStep={currentStep} />
            </div>

            {/* Step: Document Selection */}
            <>
              <h2 className="uppercase text-lg text-left font-LatoBold my-8">
                Request:
              </h2>
              <label className="text-start block font-LatoRegular text-[#000] mb-4">
                SELECT DOCUMENTS:
              </label>
              <div className="border rounded-lg p-4 shadow-md">
                <div className="cursor-pointer grid grid-cols-2 gap-y-4 gap-x-6 font-LatoRegular text-[#000] text-start">
                  {[
                    {
                      label: "Certificate of Enrollment",
                      value: "certificate_of_enrollment",
                    },
                    {
                      label: "Good Moral Certificate",
                      value: "good_moral_certificate",
                    },
                    { label: "Form 137", value: "form_137" },
                    {
                      label: "Certified True Copy of Documents",
                      value: "certified_copy",
                    },
                    {
                      label: "Transcript of Records",
                      value: "transcript_of_records",
                    },
                    {
                      label: "Education Service Contracting Certificate (ESC)",
                      value: "esc_certificate",
                    },
                  ].map((doc) => (
                    <label
                      key={doc.value}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="radio"
                        name="document"
                        value={doc.value}
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded-full"
                      />
                      <span className="text-gray-800">{doc.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Purpose */}
              <div className="text-start block text-lg mt-8 font-LatoRegular text-[#000] uppercase">
                <label>State your purpose for applying:</label>
                <textarea
                  name="purpose"
                  placeholder="Type here..."
                  className="pl-2 pt-1 mt-1 block w-full border-2 h-20 rounded-md"
                ></textarea>
              </div>

              {/* Date */}
              <label className="mt-8 block text-start font-LatoRegular text-[17px] text-[#000] uppercase">
                Date of Request
              </label>
              <input
                type="date"
                name="date"
                className="pl-2 mt-1 mb-2 block w-full max-w-[20%] border-2 h-8 rounded-md"
              />
            </>

            {/* Navigation Buttons */}
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="px-6 py-2 bg-[#161f55] text-white rounded-md hover:bg-[#1b2a6b]"
                onClick={onBack}
              >
                Back
              </button>

              <button
                className="px-6 py-2 bg-[#161f55] text-white rounded-md hover:bg-[#1b2a6b]"
                onClick={() => setShowModal(true)} // Open modal on click
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MODAL: Upon Claiming the Document */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full text-center">
            <h2 className="uppercase text-lg text-left font-LatoBold my-8">
              Upon Claiming the Document:
            </h2>

            <div className="text-left text-gray-800">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="claim_option"
                  value="personal"
                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded-full"
                />
                <span>I will claim my document personally.</span>
              </label>

              <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                <input
                  type="radio"
                  name="claim_option"
                  value="authorized"
                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded-full"
                />
                <span>
                  I will authorize someone else to claim it on my behalf.
                </span>
              </label>

              {/* Instructions for Authorized Person */}
              <p className="mt-4 text-sm text-gray-600 italic">
                Please note that if you authorize someone to claim your
                documents, the following must be provided:
              </p>
              <ul className="list-disc pl-5 text-sm text-gray-800">
                <li>
                  Authorization Letter indicating the name of the person
                  authorized.
                </li>
                <li>
                  Photocopy of Valid ID (front and back) of the student/alumnus,
                  with 3 signatures.
                </li>
                <li>
                  Photocopy of Valid ID (front and back) of the authorized
                  person processing the request, with 3 signatures.
                </li>
              </ul>
            </div>

            {/* Modal Buttons */}
            <div className="flex justify-end space-x-2 mt-6">
              <button
                className="px-6 py-2 bg-gray-300 rounded-md"
                onClick={() => setShowModal(false)} // Close modal
              >
                Back
              </button>

              <button
                className="px-6 py-2 bg-[#161f55] text-white rounded-md hover:bg-[#1b2a6b]"
                onClick={() => {
                  setShowModal(false); // Close modal
                  console.log("Proceeding with selection...");
                }}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SelectDocuments;
