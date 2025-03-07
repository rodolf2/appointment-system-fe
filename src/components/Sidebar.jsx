import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { PiArchiveDuotone } from "react-icons/pi";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location.pathname]);

  const handleMenuClick = (path) => {
    setScrollPosition(sidebarRef.current.scroll(0, 0));
    navigate(path);
  };

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollTop = scrollPosition;
    }
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const activeStyle =
    "bg-[#D9D9D9] text-black rounded-lg px-4 py-2 flex items-center gap-4";

  const inactiveStyle = "flex items-center gap-4 px-4 py-2";

  return (
    <aside
      ref={sidebarRef}
      className={`bg-[#161F55] p-4 text-white h-full ${
        isSidebarOpen ? "w-[300px]" : "w-[80px] text-center"
      }`}
    >
      <div className="font-LatoRegular">
        {/* Logo Section */}
        <div className="flex items-center mb-6 mt-3">
          <img
            src="/assets/image/LV_logo.png"
            alt="LVCC Logo"
            className={`w-[50%] h-[50%] ${isSidebarOpen ? "block" : "mx-auto"}`}
          />
          {isSidebarOpen && (
            <div className="ml-4">
              <h1 className="text-2xl font-regular">LVCC</h1>
              <p className="text-xl">REGISTRAR</p>
            </div>
          )}
        </div>
        {isSidebarOpen && (
          <div className="border-b-2 border-white w-full mb-6"></div>
        )}
        {/* Dashboard Section */}
        {isSidebarOpen && <h1 className="text-[20px] pl-4 pb-4">DASHBOARD</h1>}
        <nav>
          <ul
            className={`pl-2 text-[18px] space-y-4 ${
              isSidebarOpen ? "" : "text-center"
            }`}
          >
            <li>
              <div
                className={
                  isActive("/registrarHome") ? activeStyle : inactiveStyle
                }
                onClick={() => handleMenuClick("/registrarHome")}
              >
                <IoMdHome className="text-xl" />
                {isSidebarOpen && "HOME"}
              </div>
            </li>
            <li>
              <div
                className={isActive("/events") ? activeStyle : inactiveStyle}
                onClick={() => handleMenuClick("/events")}
              >
                <FaCalendarAlt className="text-xl" />
                {isSidebarOpen && "EVENTS"}
              </div>
            </li>
            <li>
              <div
                className={isActive("/students") ? activeStyle : inactiveStyle}
                onClick={() => handleMenuClick("/students")}
              >
                <FaUsers className="text-xl" />
                {isSidebarOpen && "STUDENTS/ALUMNI"}
              </div>
            </li>
            <li>
              <div
                className={
                  isActive("/appointments") ? activeStyle : inactiveStyle
                }
                onClick={() => handleMenuClick("/appointments")}
              >
                <FaTasks className="text-xl" />
                {isSidebarOpen && "APPOINTMENTS"}
              </div>
            </li>
          </ul>

          {/* Maintenance Section */}
          {isSidebarOpen && (
            <h1 className="text-[20px] pl-4 pt-6 pb-4">MAINTENANCE</h1>
          )}
          <ul
            className={`pl-4 text-[18px] space-y-4 ${
              isSidebarOpen ? "" : "text-center"
            }`}
          >
            <li>
              <div
                className={isActive("/schedule") ? activeStyle : inactiveStyle}
                onClick={() => handleMenuClick("/schedule")}
              >
                <FaRegClock className="text-xl" />
                {isSidebarOpen && "SCHEDULE"}
              </div>
            </li>
            <li>
              <div
                className={isActive("/holidays") ? activeStyle : inactiveStyle}
                onClick={() => handleMenuClick("/holidays")}
              >
                <FaCalendar className="text-xl" />
                {isSidebarOpen && "HOLIDAYS"}
              </div>
            </li>
            <li>
              <div
                className={isActive("/archived") ? activeStyle : inactiveStyle}
                onClick={() => handleMenuClick("/archived")}
              >
                <PiArchiveDuotone className="text-xl" />
                {isSidebarOpen && "ARCHIVED"}
              </div>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
