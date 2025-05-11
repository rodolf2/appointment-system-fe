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
import { Tooltip } from "react-tooltip";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const sidebarRef = useRef();

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  const handleMenuClick = (path, e) => {
    e.stopPropagation();
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  const activeStyle = isSidebarOpen
    ? "bg-[#D9D9D9] text-black rounded-xl pl-4 py-2 flex items-center gap-4 cursor-pointer w-full"
    : "bg-[#D9D9D9] text-black rounded-xl w-[50px] h-[50px] flex items-center justify-center cursor-pointer mx-auto";

  const inactiveStyle = isSidebarOpen
    ? "flex items-center gap-4 pl-4 py-2 cursor-pointer hover:bg-white/10 rounded-lg transition-colors w-full"
    : "w-[50px] h-[50px] flex items-center justify-center cursor-pointer hover:bg-white/10 rounded-full transition-colors mx-auto";

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
      className={`h-full bg-side-bar_bg text-white ${isSidebarOpen ? "w-[300px]" : "w-[100px]"
        } overflow-hidden transition-all duration-300`}
    >
      {/* Logo */}
      <div
        className={`flex ${isSidebarOpen
          ? "items-center justify-start pl-4"
          : "items-center justify-center"
          } mt-6`}
      >
        <img
          src="/assets/image/LV_logo.png"
          alt="LVCC Logo"
          className={`${isSidebarOpen ? "w-[100px] h-[100px]" : "w-[60px] h-[60px]"
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
      <div
        className={`border-b-2 border-white w-full ${isSidebarOpen ? "my-6 mx-4" : "my-4 w-[60%] mx-auto mb-10"
          }`}
      ></div>


      {/* Menu Sections */}
      <nav className={isSidebarOpen ? "px-4" : ""}>
        {menuSections.map((section, index) => (
          <div
            key={index}
            className={`${index === 0 ? (isSidebarOpen ? "mt-6" : "mt-4") : "mt-10"
              }`}
          >
            {/* Section Title */}
            {isSidebarOpen && (
              <div className="pl-4 pb-4">
                <h1 className="text-[20px] font-semibold">{section.title}</h1>
              </div>
            )}

            <ul className="space-y-2">
              {section.items.map(({ path, icon, label }) => (
                <li key={path} className="flex justify-center">
                  <div
                    className={isActive(path) ? activeStyle : inactiveStyle}
                    onClick={(e) => handleMenuClick(path, e)}
                    data-tooltip-id={`tooltip-${path}`}
                    data-tooltip-content={label}
                    data-tooltip-place="right"
                  >
                    <div
                      className={`${isSidebarOpen
                        ? "text-[20px] w-6 flex justify-center"
                        : "text-[25px]"
                        }`}
                    >
                      {icon}
                    </div>
                    {isSidebarOpen && (
                      <span className="ml-4 text-lg">{label}</span>
                    )}
                  </div>
                  {!isSidebarOpen && (
                    <Tooltip
                      id={`tooltip-${path}`}
                      className="custom-tooltip"
                      style={{
                        backgroundColor: "#2D3748",
                        color: "white",
                        borderRadius: "6px",
                        padding: "8px 12px",
                        fontSize: "14px",
                        fontWeight: "500",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        zIndex: 9999,
                        border: "1px solid rgba(255,255,255,0.1)",
                        textShadow: "0 1px 1px rgba(0,0,0,0.3)",
                      }}
                      opacity={1}
                      noArrow={false}
                      delayShow={50}
                      place="right"
                    />
                  )}
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
