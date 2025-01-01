<<<<<<< HEAD
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
=======
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Buttons = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const path = location.pathname.split("/")[1];
    setActiveTab(path);
  }, [location]);

  return (
    <div className="relative font-lato">
      <div className="flex items-center justify-center flex-col max-w-[1297px] mx-auto">
        <div className="absolute z-10 text-[27px] flex justify-around w-full">
          <Link
            to="/announcement"
            className={`pt-7 rounded-sm w-[399px] h-[104px] flex flex-col items-center ${
              activeTab === "announcement" ? "bg-[#FEFEFE]" : "bg-[#D2D2D2]"
            }`}
          >
            <span
              className={`relative mb-2 ${
                activeTab === "announcement" ? "text-black" : "text-gray-600"
              }`}
            >
              Announcement
              {activeTab === "announcement" && (
                <span className="absolute left-0 right-0 bottom-0 border-b-4 border-orange-500"></span>
              )}
            </span>
          </Link>

          <Link
            to="/howtoappoint"
            className={`pt-7 rounded-sm w-[399px] h-[104px] flex flex-col items-center ${
              activeTab === "howtoappoint" ? "bg-[#FEFEFE]" : "bg-[#D2D2D2]"
            }`}
          >
            <span
              className={`relative mb-2 ${
                activeTab === "howtoappoint" ? "text-black" : "text-gray-600"
              }`}
            >
              How to Appoint
              {activeTab === "howtoappoint" && (
                <span className="absolute left-0 right-0 bottom-0 border-b-4 border-orange-500"></span>
              )}
            </span>
          </Link>

          <Link
            to="/guidelines"
            className={`pt-7 rounded-sm w-[399px] h-[104px] flex flex-col items-center ${
              activeTab === "guidelines" ? "bg-[#FEFEFE]" : "bg-[#D2D2D2]"
            }`}
          >
            <span
              className={`relative mb-2 ${
                activeTab === "guidelines" ? "text-black" : "text-gray-600"
              }`}
            >
              Guidelines
              {activeTab === "guidelines" && (
                <span className="absolute left-0 right-0 bottom-0 border-b-4 border-[#F3BC62]"></span>
              )}
            </span>
          </Link>
>>>>>>> 7bcd819adcf560811ac4fa19bfab16c71a15bbc3
        </div>
      </div>
    </div>
  );
};

export default Buttons;
