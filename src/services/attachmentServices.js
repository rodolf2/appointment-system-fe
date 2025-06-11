import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/attachment`;

// Upload attachments
export const uploadAttachments = async (files, studentId) => {
  try {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });
    formData.append('studentId', studentId);

    const response = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    })
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to upload attachments' };
  }
};

// Get all attachments
export const getAllAttachments = async () => {
  try {
    const response = await axios.get(`${API_URL}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch attachments' };
  }
};

// Get attachment by ID
export const getAttachmentById = async (attachmentId) => {
  try {
    const response = await axios.get(`${API_URL}/${attachmentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to fetch attachment' };
  }
};

// Delete attachment by ID
export const deleteAttachmentById = async (attachmentId) => {
  try {
    const response = await axios.delete(`${API_URL}/${attachmentId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || { message: 'Failed to delete attachment' };
  }
};
