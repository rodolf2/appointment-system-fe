import React, { useState } from "react";
import dayjs from "dayjs";
import Sidebar from "/src/components/Sidebar";
import Header from "/src/pages/registrar/components/Header.jsx";

const Events = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [events, setEvents] = useState({});
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    startDate: "",
    endDate: "",
  });
  const [selectedEvent, setSelectedEvent] = useState(null);

  // // Load events from localStorage when the component mounts
  // useEffect(() => {
  //   const savedEvents = localStorage.getItem("events");
  //   if (savedEvents) {
  //     setEvents(JSON.parse(savedEvents));
  //   }
  // }, []);

  // // Save events to localStorage whenever the events state changes
  // useEffect(() => {
  //   localStorage.setItem("events", JSON.stringify(events));
  // }, [events]);

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
    if (title && startDate) {
      const eventDate = dayjs(startDate).date();
      setEvents((prevEvents) => ({
        ...prevEvents,
        [eventDate]: {
          label: title,
          description: newEvent.description,
          color: "bg-[#299057]",
          startDate,
          endDate,
        },
      }));
      setNewEvent({ title: "", description: "", startDate: "", endDate: "" });
    }
  };

  const handleCancelEvent = () => {
    setNewEvent({ title: "", description: "", startDate: "", endDate: "" });
  };

  const handleDayClick = (day) => {
    if (events[day]) {
      setSelectedEvent({ day, ...events[day] });
    }
  };

  const handleDeleteEvent = () => {
    if (selectedEvent) {
      const { day } = selectedEvent;
      setEvents((prevEvents) => {
        const updatedEvents = { ...prevEvents };
        delete updatedEvents[day];
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
  const monthName = currentDate.format("MMMM");
  const year = currentDate.year();

  return (
    <div className="flex h-screen font-LatoRegular">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="relative z-20">
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
      )}

      {/* Background Image with Dark Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url("/assets/image/BackGround.png")`,
        }}
      >
        <div className="absolute inset-0 bg-[#161f55] bg-opacity-90"></div>
      </div>

      <div className="flex-1 overflow-y-auto relative">
        <Header
          toggleSidebar={toggleSidebar}
          isSidebarOpen={isSidebarOpen}
          title="Upcoming Events"
        />

        <div className="p-6">
          <section className="bg-white max-w-[1300px] mx-auto p-5 my-5 rounded-lg shadow-lg grid grid-cols-3 gap-6">
            {/* Calendar Section */}
            <div className="col-span-2 p-5 border-2 border-[#161f55] rounded-lg">
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
                    onClick={() => handleDayClick(index + 1)}
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

            {/* Add New Event Section */}
            <div className="p-5 border-2 border-[#161f55] rounded-lg">
              <h3 className="text-2xl font-bold tracking-[3px] text-[#161F55]">
                Add New Event
              </h3>
              <div className="border-b-4 border-[#F3BC62] w-[150px] my-3"></div>
              <form>
                <div className="mb-4">
                  <label className="block text-[#161f55] font-bold mb-2">
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
                  <label className="block text-[#161f55] font-bold mb-2">
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
                  <label className="block text-[#161f55] font-bold mb-2">
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
                  <label className="block text-[#161f55] font-bold mb-2">
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
                    className="w-full px-4 py-2 bg-green-500 text-white font-LatoSemiBold uppercase rounded hover:bg-green-600"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelEvent}
                    className="w-full px-4 py-2 bg-gray-400 text-white uppercase rounded hover:bg-gray-500"
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
