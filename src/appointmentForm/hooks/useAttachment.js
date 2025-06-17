import { useRef, useState, useEffect } from "react";
import { uploadAttachments } from "../../services/attachmentServices";

const useAttachment = (onNext) => {
  const [files, setFiles] = useState([]);
  const fileInputRef = useRef(null);
  const [error, setError] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  // Load files from localStorage on mount
  useEffect(() => {
    const savedFiles = localStorage.getItem("uploadedFiles");
    if (savedFiles) {
      try {
        const parsedFiles = JSON.parse(savedFiles);
        setFiles(parsedFiles);
      } catch (e) {
        console.error("Failed to parse saved files", e);
      }
    }
  }, []);

  // Save files to localStorage when they change
  useEffect(() => {
    if (files.length > 0) {
      localStorage.setItem("uploadedFiles", JSON.stringify(files));
    } else {
      localStorage.removeItem("uploadedFiles");
    }
  }, [files]);

  const handleFileChange = (event) => {
    if (!event.target.files) return;

    const selectedFiles = Array.from(event.target.files);

    // Filter only image files
    const imageFiles = selectedFiles.filter((file) =>
      file.type.match("image.*")
    );

    if (imageFiles.length !== selectedFiles.length) {
      setError("Only image files (JPG, PNG, GIF, etc.) are allowed");
      return;
    }

    // Check if adding these files would exceed the 3-file limit
    const totalFilesAfterAdd = files.length + imageFiles.length;
    if (totalFilesAfterAdd > 3) {
      setError("You can only upload a maximum of 3 files");
      return;
    }

    setFiles((prev) => [...prev, ...imageFiles]);
    setError("");
  };

  const handleAddFile = () => {
    if (files.length >= 3) {
      setError("Maximum of 3 files reached");
      return;
    }
    fileInputRef.current.click();
  };

  const handleRemoveFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setError("");
  };

  const handleNext = async () => {
    if (files.length === 0) {
      setError("You need to upload at least one file to proceed");
      return;
    }

    try {
      setIsUploading(true);
      setError("");

      // Get student ID from localStorage (set during AppInfo step)
      let studentId = localStorage.getItem("studentId");

      console.log("Retrieved student ID from localStorage:", studentId);

      // If studentId is not found, we'll still attempt upload and let the backend resolve it
      if (!studentId) {
        console.warn(
          "Student ID not found in localStorage, backend will attempt to resolve it"
        );
        studentId = undefined; // Let backend handle the resolution
      }

      // Upload files to server
      const result = await uploadAttachments(files, studentId);
      console.log("Upload result:", result);

      // Store the successful upload info
      if (result.studentInfo) {
        localStorage.setItem("studentId", result.studentInfo.id);
        console.log(
          "Updated student ID in localStorage:",
          result.studentInfo.id
        );
      }

      // Keep the files in localStorage until the form is fully submitted
      // They will be cleared after successful form submission

      // Move to next step
      onNext();
    } catch (err) {
      console.error("Upload error:", err);
      setError(err.message || "Failed to upload files. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  return {
    files,
    fileInputRef,
    error,
    isUploading,
    handleFileChange,
    handleAddFile,
    handleRemoveFile,
    handleNext,
  };
};

export default useAttachment;
