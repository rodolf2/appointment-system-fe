import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaUsers } from "react-icons/fa6";
import { FaTasks } from "react-icons/fa";
import { FaRegClock } from "react-icons/fa";
import { FaCalendar } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import { FaArchive } from "react-icons/fa";
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
    setScrollPosition(0);
    navigate(path);
  };

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollTop = scrollPosition;
    }
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  const activeStyle =
    "bg-[#D9D9D9] text-black rounded-lg px-4 py-2 flex items-center gap-4 cursor-pointer";

  const inactiveStyle = "flex items-center gap-4 px-4 py-2 cursor-pointer";

  return (
    <aside
      ref={sidebarRef}
      className={`h-full bg-[#161F55] ${isSidebarOpen ? "w-64" : "w-20"}${
        isSidebarOpen ? "w-[300px]" : "w-[80px]"
      } overflow-hidden relative`}
    >
      <div
        className={`overflow-hidden font-LatoRegular ${
          isSidebarOpen ? "block" : "hidden"
        }`}
      >
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

        {isSidebarOpen && <h1 className="text-[20px] pl-4 pb-4">DASHBOARD</h1>}
        <nav className={`${isSidebarOpen ? "hidden" : "block"} text-center`}>
          <ul
            className={`pl-2 text-[18px] space-y-4 ${
              isSidebarOpen ? "" : "text-center"
            }`}
          >
            {[
              {
                path: "/registrarHome",
                icon: <IoMdHome className="text-xl  mx-auto my-4" />,
                label: "HOME",
              },
              {
                path: "/events",
                icon: <FaCalendarAlt className="text-xl  mx-auto my-4" />,
                label: "EVENTS",
              },
              {
                path: "/students",
                icon: <FaUsers className="text-xl  mx-auto my-4" />,
                label: "STUDENTS/ALUMNI",
              },
              {
                path: "/appointments",
                icon: <FaTasks className="text-xl  mx-auto my-4" />,
                label: "APPOINTMENTS",
              },
            ].map(({ path, icon, label }) => (
              <li key={path}>
                <div
                  className={isActive(path) ? activeStyle : inactiveStyle}
                  onClick={() => handleMenuClick(path)}
                >
                  {icon}
                  {isSidebarOpen && <span>{label}</span>}
                </div>
              </li>
            ))}
          </ul>

          {isSidebarOpen && (
            <h1 className="text-[20px] pl-4 pt-6 pb-4">MAINTENANCE</h1>
          )}
          <ul
            className={`pl-4 text-[18px] space-y-4 ${
              isSidebarOpen ? "" : "text-center"
            }`}
          >
            {[
              {
                path: "/schedule",
                icon: <FaRegClock className="text-xl  mx-auto my-4" />,
                label: "SCHEDULE",
              },
              {
                path: "/holidays",
                icon: <FaCalendar className="text-xl  mx-auto my-4" />,
                label: "HOLIDAYS",
              },
              {
                path: "/archived",
                icon: <FaArchive className="text-xl  mx-auto my-4" />,
                label: "ARCHIVED",
              },
            ].map(({ path, icon, label }) => (
              <li key={path}>
                <div
                  className={isActive(path) ? activeStyle : inactiveStyle}
                  onClick={() => handleMenuClick(path)}
                >
                  {icon}
                  {isSidebarOpen && <span>{label}</span>}
                </div>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
