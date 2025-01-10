import { useState } from "react";
import { Link } from "react-router"; // Import Link from react-router-dom
import { FaUsers } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import { FaSquareXmark } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen }) => {
  const [activeMenu, setActiveMenu] = useState("HOME"); // Track the active menu item

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const activeStyle =
    "bg-[#D9D9D9] text-black rounded-lg px-4 py-2 flex items-center gap-4";

  const inactiveStyle = "flex items-center gap-4 px-4 py-2";

  return (
    <aside
      className={`bg-custom-gradient_students p-4 text-white transition-all duration-300 ${
        isSidebarOpen ? "w-[300px]" : "w-0"
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
            <ul className="pl-2 text-[18px] py-5">
              <li className="mb-4">
                <Link
                  to="/registrarHome"
                  className={
                    activeMenu === "HOME" ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("HOME")}
                >
                  <FaUsers className="text-xl" />
                  HOME
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/events"
                  className={
                    activeMenu === "EVENTS" ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("EVENTS")}
                >
                  <FaSpinner className="text-xl" />
                  EVENTS
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/students-alumni"
                  className={
                    activeMenu === "STUDENTS/ALUMNI"
                      ? activeStyle
                      : inactiveStyle
                  }
                  onClick={() => handleMenuClick("STUDENTS/ALUMNI")}
                >
                  <FaCheckSquare className="text-xl" />
                  STUDENTS/ALUMNI
                </Link>
              </li>
            </ul>
            <h1 className="text-[20px] pl-5 py-5">APPOINTMENT</h1>
            <ul className="pl-2 text-[18px] py-5">
              <li className="mb-4">
                <Link
                  to="/pending"
                  className={
                    activeMenu === "PENDING" ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("PENDING")}
                >
                  <FaSquareXmark className="text-xl" />
                  PENDING
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/approved"
                  className={
                    activeMenu === "APPROVED" ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("APPROVED")}
                >
                  <FaTasks className="text-xl" />
                  APPROVED
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/rejected"
                  className={
                    activeMenu === "REJECTED" ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("REJECTED")}
                >
                  <FaRegClock className="text-xl" />
                  REJECTED
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/completed"
                  className={
                    activeMenu === "COMPLETED" ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("COMPLETED")}
                >
                  <FaCalendar className="text-xl" />
                  COMPLETED
                </Link>
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
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
