import axios from "axios";

const API_URL = "http://localhost:5000/api"; // Adjust this to match your backend URL

export const emailService = {
  // Signup function
  signup: async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/signup`, userData);
      return response.data;
    } catch (error) {
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
      return response.data;w
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
      const response = await axios.put(`${API_URL}/signup/${id}`, userData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data || { message: "Error updating user" };
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
