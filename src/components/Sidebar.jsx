import { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
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
import PropTypes from "prop-types";
import { VscFeedback } from "react-icons/vsc";

// Custom Image Icon component (no changes needed here)
const ImageIcon = ({ src, alt, className, color = "white" }) => {
  const filterValues = {
    white: "brightness(0) invert(1)",
    black: "brightness(0)",
    gray: "brightness(0) opacity(0.6)",
    custom: color,
  };
  return (
    <img
      src={src}
      alt={alt}
      className={`${className} object-contain transition-all duration-200`}
      style={{
        filter: filterValues[color] || filterValues.white,
      }}
    />
  );
};

ImageIcon.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  color: PropTypes.oneOf(["white", "black", "gray", "custom"]),
};

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const sidebarRef = useRef();

  useEffect(() => {
    if (sidebarRef.current) {
      sidebarRef.current.scrollTop = 0;
    }
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  // --- CHANGE #1: Reduced vertical padding on links when sidebar is open ---
  const activeStyle = isSidebarOpen
    ? "bg-[#D9D9D9] text-black rounded-xl pl-4 py-1.5 flex items-center gap-4 cursor-pointer w-full" // py-2 changed to py-1.5
    : "bg-[#D9D9D9] text-black rounded-xl w-[50px] h-[50px] flex items-center justify-center cursor-pointer mx-auto";

  const inactiveStyle = isSidebarOpen
    ? "flex items-center gap-4 pl-4 py-1.5 cursor-pointer hover:bg-white/10 rounded-lg transition-colors w-full" // py-2 changed to py-1.5
    : "w-[50px] h-[50px] flex items-center justify-center cursor-pointer hover:bg-white/10 rounded-full transition-colors mx-auto";

  const menuSections = [
    {
      title: "DASHBOARD",
      items: [
        { path: "/registrarHome", icon: <IoMdHome />, label: "HOME" },
        { path: "/events", icon: <FaCalendarAlt />, label: "EVENTS" },
        { path: "/students", icon: <FaUsers />, label: "STUDENTS/ALUMNI" },
        { path: "/appointments", icon: <FaTasks />, label: "APPOINTMENTS" },
        {
          path: "/feedback",
          icon: (
            <ImageIcon
              src="/assets/icons/feedback.png"
              alt="Feedback Icon"
              className={`${isSidebarOpen ? "w-7 h-7" : "w-8 h-8"} ${
                isActive("/feedback") ? "opacity-100" : "opacity-100"
              }`}
              color={isActive("/feedback") ? "black" : "white"}
            />
          ),
          fallbackIcon: <VscFeedback />,
          label: "FEEDBACK",
        },
      ],
    },
    {
      title: "MAINTENANCE",
      items: [
        { path: "/schedule", icon: <FaRegClock />, label: "SCHEDULE" },
        { path: "/holidays", icon: <FaCalendar />, label: "HOLIDAYS" },
        {
          path: "/announcements",
          icon: (
            <ImageIcon
              src="/assets/icons/announcement_icon.png"
              alt="Announcement Icon"
              className={`${isSidebarOpen ? "w-6 h-6" : "w-6 h-6"} ${
                isActive("/announcements") ? "opacity-100" : "opacity-100"
              }`}
              color={isActive("/announcements") ? "black" : "white"}
            />
          ),
          fallbackIcon: <IoMdHome />,
          label: "ANNOUNCEMENT",
        },
        { path: "/archived", icon: <FaArchive />, label: "ARCHIVED" },
      ],
    },
  ];

  return (
    <aside
      ref={sidebarRef}
      className={`h-full bg-side-bar_bg text-white ${
        isSidebarOpen ? "w-[300px]" : "w-[100px]"
      } overflow-auto transition-all duration-300`}
    >
      {/* Logo */}
      <div
        className={`flex ${
          isSidebarOpen
            ? "items-center justify-start pl-4"
            : "items-center justify-center"
        } mt-6`}
      >
        <img
          src="/assets/image/LV_logo.png"
          alt="LVCC Logo"
          className={`${
            isSidebarOpen ? "w-[100px] h-[100px]" : "w-[60px] h-[60px]"
          } transition-all duration-300`}
        />
        {isSidebarOpen && (
          <div className="ml-4">
            <h1 className="text-2xl font-regular">LVCC</h1>
            <p className="text-xl">REGISTRAR</p>
          </div>
        )}
      </div>

      {/* --- CHANGE #2: Reduced margin on the divider when sidebar is open --- */}
      <div
        className={`border-b-2 border-white w-full ${
          isSidebarOpen ? "my-4" : "my-4 w-[60%] mx-auto mb-10" // my-6 changed to my-4
        }`}
      ></div>

      {/* Menu Sections */}
      <nav className={isSidebarOpen ? "px-4" : ""}>
        {menuSections.map((section, index) => (
          <div
            key={index}
            // --- CHANGE #3: Reduced margin between sections when sidebar is open ---
            className={
              isSidebarOpen
                ? index === 0
                  ? "mt-2"
                  : "mt-5" // Reduced from mt-6 and mt-10
                : index === 0
                ? "mt-4"
                : "mt-10" // Kept original spacing for closed sidebar
            }
          >
            {/* Section Title */}
            {isSidebarOpen && (
              // --- CHANGE #4: Reduced padding below section titles ---
              <div className="pl-4 pb-2"> {/* pb-4 changed to pb-2 */}
                <h1 className="text-[20px] font-semibold">{section.title}</h1>
              </div>
            )}

            {/* --- CHANGE #5: Reduced space between list items --- */}
            <ul className="space-y-1"> {/* space-y-2 changed to space-y-1 */}
              {section.items.map(({ path, icon, label }) => (
                <li key={path} className="flex justify-center">
                  <Link
                    to={path}
                    className={isActive(path) ? activeStyle : inactiveStyle}
                    data-tooltip-id={`tooltip-${path}`}
                    data-tooltip-content={label}
                    data-tooltip-place="right"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div
                      className={`${
                        isSidebarOpen
                          ? "text-[20px] w-6 flex justify-center"
                          : "text-[25px]"
                      }`}
                    >
                      {icon}
                    </div>
                    {isSidebarOpen && (
                      <span className="ml-4 text-lg">{label}</span>
                    )}
                  </Link>
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
                        textShadow: "0 1px 1px rgba(0,0,0,0.3)",
                      }}
                      border="1px solid rgba(255,255,255,0.1)"
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

Sidebar.propTypes = {
  isSidebarOpen: PropTypes.bool.isRequired,
  setIsSidebarOpen: PropTypes.func,
};

export default Sidebar;