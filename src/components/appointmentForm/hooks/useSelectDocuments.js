// /src/hooks/useSelectDocuments.js
import { useState } from "react";

const useSelectDocuments = (onNext) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedDocuments, setSelectedDocuments] = useState([]);
  const [purpose, setPurpose] = useState("");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState({});
  const [claimOption, setClaimOption] = useState(null);

  const documentsList = [
    { label: "Certificate of Enrollment", value: "certificate_of_enrollment" },
    { label: "Good Moral Certificate", value: "good_moral_certificate" },
    { label: "Form 137", value: "form_137" },
    { label: "Certified True Copy of Documents", value: "certified_copy" },
    { label: "Transcript of Records", value: "transcript_of_records" },
    {
      label: "Education Service Contracting Certificate",
      value: "education_service_contracting_certificate",
    },
  ];

  // Handle Document Selection
  const handleDocumentSelection = (value) => {
    setSelectedDocuments((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((doc) => doc !== value)
        : [...prevSelected, value]
    );
    setErrors((prevErrors) => ({ ...prevErrors, selectedDocuments: "" }));
  };

  // Remove Document
  const removeDocument = (value) => {
    setSelectedDocuments((prevSelected) =>
      prevSelected.filter((doc) => doc !== value)
    );
  };

  // Form Validation
  const handleValidation = () => {
    let newErrors = {};
    if (selectedDocuments.length === 0)
      newErrors.selectedDocuments = "Please select at least one document.";
    if (!purpose.trim()) newErrors.purpose = "This field is required.";
    if (!date) newErrors.date = "Please select a date.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle Next Button
  const handleNext = () => {
    if (handleValidation()) {
      setShowModal(true);
    }
  };

  // Handle Claim Option
  const handleClaimOption = (option) => {
    setClaimOption(option);
  };

  // Handle Modal Next Button
  const handleModalNext = () => {
    setShowModal(false);
    if (claimOption === "personal") {
      onNext(5);
    } else if (claimOption === "authorized") {
      onNext(4);
    }
  };

  return {
    showModal,
    setShowModal,
    selectedDocuments,
    purpose,
    date,
    errors,
    setErrors,
    claimOption,
    documentsList,
    handleDocumentSelection,
    removeDocument,
    setPurpose,
    setDate,
    handleNext,
    handleClaimOption,
    handleModalNext,
  };
};

export default useSelectDocuments;
