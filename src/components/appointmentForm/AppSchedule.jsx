import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const AppSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);

  // Updated mock data for booked and available slots
  const appointmentData = {
    "2025-01-06": ["08:00 AM - 08:30 AM", "09:00 AM - 09:30 AM"], // Available
    "2025-01-07": ["08:00 AM - 08:30 AM", "09:00 AM - 09:30 AM"], // Available
    "2025-01-08": ["10:00 AM - 10:30 AM"], // Available
    "2025-01-09": [], // Fully booked
  };

  // Handle date click
  const handleDateClick = (info) => {
    const date = info.dateStr;
    setSelectedDate(date);
    setAvailableSlots(appointmentData[date] || []);
  };

  // Add class to available or fully booked dates
  const getDayClass = (date) => {
    // Convert date to YYYY-MM-DD format
    const dateString = date.toISOString().split("T")[0];

    // Check for fully booked dates first
    if (appointmentData[dateString]?.length === 0) {
      return "bg-red-500 text-white"; // Fully booked dates
    }

    // Check for available dates
    if (appointmentData[dateString]?.length > 0) {
      return "bg-green-500 text-white"; // Available dates
    }

    // Default styling for other dates
    return "";
  };

  return (
    <>
      <div className="h-full flex items-center justify-center bg-[#161f55]">
        {/* Background Overlay */}
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

        {/* Content Section */}
        <div className="flex flex-col justify-center text-center m-8">
          <h2 className="mx-auto relative inset-0 font-LatoBold text-[35px] text-Fwhite w-[450px] tracking-widest mt-6 mb-8">
            REGISTRAR APPOINTMENT
          </h2>
          <div className="relative mx-auto flex flex-col bg-white p-8 rounded-lg shadow-md w-[800px] max-w-[90%] text-center z-10">
            <p className="text-[#161f55] text-[2] font-LatoItalic mb-4">
              Please note that you will receive an email confirmation once your
              appointment has been scheduled.
            </p>
            <h3 className="text-[18px] tracking-wider font-LatoRegular text-[#000] mb-4">
              SELECT YOUR PREFERRED DATE AND TIME TO CLAIM YOUR DOCUMENT:
            </h3>

            {/* Calendar with logic */}
            <div
              style={{
                width: "100%",
                maxWidth: "700px",
                border: "2px solid #161f55",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                headerToolbar={{
                  start: "dayGridMonth,timeGridWeek",
                  center: "title",
                  end: "today prev,next",
                }}
                weekends={false}
                aspectRatio={1.2}
                dateClick={handleDateClick}
                views={{
                  timeGridWeek: {
                    slotMinTime: "08:00:00", // Start time at 8:00 AM
                    slotMaxTime: "18:00:00", // End time at 5:00 PM
                  },
                }}
                dayCellClassNames={({ date }) => getDayClass(date)}
              />
            </div>

            {/* Display Available Slots */}
            {selectedDate && (
              <div className="mt-6">
                <h4 className="text-lg font-bold text-[#161f55] mb-2">
                  Available Slots on {selectedDate}:
                </h4>
                {availableSlots.length > 0 ? (
                  <ul>
                    {availableSlots.map((slot, index) => (
                      <li key={index} className="text-sm text-gray-700">
                        {slot}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-sm text-gray-500">No slots available.</p>
                )}
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-4">
              <button
                className="px-4 py-2 bg-[#161f55] text-white rounded hover:bg-blue-700"
                onClick={(e) => e.preventDefault()}
              >
                Back
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-[#161f55] text-white rounded hover:bg-indigo-700"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AppSchedule;
