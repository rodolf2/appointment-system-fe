import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const location = useLocation();

  return (
    <>
      <nav className="flex justify-between items-center bg-[#eef2f7] py-4 px-20 max-w-[1440px] h-[80px] mx-auto">
        <div className="flex items-center">
          <img src="/image/LOGO.png" alt="LOGO" className="h-[75px]" />
          <h1 className="text-[26px] font-tolkien text-[#252f6a] ml-4">
            LVCC <span className="font-lato">AppointEase</span>
          </h1>
        </div>
        <ul className="flex space-x-8 items-center">
          {/* HOME */}
          <li
            className={`hover:bg-gray-300 px-2 ${
              location.pathname === "/home"
                ? "border-b-4 border-orange-500 "
                : ""
            }`}
          >
            <Link to="/home">HOME</Link>
          </li>

          {/* ABOUT */}
          <li
            className={`hover:bg-gray-300 px-2 ${
              location.pathname === "/aboutus"
                ? "border-b-4 border-orange-500 "
                : ""
            }`}
          >
            <Link to="/aboutus">ABOUT</Link>
          </li>

          {/* FAQs */}
          <li
            className={`hover:bg-gray-300 px-2 ${
              location.pathname === "/faqs"
                ? "border-b-4 border-orange-500 "
                : ""
            }`}
          >
            <Link to="/faqs">FAQs</Link>
          </li>

          {/* CONTACT */}
          <li
            className={`hover:bg-gray-300 px-2 ${
              location.pathname === "/contact"
                ? "border-b-4 border-orange-500 "
                : ""
            }`}
          >
            <Link to="/contact">CONTACT</Link>
          </li>

          {/* APPOINT NOW */}
          <li
            className={`bg-primary text-white p-3 rounded-md hover:bg-blue-500 ${
              location.pathname === "/howtoappoint"
                ? "border-b-4 border-orange-500 "
                : ""
            }`}
          >
            <Link to="/howtoappoint">APPOINT NOW</Link>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default Header;
