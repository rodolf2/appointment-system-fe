import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router";

const useHeader = (initialTitle = "") => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const [notificationError] = useState(null);
  const [activeTab, setActiveTab] = useState("unread");
  const [title, setTitle] = useState(initialTitle);

  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const profileToggleRef = useRef(null);
  const notificationToggleRef = useRef(null);

  // Mock data for notifications with different types
  useEffect(() => {
    setIsLoadingNotifications(true);
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          type: "user-action",
          initials: "AB",
          userName: "UserName",
          action: "updated the status appointment of",
          reference: "TR102938-123",
          status: "APPROVED",
          read: false,
          time: "22 minutes ago",
        },
        {
          id: 2,
          type: "user-action",
          initials: "AB",
          userName: "UserName",
          action: "updated the status appointment of",
          reference: "TR104095-567",
          status: "APPROVED",
          read: false,
          time: "35 minutes ago",
        },
        {
          id: 3,
          type: "system",
          event: "New Appointment",
          action: "has been submitted!",
          read: false,
          time: "5 minutes ago",
        },
        {
          id: 4,
          type: "user-action",
          initials: "AB",
          userName: "UserName",
          action: "updated the status appointment of",
          reference: "TR23132-122",
          status: "COMPLETED",
          read: false,
          time: "43 minutes ago",
        },
      ]);
      setIsLoadingNotifications(false);
    }, 1000);
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
    navigate("/signin");
  };

  const handleProfile = () => {
    setIsProfileDropdownOpen(false);
    navigate("/profile");
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
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
  };
};

export default useHeader;