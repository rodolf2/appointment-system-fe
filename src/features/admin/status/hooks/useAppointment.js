import { useState, useEffect, useCallback } from "react";

const useAppointment = () => {
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
    try {
      // Delete the document request first
      const docResponse = await fetch(
        `/api/document-requests/docs/${selectedAppointment.transactionNumber}`,
        {
          method: "DELETE",
        }
      );

      if (!docResponse.ok) {
        const errorData = await docResponse.json();
        throw new Error(errorData.message || "Failed to delete document request");
      }

      // Delete the status
      const statusResponse = await fetch(
        `/api/status/status/${selectedAppointment.transactionNumber}`,
        {
          method: "DELETE",
        }
      );

      // Even if status deletion fails, we should still close the modal and update the UI
      // since the document request was successfully deleted
      if (!statusResponse.ok) {
        console.warn("Status deletion failed, but document request was deleted");
      }

      // Update the local state
      setAppointments(
        appointments.filter(
          (appt) => appt.transactionNumber !== selectedAppointment.transactionNumber
        )
      );
      
      // Always close the modal after attempting deletion
      closeModal();
    } catch (err) {
      console.error("Error deleting appointment:", err);
      setError(err.message || "An error occurred while deleting the appointment");
      // Close the modal even if there's an error
      closeModal();
    }
  };

  const updateAppointmentStatus = async (appointment, newStatus) => {
    try {
      const response = await fetch(`/api/status/status/${appointment.transactionNumber}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      // Update the local state
      setAppointments(prevAppointments =>
        prevAppointments.map(appt =>
          appt.transactionNumber === appointment.transactionNumber
            ? { ...appt, status: newStatus }
            : appt
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      setError(error.message);
    }
  };

  const approveAppointment = (appointment) => {
    event?.preventDefault();
    updateAppointmentStatus(appointment, "APPROVED");
  };

  const rejectAppointment = (appointment) => {
    event?.preventDefault();
    updateAppointmentStatus(appointment, "REJECTED");
  };

  const completeAppointment = (appointment) => {
    event?.preventDefault();
    updateAppointmentStatus(appointment, "COMPLETED");
  };

  // Fetch data
  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);

      try {
        // Fetch student records first
        const studentsResponse = await fetch(
          "/api/document-requests/docs-with-details"
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
          if (!Array.isArray(studentsData)) {
            throw new Error("Invalid response format: expected an array");
          }
        } catch (jsonError) {
          console.error("Error parsing students data:", jsonError);
          throw new Error("Failed to parse students data");
        }

        // Fetch all appointment statuses
        const statusResponse = await fetch("/api/status");
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
          if (!Array.isArray(statusData)) {
            throw new Error("Invalid response format: expected an array");
          }
        } catch (jsonError) {
          console.error("Error parsing status data:", jsonError);
          throw new Error("Failed to parse status data");
        }

        // Create a map of transaction numbers to their status
        const statusMap = statusData.reduce((acc, curr) => {
          if (curr && curr.transactionNumber) {
            acc[curr.transactionNumber] = curr;
          }
          return acc;
        }, {});

        // Transform student records and merge with status info
        const transformedAppointments = studentsData
          .filter(student => student && student.transactionNumber) // Filter out invalid records
          .map((student) => {
            const statusInfo = statusMap[student.transactionNumber] || {};
            
            return {
              id: student.transactionNumber,
              status: statusInfo.status || "PENDING",
              transactionNumber: student.transactionNumber,
              request: student.request || "No request specified",
              emailAddress: student.email || "No email specified",
              dateOfAppointment: student.appointmentDate || "Not scheduled",
              timeSlot: student.timeSlot || "Not scheduled",
              dateOfRequest: student.date || new Date().toISOString().split('T')[0],
              // Keep additional fields from Students for reference
              name: student.name,
              lastSY: student.lastSY,
              program: student.program,
              contact: student.contact,
              attachment: student.attachment
            };
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

    // Set up auto-refresh every 30 seconds
    const refreshInterval = setInterval(fetchAppointments, 30000);

    return () => clearInterval(refreshInterval);
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
