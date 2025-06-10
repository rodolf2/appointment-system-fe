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
    setError(null);
    setSuccessMessage(null);
    setIsSubmitting(true);

    try {
      console.log("Starting profile update...");
      await handleSubmit();
      setSuccessMessage("Profile updated successfully!.");

      // Reset form submission state after a brief delay
      setTimeout(() => {
        setSuccessMessage(null);
      }, 5000); // Clear success message after 5 seconds
    } catch (err) {
      console.error("Profile submission error:", err);
      setError(
        err.message ||
          "Failed to update profile. Please try signing out and back in."
      );
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
                      onLoad={() => {
                        console.log(
                          "✅ Profile image loaded successfully:",
                          profileImage
                        );
                      }}
                      onError={(e) => {
                        console.error(
                          "❌ Failed to load profile image:",
                          profileImage
                        );
                        console.error("Error details:", e);

                        // If it's a Google profile picture, try alternative URL
                        if (
                          profileImage &&
                          profileImage.includes("googleusercontent.com")
                        ) {
                          console.log(
                            "🔄 Trying alternative Google profile picture URL..."
                          );
                          const baseUrl = profileImage.split("=")[0];
                          e.target.src = baseUrl + "=s400-c";

                          // If that fails too, use default
                          e.target.onerror = () => {
                            e.target.onerror = null;
                            e.target.src = "/assets/icons/UploadIcon.svg";
                            console.log("🔄 Using default upload icon");
                          };
                        } else {
                          // For non-Google URLs, use default
                          e.target.onerror = null;
                          e.target.src = "/assets/icons/UploadIcon.svg";
                        }
                      }}
                    />
                  ) : (
                    <img
                      src="/assets/icons/UploadIcon.svg"
                      alt="Default Profile"
                      className="w-8 h-8 object-cover"
                    />
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <label className="px-4 py-2 bg-[#161f55] text-white rounded-md text-sm hover:bg-blue-700 transition duration-200 cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={async (e) => {
                        try {
                          setError(null);
                          await handleImageUpload(e);
                          setSuccessMessage(
                            "Profile picture updated successfully!"
                          );
                          setTimeout(() => {
                            setSuccessMessage(null);
                          }, 3000);
                        } catch (err) {
                          setError(
                            err.message || "Failed to upload profile picture"
                          );
                        }
                      }}
                    />
                  </label>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm"
                    onClick={async () => {
                      try {
                        setError(null);
                        await handleImageRemove();
                        setSuccessMessage(
                          "Profile picture removed successfully!"
                        );
                        setTimeout(() => {
                          setSuccessMessage(null);
                        }, 3000);
                      } catch (err) {
                        setError(
                          err.message || "Failed to remove profile picture"
                        );
                      }
                    }}
                  >
                    Remove
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
                  </div>
                  <div className="mb-4 flex items-center justify-start">
                    <label className="block w-[145px] text-left font-LatoSemiBold text-[#161F55]">
                      Middle Name:
                    </label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleInputChange}
                      className="ml-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9]"
                    />
                  </div>
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
