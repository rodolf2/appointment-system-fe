import { useState, useEffect } from "react";

const useFeedback = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(5);
  const [sortOrder, setSortOrder] = useState("newest");

  // Sample feedback data with category ratings
  const [feedbackData] = useState([
    {
      initials: "AB",
      name: "Ashley Buenavista",
      feedback: [
        { category: "Is easy to use", rating: 5 },
        { category: "Has the features I want", rating: 4 },
        { category: "Feels fast and responsive", rating: 5 },
        { category: "Is reliable", rating: 5 }
      ],
      color: "bg-green-500",
      date: "2024-03-15",
    },
    {
      initials: "KL",
      name: "Kahlea Ligaya",
      feedback: [
        { category: "Is easy to use", rating: 5 },
        { category: "Has the features I want", rating: 5 },
        { category: "Feels fast and responsive", rating: 4 },
        { category: "Is reliable", rating: 5 }
      ],
      color: "bg-blue-500",
      date: "2024-03-14",
    },
    {
      initials: "TF",
      name: "Teodore Florenciano",
      feedback: [
        { category: "Is easy to use", rating: 3 },
        { category: "Has the features I want", rating: 2 },
        { category: "Feels fast and responsive", rating: 3 },
        { category: "Is reliable", rating: 4 }
      ],
      color: "bg-red-500",
      date: "2024-03-13",
    },
    {
      initials: "MJ",
      name: "Maria Johnson",
      feedback: [
        { category: "Is easy to use", rating: 5 },
        { category: "Has the features I want", rating: 5 },
        { category: "Feels fast and responsive", rating: 5 },
        { category: "Is reliable", rating: 5 }
      ],
      color: "bg-purple-500",
      date: "2024-03-12",
    },
    {
      initials: "RP",
      name: "Robert Parker",
      feedback: [
        { category: "Is easy to use", rating: 4 },
        { category: "Has the features I want", rating: 3 },
        { category: "Feels fast and responsive", rating: 4 },
        { category: "Is reliable", rating: 4 }
      ],
      color: "bg-yellow-500",
      date: "2024-03-11",
    },
    {
      initials: "SL",
      name: "Sarah Lee",
      feedback: [
        { category: "Is easy to use", rating: 5 },
        { category: "Has the features I want", rating: 4 },
        { category: "Feels fast and responsive", rating: 5 },
        { category: "Is reliable", rating: 5 }
      ],
      color: "bg-pink-500",
      date: "2024-03-10",
    },
    {
      initials: "JD",
      name: "John Doe",
      feedback: [
        { category: "Is easy to use", rating: 2 },
        { category: "Has the features I want", rating: 1 },
        { category: "Feels fast and responsive", rating: 2 },
        { category: "Is reliable", rating: 3 }
      ],
      color: "bg-gray-500",
      date: "2024-03-09",
    },
    {
      initials: "EM",
      name: "Emma Martinez",
      feedback: [
        { category: "Is easy to use", rating: 5 },
        { category: "Has the features I want", rating: 5 },
        { category: "Feels fast and responsive", rating: 5 },
        { category: "Is reliable", rating: 5 }
      ],
      color: "bg-indigo-500",
      date: "2024-03-08",
    },
    {
      initials: "CW",
      name: "Chris Wilson",
      feedback: [
        { category: "Is easy to use", rating: 3 },
        { category: "Has the features I want", rating: 3 },
        { category: "Feels fast and responsive", rating: 3 },
        { category: "Is reliable", rating: 3 }
      ],
      color: "bg-orange-500",
      date: "2024-03-07",
    },
    {
      initials: "AL",
      name: "Anna Lopez",
      feedback: [
        { category: "Is easy to use", rating: 5 },
        { category: "Has the features I want", rating: 5 },
        { category: "Feels fast and responsive", rating: 5 },
        { category: "Is reliable", rating: 5 }
      ],
      color: "bg-teal-500",
      date: "2024-03-06",
    },
    {
      initials: "DB",
      name: "David Brown",
      feedback: [
        { category: "Is easy to use", rating: 1 },
        { category: "Has the features I want", rating: 1 },
        { category: "Feels fast and responsive", rating: 2 },
        { category: "Is reliable", rating: 1 }
      ],
      color: "bg-red-600",
      date: "2024-03-05",
    },
    {
      initials: "RS",
      name: "Rachel Smith",
      feedback: [
        { category: "Is easy to use", rating: 5 },
        { category: "Has the features I want", rating: 5 },
        { category: "Feels fast and responsive", rating: 5 },
        { category: "Is reliable", rating: 5 }
      ],
      color: "bg-green-600",
      date: "2024-03-04",
    }
  ]);

  useEffect(() => {
    localStorage.setItem("sidebarOpenFeedbackPage", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  // Sort feedback data
  const sortedFeedback = [...feedbackData].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Calculate pagination values
  const totalEntries = sortedFeedback.length;
  const calculatedTotalPages = Math.ceil(totalEntries / entriesPerPage);
  const startEntry = totalEntries > 0 ? (currentPage - 1) * entriesPerPage + 1 : 0;
  const endEntry = Math.min(currentPage * entriesPerPage, totalEntries);

  // Generate page numbers array
  const pageNumbers = Array.from({ length: calculatedTotalPages }, (_, i) => i + 1);

  // Get current page items
  const currentFeedback = sortedFeedback.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  // Pagination handlers
  const handleNextPage = () => {
    if (currentPage < calculatedTotalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    }
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sort handler
  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  return {
    isSidebarOpen,
    toggleSidebar,
    setIsSidebarOpen,
    currentPage,
    entriesPerPage,
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
  };
};

export default useFeedback;
