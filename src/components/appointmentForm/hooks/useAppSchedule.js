import { useState } from "react";
import dayjs from "dayjs"; // Import Day.js for date manipulation

const useAppSchedule = (onNext) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs()); // Tracks the current calendar month
  const [selectedDate, setSelectedDate] = useState(null); // Stores the selected date and booking status
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null); // Tracks the selected time slot
  const [bookings, setBookings] = useState({
    "2025-01-07": {
      status: "available",
      slots: ["8:00 AM - 12:00 PM", "1:00 PM - 5:00 PM"],
    },
    "2025-01-08": { status: "fully booked", slots: [] }, // Example of fully booked date
    "2025-01-09": {
      status: "available",
      slots: ["8:00 AM - 12:00 PM", "1:00 PM - 5:00 PM"],
    },
  });

  const [errorMessage, setErrorMessage] = useState(""); // Stores error messages for invalid submissions
  const [showConfirmation, setShowConfirmation] = useState(false); // Toggles confirmation modal visibility

  const startOfMonth = currentMonth.startOf("month"); // Start of the currently displayed month
  const endOfMonth = currentMonth.endOf("month"); // End of the currently displayed month
  const startOfCalendar = startOfMonth.startOf("week"); // Start of the visible calendar grid (week aligned)
  const endOfCalendar = endOfMonth.endOf("week"); // End of the visible calendar grid (week aligned)

  const daysInCalendar = []; // Array to store all visible days in the calendar
  let currentDay = startOfCalendar;

  while (currentDay.isBefore(endOfCalendar)) {
    daysInCalendar.push(currentDay); // Add each day to the calendar range
    currentDay = currentDay.add(1, "day"); // Move to the next day
  }

  const isSameDay = (day1, day2) => day1.isSame(day2, "day"); // Helper to compare two days

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month")); // Navigate to the previous month
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month")); // Navigate to the next month
  };

  const handleDateClick = (day) => {
    const formattedDate = day.format("YYYY-MM-DD");
    if (bookings[formattedDate]) {
      setSelectedDate({ date: formattedDate, ...bookings[formattedDate] }); // Set selected date with booking info
      setSelectedTimeSlot(null); // Reset the time slot when selecting a new date
    } else {
      setSelectedDate(null); // Clear selected date if no bookings exist
    }
    setErrorMessage(""); // Clear any error messages
  };

  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot); // Update selected time slot
    setErrorMessage(""); // Clear any error messages
  };

  const handleSubmit = () => {
    if (!selectedDate?.date || !selectedTimeSlot) {
      setErrorMessage(
        "Please select both a date and a time slot before submitting."
      ); // Validate inputs
    } else {
      setErrorMessage(""); // Clear error if valid inputs are provided
      setShowConfirmation(true); // Show confirmation modal
    }
  };

  const handleConfirmSubmit = () => {
    setShowConfirmation(false); // Hide the confirmation modal
    onNext(); // Trigger the `onNext` callback to proceed
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false); // Close the confirmation modal without proceeding
  };
  return {
    currentMonth,
    selectedDate,
    selectedTimeSlot,
    bookings,
    errorMessage,
    showConfirmation,
    daysInCalendar,
    isSameDay,
    handlePrevMonth,
    handleNextMonth,
    handleDateClick,
    handleTimeSlotClick,
    handleSubmit,
    handleConfirmSubmit,
    handleCancelSubmit,
  };
};

export default useAppSchedule;
