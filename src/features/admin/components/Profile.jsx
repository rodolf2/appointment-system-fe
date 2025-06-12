import { useState } from "react";
import Header from "/src/features/admin/components/Header";
import Sidebar from "/src/components/Sidebar";
import Footer from "/src/features/admin/components/Footer";
import useProfileForm from "./hooks/useProfileForm";

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Loading state for image removal

  // Use the custom hook
  const {
    formData,
    profileImage,
    handleInputChange,
    handleImageUpload,
    handleImageRemove,
    handleSubmit,
  } = useProfileForm();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setIsSubmitting(true);

      const result = await handleSubmit();

      setSuccessMessage("Profile updated successfully!");
      setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Failed to update profile");
      setTimeout(() => {
        setError(null);
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative flex h-screen font-LatoRegular">
      {/* Sidebar */}
      {isSidebarOpen && (
        <div className="relative z-20">
          <Sidebar isSidebarOpen={isSidebarOpen} />
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 relative">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url("/assets/image/BackGround.png")`,
          }}
        >
          <div className="absolute inset-0 bg-[#161f55] bg-opacity-80"></div>
        </div>

        <div className="relative z-10 flex flex-col h-full">
          <Header
            toggleSidebar={toggleSidebar}
            isSidebarOpen={isSidebarOpen}
            title="Account Profile"
          />

          {/* Profile Card */}
          <div className="flex justify-center items-center flex-1 px-4">
            <div className="bg-white p-8 rounded-lg shadow-lg w-[800px] h-[500px] flex">
              {/* Profile Picture Section */}
              <div className="flex flex-col items-center w-1/3">
                <div className="w-60 h-60 bg-gray-200 rounded-full flex items-center justify-center border border-gray-300 mb-4 mt-16 overflow-hidden">
                  {profileImage ? (
                    <img
                      src={profileImage}
                      alt="Profile"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error(
                          "❌ Failed to load profile image:",
                          profileImage
                        );

                        // Try to load Google profile picture with different sizes
                        if (profileImage?.includes("googleusercontent.com")) {
                          console.log(
                            "🔄 Attempting to fix Google profile picture URL..."
                          );

                          // Remove any existing size parameter
                          const baseUrl = profileImage.split("=")[0];

                          // Try different sizes in order
                          const sizes = ["s400-c", "s200-c", "s96-c"];
                          let currentSizeIndex = 0;

                          const tryNextSize = () => {
                            if (currentSizeIndex < sizes.length) {
                              console.log(
                                `🔄 Trying size: ${sizes[currentSizeIndex]}...`
                              );
                              e.target.src = `${baseUrl}=${sizes[currentSizeIndex]}`;
                              currentSizeIndex++;
                            } else {
                              // If all sizes fail, use default
                              console.log(
                                "⚠️ All Google photo sizes failed, using default..."
                              );
                              e.target.src = "/assets/icons/UploadIcon.svg";
                              e.target.onerror = null; // Prevent infinite loop
                              e.target.classList.add("p-2", "bg-gray-100");
                            }
                          };

                          e.target.onerror = () => tryNextSize();
                          tryNextSize();
                        } else {
                          // For non-Google URLs, use default immediately                          e.target.src = "/assets/icons/UploadIcon.svg";
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.classList.add("p-2", "bg-gray-100");
                        }
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      {" "}
                      <img
                        src="/assets/icons/UploadIcon.svg"
                        alt="Upload profile picture"
                        className="w-10 h-10 opacity-50"
                      />
                    </div>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <label
                    className={`px-4 py-2 ${
                      isLoading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-[#161f55] hover:bg-blue-700"
                    } text-white rounded-md text-sm transition duration-200 cursor-pointer`}
                  >
                    {isLoading ? "Uploading..." : "Upload"}
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      disabled={isLoading}
                      onChange={async (e) => {
                        try {
                          setError(null);
                          setIsLoading(true);

                          await handleImageUpload(e);

                          setSuccessMessage(
                            "Profile picture updated successfully!"
                          );
                          setTimeout(() => {
                            setSuccessMessage(null);
                          }, 3000);
                        } catch (err) {
                          console.error(
                            "Error uploading profile picture:",
                            err
                          );
                          setError(
                            err.message || "Failed to upload profile picture"
                          );
                          setTimeout(() => {
                            setError(null);
                          }, 5000);
                        } finally {
                          setIsLoading(false);
                        }
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className={`px-4 py-2 ${
                      !profileImage
                        ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    } rounded-md text-sm transition-colors duration-200`}
                    onClick={async () => {
                      if (!profileImage) return;

                      try {
                        setError(null);
                        setIsLoading(true);

                        await handleImageRemove();

                        setSuccessMessage(
                          "Profile picture removed successfully!"
                        );
                        setTimeout(() => {
                          setSuccessMessage(null);
                        }, 3000);
                      } catch (err) {
                        console.error("Error removing profile picture:", err);
                        setError(
                          err.message || "Failed to remove profile picture"
                        );
                        setTimeout(() => {
                          setError(null);
                        }, 5000);
                      } finally {
                        setIsLoading(false);
                      }
                    }}
                    disabled={!profileImage || isLoading}
                  >
                    {isLoading ? "Removing..." : "Remove"}
                  </button>
                </div>
              </div>

              {/* Form Section */}
              <div className="w-2/3 pl-8">
                <h2 className="text-[32px] font-LatoSemiBold text-[#161f55] mb-6">
                  Edit Profile
                </h2>

                {error && (
                  <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className="mb-4 p-2 bg-green-100 text-green-700 rounded">
                    {successMessage}
                  </div>
                )}

                <form className="flex flex-col" onSubmit={onSubmit}>
                  {/* Input Fields */}
                  <div className="mb-4 flex items-center justify-start">
                    <label className="block w-[145px] text-left font-LatoSemiBold text-[#161F55] font-medium">
                      First Name:
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="ml-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9]"
                      required
                    />
                  </div>{" "}
                  <div className="mb-4 flex items-center justify-start">
                    <label className="block w-[145px] text-left font-LatoSemiBold text-[#161F55] font-medium">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="ml-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9]"
                      required
                    />
                  </div>
                  <div className="mb-4 flex items-center justify-start">
                    <label className="block w-[145px] text-left font-LatoSemiBold text-[#161F55] font-medium">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="ml-4 w-full border border-gray-300 placeholder:text-[#000] placeholder:opacity-70 bg-[#D9D9D9] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div className="mb-4 flex items-center justify-start">
                    <label className="block w-[145px] text-left font-LatoSemiBold text-[#161F55] font-medium">
                      Password:
                    </label>
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className="ml-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9]"
                      placeholder="Leave blank to keep current password"
                    />
                  </div>
                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`px-6 py-2 bg-[#161f55] float-right text-white rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200 ${
                        isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "Updating..." : "Update"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Profile;
