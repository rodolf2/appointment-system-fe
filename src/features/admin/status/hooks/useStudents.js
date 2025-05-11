import { useState, useEffect } from "react";

const useStudents = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    // Optional: Load from localStorage if you want persistence across page refreshes
    const saved = localStorage.getItem('sidebarOpen');
    return saved !== null ? JSON.parse(saved) : true; // Default to open
  });

  // Add this useEffect if you want persistence across refreshes
  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  const appointments = [
    {
      transactionNumber: ["TR13234-322"],
      name: "Alice Smith",
      lastSY: "2020-2021",
      program: "Grade 11 - STEM",
      contact: "+1 (123) 456-7890",
      email: "alice.smith@example.com",
      attachment: "ID Card",
      request: "Transcript of Records",
      date: "2025-01-01",
      claiming: "Pick-up",
    },
    {
      transactionNumber: ["TR13234-323"],
      name: "Bob Johnson",
      lastSY: "2019-2020",
      program: "Grade 12 - ABM",
      contact: "+1 (234) 567-8901",
      email: "bob.johnson@example.com",
      attachment: "Enrollment Form",
      request: "Certificate of Graduation",
      date: "2025-01-02",
      claiming: "Email",
    },
    {
      transactionNumber: ["TR13234-324"],
      name: "Charlie Brown",
      lastSY: "2021-2022",
      program: "Grade 10",
      contact: "+1 (345) 678-9012",
      email: "charlie.brown@example.com",
      attachment: "Payment Receipt",
      request: "Good Moral Certificate",
      date: "2025-01-03",
      claiming: "Courier",
    },
    {
      transactionNumber: ["TR13234-325"],
      name: "Daisy Miller",
      lastSY: "2022-2023",
      program: "Grade 11 - HUMSS",
      contact: "+1 (456) 789-0123",
      email: "daisy.miller@example.com",
      attachment: "Report Card",
      request: "Form 137",
      date: "2025-01-04",
      claiming: "Pick-up",
    },
    {
      transactionNumber: ["TR13234-326"],
      name: "Evan Davis",
      lastSY: "2018-2019",
      program: "Grade 12 - ICT",
      contact: "+1 (567) 890-1234",
      email: "evan.davis@example.com",
      attachment: "Certificate of Attendance",
      request: "Diploma",
      date: "2025-01-05",
      claiming: "Email",
    },
    {
      transactionNumber: ["TR13234-327"],
      name: "Fiona Garcia",
      lastSY: "2017-2018",
      program: "Grade 9",
      contact: "+1 (678) 901-2345",
      email: "fiona.garcia@example.com",
      attachment: "ID Card",
      request: "Transcript of Records",
      date: "2025-01-06",
      claiming: "Courier",
    },
  ];


  return {
    appointments,
    isSidebarOpen,
    toggleSidebar,
  };
};

export default useStudents;
