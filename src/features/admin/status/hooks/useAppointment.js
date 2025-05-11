import { useState } from "react";

const useAppointment = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("Filter by");
  const [appointments, setAppointments] = useState([
    {
      status: "COMPLETED",
      transactionNumber: ["TR102938-123"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "APPROVED",
      transactionNumber: ["TR122938-343"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "COMPLETED",
      transactionNumber: ["TR131238-534"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "PENDING",
      transactionNumber: ["TR232352-536"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "PENDING",
      transactionNumber: ["TR254393-678"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "2025-01-01",
    },
    {
      status: "APPROVED",
      transactionNumber: ["TR324693-786"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "REJECTED",
      transactionNumber: ["TR382793-876"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
    {
      status: "PENDING",
      transactionNumber: ["TR38883-999"],
      request: "",
      emailAddress: "",
      dateOfAppointment: "",
      timeSlot: "",
      dateOfRequest: "",
      actions: "",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

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

  // Handle filter change
  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  // Filter appointments based on selected filter
  const filteredAppointments =
    selectedFilter === "Filter by"
      ? appointments
      : appointments.filter(
        (appointment) => appointment.status === selectedFilter.toUpperCase()
      );

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

  // Delete appointment
  const deleteAppointment = () => {
    setAppointments(
      appointments.filter((appt) => appt !== selectedAppointment)
    );
    closeModal();
  };

  // Approve appointment
  const approveAppointment = (appointment) => {
    setAppointments(
      appointments.map((appt) =>
        appt === appointment ? { ...appt, status: "APPROVED" } : appt
      )
    );
  };

  // Reject appointment
  const rejectAppointment = (appointment) => {
    setAppointments(
      appointments.map((appt) =>
        appt === appointment ? { ...appt, status: "REJECTED" } : appt
      )
    );
  };

  // Complete appointment
  const completeAppointment = (appointment) => {
    setAppointments(
      appointments.map((appt) =>
        appt === appointment ? { ...appt, status: "COMPLETED" } : appt
      )
    );
  };

  return {
    isSidebarOpen,
    setIsSidebarOpen,
    selectedFilter,
    setSelectedFilter,
    appointments,
    setAppointments,
    isModalOpen,
    setIsModalOpen,
    selectedAppointment,
    setSelectedAppointment,
    toggleSidebar,
    getStatusColor,
    getTransactionNumberColor,
    handleFilterChange,
    filteredAppointments,
    openModal,
    closeModal,
    deleteAppointment,
    approveAppointment,
    rejectAppointment,
    completeAppointment,
  };
};

export default useAppointment;
