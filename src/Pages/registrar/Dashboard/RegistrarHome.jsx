import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaUserEdit } from "react-icons/fa";
import { useNavigate } from "react-router";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import dayjs from "dayjs";
import Sidebar from "/src/components/Sidebar";

const RegistrarHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State for dropdown
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = () => {
    // Redirect to sign-in page
    navigate("/signin");
  };

  // Calculate calendar data
  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf("month").day();
  const monthName = currentDate.format("MMMM");
  const year = currentDate.year();

  const events = {
    1: { label: "Holiday", color: "bg-[#AF1EB9]" },
    3: { label: "Appointment", color: "bg-[#299057]" },
    4: { label: "Closed", color: "bg-[#7F8258]" },
    7: { label: "Fully Booked", color: "bg-[#DB3E3E]" },
    8: { label: "Closed", color: "bg-[#7F8258]" },
    9: { label: "Closed", color: "bg-[#7F8258]" },
  };

  // Handle navigation between months
  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  return (
    <div className="flex h-screen font-LatoRegular">
      {isSidebarOpen && <Sidebar isSidebarOpen={isSidebarOpen} />}

      <div className="flex-1 overflow-y-auto relative">
        <div className="relative">
          {/* Optional overlay for blending */}
          <div
            className="absolute inset-0 bg-[#161f55] opacity-70"
            style={{ zIndex: -1 }}
          ></div>

          <main
            className="max-w-[1440px] mx-auto h-auto"
            style={{
              backgroundColor: "#161f55", // Fallback background
              backgroundImage: `url(${"public/assets/image/BackGround.png"})`,
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <header className="z-10 flex justify-between items-center bg-Bbackground h-[87px] px-5">
              <div className="flex items-center">
                <button
                  onClick={toggleSidebar}
                  className="p-2 text-black rounded text-5xl font-bold"
                >
                  <RxHamburgerMenu />
                </button>
                <h1 className="text-[20px] font-bold ml-4">
                  Registrar Office Dashboard
                </h1>
              </div>

              <div className="relative flex items-center gap-3">
                <CgProfile className="text-5xl" />
                <span className="text-[20px]">Juan Dela Cruz</span>
                <button onClick={toggleDropdown}>
                  <IoMdArrowDropdown className="text-5xl" />
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 top-[80px] bg-white border shadow-lg rounded-lg py-2 w-48">
                    <button
                      className="block flex px-4 py-2 text-left hover:bg-gray-200 w-full"
                      onClick={() => alert("Edit Profile Clicked")}
                    >
                      <FaUserEdit className="mr-2 w-[24px] h-[24px]" />
                      Edit Profile
                    </button>
                    <button
                      className="block px-4 py-2 text-left hover:bg-gray-200 w-full"
                      onClick={handleSignOut}
                    >
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </header>

            <div className="p-6">
              <section className="h-auto bg-white max-w-[1300px] mx-auto p-5 my-5 rounded-lg shadow-lg">
                {/* Overview of the Month */}
                <div className="p-6">
                  <h2 className="text-3xl font-bold tracking-[5px] text-[#000]">
                    Overview of the Month
                  </h2>
                  <div className="border-b-4 border-[#F3BC62] w-[300px] my-3"></div>

                  <div className="grid grid-cols-3 gap-6 mt-6">
                    {/* Appointments */}
                    <div className="bg-[#FFFFFF] border-2 border-[#DCE0E5] p-6 rounded-lg shadow-md">
                      <div className="flex items-center justify-center">
                        {/* Circle */}
                        <div className="w-32 h-32 rounded-full flex items-center justify-center bg-[#8BE68E] bg-opacity-60 text-[#299057] text-[30px] font-LatoBold">
                          20
                        </div>
                        {/* Appointments */}
                        <div className="ml-4 text-left">
                          <h3 className="text-[#299057] text-xl font-semibold">
                            Appointments
                          </h3>
                          <div className="mt-2 text-sm">
                            <p className="text-[#000] text-[13px] font-LatoRegular">
                              <span className="text-[#299057] text-[16px] opacity-50">
                                ●
                              </span>{" "}
                              Morning:{" "}
                              <span className=" font-LatoBold">10</span>
                            </p>
                            <p className="text-[#000] text-[13px] font-LatoRegular">
                              <span className="text-[#299057] text-[16px] opacity-50">
                                ●
                              </span>{" "}
                              Afternoon:{" "}
                              <span className=" font-LatoBold">10</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Pendings */}
                    <div className="bg-[#FFFFFF] border-2 border-[#DCE0E5] p-6 rounded-lg shadow-md">
                      <div className="flex items-center justify-center">
                        {/* Circle */}
                        <div className="w-32 h-32 rounded-full flex items-center justify-center bg-[#E5E68B] bg-opacity-60 text-[#A0A112] text-[30px] font-LatoBold">
                          20
                        </div>
                        {/* Pendings */}
                        <div className="ml-4 text-left">
                          <h3 className="text-[#A0A112] text-xl font-semibold">
                            Pendings
                          </h3>
                          <div className="mt-2 text-sm">
                            <p className="text-[#000] text-[13px] font-LatoRegular">
                              <span className="text-[#E5E68B] text-[16px] ">
                                ●
                              </span>{" "}
                              Morning:{" "}
                              <span className=" font-LatoBold">20</span>
                            </p>
                            <p className="text-[#000] text-[13px] font-LatoRegular">
                              <span className="text-[#E5E68B] text-[16px] ">
                                ●
                              </span>{" "}
                              Afternoon:{" "}
                              <span className=" font-LatoBold">10</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Completed */}
                    <div className="bg-[#FFFFFF] border-2 border-[#DCE0E5] p-6 rounded-lg shadow-md">
                      <div className="flex items-center justify-center">
                        {/* Circle */}
                        <div className="w-32 h-32 rounded-full flex items-center justify-center bg-[#DB3E3E] bg-opacity-60 text-[#DB3E3E] text-[30px] font-LatoBold">
                          20
                        </div>
                        {/* Completed */}
                        <div className="ml-4 text-left">
                          <h3 className="text-[#DB3E3E] text-xl font-semibold">
                            Completed
                          </h3>
                          <div className="mt-2 text-sm">
                            <p className="text-[#000] text-[13px] font-LatoRegular">
                              <span className="text-[#DB3E3E] text-[16px] ">
                                ●
                              </span>{" "}
                              Morning:{" "}
                              <span className=" font-LatoBold">15</span>
                            </p>
                            <p className="text-[#000] text-[13px] font-LatoRegular">
                              <span className="text-[#DB3E3E] text-[16px] ">
                                ●
                              </span>{" "}
                              Afternoon:{" "}
                              <span className=" font-LatoBold">5</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Calendar and Holidays Section */}
              <section className="bg-white max-w-[1300px] mx-auto p-5 my-5 rounded-lg shadow-lg grid grid-cols-3 gap-6">
                {/* Calendar Section */}
                <div className="col-span-2 p-5 border-2 border-[#161f55] rounded-lg">
                  {/* Month Navigation */}
                  <div className="flex justify-between items-center mb-5">
                    <h2 className="text-3xl font-bold tracking-[5px] text-[#161F55]">
                      {monthName} {year}
                      <div className="border-b-4 border-[#F3BC62] w-[200px] my-3"></div>
                    </h2>
                    <div>
                      <button
                        onClick={handlePrevMonth}
                        className="px-4 py-2 mr-2 bg-[#161f55] text-white rounded hover:bg-blue-600"
                      >
                        &lt;
                      </button>
                      <button
                        onClick={handleNextMonth}
                        className="px-4 py-2 bg-[#161f55] text-white rounded hover:bg-blue-600"
                      >
                        &gt;
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-7 gap-[1px] bg-[#161f55] text-center mt-6">
                    {/* Days of the Week */}
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day, index) => (
                        <div
                          key={index}
                          className="font-bold text-[#161F55] text-lg bg-white"
                        >
                          {day}
                        </div>
                      )
                    )}

                    {/* Empty slots for start of the month */}
                    {Array.from({ length: startOfMonth }).map((_, index) => (
                      <div key={index} className="bg-white"></div>
                    ))}

                    {/* Calendar Days */}
                    {Array.from({ length: daysInMonth }).map((_, index) => (
                      <div
                        key={index}
                        className={`p-2 bg-white h-[90px] cursor-pointer relative hover:bg-blue-100 ${
                          currentDate.date() === index + 1 &&
                          currentDate.month() === dayjs().month() &&
                          currentDate.year() === dayjs().year()
                            ? "bg-blue-300 font-bold"
                            : ""
                        }`}
                      >
                        {index + 1}
                        {events[index + 1] && (
                          <span
                            className={`flex justify-center mt-4 text-xs text-white px-2 py-1 rounded ${
                              events[index + 1].color
                            }`}
                          >
                            {events[index + 1].label}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Holidays Section */}
                <div className="p-5 border-2 border-[#161f55] rounded-lg">
                  <h3 className="text-2xl font-bold tracking-[3px] text-[#161F55]">
                    Holidays
                  </h3>
                  <div className="border-b-4 border-[#F3BC62] w-[150px] my-3"></div>
                  <ul className="list-disc ml-5 text-lg">
                    <li>Wed 1 - New Year’s Day</li>
                  </ul>
                </div>
              </section>
            </div>

            <footer className="bg-Bbackground h-[70px] flex items-center justify-end pr-9 w-full">
              <p className="font-regular">LA VERDAD CHRISTIAN COLLEGE, INC.</p>
            </footer>
          </main>
        </div>
      </div>
    </div>
  );
};

export default RegistrarHome;
