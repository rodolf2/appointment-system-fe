import { useState, useEffect } from "react";

const useAnnouncements = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
    const saved = localStorage.getItem("sidebarOpen");
    return saved !== null ? JSON.parse(saved) : true;
  });

  const [announcement, setAnnouncement] = useState({
    id: null,
    title: "",
    description: "",
  });

  const [postedAnnouncements, setPostedAnnouncements] = useState([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [itemToDeleteId, setItemToDeleteId] = useState(null);
  const [showDeleteSuccessModal, setShowDeleteSuccessModal] = useState(false);
  const [editingAnnouncement, setEditingAnnouncement] = useState(null);
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);

  useEffect(() => {
    localStorage.setItem("sidebarOpen", JSON.stringify(isSidebarOpen));
  }, [isSidebarOpen]);

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const handleAnnouncementChange = (field, value) => {
    setAnnouncement((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const resetForm = () => {
    setAnnouncement({ id: null, title: "", description: "" });
  };

  const handleAnnounce = () => {
    if (
      !announcement.title ||
      !announcement.description ||
      announcement.description === "<p><br></p>"
    ) {
      alert("Please fill in both title and description");
      return;
    }

    if (announcement.id) {
      setPostedAnnouncements((prev) =>
        prev.map((a) =>
          a.id === announcement.id
            ? {
                ...a,
                title: announcement.title,
                description: announcement.description,
              }
            : a
        )
      );
    } else {
      const newAnnouncement = {
        id: Date.now(),
        title: announcement.title,
        description: announcement.description,
        timestamp: new Date().toISOString(),
      };
      setPostedAnnouncements((prev) => [newAnnouncement, ...prev]);

      setShowSuccessModal(true);
    }
    resetForm();
  };
  const handleEditAnnouncement = (post) => {
    setEditingAnnouncement({ ...post }); 
  };

  const handleEditModalChange = (field, value) => {
    setEditingAnnouncement((prev) => ({ ...prev, [field]: value }));
  };
  const handleUpdateAnnouncement = () => {
    if (!editingAnnouncement) return;

    const isDescriptionEmpty =
      !editingAnnouncement.description ||
      editingAnnouncement.description.trim() === "<p><br></p>";
    if (!editingAnnouncement.title.trim() || isDescriptionEmpty) {
      alert("Title and description cannot be empty.");
      return; 
    }

    const originalPost = postedAnnouncements.find(
      (post) => post.id === editingAnnouncement.id
    );

    if (originalPost) {
      const isUnchanged =
        originalPost.title === editingAnnouncement.title &&
        originalPost.description === editingAnnouncement.description;

      if (isUnchanged) {
        setEditingAnnouncement(null);
        return;
      }
    }

    setPostedAnnouncements((prev) =>
      prev.map((post) =>
        post.id === editingAnnouncement.id ? editingAnnouncement : post
      )
    );
    setShowUpdateSuccessModal(true);
    setEditingAnnouncement(null);
  };

  const closeEditModal = () => {
    setEditingAnnouncement(null);
  };
  const handleDeleteAnnouncement = (id) => {
    setItemToDeleteId(id);
  };

  const confirmDelete = () => {
    if (itemToDeleteId) {
      if (announcement.id === itemToDeleteId) {
        resetForm();
      }
      setPostedAnnouncements((prev) =>
        prev.filter((a) => a.id !== itemToDeleteId)
      );
      setItemToDeleteId(null);
      setShowDeleteSuccessModal(true);
    }
  };

  const cancelDelete = () => {
    setItemToDeleteId(null);
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };
  const closeDeleteSuccessModal = () => {
    setShowDeleteSuccessModal(false);
  };
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
