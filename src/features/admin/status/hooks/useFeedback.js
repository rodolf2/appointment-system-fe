import { useState, useEffect } from "react";

const useFeedback = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("newest");

  useEffect(() => {
    fetchFeedback();
  }, [sortOrder]);

  const fetchFeedback = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/feedback?sort=${sortOrder}`);
      if (!response.ok) {
        throw new Error('Failed to fetch feedback');
      }
      const data = await response.json();
      setFeedback(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Calculate pagination values
  const totalEntries = feedback.length;
  const calculatedTotalPages = Math.ceil(totalEntries / entriesPerPage);
  const startEntry = totalEntries > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  // Generate page numbers array
  const pageNumbers = [];
  if (calculatedTotalPages > 0) {
    for (let i = 1; i <= calculatedTotalPages; i++) {
      pageNumbers.push(i);
    }
  }

  // Get current page feedback
  const currentFeedback = feedback.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Pagination handlers
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

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1);
  };

  return {
    isSidebarOpen,
    toggleSidebar,
    setIsSidebarOpen,
    currentPage,
    totalEntries,
    calculatedTotalPages,
    startEntry,
    endEntry,
    pageNumbers,
    handleNextPage,
    handlePreviousPage,
    handlePageChange,
    handleSortChange,
    sortOrder,
    currentFeedback,
    loading,
    error
  };
};

export default useFeedback;
