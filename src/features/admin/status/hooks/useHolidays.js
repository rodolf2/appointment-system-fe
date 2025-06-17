// hooks/useHolidays.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // Ensure this matches your backend port

const useHolidays = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });
  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const initialHolidayState = { date: "", description: "" };
  const [newHoliday, setNewHoliday] = useState(initialHolidayState);
  const [editingHolidayId, setEditingHolidayId] = useState(null);
<<<<<<< HEAD
  const [validationErrors, setValidationErrors] = useState({});
=======
  const [addModalError, setAddModalError] = useState("");
  const [editModalError, setEditModalError] = useState("");
>>>>>>> e323da738ffc93d153fc06e953fc1bf0fb1d27c2
  const [allHolidays, setAllHolidays] = useState([]);
  const [displayedHolidays, setDisplayedHolidays] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage, setEntriesPerPage] = useState(10);

  // Fetching all holidays
  const fetchAllHolidaysFromAPI = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/api/holidays`);
      const formattedHolidays = response.data.map((holiday) => {
        let localDateString = "";
        if (holiday.date) {
          try {
            const dateInput = holiday.date.includes("T")
              ? holiday.date
              : `${holiday.date}T00:00:00`;
            const dateObj = new Date(dateInput);
            const year = dateObj.getFullYear();
            const month = String(dateObj.getMonth() + 1).padStart(2, "0");
            const day = String(dateObj.getDate()).padStart(2, "0");
            localDateString = `${year}-${month}-${day}`;
          } catch (e) {
            console.error(
              "Error parsing date in fetchHolidays:",
              holiday.date,
              e
            );
            localDateString = "";
          }
        }
        return {
          ...holiday,
          id: holiday._id,
          date: localDateString,
        };
      });
      setAllHolidays(formattedHolidays);
    } catch (error) {
      console.error("Error fetching holidays:", error);
      setAllHolidays([]);
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
          holiday.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          holiday.date.includes(searchTerm)
      );
    }

    const indexOfLastEntry = currentPage * entriesPerPage;
    const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
    setDisplayedHolidays(filtered.slice(indexOfFirstEntry, indexOfLastEntry));

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
          holiday.description
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          holiday.date.includes(searchTerm)
      ).length;
    }
    return allHolidays.length;
  };
  const totalFilteredEntries = getFilteredCount();
  const calculatedTotalPages = Math.max(
    1,
    Math.ceil(totalFilteredEntries / entriesPerPage)
  );

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

  // Existing Modal and CRUD Operation Handlers
  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const openAddModal = () => {
    setNewHoliday(initialHolidayState);
    setEditingHolidayId(null);
    setAddModalError("");
    setIsAddModalOpen(true);
  };
  const closeAddModal = () => {
    setIsAddModalOpen(false);
<<<<<<< HEAD
    setValidationErrors({});
    setNewHoliday(initialHolidayState);
=======
    setAddModalError("");
>>>>>>> e323da738ffc93d153fc06e953fc1bf0fb1d27c2
  };

  const openEditModal = (holidayToEdit) => {
    setNewHoliday({
      date: holidayToEdit.date,
      description: holidayToEdit.description,
    });
    setEditingHolidayId(holidayToEdit.id);
    setEditModalError("");
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setIsEditModalOpen(false);
    setEditingHolidayId(null);
    setNewHoliday(initialHolidayState);
<<<<<<< HEAD
    setValidationErrors({});
=======
    setEditModalError("");
>>>>>>> e323da738ffc93d153fc06e953fc1bf0fb1d27c2
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

    // Clear validation error for this field when user starts typing
    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  // CRUD functions - fetchAllHolidaysFromAPI is called after success
  const addHolidays = async () => {
<<<<<<< HEAD
    // Clear previous validation errors
    setValidationErrors({});

    const errors = {};

    // Validate required fields
    if (!newHoliday.date) {
      errors.date = "Date is required";
    }
    if (!newHoliday.description || newHoliday.description.trim() === "") {
      errors.description = "Description is required";
    }

    // If there are validation errors, set them and return
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
=======
    if (!newHoliday.date || !newHoliday.description) {
      setAddModalError("All fields are required");
>>>>>>> e323da738ffc93d153fc06e953fc1bf0fb1d27c2
      return;
    }

    try {
      await axios.post(`${API_URL}/api/holidays`, newHoliday);
      fetchAllHolidaysFromAPI();
      closeAddModal();
      setValidationErrors({}); // Clear validation errors
    } catch (error) {
      console.error("Error adding holiday:", error);
      let errorMessage = "Could not add holiday. Please try again.";
      if (error.response) {
        errorMessage = `Error: ${
          error.response.data.message || "Server error."
        } (Status: ${error.response.status})`;
      } else if (error.request) {
        errorMessage = "Error: No response from server.";
      } else {
        errorMessage = `Error: ${error.message}`;
      }
<<<<<<< HEAD
      setValidationErrors({
        general: errorMessage,
      });
=======
      setAddModalError(errorMessage);
>>>>>>> e323da738ffc93d153fc06e953fc1bf0fb1d27c2
    }
  };

  const updateHolidays = async () => {
<<<<<<< HEAD
    // Clear previous validation errors
    setValidationErrors({});

    const errors = {};

    // Validate required fields
    if (!newHoliday.date) {
      errors.date = "Date is required";
    }
    if (!newHoliday.description || newHoliday.description.trim() === "") {
      errors.description = "Description is required";
    }
    if (!editingHolidayId) {
      errors.general = "Cannot update: Missing holiday ID";
    }

    // If there are validation errors, set them and return
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
=======
    if (!editingHolidayId || !newHoliday.date || !newHoliday.description) {
      setEditModalError("All fields are required");
>>>>>>> e323da738ffc93d153fc06e953fc1bf0fb1d27c2
      return;
    }

    try {
      await axios.put(
        `${API_URL}/api/holidays/${editingHolidayId}`,
        newHoliday
      );
      fetchAllHolidaysFromAPI();
      closeEditModal();
      setValidationErrors({}); // Clear validation errors
    } catch (error) {
      console.error("Error updating holiday:", error);
      let errorMessage = "Could not update holiday. Please try again.";
      if (error.response) {
        errorMessage = `Error: ${
          error.response.data.message || "Server error."
        } (Status: ${error.response.status})`;
      } else if (error.request) {
        errorMessage = "Error: No response from server.";
      } else {
        errorMessage = `Error: ${error.message}`;
      }
<<<<<<< HEAD
      setValidationErrors({
        general: errorMessage,
      });
=======
      setEditModalError(errorMessage);
>>>>>>> e323da738ffc93d153fc06e953fc1bf0fb1d27c2
    }
  };

  const confirmDelete = async () => {
    if (!editingHolidayId) return;
    try {
      await axios.delete(`${API_URL}/api/holidays/${editingHolidayId}`);
      fetchAllHolidaysFromAPI();
      if (displayedHolidays.length === 1 && currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
      closeDeleteModal();
    } catch (error) {
      console.error("Error deleting holiday:", error);
      // Silently handle the error - no alert
      closeDeleteModal();
    }
  };

  return {
    isSidebarOpen,
    isAddModalOpen,
    isEditModalOpen,
    isDeleteModalOpen,
    newHoliday,
    holidays: displayedHolidays,
<<<<<<< HEAD
    validationErrors,
=======
    addModalError,
    editModalError,
>>>>>>> e323da738ffc93d153fc06e953fc1bf0fb1d27c2
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
    allHolidaysCount: allHolidays.length,
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

export default useHolidays;
