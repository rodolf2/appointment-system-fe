import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Buttons = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    setActiveTab(path);
  }, [location]);

  return (
    <div className="relative">
      <div className="flex items-center justify-center flex-col max-w-[1297px] mx-auto">
        <div className="absolute z-10 text-[27px] flex justify-around w-full">
          {/* Announcement Button */}
          <Link
            to="/home/announcement"
            className={`pt-7 rounded-sm w-[399px] h-[104px] flex flex-col items-center ${
              activeTab === "announcement" ? "bg-[#FEFEFE]" : "bg-[#D2D2D2]"
            }`}
          >
            <span
              className={`relative mb-2 ${
                activeTab === "announcement"
                  ? "text-black pb-1"
                  : "text-gray-600"
              }`}
            >
              Announcement
              {activeTab === "announcement" && (
                <span className="absolute left-0 right-0 bottom-0 border-b-4 border-[#F3BC62]"></span>
              )}
            </span>
          </Link>

          {/* How to Appoint Button */}
          <Link
            to="/home/hta"
            className={`pt-7 rounded-sm w-[399px] h-[104px] flex flex-col items-center ${
              activeTab === "hta" ? "bg-[#FEFEFE]" : "bg-[#D2D2D2]"
            }`}
          >
            <span
              className={`relative mb-2 ${
                activeTab === "hta" ? "text-black pb-1" : "text-gray-600"
              }`}
            >
              How to Appoint
              {activeTab === "hta" && (
                <span className="absolute left-0 right-0 bottom-0 border-b-4 border-[#F3BC62]"></span>
              )}
            </span>
          </Link>

          {/* Guidelines Button */}
          <Link
            to="/home/guidelines"
            className={`pt-7 rounded-sm w-[399px] h-[104px] flex flex-col items-center ${
              activeTab === "guidelines" ? "bg-[#FEFEFE]" : "bg-[#D2D2D2]"
            }`}
          >
            <span
              className={`relative mb-2 ${
                activeTab === "guidelines" ? "text-black pb-1" : "text-gray-600"
              }`}
            >
              Guidelines
              {activeTab === "guidelines" && (
                <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 border-b-4 border-[#F3BC62] w-[10rem]"></span>
              )}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Buttons;
