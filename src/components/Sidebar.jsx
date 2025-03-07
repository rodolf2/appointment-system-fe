import { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FaUsers,
  FaTasks,
  FaRegClock,
  FaCalendar,
  FaCalendarAlt,
  FaArchive,
} from "react-icons/fa";
import { IoMdHome } from "react-icons/io";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef();

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  const handleMenuClick = (path) => {
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  const activeStyle =
    "bg-[#D9D9D9] text-black rounded-lg px-4 py-2 flex items-center gap-4 cursor-pointer";
  const inactiveStyle = "flex items-center gap-4 px-4 py-2 cursor-pointer";

  const menuSections = [
    {
      title: "DASHBOARD",
      items: [
        { path: "/registrarHome", icon: <IoMdHome />, label: "HOME" },
        { path: "/events", icon: <FaCalendarAlt />, label: "EVENTS" },
        { path: "/students", icon: <FaUsers />, label: "STUDENTS/ALUMNI" },
        { path: "/appointments", icon: <FaTasks />, label: "APPOINTMENTS" },
      ],
    },
    {
      title: "MAINTENANCE",
      items: [
        { path: "/schedule", icon: <FaRegClock />, label: "SCHEDULE" },
        { path: "/holidays", icon: <FaCalendar />, label: "HOLIDAYS" },
        { path: "/archived", icon: <FaArchive />, label: "ARCHIVED" },
      ],
    },
  ];

  return (
    <aside
      ref={sidebarRef}
      className={`h-full bg-[#161F55] text-white ${
        isSidebarOpen ? "w-[300px]" : "w-[100px]"
      } overflow-hidden transition-all duration-300`}
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

        <nav>
          {menuSections.map((section) => (
            <div key={section.title}>
              {isSidebarOpen && (
                <h1 className="text-[20px] pl-4 pb-4">{section.title}</h1>
              )}
              <ul className="pl-2 text-[18px] space-y-4">
                {section.items.map(({ path, icon, label }) => (
                  <li key={path}>
                    <div
                      className={isActive(path) ? activeStyle : inactiveStyle}
                      onClick={() => handleMenuClick(path)}
                      aria-label={label}
                      tabIndex={0}
                    >
                      {icon}
                      {isSidebarOpen && <span>{label}</span>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
