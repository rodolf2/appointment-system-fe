import Buttons from "../components/Buttons";
const HowToAppoint = () => {
  return (
    <>
      <div className="max-w-[1440px] mx-auto h-full relative font-lato">
        {/* Header Section */}
        <div
          className="relative w-full h-screen bg-cover  bg-center flex items-center justify-center text-white text-center"
          style={{
            backgroundImage: "url('/src/assets/image/IMG_2830.JPG')",
          }}
        >
          <div className="absolute inset-0 bg-custom-gradient_howtoappoint z-10 pb-10"></div>

          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 px-4">
            <h1 className=" tracking-wider text-[40px] font-LatoSemiBold uppercase mb-4 border-b-8 border-white pb-6 max-w-[600px]">
              Wisdom Based on the Truth is Priceless
            </h1>
            <p className="text-[20px] max-w-[500px] mx-auto">
              Well-known for offering quality education with a focus on
              Christian values, moral development, and academic excellence.
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Buttons />

        {/* Appointment Steps */}
        <div className="bg-[#161F55] text-white py-12 px-4 flex justify-around h-screen">
          <div className=" flex flex-col justify-center w-[500px]">
            <h2 className="text-[40px] font-semibold text-center mb-6 border-b-8 border-[#F3BC62] ">
              APPOINTMENT SCHEDULING
            </h2>
            <p className="text-center mb-8 text-[25px]">
              How to schedule an appointment in 5 easy steps
            </p>
          </div>

          {/* Steps */}
          <div className="flex justify-center items-center">
            <div className="space-y-6">
              {/* Step 1 */}
              <div className="flex items-start">
                <span className="text-5xl font-bold mr-4 border-r-8 border-[#F3BC62]">
                  01.
                </span>
                <div>
                  <h3 className="uppercase text-3xl font-bold ">Step 1:</h3>
                  <p className="text-1xl ">Click the appointment button</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-start">
                <span className="text-5xl font-bold mr-4 border-r-8 border-[#F3BC62]">
                  02.
                </span>
                <div>
                  <h3 className="uppercase text-3xl font-bold  gap-4">
                    Step 2:
                  </h3>
                  <p className="text-1xl ">Fill out the request form</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-start">
                <span className="text-5xl font-bold mr-4 border-r-8 border-[#F3BC62]">
                  03.
                </span>
                <div>
                  <h3 className="uppercase text-3xl font-bold ">Step 3:</h3>
                  <p className="text-1xl ">Upload the necessary requirements</p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-start">
                <span className="text-5xl font-bold mr-4 border-r-8 border-[#F3BC62]">
                  04.
                </span>
                <div>
                  <h3 className="uppercase text-3xl font-bold ">Step 4:</h3>
                  <p className="text-1xl ">Choose an appointment date</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-start">
                <span className="text-5xl font-bold mr-4 border-r-8 border-[#F3BC62]">
                  05.
                </span>
                <div>
                  <h3 className="uppercase text-3xl font-bold ">Step 5:</h3>
                  <p className="text-1xl ">
                    Submit and wait for an email of approval
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowToAppoint;
