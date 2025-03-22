import { useState } from "react";

const useSchedule = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [newSchedule, setNewSchedule] = useState({
    no: "",
    slots: "",
    date: "",
    startTime: "",
    endTime: "",
    actions: "",
  });
  const [schedules, setSchedules] = useState([
    {
      no: "1",
      slots: "80",
      date: "12/27/24",
      startTime: "8:00 AM",
      endTime: "4:00 PM",
      actions: "",
    },
  ]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setNewSchedule({
      no: "",
      slots: "",
      date: "",
      startTime: "",
      endTime: "",
      actions: "",
    });
    setIsAddModalOpen(false);
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setNewSchedule(schedules[index]);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setNewSchedule({
      no: "",
      slots: "",
      date: "",
      startTime: "",
      endTime: "",
      actions: "",
    });
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setNewSchedule((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveScheduleChanges = () => {
    const originalSchedule = schedules[editIndex];

    const hasChanges =
      newSchedule.slots !== originalSchedule.slots ||
      newSchedule.date !== originalSchedule.date ||
      newSchedule.startTime !== originalSchedule.startTime ||
      newSchedule.endTime !== originalSchedule.endTime;

    if (!hasChanges) {
      alert("No changes made to the schedule.");
      return;
    }

    const updatedStartTime = newSchedule.startTime
      ? formatTime(newSchedule.startTime)
      : originalSchedule.startTime;
    const updatedEndTime = newSchedule.endTime
      ? formatTime(newSchedule.endTime)
      : originalSchedule.endTime;

    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule, index) =>
        index === editIndex
          ? {
              ...schedule,
              ...newSchedule,
              startTime: updatedStartTime,
              endTime: updatedEndTime,
            }
          : schedule
      )
    );

    closeEditModal();
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const year = String(d.getFullYear()).slice(-2);
    return `${month}/${day}/${year}`;
  };
  const formatTime = (time) => {
    const [hour, minute] = time.split(":");
    const h = parseInt(hour, 10);
    const period = h >= 12 ? "PM" : "AM";
    const formattedHour = h % 12 || 12;
    return `${formattedHour}:${minute} ${period}`;
  };

  const addSchedule = () => {
    // Check if all fields are filled
    if (!newSchedule.date || !newSchedule.startTime || !newSchedule.endTime) {
      alert(
        "All fields are required. Please fill in all fields before adding a schedule."
      );
      return; // Exit the function if validation fails
    }

    const formattedSchedule = {
      ...newSchedule,
      no: (schedules.length + 1).toString(),
      date: formatDate(newSchedule.date),
      startTime: newSchedule.startTime
        ? formatTime(newSchedule.startTime)
        : newSchedule.startTime,
      endTime: newSchedule.endTime
        ? formatTime(newSchedule.endTime)
        : newSchedule.endTime,
    };

    setSchedules((prev) => [...prev, formattedSchedule]);

    // Close the modal after successfully adding the schedule
    closeAddModal();

    // Optionally, reset the newSchedule fields
    setNewSchedule({
      date: "",
      startTime: "",
      endTime: "",
    });

    alert("Schedule added successfully!");
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setDeleteIndex(null);
    setIsDeleteModalOpen(false);
  };
  const confirmDelete = () => {
    setSchedules((prevSchedules) => {
      const updatedSchedules = prevSchedules.filter(
        (_, i) => i !== deleteIndex
      );
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
    toggleSidebar,
    openAddModal,
    setSchedules,
    closeAddModal,
    openEditModal,
    closeEditModal,
    handleInputChange,
    saveScheduleChanges,
    formatDate,
    formatTime,
    addSchedule,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};

export default useSchedule;
