import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUsers, FaSpinner, FaCheckSquare, FaCalendar } from "react-icons/fa";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
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
                    isActive("/registrarHome") ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("/registrarHome")}
                >
                  <FaUsers className="text-xl" />
                  HOME
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/events"
                  className={isActive("/events") ? activeStyle : inactiveStyle}
                  onClick={() => handleMenuClick("/events")}
                >
                  <FaSpinner className="text-xl" />
                  EVENTS
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/students"
                  className={
                    isActive("/students-alumni") ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("/students-alumni")}
                >
                  <FaCheckSquare className="text-xl" />
                  STUDENTS/ALUMNI
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/schedule"
                  className={
                    isActive("/schedule") ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("/schedule")}
                >
                  <FaCalendar className="text-xl" />
                  SCHEDULE
                </Link>
              </li>
              <li className="mb-4">
                <Link
                  to="/completed"
                  className={
                    isActive("/completed") ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("/completed")}
                >
                  <FaCalendar className="text-xl" />
                  COMPLETED
                </Link>
              </li>
            </ul>
            <h1 className="text-[20px] pl-5 py-5">MAINTENANCE</h1>
            <ul className="pl-8 text-[18px] py-5">
              <li className="pb-8">
                <Link
                  to="/schedule"
                  className={
                    activeMenu === "SCHEDULE" ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("SCHEDULE")}
                >
                  <FaUsers className="text-4xl" />
                  SCHEDULE
                </Link>
              </li>
              <li>
                <Link
                  to="/holidays"
                  className={
                    activeMenu === "HOLIDAYS" ? activeStyle : inactiveStyle
                  }
                  onClick={() => handleMenuClick("HOLIDAYS")}
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
