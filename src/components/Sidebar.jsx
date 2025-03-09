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
    navigate(path); // Navigate to the clicked path
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
        isSidebarOpen ? "w-[300px]" : "w-[150px]" // Closed width is now 150px
      } overflow-hidden transition-all duration-300`}
    >
      {/* Logo */}
      <div className="flex items-center justify-center mt-6">
        <img
          src="/assets/image/LV_logo.png"
          alt="LVCC Logo"
          className={`${
            isSidebarOpen ? "w-[100px] h-[100px]" : "w-[70px] h-[70px]"
          } transition-all duration-300`}
        />
        {isSidebarOpen && (
          <div className="ml-4">
            <h1 className="text-2xl font-regular">LVCC</h1>
            <p className="text-xl">REGISTRAR</p>
          </div>
        )}
      </div>

      {/* Divider */}
      {isSidebarOpen && (
        <div className="border-b-2 border-white w-full my-6"></div>
      )}

      {/* Menu Sections */}
      <nav>
        {menuSections.map((section, index) => (
          <div
            key={section.title}
            className={`${index === 0 ? "mt-6" : "mt-4"}`}
          >
            {/* Section Title */}
            <div className="pl-4 pb-4">
              {isSidebarOpen ? (
                <h1 className="text-[20px] font-semibold">{section.title}</h1>
              ) : (
                <h1 className="text-[16px] text-center text-white opacity-70 pl-1">
                  {section.title}
                </h1>
              )}
            </div>

            {/* Menu Items */}
            <ul className="pl-2 text-[18px] space-y-2">
              {section.items.map(({ path, icon, label }) => (
                <li key={path}>
                  <div
                    className={isActive(path) ? activeStyle : inactiveStyle}
                    onClick={() => handleMenuClick(path)} // Only navigate, don't toggle sidebar
                    aria-label={label}
                    tabIndex={0}
                  >
                    <span
                      className={`flex items-center justify-center ${
                        !isSidebarOpen ? "w-full" : ""
                      }`}
                    >
                      {icon}
                    </span>
                    {isSidebarOpen && <span className="ml-4">{label}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
