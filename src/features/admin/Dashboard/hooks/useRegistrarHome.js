import { useState, useEffect, useCallback } from "react"; // Added useCallback
import dayjs from "dayjs";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const API_URL_EVENTS =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const useRegistrarHome = () => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [allFetchedHolidays, setAllFetchedHolidays] = useState([]);
  const [currentMonthCalendarHolidays, setCurrentMonthCalendarHolidays] =
    useState([]);
  const [allDashboardEvents, setAllDashboardEvents] = useState([]); // Raw events for this dashboard
  const [calendarDashboardEvents, setCalendarDashboardEvents] = useState({}); // Formatted for calendar

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf("month").day();
  const monthName = currentDate.format("MMMM");
  const year = currentDate.year();

  const fetchEventsForDashboard = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL_EVENTS}/api/events`); // Fetch events
      setAllDashboardEvents(response.data);
    } catch (error) {
      console.error("Error fetching events for dashboard:", error);
      setAllDashboardEvents([]);
    }
  }, []);

  useEffect(() => {
    fetchEventsForDashboard();
  }, [fetchEventsForDashboard]);

  useEffect(() => {
    const formatted = {};
    allDashboardEvents.forEach((event) => {
      const startDate = dayjs(event.startDate);
      const endDate = dayjs(event.endDate);
      let currentDateIter = startDate;
      while (
        currentDateIter.isBefore(endDate) ||
        currentDateIter.isSame(endDate, "day")
      ) {
        const monthKey = currentDateIter.format("YYYY-MM");
        const day = currentDateIter.date();
        if (!formatted[monthKey]) {
          formatted[monthKey] = {};
        }
        // Event structure for RegistrarHome calendar
        // This might be simpler than the Events page if it's just a label
        formatted[monthKey][day] = {
          label: "Event", // Or event.title if you want more detail
          color: event.color || "bg-yellow-500", // Different default color for dashboard
        };
        currentDateIter = currentDateIter.add(1, "day");
      }
    });
    setCalendarDashboardEvents(formatted);
  }, [allDashboardEvents]);
  // Function to fetch all holidays from the backend
  const fetchAllHolidaysFromAPI = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/holidays`);
      const formattedBackendHolidays = response.data.map((h) => {
        let localDateStr = "";
        if (h.date) {
          try {
            const dateInput = h.date.includes("T")
              ? h.date
              : `${h.date}T00:00:00`;
            const dateObj = new Date(dateInput);
            const y = dateObj.getFullYear();
            const m = String(dateObj.getMonth() + 1).padStart(2, "0"); // Correct: Add 1
            const d = String(dateObj.getDate()).padStart(2, "0");
            localDateStr = `${y}-${m}-${d}`;
          } catch (e) {
            console.error(
              "Error parsing holiday date in useRegistrarHome:",
              h.date,
              e
            );
          }
        }
        return {
          id: h._id,
          date: localDateStr,
          name: h.description,
        };
      });
      setAllFetchedHolidays(formattedBackendHolidays);
    } catch (error) {
      console.error("Error fetching holidays for registrar home:", error);
      setAllFetchedHolidays([]);
    }
  }, []);

  useEffect(() => {
    fetchAllHolidaysFromAPI();
  }, [fetchAllHolidaysFromAPI]);

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

  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  const isWeekend = (dayOfMonth) => {
    const dateToCheck = currentDate.date(dayOfMonth);
    const dayOfWeek = dateToCheck.day();
    return dayOfWeek === 0 || dayOfWeek === 6;
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.querySelector(".sidebar-container");
      const toggleButton = document.querySelector(".sidebar-toggle-button");

      if (
        sidebar &&
        !sidebar.contains(e.target) &&
        !toggleButton?.contains(e.target) &&
        isSidebarOpen
      ) {
        setIsSidebarOpen(false);
      }
    };

    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isSidebarOpen]);
  const [stats, setStats] = useState({
    APPROVED: 0,
    PENDING: 0,
    COMPLETED: 0,
    REJECTED: 0,
    total: 0,
    morning: {
      APPROVED: 0,
      PENDING: 0,
      COMPLETED: 0,
      REJECTED: 0,
    },
    afternoon: {
      APPROVED: 0,
      PENDING: 0,
      COMPLETED: 0,
      REJECTED: 0,
    },
  });

  // Create a fetchStats function that calculates stats from appointment data
  const fetchStats = useCallback(async () => {
    try {
      console.log("Fetching appointment data to calculate stats...");

      // Fetch appointments data directly (same as the appointments page does)
      const API_BASE_URL =
        "https://appointment-system-backend-n8dk.onrender.com/api";

      // Get all appointment statuses
      const statusResponse = await axios.get(`${API_BASE_URL}/status`);
      const statusData = statusResponse.data;

      // Get student/booking data to get time information
      const studentsResponse = await axios.get(
        `${API_BASE_URL}/document-requests/docs-with-details`
      );
      const studentsData = studentsResponse.data;

      console.log("Raw status data:", statusData);
      console.log("Raw students data:", studentsData);

      // Create a map of transaction numbers to their booking info
      const studentMap = studentsData.reduce((acc, student) => {
        if (student && student.transactionNumber) {
          acc[student.transactionNumber] = student;
        }
        return acc;
      }, {});

      // Initialize stats
      const calculatedStats = {
        APPROVED: 0,
        PENDING: 0,
        COMPLETED: 0,
        REJECTED: 0,
        total: 0,
        morning: {
          APPROVED: 0,
          PENDING: 0,
          COMPLETED: 0,
          REJECTED: 0,
        },
        afternoon: {
          APPROVED: 0,
          PENDING: 0,
          COMPLETED: 0,
          REJECTED: 0,
        },
      };

      // Process each status record
      statusData.forEach((status) => {
        const statusType = status.status || "PENDING";
        const studentInfo = studentMap[status.transactionNumber];

        console.log(
          `Processing ${status.transactionNumber}: Status=${statusType}, Student=`,
          studentInfo
        );

        // Count total for this status
        if (Object.prototype.hasOwnProperty.call(calculatedStats, statusType)) {
          calculatedStats[statusType]++;
          calculatedStats.total++;

          // Determine morning/afternoon from student timeSlot or appointmentTime
          let timeSlot = "";
          if (studentInfo) {
            timeSlot =
              studentInfo.timeSlot || studentInfo.appointmentTime || "";
          }

          // Also check the status record itself
          if (!timeSlot && status.timeSlot) {
            timeSlot = status.timeSlot;
          }

          console.log(`  TimeSlot found: "${timeSlot}"`);

          // Determine if it's morning or afternoon
          const timeSlotUpper = timeSlot.toUpperCase();
          const isAM =
            timeSlotUpper.includes("AM") ||
            timeSlotUpper.includes("MORNING") ||
            timeSlotUpper.includes("8:") ||
            timeSlotUpper.includes("9:") ||
            timeSlotUpper.includes("10:") ||
            timeSlotUpper.includes("11:");
          const isPM =
            timeSlotUpper.includes("PM") ||
            timeSlotUpper.includes("AFTERNOON") ||
            timeSlotUpper.includes("1:") ||
            timeSlotUpper.includes("2:") ||
            timeSlotUpper.includes("3:") ||
            timeSlotUpper.includes("4:") ||
            timeSlotUpper.includes("5:");

          if (isAM) {
            calculatedStats.morning[statusType]++;
            console.log(`  -> Added to MORNING ${statusType}`);
          } else if (isPM) {
            calculatedStats.afternoon[statusType]++;
            console.log(`  -> Added to AFTERNOON ${statusType}`);
          } else {
            // Default fallback - if no time info, distribute evenly or assign to morning
            calculatedStats.morning[statusType]++;
            console.log(
              `  -> No time info, defaulted to MORNING ${statusType}`
            );
          }
        }
      });

      console.log("Calculated stats:", calculatedStats);
      setStats(calculatedStats);
    } catch (error) {
      console.error("Error calculating dashboard stats:", error);
      // Fallback to original API if calculation fails
      try {
        const response = await axios.get(`${API_URL}/api/dashboard/stats`);
        setStats(response.data);
      } catch (fallbackError) {
        console.error("Fallback API also failed:", fallbackError);
      }
    }
  }, []);

  // Add this effect to fetch stats
  useEffect(() => {
    fetchStats();
    // Set up a refresh interval
    const interval = setInterval(fetchStats, 30000); // Refresh every 30 seconds

    return () => clearInterval(interval);
  }, [fetchStats]); // Use fetchStats as dependency

  // Listen for appointment status updates to refresh stats
  useEffect(() => {
    const handleStatusUpdate = () => {
      console.log("Appointment status updated, refreshing dashboard stats...");
      fetchStats();
    };

    // Listen for custom events
    window.addEventListener("appointmentStatusUpdated", handleStatusUpdate);

    // Also listen for storage events (in case updates happen in other tabs)
    window.addEventListener("storage", (e) => {
      if (e.key === "appointmentStatusUpdated") {
        handleStatusUpdate();
      }
    });

    return () => {
      window.removeEventListener(
        "appointmentStatusUpdated",
        handleStatusUpdate
      );
      window.removeEventListener("storage", handleStatusUpdate);
    };
  }, [fetchStats]);

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    currentDate,
    toggleSidebar,
    daysInMonth,
    startOfMonth,
    monthName,
    year,
    holidays: allFetchedHolidays,
    handlePrevMonth,
    handleNextMonth,
    isWeekend,
    currentMonthHolidays: currentMonthCalendarHolidays,
    events: calendarDashboardEvents,
    stats,
    refreshStats: fetchStats, // Add this so components can manually refresh stats
  };
};

export default useRegistrarHome;
