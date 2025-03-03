import React, { useState } from "react";
import Header from "/src/features/admin/components/Header";
import Sidebar from "/src/components/Sidebar";
import Footer from "/src/features/admin/components/Footer";

const Profile = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(null); // State for profile image

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result); // Set the uploaded image's data URL
      };
      reader.readAsDataURL(file); // Convert image to data URL
    }
  };

  const handleImageRemove = () => {
    setProfileImage(null); // Remove the uploaded image
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
                    />
                  ) : (
                    <span className="text-gray-400 text-5xl">👤</span>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <label className="px-4 py-2 bg-[#161f55] text-white rounded-md text-sm hover:bg-blue-700 transition duration-200 cursor-pointer">
                    Upload
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                  <button
                    type="button"
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md text-sm"
                    onClick={handleImageRemove}
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
                <form className="flex flex-col ">
                  {/* Input Fields */}
                  <div className="mb-4 flex items-center justify-start">
                    <label className="block w-[145px] text-left font-LatoSemiBold text-[#161F55] font-medium">
                      First Name:
                    </label>
                    <input
                      type="text"
                      className="ml-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9]"
                    />
                  </div>
                  <div className="mb-4 flex items-center justify-start">
                    <label className="block w-[145px] text-left font-LatoSemiBold text-[#161F55]">
                      Middle Name:
                    </label>
                    <input
                      type="text"
                      className="ml-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9]"
                    />
                  </div>
                  <div className="mb-4 flex items-center justify-start">
                    <label className="block w-[145px] text-left font-LatoSemiBold text-[#161F55] font-medium">
                      Last Name:
                    </label>
                    <input
                      type="text"
                      className="ml-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9]"
                    />
                  </div>
                  <div className="mb-4 flex items-center justify-start">
                    <label className="block w-[145px] text-left font-LatoSemiBold text-[#161F55] font-medium">
                      Email Address:
                    </label>
                    <input
                      type="email"
                      className="ml-4 w-full border border-gray-300 placeholder:text-[#000] placeholder:opacity-70 bg-[#D9D9D9] p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="mb-4 flex items-center justify-start">
                    <label className="block w-[145px] text-left font-LatoSemiBold text-[#161F55] font-medium">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="ml-4 w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-[#D9D9D9]"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="text-center">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#161f55] float-right text-white rounded-md text-sm font-medium hover:bg-blue-700 transition duration-200"
                    >
                      Update
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
