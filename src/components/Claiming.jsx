import React from "react";

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
              <h2>UPON CLAIMING THE DOCUMENT:</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Claiming;
