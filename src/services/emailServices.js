import axios from "axios";

const API_URL = "https://appointment-system-backend-n8dk.onrender.com/api"; // Updated to production backend URL

export const emailService = {
  // Signup function
  signup: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data;
    } catch (error) {
      console.error("Signup error:", error.response || error);
      throw (
        error.response?.data || { message: "An error occurred during signup" }
      );
    }
  },

  // Signin function
  signin: async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/signin`, credentials);
      return response.data;
    } catch (error) {
      console.error("Signin error:", error.response || error);
      throw error.response?.data || { message: "Invalid email or password" };
    }
  },

  // Verify OTP function
  verifyOtp: async (email, otp) => {
    try {
      const response = await axios.post(`${API_URL}/verify-otp`, {
        email,
        otp,
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Invalid OTP" };
    }
  },

  // Get all users (admin only)
  getAllUsers: async (token) => {
    try {
      const response = await axios.get(`${API_URL}/signup`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Error fetching users" };
    }
  },

  // Get user by ID
  getUserById: async (id, token) => {
    try {
      const response = await axios.get(`${API_URL}/signup/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Error fetching user" };
    }
  },

  // Update user
  updateUser: async (id, userData, token) => {
    try {
      console.log("Updating user with ID:", id);
      console.log("Update data:", userData);
      console.log("Token present:", !!token);
      console.log("API URL being called:", `${API_URL}/signup/${id}`);

      if (!id) {
        throw new Error("User ID is required for update");
      }

      if (!token) {
        throw new Error("Authentication token is required");
      }

      try {
        const response = await axios.put(`${API_URL}/signup/${id}`, userData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        console.log("Update response:", response.data);
        return response.data;
      } catch (axiosError) {
        // Log the full error details
        console.error("Axios error details:", {
          message: axiosError.message,
          status: axiosError.response?.status,
          statusText: axiosError.response?.statusText,
          data: axiosError.response?.data,
          config: {
            url: axiosError.config?.url,
            method: axiosError.config?.method,
            headers: axiosError.config?.headers,
          },
        });

        if (axiosError.code === "ECONNREFUSED") {
          throw new Error(
            "Cannot connect to the server. Please make sure the backend server is running."
          );
        }

        if (!axiosError.response) {
          throw new Error(
            "Network error. Please check your internet connection."
          );
        }

        if (axiosError.response.status === 401) {
          throw new Error("Your session has expired. Please sign in again.");
        }

        if (axiosError.response.status === 403) {
          throw new Error("You do not have permission to update this profile.");
        }

        if (axiosError.response.status === 404) {
          throw new Error("User profile not found. Please sign in again.");
        }

        if (axiosError.response.status === 500) {
          throw new Error("Server error. Please try again later.");
        }

        throw (
          axiosError.response?.data || {
            message: "Error updating user profile",
          }
        );
      }
    } catch (error) {
      console.error("Update user error:", error);
      throw error;
    }
  },

  // Delete user
  deleteUser: async (id, token) => {
    try {
      const response = await axios.delete(`${API_URL}/signup/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Error deleting user" };
    }
  },
};

export default emailService;
