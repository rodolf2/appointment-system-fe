import React from "react";
import BackToTopButton from "../components/BackToTopButton";

const About = () => {
  return (
    <>
      <div className="max-w-[1440px] mx-auto flex flex-col items-center justify-center bg-primary text-[#EEF2F7] font-lato">
        <div className="h-96 w-full flex flex-col items-center justify-center text-center p-5">
          <p className="border-b-2 border-[#F3BC62] inline font-semibold text-xl pb-2">
            ABOUT US
          </p>
          <p className="max-w-[800px] mx-auto pt-5 font-thin">
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
            backgroundImage: "url('../image/Vision_BG (2).png')",
          }}
        >
          <p className="border-b-2 border-[#F3BC62] inline font-semibold text-xl pb-2">
            VISION
          </p>
          <p className="max-w-[600px] mx-auto pt-5">
            The institution that ensures quality learning and biblical moral
            standards.
          </p>
        </div>

        <div className="h-96 w-full flex flex-col items-center justify-center text-center p-5">
          <p className="border-b-2 border-[#F3BC62] inline font-semibold text-xl pb-2">
            MISSION
          </p>
          <p className="max-w-[600px] mx-auto pt-5">
            To be the frontrunner in providing academic excellence and morally
            upright principles.
          </p>
        </div>
      </div>
      <BackToTopButton />
    </>
  );
};

export default About;
