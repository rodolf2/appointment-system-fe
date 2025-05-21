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

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);
  const [bookings, setBookings] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [availableSlots, setAvailableSlots] = useState([]);
  const fetchAndGenerateCalendar = useCallback(async () => {
    try {
      setLoading(true);
      const schedules = await getAllSchedules();
      console.log('Fetched schedules:', schedules);
      
      if (Array.isArray(schedules)) {
        const newBookings = generateBookingsFromSchedules(schedules);
        console.log('Generated bookings:', newBookings);
        setBookings(newBookings);
      } else {
        console.error('Invalid schedules data:', schedules);
        setErrorMessage("Error loading schedules");
      }
    } catch (error) {
      console.error('Failed to load schedules:', error);
      setErrorMessage("Failed to load schedules");
    } finally {
      setLoading(false);
    }
  }, [currentMonth]);

  useEffect(() => {
    fetchAndGenerateCalendar();
  }, [fetchAndGenerateCalendar]);
  const generateBookingsFromSchedules = (schedules) => {
    const newBookings = {};
    const daysInMonth = currentMonth.daysInMonth();
    const today = dayjs();

    // Sort schedules by date
    const sortedSchedules = [...schedules].sort((a, b) => 
      dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
    );

    console.log('Processing sorted schedules:', sortedSchedules);

    for (let day = 1; day <= daysInMonth; day++) {
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
      });      if (schedule) {
        // Convert slots to number if it's a string and calculate available slots
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
              slots: slotsAvailable, // Keep this for backward compatibility
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

    console.log('Generated bookings:', newBookings);
    return newBookings;
  };

  const generateDaysInCalendar = () => {
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
  };
  const handleDateClick = async (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const booking = bookings[formattedDate];
    
    console.log('Clicked date:', formattedDate);
    console.log('Booking data:', booking);

    if (booking?.status === "available" && booking.schedule) {
      try {
        const schedule = booking.schedule;
        const formattedSlot = `${schedule.startTime} - ${schedule.endTime}`;
        
        console.log('Schedule found:', schedule);
        console.log('Creating time slot:', formattedSlot);

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
  };

  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot);
    setErrorMessage("");
  };

  const handleSubmit = () => {
    if (!selectedDate?.date || !selectedTimeSlot) {
      setErrorMessage("Please select both date and time");
      return;
    }
    
    if (!selectedDate.schedule || selectedDate.schedule.slots <= 0) {
      setErrorMessage("This schedule is no longer available");
      return;
    }
    
    setShowConfirmation(true);
  };  const handleConfirmSubmit = async () => {
    if (!selectedDate?.date || !selectedTimeSlot || !selectedDate.schedule?._id) {
      setErrorMessage("Missing required booking information");
      setShowConfirmation(false);
      return;
    }

    try {
      setLoading(true);
      // Get student information and ID from localStorage
      const studentId = localStorage.getItem('studentId');
      const formData = JSON.parse(localStorage.getItem('appInfoFormData'));
      
      if (!studentId || !formData) {
        throw new Error('Please complete your personal information first');
      }      const appointmentData = {
        date: selectedDate.date,
        timeSlot: selectedTimeSlot,
        scheduleId: selectedDate.schedule._id,
        studentId: studentId,
        studentInfo: {
          name: `${formData.firstName} ${formData.middleName} ${formData.surname}`.trim(),
          email: formData.email,
          contactNumber: formData.contactNumber,
          schoolYear: formData.schoolYear,
          course: formData.course
        }
      };
      
      console.log('Submitting appointment:', appointmentData);
      const response = await createBooking(appointmentData);
      
      if (!response) {
        throw new Error("No response from booking service");
      }

      // Update the local state to reflect the booked slot
      setBookings(prevBookings => {
        const updatedBookings = { ...prevBookings };
        const booking = updatedBookings[selectedDate.date];
        
        if (booking?.status === "available") {
          const newAvailableSlots = booking.schedule.availableSlots - 1;
          
          if (newAvailableSlots > 0) {
            booking.schedule.availableSlots = newAvailableSlots;
            booking.schedule.slots = newAvailableSlots;
            booking.schedule.bookedSlots = (booking.schedule.bookedSlots || 0) + 1;
          } else {
            booking.status = "unavailable";
            booking.reason = "Fully booked";
            booking.schedule.availableSlots = 0;
            booking.schedule.slots = 0;
            booking.schedule.bookedSlots = booking.schedule.totalSlots;
          }
        }
        
        return updatedBookings;
      });
        console.log('Booking successful, proceeding to next step');
      setShowConfirmation(false);
      setErrorMessage("");
      
      // Force state updates to complete before navigating
      setTimeout(() => {
        onNext(5); // Explicitly go to step 6 (index 5)
      }, 0);
    } catch (error) {
      console.error('Booking error:', error);
      setErrorMessage(error.message || "Failed to book appointment");
      setShowConfirmation(false);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false);
  };

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const isSameDay = (day1, day2) => day1.isSame(day2, "day");

  return {
    currentMonth,
    selectedDate,
    selectedTimeSlot,
    bookings,
    errorMessage,
    showConfirmation,
    loading,
    availableSlots,
    daysInCalendar: generateDaysInCalendar(),
    handleDateClick,
    handleTimeSlotClick,
    handleSubmit,
    handleConfirmSubmit,
    handleCancelSubmit,
    handlePrevMonth,
    handleNextMonth,
    isSameDay
  };
};

export default useAppSchedule;

