import { FaUsers } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import { FaSquareXmark } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen }) => {
  return (
    <aside
      className={`bg-custom-gradient_students p-4 text-white transition-all duration-300 ${
        isSidebarOpen ? "w-[350px]" : "w-0"
      }`}
      style={{ height: "100%", overflowY: "auto" }}
    >
      <div className="flex items-center mb-6 mt-3">
        <img
          src="../src/assets/image/LV_logo.png"
          alt="LVCC Logo"
          className="w-22 h-22"
        />
        <div>
          <h1 className="text-2xl font-regular">LVCC</h1>
          <p className="text-2xl">REGISTRAR</p>
        </div>
      </div>
      <div className="border-b-2 border-white w-full"></div>
      <h1 className="text-[20px] pl-5 py-5">DASHBOARD</h1>
      <nav>
        <ul className="pl-8 text-[18px] py-5">
          <li className="pb-8">
            <a href="#" className="flex items-center gap-4">
              <FaUsers className="text-4xl" />
              HOME
            </a>
          </li>
          <li className="pb-8">
            <a href="#" className="flex items-center gap-4">
              <FaSpinner className="text-4xl" />
              EVENTS
            </a>
          </li>
          <li className="">
            <a href="#" className="flex items-center gap-4">
              <FaCheckSquare className="text-4xl" />
              STUDENTS/ALUMNI
            </a>
          </li>
        </ul>
        <h1 className="text-[20px] pl-5 py-5">APPOINTMENT</h1>
        <ul className="pl-8 text-[18px] py-5">
          <li className="pb-8">
            <a href="#" className="flex items-center gap-4">
              <FaSquareXmark className="text-4xl" />
              PENDING
            </a>
          </li>
          <li className="pb-8">
            <a href="#" className="flex items-center gap-4">
              <FaTasks className="text-4xl" />
              APPROVED
            </a>
          </li>
          <li className="pb-8">
            <a href="#" className="flex items-center gap-4">
              <FaRegClock className="text-4xl" />
              REJECTED
            </a>
          </li>
          <li className="">
            <a href="#" className="flex items-center gap-4">
              <FaCalendar className="text-4xl" />
              COMPLETED
            </a>
          </li>
        </ul>
        <h1 className="text-[20px] pl-5 py-5">MAINTENANCE</h1>
        <ul className="pl-8 text-[18px] py-5">
          <li className="pb-8">
            <a href="#" className="flex items-center gap-4">
              <FaUsers className="text-4xl" />
              SCHEDULE
            </a>
          </li>
          <li className="">
            <a href="#" className="flex items-center gap-4">
              <FaSpinner className="text-4xl" />
              HOLIDAYS
            </a>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
