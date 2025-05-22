import axios from "axios";

const BASE_URL = "http://localhost:5000/api/bookings";

// Validate booking data
const validateBookingData = (data) => {
  if (!data.scheduleId) {
    throw new Error('Schedule ID is required');
  }
  if (!data.studentId) {
    throw new Error('Student ID is required');
  }
};

export const createBooking = async (bookingData) => {
  try {
    validateBookingData(bookingData);

    // Transform the data to match backend expectations
    const requestData = {
      studentId: bookingData.studentId,
      scheduleId: bookingData.scheduleId,
      purpose: bookingData.purpose || "General Appointment"
    };

    console.log('Sending booking request to:', BASE_URL);
    console.log('Request data:', JSON.stringify(requestData, null, 2));
    
    const response = await axios.post(BASE_URL, requestData);
    
    if (!response.data) {
      throw new Error('No response data received');
    }

    console.log('Booking successful! Response:', JSON.stringify(response.data, null, 2));
    return response.data;  } catch (error) {
    console.error('Booking error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url,
      method: error.config?.method,
      data: error.config?.data
    });
    
    // Specific error handling
    if (error.response) {
      // Server responded with an error status
      switch (error.response.status) {
        case 404:
          throw new Error('Booking endpoint not found. Please verify the API route.');
        case 400:
          throw new Error(error.response.data.message || 'Invalid booking data');
        case 401:
          throw new Error('Unauthorized. Please check your authentication.');
        case 500:
          throw new Error('Internal server error. Please try again later.');
        default:
          throw new Error(`Server error: ${error.response.data.message || 'Unknown error'}`);
      }
    } else if (error.request) {
      // Request was made but no response received
      throw new Error('Unable to connect to the booking service. Please check if the server is running.');
    } else {
      // Error in request setup
      throw new Error(`Request failed: ${error.message}`);
    }
  }
};