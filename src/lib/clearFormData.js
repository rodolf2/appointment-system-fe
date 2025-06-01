/**
 * Clears all form data from localStorage when appointment process is completed
 */
export const clearAllFormData = () => {
  // Clear AppInfo data
  localStorage.removeItem("appInfoFormData");
  
  // Clear uploaded files
  localStorage.removeItem("uploadedFiles");
  
  // Clear student ID
  localStorage.removeItem("studentId");
  
  // Clear selected documents data
  localStorage.removeItem("selectedDocuments");

  // Clear any other form data that might be stored
  localStorage.removeItem("appointmentSchedule");
};
