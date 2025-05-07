import { Link } from "react-router";

const LandingPage = () => {
  return (
    <>
      <main className="relative w-full h-screen overflow-hidden">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg"
            alt="La Verdad Christian College"
            className="w-full h-full object-cover opacity-90 drop-shadow-2xl"
          />
          {/* Linear Shadow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F3BC62]/40 to-[#252F6A]/80"></div>
        </div>

        {/* Content Container - Using flex layout to ensure content stays proportional */}
        <div className="relative z-10 w-full h-full flex flex-col">
          {/* Header: Logo and AppointEase - Positioned with percentage and viewport units */}
          <div className="flex items-center p-4 sm:p-6">
            <img
              src="/assets/image/LV_logo.png"
              alt="LVCC Logo"
              className="w-10 h-10 sm:w-14 sm:h-14 md:w-20 md:h-20 lg:w-24 lg:h-24 mr-2"
            />
            <div className="flex items-baseline tracking-widest">
              <span className="text-Bbackground text-lg sm:text-xl md:text-2xl lg:text-3xl font-regular font-thin">
                LVCC
              </span>
              <span className="text-Bbackground text-lg sm:text-xl md:text-2xl lg:text-3xl font-LatoSemiBold pl-1 sm:pl-2">
                AppointEase
              </span>
            </div>
          </div>

          {/* Main Content - Using flex-grow to take available space and center content */}
          <div className="flex-grow flex flex-col items-center justify-center text-center px-4">
            <div className="relative flex flex-col items-center max-w-7xl mx-auto">
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-LatoBold uppercase  tracking-wider leading-loose">
                LA VERDAD CHRISTIAN <br /> COLLEGE
              </h1>

              {/* Line that scales with text width instead of fixed position */}
              <div className="relative w-full flex justify-center my-4">
                <span className="w-11/12 sm:w-full max-w-5xl h-1 sm:h-2 bg-[#EEF2F7]"></span>
              </div>

              <p className="text-Fwhite text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl max-w-xs sm:max-w-lg md:max-w-xl lg:max-w-2xl leading-relaxed  font-LatoRegular">
                La Verdad Christian School provides students a high-quality and
                carefully defined educational program emphasizing Christian
                values, various skills, and vast creative activities.
              </p>

              {/* Button positioned relative to the text */}
              <Link
                to="/home/announcement"
                className="mt-6 sm:mt-8 bg-LBackground hover:bg-blue-800 text-white py-2 px-4 sm:py-3 sm:px-6 rounded-md shadow-lg text-sm sm:text-base transition-colors duration-200 w-40 h-[50px] "
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default LandingPage;
