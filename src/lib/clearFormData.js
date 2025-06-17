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

  // Clear appointment purpose
  localStorage.removeItem("appointmentPurpose");

  // Clear current booking state
  localStorage.removeItem("currentBooking");

  // Clear last booking response
  localStorage.removeItem("lastBookingResponse");

  console.log("All form data cleared from localStorage");
};
