import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { FaSpinner } from "react-icons/fa6";
import { FaCheckSquare } from "react-icons/fa";
import { FaSquareXmark } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  const handleMenuClick = (menu) => {
    setActiveMenu(location.pathname);
  };

  const isActive = (path) => location.pathname === path;

  const activeStyle =
    "bg-[#D9D9D9] text-black rounded-lg px-4 py-2 flex items-center gap-4";

  const inactiveStyle = "flex items-center gap-4 px-4 py-2";

  return (
    <aside
      className={`bg-custom-gradient_students p-4 text-white transition-all duration-900 ${
        isSidebarOpen ? "w-[300px]" : "w-0"
      }`}
      style={{ height: "100%", overflowY: "auto" }}
    >
      {isSidebarOpen && (
        <div className="font-LatoRegular">
          <div className="flex items-center mb-6 mt-3">
            <img
              src="/assets/image/LV_logo.png"
              alt="LVCC Logo"
              className="w-[50%] h-[50%]"
            />
            <div className="ml-4">
              <h1 className="text-2xl font-regular">LVCC</h1>
              <p className="text-xl">REGISTRAR</p>
            </div>
          </div>
          <div className="border-b-2 border-white w-full mb-6"></div>
          <h1 className="text-[20px] pl-4 pb-4">DASHBOARD</h1>
          <nav>
            <ul className="pl-2 text-[18px] space-y-4">
              <li>
                <Link
                  to="/registrarHome"
                  className={
                    isActive("/registrarHome") ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("/registrarHome")}
                >
                  <IoMdHome className="text-xl" />
                  HOME
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className={isActive("/events") ? activeStyle : inactiveStyle}
                  onClick={() => handleMenuClick("/events")}
                >
                  <FaCalendarAlt className="text-xl" />
                  EVENTS
                </Link>
              </li>
              <li>
                <Link
                  to="/students"
                  className={
                    isActive("/students") ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("/students-alumni")}
                >
                  <FaUsers className="text-xl" />
                  STUDENTS/ALUMNI
                </Link>
              </li>
            </ul>
            <h1 className="text-[20px] pl-4 pt-6 pb-4">APPOINTMENT</h1>
            <ul className="pl-2 text-[18px] space-y-4">
              <li>
                <Link
                  to="/pending"
                  className={isActive("/pending") ? activeStyle : inactiveStyle}
                  onClick={() => handleMenuClick("/pending")}
                >
                  <FaSpinner className="text-xl" />
                  PENDING
                </Link>
              </li>
              <li>
                <Link
                  to="/approved"
                  className={
                    isActive("/approved") ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("/approved")}
                >
                  <FaCheckSquare className="text-xl" />
                  APPROVED
                </Link>
              </li>
              <li>
                <Link
                  to="/rejected"
                  className={
                    isActive("/rejected") ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("/rejected")}
                >
                  <FaSquareXmark className="text-xl" />
                  REJECTED
                </Link>
              </li>
              <li>
                <Link
                  to="/completed"
                  className={
                    isActive("/completed") ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("/completed")}
                >
                  <FaTasks className="text-xl" />
                  COMPLETED
                </Link>
              </li>
            </ul>
            <h1 className="text-[20px] pl-4 pt-6 pb-4">MAINTENANCE</h1>
            <ul className="pl-4 text-[18px] space-y-4">
              <li>
                <Link
                  to="/schedule"
                  className={
                    activeMenu === "SCHEDULE" ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("SCHEDULE")}
                >
                  <FaRegClock className="text-xl" />
                  SCHEDULE
                </Link>
              </li>
              <li>
                <Link
                  to="/holidays"
                  className={
                    activeMenu === "holidays" ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("holidays")}
                >
                  <FaCalendar className="text-xl" />
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
