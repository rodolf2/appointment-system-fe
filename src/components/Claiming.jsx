import React from "react";

const Claiming = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center bg-blue-500"  >
        {/* Background Layers */}
        <div className="absolute inset-0 flex flex-col">
          {/* Top Half - Image */}
          <div
            className="h-1/2 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/src/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
              opacity: "0.7",
            }}
          ></div>

          {/* Bottom Half - Solid Color */}
          <div className="h-1/2 bg-[#161f55]"></div>
        </div>
      </div>
    </>
  );
};

export default Claiming;
