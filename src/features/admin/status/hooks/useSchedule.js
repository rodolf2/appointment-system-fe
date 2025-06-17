import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  getAllSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "../../../../services/scheduleServices";

const useSchedule = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [loading, setLoading] = useState(false);

  // State for error messages in modals
  const [addModalError, setAddModalError] = useState(null);
  const [editModalError, setEditModalError] = useState(null);

  const [originalScheduleForForm, setOriginalScheduleForForm] = useState(null);

  const initialScheduleState = {
    slots: "",
    date: "",
    startTime: "",
    endTime: "",
  };
  const [newSchedule, setNewSchedule] = useState(initialScheduleState);
  const [schedules, setSchedules] = useState([]);

  // Add pagination and search states
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [allSchedules, setAllSchedules] = useState([]);

  // Format schedule data for display
  const formatScheduleForDisplay = useCallback((schedule, index) => {
    const availableSlots = schedule.availableSlots || schedule.slots || 0;
    const totalSlots = schedule.totalSlots || availableSlots;
    const bookedSlots = schedule.bookedSlots || 0;

    return {
      no: (index + 1).toString(),
      slots: totalSlots.toString(), // Total slots (original amount)
      availableSlots: availableSlots.toString(), // Available slots (decreases when booked)
      bookedSlots: bookedSlots.toString(), // Booked slots
      date: formatDateForStorage(schedule.date.split("T")[0]),
      startTime: schedule.startTime,
      endTime: schedule.endTime,
      _id: schedule._id,
    };
  }, []);

  // Fetch all schedules from the API
  const fetchSchedules = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllSchedules();
      const formattedSchedules = data.map((schedule, index) =>
        formatScheduleForDisplay(schedule, index)
      );
      setAllSchedules(formattedSchedules);
    } catch (error) {
      console.error("Error fetching schedules:", error);
      setAddModalError("Failed to fetch schedules");
    } finally {
      setLoading(false);
    }
  }, [formatScheduleForDisplay]);

  // Set up auto-refresh of schedules
  useEffect(() => {
    fetchSchedules();
    const refreshInterval = setInterval(fetchSchedules, 30000); // Refresh every 30 seconds
    return () => clearInterval(refreshInterval);
  }, [fetchSchedules]);

  // Effect to filter and paginate schedules for display
  useEffect(() => {
    let filtered = allSchedules;

    if (searchTerm.trim() !== "") {
      filtered = allSchedules.filter(
        (schedule) =>
          (schedule.date &&
            schedule.date.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (schedule.slots && schedule.slots.toString().includes(searchTerm)) ||
          (schedule.startTime &&
            schedule.startTime
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (schedule.endTime &&
            schedule.endTime.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    setSchedules(filtered.slice(indexOfFirstEntry, indexOfLastEntry));
    const totalFiltered = filtered.length;
    const maxPage = Math.max(1, Math.ceil(totalFiltered / entriesPerPage));
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [allSchedules, searchTerm, currentPage, entriesPerPage]);

  // Calculate total filtered entries and pages
  const getFilteredCount = () => {
    if (searchTerm.trim() !== "") {
      return allSchedules.filter(
        (schedule) =>
          (schedule.date &&
            schedule.date.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (schedule.slots && schedule.slots.toString().includes(searchTerm)) ||
          (schedule.startTime &&
            schedule.startTime
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) ||
          (schedule.endTime &&
            schedule.endTime.toLowerCase().includes(searchTerm.toLowerCase()))
      ).length;
    }
    return allSchedules.length;
  };

  const totalFilteredEntries = getFilteredCount();
  const calculatedTotalPages = Math.max(
    1,
    Math.ceil(totalFilteredEntries / entriesPerPage)
  );

  // --- Modal Open/Close ---
  const openAddModal = () => {
    setNewSchedule(initialScheduleState);
    setAddModalError(null);
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setNewSchedule(initialScheduleState);
    setAddModalError(null);
    setIsAddModalOpen(false);
  };
  const openEditModal = (index) => {
    const scheduleToEdit = schedules[index];
    if (!scheduleToEdit) return;

    // Clean the time strings to remove any AM/PM
    const cleanStartTime = scheduleToEdit.startTime
      .replace(/\s*(AM|PM)/i, "")
      .trim();
    const cleanEndTime = scheduleToEdit.endTime
      .replace(/\s*(AM|PM)/i, "")
      .trim();

    const formReadySchedule = {
      ...scheduleToEdit,
      date: formatDate(scheduleToEdit.date),
      startTime: cleanStartTime,
      endTime: cleanEndTime,
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
    if (addModalError) setAddModalError(null);
    if (editModalError) setEditModalError(null);
  };

  // --- Formatting for display/storage ---
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const formatDateForStorage = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();
    return `${month}/${day}/${year}`;
  };

  const handleUpdateSchedule = async () => {
    if (editIndex === null || !originalScheduleForForm) return;

    if (
      !newSchedule.slots ||
      !newSchedule.date ||
      !newSchedule.startTime ||
      !newSchedule.endTime
    ) {
      setEditModalError("All fields are required");
      return;
    }

    // Parse slots as numbers
    const newSlots = parseInt(newSchedule.slots);
    const originalSlots = parseInt(originalScheduleForForm.slots);
    const bookedSlots = parseInt(originalScheduleForForm.bookedSlots) || 0;

    // Validate that new slot count isn't less than booked slots
    if (newSlots < bookedSlots) {
      setEditModalError(
        `Cannot reduce slots below booked amount (${bookedSlots} slots already booked)`
      );
      return;
    }

    const hasChanges =
      newSlots !== originalSlots ||
      newSchedule.date !== originalScheduleForForm.date ||
      newSchedule.startTime !== originalScheduleForForm.startTime ||
      newSchedule.endTime !== originalScheduleForForm.endTime;

    if (!hasChanges) {
      setEditModalError("No changes made to the schedule.");
      return;
    }

    try {
      const scheduleToUpdate = schedules[editIndex];

      // Prepare update data with slot calculations
      // Important: Backend currently treats 'slots' as available slots
      // When updating, we need to account for existing bookings
      const updateData = {
        ...newSchedule,
        slots: newSlots, // This will be the new total slots
        // The backend will need to handle the booking logic properly
      };

      const response = await updateSchedule(scheduleToUpdate._id, updateData);
      if (response) {
        await fetchSchedules();
        closeEditModal();
      }
    } catch (error) {
      console.error("Error updating schedule:", error);
      setEditModalError(error.message || "Failed to update schedule");
    }
  };

  const addSchedule = async () => {
    if (
      !newSchedule.slots ||
      !newSchedule.date ||
      !newSchedule.startTime ||
      !newSchedule.endTime
    ) {
      setAddModalError("All fields are required");
      return;
    }

    // Check for time overlap with existing schedules on the same day
    const existingSchedules = schedules.filter(
      (schedule) => schedule.date === formatDateForStorage(newSchedule.date)
    );

    // Convert times to minutes for comparison
    const newStartMinutes = convertTimeToMinutes(newSchedule.startTime);
    const newEndMinutes = convertTimeToMinutes(newSchedule.endTime);

    // Check if the new time slot overlaps with any existing slots
    const hasOverlap = existingSchedules.some((schedule) => {
      const existingStartMinutes = convertTimeToMinutes(schedule.startTime);
      const existingEndMinutes = convertTimeToMinutes(schedule.endTime);

      return (
        (newStartMinutes >= existingStartMinutes &&
          newStartMinutes < existingEndMinutes) ||
        (newEndMinutes > existingStartMinutes &&
          newEndMinutes <= existingEndMinutes) ||
        (newStartMinutes <= existingStartMinutes &&
          newEndMinutes >= existingEndMinutes)
      );
    });

    if (hasOverlap) {
      setAddModalError("This time slot overlaps with an existing schedule");
      return;
    }

    if (newStartMinutes >= newEndMinutes) {
      setAddModalError("End time must be after start time");
      return;
    }

    try {
      const response = await createSchedule(newSchedule);
      if (response) {
        await fetchSchedules();
        closeAddModal();
      }
    } catch (error) {
      console.error("Error adding schedule:", error);
      setAddModalError(error.message || "Failed to add schedule");
    }
  };

  // Helper function to convert time to minutes for comparison
  const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  };

  const openDeleteModal = (index) => {
    setDeleteIndex(index);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setDeleteIndex(null);
  };
  const confirmDelete = async () => {
    if (deleteIndex === null) return;

    try {
      const scheduleToDelete = schedules[deleteIndex];

      // Check if schedule has any booked slots
      const bookedSlots = parseInt(scheduleToDelete.bookedSlots) || 0;
      if (bookedSlots > 0) {
        toast.error(
          `Cannot delete schedule with ${bookedSlots} booked appointments`
        );
        closeDeleteModal();
        return;
      }

      setLoading(true);

      // Store a temporary copy of the schedule being deleted
      const deletedSchedule = schedules[deleteIndex];

      // First update the UI by removing the schedule
      setSchedules((prev) => prev.filter((_, index) => index !== deleteIndex));

      // Then close the modal
      setIsDeleteModalOpen(false);
      setDeleteIndex(null);

      try {
        // Actually perform the deletion
        const response = await deleteSchedule(deletedSchedule._id);

        // Show success message
        toast.success("Schedule deleted successfully");

        // Refresh schedules to ensure synchronization
        await fetchSchedules();

        if (response?.notification) {
          console.log("Schedule deletion notification received");
        }
      } catch (error) {
        // If deletion fails, revert the UI change
        console.error("Error deleting schedule:", error);
        toast.error(
          error.response?.data?.message || "Failed to delete schedule"
        );
        await fetchSchedules(); // Refresh to restore the original state
      }
    } catch (error) {
      console.error("Error in delete process:", error);
      toast.error("Failed to process deletion");
    } finally {
      setLoading(false);
    }
  };

  // Handlers for Search and Pagination
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleEntriesPerPageChange = (event) => {
    const newEntries = parseInt(event.target.value, 10);
    if (newEntries > 0) {
      setEntriesPerPage(newEntries);
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
    if (pageNumber >= 1 && pageNumber <= calculatedTotalPages) {
      setCurrentPage(pageNumber);
    }
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
    loading,
    addModalError,
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

    // Pagination and search
    totalFilteredEntries,
    searchTerm,
    handleSearchChange,
    currentPage,
    entriesPerPage,
    calculatedTotalPages,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,
    handleEntriesPerPageChange,
  };
};

export default useSchedule;
