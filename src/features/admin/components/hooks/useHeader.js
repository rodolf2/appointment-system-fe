import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../../../context/UserContext.jsx";
import { getUserProfile } from "../../../../services/userServices";
import {
  getNotifications,
  markAsRead as markNotificationAsRead,
  markAllAsRead as markAllNotificationsAsRead,
} from "../../../../services/notificationServices";

const useHeader = (initialTitle = "") => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const [notificationError] = useState(null);
  const [activeTab, setActiveTab] = useState("unread");
  const [title, setTitle] = useState(initialTitle);

  const navigate = useNavigate();
  const { user, updateUser, logout } = useUser();
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const profileToggleRef = useRef(null);
  const notificationToggleRef = useRef(null);

  // Fetch latest user profile when component mounts or when user changes
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        try {
          const token = localStorage.getItem("token");
          if (!token) return;

          console.log("🔄 Header: Fetching latest user profile...");
          const userProfile = await getUserProfile(user.id, token);
          if (userProfile) {
            console.log("✅ Header: Got latest profile:", userProfile);
            // Update user context with latest profile data
            const updatedUser = {
              ...user,
              picture: userProfile.profilePicture || userProfile.picture,
              profilePicture: userProfile.profilePicture || userProfile.picture,
            };
            console.log("👤 Header: Updating user context with:", updatedUser);
            updateUser(updatedUser);
          }
        } catch (error) {
          console.error("❌ Header: Error fetching user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [user?.id, user?.profilePicture, updateUser]);

  // Function to fetch notifications that can be called anywhere
  const fetchNotifications = async () => {
    setIsLoadingNotifications(true);
    try {
      const data = await getNotifications();
      setNotifications(data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
      // You can set an error state here if needed
    } finally {
      setIsLoadingNotifications(false);
    }
  };

  // Fetch notifications when component mounts and set up polling
  useEffect(() => {
    fetchNotifications();

    // Set up polling to refresh notifications periodically
    const intervalId = setInterval(fetchNotifications, 15000); // Refresh every 15 seconds

    return () => clearInterval(intervalId);
  }, []);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileDropdownRef.current &&
        !profileDropdownRef.current.contains(event.target) &&
        profileToggleRef.current &&
        !profileToggleRef.current.contains(event.target)
      ) {
        setIsProfileDropdownOpen(false);
      }
      if (
        notificationDropdownRef.current &&
        !notificationDropdownRef.current.contains(event.target) &&
        notificationToggleRef.current &&
        !notificationToggleRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredNotifications = notifications.filter((notif) => {
    if (activeTab === "unread") return !notif.read;
    if (activeTab === "all") return true;
    if (activeTab === "archive") return notif.read;
    return true;
  });

  const unreadCount = notifications.filter((n) => !n.read).length;

  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
    setIsNotificationOpen(false);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen((prev) => !prev);
    setIsProfileDropdownOpen(false);
  };

  const handleSignOut = () => {
    setIsProfileDropdownOpen(false);
    logout();
    navigate("/signin");
  };

  const handleProfile = () => {
    setIsProfileDropdownOpen(false);
    navigate("/profile");
  };

  const markAllAsRead = async () => {
    try {
      await markAllNotificationsAsRead();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      await markNotificationAsRead(id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n))
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  return {
    isProfileDropdownOpen,
    isNotificationOpen,
    isLoadingNotifications,
    notificationError,
    activeTab,
    title,
    setTitle,
    filteredNotifications,
    unreadCount,
    profileDropdownRef,
    notificationDropdownRef,
    profileToggleRef,
    notificationToggleRef,
    toggleProfileDropdown,
    toggleNotificationDropdown,
    handleSignOut,
    handleProfile,
    markAllAsRead,
    markAsRead,
    setActiveTab,
    refreshNotifications: fetchNotifications, // Expose the refresh function
  };
};

export default useHeader;
