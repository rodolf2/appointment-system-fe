import React from "react";

const About = () => {
  return (
    <>
      <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center bg-primary text-[#EEF2F7] font-lato">
        <div className="h-[600px] w-full flex flex-col items-center justify-center text-center p-5">
          <p className="border-b-4 border-[#F3BC62] inline font-thin text-[40px] pb-4 pt-5">
            ABOUT US
          </p>
          <p className="max-w-[900px] mx-auto pt-5 font-thin text-[20px] text-center pb-3 m-3 mt-10">
            The La Verdad Christian College or LVCC is a private non-stock,
            non-sectarian educational institution established in Apalit,
            Pampanga, Philippines. It is the first private school in the
            Philippines that{" "}
            <span className="font-bold"> GRANTS FULL SCHOLARSHIP PROGRAM </span>
            to deserving students by providing tuition-free education and no
            miscellaneous fees. It is one of the best schools in Pampanga, up to
            regional and national levels.
          </p>
        </div>

        <div
          className="h-[600px] w-full flex flex-col items-center justify-center text-center bg-center bg-cover bg-no-repeat brightness-"
          style={{
            backgroundImage: "url('../image/Rectangle 11941.jpg')",
          }}
        >
          <p className="border-b-4 border-[#F3BC62] inline font-thin text-[48px] pb-4">
            VISION
          </p>
          <p className="max-w-[700px] mx-auto pt-5 text-[20px] mt-10">
            The institution that ensures quality learning and biblical moral
            standards.
          </p>
        </div>

        <div className="h-[600px] w-full flex flex-col items-center justify-center text-center p-4">
          <p className="border-b-4 border-[#F3BC62] inline font-thin text-[40px] pb-4">
            MISSION
          </p>
          <p className="max-w-[700px] mx-auto pt-5 text-[20px] mt-10">
            To be the frontrunner in providing academic excellence and morally
            upright principles.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
