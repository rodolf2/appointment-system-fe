import React, { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserEdit, FaSignOutAlt, FaBell, FaSpinner } from "react-icons/fa"; // Added FaSpinner
import { useNavigate } from "react-router";

// --- Placeholder API Simulation Functions ---
// In a real app, these would use fetch/axios to talk to your backend
const fetchNotificationsFromAPI = async () => {
  console.log("API Call: Fetching notifications...");
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Simulate a successful response
  // In a real app, handle potential errors (try/catch, check response.ok)
  const mockData = [
    {
      id: 1,
      text: "New message from Admin",
      read: false,
      time: "5m ago",
      link: "/messages/123",
    },
    {
      id: 2,
      text: "Your leave request was approved",
      read: false,
      time: "1h ago",
      link: "/leave-requests/45",
    },
    {
      id: 3,
      text: "System maintenance scheduled for tonight",
      read: true,
      time: "1d ago",
      link: "/announcements/10",
    },
  ];
  console.log("API Call: Received notifications.");
  return mockData;

  // Simulate an error response (uncomment to test error handling)
  // console.error("API Call: Failed to fetch notifications.");
  // throw new Error("Failed to load notifications");
};

const markNotificationAsReadAPI = async (notificationId) => {
  console.log(`API Call: Marking notification ${notificationId} as read...`);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Simulate success
  console.log(`API Call: Notification ${notificationId} marked as read.`);
  return { success: true };

  // Simulate failure (uncomment to test)
  // console.error(`API Call: Failed to mark notification ${notificationId} as read.`);
  // throw new Error("Failed to update notification status");
};

// --- Component ---

