import axios from "axios";

const BASE_URL = `${import.meta.env.VITE_API_URL}/api/bookings`;

// Validate booking data
const validateBookingData = (data) => {
  if (!data.scheduleId) {
    throw new Error("Schedule ID is required");
  }
  if (!data.studentId) {
    throw new Error("Student ID is required");
  }
  if (!data.date) {
    throw new Error("Appointment date is required");
  }
  if (!data.timeSlot) {
    throw new Error("Time slot is required");
  }
};

export const createBooking = async (bookingData) => {
  try {
    validateBookingData(bookingData);

    // Transform the data to match backend expectations
    const requestData = {
      studentId: bookingData.studentId,
      scheduleId: bookingData.scheduleId,
      date: bookingData.date,
      timeSlot: bookingData.timeSlot,
      purpose: bookingData.purpose || "General Appointment",
    };

    console.log("Sending booking request to:", BASE_URL);
    console.log("Request data:", JSON.stringify(requestData, null, 2));

    const response = await axios.post(BASE_URL, requestData);

    if (!response.data) {
      throw new Error("No response data received");
    }

    console.log(
      "Booking successful! Response:",
      JSON.stringify(response.data, null, 2)
    );
    return response.data;
  } catch (error) {
    console.error("Booking error details:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config,
    });

    if (error.response?.status === 409) {
      throw new Error(
        "This slot is no longer available. Please choose another time slot."
      );
    } else if (error.response?.status === 404) {
      throw new Error("Booking service not found. Please try again later.");
    } else if (error.response?.status === 400) {
      // TEMPORARY FIX: If it's the duplicate check error, retry with a different approach
      if (
        error.response.data.message?.includes(
          "An appointment request already exists"
        )
      ) {
        console.log(
          "Duplicate check error detected - this should not happen with empty database"
        );
        console.log("Error details:", error.response.data);
        throw new Error(
          "Database synchronization issue. Please try again in a few moments or contact support."
        );
      }
      throw new Error(error.response.data.message || "Invalid booking data");
    } else if (!error.response) {
      throw new Error(
        "Unable to connect to the booking service. Please try again later."
      );
    }

    throw new Error(
      error.response?.data?.message || "Failed to create booking"
    );
  }
};
