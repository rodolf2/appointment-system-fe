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
  const [selectedFilter, setSelectedFilter] = useState("PENDING");
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

  // ====================================================================
  // === CORRECTED FILTERING LOGIC ======================================
  // ====================================================================
  const filteredAppointments = appointments.filter((data) => {
    // Step 1: Filter by Search Term
    // If there's no search term, everything matches by default.
    const searchString = searchTerm.toLowerCase();
    const matchesSearch = searchTerm
      ? data.transactionNumber?.toLowerCase().includes(searchString) ||
        data.request?.toLowerCase().includes(searchString) ||
        data.emailAddress?.toLowerCase().includes(searchString) ||
        data.purpose?.toLowerCase().includes(searchString)
      : true;

    // Step 2: Filter by Status
    // If the filter is "Filter by", everything matches by default.
    const matchesFilter =
      selectedFilter === "Filter by"
        ? true
        : data.status?.toUpperCase() === selectedFilter.toUpperCase();

    // Step 3: An item is included only if it matches BOTH conditions
    return matchesSearch && matchesFilter;
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
      const API_BASE_URL = `${import.meta.env.VITE_API_URL}/api`;
      const url = `${API_BASE_URL}/status/status/${appointment.transactionNumber}`;
      console.log("Request URL:", url);

      let formattedAppointmentDate = appointment.dateOfAppointment;
      if (
        formattedAppointmentDate &&
        formattedAppointmentDate !== "Not scheduled"
      ) {
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
        adminName: adminName,
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
          const errorData = JSON.parse(responseText);
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
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

      let updatedData;
      try {
        updatedData = JSON.parse(responseText);
      } catch (_parseError) {
        console.error("Error parsing success response:", _parseError);
        updatedData = { status: newStatus };
      }
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

      const statusMessages = {
        APPROVED: "Appointment approved successfully!",
        REJECTED: "Appointment rejected successfully!",
        COMPLETED: "Appointment completed successfully!",
      };

      setSuccessMessage(
        statusMessages[newStatus] || "Status updated successfully!"
      );
      setShowSuccessModal(true);

      setTimeout(() => {
        setShowSuccessModal(false);
      }, 3000);

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
        // 1. Fetch student records (document requests)
        const studentsResponse = await fetch(
          `${API_BASE_URL}/document-requests/docs-with-details`,
          { headers: { Accept: "application/json" } }
        );
        if (!studentsResponse.ok) {
          throw new Error(
            `Failed to fetch student details: ${studentsResponse.status}`
          );
        }
        const studentsData = await studentsResponse.json();
        if (!Array.isArray(studentsData)) {
          throw new Error("Invalid response format: expected an array");
        }

        // 2. Fetch all appointment statuses
        const statusResponse = await fetch(`${API_BASE_URL}/status`, {
          headers: { Accept: "application/json" },
        });
        if (!statusResponse.ok) {
          throw new Error(`Failed to fetch statuses: ${statusResponse.status}`);
        }
        const statusData = await statusResponse.json();

        // 3. Remove duplicates and sort status data
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

        console.log(
          `Removed ${
            statusData.length - uniqueStatusData.length
          } duplicate status entries`
        );

        const statusMap = uniqueStatusData.reduce((acc, curr) => {
          if (curr && curr.transactionNumber) {
            acc[curr.transactionNumber] = curr;
          }
          return acc;
        }, {});

        // 4. Get archived appointments from localStorage to filter them out
        const archivedAppointments = JSON.parse(
          localStorage.getItem("archivedAppointments") || "[]"
        );
        const archivedIds = new Set(
          archivedAppointments.map((appt) => appt.id)
        );

        // 5. Transform, merge, and SORT the data
        const transformedAppointments = studentsData
          .filter(
            (student) =>
              student &&
              student.transactionNumber &&
              !archivedIds.has(student.transactionNumber)
          )
          .map((student) => {
            const statusInfo = statusMap[student.transactionNumber] || {};
            const validStatuses = [
              "PENDING",
              "APPROVED",
              "REJECTED",
              "COMPLETED",
            ];
            const normalizedStatus = (
              statusInfo.status || "PENDING"
            ).toUpperCase();
            const status = validStatuses.includes(normalizedStatus)
              ? normalizedStatus
              : "PENDING";

            return {
              id: student.transactionNumber,
              status: status,
              transactionNumber: student.transactionNumber,
              request: student.request || "No request specified",
              purpose:
                student.purpose ||
                (student.documentRequest &&
                Array.isArray(student.documentRequest.purpose)
                  ? student.documentRequest.purpose.join(", ")
                  : student.documentRequest?.purpose) ||
                "No purpose specified",
              emailAddress: student.email || "No email specified",
              dateOfAppointment: statusInfo.appointmentDate || "Not scheduled",
              timeSlot: statusInfo.timeSlot || "Not scheduled",
              // This is the key field for sorting by submission time
              dateOfRequest:
                student.date || new Date().toISOString().split("T")[0],
              name: student.name,
              lastSY: student.lastSY,
              program: student.program,
              contact: student.contact,
              attachment: student.attachment,
            };
          })
          // --- THIS IS THE NEW LINE OF CODE ---
          // 6. Sort by request date in descending order (newest first)
          .sort(
            (a, b) => new Date(b.dateOfRequest) - new Date(a.dateOfRequest)
          );

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