const Header = ({ toggleSidebar, isSidebarOpen, title }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);

  // Notification State
  const [notifications, setNotifications] = useState([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const [notificationError, setNotificationError] = useState(null);

  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const profileToggleRef = useRef(null);
  const notificationToggleRef = useRef(null);

  // --- Fetch Notifications on Mount ---
  useEffect(() => {
    const loadNotifications = async () => {
      setIsLoadingNotifications(true);
      setNotificationError(null); // Reset error before fetching
      try {
        const data = await fetchNotificationsFromAPI();
        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
        setNotificationError(error.message || "Could not load notifications.");
      } finally {
        setIsLoadingNotifications(false);
      }
    };

    loadNotifications();
  }, []); // Empty array means run once on mount

  // --- Click Outside Handler ---
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
  }, []); // Dependencies are refs, which don't change, so empty array is okay

  // --- Handlers ---
  const toggleProfileDropdown = () => {
    setIsProfileDropdownOpen((prev) => !prev);
    setIsNotificationOpen(false);
  };

  const toggleNotificationDropdown = () => {
    setIsNotificationOpen((prev) => !prev);
    setIsProfileDropdownOpen(false);
    // Optional: Refetch notifications when opening? Or rely on initial load/websockets?
    // For now, we just toggle the display based on current state.
  };

  const handleSignOut = () => {
    setIsProfileDropdownOpen(false);
    // TODO: Add backend sign-out logic here if needed
    navigate("/signin");
  };

  const handleProfle = () => {
    setIsProfileDropdownOpen(false);
    navigate("/profile");
  };

  const handleNotificationClick = async (notification) => {
    console.log("Clicked notification:", notification.id);
    setIsNotificationOpen(false); // Close dropdown immediately

    // 1. Navigate (if there's a link)
    if (notification.link) {
      navigate(notification.link);
    }

    // 2. Mark as read (only if it's currently unread)
    if (!notification.read) {
      try {
        // Call the backend API
        const response = await markNotificationAsReadAPI(notification.id);

        // If API call is successful, update local state
        if (response.success) {
          setNotifications((prevNotifications) =>
            prevNotifications.map((n) =>
              n.id === notification.id ? { ...n, read: true } : n
            )
          );
        } else {
          // Handle potential API error response (e.g., show a toast)
          console.error(
            "Backend indicated failure marking notification as read."
          );
        }
      } catch (error) {
        // Handle network/exception error (e.g., show a toast)
        console.error("Error marking notification as read:", error);
        // Optional: Revert optimistic update if you did one
      }
    }
  };

  // Calculate unread count from the current state
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="z-10 flex justify-between items-center bg-Bbackground h-[87px] px-5 shadow-md">
      {/* Left Side */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 text-black rounded text-4xl font-bold hover:bg-gray-200 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <RxHamburgerMenu />
        </button>
        <h1 className="text-xl font-bold ml-4 hidden sm:block">{title}</h1>
      </div>

      {/* Right Side */}
      <div className="relative flex items-center gap-3">
        {/* Notification Area */}
        <div className="relative" ref={notificationToggleRef}>
          <button
            onClick={toggleNotificationDropdown}
            className="relative p-1 rounded-full hover:bg-gray-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            aria-label={`Notifications (${unreadCount} unread)`}
            aria-haspopup="true"
            aria-expanded={isNotificationOpen}
            disabled={isLoadingNotifications} // Disable button while initially loading
          >
            <img
              src="/public/assets/icons/notification.svg"
              alt=""
              className="inline-block w-8 h-8"
            />
            {/* Badge */}
            {!isLoadingNotifications && unreadCount > 0 && (
              <span className="absolute top-0 right-0 block h-4 w-4 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center ring-2 ring-white">
                {unreadCount > 9 ? "9+" : unreadCount}
              </span>
            )}
            {/* Optional: Loading indicator directly on the icon */}
            {/* {isLoadingNotifications && <FaSpinner className="animate-spin absolute inset-0 m-auto text-blue-500" />} */}
          </button>

          {/* Notification Dropdown */}
          {isNotificationOpen && (
            <div
              ref={notificationDropdownRef}
              className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-72 sm:w-80 z-20 max-h-96 overflow-y-auto"
            >
              <div className="px-4 py-2 border-b font-semibold text-gray-700">
                Notifications
              </div>
              {/* Loading State */}
              {isLoadingNotifications && (
                <div className="flex justify-center items-center p-6 text-gray-500">
                  <FaSpinner className="animate-spin mr-2" /> Loading...
                </div>
              )}
              {/* Error State */}
              {!isLoadingNotifications && notificationError && (
                <div className="px-4 py-4 text-red-600 text-sm text-center">
                  {notificationError}
                </div>
              )}
              {/* Success/Empty State */}
              {!isLoadingNotifications && !notificationError && (
                <>
                  {notifications.length > 0 ? (
                    <ul>
                      {notifications.map((notif) => (
                        <li
                          key={notif.id}
                          className={`border-b last:border-b-0 ${
                            !notif.read
                              ? "bg-blue-50 hover:bg-blue-100"
                              : "bg-white hover:bg-gray-100"
                          }`}
                        >
                          <button // Use button for clickable item
                            onClick={() => handleNotificationClick(notif)}
                            className="block w-full text-left px-4 py-3"
                            aria-label={`Notification: ${notif.text}`}
                          >
                            <p
                              className={`text-sm ${
                                !notif.read
                                  ? "font-medium text-gray-800"
                                  : "text-gray-600"
                              }`}
                            >
                              {notif.text}
                            </p>
                            <p className="text-xs text-gray-400 mt-1">
                              {notif.time}
                            </p>
                          </button>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="px-4 py-4 text-sm text-gray-500 text-center">
                      No new notifications.
                    </p>
                  )}
                  <div className="px-4 py-2 border-t text-center">
                    <button // Changed to button as it likely triggers an action/navigation
                      onClick={(e) => {
                        e.preventDefault();
                        setIsNotificationOpen(false);
                        // TODO: Implement navigation to 'All Notifications' page
                        navigate("/notifications"); // Example navigation
                      }}
                      className="text-sm text-blue-600 hover:underline"
                    >
                      View All Notifications
                    </button>
                    {/* Optional: Add a "Mark all as read" button here */}
                    {/* {unreadCount > 0 && (
                      <button onClick={handleMarkAllRead} className="...">Mark all as read</button>
                    )} */}
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="border-r-2 border-gray-300 h-8"></div>

        {/* Profile Dropdown Area */}
        <div className="relative">
          <div
            ref={profileToggleRef}
            className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-gray-200"
            onClick={toggleProfileDropdown}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") toggleProfileDropdown();
            }}
            aria-haspopup="true"
            aria-expanded={isProfileDropdownOpen}
          >
            <CgProfile className="text-4xl text-gray-600" />
            <span className="text-base hidden sm:inline text-gray-700">
              Juan Dela Cruz
            </span>
            <IoMdArrowDropdown className="text-2xl text-gray-600" />
          </div>
          {/* Profile Dropdown Panel */}
          {isProfileDropdownOpen && (
            <div
              ref={profileDropdownRef}
              className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-lg py-2 w-48 z-20"
            >
              <button
                className="flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full text-sm"
                onClick={handleProfle}
              >
                <FaUserEdit className="mr-2 w-5 h-5 text-gray-500" />
                Edit Profile
              </button>
              <button
                className="flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full text-sm"
                onClick={handleSignOut}
              >
                <FaSignOutAlt className="mr-2 w-5 h-5 text-gray-500" />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
