import React from 'react';
import CustomProgressBar from "@/features/appointment/CustomProgressBar";
import useAppSchedule from "./hooks/useAppSchedule";
import dayjs from "dayjs";
import PropTypes from "prop-types";

const AppSchedule = ({ onNext, onBack, currentStep }) => {
  const {
    currentMonth,
    selectedDate,
    selectedTimeSlot,
    bookings,
    errorMessage,
    showConfirmation,
    loading,
    availableSlots,
    daysInCalendar,
    handleDateClick,
    handleTimeSlotClick,
    handleSubmit,
    handleConfirmSubmit,
    handleCancelSubmit,
    handlePrevMonth,
    handleNextMonth,
    isSameDay
  } = useAppSchedule(onNext);

  return (
    <div className="bg-Primary h-screen relative">
      <div className="fixed inset-0 w-full h-full">
        <div
          className="h-1/2 bg-cover bg-bottom relative"
          style={{
            backgroundImage: "url('/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
            backgroundAttachment: "fixed",
          }}
        >
          <div className="absolute inset-0 bg-Primary opacity-70"></div>
        </div>
        <div className="h-1/2 bg-[#161f55]"></div>
      </div>

      <div className="relative flex flex-col justify-center text-center">
        <h1 className="font-LatoBold text-[35px] text-Fwhite tracking-widest py-4">
          REGISTRAR APPOINTMENT
        </h1>
        <div className="relative mx-auto bg-white p-5 rounded-lg shadow-md w-full max-w-[40%] text-center">
          <div className="w-full max-w-[50%] place-self-center mt-4">
            <CustomProgressBar currentStep={currentStep} />
          </div>

          <p className="text-[16px] w-[400px] mx-auto font-LatoItalic text-[#161F55] mt-16 mb-8">
            Please note that you will receive an email confirmation once your
            appointment has been scheduled.
          </p>

          <p className="text-center font-LatoRegular text-[#000] mb-6 w-[500px] mx-auto">
            SELECT YOUR PREFERRED DATE AND TIME TO CLAIM YOUR DOCUMENT:
          </p>

          <div className="w-full flex justify-center px-2">
            <div className="w-full max-w-[550px]">
              <div className="flex justify-between items-center mb-4 px-4">
                <h2 className="text-lg font-bold text-[#161f55]">
                  {currentMonth.format("MMMM YYYY")}
                </h2>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevMonth}
                    className="text-white font-bold text-xl bg-[#161F55] h-8 w-8 rounded-md"
                  >
                    &lt;
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="text-white font-bold text-xl bg-[#161F55] h-8 w-8 rounded-md"
                  >
                    &gt;
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 text-center mb-2 gap-0 border-b-2 border-gray-300 pb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-[#161f55] font-bold text-md">
                    {day}
                  </div>
                ))}
              </div>

              {loading ? (
                <div className="text-center py-4">Loading calendar...</div>
              ) : (
                <div className="grid grid-cols-7 text-center gap-0">
                  {daysInCalendar.map((day) => {
                    const formattedDate = day.format("YYYY-MM-DD");
                    const booking = bookings[formattedDate];
                    const isCurrentMonth = day.isSame(currentMonth, "month");
                    const isToday = isSameDay(day, dayjs());

                    return (
                      <div
                        key={formattedDate}                        className={`p-2 sm:p-3 text-xs sm:text-lg cursor-pointer border border-gray-300 transition-all duration-200 flex flex-col justify-center items-center
                          ${isCurrentMonth ? "text-black" : "text-gray-400"}
                          ${isToday ? "text-white bg-[#161f55] border-2 border-[#161f55] rounded" : ""}                          ${booking?.status === "available" 
                            ? "bg-[#3A993D] hover:bg-[#86EFAC] hover:text-white space-y-0.5"
                            : booking?.status === "unavailable" && booking?.reason === "Fully booked"
                              ? "bg-[#D52121] hover:bg-[#FCA5A5] hover:text-white"
                              : "hover:bg-gray-200"}`}                        onClick={() => handleDateClick(day)}                      >
                        <span>{day.date()}</span>
                        {booking?.status === "available" ? (
                          <span className="text-xs font-semibold text-white">
                            {booking.schedule.availableSlots} slot{booking.schedule.availableSlots !== 1 ? 's' : ''}
                          </span>
                        ) : booking?.status === "unavailable" && booking?.reason === "Fully booked" ? (
                          <span className="text-xs font-semibold text-white">Full</span>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 min-h-[100px] transition-all duration-300 max-w-[530px] mx-auto">
            {loading ? (
              <div className="text-center py-4">Loading available slots...</div>
            ) : selectedDate ? (
              <>
                <h3 className="text-lg font-bold text-[#161f55] text-start">
                  {dayjs(selectedDate.date).format("MMMM D, YYYY")}
                </h3>
                {availableSlots.length > 0 ? (
                  <>
                    <p className="mt-1 font-bold text-start text-[#3A993D] text-md py-2">
                      Available Slots ({selectedDate.schedule.availableSlots} remaining)
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {availableSlots.map((slot, index) => (
                        <button
                          key={index}
                          className={`px-2 py-1 rounded text-md 
                            ${selectedTimeSlot === slot 
                              ? "bg-[#161f55] text-white"
                              : "bg-gray-300 hover:bg-gray-400"}`}
                          onClick={() => handleTimeSlotClick(slot)}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-500">No available slots for this date</p>
                )}
              </>
            ) : (
              <p className="text-gray-500 text-center text-sm">
                Select a date to see available slots.
              </p>
            )}
            {errorMessage && (
              <p className="text-red-500 text-center mt-2 text-sm">{errorMessage}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              onClick={() => onBack(2)}
              className="bg-[#161f55] text-white border border-[#161f55] px-6 py-2 rounded text-sm hover:bg-blue-700"
            >
              Back
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedTimeSlot}
              className={`px-6 py-2 rounded text-sm ${
                selectedTimeSlot
                  ? "bg-[#161f55] hover:bg-blue-700 text-white"
                  : "bg-gray-300 text-white cursor-not-allowed"
              }`}
            >
              Submit
            </button>
          </div>
        </div>       
         {/* Confirmation Modal */}
          {showConfirmation && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="bg-white p-4 rounded-lg shadow-lg w-80">
                <p className="text-md font-LatoRegular text-[#000] py-2 text-center">
                  Are you sure you want to submit now?
                </p>
                <div className="flex justify-end space-x-4 mt-4">
                  <button
                    onClick={handleConfirmSubmit}
                    className=" text-[#161f55] px-4 py-1 rounded text-md"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleCancelSubmit}
                    className=" text-gray-800 px-4 py-1 rounded text-md"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
};

AppSchedule.propTypes = {
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  currentStep: PropTypes.number.isRequired,
};

export default AppSchedule;