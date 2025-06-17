import { useState, useEffect } from "react";
import { createDocumentRequest } from "../../services/documentRequestServices";

const useSelectDocuments = (onNext) => {
  // Initialize state with defaults (no localStorage persistence)
  const [state, setState] = useState({
    showModal: false,
    selectedDocuments: [],
    purpose: "",
    date: "",
    claimOption: null,
  });
  const [claimOptionError, setClaimOptionError] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
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
    if (state.claimOption) {
      setErrors((prev) => ({ ...prev, claimOption: "" }));
    }
  }, [state.purpose, state.date, state.selectedDocuments, state.claimOption]);

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

  // Helper to update state (no persistence)
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

    // Check for documents selection
    if (state.selectedDocuments.length === 0) {
      newErrors.selectedDocuments = "Please select at least one document.";
    }

    // Check for purpose with trimmed spaces
    if (!state.purpose.trim()) {
      newErrors.purpose = "This field is required.";
    }

    // Check for date
    if (!state.date) {
      newErrors.date = "Please select a date.";
    }

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
    setClaimOptionError(""); // Clear error once user selects
  };

  // Handle Modal Next Button - Create document request and navigate
  const handleModalNext = async () => {
    if (!state.claimOption) {
      setClaimOptionError("Please select a claim option.");
      return;
    }

    setClaimOptionError(""); // Clear if valid
    setIsSubmitting(true);

    try {
      // Get student ID from localStorage (created in AppInfo step)
      const studentId = localStorage.getItem("studentId");
      if (!studentId) {
        throw new Error(
          "Student information not found. Please complete the previous steps."
        );
      }

      // Create document request
      const documentRequestData = {
        studentId: studentId,
        selectedDocuments: state.selectedDocuments,
        purpose: state.purpose,
        dateOfRequest: state.date,
      };

      console.log("Creating document request:", documentRequestData);
      const response = await createDocumentRequest(documentRequestData);
      console.log("Document request created successfully:", response);

      // Store document request data for later use in appointment scheduling
      localStorage.setItem("documentRequestId", response._id || response.id);
      localStorage.setItem("appointmentPurpose", state.purpose);
      localStorage.setItem(
        "selectedDocuments",
        JSON.stringify(state.selectedDocuments)
      );

      // Update UI and navigate
      updateState({ showModal: false });
      if (state.claimOption === "personal") {
        onNext(5); // Calendar page
      } else if (state.claimOption === "authorized") {
        onNext(4); // Attachment page
      }
    } catch (error) {
      console.error("Error creating document request:", error);
      setErrors({
        general:
          error.message ||
          "Failed to create document request. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
    claimOptionError,
    setClaimOptionError,
    isSubmitting,
  };
};

export default useSelectDocuments;
