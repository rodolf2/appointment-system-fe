import { useState } from "react";

const Buttons = () => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <div className="relative">
      <div className="flex items-center justify-center flex-col-reverse">
        <div className="absolute z-10">
          {/* Announcement Tab */}
          <button
            onClick={() => setActiveTab("announcement")}
            className={`border-b-4 bg-[#D2D2D2] transition mx-20 p-4 rounded-sm w-[200px] ${
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
            className={`border-b-4 bg-[#D2D2D2] transition mx-20 p-4 rounded-sm w-[200px] ${
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
            className={`border-b-4 bg-[#D2D2D2] transition mx-20 p-4 rounded-sm w-[200px] ${
              activeTab === "guidelines"
                ? "border-orange-500 font-semibold"
                : "border-transparent text-gray-600 hover:border-gray-400"
            }`}
          >
            Guidelines
          </button>
        </div>
      </div>
    </div>
  );
};

export default Buttons;
