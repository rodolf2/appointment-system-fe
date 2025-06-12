import { RxHamburgerMenu } from "react-icons/rx";
import { CgProfile } from "react-icons/cg";
import { IoMdArrowDropdown } from "react-icons/io";
import { FaUserEdit, FaSignOutAlt, FaSpinner } from "react-icons/fa";
import useHeader from "./hooks/useHeader";
import PropTypes from "prop-types";
import { useUser } from "../../../context/UserContext.jsx";

const Header = ({ toggleSidebar, title: initialTitle }) => {
  const {
    isProfileDropdownOpen,
    isNotificationOpen,
    isLoadingNotifications,
    notificationError,
    activeTab,
    title,
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
    setActiveTab,
    markAsRead,
    refreshNotifications,
  } = useHeader(initialTitle);

  const { user } = useUser();

  // Debug: Log current user to verify name is available
  // console.log("Current user in Header:", user);

  return (
    <header className="z-10 flex justify-between items-center bg-Bbackground h-[87px] px-5 shadow-md">
      {/* Left Side */}
      <div className="flex items-center">
        <button
          onClick={toggleSidebar}
          className="p-2 text-black rounded text-2xl font-bold hover:bg-gray-200 transition-colors"
          aria-label="Toggle Sidebar"
        >
          <RxHamburgerMenu />
        </button>
        <h1 className="text-xl font-bold ml-4 hidden sm:block">{title}</h1>
      </div>

      {/* Right Side */}
      <div className="relative flex items-center gap-3">
        {/* Notification Area */}
        <div className="relative " ref={notificationToggleRef}>
          <button
            onClick={toggleNotificationDropdown}
            className="relative p-1 rounded-full hover:bg-gray-200 transition-colors"
            aria-label={`Notifications (${unreadCount} unread)`}
            disabled={isLoadingNotifications}
          >
            <img
              src="/assets/icons/notification.svg"
              alt="Notification Icon"
              className="w-8 h-8"
            />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-4 w-4 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center ring-2 ring-white">
                {unreadCount}
              </span>
            )}
          </button>

          {isNotificationOpen && (
            <div
              ref={notificationDropdownRef}
              className="absolute right-0 top-full mt-2 bg-white border border-gray-200 shadow-lg rounded-lg w-[500px] z-20 max-h-[32rem] overflow-y-auto"
            >
              {/* Header */}
              <div className="px-6 py-4 border-b flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 pb-3 relative inline-block text-2xl">
                  Notifications
                  <span className="absolute bottom-1 left-0 w-full h-1 bg-[#F3BC62]"></span>
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      refreshNotifications();
                    }}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors"
                    title="Refresh notifications"
                    disabled={isLoadingNotifications}
                  >
                    {isLoadingNotifications ? (
                      <FaSpinner className="h-5 w-5 animate-spin" />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex border-b bg-[#D9D9D9] align-middle rounded-lg p-1 mb-5">
                <button
                  className={`flex-1 py-2 mx-1 text-base font-medium transition-all ${
                    activeTab === "unread"
                      ? "text-[#161F55] bg-white rounded-lg shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("unread")}
                >
                  Unread
                </button>
                <button
                  className={`flex-1 py-2 mx-1 text-base font-medium transition-all ${
                    activeTab === "all"
                      ? "text-[#161F55] bg-white rounded-lg shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All
                </button>
                <button
                  className={`flex-1 py-2 mx-1 text-base font-medium transition-all ${
                    activeTab === "archive"
                      ? "text-[#161F55] bg-white rounded-lg shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("archive")}
                >
                  Archive
                </button>
              </div>

              {/* Content */}
              <div className="divide-y">
                {isLoadingNotifications ? (
                  <div className="flex justify-center items-center p-8 text-gray-500">
                    <FaSpinner className="animate-spin mr-3 text-xl" />{" "}
                    Loading...
                  </div>
                ) : notificationError ? (
                  <div className="px-6 py-5 text-red-600 text-base text-center">
                    {notificationError}
                  </div>
                ) : filteredNotifications.length > 0 ? (
                  filteredNotifications.map((notif) => (
                    <div
                      key={notif.id}
                      className={`px-6 py-6 cursor-pointer hover:bg-gray-50 mb-3 ${
                        !notif.read ? "bg-gray-100" : "bg-white"
                      }
        shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] hover:shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] 
        transition-shadow relative rounded-lg`}
                      onClick={() => markAsRead(notif.id)}
                    >
                      {/* Shorter vertical blue line */}
                      <div className="absolute left-1 top-4 bottom-4 w-1 bg-blue-500 rounded-r"></div>

                      <div className="flex items-start gap-4">
                        {/* Only show avatar/icon for user actions */}
                        {notif.type === "user-action" && (
                          <div className="flex-shrink-0 h-12 w-12 rounded-full bg-[#34A853] flex items-center justify-center ml-2">
                            <span className="text-white font-medium text-lg">
                              {notif.initials}
                            </span>
                          </div>
                        )}

                        <div
                          className={`flex-1 min-w-0 ${
                            notif.type !== "user-action" ? "pl-4" : ""
                          }`}
                        >
                          <div className="flex justify-between items-start gap-2">
                            <div>
                              <p
                                className={`text-base ${
                                  !notif.read
                                    ? "text-gray-900"
                                    : "text-gray-600"
                                }`}
                              >
                                {notif.type === "user-action" ? (
                                  <>
                                    <span className="font-bold">
                                      {notif.userName}
                                    </span>{" "}
                                    {notif.action}{" "}
                                    {notif.reference && (
                                      <span className="font-mono text-blue-600">
                                        #{notif.reference}
                                      </span>
                                    )}{" "}
                                    {notif.status && (
                                      <span
                                        className={`${
                                          notif.status.toLowerCase() ===
                                          "completed"
                                            ? "text-blue-600"
                                            : notif.status.toLowerCase() ===
                                              "approved"
                                            ? "text-green-600"
                                            : notif.status.toLowerCase() ===
                                              "rejected"
                                            ? "text-red-600"
                                            : ""
                                        } uppercase`}
                                      >
                                        {notif.status}
                                      </span>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    {notif.event} {notif.action}
                                  </>
                                )}
                              </p>
                              {notif.details && (
                                <p className="text-sm text-gray-500 mt-1">
                                  {notif.details}
                                </p>
                              )}
                            </div>
                            {notif.time && (
                              <p
                                className={`text-sm ${
                                  !notif.read
                                    ? "text-gray-700"
                                    : "text-gray-500"
                                } whitespace-nowrap`}
                              >
                                {notif.time}
                              </p>
                            )}
                          </div>
                        </div>

                        {!notif.read && (
                          <div className="ml-2 flex-shrink-0 mt-1">
                            <span className="h-3 w-3 rounded-full bg-blue-600 block"></span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="px-6 py-5 text-base text-gray-500 text-center">
                    No notifications available
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 border-t text-right">
                <button
                  onClick={markAllAsRead}
                  className="text-base text-blue-600 hover:underline font-medium"
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
            {user && (user.picture || user.profilePicture) ? (
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={user.picture || user.profilePicture}
                  alt={`${user.name}'s profile`}
                  className="w-full h-full object-cover"
                  onLoad={() => {
                    console.log(
                      "✅ Header profile image loaded:",
                      user.picture || user.profilePicture
                    );
                  }}
                  onError={(e) => {
                    e.target.onerror = null; // Prevent infinite loop
                    const originalUrl = user.picture || user.profilePicture;
                    console.error(
                      "❌ Failed to load header profile picture:",
                      originalUrl
                    );

                    // If it's a Google profile picture, try a different approach
                    if (
                      originalUrl &&
                      originalUrl.includes("googleusercontent.com")
                    ) {
                      console.log(
                        "🔄 Trying alternative Google profile picture URL..."
                      );
                      // Try removing size parameter and using a more basic URL
                      const baseUrl = originalUrl.split("=")[0];
                      e.target.src = baseUrl + "=s96-c";

                      // If that fails too, use default
                      e.target.onerror = () => {
                        e.target.onerror = null;
                        e.target.src = "/assets/icons/user 1.png";
                        e.target.classList.remove("object-cover");
                        e.target.classList.add("p-2", "bg-gray-100");
                        console.log("🔄 Using default profile icon");
                      };
                    } else {
                      // For non-Google URLs, use UploadIcon
                      e.target.src = "/assets/icons/user 1.png";
                      e.target.classList.remove("object-cover");
                      e.target.classList.add("p-2", "bg-gray-100");
                    }
                  }}
                />
              </div>
            ) : (
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center p-2">
                <img
                  src="/assets/icons/user 1.png"
                  alt="Upload profile picture"
                  className="w-full h-full"
                />
              </div>
            )}
            <span className="text-base hidden sm:inline text-gray-700">
              {user?.name || "Guest"}
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

Header.propTypes = {
  toggleSidebar: PropTypes.func.isRequired,
  title: PropTypes.string,
};

export default Header;
