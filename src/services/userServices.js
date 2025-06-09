import axios from "axios";

const API_BASE_URL = "https://appointment-system-backend-n8dk.onrender.com/api";
const API_URL = `${API_BASE_URL}/signup`; // For user management endpoints
const PROFILE_URL = `${API_BASE_URL}/profile`; // For profile management endpoints

// Upload profile picture
export const uploadProfilePicture = async (userId, imageFile, token) => {
  try {
    console.log("Uploading profile picture for user:", userId);
    const url = `${PROFILE_URL}/${userId}/profile-picture`;
    console.log("API URL:", url);

    const formData = new FormData();
    formData.append("profilePicture", imageFile);
    const response = await axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      timeout: 10000, // 10 second timeout
    });
    console.log("Upload response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Profile picture upload error:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
    });

    if (error.response?.status === 413) {
      throw {
        message:
          "Image file is too large. Please choose a smaller image (max 5MB).",
      };
    }

    if (error.response?.status === 415) {
      throw { message: "Invalid file type. Please upload an image file." };
    }

    if (error.response?.status === 401) {
      throw { message: "Authentication failed. Please sign in again." };
    }

    throw (
      error.response?.data || {
        message: "Failed to upload profile picture. Please try again.",
      }
    );
  }
};

// Get user profile including profile picture
export const getUserProfile = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
      timeout: 5000, // 5 second timeout
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to fetch user profile" };
  }
};

// Update user profile
export const updateUserProfile = async (userId, userData, token) => {
  try {
    const response = await axios.put(`${API_URL}/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 5000, // 5 second timeout
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: "Failed to update user profile" };
  }
};

// Delete profile picture
export const deleteProfilePicture = async (userId, token) => {
  try {
    const response = await axios.delete(
      `${PROFILE_URL}/${userId}/profile-picture`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        timeout: 5000, // 5 second timeout
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to delete profile picture" }
    );
  }
};
