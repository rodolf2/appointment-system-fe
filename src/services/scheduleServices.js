import axios from "axios";

const BASE_URL = "http://localhost:5000/api/schedules";

// Validate schedule data
const validateScheduleData = (data) => {
  if (!data.slots || isNaN(Number(data.slots)) || Number(data.slots) <= 0) {
    throw new Error("Invalid slots value");
  }
  if (!data.date) {
    throw new Error("Date is required");
  }
  if (!data.startTime) {
    throw new Error("Start time is required");
  }
  if (!data.endTime) {
    throw new Error("End time is required");
  }
};

// Format schedule data for API
const formatScheduleData = (data) => {
  return {
    slots: Number(data.slots),
    date: new Date(data.date).toISOString(),
    startTime: data.startTime,
    endTime: data.endTime
  };
};

// Handle API errors
const handleApiError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    throw new Error(error.response.data.message || 'Server error');
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error('No response from server');
  } else {
    // Something happened in setting up the request
    throw new Error(error.message || 'Request failed');
  }
};

// // Get all schedules
// export const getAllSchedules = async () => {
//   try {
//     const response = await axios.get(BASE_URL);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//   }
// };
export const getAllSchedules = async () => {
  try {
    console.log('Fetching schedules from:', BASE_URL);
    const response = await axios.get(BASE_URL);
    console.log('Schedule response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error details:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch schedules');
  }
};

export const getAvailableSlots = async (date) => {
  try {
    const url = `${BASE_URL}/available/${date}`;
    console.log('Fetching slots from:', url);
    const response = await axios.get(url);
    console.log('Slots response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error details:', error.response || error);
    throw new Error(error.response?.data?.message || 'Failed to fetch available slots');
  }
};

export const bookAppointment = async (appointmentData) => {
  try {
    const response = await axios.post(`${BASE_URL}/book`, appointmentData);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to book appointment');
  }
};

// Create a new schedule
export const createSchedule = async (scheduleData) => {
  try {
    validateScheduleData(scheduleData);
    const formattedData = formatScheduleData(scheduleData);
    const response = await axios.post(BASE_URL, formattedData);
    return response.data;
  } catch (error) {
    if (error.message) {
      throw error;
    }
    handleApiError(error);
  }
};

// Update a schedule
export const updateSchedule = async (id, scheduleData) => {
  try {
    if (!id) {
      throw new Error("Schedule ID is required");
    }
    validateScheduleData(scheduleData);
    const formattedData = formatScheduleData(scheduleData);
    const response = await axios.put(`${BASE_URL}/${id}`, formattedData);
    return response.data;
  } catch (error) {
    if (error.message) {
      throw error;
    }
    handleApiError(error);
  }
};

// Delete a schedule
export const deleteSchedule = async (id) => {
  try {
    if (!id) {
      throw new Error("Schedule ID is required");
    }
    const response = await axios.delete(`${BASE_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
