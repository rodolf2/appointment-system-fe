import { useState, useEffect } from "react";
import { useUser } from "../../../../context/UserContext.jsx";
import {
  uploadProfilePicture,
  updateUserProfile,
  deleteProfilePicture,
} from "../../../../services/userServices";

const useProfileForm = () => {
  const { user, updateUser } = useUser();

  // Create user-specific storage keys
  const getStorageKey = (key) => {
    return user?.id ? `${key}_${user.id}` : null;
  };

  // Form state with localStorage and user context initialization
  const [formData, setFormData] = useState(() => {
    const storageKey = getStorageKey("profileFormData");
    if (storageKey) {
      const savedData = localStorage.getItem(storageKey);
      if (savedData) {
        return JSON.parse(savedData);
      }
    } // Initialize from user context if available
    if (user) {
      const [firstName, lastName] = (user.name || "").split(" ");
      return {
        firstName: firstName || "",
        lastName: lastName || "",
        email: user.email || "",
        password: "",
      };
    }

    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    };
  });
  // Profile image state with user context initialization
  const [profileImage, setProfileImage] = useState(() => {
    // Prioritize the current user context data over localStorage
    if (user?.picture || user?.profilePicture) {
      return user.picture || user.profilePicture;
    }
    return null;
  });

  // Clear previous user's data when user changes
  useEffect(() => {
    if (user?.id) {
      // Clear any existing profile data that doesn't belong to the current user
      Object.keys(localStorage).forEach((key) => {
        if (
          (key.startsWith("profileFormData_") ||
            key.startsWith("profileImage_")) &&
          !key.endsWith(user.id)
        ) {
          localStorage.removeItem(key);
        }
      });
    }
  }, [user?.id]);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    const storageKey = getStorageKey("profileFormData");
    if (storageKey && Object.keys(formData).some((key) => formData[key])) {
      localStorage.setItem(storageKey, JSON.stringify(formData));
    }
  }, [formData, user?.id]);
  // Update user context whenever profile image changes
  useEffect(() => {
    if (
      user?.id &&
      (profileImage !== user.picture || profileImage !== user.profilePicture)
    ) {
      updateUser({
        ...user,
        picture: profileImage,
        profilePicture: profileImage,
      });
    }
  }, [profileImage]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image upload
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          throw new Error("Please upload an image file");
        }

        // Validate file size (max 5MB)
        const maxSize = 5 * 1024 * 1024; // 5MB in bytes
        if (file.size > maxSize) {
          throw new Error("Image size should be less than 5MB");
        }

        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error(
            "Authentication token not found. Please sign in again."
          );
        }

        console.log("🔄 Starting profile picture upload...");

        // Upload the profile picture to the server
        const uploadResponse = await uploadProfilePicture(user.id, file, token);
        console.log("📤 Upload response received:", uploadResponse);
        console.log("📤 Response type:", typeof uploadResponse);
        console.log("📤 Response keys:", Object.keys(uploadResponse || {}));
        console.log("📤 profilePicture:", uploadResponse?.profilePicture);
        console.log(
          "📤 cloudinaryPublicId:",
          uploadResponse?.cloudinaryPublicId
        );

        // Extract cloudinaryPublicId from URL if not provided by server
        let cloudinaryPublicId = uploadResponse?.cloudinaryPublicId;
        if (!cloudinaryPublicId && uploadResponse?.profilePicture) {
          try {
            // Extract from Cloudinary URL: https://res.cloudinary.com/.../upload/v123/folder/public_id.ext
            const url = uploadResponse.profilePicture;
            const urlParts = url.split("/");
            const uploadIndex = urlParts.findIndex((part) => part === "upload");
            if (uploadIndex !== -1 && uploadIndex + 2 < urlParts.length) {
              const publicIdParts = urlParts.slice(uploadIndex + 2);
              const fullPath = publicIdParts.join("/");
              cloudinaryPublicId = fullPath.replace(/\.[^/.]+$/, "");
              console.log(
                "🔧 Frontend extracted cloudinaryPublicId:",
                cloudinaryPublicId
              );
            }
          } catch (error) {
            console.error(
              "Error extracting cloudinaryPublicId from URL:",
              error
            );
          }
        }

        if (!uploadResponse?.profilePicture) {
          console.error("❌ Invalid response structure:", {
            hasProfilePicture: !!uploadResponse?.profilePicture,
            hasCloudinaryPublicId: !!cloudinaryPublicId,
            fullResponse: uploadResponse,
          });
          throw new Error("Invalid response from server");
        }

        // Update local state with the new image URL
        setProfileImage(uploadResponse.profilePicture);

        // Update user context with new image URL and Cloudinary ID
        updateUser({
          ...user,
          picture: uploadResponse.profilePicture,
          profilePicture: uploadResponse.profilePicture,
          cloudinaryPublicId: cloudinaryPublicId,
        });

        return uploadResponse.profilePicture;
      } catch (error) {
        console.error("❌ Error uploading profile picture:", error);
        throw new Error(
          error.message || "Failed to upload profile picture. Please try again."
        );
      }
    }
  };

  // Handle image removal
  const handleImageRemove = async () => {
    try {
      console.log("🗑️ Starting profile picture removal process...");

      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error(
          "Authentication token not found. Please sign in again."
        );
      }

      // Check if there's an image to delete
      if (!user?.id) {
        throw new Error("User ID not found. Please sign in again.");
      }

      if (!profileImage && !user.profilePicture && !user.picture) {
        throw new Error("No profile picture to remove.");
      }

      // Delete the profile picture from the server
      const response = await deleteProfilePicture(user.id, token);
      console.log("✅ Profile picture deleted from server:", response);

      // Clear the image from local storage
      const imageKey = getStorageKey("profileImage");
      if (imageKey) {
        localStorage.removeItem(imageKey);
      }

      // Clear the image from state
      setProfileImage(null);

      // Update user context to reflect removal
      updateUser({
        ...user,
        picture: null,
        profilePicture: null,
        cloudinaryPublicId: null,
      });

      console.log("✅ Profile picture removed successfully");
      return response;
    } catch (error) {
      console.error("❌ Error removing profile picture:", error);
      throw new Error(
        error.message || "Failed to remove profile picture. Please try again."
      );
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Construct full name
    const fullName = `${formData.firstName || ""} ${
      formData.lastName || ""
    }`.trim();

    if (!fullName) {
      throw new Error("Name is required");
    }

    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error(
          "Authentication token not found. Please sign in again."
        );
      }

      const userData = {
        name: fullName,
        email: formData.email,
        picture: profileImage,
        profilePicture: profileImage,
      };

      if (formData.password) {
        userData.password = formData.password;
      }

      if (!user?.id) {
        throw new Error("User ID not found. Please sign in again.");
      }

      // Update profile
      const updatedUser = await updateUserProfile(user.id, userData, token);

      // Update user context with new data, ensuring picture/profilePicture are synced
      updateUser({
        ...user,
        ...updatedUser.user,
        name: fullName,
        picture: profileImage || updatedUser.user.profilePicture,
        profilePicture: profileImage || updatedUser.user.profilePicture,
      });

      // Reset password field after successful update
      setFormData((prev) => ({
        ...prev,
        password: "",
      }));

      return updatedUser;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  // Clear all saved data
  const clearProfileData = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setProfileImage(null);

    // Clear user-specific data from localStorage
    const formDataKey = getStorageKey("profileFormData");
    const imageKey = getStorageKey("profileImage");
    if (formDataKey) localStorage.removeItem(formDataKey);
    if (imageKey) localStorage.removeItem(imageKey);
  };

  return {
    formData,
    profileImage,
    handleInputChange,
    handleImageUpload,
    handleImageRemove,
    clearProfileData,
    handleSubmit,
  };
};

export default useProfileForm;
