// hooks/useHolidays.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api"; // Ensure this matches your backend port

const useHolidays = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Optional: Load from localStorage if you want persistence across page refreshes
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true; // Default to open
  });
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const initialHolidayState = { date: "", description: "" };
  const [newHoliday, setNewHoliday] = useState(initialHolidayState);
  const [holidays, setHolidays] = useState([]);
  const [editingHolidayId, setEditingHolidayId] = useState(null);

  const fetchHolidays = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/holidays`);

      // VVVVVV THIS IS WHERE YOU REPLACE THE OLD .map LOGIC VVVVVV
      const formattedHolidays = response.data.map(holiday => {
        let localDateString = "";
        if (holiday.date) {
          try {
            const dateInput = holiday.date.includes('T') ? holiday.date : `${holiday.date}T00:00:00`; // Treat as local time
            const dateObj = new Date(dateInput);

            // Get year, month, day from the local date object
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // getMonth() is 0-indexed
            const day = String(dateObj.getDate()).padStart(2, '0');
            localDateString = `${year}-${month}-${day}`;
          } catch (e) {
            console.error("Error parsing date in fetchHolidays:", holiday.date, e);
            localDateString = ""; // Or "Invalid Date" or some other error indicator
          }
        }
        return {
          ...holiday,
          id: holiday._id,
          date: localDateString, // Now reliably YYYY-MM-DD based on local interpretation
        };
      });
      // ^^^^^^ THIS IS THE END OF THE REPLACEMENT ^^^^^^

      setHolidays(formattedHolidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
      // Consider setting an error state here to display to the user
    }
  }, []);

  useEffect(() => {
    fetchHolidays();
  }, [fetchHolidays]);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const openAddModal = () => {
    setNewHoliday(initialHolidayState);
    setEditingHolidayId(null);
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (holidayToEdit) => {
    // holidayToEdit.date will be in YYYY-MM-DD format from the 'holidays' state
    setNewHoliday({
      date: holidayToEdit.date,
      description: holidayToEdit.description,
    });
    setEditingHolidayId(holidayToEdit.id);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingHolidayId(null);
    setNewHoliday(initialHolidayState);
  };

  const openDeleteModal = (holidayId) => {
    setEditingHolidayId(holidayId);
    setIsDeleteModalOpen(true);
  };
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEditingHolidayId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHoliday((prev) => ({ ...prev, [name]: value }));
  };

  const addHolidays = async () => {
    if (!newHoliday.date || !newHoliday.description) {
      alert("Date and Description cannot be empty.");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/holidays`, newHoliday);
      console.log("Holiday added successfully:", response.data);
      fetchHolidays();
      closeAddModal();
    } catch (error) {
      console.error("Error adding holiday:", error);
      let errorMessage = "Could not add holiday. Please try again.";
      if (error.response) {
        console.error("Backend Error Data:", error.response.data);
        errorMessage = `Error: ${error.response.data.message || 'Server responded with an error.'} (Status: ${error.response.status})`;
      } else if (error.request) {
        errorMessage = "Error: No response from server. Check if the backend is running and accessible.";
      } else {
        errorMessage = `Error: ${error.message}`;
      }
      alert(errorMessage);
    }
  };

  const updateHolidays = async () => {
    if (!editingHolidayId) return;
    if (!newHoliday.date || !newHoliday.description) {
      alert("Date and Description cannot be empty.");
      return;
    }
    try {
      await axios.put(`${API_URL}/holidays/${editingHolidayId}`, newHoliday);
      fetchHolidays();
      closeEditModal();
    } catch (error) {
      console.error("Error updating holiday:", error);
      let errorMessage = "Could not update holiday. Please try again.";
      if (error.response) {
        errorMessage = `Error: ${error.response.data.message || 'Server responded with an error.'} (Status: ${error.response.status})`;
      } else if (error.request) {
        errorMessage = "Error: No response from server.";
      } else {
        errorMessage = `Error: ${error.message}`;
      }
      alert(errorMessage);
    }
  };

  const confirmDelete = async () => {
    if (!editingHolidayId) return;
    try {
      await axios.delete(`${API_URL}/holidays/${editingHolidayId}`);
      fetchHolidays();
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting holiday:", error);
      let errorMessage = "Could not delete holiday. Please try again.";
      if (error.response) {
        errorMessage = `Error: ${error.response.data.message || 'Server responded with an error.'} (Status: ${error.response.status})`;
      } else if (error.request) {
        errorMessage = "Error: No response from server.";
      } else {
        errorMessage = `Error: ${error.message}`;
      }
      alert(errorMessage);
    }
  };

  return {
    isSidebarOpen,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    newHoliday,
    holidays,
    toggleSidebar,
    openAddModal,
    closeAddModal,
    openEditModal,
    closeEditModal,
    handleInputChange,
    addHolidays,
    updateHolidays,
    openDeleteModal,
    closeDeleteModal,
    confirmDelete,
  };
};

export default useHolidays;