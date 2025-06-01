import { useEffect, useState } from "react";
import { createStudent } from "../../services/studentServices";

const useAppInfo = (onNext) => {
  const LOCAL_STORAGE_KEY = "appInfoFormData";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

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

      if (key === "contactNumber" && !/^09\d{9}$/.test(trimmedValue)) {
        newErrors[key] = "Contact number must start with 09 and be 11 digits.";
      }

      if (key === "schoolYear" && !/^\d{4}\s*[-–]\s*\d{4}$/.test(trimmedValue)) {
        newErrors[key] = "School year format should be YYYY-YYYY";
      }
    }

    return newErrors;
  };
  const handleNext = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create student record
      const studentData = {
        surname: formData.surname.trim(),
        firstName: formData.firstName.trim(),
        middleName: formData.middleName.trim(),
        lastSchoolYearAttended: formData.schoolYear.trim(),
        courseOrStrand: formData.course.trim(),
        presentAddress: formData.address.trim(),
        contactNumber: formData.contactNumber.trim(),
        emailAddress: formData.email.trim().toLowerCase(),
      };

      const response = await createStudent(studentData);
      
      // Store the student ID for later use
      localStorage.setItem('studentId', response.studentId);
      
      // Prepare name and transaction number for feedback
      const fullName = `${formData.firstName.trim()} ${formData.middleName.trim()} ${formData.surname.trim()}`.trim();
      
      // Move to next step with name and transaction number
      onNext(undefined, {
        name: fullName,
        transactionNumber: response.studentId
      });
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error.message || 'Failed to create student record'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

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
    isSubmitting,
    handleInputChange,
    handleNext,
    clearSavedData,
  };
};

export default useAppInfo;
