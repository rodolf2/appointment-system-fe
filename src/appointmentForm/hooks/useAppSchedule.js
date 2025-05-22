import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import { getAllSchedules, getAvailableSlots } from "../../services/scheduleServices";
import { createBooking } from "../../services/bookingServices";
import { auth } from "../../firebase";

const useAppSchedule = (onNext) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [bookings, setBookings] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const generateBookingsFromSchedules = useCallback((schedules) => {
    const newBookings = {};
    const today = dayjs();

    // Sort schedules by date
    const sortedSchedules = [...schedules].sort((a, b) => 
      dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
    );

    for (let day = 1; day <= currentMonth.daysInMonth(); day++) {
      const date = currentMonth.date(day);
      const formattedDate = date.format("YYYY-MM-DD");

      // Skip weekends
      if (date.day() === 0 || date.day() === 6) {
        newBookings[formattedDate] = { 
          status: "unavailable", 
          reason: "Weekend" 
        };
        continue;
      }

      // Skip past dates
      if (date.isBefore(today, "day")) {
        newBookings[formattedDate] = { 
          status: "unavailable", 
          reason: "Past date" 
        };
        continue;
      }

      // Find matching schedule
      const schedule = sortedSchedules.find(s => {
        const scheduleDate = dayjs(s.date).format("YYYY-MM-DD");
        return scheduleDate === formattedDate;
      });

      if (schedule) {
        const totalSlots = typeof schedule.slots === 'string' 
          ? parseInt(schedule.slots, 10) 
          : schedule.slots;
        const bookedSlots = schedule.bookedSlots || 0;
        const slotsAvailable = totalSlots - bookedSlots;

        if (slotsAvailable > 0) {
          newBookings[formattedDate] = {
            status: "available",
            schedule: {
              ...schedule,
              totalSlots,
              bookedSlots,
              availableSlots: slotsAvailable,
              slots: slotsAvailable,
              startTime: schedule.startTime || "No time specified",
              endTime: schedule.endTime || "No time specified"
            }
          };
        } else {
          newBookings[formattedDate] = {
            status: "unavailable",
            reason: "Fully booked",
            schedule: {
              ...schedule,
              totalSlots,
              bookedSlots,
              availableSlots: 0
            }
          };
        }
      } else {
        newBookings[formattedDate] = { 
          status: "unavailable", 
          reason: "No schedule" 
        };
      }
    }

    return newBookings;
  }, [currentMonth]);

  const fetchAndGenerateCalendar = useCallback(async () => {
    try {
      setLoading(true);
      const schedules = await getAllSchedules();
      
      if (Array.isArray(schedules)) {
        const newBookings = generateBookingsFromSchedules(schedules);
        setBookings(newBookings);
      } else {
        setErrorMessage("Error loading schedules");
      }
    } catch (error) {
      console.error('Failed to load schedules:', error);
      setErrorMessage("Failed to load schedules");
    } finally {
      setLoading(false);
    }
  }, [generateBookingsFromSchedules]);

  useEffect(() => {
    fetchAndGenerateCalendar();
  }, [fetchAndGenerateCalendar]);

  const handleTimeSlotClick = useCallback((slot) => {
    setSelectedTimeSlot(slot);
    setErrorMessage("");
  }, []);

  const handleDateClick = useCallback(async (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const booking = bookings[formattedDate];
    
    if (booking?.status === "available" && booking.schedule) {
      try {
        const schedule = booking.schedule;
        const formattedSlot = `${schedule.startTime} - ${schedule.endTime}`;
        
        setAvailableSlots([formattedSlot]);
        setSelectedDate({ 
          date: formattedDate,
          schedule: schedule,
          slots: booking.slots
        });
        setSelectedTimeSlot(null);
        setErrorMessage("");
      } catch (error) {
        console.error('Error processing date selection:', error);
        setErrorMessage("Error loading schedule details");
        setSelectedDate(null);
      }
    } else {
      setSelectedDate(null);
      setSelectedTimeSlot(null);
      setErrorMessage(booking?.reason || "Date not available");
    }
  }, [bookings]);
  const handleConfirmSubmit = async () => {
    if (!selectedDate?.date || !selectedTimeSlot || !selectedDate.schedule?._id) {
      setErrorMessage("Missing required booking information");
      setShowConfirmation(false);
      return;
    }

    try {
      setIsSubmitting(true);      const studentId = localStorage.getItem('studentId');
      const formData = JSON.parse(localStorage.getItem('appInfoFormData'));
      
      if (!studentId || !formData) {
        throw new Error('Please complete your personal information first');
      }

      // Make sure we have valid IDs
      if (!selectedDate.schedule._id) {
        throw new Error('Invalid schedule selected');
      }

      const appointmentData = {
        scheduleId: selectedDate.schedule._id,
        studentId: studentId, // Changed from userId to studentId to match backend
        purpose: localStorage.getItem('appointmentPurpose') || "General Appointment"
      };
      
      console.log('Submitting appointment data:', appointmentData);
      
      const response = await createBooking(appointmentData);
      
      if (!response) {
        throw new Error("No response from booking service");
      }      console.log('Booking successful:', response);

      // Store the booking response for later use
      localStorage.setItem('lastBookingResponse', JSON.stringify(response));
      
      // Update booked slots in the UI immediately
      if (selectedDate && selectedDate.schedule) {
        const updatedBookings = { ...bookings };
        const dateKey = selectedDate.date;
        if (updatedBookings[dateKey]) {
          updatedBookings[dateKey].schedule.bookedSlots += 1;
          updatedBookings[dateKey].schedule.availableSlots -= 1;
          setBookings(updatedBookings);
        }
      }

      // Clean up state
      setShowConfirmation(false);
      setErrorMessage("");
      setSelectedTimeSlot(null);
      setSelectedDate(null);
      setAvailableSlots([]);
      
      // Ensure we navigate to the next step
      console.log('Navigating to next step...');
      if (typeof onNext === 'function') {
        onNext();
      } else {
        console.error('onNext is not a function');
      }

    } catch (error) {
      console.error('Booking error:', error);
      setErrorMessage(error.message || "Failed to book appointment");
      setShowConfirmation(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = useCallback(() => {
    if (!selectedDate?.date || !selectedTimeSlot) {
      setErrorMessage("Please select both date and time");
      return;
    }
    
    if (!selectedDate.schedule || selectedDate.schedule.slots <= 0) {
      setErrorMessage("This schedule is no longer available");
      return;
    }
    
    setShowConfirmation(true);
  }, [selectedDate, selectedTimeSlot]);

  const handleCancelSubmit = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth(prev => prev.subtract(1, "month"));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth(prev => prev.add(1, "month"));
  }, []);

  const generateDaysInCalendar = useCallback(() => {
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const startOfCalendar = startOfMonth.startOf("week");
    const endOfCalendar = endOfMonth.endOf("week");

    const days = [];
    let currentDay = startOfCalendar;

    while (currentDay.isBefore(endOfCalendar) || currentDay.isSame(endOfCalendar, "day")) {
      days.push(currentDay);
      currentDay = currentDay.add(1, "day");
    }

    return days;
  }, [currentMonth]);

  return {
    currentMonth,
    selectedDate,
    selectedTimeSlot,
    bookings,
    errorMessage,
    showConfirmation,
    loading,
    availableSlots,
    isSubmitting,
    daysInCalendar: generateDaysInCalendar(),
    handleDateClick,
    handleTimeSlotClick,
    handleSubmit,
    handleConfirmSubmit,
    handleCancelSubmit,
    handlePrevMonth,
    handleNextMonth,
    isSameDay: (day1, day2) => day1.isSame(day2, "day")
  };
};

export default useAppSchedule;

