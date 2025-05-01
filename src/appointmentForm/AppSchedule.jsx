import CustomProgressBar from "@/features/appointment/CustomProgressBar";
import useAppSchedule from "./hooks/useAppSchedule";
import dayjs from "dayjs"; // Import Day.js for date manipulation

const AppSchedule = ({ onNext, onBack, currentStep }) => {
  const {
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
  } = useAppSchedule(onNext);

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
            <div className="fixed inset-0 bg-[#161F55] bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 h-50 flex  justify-center flex-col">
                <p className="text-lg font-LatoRegular text-[#000] my-auto py-6 text-center">
                  Are you sure you want to submit now?
                </p>
                <div className=" flex justify-end space-x-4 mt-6 ">
                  {/* Confirm Submission */}
                  <button
                    onClick={handleConfirmSubmit}
                    className=" font-LatoBold text-[#161F55]  py-1 "
                  >
                    Yes
                  </button>
                  {/* Cancel Submission */}
                  <button
                    onClick={handleCancelSubmit}
                    className=" text-[#000]py-1 font-LatoRegular"
                  >
                    Cancel
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
