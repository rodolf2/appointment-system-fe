import { useState, useEffect } from "react";
import { createDocumentRequest } from "../../services/documentRequestServices";

const useSelectDocuments = (onNext) => {
  const LOCAL_STORAGE_KEY = "selectDocumentsFormData";

  // Initialize state from localStorage or with defaults
  const [state, setState] = useState(() => {
    const savedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return savedData
      ? JSON.parse(savedData)
      : {
          showModal: false,
          selectedDocuments: [],
          purpose: "",
          date: "",
          claimOption: null,
        };
  });

  const [errors, setErrors] = useState({});

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Clear specific errors when values change
  useEffect(() => {
    if (state.purpose.trim()) {
      setErrors((prev) => ({ ...prev, purpose: "" }));
    }
    if (state.date) {
      setErrors((prev) => ({ ...prev, date: "" }));
    }
    if (state.selectedDocuments.length > 0) {
      setErrors((prev) => ({ ...prev, selectedDocuments: "" }));
    }
  }, [state.purpose, state.date, state.selectedDocuments]);

  const documentsList = [
    { label: "Certificate of Enrollment", value: "Certificate of Enrollment" },
    { label: "Good Moral Certificate", value: "Good Moral Certificate" },
    { label: "Form 137", value: "Form 137" },
    {
      label: "Certified True Copy of Documents",
      value: "Certified True Copy of Documents",
    },
    { label: "Transcript of Records", value: "Transcript of Records" },
    {
      label: "Education Service Contracting Certificate",
      value: "Education Service Contracting Certificate",
    },
  ];

  // Helper to update state and automatically persist
  const updateState = (updates) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  // Handle Document Selection
  const handleDocumentSelection = (value) => {
    updateState({
      selectedDocuments: state.selectedDocuments.includes(value)
        ? state.selectedDocuments.filter((doc) => doc !== value)
        : [...state.selectedDocuments, value],
    });
  };

  // Remove Document
  const removeDocument = (value) => {
    updateState({
      selectedDocuments: state.selectedDocuments.filter((doc) => doc !== value),
    });
  };

  // Form Validation
  const handleValidation = () => {
    let newErrors = {};
    if (state.selectedDocuments.length === 0)
      newErrors.selectedDocuments = "Please select at least one document.";
    if (!state.purpose.trim()) newErrors.purpose = "This field is required.";
    if (!state.date) newErrors.date = "Please select a date.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next Button
  const handleNext = () => {
    if (handleValidation()) {
      updateState({ showModal: true });
    }
  };

  // Handle Claim Option
  const handleClaimOption = (option) => {
    updateState({ claimOption: option });
  };

  // Convert selected documents from values to proper format
  const convertSelectedDocuments = () => {
    return state.selectedDocuments; // No need to convert since values now match the schema
  };

  // Handle Modal Next Button with API integration
  const handleModalNext = async () => {
    try {
      // Prepare the document request data
      const studentId = localStorage.getItem("studentId");
      console.log("Student ID from localStorage:", studentId);

      const requestData = {
        selectedDocuments: convertSelectedDocuments(),
        purpose: state.purpose,
        dateOfRequest: state.date,
        studentId: studentId,
      };

      // Debug logging
      console.log("Creating document request with data:", requestData);

      // Create the document request
      const response = await createDocumentRequest(requestData);
      console.log("Document request created successfully:", response);

      // Clear the form data after successful submission
      clearSavedData();

      // Update UI and navigate
      updateState({ showModal: false });
      if (state.claimOption === "personal") {
        onNext(5);
      } else if (state.claimOption === "authorized") {
        onNext(4);
      }
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        submit: error.message || "Failed to submit document request",
      }));
      updateState({ showModal: false });
    }
  };

  // Clear saved data when needed (e.g., after successful submission)
  const clearSavedData = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  };

  return {
    showModal: state.showModal,
    selectedDocuments: state.selectedDocuments,
    purpose: state.purpose,
    setPurpose: (value) => updateState({ purpose: value }),
    date: state.date,
    setDate: (value) => updateState({ date: value }),
    errors,
    setErrors,
    claimOption: state.claimOption,
    documentsList,
    handleDocumentSelection,
    removeDocument,
    handleNext,
    handleClaimOption,
    handleModalNext,
    setShowModal: (value) => updateState({ showModal: value }),
    clearSavedData,
  };
};

export default useSelectDocuments;
