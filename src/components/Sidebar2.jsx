import React, { useState } from "react";
import Students from "../pages/Students";
import { IoMdHome } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { IoMdPerson } from "react-icons/io";

const Sidebar2 = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-75 bg-custom-gradient_students text-white transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } h-75`}
      >
        <div className="p-4">
          <div className="h-screen overflow-y-auto ">
            <div className="flex items-center pl-4 text-[26px] pt-12">
              <img src="../src/assets/image/LV_logo.png" alt="LV LOGO" />
              <p className="tracking-[2px]">
                <span className="font-regular">LVCC</span> <br />
                REGISTRAR
              </p>
            </div>
            <div className="border-b-2 border-white my-5"></div>
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
      </div>

      {/* Main Content */}

      <div className="flex-1 flex justify-center items-center">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="fixed top-4 left-4 p-3  text-black z-50 text-3xl"
        >
          ☰
        </button>

        {/* Centered Content */}
        <div className="text-center">
          <h1 className="">Header</h1>
          <h1 className="text-3xl font-bold">Main Content</h1>
          <p className="mt-4">Dito yung table</p>
          <h1 className="">Footlong</h1>
        </div>
      </div>
    </div>
  );
};

export default Sidebar2;
