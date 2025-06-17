import { useState, useEffect } from "react";

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
  

  // Handle Modal Next Button (no API calls or data persistence)
  const handleModalNext = () => {
    if (!state.claimOption) {
      setClaimOptionError("Please select a claim option.");
      return;
    }

    setClaimOptionError(""); // Clear if valid

    // Update UI and navigate (no data persistence)
    updateState({ showModal: false });
    if (state.claimOption === "personal") {
      onNext(5); // Calendar page
    } else if (state.claimOption === "authorized") {
      onNext(4); // Attachment page
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
  };
};

export default useSelectDocuments;
