import { useState } from "react";

const useHolidays = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [newHoliday, setNewHoliday] = useState({
    no: "",
    date: "",
    description: "",
    actions: "",
  });

  const initialHolidays = [
    {
      no: "1",
      date: "2025/01/01",
      description: "New Year's Day",
      actions: "",
    },
    {
      no: "2",
      date: "2025/03/31",
      description: "Eidul-Fitar",
      actions: "",
    },
    {
      no: "3",
      date: "2025/04/09",
      description: "The Day of Valor",
      actions: "",
    },
    {
      no: "4",
      date: "2025/05/01",
      description: "Labor Day",
      actions: "",
    },
    {
      no: "5",
      date: "2025/06/07",
      description: "Eid al-Adha (Feast of Sacrifice)",
      actions: "",
    },
    {
      no: "6",
      date: "2025/06/08",
      description: "Eid al-Adha Day 2",
      actions: "",
    },
    {
      no: "7",
      date: "2025/06/12",
      description: "Independence Day",
      actions: "",
    },
    {
      no: "8",
      date: "2025/08/21",
      description: "Ninoy Aquino Day",
      actions: "",
    },
  ];

  const [holidays, setHolidays] = useState(initialHolidays);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setNewHoliday({
      no: "",
      date: "",
      description: "",
      actions: "",
    });
    setIsAddModalOpen(false);
  };

  const openEditModal = (index) => {
    setEditIndex(index);
    setNewHoliday(holidays[index]);
    setIsEditModalOpen(true);
  };

  const closeEditModal = () => {
    setNewHoliday({
      no: "",
      date: "",
      description: "",
      actions: "",
    });
    setIsEditModalOpen(false);
  };

  const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}/${month}/${day}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHoliday((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addHolidays = () => {
    if (!newHoliday.date || !newHoliday.description) {
      alert("Please fill out all fields.");
      return;
    }

    const formattedDate = formatDate(newHoliday.date);
    const newNo = holidays.length + 1;

    setHolidays((prev) => [
      ...prev,
      { ...newHoliday, no: newNo.toString(), date: formattedDate },
    ]);

    closeAddModal();
  };

  const updateHolidays = () => {
    if (!newHoliday.date || !newHoliday.description) {
      alert("Please fill out all fields.");
      return;
    }

    const formattedDate = formatDate(newHoliday.date);
    const updatedHolidays = holidays.map((holiday, index) =>
      index === editIndex
        ? { ...holiday, ...newHoliday, date: formattedDate }
        : holiday
    );

    setHolidays(updatedHolidays);
    closeEditModal();
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
    setHolidays((prevHolidays) => {
      const updatedHolidays = prevHolidays.filter((_, i) => i !== deleteIndex);
      return updatedHolidays.map((holiday, index) => ({
        ...holiday,
        no: (index + 1).toString(),
      }));
    });
    closeDeleteModal();
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
