import { useState, useEffect } from "react";
import dayjs from "dayjs";

const useAppSchedule = (onNext) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookings, setBookings] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Generate dynamic time slots for available dates
  const generateTimeSlots = () => {
    return [
      "8:00 AM - 10:00 AM",
      "10:00 AM - 12:00 PM",
      "1:00 PM - 3:00 PM",
      "3:00 PM - 5:00 PM",
    ];
  };

  // Generate bookings data for the current month
  const generateBookingsForMonth = () => {
    const newBookings = {};
    const daysInMonth = currentMonth.daysInMonth();
    const today = dayjs();

    for (let day = 1; day <= daysInMonth; day++) {
      const date = currentMonth.date(day);
      const formattedDate = date.format("YYYY-MM-DD");

      // Skip weekends (Saturday = 6, Sunday = 0)
      if (date.day() === 0 || date.day() === 6) {
        newBookings[formattedDate] = {
          status: "unavailable",
          slots: [],
          reason: "Weekend",
        };
        continue;
      }

      // Past dates are unavailable
      if (date.isBefore(today, "day")) {
        newBookings[formattedDate] = {
          status: "unavailable",
          slots: [],
          reason: "Past date",
        };
        continue;
      }

      // Randomly make some dates unavailable (20% chance)
      if (Math.random() < 0.2) {
        newBookings[formattedDate] = {
          status: "unavailable",
          slots: [],
          reason: "Fully booked",
        };
      } else {
        newBookings[formattedDate] = {
          status: "available",
          slots: generateTimeSlots(),
        };
      }
    }

    return newBookings;
  };

  // Update bookings when month changes
  useEffect(() => {
    setBookings(generateBookingsForMonth());
    setSelectedDate(null);
    setSelectedTimeSlot(null);
  }, [currentMonth]);

  // Generate calendar days array
  const generateDaysInCalendar = () => {
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const startOfCalendar = startOfMonth.startOf("week");
    const endOfCalendar = endOfMonth.endOf("week");

    const days = [];
    let currentDay = startOfCalendar;

    while (currentDay.isBefore(endOfCalendar)) {
      days.push(currentDay);
      currentDay = currentDay.add(1, "day");
    }

    return days;
  };

  const daysInCalendar = generateDaysInCalendar();

  const isSameDay = (day1, day2) => day1.isSame(day2, "day");

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const handleDateClick = (day) => {
    const formattedDate = day.format("YYYY-MM-DD");
    const booking = bookings[formattedDate];

    if (booking && booking.status === "available") {
      setSelectedDate({
        date: formattedDate,
        ...bookings[formattedDate],
      });
      setSelectedTimeSlot(null);
      setErrorMessage("");
    } else {
      setSelectedDate(null);
      setSelectedTimeSlot(null);
      setErrorMessage(
        booking?.reason === "Weekend"
          ? "Weekends are not available for booking"
          : booking?.reason === "Past date"
          ? "Cannot book past dates"
          : "This date is fully booked"
      );
    }
  };

  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot);
    setErrorMessage("");
  };

  const handleSubmit = () => {
    if (!selectedDate?.date || !selectedTimeSlot) {
      setErrorMessage("Please select both a date and time slot");
      return;
    }
    setShowConfirmation(true);
  };

  const handleConfirmSubmit = () => {
    setShowConfirmation(false);
    onNext();
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
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
