import React, { useState } from "react";

const HowToAppoint = () => {
  const [activeTab, setActiveTab] = useState("howtoappoint");

  return (
    <div className="font-sans max-w-[1440px] mx-auto h-full">
      {/* Header Section */}
      <div
        className="relative w-full h-screen bg-cover  bg-center flex items-center justify-center text-white text-center"
        style={{
          backgroundImage: "url('../image/BackGround.png')",
        }}
      >
        <div className="absolute inset-0 bg-custom-gradient z-10 pb-10"></div>

        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10 px-4">
          <h1 className="text-4xl font-bold uppercase mb-4 border-b-4 border-white pb-6 max-w-[800px]">
            Wisdom Based on the Truth is Priceless
          </h1>
          <p className="text-lg max-w-[800px]">
            Well-known for offering quality education with a focus on Christian
            values, moral development, and academic excellence.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex absolute justify-center items-center max-w[900px] left-0 right-0 mx-auto w-fit h-fit z-10">
        {/* Announcement Tab */}
        <button
          onClick={() => setActiveTab("announcement")}
          className={`px-6 py-2 border-b-4 bg-[#D2D2D2] transition mx-20 p-3 ${
            activeTab === "announcement"
              ? "border-orange-500 font-semibold"
              : "border-transparent text-gray-600 hover:border-gray-400"
          }`}
        >
          Announcement
        </button>

        {/* How to Appoint Tab */}
        <button
          onClick={() => setActiveTab("howtoappoint")}
          className={`px-6 py-2 border-b-4 transition  bg-[#D2D2D2] mx-20 p-3  ${
            activeTab === "howtoappoint"
              ? "border-orange-500 font-semibold"
              : "border-transparent text-gray-600 hover:border-gray-400"
          }`}
        >
          How to Appoint
        </button>

        {/* Guidelines Tab */}
        <button
          onClick={() => setActiveTab("guidelines")}
          className={`px-6 py-2 border-b-4 transition  bg-[#D2D2D2] mx-20 p-3 ${
            activeTab === "guidelines"
              ? "border-orange-500 font-semibold"
              : "border-transparent text-gray-600 hover:border-gray-400"
          }`}
        >
          Guidelines
        </button>
      </div>

      {/* Appointment Steps */}
      <div className="bg-blue-900 text-white py-12 px-4 flex justify-evenly h-[500px] w-[100%]">
        <div className=" flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-center mb-6 uppercase border-b-4 border-[#F3BC62] ">
            Appointment Scheduling
          </h2>
          <p className="text-center mb-8">
            How to schedule an appointment in 5 easy steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 gap-8">
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="flex items-start">
              <span className="text-4xl font-bold mr-4 border-r-4 border-[#F3BC62]">
                01.
              </span>
              <div>
                <h3 className="uppercase font-bold text-yellow-400">Step 1:</h3>
                <p>Click the appointment button</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex items-start">
              <span className="text-4xl font-bold mr-4 border-r-4 border-[#F3BC62]">
                02.
              </span>
              <div>
                <h3 className="uppercase font-bold text-yellow-400 gap-4">
                  Step 2:
                </h3>
                <p>Fill out the request form</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex items-start">
              <span className="text-4xl font-bold mr-4 border-r-4 border-[#F3BC62]">
                03.
              </span>
              <div>
                <h3 className="uppercase font-bold text-yellow-400">Step 3:</h3>
                <p>Upload the necessary requirements</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="flex items-start">
              <span className="text-4xl font-bold mr-4 border-r-4 border-[#F3BC62]">
                04.
              </span>
              <div>
                <h3 className="uppercase font-bold text-yellow-400">Step 4:</h3>
                <p>Choose an appointment date</p>
              </div>
            </div>

            {/* Step 5 */}
            <div className="flex items-start">
              <span className="text-4xl font-bold mr-4 border-r-4 border-[#F3BC62]">
                05.
              </span>
              <div>
                <h3 className="uppercase font-bold text-yellow-400">Step 5:</h3>
                <p>Submit and wait for an email of approval</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToAppoint;
