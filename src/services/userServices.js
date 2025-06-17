import axios from "axios";

const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;
const PROFILE_URL = `${API_BASE_URL}/profile`; // For profile management endpoints

// Create axios instance with default configuration
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000, // 15 seconds default timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Add request interceptor for debugging
apiClient.interceptors.request.use(
  (config) => {
    console.log(`🔄 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging and error handling
apiClient.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response interceptor error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      message: error.message,
      code: error.code,
    });
    return Promise.reject(error);
  }
);

// Retry utility function
const retryRequest = async (requestFn, maxRetries = 2, delay = 1000) => {
  for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
    try {
      return await requestFn();
    } catch (error) {
      console.warn(`Attempt ${attempt} failed:`, error.message);

      if (attempt === maxRetries + 1) {
        throw error; // Last attempt failed, throw the error
      }

      // Only retry on network errors or timeouts, not on 4xx errors
      if (error.response?.status >= 400 && error.response?.status < 500) {
        throw error; // Don't retry client errors
      }

      // Wait before retrying
      await new Promise(resolve => setTimeout(resolve, delay * attempt));
    }
  }
};

// Upload profile picture
export const uploadProfilePicture = async (userId, imageFile, token) => {
  if (!userId || !imageFile || !token) {
    throw { message: "User ID, image file, and token are required" };
  }

  const requestFn = async () => {
    console.log("📤 Uploading profile picture for user:", userId);

    const formData = new FormData();
    formData.append("profilePicture", imageFile);

    const response = await apiClient.post(`/profile/${userId}/profile-picture`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      timeout: 30000, // 30 seconds for file uploads
    });

    console.log("✅ Profile picture uploaded successfully");
    return response.data;
  };

  try {
    return await retryRequest(requestFn, 1, 2000); // Only 1 retry for uploads
  } catch (error) {
    console.error("❌ Profile picture upload error:", {
      userId,
      fileName: imageFile?.name,
      fileSize: imageFile?.size,
      error: error.message,
      status: error.response?.status,
    });

    if (error.code === 'ECONNABORTED') {
      throw {
        message: "Upload timed out. Please check your internet connection and try again.",
        code: 'TIMEOUT'
      };
    }

    if (error.response?.status === 413) {
      throw {
        message: "Image file is too large. Please choose a smaller image (max 5MB).",
        code: 'FILE_TOO_LARGE'
      };
    }

    if (error.response?.status === 415) {
      throw {
        message: "Invalid file type. Please upload an image file.",
        code: 'INVALID_FILE_TYPE'
      };
    }

    if (error.response?.status === 401) {
      throw {
        message: "Authentication failed. Please sign in again.",
        code: 'UNAUTHORIZED'
      };
    }

    throw error.response?.data || {
      message: "Failed to upload profile picture. Please try again.",
      code: 'UPLOAD_ERROR'
    };
  }
};

// Get user profile including profile picture
export const getUserProfile = async (userId, token) => {
  if (!userId) {
    throw { message: "User ID is required" };
  }

  if (!token) {
    throw { message: "Authentication token is required" };
  }

  const requestFn = async () => {
    console.log(`🔍 Fetching user profile for ID: ${userId}`);

    const response = await apiClient.get(`/profile/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 20000, // 20 seconds for profile requests (may include image data)
    });

    console.log(`✅ User profile fetched successfully for ID: ${userId}`);
    return response.data;
  };

  try {
    return await retryRequest(requestFn, 2, 1500);
  } catch (error) {
    console.error("❌ Error fetching user profile:", {
      userId,
      error: error.message,
      status: error.response?.status,
      code: error.code,
    });

    // Provide more specific error messages
    if (error.code === 'ECONNABORTED') {
      throw {
        message: "Request timed out. Please check your internet connection and try again.",
        code: 'TIMEOUT'
      };
    }

    if (error.response?.status === 401) {
      throw {
        message: "Authentication failed. Please sign in again.",
        code: 'UNAUTHORIZED'
      };
    }

    if (error.response?.status === 404) {
      throw {
        message: "User profile not found.",
        code: 'NOT_FOUND'
      };
    }

    if (error.response?.status >= 500) {
      throw {
        message: "Server error. Please try again later.",
        code: 'SERVER_ERROR'
      };
    }

    throw error.response?.data || {
      message: "Failed to fetch user profile. Please try again.",
      code: 'UNKNOWN_ERROR'
    };
  }
};

// Update user profile
export const updateUserProfile = async (userId, userData, token) => {
  if (!userId || !userData || !token) {
    throw { message: "User ID, user data, and token are required" };
  }

  const requestFn = async () => {
    console.log(`📝 Updating user profile for ID: ${userId}`);

    const response = await apiClient.put(`/profile/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000, // 15 seconds for profile updates
    });

    console.log(`✅ User profile updated successfully for ID: ${userId}`);
    return response.data;
  };

  try {
    return await retryRequest(requestFn, 2, 1000);
  } catch (error) {
    console.error("❌ Error updating user profile:", {
      userId,
      error: error.message,
      status: error.response?.status,
    });

    if (error.code === 'ECONNABORTED') {
      throw {
        message: "Update timed out. Please try again.",
        code: 'TIMEOUT'
      };
    }

    if (error.response?.status === 401) {
      throw {
        message: "Authentication failed. Please sign in again.",
        code: 'UNAUTHORIZED'
      };
    }

    if (error.response?.status === 404) {
      throw {
        message: "User profile not found.",
        code: 'NOT_FOUND'
      };
    }

    throw error.response?.data || {
      message: "Failed to update user profile. Please try again.",
      code: 'UPDATE_ERROR'
    };
  }
};

// Delete profile picture
export const deleteProfilePicture = async (userId, token) => {
  if (!userId || !token) {
    throw { message: "User ID and token are required" };
  }

  const requestFn = async () => {
    console.log("🗑️ Deleting profile picture for user:", userId);

    const response = await apiClient.delete(`/profile/${userId}/profile-picture`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 15000, // 15 seconds for deletion
    });

    console.log("✅ Profile picture deleted successfully");
    return response.data;
  };

  try {
    return await retryRequest(requestFn, 2, 1000);
  } catch (error) {
    console.error("❌ Profile picture deletion error:", {
      userId,
      error: error.message,
      status: error.response?.status,
    });

    if (error.code === 'ECONNABORTED') {
      throw {
        message: "Deletion timed out. Please try again.",
        code: 'TIMEOUT'
      };
    }

    if (error.response?.status === 401) {
      throw {
        message: "Authentication failed. Please sign in again.",
        code: 'UNAUTHORIZED'
      };
    }

    if (error.response?.status === 404) {
      throw {
        message: "No profile picture found to delete.",
        code: 'NOT_FOUND'
      };
    }

    throw error.response?.data || {
      message: "Failed to delete profile picture. Please try again.",
      code: 'DELETE_ERROR'
    };
  }
};

// Health check function to test API connectivity
export const checkApiHealth = async () => {
  try {
    const response = await apiClient.get('/profile/ping', {
      timeout: 5000,
    });
    return { healthy: true, response: response.data };
  } catch (error) {
    console.error("❌ API health check failed:", error.message);
    return {
      healthy: false,
      error: error.message,
      code: error.code
    };
  }
};
