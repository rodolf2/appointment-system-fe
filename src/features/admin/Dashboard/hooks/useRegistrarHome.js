import { useState, useEffect } from "react";
import dayjs from "dayjs";

const useRegistrarHome = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(dayjs());

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Calculate calendar data
  const daysInMonth = currentDate.daysInMonth();
  const startOfMonth = currentDate.startOf("month").day();
  const monthName = currentDate.format("MMMM");
  const year = currentDate.year();

  // Define holidays for the year
  const holidays = [
    { date: "01-01", name: "New Year's Day" },
    { date: "03-31", name: "Eidul-Fitar" },
    { date: "04-09", name: "The Day of Valor" },
    { date: "05-01", name: "Labor Day" },
    { date: "06-07", name: "Eid al-Adha (Feast of the Sacrifice)" },
    { date: "06-08", name: "Eid al-Adha Day 2" },
    { date: "06-12", name: "Independence Day" },
    { date: "08-21", name: "Ninoy Aquino Day" },
  ];

  // Filter holidays for the current month
  const currentMonthHolidays = holidays.filter((holiday) => {
    const [month] = holiday.date.split("-");
    return month === currentDate.format("MM");
  });

  const events = {
    2: { label: "Fully Booked", color: "bg-[#F63838]" },
    3: { label: "Fully Booked", color: "bg-[#F63838]" },
    6: { label: "Fully Booked", color: "bg-[#F63838]" },
    7: { label: "Fully Booked", color: "bg-[#F63838]" },
    10: { label: "Fully Booked", color: "bg-[#F63838]" },
    13: { label: "Available", color: "bg-[#48E14D]" },
    14: { label: "Available", color: "bg-[#48E14D]" },
    15: { label: "Available", color: "bg-[#48E14D]" },
    16: { label: "Available", color: "bg-[#48E14D]" },
    17: { label: "Available", color: "bg-[#48E14D]" },
    20: { label: "Special Event", color: "bg-[#FBBC05]" },
    21: { label: "Special Event", color: "bg-[#FBBC05]" },
    22: { label: "Available", color: "bg-[#48E14D]" },
    23: { label: "Available", color: "bg-[#48E14D]" },
    24: { label: "Available", color: "bg-[#48E14D]" },
    25: { label: "Available", color: "bg-[#48E14D]" },
    26: { label: "Available", color: "bg-[#48E14D]" },
    27: { label: "Available", color: "bg-[#48E14D]" },
    28: { label: "Available", color: "bg-[#48E14D]" },
    29: { label: "Available", color: "bg-[#48E14D]" },
    30: { label: "Available", color: "bg-[#48E14D]" },
    31: { label: "Available", color: "bg-[#48E14D]" },
  };

  // Handle navigation between months
  const handlePrevMonth = () => {
    setCurrentDate(currentDate.subtract(1, "month"));
  };

  const handleNextMonth = () => {
    setCurrentDate(currentDate.add(1, "month"));
  };

  // Simplified weekend check (no closure logic)
  const isWeekend = (day) => {
    return currentDate.date(day).day() % 6 === 0; // Returns true for Saturday (6) and Sunday (0)
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const sidebar = document.querySelector(".sidebar-container");
      const toggleButton = document.querySelector(".sidebar-toggle-button");

      if (
        sidebar &&
        !sidebar.contains(e.target) &&
        !toggleButton?.contains(e.target)
      ) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return {
    isSidebarOpen,
    currentDate,
    toggleSidebar,
    daysInMonth,
    startOfMonth,
    monthName,
    year,
    holidays,
    currentMonthHolidays,
    events,
    handlePrevMonth,
    handleNextMonth,
    isWeekend,
  };
};

export default useRegistrarHome;