import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { FaUsers } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import { FaSquareXmark } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

const Alumni = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  return (
    <div className="flex h-[1200px] font-LatoRegular">
      {isSidebarOpen && (
        <aside className="bg-custom-gradient_students w-80 p-4 text-white transition-width duration-300">
          <div className="flex items-center mb-6">
            <img
              src="../src/assets/image/LV_logo.png"
              alt="LVCC Logo"
              className="w-22 h-22 mt-4"
            />
            <div>
              <h1 className="text-2xl font-regular">LVCC</h1>
              <p className="text-2xl">REGISTRAR</p>
            </div>
          </div>
          <div className="border-b-2 border-white w-full"></div>
          <h1 className="text-[20px] pl-1 pt-6">DASHBOARD</h1>
          <nav>
            <ul className="pl-4 py-3 text-[18px]">
              <li className="my-5">
                <a href="#" className="flex items-center gap-4">
                  <IoMdHome className="text-4xl" />
                  HOME
                </a>
              </li>
              <li className="my-5">
                <a href="#" className="flex items-center  gap-4">
                  <FaCalendarAlt className="text-4xl" />
                  EVENTS
                </a>
              </li>
              <li className="mt-5">
                <a href="#" className="flex items-center  gap-4">
                  <FaUsers className="text-4xl" />
                  STUDENTS/ALUMNI
                </a>
              </li>
            </ul>
            <h1 className="text-[20px] pl-1 pt-6">APPOINTMENT</h1>
            <ul className="pl-4 py-3 text-[18px]">
              <li className="my-5">
                <a href="#" className="flex items-center  gap-4">
                  <FaSpinner className="text-4xl" />
                  PENDING
                </a>
              </li>
              <li className="my-5">
                <a href="#" className="flex items-center  gap-4">
                  <FaCheckSquare className="text-4xl" />
                  APPROVED
                </a>
              </li>
              <li className="my-5">
                <a href="#" className="flex items-center  gap-4">
                  <FaSquareXmark className="text-4xl" />
                  REJECTED
                </a>
              </li>
              <li className="my-5">
                <a href="#" className="flex items-center  gap-4">
                  <FaTasks className="text-4xl" />
                  COMPLETED
                </a>
              </li>
            </ul>
            <h1 className="text-[20px] pl-1 ">MAINTENANCE</h1>
            <ul className="pl-4 py-3 text-[18px]">
              <li className="my-5">
                <a href="#" className="flex items-center  gap-4">
                  <FaRegClock className="text-4xl" />
                  SCHEDULE
                </a>
              </li>
              <li className="my-5">
                <a href="#" className="flex items-center  gap-4">
                  <FaCalendar className="text-4xl" />
                  HOLIDAYS
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      )}

      <div className="w-full">
        <main className="flex-1 max-w-[1440px] mx-auto h-[1200px]">
          <header className="flex justify-between items-center  bg-Bbackground h-[87px]">
            <div className="flex items-center">
              <div
                className={`flex-1 p-4 transition-margin duration-300 ${
                  isSidebarOpen ? "ml-0" : "ml-0"
                }`}
              >
                <button
                  onClick={toggleSidebar}
                  className=" p-2 bg-black text-white rounded text-2xl"
                >
                  {isSidebarOpen ? <RxHamburgerMenu /> : <RxHamburgerMenu />}
                </button>
              </div>
              <h1 className="text-[20px] font-bold">
                Students/Alumni's Records
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <CgProfile className="text-5xl" />
              <span className="text-[20px] ">Juan Dela Cruz</span>
              <IoMdArrowDropdown className="text-5xl" />
            </div>
          </header>
          <section className="bg-white p-6 rounded shadow h-[1000px]">
            {" "}
            {/* Adjusted height */}
            <div className="bg-[#D9D9D9] h-44 m-4">
              <div className=" text-[#161F55] px-3 ml-3 pt-2">
                <h2 className="text-3xl font-bold tracking-[5px] pt-1">
                  LIST OF STUDENTS/ALUMNI'S RECORDS
                </h2>
                <div className="border-b-4 border-[#F3BC62] w-[720px] my-3"></div>
              </div>

              <div className="flex justify-between items-center mt-16 ml-4 ">
                <div className="text-[#161F55] font-semibold text-[18px]">
                  <label htmlFor="show" className="mr-2">
                    SHOW
                  </label>
                  <select id="show" className="border p-1 bg-[#989898]">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                    <option>6</option>
                    <option>7</option>
                    <option>8</option>
                    <option>9</option>
                    <option>10</option>
                  </select>
                  <span className="ml-2">ENTRIES</span>
                </div>
                <div className="text-[#161F55] font-semibold text-[18px]">
                  <label htmlFor="search" className="mr-2">
                    SEARCH:
                  </label>
                  <input
                    id="search"
                    type="text"
                    className="border p-1 bg-[#989898] text-[#161F55] mr-5"
                  />
                </div>
              </div>
            </div>
            <div className="overflow-x-auto h-[900px]">
              {" "}
              {/* Adjusted max height */}{" "}
              {/* Adjust for header and footer height */}
              <table className=" text-[15px]">
                <thead>
                  <tr className="bg-gray-200 ">
                    <th className="border p-8">NO.</th>
                    <th className="border p-10">NAME</th>
                    <th className="border p-8">LAST S.Y. ATTENDED</th>
                    <th className="border p-10">PROGRAM/GRADE/STRAND</th>
                    <th className="border p-8">CONTACT NO.</th>
                    <th className="border p-10">EMAIL ADDRESS</th>
                    <th className="border p-8">ATTACHMENT PROOF</th>
                    <th className="border p-8">REQUEST</th>
                    <th className="border p-8">DATE OF REQUEST</th>
                    <th className="border p-8">CLAIMING METHOD</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from({ length: 8 }).map((_, index) => (
                    <tr key={index} className="even:bg-gray-100">
                      <td className="border p-8">{index + 1}</td>
                      <td className="border p-8"></td>
                      <td className="border p-8"></td>
                      <td className="border p-8"></td>
                      <td className="border p-8"></td>
                      <td className="border p-8"></td>
                      <td className="border p-8"></td>
                      <td className="border p-8"></td>
                      <td className="border p-8"></td>
                      <td className="border p-8"></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-between items-center mt-4">
              <span>Showing 1 to 10 of 10 entries</span>
              <div>
                <button className="border p-1">Previous</button>
                <button className="border p-1">1</button>
                <button className="border p-1">Next</button>
              </div>
            </div>
          </section>
          <footer className="bg-Bbackground h-[50px] flex items-center justify-end pr-9 mt-20">
            <p className="font-regular">LA VERDAD CHRISTIAN COLLEGE, INC.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Alumni;
