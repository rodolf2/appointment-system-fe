import { useRef, useState } from "react";

const useAttachment = (onNext) => {
  const [files, setFiles] = useState([]); // To store selected files
  const fileInputRef = useRef(null); // Reference to the hidden file input
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
    setError(""); // Clear error when a file is added
  };

  const handleAddFile = () => {
    fileInputRef.current.click(); // Simulate a click on the hidden file input
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleNext = () => {
    if (files.length === 0) {
      setError("You need to upload at least one file to proceed");
    } else {
      setError("");
      onNext(); // Proceed to the next step
    }
  };

  return {
    files,
    fileInputRef,
    error,
    handleFileChange,
    handleAddFile,
    handleRemoveFile,
    handleNext,
  };
};

export default useAttachment;
