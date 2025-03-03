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
    <header className="z-10 flex justify-between items-center bg-Bbackground h-[87px] px-5">
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 text-black rounded text-5xl font-bold"
        >
          <RxHamburgerMenu />
        </button>
        <h1 className="text-[20px] font-bold ml-4">{title}</h1>
      </div>

      <div className="relative flex items-center gap-3">
        <CgProfile className="text-5xl" />
        <span className="text-[20px]">Juan Dela Cruz</span>
        <button onClick={toggleDropdown} className="focus:outline-none">
          <IoMdArrowDropdown className="text-5xl" />
        </button>
        {isDropdownOpen && (
          <div className="absolute right-0 top-[80px] bg-white border shadow-lg rounded-lg py-2 w-48">
            <button
              className=" flex px-4 py-2 text-left hover:bg-gray-200 w-full"
              onClick={handleProfle}
            >
              <FaUserEdit className="mr-2 w-[24px] h-[24px]" />
              Edit Profile
            </button>
            <button
              className=" flex px-4 py-2 text-left hover:bg-gray-200 w-full"
              onClick={handleSignOut}
            >
              <FaSignOutAlt className="mr-2 w-[24px] h-[24px]" />
              Sign Out
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
