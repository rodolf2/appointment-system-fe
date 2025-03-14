import { useState } from "react";
import dayjs from "dayjs";
import Sidebar from "/src/components/Sidebar";
import Header from "/src/features/admin/components/Header";
import Footer from "/src/features/admin/components/Footer";

const RegistrarHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Calculate calendar data
  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf("month").day();
  const monthName = currentDate.format("MMMM");
  const year = currentDate.year();

  const events = {
    1: { label: "Holiday", color: "bg-[#AF1EB9]" },
    3: { label: "Appointment", color: "bg-[#48E14D]" },
    4: { label: "Closed", color: "bg-[#7F8258]" },
    7: { label: "Fully Booked", color: "bg-[#F63838]" },
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

  // Function to check if a day is a weekend (Saturday or Sunday)
  const isWeekend = (day) => {
    const dayOfWeek = currentDate.date(day).day();
    return dayOfWeek === 0 || dayOfWeek === 6; // 0 = Sunday, 6 = Saturday
  };

  return (
    <div className="flex h-screen font-LatoRegular">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-[300px]" : "w-[150px]"} z-20`} // Add z-20 to ensure sidebar is above the overlay
      >
        <Sidebar isSidebarOpen={isSidebarOpen} />
      </div>

      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url("/assets/image/BackGround.png")`,
        }}
      >
        <div className="absolute inset-0 bg-[#161f55] bg-opacity-90"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto z-10 relative">
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          title="Registrar Office Dashboard"
        />

        <div className="p-6">
          <section className="h-auto bg-white max-w-[1300px] mx-auto p-5 my-5 rounded-lg shadow-lg">
            {/* Overview of the Month */}
            <div className="p-6">
              <h2 className="text-3xl font-LatoRegular tracking-[5px] text-[#000]">
                Overview of the Month
              </h2>
              <div className="border-b-4 border-[#F3BC62] w-[410px] my-3"></div>

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
                          Morning <span className="ml-4 font-LatoBold">10</span>
                        </p>
                        <p className="text-[#000] text-[13px] font-LatoRegular">
                          <span className="text-[#299057] text-[16px] opacity-50">
                            ●
                          </span>{" "}
                          Afternoon{" "}
                          <span className="ml-2 font-LatoBold">10</span>
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
                          <span className="text-[#E5E68B] text-[16px] ">●</span>{" "}
                          Morning <span className="ml-4 font-LatoBold">20</span>
                        </p>
                        <p className="text-[#000] text-[13px] font-LatoRegular">
                          <span className="text-[#E5E68B] text-[16px] ">●</span>{" "}
                          Afternoon{" "}
                          <span className="ml-2 font-LatoBold">10</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Completed */}
                <div className="bg-[#FFFFFF] border-2 border-[#DCE0E5] p-6 rounded-lg shadow-md">
                  <div className="flex items-center justify-center">
                    {/* Circle */}
                    <div className="w-32 h-32 rounded-full flex items-center justify-center bg-[#354CCE] bg-opacity-60 text-[#354CCE] text-[30px] font-LatoBold">
                      20
                    </div>
                    {/* Completed */}
                    <div className="ml-4 text-left">
                      <h3 className="text-[#354CCE] text-xl font-semibold">
                        Completed
                      </h3>
                      <div className="mt-2 text-sm">
                        <p className="text-[#000] text-[13px] font-LatoRegular">
                          <span className="text-[#354CCE] text-[16px] ">●</span>{" "}
                          Morning <span className="ml-4 font-LatoBold">15</span>
                        </p>
                        <p className="text-[#000] text-[13px] font-LatoRegular">
                          <span className="text-[#354CCE] text-[16px] ">●</span>{" "}
                          Afternoon{" "}
                          <span className="ml-2 font-LatoBold">5</span>
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
                <h2 className="text-3xl font-LatoSemiBold tracking-[5px] text-[#161F55]">
                  {monthName} {year}
                  <div className="border-b-4 border-[#F3BC62]  my-3"></div>
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
                {Array.from({ length: daysInMonth }).map((_, index) => {
                  const day = index + 1;
                  const isWeekendDay = isWeekend(day);
                  const event =
                    events[day] ||
                    (isWeekendDay
                      ? { label: "Closed", color: "bg-[#7F8258]" }
                      : null);

                  return (
                    <div
                      key={index}
                      className={`p-2 bg-white h-[90px] cursor-pointer relative hover:bg-blue-100 ${
                        currentDate.date() === day &&
                        currentDate.month() === dayjs().month() &&
                        currentDate.year() === dayjs().year()
                          ? "bg-blue-300 font-bold"
                          : ""
                      }`}
                    >
                      {day}
                      {event && (
                        <span
                          className={`flex justify-center mt-4 text-xs text-white px-2 py-1 rounded ${event.color}`}
                        >
                          {event.label}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Holidays Section */}
            <div className="p-5 border-2 border-[#161f55] rounded-lg">
              <h3 className="text-2xl font-bold tracking-[3px] text-[#161F55]">
                Holidays
              </h3>
              <div className="border-b-4 border-[#F3BC62] w-[120px] my-3"></div>
              <ul className="list-disc ml-5 text-lg">
                <li>Jan 01 - New Year’s Day</li>
                <li>Mar 31 - Eidul-Fitar</li>
                <li>Apr 09 - The day of Valor</li>
                <li>May 01 - Labor Day</li>
                <li>Jun 07 - Eid al-Adha (Feast of the Sacrifice)</li>
                <li>Jun 08 - Eid al-Adha Day 2</li>
                <li>Jun 12 - Independence Day</li>
                <li>Aug 21 - Ninoy Aquino Day</li>
              </ul>
            </div>
          </section>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default RegistrarHome;
