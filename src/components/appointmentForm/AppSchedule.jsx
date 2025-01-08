// import React, { useState } from "react";
// import FullCalendar from "@fullcalendar/react";
// import dayGridPlugin from "@fullcalendar/daygrid";
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// const AppSchedule = ({ onNext, onBack }) => {
//   const [selectedDate, setSelectedDate] = useState();
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // Mock data for appointment slots
//   const [appointmentData, setAppointmentData] = useState({
//     "2025-01-07": ["08:00 AM - 08:30 AM", "09:00 AM - 09:30 AM"], // Available
//     "2025-01-08": ["10:00 AM - 10:30 AM"], // Available
//     "2025-01-09": ["10:00 AM - 10:30 AM"], // Fully booked
//     "2025-01-10": ["10:00 AM - 10:30 AM"], // Fully booked
//     "2025-01-13": [], // Fully booked
//   });

//   // Handle date click
//   const handleDateClick = (info) => {
//     const date = info.dateStr;
//     setSelectedDate(date);
//     setAvailableSlots(appointmentData[date] || []);
//   };

//   // Handle slot selection
//   const handleSlotSelection = (slot) => {
//     // Update the available slots for the selected date
//     const updatedSlots = availableSlots.filter((s) => s !== slot);

//     setAvailableSlots(updatedSlots);

//     // Update the main appointment data state
//     setAppointmentData((prevData) => ({
//       ...prevData,
//       [selectedDate]: updatedSlots,
//     }));
//   };

//   // Add class to available or fully booked dates
//   const getDayClass = (date) => {
//     const dateString = date.toISOString().split("T")[0];

//     // Check if the date exists in the appointment data
//     if (appointmentData[dateString]) {
//       const slots = appointmentData[dateString];

//       // Fully booked dates
//       if (0 >= slots.length) {
//         return "bg-red-500 text-white"; // Fully booked
//       }

//       // Available dates
//       if (slots.length) {
//         return "bg-green-500 text-white"; // Available
//       }
//     }

//     // Default styling for dates not in appointmentData
//     return "bg-gray-200"; // Neutral
//   };

//   return (
//     <>
//       <div className="h-full flex items-center justify-center bg-[#161f55]">
//         {/* Background Overlay */}
//         <div className="absolute inset-0 flex flex-col">
//           <div
//             className="h-1/2 bg-cover bg-bottom"
//             style={{
//               backgroundImage:
//                 "url('/public/assets/image/la_verdad_christian_school_apalit_pampanga_cover.jpeg')",
//               opacity: "0.3",
//               backgroundAttachment: "fixed",
//             }}
//           ></div>
//           <div className="h-1/2 bg-[#161f55]"></div>
//         </div>

//         {/* Content Section */}
//         <div className="flex flex-col justify-center text-center m-8">
//           <h2 className="mx-auto relative inset-0 font-LatoBold text-[35px] text-Fwhite w-[450px] tracking-widest mt-6 mb-8">
//             REGISTRAR APPOINTMENT
//           </h2>
//           <div className="relative mx-auto flex flex-col bg-white p-8 rounded-lg shadow-md w-[800px] max-w-[90%] text-center z-10">
//             <p className="text-[#161f55] text-[2] font-LatoItalic mb-4">
//               Please note that you will receive an email confirmation once your
//               appointment has been scheduled.
//             </p>
//             <h3 className="text-[18px] tracking-wider font-LatoRegular text-[#000] mb-4">
//               SELECT YOUR PREFERRED DATE AND TIME TO CLAIM YOUR DOCUMENT:
//             </h3>

//             {/* Calendar */}
//             <div
//               style={{
//                 width: "100%",
//                 maxWidth: "700px",
//                 border: "2px solid #161f55",
//                 borderRadius: "8px",
//                 padding: "10px",
//               }}
//             >
//               <FullCalendar
//                 plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
//                 initialView="dayGridMonth"
//                 headerToolbar={{
//                   start: "dayGridMonth",
//                   center: "title",
//                   end: "today prev,next",
//                 }}
//                 weekends={false}
//                 aspectRatio={1.2}
//                 dateClick={handleDateClick}
//                 dayCellClassNames={({ date }) => getDayClass(date)} // Apply classes dynamically
//               />
//             </div>

