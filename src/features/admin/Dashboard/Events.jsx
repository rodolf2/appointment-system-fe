import { useState, useEffect } from "react"; // Add useEffect
import dayjs from "dayjs";
import Sidebar from "/src/components/Sidebar";
import Header from "/src/features/admin/components/Header";

const Events = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState({}); // Stores events per month
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Initialize events for dates 20 and 21 in all months
  useEffect(() => {
    const initialEvents = {};
    for (let month = 0; month < 12; month++) {
      const monthKey = dayjs().month(month).format("YYYY-MM");
      initialEvents[monthKey] = {
        20: {
          label: "Event",
          description: "Special Event",
          color: "bg-[#FBBC05]",
          startDate: dayjs().month(month).date(20).format("YYYY-MM-DD"),
          endDate: dayjs().month(month).date(20).format("YYYY-MM-DD"),
        },
        21: {
          label: "Event",
          description: "Special Event",
          color: "bg-[#FBBC05]",
          startDate: dayjs().month(month).date(21).format("YYYY-MM-DD"),
          endDate: dayjs().month(month).date(21).format("YYYY-MM-DD"),
        },
      };
    }
    setEvents(initialEvents);
  }, []);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent({ ...newEvent, [name]: value });
  };

  const handleSaveEvent = () => {
    const { title, startDate, endDate } = newEvent;
    if (!title || !startDate) {
      alert("Please provide a title and a valid start date.");
      return;
    }

    const eventDate = dayjs(startDate);

    // Check if the eventDate is in the currently displayed month and year
    if (
      eventDate.month() !== currentDate.month() ||
      eventDate.year() !== currentDate.year()
    ) {
      alert("The event must be within the currently displayed month.");
      return;
    }

    const monthKey = eventDate.format("YYYY-MM"); // e.g., "2023-01"
    const day = eventDate.date(); // Day of the month (e.g., 27)

    setEvents((prevEvents) => ({
      ...prevEvents,
      [monthKey]: {
        ...prevEvents[monthKey],
        [day]: {
          label: title,
          description: newEvent.description,
          color: "bg-[#299057]",
          startDate,
          endDate,
        },
      },
    }));

    setNewEvent({ title: "", description: "", startDate: "", endDate: "" });
  };

  const handleCancelEvent = () => {
    setNewEvent({ title: "", description: "", startDate: "", endDate: "" });
  };

  const handleDayClick = (day) => {
    const monthKey = currentDate.format("YYYY-MM");
    if (events[monthKey] && events[monthKey][day]) {
      setSelectedEvent({ day, ...events[monthKey][day] });
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const { day } = selectedEvent;
      const monthKey = currentDate.format("YYYY-MM");
      setEvents((prevEvents) => {
        const updatedEvents = { ...prevEvents };
        delete updatedEvents[monthKey][day];
        return updatedEvents;
      });
      setSelectedEvent(null);
    }
  };

  const handleCloseModal = () => {
    setSelectedEvent(null);
  };

  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf("month").day();
  const monthKey = currentDate.format("YYYY-MM");
  const monthName = currentDate.format("MMMM");
  const year = currentDate.year();

  return (
    <div className="flex h-screen font-LatoRegular">
      {/* Sidebar */}
      <div
        className={`${isSidebarOpen ? "w-[300px]" : "w-[150px]"} z-20`} // Closed width is now 150px
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
      <div
        className={`flex-1 overflow-y-auto z-10 relative  transition-all duration-300`}
      >
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          title="Upcoming Events"
        />

        <div className="p-6">
          <p className="h-auto font-LatoRegular text-[30px] text-[#fefefe] pb-10 ">
            EVENT CALENDAR
          </p>
          <section className="bg-white max-w-[1300px] mx-auto p-5 my-5 rounded-lg shadow-lg grid grid-cols-3 gap-6">
            {/* Calendar Section */}
            <div className="col-span-2 p-5 border-2 border-[#161f55] rounded-lg">
              <div className="flex justify-between items-center mb-5">
                <h2 className="text-3xl font-bold tracking-[5px] text-[#161F55]">
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
                  const event = events[monthKey]?.[day];

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
                      onClick={() => handleDayClick(day)}
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

            {/* Add New Event Section */}
            <div className="p-5 border-2 border-[#161f55] rounded-lg">
              <h3 className="text-2xl font-LatoSemiBold tracking-[3px] text-[#161F55]">
                Add New Event
              </h3>
              <div className="border-b-4 border-[#F3BC62] w-[200px] my-3"></div>
              <form>
                <div className="mb-4">
                  <label className="block font-LatoSemiBold text-[#161f55] text-[18px]  mb-2">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={newEvent.title}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Event Title"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-LatoSemiBold text-[#161f55] text-[18px] mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={newEvent.description}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                    placeholder="Event Description"
                  ></textarea>
                </div>
                <div className="mb-4">
                  <label className="block font-LatoSemiBold text-[#161f55] text-[18px] mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    name="startDate"
                    value={newEvent.startDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block font-LatoSemiBold text-[#161f55] text-[18px] mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={newEvent.endDate}
                    onChange={handleInputChange}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={handleSaveEvent}
                    className="w-full px-4 py-2 bg-[#3A993D] text-white font-LatoSemiBold uppercase rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEvent}
                    className="w-full px-4 py-2 bg-[#9CA3AF] text-white font-LatoSemiBold uppercase rounded hover:bg-gray-500"
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
              <h2 className="text-2xl font-bold mb-4">{selectedEvent.label}</h2>
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

        <footer className="bg-Bbackground h-[70px] flex items-center justify-end pr-9 w-full">
          <p className="font-regular">LA VERDAD CHRISTIAN COLLEGE, INC.</p>
        </footer>
      </div>
    </div>
  );
};

export default Events;
