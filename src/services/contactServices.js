import axios from "axios";

const API_URL = "https://appointment-system-backend-n8dk.onrender.com";

export const submitContactForm = async (formData) => {
  try {
    console.log("Submitting contact form with data:", formData);
    const response = await axios.post(`${API_URL}/api/contact`, formData, {
      withCredentials: false, // Changed this to false since we don't need credentials
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    console.log("Contact form submission successful:", response.data);
    return response.data;
  } catch (error) {
    console.error("Contact form submission error:", error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("Response data:", error.response.data);
      console.error("Response status:", error.response.status);
      console.error("Response headers:", error.response.headers);
      throw error.response.data;
    } else if (error.request) {
      // The request was made but no response was received
      console.error("No response received:", error.request);
      throw { error: "No response from server" };
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error setting up request:", error.message);
      throw { error: "Error setting up request" };
    }
  }
};