//             {/* Display Available Slots */}
//             {selectedDate && (
//               <div className="mt-6">
//                 <h4 className="text-lg font-bold text-[#161f55] mb-2">
//                   Available Slots on {selectedDate}:
//                 </h4>
//                 {availableSlots.length > 0 ? (
//                   <ul>
//                     {availableSlots.map((slot, index) => (
//                       <li
//                         key={index}
//                         className="flex justify-between items-center mb-2"
//                       >
//                         <span className="text-sm text-gray-700">{slot}</span>
//                         <button
//                           className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-700"
//                           onClick={() => handleSlotSelection(slot)}
//                         >
//                           Select
//                         </button>
//                       </li>
//                     ))}
//                   </ul>
//                 ) : (
//                   <p className="text-sm text-gray-500">No slots available.</p>
//                 )}
//               </div>
//             )}

//             {/* Buttons */}
//             <div className="flex justify-between mt-4">
//               <button
//                 className="px-4 py-2 bg-[#161f55] text-white rounded hover:bg-blue-700"
//                 onClick={onBack}
//               >
//                 Back
//               </button>
//               <button
//                 type="button"
//                 className="px-4 py-2 bg-[#161f55] text-white rounded hover:bg-indigo-700"
//                 onClick={() => setIsModalOpen(true)}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-20">
//           <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[400px]">
//             <h3 className="text-lg font-bold mb-4">Confirm Submission</h3>
//             <p className="text-gray-600 mb-6">
//               Are you sure you want to submit your appointment?
//             </p>
//             <div className="flex justify-between">
//               <button
//                 className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 No
//               </button>
//               <button
//                 className="px-4 py-2 bg-[#161f55] text-white rounded hover:bg-indigo-700"
//                 onClick={() => {
//                   setIsModalOpen(false);
//                   onNext();
//                 }}
//               >
//                 Yes
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// export default AppSchedule;
import React, { useState } from "react";
import { Calendar } from "../ui/calendar";

const AppSchedule = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  const availableDates = [
    "2025-02-04",
    "2025-02-05",
    "2025-02-06",
    "2025-02-07",
  ];
  const fullyBookedDates = ["2025-02-08"];

  const isAvailable = (dateString) => availableDates.includes(dateString);
  const isFullyBooked = (dateString) => fullyBookedDates.includes(dateString);

  return (
    <div className="flex flex-col items-center bg-gray-100 py-8 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6 w-11/12 max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">
          Registrar Appointment
        </h1>
        <p className="text-center text-gray-600 mb-6">
          Select your preferred date and time to claim your document:
        </p>
        <Calendar
          className="border rounded-md"
          value={selectedDate}
          onChange={setSelectedDate}
          renderDay={(date) => {
            const dateString = date.toISOString().split("T")[0];
            const isSelected =
              dateString === selectedDate?.toISOString().split("T")[0];
            const isAvailable = availableDates.includes(dateString);
            const isFullyBooked = fullyBookedDates.includes(dateString);

            let className = "p-2 text-center rounded-full ";
            if (isSelected) {
              className +=
                "bg-green-500 text-white font-bold border-2 border-green-700";
            } else if (isAvailable) {
              className += "bg-green-100 text-green-800";
            } else if (isFullyBooked) {
              className += "bg-red-100 text-red-800";
            }

            return (
              <div
                className={className}
                onClick={() => setSelectedDate(date)}
                role="button"
                aria-label={dateString}
              >
                {date.getDate()}
              </div>
            );
          }}
        />

        <div className="mt-6">
          <h2 className="text-lg font-medium mb-2">Available Time Slots</h2>
          <div className="flex justify-between">
            <span>Morning</span>
            <span className="text-gray-600">7:00 AM - 8:00 AM</span>
            <span className="text-green-600">15 slots</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Afternoon</span>
            <span className="text-gray-600">9:00 AM - 10:00 AM</span>
            <span className="text-green-600">20 slots</span>
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <button className="bg-gray-200 text-gray-600 py-2 px-4 rounded-md">
            Back
          </button>
          <button
            className="bg-blue-600 text-white py-2 px-4 rounded-md"
            onClick={() =>
              alert(`You selected: ${selectedDate?.toDateString()}`)
            }
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppSchedule;
