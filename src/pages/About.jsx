const About = () => {
  return (
    <>
      {/* CONTENT */}
      <section className="mx-auto bg-[#161F55] flex flex-col items-center">
        <div className="mt-20  ">
          <h2 className="text-[48px] font-LatoBold text-Bbackground tracking-widest relative mb-8 text-center ">
            ABOUT US
          </h2>
          <div className="w-[400px] h-1 bg-[#F3BC62] mx-auto mb-8"></div>

          <p className="font-LatoRegular text-Bbackground text-[35px] tracking-widest w-[1190px] text-center">
            The La Verdad Christian College or LVCC is a private non-stock,
            non-sectarian educational institution established in Apalit,
            Pampanga, Philippines. It is the first private school in the
            Philippines that
            <span className=" font-LatoBold text-Gold mx-2">
              GRANTS FULL SCHOLARSHIP PROGRAM
            </span>
            to deserving students by providing tuition-free education and no
            miscellaneous fees. It is one of the best schools in Pampanga, up to
            regional and national levels.
          </p>
        </div>

        {/* VISION */}
        <div className=" mt-40 relative flex flex-col items-center w-full">
          <div className=" relative w-full">
            <img
              src="/assets/image/about.png"
              alt=""
              className=" w-full max-w[1440px] h-[750px] mx-auto object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#F3BC62]/20 to-[#252F6A]/30"></div>
            <h2 className="text-[48px] font-LatoBold text-Bbackground tracking-widest mb-8  justify-center flex absolute inset-[35%] ">
              VISION
            </h2>
            <div className="w-[400px] h-1 bg-[#F3BC62] mx-auto absolute inset-x-0 top-[50%] "></div>

            <p className=" absolute inset-x-0 top-[57%] text-[35px] font-LatoSemiBold text-Bbackground text-center tracking-widest w-[60rem] m-auto">
              The institution that ensures quality learning and biblical moral
              standards.
            </p>
          </div>
        </div>

        {/* MISSION */}

        <div className="mt-32 h-[550px]">
          <h2 className="text-[48px] font-LatoBold text-Bbackground tracking-widest relative mb-8 text-center ">
            MISSION
          </h2>
          <div className="w-[400px] h-1 bg-[#F3BC62] mx-auto mb-8"></div>

          <p className="font-LatoSemiBold text-Bbackground text-[35px] tracking-widest w-[986px] text-center">
            To be the frontrunner in providing academic excellence and morally
            upright principles.
          </p>
        </div>
      </section>
    </>
  );
};

export default About;
