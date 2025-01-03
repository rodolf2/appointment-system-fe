import React, { useState } from "react";
import { IoMdHome } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Sidebar Menu */}
      <div
        className={`absolute top-0 left-0 h-full w-75 bg-custom-gradient_students text-white p-6 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close Button Inside Sidebar */}
        <div
          className="absolute flex items-center justify-center w-8 h-8 cursor-pointer z-50"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Show "Close" when sidebar is open, otherwise show hamburger icon */}
          {isOpen ? (
            <span className="text-white text-lg font-semibold"></span>
          ) : (
            <div className="flex flex-col justify-between w-full h-full">
              {/* Hamburger lines */}
              <span className="block h-1 rounded bg-gray-800"></span>
              <span className="block h-1 rounded bg-gray-800"></span>
              <span className="block h-1 rounded bg-gray-800"></span>
            </div>
          )}
        </div>

        {/* Logo */}
        <div className="flex items-center pl-4 text-[26px] pt-12">
          <img src="../src/assets/image/LV_logo.png" alt="LV LOGO" />
          <p className="tracking-[2px]">
            <span className="font-regular">LVCC</span> <br />
            REGISTRAR
          </p>
        </div>
        <div className="border-b-2 border-white my-5"></div>

        {/* Scrollable Sidebar Content */}
        <div className="h-screen overflow-y-auto scrollbar-hide">
          {/* Dashboard Section */}
          <div className="cursor-default pl-3">
            <h3 className="text-[20px]">DASHBOARD</h3>
            <nav className="text-[18px]">
              <ul>
                <li className="py-5 flex items-center">
                  <IoMdHome className="w-fit h-[45px] px-6" />
                  HOME
                </li>
                <li className="py-5 flex items-center">
                  <FaCalendarAlt className="w-fit h-[45px] px-6" />
                  EVENTS
                </li>
                <li className="py-5 flex items-center">
                  <MdGroups className="w-fit h-[45px] px-6" />
                  STUDENTS/ALUMNI
                </li>
              </ul>
            </nav>
          </div>

          {/* Appointment Section */}
          <div className="cursor-default pl-3">
            <h3 className="text-[20px]">APPOINTMENT</h3>
            <nav className="text-[18px]">
              <ul>
                <li className="py-5 flex items-center">
                  <IoMdHome className="w-fit h-[45px] px-6" />
                  PENDING
                </li>
                <li className="py-5 flex items-center">
                  <FaCalendarAlt className="w-fit h-[45px] px-6" />
                  APPROVED
                </li>
                <li className="py-5 flex items-center">
                  <MdGroups className="w-fit h-[45px] px-6" />
                  REJECTED
                </li>
                <li className="py-5 flex items-center">
                  <MdGroups className="w-fit h-[45px] px-6" />
                  COMPLETED
                </li>
              </ul>
            </nav>
          </div>

          {/* Maintenance Section */}
          <div className="cursor-default pl-3">
            <h3 className="text-[20px]">MAINTENANCE</h3>
            <nav className="text-[18px]">
              <ul>
                <li className="py-5 flex items-center">
                  <IoMdHome className="w-fit h-[45px] px-6" />
                  SCHEDULE
                </li>
                <li className="py-5 flex items-center">
                  <FaCalendarAlt className="w-fit h-[45px] px-6" />
                  HOLIDAYS
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ${
          isOpen ? "ml-75" : "ml-0"
        }`}
      >
        {/* Hamburger Button */}
        <div
          className={`flex-1 transition-all duration-300 ${
            isOpen ? "ml-75" : "ml-0"
          } pl-8`} // Add padding-left
        >
          {/* Hamburger Button */}
          <div
            className="relative flex flex-col justify-between w-8 h-8 cursor-pointer z-50"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span
              className={`block h-1 rounded transition-transform duration-300 ${
                isOpen ? "bg-white rotate-45 translate-y-2" : "bg-gray-800"
              }`}
            ></span>
            <span
              className={`block h-1 rounded transition-opacity duration-300 ${
                isOpen ? "opacity-0" : "bg-gray-800"
              }`}
            ></span>
            <span
              className={`block h-1 rounded transition-transform duration-300 ${
                isOpen ? "bg-white -rotate-45 -translate-y-2" : "bg-gray-800"
              }`}
            ></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
