import { useState, useEffect, useCallback } from "react";
import { useUser } from "../../../../context/UserContext";

const useAppointment = () => {
  // Get user context for admin name
  const { user } = useUser();
  // States for data fetching
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // States for filtering and search
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Filter by");
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  // Success modal state
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  // Function to determine status color
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-[#F3BC62]";
      case "APPROVED":
        return "bg-[#299057]";
      case "REJECTED":
        return "bg-[#D52121]";
      case "COMPLETED":
        return "bg-[#354CCE]";
      default:
        return "bg-gray-500";
    }
  };

  // Function to determine transaction number color
  const getTransactionNumberColor = (status) => {
    switch (status) {
      case "PENDING":
        return "text-[#F3BC62]";
      case "APPROVED":
        return "text-[#299057]";
      case "REJECTED":
        return "text-[#D52121]";
      case "COMPLETED":
        return "text-[#354CCE]";
      default:
        return "text-gray-500";
    }
  };

  // Filter appointments based on search term and status filter
  const filteredAppointments = appointments.filter((data) => {
    const searchString = searchTerm.toLowerCase();
    const matchesSearch =
      data.transactionNumber?.toLowerCase().includes(searchString) ||
      data.request?.toLowerCase().includes(searchString) ||
      data.emailAddress?.toLowerCase().includes(searchString);

    // Only apply status filter if a specific status is selected
    if (selectedFilter === "Filter by") {
      return matchesSearch;
    }

    // Compare statuses in uppercase to ensure case-insensitive matching
    const appointmentStatus = data.status?.toUpperCase() || "";
    const filterStatus = selectedFilter.toUpperCase();

    return matchesSearch && appointmentStatus === filterStatus;
  });

  // Calculate pagination values
  const totalFilteredEntries = filteredAppointments.length;
  const calculatedTotalPages = Math.ceil(totalFilteredEntries / entriesPerPage);
  const startEntry =
    totalFilteredEntries > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0;
  const endEntry = Math.min(currentPage * entriesPerPage, totalFilteredEntries);

  // Generate page numbers array
  const pageNumbers = [];
  if (calculatedTotalPages > 0) {
    for (let i = 1; i <= calculatedTotalPages; i++) {
      pageNumbers.push(i);
    }
  }

  // Handlers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handleFilterChange = (e) => {
    setSelectedFilter(e.target.value);
    setCurrentPage(1);
  };

  const handleEntriesPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setEntriesPerPage(value);
      setCurrentPage(1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < calculatedTotalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Modal handlers
  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  // Appointment status handlers
  const deleteAppointment = async () => {
    if (selectedAppointment) {
      try {
        // Add archived flag and date to the appointment
        const archivedAppointment = {
          ...selectedAppointment,
          archived: true,
          archivedDate: new Date().toISOString(),
        };

        // Remove from active appointments
        setAppointments(
          appointments.filter((appt) => appt.id !== selectedAppointment.id)
        );

        // Store in localStorage for archived page to access
        const archivedAppointments = JSON.parse(
          localStorage.getItem("archivedAppointments") || "[]"
        );
        archivedAppointments.push(archivedAppointment);
        localStorage.setItem(
          "archivedAppointments",
          JSON.stringify(archivedAppointments)
        );

        // Remove from students table
        const studentsData = JSON.parse(
          localStorage.getItem("studentsData") || "[]"
        );
        const updatedStudents = studentsData.filter(
          (student) =>
            student.transactionNumber !== selectedAppointment.transactionNumber
        );
        localStorage.setItem("studentsData", JSON.stringify(updatedStudents));

        // Create notification for archiving appointment
        try {
          const adminName = user?.name || "Admin";
          const response = await fetch(
            `${import.meta.env.VITE_API_URL}/api/notifications/create`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              body: JSON.stringify({
                type: "user-action",
                userName: adminName,
                action: "archived the appointment of",
                reference: selectedAppointment.transactionNumber,
                status: "ARCHIVED",
                details: `Appointment with transaction number ${selectedAppointment.transactionNumber} has been archived`,
                read: false,
              }),
            }
          );

          if (!response.ok) {
            console.error("Failed to create archive notification");
          }
        } catch (notifError) {
          console.error("Error creating archive notification:", notifError);
        }

        closeModal();
      } catch (error) {
        console.error("Error deleting appointment:", error);
        alert("Failed to delete appointment. Please try again.");
      }
    }
  };
  const updateAppointmentStatus = async (appointment, newStatus) => {
    try {
      console.log("Updating status for appointment:", {
        transactionNumber: appointment.transactionNumber,
        currentStatus: appointment.status,
        newStatus: newStatus,
        emailAddress: appointment.emailAddress,
        name: appointment.name,
      });
      const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`; // Log the full URL being used
      const url = `${API_BASE_URL}/status/status/${appointment.transactionNumber}`;
      console.log("Request URL:", url);

      // Ensure appointmentDate is in proper format
      let formattedAppointmentDate = appointment.dateOfAppointment;
      if (
        formattedAppointmentDate &&
        formattedAppointmentDate !== "Not scheduled"
      ) {
        // If it's already a date string, try to parse and reformat it
        try {
          const date = new Date(formattedAppointmentDate);
          if (!isNaN(date.getTime())) {
            formattedAppointmentDate = date.toISOString();
          }
        } catch (e) {
          console.warn(
            "Could not parse appointmentDate:",
            formattedAppointmentDate
          );
        }
      }

      const adminName = user?.name || "Admin";
      console.log("Current user context:", user);
      console.log("Admin name being sent:", adminName);

      const requestBody = {
        transactionNumber: appointment.transactionNumber,
        status: newStatus,
        emailAddress: appointment.emailAddress,
        name: appointment.name,
        appointmentDate: formattedAppointmentDate,
        timeSlot: appointment.timeSlot,
        adminName: adminName, // Include admin name for notifications
      };

      console.log("Request body being sent:", requestBody);

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      console.log("Response status:", response.status);

      const responseText = await response.text();
      console.log("Raw response:", responseText);

      if (!response.ok) {
        let errorMessage = `Failed to update status: ${response.status} ${response.statusText}`;

        try {
          // Try to parse the response as JSON
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          // If it's not JSON and not HTML, use the raw text
          if (!responseText.includes("<!DOCTYPE")) {
            errorMessage = responseText;
          }
        }

        console.error("Error details:", {
          status: response.status,
          statusText: response.statusText,
          errorMessage: errorMessage,
        });

        throw new Error(errorMessage);
      }

      // Try to parse the success response
      let updatedData;
      try {
        updatedData = JSON.parse(responseText);
      } catch (_parseError) {
        console.error("Error parsing success response:", _parseError);
        updatedData = { status: newStatus }; // Fallback to basic update
      } // Update the local state immediately for better UX
      setAppointments((prevAppointments) =>
        prevAppointments.map((appt) =>
          appt.transactionNumber === appointment.transactionNumber
            ? {
                ...appt,
                status: updatedData?.status || newStatus,
                dateOfAppointment:
                  updatedData?.appointmentDate || appt.dateOfAppointment,
                timeSlot: updatedData?.timeSlot || appt.timeSlot,
              }
            : appt
        )
      );

      console.log("Status updated successfully:", {
        transactionNumber: appointment.transactionNumber,
        newStatus: updatedData?.status || newStatus,
      });

      // Show success modal
      const statusMessages = {
        APPROVED: "Appointment approved successfully!",
        REJECTED: "Appointment rejected successfully!",
        COMPLETED: "Appointment completed successfully!",
      };

      setSuccessMessage(
        statusMessages[newStatus] || "Status updated successfully!"
      );
      setShowSuccessModal(true);

      // Auto-hide success modal after 3 seconds
      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);

      // Trigger dashboard refresh by dispatching custom event
      window.dispatchEvent(
        new CustomEvent("appointmentStatusUpdated", {
          detail: {
            transactionNumber: appointment.transactionNumber,
            newStatus: updatedData?.status || newStatus,
            appointmentDate: appointment.dateOfAppointment,
            timeSlot: appointment.timeSlot,
          },
        })
      );

      // Also set localStorage to trigger refresh in other tabs
      localStorage.setItem("appointmentStatusUpdated", Date.now().toString());
    } catch (error) {
      console.error("Error updating status:", error);
      setError(error.message);
    }
  };

  const approveAppointment = (appointment, event) => {
    event?.preventDefault();
    updateAppointmentStatus(appointment, "APPROVED");
  };

  const rejectAppointment = (appointment, event) => {
    event?.preventDefault();
    updateAppointmentStatus(appointment, "REJECTED");
  };

  const completeAppointment = (appointment, event) => {
    event?.preventDefault();
    updateAppointmentStatus(appointment, "COMPLETED");
  };

  // Fetch data
  useEffect(() => {
    const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;

    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch student records first
        const studentsResponse = await fetch(
          `${API_BASE_URL}/document-requests/docs-with-details`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );
        if (!studentsResponse.ok) {
          let errorMessage = `HTTP error! status: ${studentsResponse.status}`;
          try {
            const errorData = await studentsResponse.json();
            errorMessage = errorData.message || errorMessage;
          } catch (jsonError) {
            console.warn("Could not parse error response:", jsonError);
          }
          throw new Error(errorMessage);
        }

        let studentsData;
        try {
          studentsData = await studentsResponse.json();
          // *** ADDED DEBUGGING LOG ***
          // This will show the raw data from the API.
          // Check here if the 'purpose' field exists on the objects.
          console.log("DEBUG: Raw data from /docs-with-details:", studentsData);
          if (!Array.isArray(studentsData)) {
            throw new Error("Invalid response format: expected an array");
          }
        } catch (jsonError) {
          console.error("Error parsing students data:", jsonError);
          throw new Error("Failed to parse students data");
        }

        // Fetch all appointment statuses
        const statusResponse = await fetch(`${API_BASE_URL}/status`, {
          headers: {
            Accept: "application/json",
          },
        });
        if (!statusResponse.ok) {
          let errorMessage = `HTTP error! status: ${statusResponse.status}`;
          try {
            const errorData = await statusResponse.json();
            errorMessage = errorData.message || errorMessage;
          } catch (jsonError) {
            console.warn("Could not parse error response:", jsonError);
          }
          throw new Error(errorMessage);
        }

        let statusData;
        try {
          statusData = await statusResponse.json();
        } catch (jsonError) {
          console.error("Error parsing status data:", jsonError);
          throw new Error("Failed to parse status data");
        }

        const uniqueStatusData = [];
        const seenEmails = new Set();
        const sortedStatusData = [...statusData].sort((a, b) => {
          const aIsTR =
            a.transactionNumber && a.transactionNumber.startsWith("TR");
          const bIsTR =
            b.transactionNumber && b.transactionNumber.startsWith("TR");
          if (aIsTR && !bIsTR) return -1;
          if (!aIsTR && bIsTR) return 1;
          const dateA = new Date(a.dateOfRequest || 0);
          const dateB = new Date(b.dateOfRequest || 0);
          return dateB - dateA;
        });

        sortedStatusData.forEach((status) => {
          const email = status.emailAddress;
          if (email && !seenEmails.has(email)) {
            uniqueStatusData.push(status);
            seenEmails.add(email);
          }
        });

        const statusMap = uniqueStatusData.reduce((acc, curr) => {
          if (curr && curr.transactionNumber) {
            acc[curr.transactionNumber] = curr;
          }
          return acc;
        }, {});

        const archivedAppointments = JSON.parse(
          localStorage.getItem("archivedAppointments") || "[]"
        );
        const archivedIds = new Set(
          archivedAppointments.map((appt) => appt.id)
        );

        const transformedAppointments = studentsData
          .filter(
            (student) =>
              student &&
              student.transactionNumber &&
              !archivedIds.has(student.transactionNumber)
          )
          .map((student) => {
            // *** ADDED DEBUGGING LOG ***
            // This will show each student object before it's transformed.
            // Check if 'student.purpose' exists.
            console.log("DEBUG: Processing student object:", student);

            const statusInfo = statusMap[student.transactionNumber] || {};
            console.log("Processing appointment with purpose:", {
              originalPurpose: student.purpose,
              appointmentPurpose: student.appointmentPurpose,
              documentRequestPurpose: student.documentRequest?.purpose,
            });
            // Add debug log for purpose field sources
            console.log("DEBUG: Processing appointment purpose sources:", {
              studentId: student._id,
              directPurpose: student.purpose,
              documentRequestPurpose: student.documentRequest?.purpose,
              appointmentPurpose: student.appointmentPurpose,
            });

            const transformed = {
              id: student.transactionNumber,
              status: statusInfo.status || "PENDING",
              transactionNumber: student.transactionNumber,
              request: student.request || "No request specified",
              // Match how request field is processed
              purpose:
                student.purpose ||
                (student.documentRequest &&
                Array.isArray(student.documentRequest.purpose)
                  ? student.documentRequest.purpose.join(", ")
                  : student.documentRequest?.purpose) ||
                "No purpose specified",
              emailAddress: student.email || "No email specified",
              dateOfAppointment: student.appointmentDate || "Not scheduled",
              timeSlot: student.timeSlot || "Not scheduled",
              dateOfRequest:
                student.date || new Date().toISOString().split("T")[0],
              name: student.name,
              lastSY: student.lastSY,
              program: student.program,
              contact: student.contact,
              attachment: student.attachment,
            };
            // Add debug log to see the transformed data
            console.log("DEBUG: Transformed appointment data:", transformed);
            return transformed;
          });

        setAppointments(transformedAppointments);
      } catch (err) {
        console.error("Failed to fetch appointments:", err);
        setError(err.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAppointments();
  }, []);

  return {
    // Data states
    appointments,
    loading,
    error,

    // Pagination states
    currentPage,
    entriesPerPage,
    totalFilteredEntries,
    calculatedTotalPages,
    startEntry,
    endEntry,
    pageNumbers,

    // Filtered data
    filteredAppointments,

    // Handlers
    handleSearchChange,
    handleFilterChange,
    handleEntriesPerPageChange,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,

    // Search and filter states
    searchTerm,
    selectedFilter,

    // Modal states and handlers
    isModalOpen,
    selectedAppointment,
    openModal,
    closeModal,

    // Success modal states
    showSuccessModal,
    successMessage,
    setShowSuccessModal,

    // Status handlers
    deleteAppointment,
    approveAppointment,
    rejectAppointment,
    completeAppointment,

    // Style helpers
    getStatusColor,
    getTransactionNumberColor,

    // Sidebar states and handlers
    isSidebarOpen,
    toggleSidebar,
  };
};

export default useAppointment;
