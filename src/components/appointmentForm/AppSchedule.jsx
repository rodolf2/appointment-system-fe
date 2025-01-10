import React, { useState } from "react";
import dayjs from "dayjs";

const AppSchedule = ({ onNext, onBack }) => {
  const [currentMonth, setCurrentMonth] = useState(dayjs());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookings, setBookings] = useState({
    "2025-01-07": {
      status: "available",
      slots: ["9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", "2:00 PM"],
    },
    "2025-01-08": { status: "fully booked", slots: [] },
    "2025-01-09": {
      status: "available",
      slots: ["9:00 AM", "10:00 AM", "11:00 AM"],
    },
  });

  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const [showConfirmation, setShowConfirmation] = useState(false); // State for the confirmation dialog

  const startOfMonth = currentMonth.startOf("month");
  const endOfMonth = currentMonth.endOf("month");
  const startOfCalendar = startOfMonth.startOf("week");
  const endOfCalendar = endOfMonth.endOf("week");

  const daysInCalendar = [];
  let currentDay = startOfCalendar;

  while (currentDay.isBefore(endOfCalendar)) {
    daysInCalendar.push(currentDay);
    currentDay = currentDay.add(1, "day");
  }

  const isSameDay = (day1, day2) => day1.isSame(day2, "day");

  const handlePrevMonth = () => {
    setCurrentMonth(currentMonth.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentMonth(currentMonth.add(1, "month"));
  };

  const handleDateClick = (day) => {
    const formattedDate = day.format("YYYY-MM-DD");
    if (bookings[formattedDate]) {
      setSelectedDate({ date: formattedDate, ...bookings[formattedDate] });
      setSelectedTimeSlot(null); // Reset time slot when a new date is selected
    } else {
      setSelectedDate(null);
    }
    setErrorMessage(""); // Clear the error message
  };

  const handleTimeSlotClick = (slot) => {
    setSelectedTimeSlot(slot); // Update selected time slot
    setErrorMessage(""); // Clear the error message
  };

  const handleSubmit = () => {
    if (!selectedDate?.date || !selectedTimeSlot) {
      setErrorMessage(
        "Please select both a date and a time slot before submitting."
      );
    } else {
      setErrorMessage(""); // Clear error message if both are selected
      setShowConfirmation(true); // Show the confirmation modal
    }
  };

  const handleConfirmSubmit = () => {
    // Proceed with the submission process
    setShowConfirmation(false);
    onNext(); // Proceed to next step
  };

  const handleCancelSubmit = () => {
    setShowConfirmation(false); // Close the confirmation dialog without submitting
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#161f55] relative">
      {/* Background Layers */}
      <div className="absolute inset-0 flex flex-col">
        <div
          className="h-1/2 bg-cover bg-bottom"
          style={{
            backgroundImage:
              "url('/public/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
            opacity: "0.3",
            backgroundAttachment: "fixed",
          }}
        ></div>
        <div className="h-1/2 bg-[#161f55]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex flex-col justify-center items-center m-8">
        {/* Title */}
        <h1 className="font-LatoBold text-[35px] text-white tracking-widest mt-6 mb-4">
          REGISTRAR APPOINTMENT
        </h1>
        <div className="bg-white rounded-lg shadow-lg p-8 w-[32rem]">
          <p className="text-sm text-center font-LatoItalic text-[#161F55] mb-6">
            Please note that you will receive an email confirmation once your
            appointment has been scheduled.
          </p>
          <p className="text-center font-LatoRegular text-[#000] mb-6">
            SELECT YOUR PREFERRED DATE AND TIME TO CLAIM YOUR DOCUMENT:
          </p>

          {/* Calendar */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-[#161f55]">
                {currentMonth.format("MMMM YYYY")}
              </h2>
              <div className="flex space-x-2">
                <button
                  onClick={handlePrevMonth}
                  className="bg-[#161f55] text-white px-2 text-[20px] font-LatoBold rounded"
                >
                  &lt;
                </button>
                <button
                  onClick={handleNextMonth}
                  className="bg-[#161f55] text-[20px] text-white px-2 font-LatoBold rounded"
                >
                  &gt;
                </button>
              </div>
            </div>
            <div className="grid grid-cols-7 text-center border-b border-gray-300 mb-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-[#161f55] font-bold">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 text-center">
              {daysInCalendar.map((day) => {
                const formattedDate = day.format("YYYY-MM-DD");
                const booking = bookings[formattedDate];

                return (
                  <div
                    key={formattedDate}
                    className={`p-2 border cursor-pointer ${
                      day.isSame(currentMonth, "month")
                        ? "text-black"
                        : "text-gray-400"
                    } ${
                      booking
                        ? booking.status === "available"
                          ? "bg-[#3A993D] hover:bg-green-300 rounded"
                          : "bg-[#D52121] hover:bg-red-300 rounded"
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

          {/* Buttons */}
          <div className="flex justify-between mt-6">
            <button
              onClick={onBack}
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
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h2 className="text-lg font-bold text-[#161f55] mb-4">
                Are you sure you want to submit now?
              </h2>
              <div className="flex justify-between">
                <button
                  onClick={handleCancelSubmit}
                  className="bg-[#161F55]  hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  No
                </button>
                <button
                  onClick={handleConfirmSubmit}
                  className="bg-[#161F55] hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Yes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AppSchedule;
