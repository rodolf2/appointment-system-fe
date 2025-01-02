const AppSchedule = () => {
  return (
    <>
      {/* Form UI remains unchanged */}
      <div className="h-full flex items-center justify-center bg-[#161f55]">
        <div className="absolute inset-0 flex flex-col">
          <div
            className=" h-1/2 bg-cover bg-bottom "
            style={{
              backgroundImage:
                "url('/public/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
              opacity: "0.3",
              backgroundAttachment: "fixed",
            }}
          ></div>
          <div className=" h-1/2 bg-[#161f55]"></div>
        </div>

        <div className=" flex flex-col justify-center text-center m-8">
          <h2 className=" mx-auto relative inset-0 font-LatoBold text-[35px] text-Fwhite w-[450px] tracking-widest mt-6 mb-8 ">
            REGISTRAR APPOINTMENT{" "}
          </h2>
          <div className=" relative mx-auto flex flex-col bg-white p-8 rounded-lg shadow-md w-[500px] max-w-[90%] text-center z-10"></div>
        </div>
      </div>
    </>
  );
};

export default AppSchedule;
