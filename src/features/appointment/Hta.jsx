import Buttons from "@/components/Buttons";
import VideoCard from "@/components/CustomVideoPlayer";

const Hta = () => {
  return (
    <>
      <div className="font-LatoRegular">
        {/* Header Section */}
        <div
          className="relative w-full h-[900px] bg-cover  bg-center flex items-center justify-center text-white text-center"
          style={{
            backgroundImage: "url('/assets/image/BackGround.png')",
            filter: "brightness(1.5)",
          }}
        >
          <div className="absolute inset-0 bg-custom-gradient_howtoappoint z-10 pb-10"></div>
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          <div className="relative z-10 px-4 max-w-[800px] ">
            <h1 className="text-[50px] font-LatoSemiBold uppercase tracking-widest">
              WISDOM BASED ON
              <br />
              THE TRUTH IS PRICELESS
            </h1>
            <div className="border-b-8 border-white my-4"></div>
            <p className="text-[30px] ">
              Well-known for offering quality education with a focus on
              Christian values, moral development, and academic excellence
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <Buttons />

        {/* Appointment Steps */}
        <div className="bg-[#161F55] text-white pb-10 flex justify-center items-center mx-auto min-h-[900px] w-full">
          <div className="w-[70%]">
            <div className="flex flex-col justify-start tracking-widest leading-normal pt-28 text-start pl-20">
              <h2 className="text-[35px] font-semibold tracking-[12px]">
                APPOINTMENT SCHEDULING
              </h2>
              <span className=" border-b-[8px] border-[#F3BC62] my-4 w-[690px] ml-4"></span>
              <p className="text-[30px] uppercase pt-10 tracking-widest py-20">
                How to schedule an appointment in 5 easy steps
              </p>
            </div>
            <div className="space-y-5 bg-gray-200 p-6 rounded-xl shadow-md w-[90%] mx-auto">
              <VideoCard
                videoSrc="../public/assets/videos/English.mp4"
                title={`LV AppointEase: Appointment Scheduling Tutorial (English Ver.)`}
              />
              <VideoCard
                videoSrc="../public/assets/videos/TAGALOG.mp4"
                title={`LV AppointEase: Appointment Scheduling Tutorial (Tagalog Ver.)`}
              />
            </div>
            {/* </div> */}
          </div>

          {/* Steps */}
          <div className="flex justify-center items-center w-[30%] pt-[360px]">
            <div className="space-y-6 tracking-wider text-[20px] ">
              {/* Step 1 */}
              <div className="flex items-center pb-2 ">
                <span className="text-5xl font-bold">01.</span>
                <span className="border-r-[8px] border-[#F3BC62] h-[220px] mx-5"></span>
                <div className="space-y-4">
                  <h3 className="uppercase text-3xl font-bold ">Step 1:</h3>
                  <p className="text-1xl ">
                    Click the appointment button. Agree to the Data Privacy{" "}
                    <br /> Agreement Form.
                  </p>
                  <p className="italic">
                    I-click ang “appoint now” button. Pindutin ang checkbox
                    upang mag-agree sa Data Privacy Agreement.
                  </p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex items-center pb-2">
                <span className="text-5xl font-bold">02.</span>
                <span className="border-r-[8px] border-[#F3BC62] h-[130px] mx-5"></span>
                <div className="space-y-4">
                  <h3 className="uppercase text-3xl font-bold  gap-4">
                    Step 2:
                  </h3>
                  <p className="text-1xl">Fill out the request form.</p>
                  <p className="italic">Sagutan ang request form.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex items-center pb-2">
                <span className="text-5xl font-bold ">03.</span>
                <span className="border-r-[8px] border-[#F3BC62] h-[170px] mx-5"></span>
                <div className="space-y-4">
                  <h3 className="uppercase text-3xl font-bold ">Step 3:</h3>
                  <p className="text-1xl ">
                    Upload the necessary requirements.
                  </p>
                  <p className="italic">
                    I-upload ang mga kailangang requirements.
                  </p>
                </div>
              </div>

              {/* Step 4 */}
              <div className="flex items-center pb-2">
                <span className="text-5xl font-bold ">04.</span>
                <span className="border-r-[8px] border-[#F3BC62] h-[130px] mx-5"></span>
                <div className="space-y-4">
                  <h3 className="uppercase text-3xl font-bold ">Step 4:</h3>
                  <p className="text-1xl">Choose an appointment date.</p>
                  <p className="italic">Pumili ng appointment date.</p>
                </div>
              </div>

              {/* Step 5 */}
              <div className="flex items-center pb-2">
                <span className="text-5xl font-bold ">05.</span>
                <span className="border-r-[8px] border-[#F3BC62] h-[225px] mx-5"></span>
                <div className="space-y-4">
                  <h3 className="uppercase text-3xl font-bold ">Step 5:</h3>
                  <p className="text-1xl">
                    Submit and wait for an email of approval.
                  </p>
                  <p className="italic">
                    Isumite ang request form at hintayin ang email na
                    na-aprubahan na ang iyong appointment.
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

export default Hta;
