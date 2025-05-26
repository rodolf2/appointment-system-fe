import { useState, useEffect } from "react";
import { useUser } from "../../../../context/UserContext";
import emailService from "../../../../services/emailServices";

const useProfileForm = () => {
  const { user, updateUser } = useUser();

  // Form state with localStorage and user context initialization
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("profileFormData");
    if (savedData) {
      return JSON.parse(savedData);
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
    const savedImage = localStorage.getItem("profileImage");
    return savedImage || user?.picture || null;
  });

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("profileFormData", JSON.stringify(formData));
  }, [formData]);

  // Save image to localStorage whenever it changes
  useEffect(() => {
    if (profileImage) {
      localStorage.setItem("profileImage", profileImage);
    } else {
      localStorage.removeItem("profileImage");
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
        throw new Error("Authentication token not found");
      }

      let updatedUser;
      const userData = {
        name: fullName,
        email: formData.email,
        picture: profileImage,
      };

      if (formData.password) {
        userData.password = formData.password;
      }

      if (!user?.id) {
        // Create new profile if user doesn't exist
        updatedUser = await emailService.signup({
          ...userData,
          password: formData.password || Math.random().toString(36).slice(-8), // Generate random password if none provided
        });
      } else {
        // Update existing profile
        updatedUser = await emailService.updateUser(user.id, userData, token);
      }

      // Update user context with new data
      updateUser({
        id: updatedUser.id || user?.id,
        name: fullName,
        email: formData.email,
        picture: profileImage,
      });

      return updatedUser;
    } catch (error) {
      console.error("Error updating profile:", error);
      throw error;
    }
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle image removal
  const handleImageRemove = () => {
    setProfileImage(null);
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
    localStorage.removeItem("profileFormData");
    localStorage.removeItem("profileImage");
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
