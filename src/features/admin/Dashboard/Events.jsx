  import useEvents from "./hooks/useEvents";
import Sidebar from "/src/components/Sidebar";
import Header from "/src/features/admin/components/Header";
// import dayjs from "dayjs";
import Footer from "/src/features/admin/components/Footer";

const Events = () => {
  const {
    isSidebarOpen,
    currentDate,
    events,
    newEvent,
    selectedEvent,
    validationErrors,
    toggleSidebar,
    handlePrevMonth,
    handleNextMonth,
    handleInputChange,
    handleSaveEvent,
    handleCancelEvent,
    handleDayClick,
    handleDeleteEvent,
    handleCloseModal,
    daysInMonth,
    startOfMonth,
    monthKey,
    monthName,
    year,
  } = useEvents();

  return (
    <div className="flex h-screen font-LatoRegular flex-col">
      <div className="flex flex-1 overflow-hidden">
        <div className={`${isSidebarOpen ? "w-[300px]" : "w-[100px]"} z-20`}>
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>

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
            title="Upcoming Events"
          />

          <div className="p-6 flex-1">
            <p className="h-auto font-LatoRegular text-[30px] text-[#fefefe] pb-10">
              EVENT CALENDAR
            </p>
            <section className="bg-white max-w-[1300px] mx-auto p-5 my-5 rounded-lg shadow-lg grid grid-cols-3 gap-6">
              {/* Calendar Section */}
              <div className="col-span-2 p-5 border-2 border-[#161f55] rounded-lg">
                <div className="flex justify-between items-center mb-5">
                  <h2 className="text-3xl font-bold tracking-[5px] text-[#161F55]">
                    {monthName} {year}
                    <div className="border-b-4 border-[#F3BC62] my-3"></div>
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

                  {Array.from({ length: startOfMonth }).map((_, index) => (
                    <div key={index} className="bg-white"></div>
                  ))}

                  {Array.from({ length: daysInMonth }).map((_, index) => {
                    const day = index + 1;
                    // 'events' now comes structured from useEvents hook
                    const eventForDay = events[monthKey]?.[day];

                    return (
                      <div
                        key={`day-${day}`} // Use a more unique key
                        className={`p-2 bg-white h-[90px] cursor-pointer relative hover:bg-blue-100 ${
                          currentDate.date() === day &&
                          currentDate.month() === currentDate.get("month") && // Check against current month of 'currentDate' state
                          currentDate.year() === currentDate.get("year") // Check against current year of 'currentDate' state
                            ? "bg-blue-300 font-bold ring-2 ring-blue-500"
                            : ""
                        }`}
                        onClick={() => handleDayClick(day)}
                      >
                        {day}
                        {eventForDay && ( // Check if eventForDay exists
                          <span
                            className={`absolute bottom-1 left-1 right-1 text-center text-xs text-white px-1 py-0.5 rounded ${eventForDay.color}`}
                          >
                            {eventForDay.label}
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add New Event Section */}
              <div className="p-5 border-2 border-[#161f55] rounded-lg">
                <h3 className="text-2xl font-LatoSemiBold tracking-[3px] text-[#161F55]">
                  Add New Event
                </h3>
                <div className="border-b-4 border-[#F3BC62] w-[200px] my-3"></div>
                <form>
                  {/* General Error Message */}
                  {validationErrors.general && (
                    <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                      {validationErrors.general}
                    </div>
                  )}

                  <div className="mb-4">
                    <label
                      htmlFor="title"
                      className="block font-LatoSemiBold text-[#161f55] text-[18px] mb-2"
                    >
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      value={newEvent.title}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded ${
                        validationErrors.title
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                      placeholder="Enter event title"
                    />
                    {/* Fixed placeholder for error message */}
                    <div className="mt-1 h-5">
                      {validationErrors.title && (
                        <p className="text-sm text-red-500">
                          {validationErrors.title}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-2">
                    <label
                      htmlFor="description"
                      className="block font-LatoSemiBold text-[#161f55] text-[18px] mb-2"
                    >
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      value={newEvent.description}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded ${
                        validationErrors.description
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                      placeholder="Enter event description (optional)"
                      rows="3"
                    ></textarea>
                    {/* Fixed placeholder for error message */}
                    <div className="mt-1 h-5">
                      {validationErrors.description && (
                        <p className="text-sm text-red-500">
                          {validationErrors.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="startDate"
                      className="block font-LatoSemiBold text-[#161f55] text-[18px] mb-2"
                    >
                      Start Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="startDate"
                      name="startDate"
                      value={newEvent.startDate}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded ${
                        validationErrors.startDate
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                    {/* Fixed placeholder for error message */}
                    <div className="mt-1 h-5">
                      {validationErrors.startDate && (
                        <p className="text-sm text-red-500">
                          {validationErrors.startDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="mb-4">
                    <label
                      htmlFor="endDate"
                      className="block font-LatoSemiBold text-[#161f55] text-[18px] mb-2"
                    >
                      End Date <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      id="endDate"
                      name="endDate"
                      value={newEvent.endDate}
                      onChange={handleInputChange}
                      className={`w-full p-2 border rounded ${
                        validationErrors.endDate
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                      }`}
                    />
                    {/* Fixed placeholder for error message */}
                    <div className="mt-1 h-5">
                      {validationErrors.endDate && (
                        <p className="text-sm text-red-500">
                          {validationErrors.endDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleSaveEvent}
                      className="w-full px-4 py-2 bg-[#3A993D] text-white font-LatoSemiBold uppercase rounded hover:bg-green-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={handleCancelEvent}
                      className="w-full px-4 py-2 bg-[#9CA3AF] text-white font-LatoSemiBold uppercase rounded hover:bg-gray-500 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </section>
          </div>

          {/* Modal for Selected Event */}
          {selectedEvent && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg w-[400px]">
                <h2 className="text-2xl font-bold mb-4">
                  {selectedEvent.label}
                </h2>
                <p className="mb-4">{selectedEvent.description}</p>
                <p className="mb-2 text-gray-600">
                  <strong>Start Date:</strong> {selectedEvent.startDate}
                </p>
                <p className="mb-4 text-gray-600">
                  <strong>End Date:</strong> {selectedEvent.endDate}
                </p>
                <div className="flex gap-4">
                  <button
                    onClick={handleDeleteEvent}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                  <button
                    onClick={handleCloseModal}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          )}

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Events;
