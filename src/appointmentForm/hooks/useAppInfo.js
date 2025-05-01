import { useState } from "react";
import { db } from "/src/firebase";
import { collection, addDoc } from "firebase/firestore"; // Firestore functions

const useAppInfo = (onNext) => {
  const [formData, setFormData] = useState({
    surname: "",
    firstName: "",
    middleName: "",
    schoolYear: "",
    course: "",
    address: "",
    contactNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState({}); // Object to track errors for each field

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Ensure Contact Number only accepts numeric input
    if (name === "contactNumber" && !/^[0-9]*$/.test(value)) {
      return;
    }

    // Apply character limits
    if (name === "schoolYear" && value.length > 10) {
      setErrors((prev) => ({
        ...prev,
        schoolYear: "Maximum 10 characters allowed.",
      }));
      return;
    }

    if (name === "course" && value.length > 30) {
      setErrors((prev) => ({
        ...prev,
        course: "Maximum 30 characters allowed.",
      }));
      return;
    }

    if (name === "address" && value.length > 50) {
      setErrors((prev) => ({
        ...prev,
        address: "Maximum 50 characters allowed.",
      }));
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    // Check if fields are empty
    for (const key in formData) {
      if (formData[key].trim() === "") {
        newErrors[key] = "This field is required.";
      }
    }

    // Ensure Contact Number is numeric and 11 digits
    if (!/^\d{11}$/.test(formData.contactNumber)) {
      newErrors.contactNumber =
        "Contact Number must be 11 digits and contain only numbers.";
    }

    // Email validation
    if (!formData.email.trim() === "") {
      newErrors.email = "Required Field.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const docRef = await addDoc(collection(db, "information"), {
          ...formData,
        });
        console.log("Document written with ID: ", docRef.id);
        onNext();
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    }
  };

  return {
    formData,
    errors,
    handleInputChange,
    handleNext,
  };
};

export default useAppInfo;
