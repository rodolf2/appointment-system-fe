import React from "react";
import BackToTopButton from "../components/BackToTopButton";

const HowToAppoint = () => {
  return (
    <>
      <div
        className="h-screen w-full max-w-[1440px] mx-auto bg-cover bg-center flex items-center justify-center relative font-lato"
        style={{ backgroundImage: "url('../image/BackGround.png')" }}
      >
        <div className="absolute inset-0 bg-custom-gradient z-10 pb-10"></div>

        <div className="relative z-20 text-center">
          <p className="border-b-4 border-white  font-semibold text-2xl pb-6 text-white text-[50px] ">
            WISDOM BASED ON THE TRUTH IS PRICELESS
          </p>
          <p className="text-white">
            Well-known for offering quality education with a focus on Christian
            values, moral development, and academic excellence
          </p>
        </div>
      </div>
      <BackToTopButton />
    </>
  );
};

export default HowToAppoint;
