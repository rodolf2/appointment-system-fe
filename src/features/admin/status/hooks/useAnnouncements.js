import { useState, useEffect, useCallback } from "react";
import axios from "axios";

const BASE_URL = "https://appointment-system-backend-n8dk.onrender.com/api";
const API_URL = `${BASE_URL}/announcements`;

const useAnnouncements = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);

  const [announcement, setAnnouncement] = useState({
    title: "",
    description: "",
  });

  const [postedAnnouncements, setPostedAnnouncements] = useState([]);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const fetchAnnouncements = useCallback(async () => {
    try {
      console.log("Fetching from:", API_URL); // Debug log
      const response = await axios.get(API_URL, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data) {
        console.log("Fetch successful:", response.data);
        setPostedAnnouncements(response.data);
      } else {
        console.warn("No data received from server");
        setPostedAnnouncements([]);
      }
    } catch (error) {
      console.error("Error fetching announcements:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
        config: error.config,
      });
      setPostedAnnouncements([]);

      if (error.response?.status === 404) {
        console.error(
          "API endpoint not found. Please check the server URL and routes."
        );
      } else if (error.code === "ERR_NETWORK") {
        console.error("Network error. Please check if the server is running.");
      }
    }
  }, []);

  useEffect(() => {
    fetchAnnouncements();
  }, [fetchAnnouncements]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleAnnouncementChange = (field, value) => {
    setAnnouncement((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setAnnouncement({ title: "", description: "" });
  };

  const handleAnnounce = async () => {
    if (
      !announcement.title ||
      !announcement.description ||
      announcement.description === "<p><br></p>"
    ) {
      alert("Please fill in both title and description");
      return;
    }

    try {
      await axios.post(API_URL, {
        title: announcement.title,
        description: announcement.description,
      });
      setShowSuccessModal(true);
      resetForm();
      fetchAnnouncements();
    } catch (error) {
      console.error("Error posting announcement:", error);
      alert("Failed to post announcement. Please try again.");
    }
  };

  const handleEditAnnouncement = (post) => {
    setEditingAnnouncement({
      _id: post._id, // Make sure we're using _id
      title: post.title,
      description: post.description,
    });
  };

  const handleEditModalChange = (field, value) => {
    setEditingAnnouncement((prev) => ({ ...prev, [field]: value }));
  };

  const handleUpdateAnnouncement = async () => {
    if (!editingAnnouncement?._id) {
      console.error("No announcement ID found for update");
      return;
    }

    try {
      const response = await axios.put(
        `${API_URL}/${editingAnnouncement._id}`,
        {
          title: editingAnnouncement.title,
          description: editingAnnouncement.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        await fetchAnnouncements();
        setEditingAnnouncement(null);
        setShowUpdateSuccessModal(true);
      }
    } catch (error) {
      console.error("Failed to update announcement:", error);
      alert("Failed to update announcement. Please try again.");
    }
  };

  const handleDeleteAnnouncement = (id) => {
    setItemToDeleteId(id);
  };

  const confirmDelete = async () => {
    if (itemToDeleteId) {
      try {
        await axios.delete(`${API_URL}/${itemToDeleteId}`);
        setItemToDeleteId(null);
        setShowDeleteSuccessModal(true);
        fetchAnnouncements();
      } catch (error) {
        console.error("Error deleting announcement:", error);
        alert("Failed to delete announcement. Please try again.");
      }
    }
  };

  const cancelDelete = () => setItemToDeleteId(null);
  const closeEditModal = () => setEditingAnnouncement(null);
  const closeSuccessModal = () => setShowSuccessModal(false);
  const closeDeleteSuccessModal = () => setShowDeleteSuccessModal(false);
  const closeUpdateSuccessModal = () => setShowUpdateSuccessModal(false);

  return {
    isSidebarOpen,
    toggleSidebar,
    announcement,
    postedAnnouncements,
    handleAnnouncementChange,
    handleAnnounce,
    handleDeleteAnnouncement,
    handleEditAnnouncement,
    resetForm,
    showSuccessModal,
    closeSuccessModal,
    itemToDeleteId,
    confirmDelete,
    cancelDelete,
    showDeleteSuccessModal,
    closeDeleteSuccessModal,
    editingAnnouncement,
    closeEditModal,
    handleEditModalChange,
    handleUpdateAnnouncement,
    showUpdateSuccessModal,
    closeUpdateSuccessModal,
  };
};

export default useAnnouncements;
