import axios from "axios";

const API_URL =
  "https://appointment-system-backend-n8dk.onrender.com/api/users";

// Upload profile picture
export const uploadProfilePicture = async (userId, imageFile, token) => {
  try {
    const formData = new FormData();
    formData.append("profilePicture", imageFile);

    const response = await axios.post(
      `${API_URL}/${userId}/profile-picture`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to upload profile picture" }
    );
  }
};

// Get user profile including profile picture
export const getUserProfile = async (userId, token) => {
  try {
    const response = await axios.get(`${API_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
      },
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
      `${API_URL}/${userId}/profile-picture`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw (
      error.response?.data || { message: "Failed to delete profile picture" }
    );
  }
};
