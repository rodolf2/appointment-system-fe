import { useState, useEffect } from "react";

const useProfileForm = () => {
    // Form state with localStorage persistence
    const [formData, setFormData] = useState(() => {
        const savedData = localStorage.getItem("profileFormData");
        return savedData
            ? JSON.parse(savedData)
            : {
                firstName: "",
                middleName: "",
                lastName: "",
                email: "",
                password: "",
            };
    });

    // Profile image state with localStorage persistence
    const [profileImage, setProfileImage] = useState(() => {
        const savedImage = localStorage.getItem("profileImage");
        return savedImage || null;
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
    };

    return {
        formData,
        profileImage,
        handleInputChange,
        handleImageUpload,
        handleImageRemove,
        clearProfileData,
    };
};

export default useProfileForm;