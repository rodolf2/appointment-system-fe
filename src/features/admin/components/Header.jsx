import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserEdit, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router";

const Header = ({ toggleSidebar, isSidebarOpen, title }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSignOut = () => {
    navigate("/signin");
  };

  const handleProfle = () => {
    navigate("/profile");
  };

  return (
    <header className="z-10 flex justify-between items-center bg-Bbackground h-[87px] px-5 shadow-md">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 text-black rounded text-4xl font-bold hover:bg-gray-200 transition-colors"
        >
          <RxHamburgerMenu />
        </button>
        <h1 className="text-xl font-bold ml-4">{title}</h1>
      </div>
      <div className="relative flex items-center gap-3">
        <img
          src="/public/assets/icons/notification.svg"
          alt="Notifications"
          className="inline-block w-8 h-8 cursor-pointer"
        />
        <div className="border-r-2 border-gray-300 h-8"></div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <CgProfile className="text-4xl" />
          <span className="text-base hidden sm:inline">Juan Dela Cruz</span>
          <IoMdArrowDropdown className="text-4xl" />
        </div>
        {isDropdownOpen && (
          <div className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-lg py-2 w-48 z-20">
            <button
              className="flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full text-sm"
              onClick={handleProfle}
            >
              <FaUserEdit className="mr-2 w-5 h-5" />
              Edit Profile
            </button>
            <button
              className="flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full text-sm"
              onClick={handleSignOut}
            >
              <FaSignOutAlt className="mr-2 w-5 h-5" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
