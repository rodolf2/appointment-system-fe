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
            <div className="flex items-center relative">
              <div className="flex items-center">
                <span
                  className={`${
                    activeTab === "announcement"
                      ? "text-[#161F55]"
                      : "text-gray-600"
                  }`}
                >
                  Announcement
                </span>
                <img
                  src="/assets/icons/announcement.svg"
                  alt="Announcement Icon"
                  className="ml-2 w-8 h-8"
                />
              </div>
              {activeTab === "announcement" && (
                <span className="absolute left-0 right-0 -bottom-2 border-b-4 border-[#F3BC62]"></span>
              )}
            </div>
          </Link>

          {/* How to Appoint Button */}
          <Link
            to="/home/hta"
            className={`pt-7 rounded-sm w-[399px] h-[104px] flex flex-col items-center ${
              activeTab === "hta" ? "bg-[#FEFEFE]" : "bg-[#D2D2D2]"
            }`}
          >
            <div className="flex items-center relative">
              <div className="flex items-center">
                <span
                  className={`${
                    activeTab === "hta" ? "text-[#161F55]" : "text-gray-600"
                  }`}
                >
                  How to Appoint
                </span>
                <img
                  src="/assets/icons/howtoappoint.svg"
                  alt="How to Appoint Icon"
                  className="ml-2 w-8 h-8"
                />
              </div>
              {activeTab === "hta" && (
                <span className="absolute left-0 right-0 -bottom-2 border-b-4 border-[#F3BC62]"></span>
              )}
            </div>
          </Link>

          {/* Guidelines Button */}
          <Link
            to="/home/guidelines"
            className={`pt-7 rounded-sm w-[399px] h-[104px] flex flex-col items-center ${
              activeTab === "guidelines" ? "bg-[#FEFEFE]" : "bg-[#D2D2D2]"
            }`}
          >
            <div className="flex items-center relative">
              <div className="flex items-center">
                <span
                  className={`${
                    activeTab === "guidelines"
                      ? "text-[#161F55]"
                      : "text-gray-600"
                  }`}
                >
                  Guidelines
                </span>
                <img
                  src="/assets/icons/guidelines.svg"
                  alt="Guidelines Icon"
                  className="ml-2 w-8 h-8"
                />
              </div>
              {activeTab === "guidelines" && (
                <span className="absolute left-0 right-0 -bottom-2 border-b-4 border-[#F3BC62]"></span>
              )}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Buttons;
