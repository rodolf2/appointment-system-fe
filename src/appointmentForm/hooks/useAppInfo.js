import { useEffect, useState } from "react";

const useAppInfo = (onNext) => {
  const LOCAL_STORAGE_KEY = "appInfoFormData";

  // Initialize state with default values or from localStorage
  const [formData, setFormData] = useState(() => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData
      ? JSON.parse(storedData)
      : {
          surname: "",
          firstName: "",
          middleName: "",
          schoolYear: "",
          course: "",
          address: "",
          contactNumber: "",
          email: "",
        };
  });

  const [errors, setErrors] = useState({});

  // Save to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    // Special handling for contact number
    if (name === "contactNumber") {
      processedValue = value.replace(/\D/g, ""); // Remove non-digits
      processedValue = processedValue.slice(0, 11); // Limit to 11 digits
    }

    setFormData((prev) => ({ ...prev, [name]: processedValue }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    for (const [key, value] of Object.entries(formData)) {
      const trimmedValue = value.trim();

      if (!trimmedValue) {
        newErrors[key] = "This field is required.";
        continue;
      }

      if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)) {
        newErrors[key] = "Invalid email format.";
      }

      if (key === "contactNumber" && !/^\d{11}$/.test(trimmedValue)) {
        newErrors[key] = "Contact number must be exactly 11 digits.";
      }
    }

    return newErrors;
  };

  const handleNext = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onNext();
  };

  // Add a function to clear saved data when needed
  const clearSavedData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
    setFormData({
      surname: "",
      firstName: "",
      middleName: "",
      schoolYear: "",
      course: "",
      address: "",
      contactNumber: "",
      email: "",
    });
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleNext,
    clearSavedData,
  };
};

export default useAppInfo;
