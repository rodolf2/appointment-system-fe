import { IoMdHome } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { MdGroups } from "react-icons/md";

import React, { useState } from "react";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <div
        className="fixed top-4 left-4 flex flex-col justify-between w-8 h-8 cursor-pointer z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`block h-1 bg-gray-800 rounded transition-transform duration-300 ${
            isOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block h-1 bg-gray-800 rounded transition-opacity duration-300 ${
            isOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block h-1 bg-gray-800 rounded transition-transform duration-300 ${
            isOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-6 shadow-lg transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <ul className="space-y-4">
          <li>
            <a href="#" className="text-lg hover:text-yellow-400">
              Home
            </a>
          </li>
          <li>
            <a href="#" className="text-lg hover:text-yellow-400">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-lg hover:text-yellow-400">
              Services
            </a>
          </li>
          <li>
            <a href="#" className="text-lg hover:text-yellow-400">
              Contact
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
