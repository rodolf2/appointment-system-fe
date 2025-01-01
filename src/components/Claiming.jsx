
const Claiming = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-[#161f55]">
        {/* Background Layers */}
        <div className="absolute inset-0 flex flex-col">
          {/* Top Half - Image */}
          <div
            className="h-1/2 bg-cover bg-center"
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
              <h2 className="text-lg font-semibold mb-4">
                UPON CLAIMING THE DOCUMENT:
              </h2>

              {/* Options */}
              <div className="text-left">
                <label className="block mb-4 text-[#000] text-[18px]">
                  <input
                    type="radio"
                    name="claimOption"
                    value="self"
                    className="mr-2"
                  />
                  I will claim my document personally.
                </label>

                <label className="block mb-4 text-[#000] text-[18px]">
                  <input
                    type="radio"
                    name="claimOption"
                    value="authorized"
                    className="mr-2"
                  />
                  I cannot claim my document personally. I will authorize
                  someone else to claim it on my behalf.
                </label>
              </div>

              {/* Instructions */}
              <p className="text-[16px] font-LatoItalic text-[#161F55] text-left mb-6">
                Please note that if you authorize someone to claim your
                documents, the following must be provided:
                <ul className="list-disc pl-6 mt-2">
                  <li>
                    Authorization Letter indicating the name of the person
                    authorized.
                  </li>
                  <li>
                    Photocopies of valid ID (front and back) of both the student
                    and the authorized person, with 3 signatures.
                  </li>
                  <li>
                    Photocopies of valid ID (front and back) of the authorized
                    person processing the request, with 3 signatures.
                  </li>
                </ul>
              </p>

              {/* Navigation Buttons */}
              <div className="flex justify-between">
                <button className="px-6 py-2 bg-[#161f55] text-white rounded-md hover:bg-[#1b2a6b]">
                  Back
                </button>
                <button className="px-6 py-2 bg-[#161f55] text-white rounded-md hover:bg-[#1b2a6b]">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Claiming;
