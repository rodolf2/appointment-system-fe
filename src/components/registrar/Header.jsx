import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdPerson } from "react-icons/io";

const Header = () => {
  return (
    <header>
      <div className="flex justify-between items-center bg-Bbackground px-10 h-[87px]">
        <p className="text-[20px]">Students/Alumni's Records</p>
        <p className="text-[20px] flex items-center gap-3">
          <IoMdPerson className="w-[35px] h-[35px]" /> Juan Dela Cruz
        </p>
      </div>
    </header>
  );
};

export default Header;
