import React, { useState, useEffect, useRef } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserEdit, FaSignOutAlt, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router";

const Header = ({ toggleSidebar, isSidebarOpen, title }) => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [isLoadingNotifications, setIsLoadingNotifications] = useState(false);
  const [notificationError, setNotificationError] = useState(null);
  const [activeTab, setActiveTab] = useState("unread");

  const navigate = useNavigate();
  const profileDropdownRef = useRef(null);
  const notificationDropdownRef = useRef(null);
  const profileToggleRef = useRef(null);
  const notificationToggleRef = useRef(null);

  // Mock data matching your image
  useEffect(() => {
    setIsLoadingNotifications(true);
    setTimeout(() => {
      setNotifications([
        {
          id: 1,
          initials: "AB",
          text: "UserName updated the status appointment of TR102938-123 into APPROVED.",
          read: false,
          time: "22 minutes ago",
        },
        {
          id: 2,
          initials: "AB",
          text: "UserName updated the status appointment of TR104095-567 into APPROVED.",
          read: false,
          time: "35 minutes ago",
        },
        {
          id: 3,
          text: "New Appointment has been submitted.",
          read: false,
        },
        {
          id: 4,
          initials: "AB",
          text: "UserName updated the status appointment of TR23132-122 into COMPLETED.",
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
            className="relative p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label={`Notifications (${unreadCount} unread)`}
            disabled={isLoadingNotifications}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
              />
            </svg>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 block h-4 w-4 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationOpen && (
            <div
              ref={notificationDropdownRef}
              className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-80 z-20 max-h-96 overflow-y-auto"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b">
                <h3 className="font-semibold text-gray-800 pb-3 relative inline-block text-xl">
                  Notification
                  <span className="absolute bottom-1 left-0 w-full h-0.5 bg-[#F3BC62]"></span>
                </h3>
              </div>

              {/* Tabs */}
              <div className="flex border-b">
                <button
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === "unread"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("unread")}
                >
                  Unread
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === "all"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
                <button
                  className={`flex-1 py-2 text-sm font-medium ${
                    activeTab === "archive"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500"
                  }`}
                  onClick={() => setActiveTab("archive")}
                >
                  Archive
                </button>
              </div>

              {/* Content */}
              <div className="divide-y">
                {isLoadingNotifications ? (
                  <div className="flex justify-center items-center p-6 text-gray-500">
                    <FaSpinner className="animate-spin mr-2" /> Loading...
                  </div>
                ) : notificationError ? (
                  <div className="px-4 py-4 text-red-600 text-sm text-center">
                    {notificationError}
                  </div>
                ) : filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-4 py-3 hover:bg-gray-50 ${
                        !notif.read ? "bg-gray-100" : "bg-white"
                      }`}
                    >
                      <div className="flex items-start">
                        {notif.initials ? (
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <span className="text-blue-600 font-medium">
                              {notif.initials}
                            </span>
                          </div>
                        ) : (
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center mr-3">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 text-gray-500"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                                clipRule="evenodd"
                              />
                            </svg>
                          </div>
                        )}

                        <div className="flex-1 min-w-0">
                          <p
                            className={`text-sm ${
                              !notif.read
                                ? "font-semibold text-gray-900"
                                : "text-gray-600"
                            }`}
                          >
                            {notif.text}
                          </p>
                          {notif.time && (
                            <p
                              className={`text-xs mt-1 ${
                                !notif.read ? "text-gray-700" : "text-gray-500"
                              }`}
                            >
                              {notif.time}
                            </p>
                          )}
                        </div>

                        {!notif.read && (
                          <div className="ml-2 flex-shrink-0">
                            <span className="h-2 w-2 rounded-full bg-blue-600 block"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-4 py-4 text-sm text-gray-500 text-center">
                    No notifications
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-2 border-t text-right">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Mark all as read
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Separator */}
        <div className="border-r-2 border-gray-300 h-8"></div>

        {/* Profile Dropdown */}
        <div className="relative">
          <div
            ref={profileToggleRef}
            className="flex items-center gap-2 cursor-pointer p-1 rounded hover:bg-gray-200"
            onClick={toggleProfileDropdown}
          >
            <CgProfile className="text-4xl text-gray-600" />
            <span className="text-base hidden sm:inline text-gray-700">
              Juan Dela Cruz
            </span>
            <IoMdArrowDropdown className="text-2xl text-gray-600" />
          </div>
          {isProfileDropdownOpen && (
            <div
              ref={profileDropdownRef}
              className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-lg py-2 w-48 z-20"
            >
              <button
                className="flex items-center px-4 py-2 text-left text-gray-700 hover:bg-gray-100 w-full text-sm"
                onClick={handleProfile}
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
