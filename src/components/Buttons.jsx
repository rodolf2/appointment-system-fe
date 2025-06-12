import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Buttons = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("");

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    setActiveTab(path);
  }, [location]);

  const tabs = [
    {
      label: "Announcement",
      path: "announcement",
      icon: "/assets/icons/announcement.svg",
    },
    {
      label: "How to Appoint",
      path: "hta",
      icon: "/assets/icons/howtoappoint.svg",
    },
    {
      label: "Guidelines",
      path: "guidelines",
      icon: "/assets/icons/guidelines.svg",
    },
  ];

  return (
    <div className="relative">
      <div className="flex items-center justify-center flex-col max-w-[1297px] mx-auto">
        <div className="absolute z-10 text-[27px] flex justify-around w-full">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.path;
            return (
              <Link
                key={tab.path}
                to={`/home/${tab.path}`}
                className={`pt-7 rounded-sm w-[399px] h-[104px] flex flex-col items-center ${
                  isActive ? "bg-[#FEFEFE]" : "bg-[#D2D2D2]"
                }`}
              >
                <div
                  className={`flex items-center justify-center relative gap-2 ${
                    isActive ? "text-[#161F55]" : "text-gray-600"
                  }`}
                >
                  <span>{tab.label}</span>
                  <img
                    src={tab.icon}
                    alt={`${tab.label} Icon`}
                    className="w-8 h-8" // smaller icon
                  />
                  {isActive && (
                    <span className="absolute left-0 right-0 -bottom-1 h-1 bg-[#F3BC62] w-full"></span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Buttons;
