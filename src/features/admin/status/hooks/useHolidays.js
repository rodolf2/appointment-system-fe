// hooks/useHolidays.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/api"; // Ensure this matches your backend port

const useHolidays = () => {
  // Sidebar and Modal States
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true;
  });
  useEffect(() => { // Persist sidebar state
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  // Holiday Form State
  const initialHolidayState = { date: "", description: "" };
  const [newHoliday, setNewHoliday] = useState(initialHolidayState);
  const [editingHolidayId, setEditingHolidayId] = useState(null);

  // --- MODIFIED/NEW STATE FOR HOLIDAY LIST, SEARCH, AND PAGINATION ---
  const [allHolidays, setAllHolidays] = useState([]); // Stores ALL holidays from API
  const [displayedHolidays, setDisplayedHolidays] = useState([]); // For table display

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10); // Default

  // Fetching all holidays
  const fetchAllHolidaysFromAPI = useCallback(async () => { // Renamed for clarity
    try {
      const response = await axios.get(`${API_URL}/holidays`);
      const formattedHolidays = response.data.map(holiday => {
        let localDateString = "";
        if (holiday.date) {
          try {
            const dateInput = holiday.date.includes('T') ? holiday.date : `${holiday.date}T00:00:00`;
            const dateObj = new Date(dateInput);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, '0');
            const day = String(dateObj.getDate()).padStart(2, '0');
            localDateString = `${year}-${month}-${day}`;
          } catch (e) {
            console.error("Error parsing date in fetchHolidays:", holiday.date, e);
            localDateString = "";
          }
        }
        return {
          ...holiday,
          id: holiday._id,
          date: localDateString,
        };
      });
      setAllHolidays(formattedHolidays); // Store all fetched holidays
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setAllHolidays([]); // Reset on error
    }
  }, []);

  useEffect(() => {
    fetchAllHolidaysFromAPI();
  }, [fetchAllHolidaysFromAPI]);

  // Effect to filter and paginate holidays for display
  useEffect(() => {
    let filtered = allHolidays;

    if (searchTerm.trim() !== "") {
      filtered = allHolidays.filter(
        (holiday) =>
          holiday.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          holiday.date.includes(searchTerm) // Search by date string (YYYY-MM-DD)
      );
    }

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    setDisplayedHolidays(filtered.slice(indexOfFirstEntry, indexOfLastEntry));

    // Adjust current page if it becomes invalid after filtering or changing entriesPerPage
    const totalFiltered = filtered.length;
    const maxPage = Math.max(1, Math.ceil(totalFiltered / entriesPerPage));
    if (currentPage > maxPage) {
      setCurrentPage(maxPage);
    }
  }, [allHolidays, searchTerm, currentPage, entriesPerPage]);


  // Calculate total filtered entries and pages (for UI display)
  const getFilteredCount = () => {
    if (searchTerm.trim() !== "") {
      return allHolidays.filter(
        (holiday) =>
          holiday.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          holiday.date.includes(searchTerm)
      ).length;
    }
    return allHolidays.length;
  };
  const totalFilteredEntries = getFilteredCount();
  const calculatedTotalPages = Math.max(1, Math.ceil(totalFilteredEntries / entriesPerPage));


  // Handlers for Search and Pagination
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  const handleEntriesPerPageChange = (event) => {
    const newEntries = parseInt(event.target.value, 10);
    if (newEntries > 0) {
      setEntriesPerPage(newEntries);
      setCurrentPage(1); // Reset to first page
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


  // Existing Modal and CRUD Operation Handlers
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  const openAddModal = () => {
    setNewHoliday(initialHolidayState);
    setEditingHolidayId(null);
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (holidayToEdit) => {
    setNewHoliday({
      date: holidayToEdit.date, // Assumes date is already YYYY-MM-DD
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

  // CRUD functions - fetchAllHolidaysFromAPI is called after success
  const addHolidays = async () => {
    if (!newHoliday.date || !newHoliday.description) {
      alert("Date and Description cannot be empty.");
      return;
    }
    try {
      await axios.post(`${API_URL}/holidays`, newHoliday);
      fetchAllHolidaysFromAPI(); // Refresh the list
      closeAddModal();
    } catch (error) {
      console.error("Error adding holiday:", error);
      let errorMessage = "Could not add holiday. Please try again.";
      if (error.response) {
        errorMessage = `Error: ${error.response.data.message || 'Server error.'} (Status: ${error.response.status})`;
      } else if (error.request) {
        errorMessage = "Error: No response from server.";
      } else {
        errorMessage = `Error: ${error.message}`;
      }
      alert(errorMessage);
    }
  };

  const updateHolidays = async () => {
    if (!editingHolidayId || !newHoliday.date || !newHoliday.description) {
      alert("Cannot update: Missing data or ID.");
      return;
    }
    try {
      await axios.put(`${API_URL}/holidays/${editingHolidayId}`, newHoliday);
      fetchAllHolidaysFromAPI(); // Refresh the list
      closeEditModal();
    } catch (error) {
      console.error("Error updating holiday:", error);
      let errorMessage = "Could not update holiday. Please try again.";
      if (error.response) {
        errorMessage = `Error: ${error.response.data.message || 'Server error.'} (Status: ${error.response.status})`;
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
      fetchAllHolidaysFromAPI(); // Refresh the list
      // If deleting the last item on a page beyond page 1, you might want to go to previous page
      if (displayedHolidays.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting holiday:", error);
      let errorMessage = "Could not delete holiday. Please try again.";
      if (error.response) {
        errorMessage = `Error: ${error.response.data.message || 'Server error.'} (Status: ${error.response.status})`;
      } else if (error.request) {
        errorMessage = "Error: No response from server.";
      } else {
        errorMessage = `Error: ${error.message}`;
      }
      alert(errorMessage);
    }
  };


  return {
    // Existing returns
    isSidebarOpen,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    newHoliday,
    // --- KEY CHANGE FOR WHAT THE COMPONENT USES IN THE TABLE ---
    holidays: displayedHolidays, // The component will map over this
    // --- END KEY CHANGE ---
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

    // New returns for search and pagination
    allHolidaysCount: allHolidays.length, // Original total count
    totalFilteredEntries, // Count after search filter
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

export default useHolidays;