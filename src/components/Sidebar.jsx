import { FaUsers } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import { FaSquareXmark } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <aside
      className={`bg-custom-gradient_students p-4 text-white transition-all duration-300 ${
        isSidebarOpen ? "w-[350px]" : "w-0"
      }`}
      style={{ height: "100%", overflowY: "auto" }}
    >
      {isSidebarOpen && (
        <div className="font-LatoRegular">
          <div className="flex items-center mb-6 mt-3">
            <img
              src="\public\assets\image\LV_logo.png"
              alt="LVCC Logo"
              className="w-[50%] h-[50%]"
            />
            <div>
              <h1 className="text-2xl font-regular">LVCC</h1>
              <p className="text-2xl">REGISTRAR</p>
            </div>
          </div>
          <div className="border-b-2 border-white w-full"></div>
          <h1 className="text-[20px] pl-5 py-5 pt-7">DASHBOARD</h1>
          <nav>
            <ul className="pl-8 text-[18px] py-5">
              <li className="pb-8">
                <Link
                  to="#"
                  className={`flex items-center gap-4 p-2 rounded-lg ${
                    isActive("#") ? "bg-[#d9d9d9] text-black" : ""
                  }`}
                >
                  <FaUsers className="text-4xl" />
                  HOME
                </Link>
              </li>
              <li className="pb-8">
                <Link
                  to="#"
                  className={`flex items-center gap-4 p-2 rounded-lg ${
                    isActive("#") ? "bg-[#d9d9d9] text-black" : ""
                  }`}
                >
                  <FaSpinner className="text-4xl" />
                  EVENTS
                </Link>
              </li>
              <li className="pb-8">
                <Link
                  to="/students"
                  className={`flex items-center gap-4 py-5 rounded-lg ${
                    isActive("/students") ? "bg-[#d9d9d9] text-black" : ""
                  }`}
                >
                  <FaCheckSquare className="text-4xl" />
                  STUDENTS/ALUMNI
                </Link>
              </li>
            </ul>
            <h1 className="text-[20px] pl-5 py-5">APPOINTMENT</h1>
            <ul className="pl-8 text-[18px] py-5">
              <li className="pb-8">
                <Link
                  to="/pending"
                  className={`flex items-center gap-4 p-2 rounded-lg ${
                    isActive("/pending") ? "bg-[#d9d9d9] text-black" : ""
                  }`}
                >
                  <FaSquareXmark className="text-4xl" />
                  PENDING
                </Link>
              </li>
              <li className="pb-8">
                <Link
                  to="/approved"
                  className={`flex items-center gap-4 p-2 rounded-lg ${
                    isActive("/approved") ? "bg-[#d9d9d9] text-black" : ""
                  }`}
                >
                  <FaTasks className="text-4xl" />
                  APPROVED
                </Link>
              </li>
              <li className="pb-8">
                <Link
                  to="/rejected"
                  className={`flex items-center gap-4 p-2 rounded-lg ${
                    isActive("/rejected") ? "bg-[#d9d9d9] text-black" : ""
                  }`}
                >
                  <FaRegClock className="text-4xl" />
                  REJECTED
                </Link>
              </li>
              <li>
                <Link
                  to="/completed"
                  className={`flex items-center gap-4 p-2 rounded-lg ${
                    isActive("/completed") ? "bg-[#d9d9d9] text-black" : ""
                  }`}
                >
                  <FaCalendar className="text-4xl" />
                  COMPLETED
                </Link>
              </li>
            </ul>
            <h1 className="text-[20px] pl-5 py-5">MAINTENANCE</h1>
            <ul className="pl-8 text-[18px] py-5">
              <li className="pb-8">
                <Link
                  to="/schedule"
                  className={`flex items-center gap-4 p-2 rounded-lg ${
                    isActive("/schedule") ? "bg-[#d9d9d9] text-black" : ""
                  }`}
                >
                  <FaUsers className="text-4xl" />
                  SCHEDULE
                </Link>
              </li>
              <li>
                <Link
                  to="/holidays"
                  className={`flex items-center gap-4 p-2 rounded-lg ${
                    isActive("/holidays") ? "bg-[#d9d9d9] text-black" : ""
                  }`}
                >
                  <FaUsers className="text-4xl" />
                  HOLIDAYS
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
