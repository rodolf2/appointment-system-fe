import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdPerson } from "react-icons/io";
import Table from "../components/Table";

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
    <div className="max-w-[1440px] mx-auto min-h-[1200px] flex">
      <SideBar />
      {/* Top */}
      <div className="bg-[#EEF2F7] w-full h-[87px] text-[20px] p-5">
        <div className="flex justify-between relative">
          <p className="flex items-center gap-5">
            <GiHamburgerMenu
              className="w-[35px] h-[35px]"
              onClick={handleClick}
            />
            Students/Alumni's Records
          </p>
          <p className="flex items-center gap-5">
            <IoMdPerson className="w-[35px] h-[35px]" /> Juan Dela Cruz
          </p>
        </div>
        <div>
          <div className="h-[150px] bg-[#D9D9D9] overflow-hidden">
            <div>
              <h1 className="text-[30px]">LIST OF STUDENTS/ALUMNI'S RECORDS</h1>
              <div className="border-b-2 border-[#F3BC62]"></div>
            </div>

            <div className="flex">
              <span>SHOW</span>
              <span>SEARCH</span>
            </div>
          </div>
          <Table />
        </div>

        {/* Bottom */}
        <div>
          <p className="font-tolkien text-end bg-[#EEF2F7] h-[44px]">
            LA VERDAD CHRISTIAN COLLEGE, INC.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Students;
