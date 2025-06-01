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
    }

    // Initialize from user context if available
    if (user) {
      const [firstName, middleName, lastName] = (user.name || "").split(" ");
      return {
        firstName: firstName || "",
        middleName: middleName || "",
        lastName: lastName || "",
        email: user.email || "",
        password: "",
      };
    }

    return {
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      password: "",
    };
  });

  // Profile image state with user context initialization
  const [profileImage, setProfileImage] = useState(() => {
    const storageKey = getStorageKey("profileImage");
    if (storageKey) {
      const savedImage = localStorage.getItem(storageKey);
      if (savedImage) {
        return savedImage;
      }
    }
    return user?.picture || user?.profilePicture || null;
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

  // Save image to localStorage whenever it changes
  useEffect(() => {
    const storageKey = getStorageKey("profileImage");
    if (storageKey) {
      if (profileImage) {
        localStorage.setItem(storageKey, profileImage);
      } else {
        localStorage.removeItem(storageKey);
      }
    }
  }, [profileImage, user?.id]);

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
        // Get token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error(
            "Authentication token not found. Please sign in again."
          );
        }

        // Upload the profile picture to the server
        const uploadResponse = await uploadProfilePicture(user.id, file, token);
        const imageUrl = uploadResponse.profilePicture;

        // Update local state with the new image URL
        setProfileImage(imageUrl);

        // Update user context with new image URL
        updateUser({
          ...user,
          picture: imageUrl,
          profilePicture: imageUrl,
        });
      } catch (error) {
        console.error("Error uploading profile picture:", error);
        throw new Error("Failed to upload profile picture. Please try again.");
      }
    }
  };

  // Handle image removal
  const handleImageRemove = async () => {
    try {
      // Get token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error(
          "Authentication token not found. Please sign in again."
        );
      }

      // Delete the profile picture from the server
      await deleteProfilePicture(user.id, token);

      // Clear the image from state
      setProfileImage(null);

      // Update user context to reflect removal
      updateUser({
        ...user,
        picture: null,
        profilePicture: null,
      });
    } catch (error) {
      console.error("Error removing profile picture:", error);
      throw new Error("Failed to remove profile picture. Please try again.");
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    // Construct full name
    const fullName = [
      formData.firstName,
      formData.middleName,
      formData.lastName,
    ]
      .filter(Boolean)
      .join(" ");

    if (!fullName.trim()) {
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

      // Update user context with new data
      updateUser({
        ...user,
        ...updatedUser.user,
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
      middleName: "",
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
