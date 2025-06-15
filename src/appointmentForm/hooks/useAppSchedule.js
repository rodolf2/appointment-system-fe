import { useState, useEffect, useCallback } from "react";
import dayjs from "dayjs";
import {
  getAllSchedules,
  getAvailableSlots,
} from "../../services/scheduleServices";
import { createBooking } from "../../services/bookingServices";
import { auth } from "../../firebase";
import { clearAllFormData } from "../../lib/clearFormData";

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

  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const generateBookingsFromSchedules = useCallback(
    (schedules) => {
      const newBookings = {};
      const today = dayjs();

      // Sort schedules by date and time
      const sortedSchedules = [...schedules].sort((a, b) => {
        const dateCompare = dayjs(a.date).valueOf() - dayjs(b.date).valueOf();
        if (dateCompare === 0) {
          // If same date, sort by start time
          return (
            convertTimeToMinutes(a.startTime) -
            convertTimeToMinutes(b.startTime)
          );
        }
        return dateCompare;
      });

      for (let day = 1; day <= currentMonth.daysInMonth(); day++) {
        const date = currentMonth.date(day);
        const formattedDate = date.format("YYYY-MM-DD");

        // Skip weekends
        if (date.day() === 0 || date.day() === 6) {
          newBookings[formattedDate] = {
            status: "unavailable",
            reason: "Weekend",
            schedules: [],
          };
          continue;
        }

        // Skip past dates
        if (date.isBefore(today, "day")) {
          newBookings[formattedDate] = {
            status: "unavailable",
            reason: "Past date",
            schedules: [],
          };
          continue;
        }

        // Find all schedules for this date
        const daySchedules = sortedSchedules.filter((s) => {
          const scheduleDate = dayjs(s.date).format("YYYY-MM-DD");
          return scheduleDate === formattedDate;
        });

        if (daySchedules.length > 0) {
          const availableSchedules = daySchedules.filter((schedule) => {
            const totalSlots =
              typeof schedule.slots === "string"
                ? parseInt(schedule.slots, 10)
                : schedule.slots;
            const bookedSlots = schedule.bookedSlots || 0;
            return totalSlots - bookedSlots > 0;
          });

          newBookings[formattedDate] = {
            status: availableSchedules.length > 0 ? "available" : "unavailable",
            reason: availableSchedules.length === 0 ? "Fully booked" : null,
            schedules: daySchedules.map((schedule) => {
              const totalSlots =
                typeof schedule.slots === "string"
                  ? parseInt(schedule.slots, 10)
                  : schedule.slots;
              const bookedSlots = schedule.bookedSlots || 0;
              const slotsAvailable = totalSlots - bookedSlots;

              return {
                ...schedule,
                totalSlots,
                bookedSlots,
                availableSlots: slotsAvailable,
                slots: slotsAvailable,
                startTime: schedule.startTime || "No time specified",
                endTime: schedule.endTime || "No time specified",
                timeSlot: `${schedule.startTime} - ${schedule.endTime}`,
              };
            }),
          };
        } else {
          newBookings[formattedDate] = {
            status: "unavailable",
            reason: "No schedule",
            schedules: [],
          };
        }
      }

      return newBookings;
    },
    [currentMonth]
  );

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
      console.error("Failed to load schedules:", error);
      setErrorMessage("Failed to load schedules");
    } finally {
      setLoading(false);
    }
  }, [generateBookingsFromSchedules]);

  useEffect(() => {
    fetchAndGenerateCalendar();
  }, [fetchAndGenerateCalendar]);

  const handleTimeSlotClick = useCallback(
    (timeSlot) => {
      // Find the corresponding schedule for the selected time slot
      const selectedSchedule = selectedDate?.availableTimeSlots?.find(
        (slot) => slot.timeSlot === timeSlot
      );

      if (selectedSchedule) {
        setSelectedTimeSlot(timeSlot);
        // Store the full schedule information for the selected time slot
        setSelectedDate((prev) => ({
          ...prev,
          selectedSchedule: selectedSchedule,
        }));
        setErrorMessage("");
      } else {
        setErrorMessage("Invalid time slot selected");
      }
    },
    [selectedDate]
  );

  const handleDateClick = useCallback(
    async (date) => {
      const formattedDate = date.format("YYYY-MM-DD");
      const booking = bookings[formattedDate];

      if (booking?.schedules?.length > 0) {
        try {
          // Filter schedules that actually have available slots
          const availableSchedules = booking.schedules.filter(
            (schedule) => schedule.availableSlots > 0
          );

          if (availableSchedules.length > 0) {
            // Sort time slots chronologically
            const availableTimeSlots = availableSchedules
              .map((schedule) => ({
                ...schedule,
                timeSlot: `${schedule.startTime} - ${schedule.endTime}`,
              }))
              .sort((a, b) => {
                const timeA = convertTimeToMinutes(a.startTime);
                const timeB = convertTimeToMinutes(b.startTime);
                return timeA - timeB;
              });

            setAvailableSlots(availableTimeSlots.map((slot) => slot.timeSlot));
            setSelectedDate({
              date: formattedDate,
              schedules: booking.schedules,
              availableTimeSlots,
            });
            setSelectedTimeSlot(null);
            setErrorMessage("");
          } else {
            setSelectedDate(null);
            setSelectedTimeSlot(null);
            setAvailableSlots([]);
            setErrorMessage("No available slots for this date");
          }
        } catch (error) {
          console.error("Error processing date selection:", error);
          setErrorMessage("Error loading schedule details");
          setSelectedDate(null);
          setAvailableSlots([]);
        }
      } else {
        setSelectedDate(null);
        setSelectedTimeSlot(null);
        setAvailableSlots([]);
        setErrorMessage(
          booking?.reason || "No schedules available for this date"
        );
      }
    },
    [bookings]
  );
  const handleConfirmSubmit = async () => {
    if (!selectedDate || !selectedTimeSlot || isSubmitting) {
      setErrorMessage("Missing required booking information");
      setShowConfirmation(false);
      return;
    }

    try {
      setIsSubmitting(true);

      // Find the specific time slot that was selected
      const selectedSlotDetails = selectedDate.availableTimeSlots.find(
        (slot) => slot.timeSlot === selectedTimeSlot
      );

      if (!selectedSlotDetails || !selectedSlotDetails._id) {
        throw new Error("Selected time slot not found");
      }

      // Verify current slot availability
      const currentSchedule = await getAllSchedules();
      const targetSchedule = currentSchedule.find(
        (s) => s._id === selectedSlotDetails._id
      );

      if (!targetSchedule) {
        throw new Error("Schedule not found");
      }

      if (targetSchedule.availableSlots <= 0) {
        throw new Error("This slot is no longer available");
      }

      const studentId = localStorage.getItem("studentId");
      const formData = JSON.parse(localStorage.getItem("appInfoFormData"));

      if (!studentId || !formData) {
        throw new Error("Please complete your personal information first");
      }

      const appointmentData = {
        date: selectedDate.date,
        timeSlot: selectedTimeSlot,
        scheduleId: selectedSlotDetails._id,
        studentId: studentId,
        purpose:
          localStorage.getItem("appointmentPurpose") || "General Appointment",
      };

      console.log("Submitting appointment data:", appointmentData);

      const response = await createBooking(appointmentData);

      if (!response) {
        throw new Error("No response from booking service");
      }

      console.log("Booking successful:", response);
      localStorage.setItem("lastBookingResponse", JSON.stringify(response));

      // Update bookings state with new slot count
      const updatedBookings = { ...bookings };
      const dateKey = selectedDate.date;

      if (updatedBookings[dateKey]) {
        const newSchedules = updatedBookings[dateKey].schedules.map(
          (schedule) => {
            if (schedule._id === selectedSlotDetails._id) {
              return {
                ...schedule,
                availableSlots: schedule.availableSlots - 1,
                bookedSlots: schedule.bookedSlots + 1,
              };
            }
            return schedule;
          }
        );

        // Update the booking status if all schedules are fully booked
        const hasAvailableSlots = newSchedules.some(
          (schedule) => schedule.availableSlots > 0
        );
        updatedBookings[dateKey] = {
          ...updatedBookings[dateKey],
          status: hasAvailableSlots ? "available" : "unavailable",
          reason: hasAvailableSlots ? null : "Fully booked",
          schedules: newSchedules,
        };
      }

      setBookings(updatedBookings);

      // Reset state
      setShowConfirmation(false);
      setErrorMessage("");
      setSelectedTimeSlot(null);
      setSelectedDate(null);
      setAvailableSlots([]);

      if (typeof onNext === "function") {
        onNext();
      } else {
        console.error("onNext is not a function");
      }
    } catch (error) {
      console.error("Booking error:", error);
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

    // Find the selected time slot's schedule
    const selectedSlotDetails = selectedDate.availableTimeSlots?.find(
      (slot) => slot.timeSlot === selectedTimeSlot
    );

    if (!selectedSlotDetails || selectedSlotDetails.availableSlots <= 0) {
      setErrorMessage("This schedule is no longer available");
      return;
    }

    setShowConfirmation(true);
  }, [selectedDate, selectedTimeSlot]);

  const handleCancelSubmit = useCallback(() => {
    setShowConfirmation(false);
  }, []);

  const handlePrevMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.subtract(1, "month"));
  }, []);

  const handleNextMonth = useCallback(() => {
    setCurrentMonth((prev) => prev.add(1, "month"));
  }, []);

  const generateDaysInCalendar = useCallback(() => {
    const startOfMonth = currentMonth.startOf("month");
    const endOfMonth = currentMonth.endOf("month");
    const startOfCalendar = startOfMonth.startOf("week");
    const endOfCalendar = endOfMonth.endOf("week");

    const days = [];
    let currentDay = startOfCalendar;

    while (
      currentDay.isBefore(endOfCalendar) ||
      currentDay.isSame(endOfCalendar, "day")
    ) {
      days.push(currentDay);
      currentDay = currentDay.add(1, "day");
    }

    return days;
  }, [currentMonth]);

  // Auto-save booking state
  useEffect(() => {
    if (selectedDate && selectedTimeSlot) {
      localStorage.setItem(
        "currentBooking",
        JSON.stringify({
          date: selectedDate,
          timeSlot: selectedTimeSlot,
          lastUpdated: new Date().toISOString(),
        })
      );
    }
  }, [selectedDate, selectedTimeSlot]);

  // Recover from auto-save if needed
  useEffect(() => {
    const savedBooking = localStorage.getItem("currentBooking");
    if (savedBooking) {
      try {
        const { date, timeSlot, lastUpdated } = JSON.parse(savedBooking);
        const lastUpdateTime = new Date(lastUpdated);
        const now = new Date();
        const timeDiff = now - lastUpdateTime;

        // Only recover if the saved state is less than 30 minutes old
        if (timeDiff < 30 * 60 * 1000) {
          setSelectedDate(date);
          setSelectedTimeSlot(timeSlot);
        } else {
          localStorage.removeItem("currentBooking");
        }
      } catch (error) {
        console.error("Error recovering saved booking:", error);
        localStorage.removeItem("currentBooking");
      }
    }
  }, []);

  // Clear saved state after successful booking
  useEffect(() => {
    if (!showConfirmation && !selectedDate && !selectedTimeSlot) {
      localStorage.removeItem("currentBooking");
    }
  }, [showConfirmation, selectedDate, selectedTimeSlot]);

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
    isSameDay: (day1, day2) => day1.isSame(day2, "day"),
  };
};

export default useAppSchedule;
