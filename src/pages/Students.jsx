import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdPerson } from "react-icons/io";

const handleClick = () => {
  const [content, setContent] = useState([]);

  return (
    <div>
      {content}
      <h1>{setContent("New content")}</h1>
    </div>
  );
};
const Students = () => {
  return (
    <div className="max-w-[1440px] mx-auto min-h-[1200px]">
      <div className="flex">
        <SideBar />
        {/* Top */}
        <div className="bg-[#EEF2F7] w-full h-[87px] text-[20px] p-5 flex justify-between items-center">
          <span className="flex items-center gap-5">
            <GiHamburgerMenu
              className="w-[35px] h-[35px]"
              onClick={handleClick}
            />
            Students/Alumni's Records
          </span>
          <span className="flex items-center gap-5">
            <IoMdPerson className="w-[35px] h-[35px]" /> Juan Dela Cruz
          </span>
        </div>
      </div>

      {/* Bottom */}
    </div>
  );
};

export default Students;
