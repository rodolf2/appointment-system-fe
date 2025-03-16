import { useState } from "react";
import CustomProgressBar from "/src/features/appointment/CustomProgressBar";

const SelectDocuments = ({ onNext, onBack, currentStep }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});
  const [claimOption, setClaimOption] = useState(null); // Track user's claim choice

  const documentsList = [
    { label: "Certificate of Enrollment", value: "certificate_of_enrollment" },
    { label: "Good Moral Certificate", value: "good_moral_certificate" },
    { label: "Form 137", value: "form_137" },
    { label: "Certified True Copy of Documents", value: "certified_copy" },
    { label: "Transcript of Records", value: "transcript_of_records" },
    {
      label: "Education Service Contracting Certificate ",
      value: "Education Service Contracting Certificate ",
    },
  ];

  const handleDocumentSelection = (value) => {
    setSelectedDocuments((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((doc) => doc !== value)
        : [...prevSelected, value]
    );
    setErrors((prevErrors) => ({ ...prevErrors, selectedDocuments: "" }));
  };

  const removeDocument = (value) => {
    setSelectedDocuments((prevSelected) =>
      prevSelected.filter((doc) => doc !== value)
    );
  };

  const handleValidation = () => {
    let newErrors = {};
    if (selectedDocuments.length === 0)
      newErrors.selectedDocuments = "Please select at least one document.";
    if (!purpose.trim()) newErrors.purpose = "This field is required.";
    if (!date) newErrors.date = "Please select a date.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (handleValidation()) {
      setShowModal(true); // Show modal for claim options
    }
  };

  const handleClaimOption = (option) => {
    setClaimOption(option); // Set the user's claim choice
  };

  const handleModalNext = () => {
    setShowModal(false); // Close the modal

    if (claimOption === "personal") {
      // Skip to step 5 (number 4 in progress bar)
      onNext(5); // Pass the step number to the parent component
    } else if (claimOption === "authorized") {
      // Go to step 4 (number 3 in progress bar)
      onNext(4); // Pass the step number to the parent component
    }
  };

  return (
    <>
      <div
        className={`bg-Primary h-screen relative ${showModal ? "blur-sm" : ""}`}
      >
        <div className={`bg-Primary h-screen relative`}>
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
          <div className="relative flex flex-col justify-center text-center">
            <h2 className="font-LatoBold text-[30px] text-Fwhite tracking-widest py-3">
              APPLICATION FOR RECORDS
            </h2>
            <div className="relative mx-auto bg-white p-5 rounded-lg shadow-md w-full max-w-[60%] text-center z-10">
              {/* Progress Bar */}
              <div className="w-full max-w-[50%] place-self-center mt-2 ">
                <CustomProgressBar currentStep={currentStep} />
              </div>

              <h2 className="uppercase text-lg text-left font-LatoBold my-4">
                Request:
              </h2>

              <label className="text-start block font-LatoRegular text-[#000]">
                SELECT DOCUMENTS:
              </label>
              <div
                className={`border rounded-lg p-4 shadow-md font-LatoRegular ${
                  errors.selectedDocuments
                    ? "border-red-600 "
                    : "border-[#000000] border-opacity-40 "
                }`}
              >
                <div className="grid grid-cols-2 gap-y-2 gap-x-2 ml-8">
                  {documentsList.map((doc) => (
                    <label
                      key={doc.value}
                      className="flex items-center space-x-2"
                    >
                      <input
                        type="radio"
                        value={doc.value}
                        onChange={() => handleDocumentSelection(doc.value)}
                        checked={selectedDocuments.includes(doc.value)}
                        className="h-5 w-5 "
                      />
                      <span>{doc.label}</span>
                    </label>
                  ))}
                </div>
                <div>
                  {errors.selectedDocuments ? (
                    <p className="text-red-600">{errors.selectedDocuments}</p>
                  ) : (
                    <p className="invisible">Placeholder</p> // Keeps space reserved
                  )}
                </div>
                {/* Display Selected Documents with Remove Option */}
                <div className="mt-2 text-start font-LatoRegular min-h-[135px] ">
                  <strong className="ml-8">Selected Documents:</strong>{" "}
                  {selectedDocuments.length > 0 ? (
                    <ul className="grid grid-cols-2 gap-y-1 gap-x-6 mt-1">
                      {selectedDocuments.map((doc) => {
                        const documentLabel = documentsList.find(
                          (d) => d.value === doc
                        )?.label;
                        return (
                          <li
                            key={doc}
                            className="flex justify-between font-LatoRegular text-[16px] items-center bg-gray-200 px-2 py-1 rounded-md"
                          >
                            <span className="text-gray-800">
                              {documentLabel}
                            </span>
                            <button
                              onClick={() => removeDocument(doc)}
                              className="text-red-600 font-LatoRegular hover:text-red-800"
                            >
                              Remove
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <span className="text-gray-500 flex ml-8">
                      No documents selected.
                    </span>
                  )}
                </div>
              </div>

              <div className="text-start mt-4">
                <label className="uppercase font-LatoRegular">
                  State your purpose for applying:
                </label>
                <textarea
                  value={purpose}
                  onChange={(e) => {
                    setPurpose(e.target.value);
                    setErrors((prev) => ({ ...prev, purpose: "" }));
                  }}
                  placeholder="Type here..."
                  className={`w-full border h-20 rounded-md pl-2 pt-2 shadow-md ${
                    errors.purpose
                      ? "border-red-600"
                      : "border-[#000000] border-opacity-40"
                  }`}
                ></textarea>
                {errors.purpose ? (
                  <p className="text-red-600">{errors.purpose}</p>
                ) : (
                  <p className="invisible">Placeholder</p> // Keeps space reserved
                )}
              </div>

              <label className="mt-2 block text-start uppercase">
                Date of Request
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => {
                  setDate(e.target.value);
                  setErrors((prev) => ({ ...prev, date: "" }));
                }}
                className={`pl-2 mt-1 block w-full max-w-[20%] border h-8 rounded-md ${
                  errors.date
                    ? "border-red-600"
                    : "border-[#000000] border-opacity-40"
                }`}
              />
              {errors.date ? (
                <p className="text-red-600 text-start">{errors.date}</p>
              ) : (
                <p className="invisible">Placeholder</p> // Keeps space reserved
              )}

              <div className="flex justify-end space-x-2  ">
                <button
                  className="px-6 py-2  bg-[#161f55] text-white rounded-md"
                  onClick={onBack}
                >
                  Back
                </button>
                <button
                  className="px-6 py-2 bg-[#161f55] text-white rounded-md"
                  onClick={handleNext}
                >
                  Next
                </button>
              </div>
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
                  onChange={() => handleClaimOption("personal")} // Handle personal claim
                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded-full"
                />
                <span>I will claim my document personally.</span>
              </label>

              <label className="flex items-center space-x-2 mt-4 cursor-pointer">
                <input
                  type="radio"
                  name="claim_option"
                  value="authorized"
                  onChange={() => handleClaimOption("authorized")} // Handle authorized claim
                  className="h-5 w-5 text-indigo-600 border-gray-300 rounded-full"
                />
                <span>
                  I will authorize someone else to claim it on my behalf.
                </span>
              </label>

              {/* Instructions for Authorized Person */}
              <p className="mt-4 text-sm text-[#161f55] italic">
                Please note that if you authorize someone to claim your
                documents, the following must be provided:
              </p>
              <ul className="list-disc pl-5 text-sm text-[#161f55] ">
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
            <h2 className="uppercase text-lg text-left font-LatoBold my-6">
              For Delivery Transaction
            </h2>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="claim_option"
                value="courier"
                onChange={() => handleClaimOption("courier")} // Handle courier claim
                className="h-5 w-5 text-indigo-600 border-gray-300 rounded-full"
              />
              <span>I will claim my document through courier.</span>
            </label>
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
                onClick={handleModalNext} // Handle modal next
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
