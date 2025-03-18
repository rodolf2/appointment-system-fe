import { useState } from "react";
import dayjs from "dayjs"; // Import Day.js for date manipulation
import CustomProgressBar from "@/features/appointment/CustomProgressBar";

const AppSchedule = ({ onNext, onBack, currentStep }) => {
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

  return (
    <>
      <div className="{ `bg-Primary h-screen relative}">
        {/* fixed background */}
        <div className=" fixed inset-0 w-full h-full ">
          <div
            className="h-1/2 bg-cover bg-bottom relative"
            style={{
              backgroundImage:
                "url('/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
              backgroundAttachment: "fixed",
            }}
          >
            <div className="absolute inset-0 bg-Primary opacity-70"></div>
          </div>
          <div className="h-1/2 bg-[#161f55]"></div>
        </div>

        {/* Main Content */}
        <div className="relative flex flex-col justify-center text-center">
          {/* Title */}
          <h1 className="font-LatoBold text-[35px] text-Fwhite tracking-widest py-8">
            REGISTRAR APPOINTMENT
          </h1>
          <div className="relative mx-auto bg-white p-5 rounded-lg shadow-md w-full max-w-[50%] text-center ">
            {/* Progress Bar */}
            <div className="w-full max-w-[50%] place-self-center mt-4">
              <CustomProgressBar currentStep={currentStep} />
            </div>
            {/* Instructional Text */}
            <p className="text-[16px] w-[400px] mx-auto  font-LatoItalic text-[#161F55] mt-16 mb-8">
              Please note that you will receive an email confirmation once your
              appointment has been scheduled.
            </p>

            <p className="text-center font-LatoRegular text-[#000] mb-6 w-[500px] mx-auto">
              SELECT YOUR PREFERRED DATE AND TIME TO CLAIM YOUR DOCUMENT:
            </p>
            {/* Calendar */}
            <div>
              {/* Month Navigation */}
              <div className="flex justify-start px-8 gap-4 mb-4">
                <h2 className="text-lg font-bold text-[#161f55]">
                  {currentMonth.format("MMMM YYYY")}
                </h2>
                <div className="flex space-x-2">
                  {/* Previous Month */}
                  <button
                    onClick={handlePrevMonth}
                    className="bg-[#161f55] text-white px-2 text-[20px] font-LatoBold rounded"
                  >
                    &lt;
                  </button>
                  {/* Next Month */}
                  <button
                    onClick={handleNextMonth}
                    className="bg-[#161f55] text-[20px] text-white px-2 font-LatoBold rounded"
                  >
                    &gt;
                  </button>
                </div>
              </div>
              {/* Weekdays Header */}
              <div className="grid grid-cols-7 text-center  mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div key={day} className="text-[#161f55] font-bold">
                      {day}
                    </div>
                  )
                )}
              </div>
              {/* Calendar Days */}
              <div className="grid grid-cols-7 text-center">
                {daysInCalendar.map((day) => {
                  const formattedDate = day.format("YYYY-MM-DD");
                  const booking = bookings[formattedDate];

                  return (
                    <div
                      key={formattedDate}
                      className={`p-2 border cursor-pointer ${
                        day.isSame(currentMonth, "month")
                          ? "text-[#161f55] font-LatoSemiBold"
                          : "text-gray-400"
                      } ${
                        booking
                          ? booking.status === "available"
                            ? "bg-[#3A993D] hover:bg-green-300 focus:bg-green-300 rounded"
                            : "bg-[#D52121] hover:bg-red-300 rounded focus:bg-red-300 "
                          : ""
                      } ${
                        isSameDay(day, dayjs())
                          ? "bg-[#161f55] text-white rounded"
                          : ""
                      }`}
                      onClick={() => handleDateClick(day)}
                    >
                      {day.date()}
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Time Slots */}
            <div className="mt-6 min-h-[100px] transition-all duration-300">
              {selectedDate ? (
                <>
                  {/* Selected Date and Slots */}
                  <h3 className="text-lg font-bold text-[#161f55]">
                    {dayjs(selectedDate.date).format("MMMM D, YYYY")}
                  </h3>
                  <p
                    className={`mt-2 font-bold ${
                      selectedDate.status === "available"
                        ? "text-green-500"
                        : "text-red-500"
                    }`}
                  >
                    {selectedDate.status === "available"
                      ? "Available Slots"
                      : "Fully Booked"}
                  </p>
                  {selectedDate.status === "available" ? (
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      {selectedDate.slots.map((slot) => (
                        <button
                          key={slot}
                          className={`px-2 py-1 rounded ${
                            selectedTimeSlot === slot
                              ? "bg-[#161f55] text-white"
                              : "bg-gray-200 text-black hover:bg-gray-300"
                          }`}
                          onClick={() => handleTimeSlotClick(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </>
              ) : (
                <p className="text-gray-500 text-center">
                  Select a date to see available slots.
                </p>
              )}
              {/* Error Message */}
              {errorMessage && (
                <p className="text-red-500 text-center mt-4">{errorMessage}</p>
              )}
            </div>
            {/* Navigation Buttons */}
            <div className=" flex justify-end gap-2 mt-6">
              <button
                onClick={() => onBack(3)} // Go back to step 3
                className="bg-[#161f55] hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                className={`px-4 py-2 rounded-md ${
                  selectedTimeSlot
                    ? "bg-[#161f55] hover:bg-blue-700 text-[#fff]"
                    : "bg-[#161f55] hover:bg-blue-700 text-[#fff]"
                }`}
              >
                Submit
              </button>
            </div>
          </div>
          {/* Confirmation Modal */}
          {showConfirmation && (
            <div className="fixed inset-0 bg-[#D2D2D2] bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-50 flex  justify-center flex-col">
                <h2 className="text-lg  text-[#161f55] mb-10 text-center">
                  Are you sure you want to submit now?
                </h2>
                <div className="flex justify-end gap-2 mt-4 ">
                  {/* Cancel Submission */}
                  <button
                    onClick={handleCancelSubmit}
                    className="bg-[#C9C9C9]  hover:bg-gray-400 text-[#161F55] px-10 py-1 rounded-lg"
                  >
                    No
                  </button>
                  {/* Confirm Submission */}
                  <button
                    onClick={handleConfirmSubmit}
                    className="bg-[#161F55] hover:bg-blue-700 text-white px-10 py-1 rounded-lg"
                  >
                    Yes
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AppSchedule;
