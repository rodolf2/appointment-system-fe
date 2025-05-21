import { useState, useEffect, useCallback } from "react"; // Added useCallback
import dayjs from "dayjs";
import axios from "axios";

// Ensure this API_URL matches your backend's running port and API prefix
const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api"; // Corrected port based on your server.js default (5000)

const useRegistrarHome = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });

  // State for all holidays fetched from backend
  const [allFetchedHolidays, setAllFetchedHolidays] = useState([]);
  // State for holidays filtered for the currently displayed month on the calendar
  const [currentMonthCalendarHolidays, setCurrentMonthCalendarHolidays] = useState([]);

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf("month").day(); // 0 for Sunday
  const monthName = currentDate.format("MMMM");
  const year = currentDate.year();

  // Function to fetch all holidays from the backend
  const fetchAllHolidaysFromAPI = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/holidays`);
      const formattedBackendHolidays = response.data.map(h => {
        let localDateStr = "";
        if (h.date) {
          try {
            // Ensure date is parsed correctly as local date and formatted to YYYY-MM-DD
            const dateInput = h.date.includes('T') ? h.date : `${h.date}T00:00:00`;
            const dateObj = new Date(dateInput);
            const y = dateObj.getFullYear();
            const m = String(dateObj.getMonth() + 1).padStart(2, '0');
            const d = String(dateObj.getDate()).padStart(2, '0');
            localDateStr = `${y}-${m}-${d}`;
          } catch (e) {
            console.error("Error parsing holiday date in useRegistrarHome:", h.date, e);
          }
        }
        return {
          id: h._id, // Use the actual ID from backend
          date: localDateStr, // Store as YYYY-MM-DD
          name: h.description, // Assuming 'description' from backend is the holiday 'name'
        };
      });
      setAllFetchedHolidays(formattedBackendHolidays);
    } catch (error) {
      console.error("Error fetching holidays for registrar home:", error);
      setAllFetchedHolidays([]); // Set to empty array on error
    }
  }, []); // Empty dependency array means this function itself doesn't change

  // Fetch holidays when the hook initializes
  useEffect(() => {
    fetchAllHolidaysFromAPI();
  }, [fetchAllHolidaysFromAPI]); // Depend on the memoized fetch function

  // Filter holidays for the current calendar month whenever currentDate or allFetchedHolidays change
  useEffect(() => {
    if (allFetchedHolidays.length > 0) {
      const currentYearMonth = currentDate.format("YYYY-MM"); // e.g., "2023-12"
      const filtered = allFetchedHolidays.filter((holiday) => {
        // holiday.date is "YYYY-MM-DD"
        return holiday.date && holiday.date.startsWith(currentYearMonth);
      });
      setCurrentMonthCalendarHolidays(filtered);
    } else {
      setCurrentMonthCalendarHolidays([]);
    }
  }, [currentDate, allFetchedHolidays]);


  // Dummy events - you might want to fetch these or manage them differently
  const events = {
    2: { label: "Fully Booked", color: "bg-[#F63838]" },
    3: { label: "Fully Booked", color: "bg-[#F63838]" },
    6: { label: "Fully Booked", color: "bg-[#F63838]" },
    7: { label: "Fully Booked", color: "bg-[#F63838]" },
    10: { label: "Fully Booked", color: "bg-[#F63838]" },
    13: { label: "Available", color: "bg-[#48E14D]" },
    14: { label: "Available", color: "bg-[#48E14D]" },
    15: { label: "Available", color: "bg-[#48E14D]" },
    16: { label: "Available", color: "bg-[#48E14D]" },
    17: { label: "Available", color: "bg-[#48E14D]" },
    20: { label: "Special Event", color: "bg-[#FBBC05]" },
    21: { label: "Special Event", color: "bg-[#FBBC05]" },
    22: { label: "Available", color: "bg-[#48E14D]" },
    23: { label: "Available", color: "bg-[#48E14D]" },
    24: { label: "Available", color: "bg-[#48E14D]" },
    25: { label: "Available", color: "bg-[#48E14D]" },
    26: { label: "Available", color: "bg-[#48E14D]" },
    27: { label: "Available", color: "bg-[#48E14D]" },
    28: { label: "Available", color: "bg-[#48E14D]" },
    29: { label: "Available", color: "bg-[#48E14D]" },
    30: { label: "Available", color: "bg-[#48E14D]" },
    31: { label: "Available", color: "bg-[#48E14D]" },
  };
  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const isWeekend = (dayOfMonth) => { // Parameter is day of the month (1-31)
    const dateToCheck = currentDate.date(dayOfMonth);
    const dayOfWeek = dateToCheck.day(); // 0 for Sunday, 6 for Saturday
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  // Click outside sidebar logic (seems okay, ensure class names match)
  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.querySelector(".sidebar-container"); // Make sure this class exists on your sidebar
      const toggleButton = document.querySelector(".sidebar-toggle-button"); // And this one on your toggle button in Header

      if (
        sidebar &&
        !sidebar.contains(e.target) &&
        !toggleButton?.contains(e.target) && // Only if toggleButton exists
        isSidebarOpen // Only close if it's already open
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) { // Only add listener if sidebar is open to potentially close it
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]); // Re-run if isSidebarOpen changes

  return {
    isSidebarOpen,
    setIsSidebarOpen, // Expose setter if needed by parent for direct control
    currentDate,
    toggleSidebar,
    daysInMonth,
    startOfMonth,
    monthName,
    year,
    holidays: allFetchedHolidays, // Provide the full list of fetched holidays for the "Holidays Section"
    currentMonthHolidays: currentMonthCalendarHolidays, // Provide filtered holidays for the calendar view
    events,
    handlePrevMonth,
    handleNextMonth,
    isWeekend,
  };
};

export default useRegistrarHome;