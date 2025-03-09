import CustomProgressBar from "/src/features/appointment/CustomProgressBar"; // Import the progress bar

const SelectDocuments = ({ onNext, onBack, currentStep }) => {
  return (
    <>
      <div className="bg-Primary h-screen relative">
        {/* Fixed background container */}
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
          <h2 className="mx-auto font-LatoBold text-[35px] text-Fwhite  tracking-widest mt-6 mb-8">
            APPLICATION FOR RECORDS
          </h2>

          <div className="relative mx-auto flex flex-col bg-white p-8 rounded-lg shadow-md w-full max-w-[70%] text-center z-10">
            {/* Progress Bar at the Top */}
            <div className=" w-full max-w-[50%] ">
              <CustomProgressBar currentStep={currentStep} />
            </div>
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

            {/* PURPOSE */}
            <div className="text-start block text-lg mt-8 font-LatoRegular text-[#000] uppercase">
              <label>State your purpose for applying:</label>
              <textarea
                name="purpose"
                placeholder="Type here..."
                className="pl-2 pt-1 mt-1 block w-full border-2 h-20 rounded-md"
              ></textarea>
            </div>

            {/* DATE */}
            <label className="mt-8 block text-start font-LatoRegular text-[17px] text-[#000] uppercase">
              Date of Request
            </label>
            <input
              type="date"
              name="date"
              className="pl-2 mt-1 mb-2 block w-full max-w-[20%] border-2 h-8 rounded-md"
            />

            {/* Navigation Buttons */}
            <div className="flex justify-end space-x-2">
              <button
                className="px-6 py-2 bg-[#161f55] text-white rounded-md hover:bg-[#1b2a6b]"
                onClick={(e) => {
                  e.preventDefault();
                  onBack(); // Go back to the previous step
                }}
              >
                Back
              </button>

              <button
                className="px-6 py-2 bg-[#161f55] text-white rounded-md hover:bg-[#1b2a6b]"
                onClick={(e) => {
                  e.preventDefault();
                  onNext(); // Proceed to the next step
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

export default SelectDocuments;
