import React from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";

const Header = ({ toggleSidebar, isSidebarOpen, title }) => {
  return (
    <header className="flex justify-between items-center bg-Bbackground h-[87px]">
      <div className="flex items-center">
        <div
          className={`flex-1 p-4 transition-margin duration-300 ${
            isSidebarOpen ? "ml-0" : "ml-0"
          }`}
        >
          <button
            onClick={toggleSidebar}
            className="p-2 text-black rounded text-5xl font-bold"
          >
            <RxHamburgerMenu />
          </button>
        </div>
        <h1 className="text-[20px] font-bold">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <CgProfile className="text-5xl" />
        <span className="text-[20px]">Juan Dela Cruz</span>
        <IoMdArrowDropdown className="text-5xl" />
      </div>
    </header>
  );
};

export default Header;
