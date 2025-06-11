import axios from "axios";

const API_URL =
`${import.meta.env.VITE_API_URL}/api/notifications`;

// Get all notifications
export const getNotifications = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await axios.get(API_URL, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    });

    // Format the time for display and enhance with initials
    return response.data.map((notification) => ({
      ...notification,
      id: notification._id, // Map MongoDB _id to id for frontend
      time: formatTimeAgo(notification.createdAt),
      // Generate initials from userName for display
      initials: notification.userName
        ? notification.userName
            .split(" ")
            .map((name) => name.charAt(0))
            .join("")
            .toUpperCase()
        : "A", // Default to 'A' for Admin
    }));
  } catch (error) {
    console.error("Error fetching notifications:", {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      message: error.message,
      code: error.code,
    });

    if (error.code === "ERR_NETWORK") {
      throw new Error(
        "Unable to connect to the server. Please check your internet connection."
      );
    }

    if (error.response?.status === 401) {
      throw new Error("Your session has expired. Please sign in again.");
    }

    throw error;
  }
};

// Get unread notification count
export const getUnreadCount = async () => {
  try {
    const response = await axios.get(`${API_URL}/unread-count`);
    return response.data.count;
  } catch (error) {
    console.error("Error fetching unread count:", error);
    throw error;
  }
};

// Mark notification as read
export const markAsRead = async (id) => {
  try {
    const response = await axios.put(`${API_URL}/mark-read/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error marking notification as read:", error);
    throw error;
  }
};

// Mark all notifications as read
export const markAllAsRead = async () => {
  try {
    const response = await axios.put(`${API_URL}/mark-all-read`);
    return response.data;
  } catch (error) {
    console.error("Error marking all notifications as read:", error);
    throw error;
  }
};

// Helper function to format time ago
const formatTimeAgo = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now - date) / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return days === 1 ? "1 day ago" : `${days} days ago`;
  } else if (hours > 0) {
    return hours === 1 ? "1 hour ago" : `${hours} hours ago`;
  } else if (minutes > 0) {
    return minutes === 1 ? "1 minute ago" : `${minutes} minutes ago`;
  } else {
    return seconds <= 5 ? "just now" : `${seconds} seconds ago`;
  }
};
