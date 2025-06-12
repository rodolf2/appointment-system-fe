import { useState, useEffect } from "react";
import { useUser } from "../../../../context/UserContext";

const cleanAppointmentData = (appointment) => {
  const cleanedData = { ...appointment };
  delete cleanedData.archived;
  delete cleanedData.archivedDate;
  return cleanedData;
};

const useArchived = () => {
  // Get user context for admin name
  const { user } = useUser();

  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Optional: Load from localStorage if you want persistence across page refreshes
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true; // Default to open
  });

  // Add this useEffect if you want persistence across refreshes
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  // Load archived appointments from localStorage
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("archivedAppointments");
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false);

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [isRetrieveModalOpen, setIsRetrieveModalOpen] = useState(false);
  const [appointmentToRetrieve, setAppointmentToRetrieve] = useState(null);

  // Add these states to your hook
  const [showSuccessDelete, setShowSuccessDelete] = useState(false);
  const [showSuccessRetrieve, setShowSuccessRetrieve] = useState(false);

  // Add pagination states
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [refreshNotifications, setRefreshNotifications] = useState(null);

  // Error handling states
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Set up refresh notifications handler
  useEffect(() => {
    const refreshHandler = () => {
      // Refresh the appointments list when needed
      const saved = localStorage.getItem("archivedAppointments");
      if (saved) {
        setAppointments(JSON.parse(saved));
      }
    };
    setRefreshNotifications(() => refreshHandler);
  }, []);

  // Filter appointments based on search term
  const filteredAppointments = appointments.filter((data) => {
    const searchString = searchTerm.toLowerCase();
    return (
      data.transactionNumber?.toLowerCase().includes(searchString) ||
      data.request?.toLowerCase().includes(searchString) ||
      data.emailAddress?.toLowerCase().includes(searchString)
    );
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

  // Pagination handlers
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

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const closeSuccessDelete = () => {
    setShowSuccessDelete(false);
  };

  const closeSuccessRetrieve = () => {
    setShowSuccessRetrieve(false);
  };
  const closeErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessage("");
  };
  // Single appointment actions
  const deleteAppointment = async () => {
    if (selectedAppointment) {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setErrorMessage(
            "No authorization token found. Please sign in again."
          );
          setShowErrorModal(true);
          return;
        }

        console.log("Deleting appointment:", selectedAppointment);

        // Make API call to delete the appointment
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/document-requests/docs/${
            selectedAppointment.transactionNumber
          }`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            credentials: "include",
            body: JSON.stringify({
              adminName: user?.name || "Admin",
              transactionNumber: selectedAppointment.transactionNumber, // Add this explicitly
            }),
          }
        );

        console.log("Delete response status:", response.status);

        // Try to get response body regardless of status
        const responseData = await response.json().catch((e) => {
          console.log("Error parsing response:", e);
          return {};
        });
        console.log("Delete response data:", responseData);

        if (!response.ok) {
          if (response.status === 404) {
            // Remove from local storage even if backend says not found
            console.log(
              "Document not found in backend, removing from local storage"
            );
            const updatedArchived = appointments.filter(
              (appt) => appt.id !== selectedAppointment.id
            );
            setAppointments(updatedArchived);
            localStorage.setItem(
              "archivedAppointments",
              JSON.stringify(updatedArchived)
            );
            setShowSuccessDelete(true);
            closeModal();
            return;
          }

          if (response.status === 401) {
            setErrorMessage("Your session has expired. Please sign in again.");
            setShowErrorModal(true);
            setTimeout(() => {
              window.location.href = "/login";
            }, 2000);
            return;
          }

          throw new Error(
            responseData.message || "Failed to delete appointment"
          );
        }

        // Success - update local state
        const updatedArchived = appointments.filter(
          (appt) => appt.id !== selectedAppointment.id
        );
        setAppointments(updatedArchived);
        localStorage.setItem(
          "archivedAppointments",
          JSON.stringify(updatedArchived)
        );
        setShowSuccessDelete(true);
        closeModal();
        refreshNotifications && refreshNotifications();
      } catch (error) {
        console.error("Error deleting appointment:", error);
        setErrorMessage(
          error.message || "Failed to delete appointment. Please try again."
        );
        setShowErrorModal(true);
      }
    }
  };

  const retrieveAppointment = () => {
    if (appointmentToRetrieve) {
      try {
        // Remove from archived appointments
        const updatedArchived = appointments.filter(
          (appt) => appt.id !== appointmentToRetrieve.id
        );
        setAppointments(updatedArchived);
        localStorage.setItem(
          "archivedAppointments",
          JSON.stringify(updatedArchived)
        );

        // Add back to active appointments
        const activeAppointments = JSON.parse(
          localStorage.getItem("appointments") || "[]"
        );
        const cleanedAppointment = cleanAppointmentData(appointmentToRetrieve);
        activeAppointments.push(cleanedAppointment);
        localStorage.setItem(
          "appointments",
          JSON.stringify(activeAppointments)
        );

        // Add back to students table
        const studentsData = JSON.parse(
          localStorage.getItem("studentsData") || "[]"
        );
        const studentData = {
          transactionNumber: appointmentToRetrieve.transactionNumber,
          name: appointmentToRetrieve.name,
          lastSY: appointmentToRetrieve.lastSY,
          program: appointmentToRetrieve.program,
          contact: appointmentToRetrieve.contact,
          email: appointmentToRetrieve.email,
          attachment: appointmentToRetrieve.attachment,
          request: appointmentToRetrieve.request,
          date: appointmentToRetrieve.dateOfRequest,
        };
        studentsData.push(studentData);
        localStorage.setItem("studentsData", JSON.stringify(studentsData));

        setShowSuccessRetrieve(true);
        closeRetrieveModal();
      } catch (error) {
        console.error("Error retrieving appointment:", error);
        setErrorMessage("Failed to retrieve appointment. Please try again.");
        setShowErrorModal(true);
      }
    }
  };

  const openRetrieveModal = (appointment) => {
    setAppointmentToRetrieve(appointment);
    setIsRetrieveModalOpen(true);
  };

  const closeRetrieveModal = () => {
    setAppointmentToRetrieve(null);
    setIsRetrieveModalOpen(false);
  };

  // Delete modals
  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  const openBulkDeleteModal = () => {
    if (selectedRows.length > 0) {
      setIsBulkDeleteModalOpen(true);
    } else {
      setErrorMessage("Please select at least one appointment to delete.");
      setShowErrorModal(true);
    }
  };

  const closeBulkDeleteModal = () => {
    setIsBulkDeleteModalOpen(false);
  };

  // Bulk action handlers
  const deleteBulkAppointments = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setErrorMessage("No authorization token found. Please sign in again.");
        setShowErrorModal(true);
        return;
      }

      // Get selected appointments
      const selectedAppointments = appointments.filter((appt) =>
        selectedRows.includes(appt.id)
      );
      console.log("Selected appointments for deletion:", selectedAppointments);

      // Delete each appointment through the API
      const results = await Promise.allSettled(
        selectedAppointments.map(async (appointment) => {
          console.log("Attempting to delete:", appointment.transactionNumber);

          const response = await fetch(
            `https://appointment-system-backend-n8dk.onrender.com/api/document-requests/docs/${appointment.transactionNumber}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
              credentials: "include",
              body: JSON.stringify({
                adminName: user?.name || "Admin",
                transactionNumber: appointment.transactionNumber,
              }),
            }
          );

          console.log(
            `Delete response for ${appointment.transactionNumber}:`,
            response.status
          );

          // Always try to parse response body
          const responseData = await response.json().catch(() => ({}));
          console.log(
            `Response data for ${appointment.transactionNumber}:`,
            responseData
          );

          if (!response.ok && response.status !== 404) {
            throw new Error(
              responseData.message ||
                `Failed to delete appointment ${appointment.transactionNumber}`
            );
          }

          return appointment.id;
        })
      );

      console.log("Bulk delete results:", results);

      // Handle results
      const successfulDeletes = results
        .filter((result) => result.status === "fulfilled")
        .map((result) => result.value);

      // Remove successfully deleted appointments from local state
      const updatedArchived = appointments.filter(
        (appt) => !successfulDeletes.includes(appt.id)
      );
      setAppointments(updatedArchived);
      localStorage.setItem(
        "archivedAppointments",
        JSON.stringify(updatedArchived)
      );

      // Clear selection and close modal
      setSelectedRows([]);
      closeBulkDeleteModal();
      setShowSuccessDelete(true);

      const failedDeletes = results.filter(
        (result) => result.status === "rejected"
      );
      if (failedDeletes.length > 0) {
        console.log("Some deletions failed:", failedDeletes);
        setErrorMessage(
          `${failedDeletes.length} appointments failed to delete.`
        );
        setShowErrorModal(true);
      }
    } catch (error) {
      console.error("Error in bulk delete:", error);
      setErrorMessage(
        error.message || "Failed to delete appointments. Please try again."
      );
      setShowErrorModal(true);
    }
  };

  const retrieveBulkAppointments = () => {
    try {
      // Get selected appointments
      const selectedAppointments = appointments.filter((appt) =>
        selectedRows.includes(appt.id)
      );

      // Remove from archived appointments
      const updatedArchived = appointments.filter(
        (appt) => !selectedRows.includes(appt.id)
      );
      setAppointments(updatedArchived);
      localStorage.setItem(
        "archivedAppointments",
        JSON.stringify(updatedArchived)
      );

      // Add back to active appointments
      const activeAppointments = JSON.parse(
        localStorage.getItem("appointments") || "[]"
      );
      selectedAppointments.forEach((appointment) => {
        const cleanedAppointment = cleanAppointmentData(appointment);
        activeAppointments.push(cleanedAppointment);
      });
      localStorage.setItem("appointments", JSON.stringify(activeAppointments));

      // Add back to students table
      const studentsData = JSON.parse(
        localStorage.getItem("studentsData") || "[]"
      );
      selectedAppointments.forEach((appointment) => {
        const studentData = {
          transactionNumber: appointment.transactionNumber,
          name: appointment.name,
          lastSY: appointment.lastSY,
          program: appointment.program,
          contact: appointment.contact,
          email: appointment.email,
          attachment: appointment.attachment,
          request: appointment.request,
          date: appointment.dateOfRequest,
        };
        studentsData.push(studentData);
      });
      localStorage.setItem("studentsData", JSON.stringify(studentsData));

      // Clear selection and close modal
      setSelectedRows([]);
      closeRetrieveModal();
      setShowSuccessRetrieve(true);
    } catch (error) {
      console.error("Error retrieving bulk appointments:", error);
      setErrorMessage("Failed to retrieve appointments. Please try again.");
      setShowErrorModal(true);
    }
  };

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAll = () => {
    if (selectedRows.length === appointments.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(appointments.map((appt) => appt.id));
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleDropdownAction = (action) => {
    if (selectedRows.length === 0) {
      setErrorMessage("Please select at least one appointment");
      setShowErrorModal(true);
      return;
    }

    if (action === "delete") {
      setIsBulkDeleteModalOpen(true);
    } else if (action === "return") {
      setIsRetrieveModalOpen(true);
    }
    setIsDropdownOpen(false);
  };

  return {
    isSidebarOpen,
    appointments,
    isModalOpen,
    isBulkDeleteModalOpen,
    isRetrieveModalOpen,
    selectedAppointment,
    selectedRows,
    isDropdownOpen,
    toggleSidebar,
    openModal,
    closeModal,
    openBulkDeleteModal,
    closeBulkDeleteModal,
    openRetrieveModal,
    closeRetrieveModal,
    deleteAppointment,
    deleteBulkAppointments,
    retrieveBulkAppointments,
    handleCheckboxChange,
    handleSelectAll,
    toggleDropdown,
    handleDropdownAction,
    retrieveAppointment,
    showSuccessDelete,
    setShowSuccessDelete,
    showSuccessRetrieve,
    setShowSuccessRetrieve,
    closeSuccessDelete,
    closeSuccessRetrieve,
    // Add new pagination-related returns
    entriesPerPage,
    currentPage,
    totalFilteredEntries,
    calculatedTotalPages,
    startEntry,
    endEntry,
    pageNumbers,
    handleEntriesPerPageChange,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,
    handleSearchChange,
    searchTerm,
    filteredAppointments,
    // Error handling states
    showErrorModal,
    errorMessage,
    closeErrorModal,
  };
};

export default useArchived;
