import axios from "axios";

const BASE_URL = "/api/bookings";

export const createBooking = async (bookingData) => {
  try {
    // Ensure the user has the required fields
    if (!bookingData.studentInfo) {
      throw new Error('Student information is required');
    }

    const response = await axios.post(BASE_URL, {
      ...bookingData,
      status: 'PENDING', // Initial status for new bookings
      dateOfRequest: new Date().toISOString()
    });
    return response.data;
  } catch (error) {
    console.error('Booking error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    
    if (error.response?.status === 404) {
      throw new Error('Unable to reach booking service');
    }
    
    throw new Error(error.response?.data?.message || 'Failed to create booking');
  }
};