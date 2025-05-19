import { useState, useEffect } from "react";

const useSchedule = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  // State for error messages in modals
  const [addModalError, setAddModalError] = useState(null); // New state for add modal error
  const [editModalError, setEditModalError] = useState(null);

  const [originalScheduleForForm, setOriginalScheduleForForm] = useState(null);

  const initialScheduleState = {
    no: "",
    slots: "",
    date: "", // Will be YYYY-MM-DD for input
    startTime: "", // Will be HH:MM for input
    endTime: "",
  };
  const [newSchedule, setNewSchedule] = useState(initialScheduleState);

  const [schedules, setSchedules] = useState([
    {
      no: "1",
      slots: "80",
      date: "12/27/2024",
      startTime: "08:00 AM",
      endTime: "04:00 PM",
    },
  ]);

  // --- Helper functions for date/time conversion ---
  const convertDisplayDateToInputFormat = (displayDate) => {
    if (!displayDate) return "";
    const parts = displayDate.split('/');
    if (parts.length !== 3) return "";
    let [month, day, year] = parts;
    month = month.padStart(2, '0');
    day = day.padStart(2, '0');
    if (year.length === 2) {
      const currentYear = new Date().getFullYear();
      const currentCentury = Math.floor(currentYear / 100) * 100;
      year = currentCentury + parseInt(year, 10);
      if (year > currentYear + 20) {
        year -= 100;
      }
    } else if (year.length !== 4) {
      return "";
    }
    return `${year}-${month}-${day}`;
  };

  const convertDisplayTimeToInputFormat = (displayTime) => {
    if (!displayTime) return "";
    const [time, modifier] = displayTime.split(' ');
    if (!time || !modifier) return "";
    let [hours, minutes] = time.split(':');
    if (!hours || !minutes) return "";
    hours = parseInt(hours, 10);
    if (modifier.toUpperCase() === "PM" && hours < 12) hours += 12;
    if (modifier.toUpperCase() === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, '0')}:${minutes}`;
  };

  // --- Modal Open/Close ---
  const openAddModal = () => {
    setNewSchedule(initialScheduleState);
    setAddModalError(null); // Clear previous add modal errors
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setNewSchedule(initialScheduleState);
    setAddModalError(null); // Clear error when modal closes
    setIsAddModalOpen(false);
  };

  const openEditModal = (index) => {
    const scheduleToEdit = schedules[index];
    if (!scheduleToEdit) return;
    const formReadySchedule = {
      ...scheduleToEdit,
      date: convertDisplayDateToInputFormat(scheduleToEdit.date),
      startTime: convertDisplayTimeToInputFormat(scheduleToEdit.startTime),
      endTime: convertDisplayTimeToInputFormat(scheduleToEdit.endTime),
    };
    setEditIndex(index);
    setNewSchedule(formReadySchedule);
    setOriginalScheduleForForm(formReadySchedule);
    setEditModalError(null);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setNewSchedule(initialScheduleState);
    setOriginalScheduleForForm(null);
    setEditIndex(null);
    setEditModalError(null);
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewSchedule((prev) => ({ ...prev, [name]: value }));
    if (addModalError) setAddModalError(null); // Clear error if user starts typing in add modal
    if (editModalError) setEditModalError(null); // Clear error if user starts typing in edit modal
  };

  // --- Formatting for display/storage ---
  const formatDateForStorage = (dateString) => {
    if (!dateString) return "";
    const [year, month, day] = dateString.split('-');
    return `${month}/${day}/${year}`;
  };

  const formatTimeForStorage = (timeString) => {
    if (!timeString) return "";
    const [hour, minute] = timeString.split(":");
    const h = parseInt(hour, 10);
    const period = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${String(formattedHour)}:${minute} ${period.toUpperCase()}`;
  };

  const handleUpdateSchedule = () => {
    if (editIndex === null || !originalScheduleForForm) return;
    const hasChanges =
      newSchedule.slots !== originalScheduleForForm.slots ||
      newSchedule.date !== originalScheduleForForm.date ||
      newSchedule.startTime !== originalScheduleForForm.startTime ||
      newSchedule.endTime !== originalScheduleForForm.endTime;

    if (!hasChanges) {
      setEditModalError("No changes made to the schedule.");
      return;
    }

    const updatedScheduleForStorage = {
      ...schedules[editIndex],
      slots: newSchedule.slots,
      date: formatDateForStorage(newSchedule.date),
      startTime: formatTimeForStorage(newSchedule.startTime),
      endTime: formatTimeForStorage(newSchedule.endTime),
    };
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule, index) =>
        index === editIndex ? updatedScheduleForStorage : schedule
      )
    );
    closeEditModal();
  };

  const addSchedule = () => {
    // Check if all fields are filled
    if (!newSchedule.slots.trim() || !newSchedule.date || !newSchedule.startTime || !newSchedule.endTime) {
      setAddModalError("All fields (Slots, Date, Start Time, End Time) are required."); // Set error message
      return; // Exit the function if validation fails
    }

    const formattedSchedule = {
      no: (schedules.length + 1).toString(),
      slots: newSchedule.slots,
      date: formatDateForStorage(newSchedule.date),
      startTime: formatTimeForStorage(newSchedule.startTime),
      endTime: formatTimeForStorage(newSchedule.endTime),
    };

    setSchedules((prev) => [...prev, formattedSchedule]);
    setAddModalError(null); // Clear error on successful add
    closeAddModal(); // This will also clear newSchedule and addModalError
    // No success alert needed, UI change is feedback
  };

  // --- Delete Functionality ---
  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteIndex(null);
    setIsDeleteModalOpen(false);
  };

  const confirmDelete = () => {
    if (deleteIndex === null) return;
    setSchedules((prevSchedules) => {
      const updatedSchedules = prevSchedules.filter((_, i) => i !== deleteIndex);
      return updatedSchedules.map((sched, index) => ({
        ...sched,
        no: (index + 1).toString(),
      }));
    });
    closeDeleteModal();
  };

  return {
    isSidebarOpen,
    isAddModalOpen,
    isEditModalOpen,
    editIndex,
    isDeleteModalOpen,
    deleteIndex,
    newSchedule,
    schedules,
    addModalError, // Export add modal error state
    editModalError,

    toggleSidebar,
    openAddModal,
    closeAddModal,
    addSchedule,

    openEditModal,
    closeEditModal,
    handleInputChange,
    handleUpdateSchedule,

    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};

export default useSchedule;