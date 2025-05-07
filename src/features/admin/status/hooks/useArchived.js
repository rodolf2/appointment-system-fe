import { useState } from "react";

const useArchived = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      transactionNumber: "TR102938-123",
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
    },
    {
      id: 2,
      transactionNumber: "TR122938-343",
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
    },
    {
      id: 3,
      transactionNumber: "TR131238-534",
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
    },
  ]);

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

  const closeSuccessDelete = () => {
    setShowSuccessDelete(false);
  };

  const closeSuccessRetrieve = () => {
    setShowSuccessRetrieve(false);
  };

  const deleteAppointment = () => {
    setAppointments(
      appointments.filter((appt) => appt !== selectedAppointment)
    );
    setShowSuccessDelete(true); // stays until manually closed
    closeModal();
  };

  const retrieveAppointment = () => {
    setShowSuccessRetrieve(true); // stays until manually closed
    closeRetrieveModal();
  };

  const openRetrieveModal = (appointment) => {
    setAppointmentToRetrieve(appointment);
    setIsRetrieveModalOpen(true);
  };

  const closeRetrieveModal = () => {
    setAppointmentToRetrieve(null);
    setIsRetrieveModalOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
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
      alert("Please select at least one appointment to delete.");
    }
  };

  const closeBulkDeleteModal = () => {
    setIsBulkDeleteModalOpen(false);
  };

  const retrieveAppointments = () => {
    // Add logic here to move the selected appointments back to active state
    alert(`Retrieved ${selectedRows.length} appointments.`);
    setSelectedRows([]);
    closeRetrieveModal();
  };

  const deleteBulkAppointments = () => {
    setAppointments(
      appointments.filter((appt) => !selectedRows.includes(appt.id))
    );
    setSelectedRows([]);
    closeBulkDeleteModal();
  };
  const handleIconClick = (appointment) => {
    setSelectedAppointment(appointment);
    setShowModal(true);
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
    if (action === "delete") {
      openBulkDeleteModal();
    } else if (action === "retrieve") {
      openRetrieveModal(); // Updated for retrieve
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
    retrieveAppointments,
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
  };
};

export default useArchived;
