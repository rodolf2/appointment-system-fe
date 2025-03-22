import { useState } from "react";

const useArchived = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      transactionNumber: "TR102938-123",
      request: "",
      emailAddress: "example1@example.com",
      dateOfAppointment: "2023-10-01",
      timeSlot: "10:00 AM",
      dateOfRequest: "2023-09-25",
    },
    {
      id: 2,
      transactionNumber: "TR122938-343",
      request: "",
      emailAddress: "example2@example.com",
      dateOfAppointment: "2023-10-02",
      timeSlot: "11:00 AM",
      dateOfRequest: "2023-09-26",
    },
    {
      id: 3,
      transactionNumber: "TR131238-534",
      request: "",
      emailAddress: "example3@example.com",
      dateOfAppointment: "2023-10-03",
      timeSlot: "12:00 PM",
      dateOfRequest: "2023-09-27",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false); // For bulk delete modal
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]); // For checkbox selection
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // For dropdown visibility

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Open modal for delete confirmation
  const openModal = (appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setSelectedAppointment(null);
    setIsModalOpen(false);
  };

  // Open bulk delete modal
  const openBulkDeleteModal = () => {
    if (selectedRows.length > 0) {
      setIsBulkDeleteModalOpen(true);
    } else {
      alert("Please select at least one appointment to delete.");
    }
  };

  // Close bulk delete modal
  const closeBulkDeleteModal = () => {
    setIsBulkDeleteModalOpen(false);
  };

  // Delete single appointment
  const deleteAppointment = () => {
    setAppointments(
      appointments.filter((appt) => appt.id !== selectedAppointment.id)
    );
    closeModal();
  };

  // Delete multiple appointments (bulk delete)
  const deleteBulkAppointments = () => {
    setAppointments(
      appointments.filter((appt) => !selectedRows.includes(appt.id))
    );
    setSelectedRows([]); // Clear selected rows after deletion
    closeBulkDeleteModal();
  };

  // Handle checkbox selection
  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  // Handle select all checkboxes
  const handleSelectAll = () => {
    if (selectedRows.length === appointments.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(appointments.map((appt) => appt.id));
    }
  };

  // Handle dropdown toggle
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // Handle dropdown actions (Delete or Return)
  const handleDropdownAction = (action) => {
    if (action === "delete") {
      openBulkDeleteModal(); // Open bulk delete modal
    } else if (action === "return") {
      // Add logic for returning appointments (e.g., change status)
      alert("Return functionality not implemented yet.");
    }
    setIsDropdownOpen(false); // Close dropdown after action
  };

  return {
    isSidebarOpen,
    appointments,
    isModalOpen,
    isBulkDeleteModalOpen,
    selectedAppointment,
    selectedRows,
    isDropdownOpen,
    toggleSidebar,
    openModal,
    closeModal,
    openBulkDeleteModal,
    closeBulkDeleteModal,
    deleteAppointment,
    deleteBulkAppointments,
    handleCheckboxChange,
    handleSelectAll,
    toggleDropdown,
    handleDropdownAction,
  };
};

export default useArchived;
