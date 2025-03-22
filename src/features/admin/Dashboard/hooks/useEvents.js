import { useState, useEffect } from "react"; // Add useEffect
import dayjs from "dayjs";

const useEvents = () => {
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
  return {
    isSidebarOpen,
    currentDate,
    events,
    newEvent,
    selectedEvent,
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
  };
};

export default useEvents;
