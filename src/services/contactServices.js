// import axios from "axios";

const API_URL = "https://appointment-system-backend-n8dk.onrender.com";


export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/attachment/upload`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Something went wrong" };
  }
};

