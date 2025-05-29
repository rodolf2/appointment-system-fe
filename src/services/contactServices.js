// import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";


export const submitContactForm = async (formData) => {
  try {
    const response = await fetch(`${API_URL}/api/attachments/upload`, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { error: "Something went wrong" };
  }
};

