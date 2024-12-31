import React from "react";
import { IoMdHome } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { MdGroups } from "react-icons/md";

const SideBar = () => {
  return (
    <div className="max-w-[300px] bg-custom-gradient_students text-white min-h-[1200px]">
      {/* Logo */}
      <div className="flex items-center pl-4 text-[26px] pt-12">
        <img src="../src/assets/image/LV_logo.png" alt="LV LOGO" />
        <p className="tracking-[2px]">
          <span className="font-tolkien">LVCC</span> <br />
          REGISTRAR
        </p>
      </div>
      <div className="border-b-2 border-white my-5"></div>
      {/* Dashboard */}
      <div className="cursor-default pl-3">
        <h3 className="text-[20px]">DASHBOARD</h3>
        <nav className="text-[18px] min-w-[300px]">
          <ul>
            <li className="py-5 flex items-center">
              <IoMdHome className="w-fit h-[45px] px-6" />
              HOME
            </li>
            <li className="py-5 flex items-center">
              <FaCalendarAlt className="w-fit h-[45px] px-6" /> EVENTS
            </li>
            <li className="py-5 flex items-center">
              <MdGroups className="w-fit h-[45px] px-6" /> STUDENTS/ALUMNI
            </li>
          </ul>
        </nav>
      </div>
      {/* Appointment */}
      <div className="cursor-default pl-3">
        <h3 className="text-[20px]">APPOINTMENT</h3>
        <nav className="text-[18px] min-w-[300px]">
          <ul>
            <li className="py-5 flex items-center">
              <IoMdHome className="w-fit h-[45px] px-6" />
              PENDING
            </li>
            <li className="py-5 flex items-center">
              <FaCalendarAlt className="w-fit h-[45px] px-6" /> APPROVED
            </li>
            <li className="py-5 flex items-center">
              <MdGroups className="w-fit h-[45px] px-6" /> REJECTED
            </li>
            <li className="py-5 flex items-center">
              <MdGroups className="w-fit h-[45px] px-6" /> COMPLETED
            </li>
          </ul>
        </nav>
      </div>
      {/* Maintenance */}
      <div className="cursor-default pl-3">
        <h3 className="text-[20px]">MAINTENANCE</h3>
        <nav className="text-[18px] min-w-[300px]">
          <ul>
            <li className="py-5 flex items-center">
              <IoMdHome className="w-fit h-[45px] px-6" />
              SCHEDULE
            </li>
            <li className="py-5 flex items-center">
              <FaCalendarAlt className="w-fit h-[45px] px-6" /> HOLIDAYS
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
